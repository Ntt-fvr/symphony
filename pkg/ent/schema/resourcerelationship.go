// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// ResourceRelationship defines the property type schema.
type ResourceRelationship struct {
	schema
}

// ResourceRelationship returns property type resourceType.
func (ResourceRelationship) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("ResourceRelationshipTypes").
			Values(
				"BELONGS_TO",
				"LOCATED_IN",
				"PHYSICAL_LINK",
				"LOGICAL_LINK",
				"CROSS_CONNECTION",
			).Annotations(entgql.OrderField("RESOURCE_RELATIONSHIP_TYPES")),
	}
}

// Edges returns property type edges.
func (ResourceRelationship) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcea", Resource.Type).
			Ref("resource_a").Unique().Annotations(entgql.OrderField("RESOURCE_A")),
		edge.From("resourceb", Resource.Type).
			Ref("resource_b").Unique().Annotations(entgql.OrderField("RESOURCE_B")),
		edge.From("resourcelocation", Location.Type).
			Ref("rs_location").Unique().Annotations(entgql.OrderField("LOCATION")),
	}
}

// Policy returns entity policy.
func (ResourceRelationship) Policy() ent.Policy {
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
