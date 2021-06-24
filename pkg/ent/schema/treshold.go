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
type Treshold struct {
	schema
}

// Counter returns property type counter.
func (Treshold) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
		field.String("description").NotEmpty(),
	}
}

// Edges returns property type edges.
func (Treshold) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("kpi", Kpi.Type).
			Ref("tresholdkpi").
			Unique(),
		edge.To("ruletreshold", Rule.Type).
			Annotations(entgql.MapsTo("rule")),
	}
}
