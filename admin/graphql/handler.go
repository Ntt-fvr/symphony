// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphql

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/NYTimes/gziphandler"
	"github.com/facebookincubator/symphony/admin/graphql/directive"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/resolver"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocgql"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/gorilla/mux"
	"go.opencensus.io/plugin/ochttp"
	"go.opencensus.io/stats/view"
)

// HandlerConfig configures graphql handler.
type HandlerConfig struct {
	DB      gqlutil.BeginTxExecQueryer
	Dialect fmt.Stringer
	Tenancy viewer.Tenancy
	Logger  log.Logger
}

// NewHandler creates a graphql http handler.
func NewHandler(cfg HandlerConfig) (http.Handler, func(), error) {
	if err := view.Register(ocgql.DefaultViews...); err != nil {
		return nil, nil, fmt.Errorf("cannot register views: %w", err)
	}
	closer := func() { view.Unregister(ocgql.DefaultViews...) }

	srv := gqlutil.NewServer(
		exec.NewExecutableSchema(
			exec.Config{
				Resolvers: resolver.New(
					resolver.Config{
						Logger: cfg.Logger,
						Migrator: resolver.NewMigrator(
							resolver.MigratorConfig{
								Logger:  cfg.Logger,
								Dialect: cfg.Dialect,
							},
						),
					},
				),
				Directives: directive.New(),
			},
		),
	)
	srv.Use(gqlutil.DBInjector{DB: cfg.DB})
	srv.AroundOperations(
		func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
			return next(privacy.DecisionContext(ctx, privacy.Allow))
		},
	)
	srv.AroundOperations(
		func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
			return next(viewer.NewTenancyContext(ctx, cfg.Tenancy))
		},
	)
	srv.SetRecoverFunc(gqlutil.RecoverFunc(cfg.Logger))

	router := mux.NewRouter()
	router.Use(func(next http.Handler) http.Handler {
		return http.TimeoutHandler(next, 30*time.Second, "request timed out")
	})
	router.Path("/graphiql").
		Handler(
			ochttp.WithRouteTag(
				playground.Handler(
					"GraphQL playground",
					"/query",
				),
				"graphiql",
			),
		)
	router.Path("/query").
		Handler(
			ochttp.WithRouteTag(
				gziphandler.GzipHandler(srv),
				"query",
			),
		)

	return router, closer, nil
}
