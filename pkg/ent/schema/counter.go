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
type Counter struct {
	schema
}

// Counter returns property type counter.
func (Counter) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
		field.String("externalId"),
		field.String("networkManagerSystem"),
	}
}

// Edges returns property type edges.
func (Counter) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("counterfamily", CounterFamily.Type).
			Ref("counterfamily").
			Unique(),
		edge.To("counter_fk", CounterVendorFormula.Type).
			Annotations(entgql.MapsTo("counter")),
	}
}
