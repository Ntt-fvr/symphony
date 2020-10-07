// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// +build wireinject

package main

import (
	"context"
	"fmt"
	"net/http"

	"contrib.go.opencensus.io/integrations/ocsql"
	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	health2 "github.com/facebookincubator/symphony/pkg/health"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/opentracing/opentracing-go"

	"github.com/google/wire"
	"github.com/gorilla/mux"
	"go.opencensus.io/stats/view"
	"go.uber.org/cadence/client"
	"go.uber.org/cadence/workflow"
	"go.uber.org/zap"
	"gocloud.dev/blob"
	"gocloud.dev/runtimevar"
	"gocloud.dev/server/health"
)

// NewApplication creates a new async application.
func NewApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*cliFlags),
			"DatabaseURL",
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
		viewer.NewMySQLTenancy,
		wire.FieldsOf(
			new(viewer.Config),
			"TenantMaxConn",
		),
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
		triggers.NewFactory,
		actions.NewFactory,
		wire.Struct(
			new(hooks.Flower),
			"*",
		),
		newHealthChecks,
		mux.NewRouter,
		wire.Bind(
			new(http.Handler),
			new(*mux.Router),
		),
		xserver.ServiceSet,
		provideViews,
		health2.NewHealthPoller,
		wire.Struct(
			new(handler.Config), "*",
		),
		handler.NewServer,
		newWorkers,
		provideCadenceConfig,
		worker.ProvideCadenceClient,
		newBucket,
		newHandlers,
		newApplication,
	)
	return nil, nil, nil
}

func newApplication(server *handler.Server, http *server.Server, cadenceClient *worker.CadenceClient, logger *zap.Logger, flags *cliFlags) *application {
	var app application
	app.logger = logger
	app.server = server
	app.http.Server = http
	app.http.addr = flags.HTTPAddr
	app.cadenceClient = cadenceClient
	return &app
}

func provideCadenceConfig(flags *cliFlags, tenancy viewer.Tenancy, tracer opentracing.Tracer, logger log.Logger, healthPoller health2.Poller, workers []worker.Worker) worker.CadenceClientConfig {
	return worker.CadenceClientConfig{
		CadenceAddr:  flags.CadenceAddr,
		Domain:       flags.CadenceDomain,
		Workers:      workers,
		Tenancy:      tenancy,
		Tracer:       tracer,
		Logger:       logger,
		HealthPoller: healthPoller,
	}
}

func newTenancy(tenancy *viewer.MySQLTenancy, eventer *event.Eventer, flower *hooks.Flower) viewer.Tenancy {
	return viewer.NewCacheTenancy(tenancy, func(client *ent.Client) {
		eventer.HookTo(client)
		flower.HookTo(client)
	})
}

func newHealthChecks(tenancy *viewer.MySQLTenancy, cadenceClient *worker.CadenceClient) []health.Checker {
	return []health.Checker{tenancy, cadenceClient}
}

func provideViews() []*view.View {
	views := xserver.DefaultViews()
	views = append(views, ocsql.DefaultViews...)
	views = append(views, ocpubsub.DefaultViews...)
	views = append(views, ev.OpenCensusViews...)
	return views
}

func provideReceiverFactory(flags *cliFlags) ev.ReceiverFactory {
	return flags.EventSubURL
}

func newBucket(ctx context.Context, flags *cliFlags) (*blob.Bucket, func(), error) {
	bucket, err := blob.OpenBucket(ctx, flags.ExportBucketURL.String())
	if err != nil {
		return nil, nil, fmt.Errorf("cannot open blob bucket: %w", err)
	}
	return bucket, func() { _ = bucket.Close() }, nil
}

func newHandlers(bucket *blob.Bucket, flags *cliFlags, cadenceClient *worker.CadenceClient, tenancy viewer.Tenancy, tracer opentracing.Tracer) []handler.Handler {
	return []handler.Handler{
		handler.New(handler.HandleConfig{
			Name:    "activity_log",
			Handler: handler.Func(handler.HandleActivityLog),
		}),
		handler.New(handler.HandleConfig{
			Name:    "export_task",
			Handler: handler.NewExportHandler(bucket, flags.ExportBucketPrefix),
		}, handler.WithTransaction(false)),
		handler.New(handler.HandleConfig{
			Name: "flow",
			Handler: handler.NewFlowHandler(cadenceClient.GetClient(&client.Options{
				Tracer: tracer,
				ContextPropagators: []workflow.ContextPropagator{
					worker.NewContextPropagator(tenancy),
				},
			})),
		}, handler.WithTransaction(false)),
	}
}

func newWorkers(tenancy viewer.Tenancy, features *runtimevar.Variable, logger log.Logger) []worker.Worker {
	return []worker.Worker{
		worker.NewFlowWorker(worker.FlowWorkerConfig{
			Tenancy:  tenancy,
			Features: features,
			Logger:   logger,
		}),
	}
}
