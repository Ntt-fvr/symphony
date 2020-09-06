// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.opencensus.io/trace"
)

// A Handler handles incoming events.
type Handler interface {
	Handle(context.Context, log.Logger, ev.EventObject) error
}

// The Func type is an adapter to allow the use of
// ordinary functions as handlers.
type Func func(context.Context, log.Logger, ev.EventObject) error

// Handle returns f(ctx, entry).
func (f Func) Handle(ctx context.Context, logger log.Logger, evt ev.EventObject) error {
	return f(ctx, logger, evt)
}

// handler contains the handler to run on every event, with the name for tracking purposes and transactional flag.
type handler struct {
	name          string
	handler       Handler
	transactional bool
}

// HandleConfig contains the configuration for a Handler.
type HandleConfig struct {
	Name    string
	Handler Handler
}

// handler options.
type Option func(*handler)

// New returns a new handler from HandlerConfig and options.
func New(config HandleConfig, opts ...Option) Handler {
	handler := handler{
		name:          config.Name,
		handler:       config.Handler,
		transactional: true,
	}
	for _, opt := range opts {
		opt(&handler)
	}
	return handler
}

// WithTransaction sets the transaction field for an Handler.
func WithTransaction(b bool) Option {
	return func(h *handler) {
		h.transactional = b
	}
}

// Handle handles incoming events and sets span.
func (h handler) Handle(ctx context.Context, logger log.Logger, evt ev.EventObject) error {
	ctx, span := trace.StartSpan(ctx, h.name)
	defer span.End()
	if entry, ok := evt.(event.LogEntry); ok {
		span.AddAttributes(
			trace.StringAttribute("operation", entry.Operation.String()),
			trace.StringAttribute("type", entry.Type),
			trace.Int64Attribute("ent_id", int64(event.GetEntID(entry))),
		)
	}
	if h.transactional {
		return h.runHandlerWithTransaction(ctx, logger, evt)
	}
	return h.handler.Handle(ctx, logger, evt)
}

func (h *handler) runHandlerWithTransaction(ctx context.Context, logger log.Logger, evt ev.EventObject) error {
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
	if err := h.handler.Handle(ctx, logger, evt); err != nil {
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
