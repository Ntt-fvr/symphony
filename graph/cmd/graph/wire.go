// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//+build wireinject

package main

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/graph/graphhttp"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/google/wire"
	"gocloud.dev/server/health"
	"google.golang.org/grpc"
)

func newApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*cliFlags),
			"MySQLConfig",
			"AuthURL",
			"EventPubsubURL",
			"LogConfig",
			"TelemetryConfig",
			"Orc8rConfig",
			"TenancyConfig",
		),
		log.Provider,
		newApp,
		newTenancy,
		wire.Struct(
			new(event.Eventer),
			"*",
		),
		newHealthChecks,
		newMySQLTenancy,
		mysql.Provider,
		ev.ProvideEmitter,
		wire.Bind(
			new(ev.EmitterFactory),
			new(ev.TopicFactory),
		),
		wire.Bind(
			new(ev.ReceiverFactory),
			new(ev.TopicFactory),
		),
		triggers.NewFactory,
		actions.NewFactory,
		graphhttp.NewServer,
		wire.Struct(
			new(graphhttp.Config), "*",
		),
		graphgrpc.NewServer,
		wire.Struct(
			new(graphgrpc.Config), "*",
		),
	)
	return nil, nil, nil
}

func newApp(logger log.Logger, httpServer *server.Server, grpcServer *grpc.Server, flags *cliFlags) *application {
	var app application
	app.Logger = logger.Background()
	app.http.Server = httpServer
	app.http.addr = flags.HTTPAddress
	app.grpc.Server = grpcServer
	app.grpc.addr = flags.GRPCAddress
	return &app
}

func newTenancy(tenancy *viewer.MySQLTenancy, eventer *event.Eventer, triggerFactory triggers.Factory, actionFactory actions.Factory) viewer.Tenancy {
	return viewer.NewCacheTenancy(tenancy, func(client *ent.Client) {
		hooker := hooks.Flower{
			TriggerFactory: triggerFactory,
			ActionFactory:  actionFactory,
		}
		hooker.HookTo(client)
		eventer.HookTo(client)
	})
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
