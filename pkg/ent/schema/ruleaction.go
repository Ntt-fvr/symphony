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

// RuleAction defines the property type schema.
type RuleAction struct {
	schema
}

// RuleAction returns property type ruleAction.
func (RuleAction) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("operation").
			Values(
				"NOAPLICA",
				"MANUAL",
				"AUTOMATICO",
			).Annotations(entgql.OrderField("OPERATION")),
	}
}

// Edges returns property type edges.
func (RuleAction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("reconciliationrule", ReconciliationRule.Type).
			Ref("reconciliation_rule_rule_action").Unique().Annotations(entgql.OrderField("RECONCILIATION_RULE")),
		edge.From("ruleactiontemplate", RuleActionTemplate.Type).
			Ref("rule_action_template_rule_action").Unique().Annotations(entgql.OrderField("RULE_ACTION_TEMPLATE")),
		edge.To("rule_action", Action.Type).
			Annotations(entgql.MapsTo("action")),
	}
}

// Policy returns entity policy.
func (RuleAction) Policy() ent.Policy {
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
