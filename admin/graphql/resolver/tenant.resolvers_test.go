// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"database/sql"
	"regexp"
	"testing"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/admin/graphql/resolver"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/stretchr/testify/suite"
)

func TestTenant(t *testing.T) {
	suite.Run(t, &tenantSuite{})
}

type tenantSuite struct {
	suite.Suite
	client *client.Client
	mock   sqlmock.SqlmockCommon
}

type tenant struct{ Name string }

func (s *tenantSuite) SetupTest() {
	db, mock, err := sqlmock.New()
	s.Require().NoError(err)
	server := handler.New(
		exec.NewExecutableSchema(
			exec.Config{
				Resolvers: resolver.New(
					resolver.Config{
						Logger: logtest.NewTestLogger(s.T()),
					},
				),
			},
		),
	)
	server.AddTransport(transport.POST{})
	server.Use(gqlutil.DBInjector{DB: db})
	s.client = client.New(server)
	s.mock = mock
}

func (s *tenantSuite) TearDownTest() {
	err := s.mock.ExpectationsWereMet()
	s.Require().NoError(err)
}

func (s *tenantSuite) TestMutationResolver_DeleteTenant() {
	s.mock.ExpectBegin()
	s.mock.ExpectQuery(tenantSQLQuery).
		WithArgs("tenant_foo").
		WillReturnRows(
			sqlmock.NewRows([]string{"COUNT"}).
				AddRow(1),
		).
		RowsWillBeClosed()
	s.mock.ExpectExec(
		regexp.QuoteMeta("DROP DATABASE `tenant_foo`"),
	).
		WillReturnResult(
			sqlmock.NewResult(1, 1),
		)
	s.mock.ExpectCommit()

	var rsp struct {
		DeleteTenant struct{ ClientMutationID string }
	}
	err := s.client.Post(`mutation($id: ID!, $clientMutationId: String!) {
		deleteTenant(input: {clientMutationId: $clientMutationId, id: $id}) {
			clientMutationId
		}
	}`,
		&rsp,
		client.Var("id", model.ID{Tenant: "foo"}.String()),
		client.Var("clientMutationId", s.T().Name()),
	)
	s.Require().NoError(err)
	s.Require().Equal(s.T().Name(), rsp.DeleteTenant.ClientMutationID)
}

var tenantSQLQuery = regexp.QuoteMeta(
	"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
)

func (s *tenantSuite) TestQueryResolver_Tenant() {
	s.mock.ExpectQuery(tenantSQLQuery).
		WithArgs("tenant_foo").
		WillReturnRows(
			sqlmock.NewRows([]string{"COUNT"}).
				AddRow(1),
		).
		RowsWillBeClosed()
	const gqlQuery = `query { tenant(name: "foo") { name } }`
	var rsp struct{ Tenant tenant }
	err := s.client.Post(gqlQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Equal("foo", rsp.Tenant.Name)

	s.mock.ExpectQuery(regexp.QuoteMeta(
		"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
	)).
		WithArgs("tenant_foo").
		WillReturnRows(
			sqlmock.NewRows([]string{"COUNT"}).
				AddRow(0),
		).
		RowsWillBeClosed()
	err = s.client.Post(gqlQuery, &rsp)
	s.Require().Error(err)
	s.Require().Contains(err.Error(), "NOT_FOUND")
}

var tenantsSQLQuery = regexp.QuoteMeta(
	"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?",
)

const tenantsGQLQuery = `query { tenants { name } }`

func (s *tenantSuite) TestQueryResolver_Tenants() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WithArgs("tenant_%").
		WillReturnRows(
			sqlmock.NewRows([]string{"SCHEMA_NAME"}).
				AddRow("tenant_bar").
				AddRow("tenant_foo"),
		).
		RowsWillBeClosed()
	var rsp struct{ Tenants []tenant }
	err := s.client.Post(tenantsGQLQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Equal([]tenant{{Name: "bar"}, {Name: "foo"}}, rsp.Tenants)
}

func (s *tenantSuite) TestQueryResolver_Tenants_NoSchemata() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WillReturnError(sql.ErrConnDone)
	err := s.client.Post(tenantsGQLQuery, &struct{ Tenants []tenant }{})
	s.Require().Error(err)
	s.Require().Contains(err.Error(), "cannot query information schema")
}

func (s *tenantSuite) TestQueryResolver_Tenants_RowError() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WillReturnRows(
			sqlmock.NewRows([]string{"SCHEMA_NAME"}).
				AddRow("tenant_test").
				RowError(0, sql.ErrConnDone),
		).
		RowsWillBeClosed()
	err := s.client.Post(tenantsGQLQuery, &struct{ Tenants []tenant }{})
	s.Require().Error(err)
	s.Require().Contains(err.Error(), sql.ErrConnDone.Error())
}
