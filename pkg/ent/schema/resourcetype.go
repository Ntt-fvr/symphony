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

// ResourceType defines the property type schema.
type ResourceType struct {
	schema
}

// ResourceType returns property type resourceType.
func (ResourceType) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (ResourceType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcetypeclass", ResourceTypeClass.Type).
			Ref("resource_type_fk").Unique().Annotations(entgql.OrderField("ResourceTypeClass")),
		edge.From("resourcetypebasetype", ResourceTypeBaseType.Type).
			Ref("resource_type_fk").Unique().Annotations(entgql.OrderField("ResourceTypeBaseType")),
		edge.To("resource_relationship_fk_a", ResourceRelationship.Type).
			Annotations(entgql.MapsTo("resourcerelationshipa")),
		edge.To("resource_relationship_fk_b", ResourceRelationship.Type).
			Annotations(entgql.MapsTo("resourcerelationshipb")),
	}
}

// Policy returns entity policy.
func (ResourceType) Policy() ent.Policy {
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
