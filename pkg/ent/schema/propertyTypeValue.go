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
)

//PropertyTypeValue defines the property type schema
type PropertyTypeValue struct {
	schema
}

func (PropertyTypeValue) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().
			Annotations(entgql.OrderField("NAME")),
	}
}

func (PropertyTypeValue) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("property_type", PropertyType.Type).
			Ref("property_type_values").Unique(),
		edge.To("property_type_value", PropertyTypeValue.Type).
			Annotations(entgql.Bind()).From("property_type_value_dependence").
			Unique().Annotations(entgql.MapsTo("property_type_value_dependence")),
	}
}

func (PropertyTypeValue) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithQueryRules(
			authz.PropertyReadPolicyRule(),
		),
		authz.WithMutationRules(
			authz.PropertyWritePolicyRule(),
			authz.PropertyCreatePolicyRule(),
		),
	)
}
