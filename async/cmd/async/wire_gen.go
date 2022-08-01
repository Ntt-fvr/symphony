// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"context"
	"contrib.go.opencensus.io/integrations/ocsql"
	"fmt"
	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/cadence"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/health"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/metrics"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/opentracing/opentracing-go"
	"go.opencensus.io/stats/view"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"gocloud.dev/blob"
	"gocloud.dev/runtimevar"
	health2 "gocloud.dev/server/health"
	"net/http"
)

import (
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "github.com/go-sql-driver/mysql"
	_ "gocloud.dev/blob/azureblob"
	_ "gocloud.dev/blob/gcsblob"
	_ "gocloud.dev/blob/s3blob"
	_ "gocloud.dev/pubsub/mempubsub"
	_ "gocloud.dev/pubsub/natspubsub"
)

// Injectors from wire.go:

// NewApplication creates a new async application.
func NewApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	config := flags.LogConfig
	logger, cleanup, err := log.ProvideLogger(config)
	if err != nil {
		return nil, nil, err
	}
	zapLogger := log.ProvideZapLogger(logger)
	httpHandler := http.NotFoundHandler()
	xserverZapLogger := xserver.NewRequestLogger(logger)
	url := flags.DatabaseURL
	viewerConfig := flags.TenancyConfig
	int2 := viewerConfig.TenantMaxConn
	mySQLTenancy, err := viewer.NewMySQLTenancy(ctx, url, int2)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	workflowserviceclientInterface, cleanup2, err := provideCadenceClient(logger, flags)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	bucket, cleanup3, err := newBucket(ctx, flags)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v := newWorkerFactories(logger, bucket, flags)
	healthChecker, cleanup4 := worker.NewHealthChecker(workflowserviceclientInterface, v, logger)
	variable, cleanup5, err := viewer.SyncFeatures(viewerConfig)
	if err != nil {
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v2 := provideHealthCheckers(mySQLTenancy, healthChecker, variable)
	telemetryConfig := flags.TelemetryConfig
	exporter, cleanup6, err := telemetry.ProvideTraceExporter(telemetryConfig)
	if err != nil {
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	profilingAddress := _wireProfilingAddressValue
	sampler := telemetry.ProvideTraceSampler(telemetryConfig)
	handlerFunc := xserver.NewRecoveryHandler(logger)
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         xserverZapLogger,
		HealthChecks:          v2,
		TraceExporter:         exporter,
		ProfilingAddress:      profilingAddress,
		DefaultSamplingPolicy: sampler,
		RecoveryHandler:       handlerFunc,
		Driver:                defaultDriver,
	}
	serverServer := server.New(httpHandler, options)
	string2 := flags.ListenAddress
	viewExporter, err := telemetry.ProvideViewExporter(telemetryConfig)
	if err != nil {
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v3 := provideViews()
	metricsConfig := metrics.Config{
		Log:      zapLogger,
		Exporter: viewExporter,
		Views:    v3,
	}
	metricsMetrics := metrics.New(metricsConfig)
	addr := flags.MetricsAddress
	topicFactory := flags.EventPubURL
	emitter, cleanup7, err := ev.ProvideEmitter(ctx, topicFactory)
	if err != nil {
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
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
	receiverFactory := provideReceiverFactory(flags)
	eventObject := _wireLogEntryValue
	receiver, cleanup8, err := ev.ProvideReceiver(ctx, receiverFactory, eventObject)
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
	config2 := &flags.TelemetryConfig
	tracer, cleanup9, err := telemetry.ProvideJaegerTracer(config2)
	if err != nil {
		cleanup8()
		cleanup7()
		cleanup6()
		cleanup5()
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	poller := health.NewPoller(zapLogger, v2)
	workerConfig := worker.Config{
		Client:       workflowserviceclientInterface,
		Factories:    v,
		Tenancy:      tenancy,
		Tracer:       tracer,
		Logger:       logger,
		HealthPoller: poller,
	}
	client := worker.NewClient(workerConfig)
	v4 := newHandlers(bucket, flags, client, tenancy, tracer)
	handlerConfig := handler.Config{
		Tenancy:      tenancy,
		Features:     variable,
		Receiver:     receiver,
		Logger:       logger,
		Handlers:     v4,
		HealthPoller: poller,
	}
	handlerServer := handler.NewServer(handlerConfig)
	mainApplication := &application{
		logger:      zapLogger,
		httpServer:  serverServer,
		httpAddr:    string2,
		metrics:     metricsMetrics,
		metricsAddr: addr,
		server:      handlerServer,
		client:      client,
	}
	return mainApplication, func() {
		cleanup9()
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
	_wireProfilingAddressValue = server.ProfilingAddress(":6060")
	_wireDefaultDriverValue    = &server.DefaultDriver{}
	_wireLogEntryValue         = event.LogEntry{}
)

// wire.go:

func newTenancy(tenancy *viewer.MySQLTenancy, eventer *event.Eventer, flower *hooks.Flower) viewer.Tenancy {
	return viewer.NewCacheTenancy(tenancy, func(client *ent.Client) {
		eventer.HookTo(client)
		flower.HookTo(client)
	})
}

func provideHealthCheckers(
	tenancy *viewer.MySQLTenancy,
	checker *worker.HealthChecker,
	features *runtimevar.Variable,
) []health2.Checker {
	return []health2.Checker{tenancy, checker, features}
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

func provideCadenceClient(logger log.Logger, flags *cliFlags) (workflowserviceclient.Interface, func(), error) {
	return cadence.ProvideClient(logger.Background(), flags.CadenceAddr)
}

func newHandlers(bucket *blob.Bucket, flags *cliFlags, client *worker.Client, tenancy viewer.Tenancy, tracer opentracing.Tracer) []handler.Handler {
	return []handler.Handler{handler.New(handler.HandleConfig{
		Name:    "activity_log",
		Handler: handler.Func(handler.HandleActivityLog),
	}), handler.New(handler.HandleConfig{
		Name: "export_task",
		Handler: handler.NewExportHandler(
			bucket, flags.ExportBucketPrefix, client.GetCadenceClient(worker.ExportDomainName.String())),
	}, handler.WithTransaction(false)), handler.New(handler.HandleConfig{
		Name:    "flow",
		Handler: handler.NewFlowHandler(client.GetCadenceClient(worker.FlowDomainName.String())),
	}, handler.WithTransaction(false)), handler.New(handler.HandleConfig{
		Name:    "flow_automationactivities_log",
		Handler: handler.Func(handler.HandleFlowActivities),
	}), handler.New(handler.HandleConfig{
		Name:    "block_automationactivities_log",
		Handler: handler.Func(handler.HandleBlockActivities),
	}), handler.New(handler.HandleConfig{
		Name:    "automation_signal",
		Handler: handler.Func(handler.HandleAutomationSignal),
	}),
	}
}

func newWorkerFactories(logger log.Logger, bucket *blob.Bucket, flags *cliFlags) []worker.DomainFactory {
	return []worker.DomainFactory{worker.NewFlowFactory(logger), worker.NewExportFactory(logger, bucket, flags.ExportBucketPrefix)}
}
