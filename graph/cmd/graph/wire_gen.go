// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"context"
	"contrib.go.opencensus.io/integrations/ocsql"
	"github.com/facebookincubator/symphony/graph/graphhttp"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server/metrics"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocgql"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.opencensus.io/stats/view"
	"gocloud.dev/server/health"
)

import (
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "gocloud.dev/pubsub/mempubsub"
	_ "gocloud.dev/pubsub/natspubsub"
)

// Injectors from wire.go:

func newApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	config := flags.LogConfig
	logger, cleanup, err := log.ProvideLogger(config)
	if err != nil {
		return nil, nil, err
	}
	zapLogger := log.ProvideZapLogger(logger)
	mySQLTenancy, err := newMySQLTenancy(ctx, flags)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	topicFactory := flags.EventPubsubURL
	emitter, cleanup2, err := ev.ProvideEmitter(ctx, topicFactory)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	automationEmitterFactory := provideAutomationEmitterFactory(flags)
	automationEmitter, cleanup3, err := ev.ProvideAutomationEmitter(ctx, automationEmitterFactory)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	eventer := &event.Eventer{
		Logger:            logger,
		Emitter:           emitter,
		AutomationEmitter: automationEmitter,
	}
	factory := triggers.NewFactory()
	actionsFactory := actions.NewFactory()
	flower := &hooks.Flower{
		TriggerFactory: factory,
		ActionFactory:  actionsFactory,
	}
	tenancy := newTenancy(mySQLTenancy, eventer, flower)
	url := flags.AuthURL
	int2 := flags.ComplexityLimit
	telemetryConfig := flags.TelemetryConfig
	v := newHealthChecks(mySQLTenancy)
	graphhttpConfig := graphhttp.Config{
		Tenancy:         tenancy,
		AuthURL:         url,
		ReceiverFactory: topicFactory,
		TriggerFactory:  factory,
		ActionFactory:   actionsFactory,
		Logger:          logger,
		ComplexityLimit: int2,
		Telemetry:       telemetryConfig,
		HealthChecks:    v,
	}
	server, cleanup4, err := graphhttp.NewServer(graphhttpConfig)
	if err != nil {
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	string2 := flags.ListenAddress
	viewExporter, err := telemetry.ProvideViewExporter(telemetryConfig)
	if err != nil {
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	v2 := provideViews()
	metricsConfig := metrics.Config{
		Log:      zapLogger,
		Exporter: viewExporter,
		Views:    v2,
	}
	metricsMetrics := metrics.New(metricsConfig)
	addr := flags.MetricsAddress
	mainApplication := &application{
		Logger:      zapLogger,
		server:      server,
		addr:        string2,
		metrics:     metricsMetrics,
		metricsAddr: addr,
	}
	return mainApplication, func() {
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
	}, nil
}

// wire.go:

func newTenancy(tenancy *viewer.MySQLTenancy, eventer *event.Eventer, flower *hooks.Flower) viewer.Tenancy {
	return viewer.NewCacheTenancy(tenancy, func(client *ent.Client) {
		eventer.HookTo(client)
		flower.HookTo(client)
	})
}

func newMySQLTenancy(ctx context.Context, flags *cliFlags) (*viewer.MySQLTenancy, error) {
	return viewer.NewMySQLTenancy(ctx, flags.DatabaseURL, flags.TenancyConfig.TenantMaxConn)
}

func newHealthChecks(tenancy *viewer.MySQLTenancy) []health.Checker {
	return []health.Checker{tenancy}
}

func provideViews() []*view.View {
	views := xserver.DefaultViews()
	views = append(views, ocsql.DefaultViews...)
	views = append(views, ocgql.DefaultViews...)
	views = append(views, ocpubsub.DefaultViews...)
	views = append(views, ev.OpenCensusViews...)
	return views
}

func provideAutomationEmitterFactory(flags *cliFlags) ev.AutomationEmitterFactory {
	return flags.AutomationPubURL
}
