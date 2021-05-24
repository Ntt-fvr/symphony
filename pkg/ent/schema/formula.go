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
type Formula struct {
	schema
}

// Counter returns formula.
func (Formula) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.Bool("active"),
	}
}

// Edges returns formula type edges.
func (Formula) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("tech", Tech.Type).
			Ref("formulatech").
			Unique(),
		edge.From("kpi", Kpi.Type).
			Ref("formulakpi").
			Unique(),
		edge.To("formula_fk", CounterVendorFormula.Type).
			Annotations(entgql.MapsTo("counter_vendor_formula")),
	}
}
