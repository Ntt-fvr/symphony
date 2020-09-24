// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"regexp"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/admin/graphql/directive"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/resolver"
	"github.com/facebookincubator/symphony/admin/graphql/resolver/mocks"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/suite"
)

type testSuite struct {
	suite.Suite
	ec       *ent.Client
	client   *client.Client
	mock     sqlmock.SqlmockCommon
	migrator *mocks.Migrator
}

func (s *testSuite) SetupTest() {
	s.ec = viewertest.NewTestClient(s.T())
	tenancy := viewer.NewFixedTenancy(s.ec)
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
				Directives: directive.New(),
			},
		),
	)
	server.AddTransport(transport.POST{})
	server.Use(gqlutil.DBInjector{DB: db})
	server.AroundOperations(
		func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
			ctx = privacy.DecisionContext(ctx, privacy.Allow)
			ctx = viewer.NewTenancyContext(ctx, tenancy)
			return next(ctx)
		},
	)
	s.client = client.New(server)
	s.mock = mock
}

func (s *testSuite) TearDownTest() {
	err := s.mock.ExpectationsWereMet()
	s.Require().NoError(err)
	s.migrator.AssertExpectations(s.T())
	err = s.ec.Close()
	s.Require().NoError(err)
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

func (s *testSuite) expectBeginCommit() {
	s.mock.ExpectBegin()
	s.mock.ExpectCommit()
}
