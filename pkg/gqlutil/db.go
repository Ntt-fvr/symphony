// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package gqlutil

import (
	"context"
	"database/sql"
	"errors"
	"sync"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/ast"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// ExecQueryer wraps QueryContext and ExecContext methods.
type ExecQueryer interface {
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
}

// BeginTxExecQueryer adds BeginTx method to ExecQueryer interface.
type BeginTxExecQueryer interface {
	BeginTx(context.Context, *sql.TxOptions) (*sql.Tx, error)
	ExecQueryer
}

// dbCtxKey is the ExecQueryer context key.
type dbCtxKey struct{}

// newDBContext returns a new context with the given DB attached.
func newDBContext(parent context.Context, db ExecQueryer) context.Context {
	return context.WithValue(parent, dbCtxKey{}, db)
}

// DBFromContext returns the ExecQueryer stored in context, or nil if there isn't one.
func DBFromContext(ctx context.Context) ExecQueryer {
	db, _ := ctx.Value(dbCtxKey{}).(ExecQueryer)
	return db
}

// DBInjector injects a database into passed in request context.
type DBInjector struct {
	DB BeginTxExecQueryer
}

var _ interface {
	graphql.HandlerExtension
	graphql.OperationContextMutator
	graphql.ResponseInterceptor
} = DBInjector{}

// ExtensionName returns the extension name.
func (DBInjector) ExtensionName() string {
	return "DBInjector"
}

// Validate validates the executable schema.
func (dbi DBInjector) Validate(graphql.ExecutableSchema) error {
	if dbi.DB == nil {
		return errors.New("DB is nil")
	}
	return nil
}

// MutateOperationContext serializes field resolvers during mutations.
func (DBInjector) MutateOperationContext(_ context.Context, oc *graphql.OperationContext) *gqlerror.Error {
	if op := oc.Operation; op != nil && op.Operation == ast.Mutation {
		previous := oc.ResolverMiddleware
		var mu sync.Mutex
		oc.ResolverMiddleware = func(ctx context.Context, next graphql.Resolver) (interface{}, error) {
			mu.Lock()
			defer mu.Unlock()
			return previous(ctx, next)
		}
	}
	return nil
}

// DBInjector injects a database into context before calling next.
func (dbi DBInjector) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
	if op := graphql.GetOperationContext(ctx).Operation; op == nil || op.Operation != ast.Mutation {
		ctx = newDBContext(ctx, dbi.DB)
		return next(ctx)
	}
	tx, err := dbi.DB.BeginTx(ctx, nil)
	if err != nil {
		return graphql.ErrorResponse(ctx,
			"cannot create transaction: %s", err.Error(),
		)
	}

	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
			panic(r)
		}
	}()

	ctx = newDBContext(ctx, tx)
	rsp := next(ctx)
	if len(rsp.Errors) > 0 {
		_ = tx.Rollback()
		return &graphql.Response{
			Errors: rsp.Errors,
		}
	}
	if err := tx.Commit(); err != nil {
		return graphql.ErrorResponse(ctx,
			"cannot commit transaction: %s", err.Error(),
		)
	}
	return rsp
}
