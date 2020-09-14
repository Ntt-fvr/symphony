// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"database/sql"
	"fmt"
	"regexp"
	"testing"

	"github.com/99designs/gqlgen/client"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/stretchr/testify/suite"
)

type tenantSuite struct{ testSuite }

func TestTenant(t *testing.T) {
	suite.Run(t, &tenantSuite{})
}

func (s *tenantSuite) TestTruncateTenant() {
	s.mock.ExpectBegin()
	s.expectTenant("bar")
	result := sqlmock.NewResult(0, 0)
	s.mock.ExpectExec("SET FOREIGN_KEY_CHECKS=0").
		WillReturnResult(result)
	for _, table := range migrate.Tables {
		query := fmt.Sprintf("DELETE FROM `tenant_bar`.`%s`", table.Name)
		s.mock.ExpectExec(query).WillReturnResult(result)
	}
	s.mock.ExpectExec("SET FOREIGN_KEY_CHECKS=1").
		WillReturnResult(result)
	s.mock.ExpectCommit()

	var rsp struct {
		TruncateTenant struct{ ClientMutationID string }
	}
	err := s.client.Post(`mutation($clientMutationId: String!) {
		truncateTenant(input: {clientMutationId: $clientMutationId, name: "bar"}) {
			clientMutationId
		}
	}`, &rsp, client.Var("clientMutationId", s.T().Name()))
	s.Require().NoError(err)
}

func (s *tenantSuite) TestDeleteTenant() {
	s.mock.ExpectBegin()
	s.expectTenant("foo")
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

func (s *tenantSuite) TestQueryTenant() {
	const tenant = "foo"
	s.expectTenant(tenant)
	const gqlQuery = `query { tenant(name: "foo") { name } }`
	var rsp struct{ Tenant model.Tenant }
	err := s.client.Post(gqlQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Equal(tenant, rsp.Tenant.Name)

	s.expectNoTenant(tenant)
	err = s.client.Post(gqlQuery, &rsp)
	s.Require().Error(err)
	s.Require().Contains(err.Error(), "NOT_FOUND")
}

var tenantsSQLQuery = regexp.QuoteMeta(
	"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?",
)

const tenantsGQLQuery = `query { tenants { name } }`

func (s *tenantSuite) TestQueryTenants() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WithArgs("tenant_%").
		WillReturnRows(
			sqlmock.NewRows([]string{"SCHEMA_NAME"}).
				AddRow("tenant_bar").
				AddRow("tenant_foo"),
		).
		RowsWillBeClosed()
	var rsp struct{ Tenants []model.Tenant }
	err := s.client.Post(tenantsGQLQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Equal([]model.Tenant{{Name: "bar"}, {Name: "foo"}}, rsp.Tenants)
}

func (s *tenantSuite) TestQueryTenantsNoSchemata() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WillReturnError(sql.ErrConnDone)
	err := s.client.Post(tenantsGQLQuery, &struct{ Tenants []model.Tenant }{})
	s.Require().Error(err)
	s.Require().Contains(err.Error(), "cannot query information schema")
}

func (s *tenantSuite) TestQueryTenantsRowErr() {
	s.mock.ExpectQuery(tenantsSQLQuery).
		WillReturnRows(
			sqlmock.NewRows([]string{"SCHEMA_NAME"}).
				AddRow("tenant_test").
				RowError(0, sql.ErrConnDone),
		).
		RowsWillBeClosed()
	err := s.client.Post(tenantsGQLQuery, &struct{ Tenants []model.Tenant }{})
	s.Require().Error(err)
	s.Require().Contains(err.Error(), sql.ErrConnDone.Error())
}
