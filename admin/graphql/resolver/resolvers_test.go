// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"regexp"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/resolver"
	"github.com/facebookincubator/symphony/admin/graphql/resolver/mocks"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/stretchr/testify/suite"
)

type testSuite struct {
	suite.Suite
	client   *client.Client
	mock     sqlmock.SqlmockCommon
	migrator *mocks.Migrator
}

func (s *testSuite) SetupTest() {
	db, mock, err := sqlmock.New()
	s.Require().NoError(err)
	s.migrator = &mocks.Migrator{}
	server := handler.New(
		exec.NewExecutableSchema(
			exec.Config{
				Resolvers: resolver.New(
					resolver.Config{
						Logger:   logtest.NewTestLogger(s.T()),
						Migrator: s.migrator,
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

func (s *testSuite) TearDownTest() {
	err := s.mock.ExpectationsWereMet()
	s.Require().NoError(err)
	s.migrator.AssertExpectations(s.T())
}

func (s *testSuite) expectTenantCount(name string, count int) {
	s.mock.ExpectQuery(regexp.QuoteMeta(
		"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
	)).
		WithArgs("tenant_" + name).
		WillReturnRows(
			sqlmock.NewRows([]string{"COUNT"}).
				AddRow(count),
		).
		RowsWillBeClosed()
}

func (s *testSuite) expectTenant(name string) {
	s.expectTenantCount(name, 1)
}

func (s *testSuite) expectNoTenant(name string) {
	s.expectTenantCount(name, 0)
}
