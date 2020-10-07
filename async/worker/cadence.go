// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/symphony/pkg/cadence"
	"github.com/facebookincubator/symphony/pkg/health"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/opentracing/opentracing-go"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"go.uber.org/cadence/client"
	"go.uber.org/cadence/worker"
	"go.uber.org/cadence/workflow"
)

const (
	TaskListName = "async"
)

// CadenceClientConfig is the configuration for the cadence client
type CadenceClientConfig struct {
	CadenceAddr string
	Domain      string
	Workers     []Worker
	Tenancy     viewer.Tenancy
	Tracer      opentracing.Tracer
	Logger      log.Logger
}

// CadenceClient is responsible to connect to cadence and create workers that handle available tasks
type CadenceClient struct {
	client       workflowserviceclient.Interface
	domain       string
	workers      []Worker
	tenancy      viewer.Tenancy
	tracer       opentracing.Tracer
	logger       log.Logger
	domainWorker worker.Worker
	healthPoller health.Poller
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
	cc, cleanup, err := cadence.ProvideClient(cfg.Logger.Background(), cfg.CadenceAddr)
	if err != nil {
		return nil, nil, err
	}
	return &CadenceClient{
		client:  cc,
		domain:  cfg.Domain,
		workers: cfg.Workers,
		tenancy: cfg.Tenancy,
		tracer:  cfg.Tracer,
		logger:  cfg.Logger,
		checker: newChecker(cc, cfg.Domain),
	}, cleanup, nil
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

// SetHealthPoller sets the health poller
func (cc *CadenceClient) SetHealthPoller(healthPoller health.Poller) {
	cc.healthPoller = healthPoller
}

// Run makes the worker to start polling.
func (cc *CadenceClient) Run(ctx context.Context) error {
	if cc.healthPoller != nil {
		if err := cc.healthPoller.Wait(ctx); err != nil {
			return fmt.Errorf("failed to wait for health checks: %w", err)
		}
	}
	workerOptions := worker.Options{
		Logger: cc.logger.For(ctx),
		Tracer: cc.tracer,
		ContextPropagators: []workflow.ContextPropagator{
			NewContextPropagator(cc.tenancy),
		},
		DisableStickyExecution: true,
	}
	cc.domainWorker = worker.New(cc.client, cc.domain, TaskListName, workerOptions)
	for _, w := range cc.workers {
		w.Register(cc.domainWorker)
	}
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

// GetClient returns the cadence client.
func (cc *CadenceClient) GetClient(options *client.Options) client.Client {
	return client.NewClient(cc.client, cc.domain, options)
}