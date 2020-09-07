// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/index"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// Block defines the block schema.
type Block struct {
	schema
}

// Fields returns block fields.
func (Block) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty(),
		field.Enum("type").
			NamedValues(
				"Start", "START",
				"End", "END",
				"Go_to", "GO_TO",
			),
	}
}

// Edges returns block edges.
func (Block) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("next_blocks", Block.Type).
			Annotations(entgql.MapsTo("nextBlocks")).
			From("prev_blocks").
			Annotations(entgql.MapsTo("prevBlocks")),
		edge.From("flow_draft", FlowDraft.Type).
			Ref("blocks").
			Unique().
			Required(),
		edge.To("goto_block", Block.Type).
			Unique().
			From("source_block"),
	}
}

// Indexes returns block indexes.
func (Block) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name").
			Edges("flow_draft").
			Unique(),
	}
}

// Policy returns block policy.
func (Block) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
