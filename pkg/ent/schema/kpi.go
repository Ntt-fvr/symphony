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
type Kpi struct {
	schema
}

// Counter returns property type counter.
func (Kpi) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
	}
}

// Edges returns kpi type edges.
func (Kpi) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("domain", Domain.Type).
			Ref("kpidomain").
			Unique(),
		edge.To("formulakpi", Formula.Type).
			Annotations(entgql.MapsTo("formula")),
	}
}
