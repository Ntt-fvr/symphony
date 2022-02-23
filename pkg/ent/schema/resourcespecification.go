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

// ResourceSpecification defines the property type schema.
type ResourceSpecification struct {
	schema
}

// ResourceSpecification returns property type resourceSpecification.
func (ResourceSpecification) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (ResourceSpecification) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcetype", ResourceType.Type).
			Ref("resource_specification").Unique().Annotations(entgql.OrderField("RESOURCE_TYPE")),
		edge.To("property_type", PropertyType.Type).
			Annotations(entgql.MapsTo("propertytype")),
		edge.To("resource_specification", ResourceSpecificationRelationship.Type).
			Annotations(entgql.MapsTo("resourcespecification")),
	}
}

// Policy returns entity policy.
func (ResourceSpecification) Policy() ent.Policy {
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
