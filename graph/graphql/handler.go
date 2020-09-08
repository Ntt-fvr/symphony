// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphql

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/NYTimes/gziphandler"
	"github.com/facebookincubator/symphony/graph/graphql/complexity"
	"github.com/facebookincubator/symphony/graph/graphql/directive"
	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/resolver"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/telemetry/ocgql"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.opencensus.io/plugin/ochttp"
	"go.opencensus.io/stats/view"
	"go.uber.org/zap"
)

// HandlerConfig configures graphql handler.
type HandlerConfig struct {
	Client          *ent.Client
	Logger          log.Logger
	ReceiverFactory ev.ReceiverFactory
	Orc8rClient     *http.Client
}

func init() {
	views := append(
		ocgql.DefaultViews,
		directive.ServerDeprecatedCountByObjectInputField,
	)
	for _, v := range views {
		v.TagKeys = append(v.TagKeys,
			viewer.KeyTenant,
			viewer.KeyUser,
			viewer.KeyUserAgent,
		)
	}
}

// NewHandler creates a graphql http handler.
func NewHandler(cfg HandlerConfig) (http.Handler, func(), error) {
	rsv := resolver.New(
		resolver.Config{
			Client:          cfg.Client,
			Logger:          cfg.Logger,
			ReceiverFactory: cfg.ReceiverFactory,
		},
		resolver.WithOrc8rClient(
			cfg.Orc8rClient,
		),
	)

	views := append(
		ocgql.DefaultViews,
		directive.ServerDeprecatedCountByObjectInputField,
	)
	if err := view.Register(views...); err != nil {
		return nil, nil, fmt.Errorf("registering views: %w", err)
	}
	closer := func() { view.Unregister(views...) }

	router := mux.NewRouter()
	router.Use(func(handler http.Handler) http.Handler {
		timeouter := http.TimeoutHandler(handler, 3*time.Minute, "request timed out")
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			h := timeouter
			if websocket.IsWebSocketUpgrade(r) {
				h = handler
			}
			h.ServeHTTP(w, r)
		})
	})

	srv := gqlutil.NewServer(
		generated.NewExecutableSchema(
			generated.Config{
				Resolvers:  rsv,
				Directives: directive.New(cfg.Logger),
				Complexity: complexity.New(),
			},
		),
	)
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.SetErrorPresenter(errorPresenter(cfg.Logger))
	srv.SetRecoverFunc(gqlutil.RecoverFunc(cfg.Logger))
	srv.Use(extension.FixedComplexityLimit(complexity.Infinite))

	router.Path("/graphiql").
		Handler(
			ochttp.WithRouteTag(
				playground.Handler(
					"GraphQL playground",
					"/graph/query",
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

func errorPresenter(logger log.Logger) graphql.ErrorPresenterFunc {
	return func(ctx context.Context, err error) (gqlerr *gqlerror.Error) {
		defer func() {
			if errors.Is(err, privacy.Deny) {
				gqlerr.Message = "Permission denied"
			}
		}()
		if errors.As(err, &gqlerr) {
			if gqlerr.Path == nil {
				gqlerr.Path = graphql.GetFieldContext(ctx).Path()
			}
			return gqlerr
		}
		logger.For(ctx).
			Warn("graphql internal failure",
				zap.Error(err),
			)
		gqlerr = &gqlerror.Error{
			Message: "Sorry, something went wrong",
			Path:    graphql.GetFieldContext(ctx).Path(),
		}
		var ee graphql.ExtendedError
		if errors.As(err, &ee) {
			gqlerr.Extensions = ee.Extensions()
		}
		return gqlerr
	}
}
