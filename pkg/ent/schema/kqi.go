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
type Kqi struct {
	schema
}

// Alarm returns property type alarm.
func (Kqi) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().Annotations(entgql.OrderField("NAME")),
		field.String("description"),
		field.Time("startDateTime"),
		field.Time("endDateTime"),
		field.String("formula"),
	}
}

// Edges returns property type edges.
func (Kqi) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("categoryFk", Category.Type).
			Ref("categoryFk").Unique(),
		edge.From("perspectiveFk", Perspective.Type).
			Ref("perspectiveFk").Unique(),
		edge.From("kqiSourceFk", KqiSource.Type).
			Ref("kqiSourceFk").Unique(),
		edge.From("temporalFrecuencyFk", TemporalFrecuency.Type).
			Ref("temporalFrecuencyFk").Unique(),
		edge.To("kqiTargetFk", KqiTarget.Type).
			Annotations(entgql.MapsTo("kqiTarget")),
	}
}
