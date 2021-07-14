// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/authz"
)

// Counter defines the property type schema.
type RuleLimit struct {
	schema
}

// Counter returns property type counter.
func (RuleLimit) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
		field.String("limitType").NotEmpty(),
	}
}

// Edges returns property type edges.
func (RuleLimit) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("comparator", Comparator.Type).
			Ref("comparatorrulelimit").Unique(),
		edge.From("rule", Rule.Type).
			Ref("rulelimitrule").Unique(),
	}
}

// Policy returns entity policy.
func (RuleLimit) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AssuranceTemplatesWritePolicyRule(),
		),
	)
}
