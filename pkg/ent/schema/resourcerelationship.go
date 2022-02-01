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
		field.Enum("ResourceRelationshipType").
			Values(
				"BELONGS_TO",
				"LOCATED_IN",
				"PHYSICAL_LINK",
				"LOGICAL_LINK",
				"CROSS_CONNECTION",
			).Annotations(entgql.OrderField("RESOURCE_RELATIONSHIP_TYPE")),
		field.Enum("ResourceRelationshipMultiplicity").
			Values(
				"ONE_TO_ONE",
				"ONE_TO_MANY",
				"MANY_TO_ONE",
				"MANY_TO_MANY",
			).Annotations(entgql.OrderField("RESOURCE_RELATIONSHIP_MULTIPLICITY")),
	}
}

// Edges returns property type edges.
func (ResourceRelationship) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcetypea", ResourceType.Type).
			Ref("resource_relationship_a").Unique().Annotations(entgql.OrderField("RESOURCE_TYPE_A")),
		edge.From("resourcetypeb", ResourceType.Type).
			Ref("resource_relationship_b").Unique().Annotations(entgql.OrderField("RESOURCE_TYPE_B")),
		edge.From("locationType", LocationType.Type).
			Ref("resource_relationship_location").Unique().Annotations(entgql.OrderField("LOCATION_TYPE")),
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
