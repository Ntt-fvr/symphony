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

// ReconciliationRule defines the property type schema.
type Action struct {
	schema
}

// ReconciliationRule returns property type reconciliationRule.
func (Action) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("Status").
			Values(
				"PENDING",
				"SUCCESFUL",
				"FAILED",
			).Annotations(entgql.OrderField("STATUS")),
		field.Enum("UserAction").
			Values(
				"CONFIRM",
				"IGNORE",
				"ALARM",
			).Annotations(entgql.OrderField("USER_ACTION")),
		field.String("logExecution").NotEmpty().Unique().
			Annotations(entgql.OrderField("LOGEXECUTION")),
	}
}

// Edges returns property type edges.
func (Action) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("execution", Execution.Type).
			Ref("execution").
			Unique().Annotations(entgql.OrderField("EXECUTION")),
		edge.From("ruleaction", RuleAction.Type).
			Ref("rule_action").
			Unique().Annotations(entgql.OrderField("RULEACTION")),
	}
}

// Policy returns entity policy.
func (Action) Policy() ent.Policy {
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
