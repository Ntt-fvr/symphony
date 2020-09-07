// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/mixin"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// FlowMixin defines the flow mixin schema.
type FlowMixin struct {
	mixin.Schema
}

// Fields returns flow mixin fields.
func (FlowMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty(),
		field.String("description").
			Optional().
			Nillable(),
	}
}

// Edges returns flow mixin edges.
func (FlowMixin) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("blocks", Block.Type).
			Annotations(entgql.Bind()),
	}
}

// FlowDraft defines the flow draft schema.
type FlowDraft struct {
	schema
}

// Mixin returns flow draft mixins.
func (FlowDraft) Mixin() []ent.Mixin {
	return []ent.Mixin{
		FlowMixin{},
	}
}

// Policy returns flow draft policy.
func (FlowDraft) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
