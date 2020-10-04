// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/log"
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

type CadenceClientConfig struct {
	CadenceAddr string
	Domain      string
	Tenancy     viewer.Tenancy
	Tracer      opentracing.Tracer
	Logger      log.Logger
}

type CadenceClient struct {
	client       workflowserviceclient.Interface
	domain       string
	tenancy      viewer.Tenancy
	tracer       opentracing.Tracer
	logger       log.Logger
	domainWorker worker.Worker
}

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
		client:  client,
		domain:  cfg.Domain,
		tenancy: cfg.Tenancy,
		tracer:  cfg.Tracer,
		logger:  cfg.Logger,
	}, func() { _ = dispatcher.Stop() }, nil
}

func (cc CadenceClient) CheckHealth() error {
	domainClient := client.NewDomainClient(cc.client, nil)
	if _, err := domainClient.Describe(context.Background(), cc.domain); err != nil {
		return fmt.Errorf("failed to find domain: %w", err)
	}
	return nil
}

// Run starts the workers polling.
func (cc *CadenceClient) Run(ctx context.Context, registerWorker func(worker.Worker)) error {
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

// Shutdown terminates the server.
func (cc *CadenceClient) Shutdown() {
	cc.domainWorker.Stop()
}
