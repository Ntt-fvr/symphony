// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/facebook/ent/dialect"
	"github.com/facebookincubator/symphony/graph/graphql/directive"
	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/resolver"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/ent/enttest"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/hashicorp/go-multierror"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/require"
)

type TestResolver struct {
	generated.ResolverRoot
	logger  log.Logger
	client  *ent.Client
	factory ev.Factory
}

type option func(*options)

type options struct {
	opts    []resolver.Option
	factory ev.Factory
}

func withResolverOptions(opts ...resolver.Option) option {
	return func(o *options) {
		o.opts = append(o.opts, opts...)
	}
}

func withEventFactory(factory ev.Factory) option {
	return func(o *options) {
		o.factory = factory
	}
}

func newTestResolver(t *testing.T, opts ...option) *TestResolver {
	c := enttest.Open(t, dialect.SQLite,
		fmt.Sprintf("file:%s-%d?mode=memory&cache=shared&_fk=1",
			t.Name(), time.Now().UnixNano(),
		),
		enttest.WithMigrateOptions(
			migrate.WithGlobalUniqueID(true),
		),
	)

	o := &options{}
	for _, opt := range opts {
		opt(o)
	}
	factory := o.factory
	if factory == nil {
		factory = &ev.MemFactory{}
	}

	ctx := context.Background()
	emitter, err := factory.NewEmitter(ctx)
	require.NoError(t, err)

	eventer := event.Eventer{
		Logger:  log.NewNopLogger(),
		Emitter: emitter,
	}
	eventer.HookTo(c)

	logger := logtest.NewTestLogger(t)
	r := resolver.New(resolver.Config{
		Logger:          logger,
		ReceiverFactory: factory,
	}, o.opts...)

	return &TestResolver{
		ResolverRoot: r,
		logger:       logger,
		client:       c,
		factory:      factory,
	}
}

func (tr *TestResolver) Close() error {
	err := &multierror.Error{}
	if shutdowner, ok := tr.factory.(ev.Shutdowner); ok {
		err = multierror.Append(err,
			shutdowner.Shutdown(context.Background()),
		)
	}
	return multierror.Append(err,
		tr.client.Close(),
	).ErrorOrNil()
}

func (tr *TestResolver) GraphClient(opts ...viewertest.Option) *client.Client {
	srv := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{
				Resolvers:  tr.ResolverRoot,
				Directives: directive.New(tr.logger),
			},
		),
	)
	srv.SetErrorPresenter(entgql.DefaultErrorPresenter)
	srv.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		ctx = viewertest.NewContext(ctx, tr.client, opts...)
		return next(ctx)
	})
	srv.AroundResponses(entgql.TransactionMiddleware(tr.client))
	return client.New(srv)
}

func resolverctx(t *testing.T) (generated.ResolverRoot, context.Context) {
	r := newTestResolver(t)
	return r, viewertest.NewContext(context.Background(), r.client)
}

func mutationctx(t *testing.T) (generated.MutationResolver, context.Context) {
	r, ctx := resolverctx(t)
	return r.Mutation(), ctx
}
