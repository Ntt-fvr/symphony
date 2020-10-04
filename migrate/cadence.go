// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"fmt"

	"github.com/AlekSi/pointer"
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	"github.com/facebookincubator/symphony/pkg/log"
	_ "github.com/go-sql-driver/mysql"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"go.uber.org/cadence/.gen/go/shared"
	"go.uber.org/cadence/client"
	"go.uber.org/yarpc"
	"go.uber.org/yarpc/transport/tchannel"
	"go.uber.org/zap"
)

const (
	cadenceClientName      = "cadence-client"
	cadenceFrontendService = "cadence-frontend"
)

type cadenceMigrator struct {
	logger          log.Logger
	address         string
	domain          string
	retentionInDays int32
}

func (m cadenceMigrator) migrate(ctx context.Context) error {
	logger := m.logger.For(ctx)
	logger.Info("getting cadence client", zap.String("address", m.address))
	cc, cleanup, err := m.getCadenceClient(m.address)
	if err != nil {
		return fmt.Errorf("creating cadence client: %w", err)
	}
	defer cleanup()
	logger.Info("registering domain", zap.String("domain", m.domain))
	if err := m.registerDomain(ctx, cc, m.domain, m.retentionInDays); err != nil {
		return fmt.Errorf("failed to register domain: %w", err)
	}
	return nil
}

func (m cadenceMigrator) getCadenceClient(cadenceAddr string) (workflowserviceclient.Interface, func(), error) {
	ch, err := tchannel.NewChannelTransport(
		tchannel.ServiceName(cadenceClientName))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create transport channel: %w", err)
	}
	dispatcher := yarpc.NewDispatcher(yarpc.Config{
		Name: cadenceClientName,
		Outbounds: yarpc.Outbounds{
			cadenceFrontendService: {Unary: ch.NewSingleOutbound(cadenceAddr)},
		},
	})
	if err := dispatcher.Start(); err != nil {
		return nil, nil, fmt.Errorf("failed to create outbound transport channel: %w", err)
	}
	return workflowserviceclient.New(dispatcher.ClientConfig(cadenceFrontendService)), func() {
		_ = dispatcher.Stop()
	}, nil
}

func (m cadenceMigrator) registerDomain(ctx context.Context, cc workflowserviceclient.Interface, domain string, retentionInDays int32) error {
	domainClient := client.NewDomainClient(cc, nil)
	if _, err := domainClient.Describe(ctx, domain); err != nil {
		switch err := err.(type) {
		case *shared.EntityNotExistsError:
			if err := domainClient.Register(ctx, &shared.RegisterDomainRequest{
				Name:                                   pointer.ToString(domain),
				WorkflowExecutionRetentionPeriodInDays: pointer.ToInt32(retentionInDays),
				EmitMetric:                             pointer.ToBool(true),
			}); err != nil {
				return fmt.Errorf("register domain: %w", err)
			}
		default:
			return fmt.Errorf("failed to find domain: %w", err)
		}
	} else if err := domainClient.Update(ctx, &shared.UpdateDomainRequest{
		Name: pointer.ToString(domain),
		Configuration: &shared.DomainConfiguration{
			WorkflowExecutionRetentionPeriodInDays: pointer.ToInt32OrNil(retentionInDays),
			EmitMetric:                             pointer.ToBool(true),
		},
	}); err != nil {
		return fmt.Errorf("update domain: %w", err)
	}
	return nil
}
