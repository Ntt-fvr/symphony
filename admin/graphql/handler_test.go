// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphql_test

import (
	"regexp"
	"testing"

	"github.com/99designs/gqlgen/client"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/admin/graphql"
	"github.com/stretchr/testify/require"
)

func TestHandler(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	mock.ExpectQuery(regexp.QuoteMeta(
		"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
	) + "$").
		WithArgs("tenant_foo").
		WillReturnRows(
			sqlmock.NewRows([]string{"COUNT"}).
				AddRow(1),
		).
		RowsWillBeClosed()

	handler, _, err := graphql.NewHandler(
		graphql.HandlerConfig{
			DB: db,
		},
	)
	require.NoError(t, err)

	c := client.New(handler, client.Path("/query"))
	var rsp struct{ Tenant struct{ ID, Name string } }
	err = c.Post(`query { tenant(name: "foo") { id name } }`, &rsp)
	require.NoError(t, err)
	require.NotEmpty(t, rsp.Tenant.ID)
	require.Equal(t, "foo", rsp.Tenant.Name)
}
