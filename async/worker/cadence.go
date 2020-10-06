// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/opentracing/opentracing-go"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"go.uber.org/cadence/client"
	"go.uber.org/cadence/worker"
	"go.uber.org/cadence/workflow"
	"go.uber.org/yarpc"
	"go.uber.org/yarpc/transport/tchannel"
)

const (
	cadenceClientName      = "cadence-client"
	cadenceFrontendService = "cadence-frontend"
	TaskListName           = "async"
)

// CadenceClientConfig is the configuration for the cadence client
type CadenceClientConfig struct {
	CadenceAddr  string
	Domain       string
	Tenancy      viewer.Tenancy
	Tracer       opentracing.Tracer
	Logger       log.Logger
	HealthPoller server.HealthPoller
}

// CadenceClient is responsible to connect to cadence and create workers that handle available tasks
type CadenceClient struct {
	client       workflowserviceclient.Interface
	domain       string
	tenancy      viewer.Tenancy
	tracer       opentracing.Tracer
	logger       log.Logger
	domainWorker worker.Worker
	healthPoller server.HealthPoller
	checker      *checker
}

type checker struct {
	cancel  context.CancelFunc
	stopped <-chan struct{}
	healthy bool
}

func newChecker(c workflowserviceclient.Interface, domain string) *checker {
	ctx, cancel := context.WithCancel(context.Background())
	stopped := make(chan struct{})
	hc := &checker{
		cancel:  cancel,
		stopped: stopped,
	}
	go func() {
		ticker := time.NewTicker(250 * time.Millisecond)
		defer func() {
			ticker.Stop()
			close(stopped)
		}()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				domainClient := client.NewDomainClient(c, nil)
				if _, err := domainClient.Describe(ctx, domain); err == nil {
					hc.healthy = true
					return
				}
			}
		}
	}()
	return hc
}

// ProvideCadenceClient returns back cadence client based on given configuration
func ProvideCadenceClient(cfg CadenceClientConfig) (*CadenceClient, func(), error) {
	ch, err := tchannel.NewChannelTransport(
		tchannel.ServiceName(cadenceClientName))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create transport channel: %w", err)
	}
	dispatcher := yarpc.NewDispatcher(yarpc.Config{
		Name: cadenceClientName,
		Outbounds: yarpc.Outbounds{
			cadenceFrontendService: {Unary: ch.NewSingleOutbound(cfg.CadenceAddr)},
		},
	})
	if err := dispatcher.Start(); err != nil {
		return nil, nil, fmt.Errorf("failed to create outbound transport channel: %w", err)
	}
	client := workflowserviceclient.New(dispatcher.ClientConfig(cadenceFrontendService))
	return &CadenceClient{
		client:       client,
		domain:       cfg.Domain,
		tenancy:      cfg.Tenancy,
		tracer:       cfg.Tracer,
		logger:       cfg.Logger,
		healthPoller: cfg.HealthPoller,
		checker:      newChecker(client, cfg.Domain),
	}, func() { _ = dispatcher.Stop() }, nil
}

func (cc CadenceClient) CheckHealth() error {
	select {
	case <-cc.checker.stopped:
		if !cc.checker.healthy {
			return fmt.Errorf("cadence was unreachable before checker has stopped")
		}
		return nil
	default:
		return fmt.Errorf("still checking if cadence is reachable")
	}
}

// Run makes the worker to start polling.
func (cc *CadenceClient) Run(ctx context.Context) error {
	if err := cc.healthPoller.Wait(ctx); err != nil {
		return fmt.Errorf("failed to wait for health checks: %w", err)
	}
	workerOptions := worker.Options{
		Logger: cc.logger.For(ctx),
		Tracer: cc.tracer,
		ContextPropagators: []workflow.ContextPropagator{
			NewContextPropagator(cc.tenancy),
		},
	}
	cc.domainWorker = worker.New(cc.client, cc.domain, TaskListName, workerOptions)
	if err := cc.domainWorker.Run(); err != nil {
		return fmt.Errorf("failed to run workers: %w", err)
	}
	return nil
}

// Shutdown terminates the worker polling.
func (cc *CadenceClient) Shutdown() {
	cc.checker.cancel()
	cc.domainWorker.Stop()
}
