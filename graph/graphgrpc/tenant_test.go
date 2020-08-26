// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphgrpc_test

import (
	"context"
	"fmt"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/golang/protobuf/ptypes/wrappers"
	"github.com/stretchr/testify/suite"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type tenantSuite struct {
	suite.Suite
	mock sqlmock.Sqlmock
	ctx  context.Context
	svc  graphgrpc.TenantService
}

func (s *tenantSuite) SetupSuite() {
	s.ctx = context.Background()
}

func (s *tenantSuite) SetupTest() {
	db, mock, err := sqlmock.New()
	s.Require().NoError(err)
	s.svc = graphgrpc.NewTenantService(
		graphgrpc.FixedDBProvider(db),
	)
	s.mock = mock
}

func TestTenantSuite(t *testing.T) {
	suite.Run(t, &tenantSuite{})
}

func (s *tenantSuite) TestTenantCreate() {
	tenant, err := s.svc.Create(s.ctx, &wrappers.StringValue{Value: ""})
	s.Require().Nil(tenant)
	s.Require().IsType(codes.InvalidArgument, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?")).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(1))
	tenant, err = s.svc.Create(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().Nil(tenant)
	s.Require().IsType(codes.AlreadyExists, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?")).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(0))
	s.mock.ExpectExec(regexp.QuoteMeta("CREATE DATABASE `tenant_foo`")).
		WillReturnResult(sqlmock.NewResult(1, 1))
	tenant, err = s.svc.Create(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().NoError(err)
	s.Require().Equal("foo", tenant.Id)
	s.Require().Equal("foo", tenant.Name)
}

func (s *tenantSuite) TestTenantGet() {
	tenant, err := s.svc.Get(s.ctx, &wrappers.StringValue{Value: ""})
	s.Require().Nil(tenant)
	s.Require().IsType(codes.InvalidArgument, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?")).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(1))
	tenant, err = s.svc.Get(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().NoError(err)
	s.Require().Equal("foo", tenant.Id)
	s.Require().Equal("foo", tenant.Name)
}

func (s *tenantSuite) TestTenantTruncate() {
	_, err := s.svc.Truncate(s.ctx, &wrappers.StringValue{Value: ""})
	s.Require().IsType(codes.InvalidArgument, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta(
		"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
	)).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(1))
	result := sqlmock.NewResult(0, 0)
	s.mock.ExpectExec("SET FOREIGN_KEY_CHECKS=0").WillReturnResult(result)
	for _, table := range migrate.Tables {
		query := fmt.Sprintf("DELETE FROM `tenant_foo`.`%s`", table.Name)
		s.mock.ExpectExec(query).WillReturnResult(result)
	}
	s.mock.ExpectExec("SET FOREIGN_KEY_CHECKS=1").WillReturnResult(result)
	_, err = s.svc.Truncate(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().NoError(err)
}

func (s *tenantSuite) TestTenantDelete() {
	_, err := s.svc.Delete(s.ctx, &wrappers.StringValue{Value: ""})
	s.Require().IsType(codes.InvalidArgument, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?")).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(0))
	_, err = s.svc.Delete(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().IsType(codes.NotFound, status.Code(err))

	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?")).
		WithArgs("tenant_foo").
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(1))
	s.mock.ExpectExec(regexp.QuoteMeta("DROP DATABASE `tenant_foo`")).
		WillReturnResult(sqlmock.NewResult(1, 1))
	_, err = s.svc.Delete(s.ctx, &wrappers.StringValue{Value: "foo"})
	s.Require().NoError(err)
}

func (s *tenantSuite) TestTenantList() {
	s.mock.ExpectQuery(regexp.QuoteMeta("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?")).
		WithArgs("tenant_%").
		WillReturnRows(sqlmock.NewRows([]string{"SCHEMA_NAME"}).AddRow("tenant_foo").AddRow("tenant_bar"))
	res, err := s.svc.List(s.ctx, nil)
	s.Require().NoError(err)
	s.Require().Len(res.Tenants, 2)
	s.Require().Equal("foo", res.Tenants[0].Id)
	s.Require().Equal("foo", res.Tenants[0].Name)
	s.Require().Equal("bar", res.Tenants[1].Id)
	s.Require().Equal("bar", res.Tenants[1].Name)
}
