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

//PropertyValue defines the property type schema
type PropertyValue struct {
	schema
}

func (PropertyValue) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().
			Annotations(entgql.OrderField("NAME")),
	}
}

func (PropertyValue) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("property", Property.Type).
			Ref("property_value").Unique(),
		edge.From("property_type_value", PropertyTypeValue.Type).
			Ref("property_value").Unique(),
		edge.To("property_value", PropertyValue.Type).
			Annotations(entgql.Bind()).From("property_value_dependence").
			Unique().Annotations(entgql.MapsTo("property_value_dependence")),
	}
}

func (PropertyValue) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
