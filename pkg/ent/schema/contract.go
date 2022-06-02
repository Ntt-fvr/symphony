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
	"github.com/facebookincubator/symphony/pkg/hooks"
)

// Contract defines the property type schema.
type Contract struct {
	schema
}

// Contract returns property type contract.
func (Contract) Fields() []ent.Field {
	return []ent.Field{
		field.String("external_id").NotEmpty().Unique(),
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
		field.String("category").NotEmpty(),
		field.Time("effective_date"),
		field.Time("expiration_date"),
		field.String("description").NotEmpty(),
		field.Enum("status").
			Values(
				"ACTIVE",
				"EXPIRE",
				"PENDING",
			),
	}
}

// Edges returns property type edges.
func (Contract) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("organization", Organization.Type).
			Ref("contract_organization").Unique().Annotations(entgql.OrderField("ORGANIZATION")),
		edge.To("upl_contract", Upl.Type).
			Annotations(entgql.MapsTo("upl")),
		edge.To("work_order_contract", WorkOrder.Type).
			Annotations(entgql.MapsTo("workorder")),
	}
}

// Hooks returns contract hooks.
func (Contract) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.ContractSetStatusByDate(),
	}
}

// Policy returns entity policy.
func (Contract) Policy() ent.Policy {
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
