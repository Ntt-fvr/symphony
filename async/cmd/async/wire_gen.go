// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package main

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/health"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/gorilla/mux"
	"github.com/opentracing/opentracing-go"
	"go.opencensus.io/stats/view"
	"go.uber.org/cadence/client"
	"go.uber.org/cadence/workflow"
	"go.uber.org/zap"
	"gocloud.dev/blob"
	"gocloud.dev/runtimevar"
	health2 "gocloud.dev/server/health"
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
	factory := triggers.NewFactory()
	actionsFactory := actions.NewFactory()
	flower := &hooks.Flower{
		TriggerFactory: factory,
		ActionFactory:  actionsFactory,
	}
	tenancy := newTenancy(mySQLTenancy, eventer, flower)
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
	telemetryConfig := &flags.TelemetryConfig
	tracer, cleanup6, err := telemetry.ProvideJaegerTracer(telemetryConfig)
	if err != nil {
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	zapLogger := log.ProvideZapLogger(logger)
	poller := health.NewHealthPoller(zapLogger)
	v := newWorkers(tenancy, variable, logger)
	cadenceClientConfig := provideCadenceConfig(flags, tenancy, tracer, logger, poller, v)
	cadenceClient, cleanup7, err := worker.ProvideCadenceClient(cadenceClientConfig)
	if err != nil {
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v2 := newHandlers(bucket, flags, cadenceClient, tenancy, tracer)
	handlerConfig := handler.Config{
		Tenancy:      tenancy,
		Features:     variable,
		Receiver:     receiver,
		Logger:       logger,
		Handlers:     v2,
		HealthPoller: poller,
	}
	handlerServer := handler.NewServer(handlerConfig)
	router := mux.NewRouter()
	xserverZapLogger := xserver.NewRequestLogger(logger)
	v3 := newHealthChecks(mySQLTenancy, cadenceClient)
	v4 := provideViews()
	config2 := flags.TelemetryConfig
	exporter, err := telemetry.ProvideViewExporter(config2)
	if err != nil {
		cleanup7()
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	traceExporter, cleanup8, err := telemetry.ProvideTraceExporter(config2)
	if err != nil {
		cleanup7()
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	profilingEnabler := _wireProfilingEnablerValue
	sampler := telemetry.ProvideTraceSampler(config2)
	handlerFunc := xserver.NewRecoveryHandler(logger)
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         xserverZapLogger,
		HealthChecks:          v3,
		Views:                 v4,
		ViewExporter:          exporter,
		TraceExporter:         traceExporter,
		EnableProfiling:       profilingEnabler,
		DefaultSamplingPolicy: sampler,
		RecoveryHandler:       handlerFunc,
		Driver:                defaultDriver,
	}
	serverServer := server.New(router, options)
	mainApplication := newApplication(handlerServer, serverServer, cadenceClient, zapLogger, flags)
	return mainApplication, func() {
		cleanup8()
		cleanup7()
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

func newApplication(server2 *handler.Server, http *server.Server, cadenceClient *worker.CadenceClient, logger *zap.Logger, flags *cliFlags) *application {
	var app application
	app.logger = logger
	app.server = server2
	app.http.Server = http
	app.http.addr = flags.HTTPAddr
	app.cadenceClient = cadenceClient
	return &app
}

func provideCadenceConfig(flags *cliFlags, tenancy viewer.Tenancy, tracer opentracing.Tracer, logger log.Logger, healthPoller health.Poller, workers []worker.Worker) worker.CadenceClientConfig {
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

func newHealthChecks(tenancy *viewer.MySQLTenancy, cadenceClient *worker.CadenceClient) []health2.Checker {
	return []health2.Checker{tenancy, cadenceClient}
}

func newMySQLTenancy(mySQLConfig mysql.Config, tenancyConfig viewer.Config, logger log.Logger) (*viewer.MySQLTenancy, error) {
	tenancy, err := viewer.NewMySQLTenancy(mySQLConfig.String(), tenancyConfig.TenantMaxConn)
	if err != nil {
		return nil, fmt.Errorf("creating mysql tenancy: %w", err)
	}
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

func newHandlers(bucket *blob.Bucket, flags *cliFlags, cadenceClient *worker.CadenceClient, tenancy viewer.Tenancy, tracer opentracing.Tracer) []handler.Handler {
	return []handler.Handler{handler.New(handler.HandleConfig{
		Name:    "activity_log",
		Handler: handler.Func(handler.HandleActivityLog),
	}), handler.New(handler.HandleConfig{
		Name:    "export_task",
		Handler: handler.NewExportHandler(bucket, flags.ExportBucketPrefix),
	}, handler.WithTransaction(false)), handler.New(handler.HandleConfig{
		Name: "flow",
		Handler: handler.NewFlowHandler(cadenceClient.GetClient(&client.Options{
			Tracer:             tracer,
			ContextPropagators: []workflow.ContextPropagator{worker.NewContextPropagator(tenancy)},
		})),
	}, handler.WithTransaction(false)),
	}
}

func newWorkers(tenancy viewer.Tenancy, features *runtimevar.Variable, logger log.Logger) []worker.Worker {
	return []worker.Worker{worker.NewFlowWorker(worker.FlowWorkerConfig{
		Tenancy:  tenancy,
		Features: features,
		Logger:   logger,
	}),
	}
}
