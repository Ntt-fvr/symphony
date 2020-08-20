// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.opencensus.io/trace"
	"go.uber.org/zap"
	"gocloud.dev/blob"
	"gocloud.dev/runtimevar"
)

// ServiceName is the current service name.
const ServiceName = "async"

// A Handler handles incoming events.
type Handler interface {
	Handle(context.Context, log.Logger, event.LogEntry) error
}

// The Func type is an adapter to allow the use of
// ordinary functions as handlers.
type Func func(context.Context, log.Logger, event.LogEntry) error

// Handle returns f(ctx, entry).
func (f Func) Handle(ctx context.Context, logger log.Logger, entry event.LogEntry) error {
	return f(ctx, logger, entry)
}

// NamedHandler contains the handler to run on every event with the name handler for tracking purposes
type NamedHandler struct {
	Name    string
	Handler Handler
}

// NewServer is the events server.
type Server struct {
	service  *ev.Service
	logger   log.Logger
	tenancy  viewer.Tenancy
	features *runtimevar.Variable
	bucket   *blob.Bucket
	handlers []NamedHandler
}

// Config defines the async server config.
type Config struct {
	Tenancy  viewer.Tenancy
	Features *runtimevar.Variable
	Receiver ev.Receiver
	Logger   log.Logger
	Bucket   *blob.Bucket
	Handlers []NamedHandler
}

func NewServer(cfg Config) *Server {
	srv := &Server{
		tenancy:  cfg.Tenancy,
		features: cfg.Features,
		logger:   cfg.Logger,
		handlers: cfg.Handlers,
		bucket:   cfg.Bucket,
	}
	srv.service, _ = ev.NewService(
		ev.Config{
			Receiver: cfg.Receiver,
			Handler:  srv,
		},
		ev.WithEvent(event.EntMutation),
	)
	return srv
}

// Serve starts the server.
func (s *Server) Serve(ctx context.Context) error {
	return s.service.Run(ctx)
}

// Shutdown terminates the server.
func (s *Server) Shutdown(ctx context.Context) error {
	return s.service.Stop(ctx)
}

// HandleEvent implement ev.EventHandler interface.
func (s *Server) HandleEvent(ctx context.Context, evt *ev.Event) error {
	entry, ok := evt.Object.(event.LogEntry)
	if !ok {
		return fmt.Errorf("event object %T must be a log entry", evt.Object)
	}
	if err := s.handleLogEntry(ctx, evt.Tenant, entry); err != nil {
		s.logger.For(ctx).Error("failed to handle event", zap.Error(err))
	}
	return nil
}

func (s *Server) handleLogEntry(ctx context.Context, tenant string, entry event.LogEntry) error {
	client, err := s.tenancy.ClientFor(ctx, tenant)
	if err != nil {
		const msg = "cannot get tenancy client"
		s.logger.For(ctx).Error(msg, zap.Error(err))
		return fmt.Errorf("%s. tenant: %s", msg, tenant)
	}
	ctx = ent.NewContext(ctx, client)

	var featureList []string
	snapshot, err := s.features.Latest(ctx)
	if err != nil {
		return err
	}
	if tenantFeatures, ok := snapshot.Value.(viewer.TenantFeatures); ok {
		if features, ok := tenantFeatures[tenant]; ok {
			featureList = features
		}
	}
	v := viewer.NewAutomation(tenant, ServiceName, user.RoleOwner,
		viewer.WithFeatures(featureList...),
	)
	ctx = log.NewFieldsContext(ctx, zap.Object("viewer", v))
	ctx = viewer.NewContext(ctx, v)
	permissions, err := authz.Permissions(ctx)
	if err != nil {
		const msg = "cannot get permissions"
		s.logger.For(ctx).Error(msg,
			zap.Error(err),
		)
		return fmt.Errorf("%s. tenant: %s, name: %s", msg, tenant, ServiceName)
	}
	ctx = authz.NewContext(ctx, permissions)

	for _, h := range s.handlers {
		if err := s.runHandlerWithTransaction(ctx, h, entry); err != nil {
			s.logger.For(ctx).Error("running handler", zap.Error(err))
		}
	}
	return nil
}

func (s *Server) runHandlerWithTransaction(ctx context.Context, h NamedHandler, entry event.LogEntry) error {
	ctx, span := trace.StartSpan(ctx, h.Name)
	defer span.End()
	span.AddAttributes(
		trace.StringAttribute("operation", entry.Operation.String()),
		trace.StringAttribute("type", entry.Type),
		trace.Int64Attribute("ent_id", int64(event.GetEntID(entry))),
	)
	tx, err := ent.FromContext(ctx).Tx(ctx)
	if err != nil {
		return fmt.Errorf("creating transaction: %w", err)
	}
	ctx = ent.NewTxContext(ctx, tx)
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
			panic(r)
		}
	}()
	ctx = ent.NewContext(ctx, tx.Client())
	if err := h.Handler.Handle(ctx, s.logger, entry); err != nil {
		if r := tx.Rollback(); r != nil {
			err = fmt.Errorf("rolling back transaction: %v", r)
		}
		return err
	}
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("committing transaction: %w", err)
	}
	return nil
}
