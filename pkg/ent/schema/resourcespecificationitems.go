// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// ResourceSpecificationItems defines the property type schema.
type ResourceSpecificationItems struct {
	schema
}

// ResourceSpecificationItems returns property type edges.
func (ResourceSpecificationItems) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcespecificationrelationship", ResourceSpecificationRelationship.Type).
			Ref("resource_specification_relationship").Unique().
			Annotations(entgql.OrderField("RESOURCE_SPECIFICATION_RELATIONSHIP")),
		edge.From("resourcespecificationitems", ResourceSpecification.Type).
			Ref("resource_specification_items").Unique().
			Annotations(entgql.OrderField("RESOURCE_SPECIFICATION")),
	}
}

// Policy returns entity policy.
func (ResourceSpecificationItems) Policy() ent.Policy {
	/*return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AssuranceTemplatesWritePolicyRule(),
		),
	)*/
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
