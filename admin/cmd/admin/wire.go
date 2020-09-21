// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// +build wireinject

package main

import (
	"context"
	"database/sql"

	"github.com/facebookincubator/symphony/admin/graphql"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/google/wire"
	"go.opencensus.io/stats/view"
	"gocloud.dev/server/health"
	"gocloud.dev/server/health/sqlhealth"
)

// NewApplication creates a new admin application.
func NewApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*cliFlags),
			"ListenAddress",
			"MySQLConfig",
			"LogConfig",
			"TelemetryConfig",
		),
		provideDB,
		provideTenancy,
		log.Provider,
		provideHealthCheckers,
		provideViews,
		graphql.NewHandler,
		wire.Struct(
			new(graphql.HandlerConfig),
			"*",
		),
		wire.Bind(
			new(gqlutil.BeginTxExecQueryer),
			new(*sql.DB),
		),
		xserver.ServiceSet,
		wire.Struct(
			new(application),
			"*",
		),
	)
	return nil, nil, nil
}

func provideDB(cfg *mysql.Config) (*sql.DB, func()) {
	db, cleanup := mysql.Provider(cfg)
	db.SetMaxOpenConns(1)
	return db, cleanup
}

func provideTenancy(cfg *mysql.Config, logger log.Logger) (viewer.Tenancy, error) {
	tenancy, err := viewer.NewMySQLTenancy(cfg.String(), 0)
	if err != nil {
		return nil, err
	}
	tenancy.SetLogger(logger)
	return viewer.NewCacheTenancy(tenancy, nil), nil
}

func provideHealthCheckers(db *sql.DB) []health.Checker {
	return []health.Checker{sqlhealth.New(db)}
}

func provideViews() []*view.View {
	views := xserver.DefaultViews()
	views = append(views, mysql.DefaultViews...)
	return views
}
