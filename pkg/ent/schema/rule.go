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
type Rule struct {
	schema
}

// Counter returns property type counter.
func (Rule) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
		field.Int("gracePeriod"),
		field.Time("startDateTime"),
		field.Time("endDateTime"),
	}
}

// Edges returns property type edge.
func (Rule) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("ruletype", RuleType.Type).
			Ref("ruletyperule").
			Unique(),
		edge.From("event", Event.Type).
			Ref("ruleEvent").
			Unique(),
		edge.From("treshold", Treshold.Type).
			Ref("ruletreshold").
			Unique(),
		edge.To("rulelimitrule", RuleLimit.Type).
			Annotations(entgql.MapsTo("ruleLimit")),
	}
}
