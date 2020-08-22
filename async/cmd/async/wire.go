// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// +build wireinject

package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/google/wire"
	"github.com/gorilla/mux"
	"go.opencensus.io/stats/view"
	"go.uber.org/zap"
	"gocloud.dev/blob"
	"gocloud.dev/server/health"
)

// NewApplication creates a new graph application.
func NewApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*cliFlags),
			"MySQLConfig",
			"LogConfig",
			"EventPubURL",
			"TelemetryConfig",
			"TenancyConfig",
		),
		log.Provider,
		newTenancy,
		wire.Struct(
			new(event.Eventer),
			"*",
		),
		viewer.SyncFeatures,
		newMySQLTenancy,
		ev.ProvideEmitter,
		wire.Bind(
			new(ev.EmitterFactory),
			new(ev.TopicFactory),
		),
		ev.ProvideReceiver,
		provideReceiverFactory,
		wire.InterfaceValue(
			new(ev.EventObject),
			event.LogEntry{},
		),
		newHealthChecks,
		mux.NewRouter,
		wire.Bind(
			new(http.Handler),
			new(*mux.Router),
		),
		xserver.ServiceSet,
		provideViews,
		wire.Struct(
			new(handler.Config), "*",
		),
		handler.NewServer,
		newHandlers,
		newApplication,
	)
	return nil, nil, nil
}

func newApplication(server *handler.Server, http *server.Server, logger *zap.Logger, flags *cliFlags) *application {
	var app application
	app.logger = logger
	app.server = server
	app.http.Server = http
	app.http.addr = flags.HTTPAddr.String()
	return &app
}

func newTenancy(tenancy *viewer.MySQLTenancy, eventer *event.Eventer) viewer.Tenancy {
	return viewer.NewCacheTenancy(tenancy, eventer.HookTo)
}

func newHealthChecks(tenancy *viewer.MySQLTenancy) []health.Checker {
	return []health.Checker{tenancy}
}

func newMySQLTenancy(mySQLConfig mysql.Config, tenancyConfig viewer.Config, logger log.Logger) (*viewer.MySQLTenancy, error) {
	tenancy, err := viewer.NewMySQLTenancy(mySQLConfig.String(), tenancyConfig.TenantMaxConn)
	if err != nil {
		return nil, fmt.Errorf("creating mysql tenancy: %w", err)
	}
	tenancy.SetLogger(logger)
	mysql.SetLogger(logger)
	return tenancy, nil
}

func provideViews() []*view.View {
	views := xserver.DefaultViews()
	views = append(views, mysql.DefaultViews...)
	views = append(views, ocpubsub.DefaultViews...)
	views = append(views, ev.OpenCensusViews...)
	return views
}

func provideReceiverFactory(flags *cliFlags) ev.ReceiverFactory {
	return flags.EventSubURL
}

func newBucket(ctx context.Context, flags *cliFlags) (*blob.Bucket, func(), error) {
	bucket, err := blob.OpenBucket(ctx, flags.ExportBlobURL.String())
	if err != nil {
		return nil, nil, fmt.Errorf("cannot open blob bucket: %w", err)
	}
	bucket = blob.PrefixedBucket(bucket, flags.ExportBucketPrefix)
	return bucket, func() { _ = bucket.Close() }, nil
}

func newHandlers() []handler.NamedHandler {
	return []handler.NamedHandler{
		{
			Name:    "activity_log",
			Handler: handler.Func(handler.HandleActivityLog),
		},
	}
}
