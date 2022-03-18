// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/index"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// ResourcePropertyType defines the resourcepropertytype schema.
type ResourcePropertyType struct {
	schema
}

// Fields returns resourcepropertytype type fields.
func (ResourcePropertyType) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("type").
			Values(
				"string",
				"int",
				"bool",
				"float",
				"date",
				"enum",
				"range",
				"email",
				"gps_location",
				"datetime_local",
				"node",
			),
		field.String("name"),
		field.String("external_id").
			Unique().
			Optional(),
		field.Int("index").
			Optional(),
		field.String("category").
			Optional(),
		field.Int("int_val").
			StructTag(`json:"intValue" gqlgen:"intValue"`).
			Optional().
			Nillable(),
		field.Bool("bool_val").
			StructTag(`json:"booleanValue" gqlgen:"booleanValue"`).
			Optional().
			Nillable(),
		field.Float("float_val").
			StructTag(`json:"floatValue" gqlgen:"floatValue"`).
			Optional().
			Nillable(),
		field.Float("latitude_val").
			StructTag(`json:"latitudeValue" gqlgen:"latitudeValue"`).
			Optional().
			Nillable(),
		field.Float("longitude_val").
			StructTag(`json:"longitudeValue" gqlgen:"longitudeValue"`).
			Optional().
			Nillable(),
		field.Text("string_val").
			StructTag(`json:"stringValue" gqlgen:"stringValue"`).
			Optional().
			Nillable(),
		field.Float("range_from_val").
			StructTag(`json:"rangeFromValue" gqlgen:"rangeFromValue"`).
			Optional().
			Nillable(),
		field.Float("range_to_val").
			StructTag(`json:"rangeToValue" gqlgen:"rangeToValue"`).
			Optional().
			Nillable(),
		field.Bool("is_instance_property").
			StructTag(`gqlgen:"isInstanceProperty"`).
			Default(true),
		field.Bool("editable").
			StructTag(`gqlgen:"isEditable"`).
			Default(true),
		field.Bool("mandatory").
			StructTag(`gqlgen:"isMandatory"`).
			Default(false),
		field.Bool("deleted").
			StructTag(`gqlgen:"isDeleted"`).
			Default(false),
		field.Bool("listable").
			StructTag(`gqlgen:"isListable"`).
			Default(false),
		field.String("nodeType").Optional(),
	}
}

// Edges returns resourceproperty type edges.
func (ResourcePropertyType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourceSpecification", ResourceSpecification.Type).
			Ref("resource_property_type").Unique().
			Annotations(entgql.OrderField("RESOURCESPECIFICATION")),
		edge.From("property_category", PropertyCategory.Type).
			Ref("resource_properties_type").
			Unique().
			Annotations(entgql.MapsTo("propertyCategory")),
	}
}

// Indexes returns property type indexes.
func (ResourcePropertyType) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name").
			Edges("property_category"),
	}
}

// Policy returns entity policy.
func (ResourcePropertyType) Policy() ent.Policy {
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
