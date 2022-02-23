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

// ResourceSpecificationRelationship defines the property type schema.
type ResourceSpecificationRelationship struct {
	schema
}

// ResourceSpecificationRelationship returns property type counter.
func (ResourceSpecificationRelationship) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// ResourceSpecificationRelationship returns property type edges.
func (ResourceSpecificationRelationship) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcespecification", ResourceSpecification.Type).
			Ref("resource_specification").Unique(),
		edge.To("resource_sr", ResourceSpecificationItems.Type).
			Annotations(entgql.MapsTo("resourcespecificationrelationship")),
	}
}

// Policy returns entity policy.
func (ResourceSpecificationRelationship) Policy() ent.Policy {
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
