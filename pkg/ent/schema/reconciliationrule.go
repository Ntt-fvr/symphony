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
type ReconciliationRule struct {
	schema
}

// ReconciliationRule returns property type reconciliationRule.
func (ReconciliationRule) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (ReconciliationRule) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("reconciliation_rule_type", ResourceType.Type).
			Annotations(entgql.MapsTo("resourcetype")),
		edge.To("reconciliation_rule_specification", ResourceSpecification.Type).
			Annotations(entgql.MapsTo("resourcespecification")),
	}
}

// Policy returns entity policy.
func (ReconciliationRule) Policy() ent.Policy {
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
