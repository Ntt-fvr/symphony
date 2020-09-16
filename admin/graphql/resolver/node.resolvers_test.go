// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"testing"

	"github.com/99designs/gqlgen/client"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/stretchr/testify/suite"
)

type nodeSuite struct{ testSuite }

func TestNode(t *testing.T) {
	suite.Run(t, &nodeSuite{})
}

func (s *nodeSuite) TestQueryTenantNode() {
	const tenant = "foo"
	s.expectTenant(tenant)
	id := model.ID{Tenant: tenant}.String()
	var rsp struct{ Node struct{ ID, Name string } }
	err := s.client.Post(
		`query($id: ID!) { node(id: $id) { ... on Tenant { id name } } }`,
		&rsp, client.Var("id", id),
	)
	s.Require().NoError(err)
	s.Require().Equal(tenant, rsp.Node.Name)
	s.Require().Equal(id, rsp.Node.ID)
}

func (s *nodeSuite) TestQueryNodeNotFound() {
	const tenant = "bar"
	s.expectNoTenant(tenant)
	id := model.ID{Tenant: tenant}.String()
	var rsp struct{ Node struct{ Name string } }
	err := s.client.Post(
		`query($id: ID!) { node(id: $id) { ... on Tenant { name } } }`,
		&rsp, client.Var("id", id),
	)
	s.Require().Error(err)
	s.Require().Contains(err.Error(), "Could not resolve to a node with the global id of '"+id+"'")
}
