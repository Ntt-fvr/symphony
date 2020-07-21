// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"time"

	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
)

// Todo defines the todo type schema.
type Todo struct {
	ent.Schema
}

// Fields returns todo fields.
func (Todo) Fields() []ent.Field {
	return []ent.Field{
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Annotations(entgql.Annotation{
				OrderField: "CREATED_AT",
			}),
		field.Enum("status").
			Values("IN_PROGRESS", "COMPLETED").
			Annotations(entgql.Annotation{
				OrderField: "STATUS",
			}),
		field.Int("priority").
			Default(0).
			Annotations(entgql.Annotation{
				OrderField: "PRIORITY",
			}),
		field.Text("text").
			NotEmpty().
			Annotations(entgql.Annotation{
				OrderField: "TEXT",
			}),
	}
}

// Edges returns todo edges.
func (Todo) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("children", Todo.Type).
			StructTag(`gqlgen:"children"`).
			From("parent").
			StructTag(`gqlgen:"parent"`).
			Unique(),
	}
}
