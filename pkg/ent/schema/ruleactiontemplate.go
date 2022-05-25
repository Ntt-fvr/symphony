// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// Counter defines the property type schema.
type RuleActionTemplate struct {
	schema
}

// Counter returns property type counter.
func (RuleActionTemplate) Fields() []ent.Field {
	return []ent.Field{
		field.String("text").NotEmpty().Unique().
			Annotations(entgql.OrderField("TEXT")),
	}
}

// Edges returns property type edges.
func (RuleActionTemplate) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("rule_action_template_rule_action", RuleAction.Type).
			Annotations(entgql.MapsTo("ruleaction")),
	}
}

// Policy returns entity policy.
func (RuleActionTemplate) Policy() ent.Policy {
	/*return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AssuranceTemplatesWritePolicyRule(),
		),
	)*/
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
