// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql

import (
	"context"
	"database/sql/driver"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/ast"
)

// TxOpener represents types than can open transactions.
type TxOpener interface {
	OpenTx(ctx context.Context) (context.Context, driver.Tx, error)
}

// The TxOpenerFunc type is an adapter to allow the use of
// ordinary functions as tx openers.
type TxOpenerFunc func(ctx context.Context) (context.Context, driver.Tx, error)

// OpenTx returns f(ctx).
func (f TxOpenerFunc) OpenTx(ctx context.Context) (context.Context, driver.Tx, error) {
	return f(ctx)
}

// TransactionMiddleware returns a response middleware executing graphql mutations with a transaction.
func TransactionMiddleware(opener TxOpener) graphql.ResponseMiddleware {
	return func(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
		if op := graphql.GetOperationContext(ctx).Operation; op == nil || op.Operation != ast.Mutation {
			return next(ctx)
		}
		txCtx, tx, err := opener.OpenTx(ctx)
		if err != nil {
			return graphql.ErrorResponse(ctx,
				"cannot create transaction: %s", err.Error(),
			)
		}
		ctx = txCtx

		defer func() {
			if r := recover(); r != nil {
				_ = tx.Rollback()
				panic(r)
			}
		}()
		rsp := next(ctx)
		if len(rsp.Errors) > 0 {
			_ = tx.Rollback()
			return rsp
		}
		if err := tx.Commit(); err != nil {
			return graphql.ErrorResponse(ctx,
				"cannot commit transaction: %s", err.Error(),
			)
		}
		return rsp
	}
}
