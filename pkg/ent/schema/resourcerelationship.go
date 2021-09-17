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
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (ResourceRelationship) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcetypea", ResourceType.Type).
			Ref("resource_relationship_fk_a").Unique().Annotations(entgql.OrderField("RESOURCETYPE")),
		edge.From("resourcetypeb", ResourceType.Type).
			Ref("resource_relationship_fk_b").Unique().Annotations(entgql.OrderField("RESOURCETYPE")),
		edge.From("resourcerelationshiptypefk", ResourceRelationshipType.Type).
			Ref("resource_relationship_fk").Unique().Annotations(entgql.OrderField("RESOURCERELATIONSHIPTYPE")),
		edge.From("locationtypefk", LocationType.Type).
			Ref("resource_relationship_fk").Unique().Annotations(entgql.OrderField("LOCATIONTYPE")),
		edge.From("resource_relationship_multiplicity_fk", ResourceRelationshipMultiplicity.Type).
			Ref("resource_relationship_fk").Unique().Annotations(entgql.OrderField("RESOURCERELATIONSHIPMULTIPLICITY")),
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
