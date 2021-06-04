// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/ent-contrib/entgql"
)

// Counter defines the property type schema.
type Domain struct {
	schema
}

// Counter returns property type counter.
func (Domain) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
	}
}

// Edges returns property type edges.
func (Domain) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("techdomain", Tech.Type).
			Annotations(entgql.MapsTo("tech")),
		edge.To("kpidomain", Kpi.Type).
			Annotations(entgql.MapsTo("kpi")),
	}
}
