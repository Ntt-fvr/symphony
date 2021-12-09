// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/index"
)

// PropertyCategory defines the property type schema.
type PropertyCategory struct {
	schema
}

// Fields returns property type fields.
func (PropertyCategory) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			Unique(),
		field.Int("index"),
	}
}

// Edges returns property type edges.
func (PropertyCategory) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("properties_type", PropertyType.Type),
		edge.From("parameter_catalog", ParameterCatalog.Type).
			Ref("property_categories").
			Unique(),
	}
}

// Indexes returns property type indexes.
func (PropertyCategory) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name"),
	}
}
