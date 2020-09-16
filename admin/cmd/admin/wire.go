// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// +build wireinject

package main

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
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
		mysql.Provider,
		log.Provider,
		provideHealthCheckers,
		provideViews,
		wire.InterfaceValue(
			new(http.Handler),
			http.NotFoundHandler(),
		),
		xserver.ServiceSet,
		wire.Struct(
			new(application), "*",
		),
	)
	return nil, nil, nil
}

func provideHealthCheckers(db *sql.DB) []health.Checker {
	return []health.Checker{sqlhealth.New(db)}
}

func provideViews() []*view.View {
	views := xserver.DefaultViews()
	views = append(views, mysql.DefaultViews...)
	return views
}
