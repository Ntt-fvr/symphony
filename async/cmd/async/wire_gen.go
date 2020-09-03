// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package main

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/gorilla/mux"
	"go.opencensus.io/stats/view"
	"go.uber.org/zap"
	"gocloud.dev/blob"
	"gocloud.dev/server/health"
)

import (
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "github.com/go-sql-driver/mysql"
	_ "gocloud.dev/blob/s3blob"
	_ "gocloud.dev/pubsub/mempubsub"
	_ "gocloud.dev/pubsub/natspubsub"
)

// Injectors from wire.go:

func NewApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	config := flags.MySQLConfig
	viewerConfig := flags.TenancyConfig
	logConfig := flags.LogConfig
	logger, cleanup, err := log.ProvideLogger(logConfig)
	if err != nil {
		return nil, nil, err
	}
	mySQLTenancy, err := newMySQLTenancy(config, viewerConfig, logger)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	topicFactory := flags.EventPubURL
	emitter, cleanup2, err := ev.ProvideEmitter(ctx, topicFactory)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	eventer := &event.Eventer{
		Logger:  logger,
		Emitter: emitter,
	}
	tenancy := newTenancy(mySQLTenancy, eventer)
	variable, cleanup3, err := viewer.SyncFeatures(viewerConfig)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	receiverFactory := provideReceiverFactory(flags)
	eventObject := _wireLogEntryValue
	receiver, cleanup4, err := ev.ProvideReceiver(ctx, receiverFactory, eventObject)
	if err != nil {
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	bucket, cleanup5, err := newBucket(ctx, flags)
	if err != nil {
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v := newHandlers(bucket, flags)
	handlerConfig := handler.Config{
		Tenancy:  tenancy,
		Features: variable,
		Receiver: receiver,
		Logger:   logger,
		Handlers: v,
	}
	handlerServer := handler.NewServer(handlerConfig)
	router := mux.NewRouter()
	zapLogger := xserver.NewRequestLogger(logger)
	v2 := newHealthChecks(mySQLTenancy)
	v3 := provideViews()
	telemetryConfig := &flags.TelemetryConfig
	exporter, err := telemetry.ProvideViewExporter(telemetryConfig)
	if err != nil {
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	traceExporter, cleanup6, err := telemetry.ProvideTraceExporter(telemetryConfig)
	if err != nil {
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	profilingEnabler := _wireProfilingEnablerValue
	sampler := telemetry.ProvideTraceSampler(telemetryConfig)
	handlerFunc := xserver.NewRecoveryHandler(logger)
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         zapLogger,
		HealthChecks:          v2,
		Views:                 v3,
		ViewExporter:          exporter,
		TraceExporter:         traceExporter,
		EnableProfiling:       profilingEnabler,
		DefaultSamplingPolicy: sampler,
		RecoveryHandler:       handlerFunc,
		Driver:                defaultDriver,
	}
	serverServer := server.New(router, options)
	logger2 := log.ProvideZapLogger(logger)
	mainApplication := newApplication(handlerServer, serverServer, logger2, flags)
	return mainApplication, func() {
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
	}, nil
}

var (
	_wireLogEntryValue         = event.LogEntry{}
	_wireProfilingEnablerValue = server.ProfilingEnabler(true)
	_wireDefaultDriverValue    = &server.DefaultDriver{}
)

// wire.go:

func newApplication(server2 *handler.Server, http *server.Server, logger *zap.Logger, flags *cliFlags) *application {
	var app application
	app.logger = logger
	app.server = server2
	app.http.Server = http
	app.http.addr = flags.HTTPAddr
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
	bucket, err := blob.OpenBucket(ctx, flags.ExportBucketURL.String())
	if err != nil {
		return nil, nil, fmt.Errorf("cannot open blob bucket: %w", err)
	}
	return bucket, func() { _ = bucket.Close() }, nil
}

func newHandlers(bucket *blob.Bucket, flags *cliFlags) []handler.Handler {
	return []handler.Handler{handler.New(handler.HandleConfig{
		Name:    "activity_log",
		Handler: handler.Func(handler.HandleActivityLog),
	}), handler.New(handler.HandleConfig{
		Name:    "export_task",
		Handler: handler.NewExportHandler(bucket, flags.ExportBucketPrefix),
	}, handler.WithTransaction(false)),
	}
}
