// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
)

// Alarm defines the property type schema.
type KqiTarget struct {
	schema
}

// Alarm returns property type alarm.
func (KqiTarget) Fields() []ent.Field {
	return []ent.Field{
		field.Float("comparator"),
		field.Float("referenceValue"),
		field.Float("warningComparator"),
		field.Float("frame"),
		field.Float("alowedValidation"),
		field.Time("initTime"),
		field.Time("endTime"),
		field.String("impact"),
		field.Bool("active"),
	}
}

// Edges returns property type edges.
func (KqiTarget) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("kqiTargetFk", Kqi.Type).
			Ref("kqiTargetFk").
			Unique(),
	}
}
