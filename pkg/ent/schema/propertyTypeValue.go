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
			Ref("prop_type").Unique(),
		edge.To("prop_type_value", PropertyTypeValue.Type).
			Annotations(entgql.Bind()).From("pro_typ_val").
			Unique().Annotations(entgql.MapsTo("proper_type_values")),
	}
}

func (PropertyTypeValue) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
