// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql_test

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/mocks"
	"github.com/stretchr/testify/require"
	"github.com/vektah/gqlparser/v2/ast"
)

func TestTransactionMiddleware(t *testing.T) {
	opCtx := func(op ast.Operation) context.Context {
		return graphql.WithOperationContext(
			context.Background(),
			&graphql.OperationContext{
				Operation: &ast.OperationDefinition{
					Operation: op,
				},
			},
		)
	}
	t.Run("Query", func(t *testing.T) {
		var opener mocks.TxOpener
		defer opener.AssertExpectations(t)
		middleware := entgql.TransactionMiddleware(&opener)
		middleware(opCtx(ast.Query), func(context.Context) *graphql.Response {
			return nil
		})
	})
	t.Run("Subscription", func(t *testing.T) {
		var opener mocks.TxOpener
		defer opener.AssertExpectations(t)
		middleware := entgql.TransactionMiddleware(&opener)
		middleware(opCtx(ast.Subscription), func(context.Context) *graphql.Response {
			return nil
		})
	})
	ctx := opCtx(ast.Mutation)
	t.Run("NoError", func(t *testing.T) {
		var tx mocks.Tx
		tx.On("Commit").
			Return(nil).
			Once()
		defer tx.AssertExpectations(t)

		var opener mocks.TxOpener
		opener.On("OpenTx", ctx).
			Return(ctx, &tx, nil).
			Once()
		defer opener.AssertExpectations(t)

		data := json.RawMessage("foobar")
		middleware := entgql.TransactionMiddleware(&opener)
		rsp := middleware(ctx, func(ctx context.Context) *graphql.Response {
			return &graphql.Response{Data: data}
		})
		require.Equal(t, data, rsp.Data)
	})
	t.Run("HasError", func(t *testing.T) {
		var tx mocks.Tx
		tx.On("Rollback").
			Return(nil).
			Once()
		defer tx.AssertExpectations(t)

		var opener mocks.TxOpener
		opener.On("OpenTx", ctx).
			Return(ctx, &tx, nil).
			Once()
		defer opener.AssertExpectations(t)

		middleware := entgql.TransactionMiddleware(&opener)
		rsp := middleware(ctx, func(ctx context.Context) *graphql.Response {
			return graphql.ErrorResponse(ctx, "bad mutation")
		})
		require.Contains(t, rsp.Errors.Error(), "bad mutation")
	})
	t.Run("Panic", func(t *testing.T) {
		var tx mocks.Tx
		tx.On("Rollback").
			Return(nil).
			Once()
		defer tx.AssertExpectations(t)

		var opener mocks.TxOpener
		opener.On("OpenTx", ctx).
			Return(ctx, &tx, nil).
			Once()
		defer opener.AssertExpectations(t)

		middleware := entgql.TransactionMiddleware(&opener)
		require.Panics(t, func() {
			middleware(ctx, func(ctx context.Context) *graphql.Response {
				panic("oh no!")
			})
		})
	})
}
