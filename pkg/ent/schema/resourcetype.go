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
		field.Enum("ResourceTypeClass").
			Values(
				"EQUIPMENT",
				"SLOT",
				"RACK",
				"PORT",
				"CARD",
				"VLAN",
			).Annotations(entgql.OrderField("RESOURCE_TYPE_CLASS")),
		field.Enum("ResourceTypeBaseType").
			Values(
				"LOGICAL_RESOURCE",
				"PHYSICAL_RESOURCE",
				"VIRTUAL_RESOURCE",
			).Annotations(entgql.OrderField("RESOURCE_TYPE_BASE_TYPE")),
	}
}

// Edges returns property type edges.
func (ResourceType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("reconciliationrule", ReconciliationRule.Type).
			Ref("reconciliation_rule_type").Unique().Annotations(entgql.OrderField("RECONCILIATION_RULE")),
		edge.To("resource_relationship_a", ResourceTypeRelationship.Type).
			Annotations(entgql.MapsTo("resourcerelationshipa")),
		edge.To("resource_relationship_b", ResourceTypeRelationship.Type).
			Annotations(entgql.MapsTo("resourcerelationshipb")),
		edge.To("resource_specification", ResourceSpecification.Type).
			Annotations(entgql.MapsTo("resourcespecification")),
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
