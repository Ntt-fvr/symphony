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

// Resource defines the property type schema.
type Resource struct {
	schema
}

// Resource returns property type counter.
func (Resource) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
		field.Bool("available").Nillable().Optional(),
	}
}

// Resource returns property type edges.
func (Resource) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcespec", ResourceSpecification.Type).
			Ref("resource_rspecification").Unique(),
		edge.To("resource_a", ResourceRelationship.Type).
			Annotations(entgql.MapsTo("resourcea")),
		edge.To("resource_b", ResourceRelationship.Type).
			Annotations(entgql.MapsTo("resourceb")),
	}
}

// Policy returns entity policy.
func (Resource) Policy() ent.Policy {
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
