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

// Alarm defines the property type schema.
type KqiPerspective struct {
	schema
}

// Alarm returns property type alarm.
func (KqiPerspective) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
	}
}

// Edges returns property type edges.
func (KqiPerspective) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("kqiPerspectiveFk", Kqi.Type).
			Annotations(entgql.MapsTo("kqi")),
	}
}
