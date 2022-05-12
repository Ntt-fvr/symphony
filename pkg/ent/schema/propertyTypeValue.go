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

// PropertyTypeValue defines the property type schema
type PropertyTypeValue struct {
	schema
}

func (PropertyTypeValue) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().
			Annotations(entgql.OrderField("NAME")),
		field.Bool("deleted").
			StructTag(`gqlgen:"isDeleted"`).
			Default(false),
	}
}

func (PropertyTypeValue) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("property_type", PropertyType.Type).
			Ref("property_type_values").Unique(),
		edge.To("property_type_value", PropertyTypeValue.Type).
			Annotations(entgql.Bind()).
			From("parent_property_type_value").
			Annotations(entgql.MapsTo("parent_property_type_value")),
		edge.To("property", Property.Type).
			Annotations(entgql.MapsTo("property")),
	}
}

func (PropertyTypeValue) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
