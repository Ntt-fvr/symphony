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

type featureSuite struct{ testSuite }

func TestFeature(t *testing.T) {
	suite.Run(t, &featureSuite{})
}

type createFeatureInput struct {
	model.CreateFeatureInput
	Tenants []string `json:"tenants"`
}

func (s *featureSuite) createFeatures(name string, tenants ...string) []string {
	s.expectBeginCommit()
	input := createFeatureInput{
		CreateFeatureInput: model.CreateFeatureInput{
			Name: name,
		},
		Tenants: make([]string, len(tenants)),
	}
	for i := range tenants {
		input.Tenants[i] = model.NewTenant(tenants[i]).ID.String()
	}

	var rsp struct {
		CreateFeature struct {
			Features []struct {
				ID string
			}
		}
	}
	err := s.client.Post(`mutation($input: CreateFeatureInput!) {
		createFeature(input: $input) {
			features {
				id
			}
		}
	}`, &rsp, client.Var("input", input))
	s.Require().NoError(err)

	ids := make([]string, len(rsp.CreateFeature.Features))
	for i := range rsp.CreateFeature.Features {
		ids[i] = rsp.CreateFeature.Features[i].ID
	}
	return ids
}

func (s *featureSuite) TestCreateFeature() {
	tenants := []string{"foo", "bar", "baz"}
	ids := s.createFeatures(s.T().Name(), tenants...)
	for i, id := range ids {
		var rsp struct {
			Feature struct {
				ID     string
				Tenant struct {
					Name     string
					Features []struct {
						Name string
					}
				}
			}
		}
		err := s.client.Post(
			`query($id: ID!, $name: String!) {
				feature: node(id: $id) {
					... on Feature {
						id
						tenant {
							name
							features(filterBy: {names: [$name]}) {
								name
							}
						}
					}
				}
			}`,
			&rsp,
			client.Var("id", id),
			client.Var("name", s.T().Name()),
		)
		s.Require().NoError(err)
		s.Require().Equal(id, rsp.Feature.ID)
		s.Require().Equal(tenants[i], rsp.Feature.Tenant.Name)
		s.Require().Len(rsp.Feature.Tenant.Features, 1)
		s.Require().Equal(s.T().Name(), rsp.Feature.Tenant.Features[0].Name)
	}
}

func (s *featureSuite) TestDeleteFeature() {
	tenants := []string{"foo", "bar", "baz"}
	s.createFeatures(s.T().Name(), tenants...)
	s.expectTenants(tenants...)
	var rsp struct {
		Tenants []struct {
			Features []struct {
				Name string
			}
		}
	}
	const tenantsQuery = `query {
		tenants {
			features {
				name
			}
		}
	}`
	err := s.client.Post(tenantsQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Len(rsp.Tenants, len(tenants))
	for _, tenant := range rsp.Tenants {
		s.Require().Len(tenant.Features, 1)
		s.Require().Equal(s.T().Name(), tenant.Features[0].Name)
	}

	s.mock.ExpectBegin()
	s.expectTenants(tenants...)
	s.mock.ExpectCommit()
	err = s.client.Post(`mutation($name: String!) {
		deleteFeature(input: { name: $name }) {
			clientMutationId
		}
	}`,
		&struct {
			DeleteFeature struct{ ClientMutationID string }
		}{},
		client.Var("name", s.T().Name()),
	)
	s.Require().NoError(err)

	s.expectTenants(tenants...)
	err = s.client.Post(tenantsQuery, &rsp)
	s.Require().NoError(err)
	s.Require().Len(rsp.Tenants, len(tenants))
	for _, tenant := range rsp.Tenants {
		s.Require().Empty(tenant.Features)
	}
}
