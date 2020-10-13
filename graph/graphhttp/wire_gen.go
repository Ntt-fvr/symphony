// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package graphhttp

import (
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"gocloud.dev/server/health"
	"net/url"
)

// Injectors from wire.go:

func NewServer(cfg Config) (*server.Server, func(), error) {
	graphhttpRouterConfig, err := newRouterConfig(cfg)
	if err != nil {
		return nil, nil, err
	}
	router, err := newRouter(graphhttpRouterConfig)
	if err != nil {
		return nil, nil, err
	}
	logger := cfg.Logger
	zapLogger := xserver.NewRequestLogger(logger)
	v := cfg.HealthChecks
	config := cfg.Telemetry
	exporter, cleanup, err := telemetry.ProvideTraceExporter(config)
	if err != nil {
		return nil, nil, err
	}
	profilingEnabler := _wireProfilingEnablerValue
	sampler := telemetry.ProvideTraceSampler(config)
	handlerFunc := xserver.NewRecoveryHandler(logger)
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         zapLogger,
		HealthChecks:          v,
		TraceExporter:         exporter,
		EnableProfiling:       profilingEnabler,
		DefaultSamplingPolicy: sampler,
		RecoveryHandler:       handlerFunc,
		Driver:                defaultDriver,
	}
	serverServer := server.New(router, options)
	return serverServer, func() {
		cleanup()
	}, nil
}

var (
	_wireProfilingEnablerValue = server.ProfilingEnabler(true)
	_wireDefaultDriverValue    = &server.DefaultDriver{}
)

// wire.go:

// Config defines the http server config.
type Config struct {
	Tenancy         viewer.Tenancy
	AuthURL         *url.URL
	ReceiverFactory ev.ReceiverFactory
	TriggerFactory  triggers.Factory
	ActionFactory   actions.Factory
	Logger          log.Logger
	Telemetry       telemetry.Config
	HealthChecks    []health.Checker
}

func newRouterConfig(config Config) (cfg routerConfig, err error) {
	cfg = routerConfig{logger: config.Logger}
	cfg.viewer.tenancy = config.Tenancy
	cfg.viewer.authurl = config.AuthURL.String()
	cfg.events.ReceiverFactory = config.ReceiverFactory
	cfg.flow.triggerFactory = config.TriggerFactory
	cfg.flow.actionFactory = config.ActionFactory
	return cfg, nil
}
