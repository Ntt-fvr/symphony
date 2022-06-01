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
type Cost struct {
	schema
}

// Counter returns property type counter.
func (Cost) Fields() []ent.Field {
	return []ent.Field{
		field.String("item").
			Annotations(entgql.OrderField("ITEM")),
		field.Float("unit").
			Annotations(entgql.OrderField("UNIT")),
		field.Float("price").
			Annotations(entgql.OrderField("PRICE")),
		field.Int("quantity").
			Annotations(entgql.OrderField("QUANTITY")),
		field.Float("total").
			Annotations(entgql.OrderField("TOTAL")),
	}
}

// Edges returns property type edges.
func (Cost) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("uplitem", UplItem.Type).
			Ref("uplitem").Unique(),
		edge.From("workorder", WorkOrder.Type).
			Ref("workorder_costs").Unique().
			Annotations(entgql.OrderField("WORKORDER")),
	}
}

// Policy returns entity policy.
func (Cost) Policy() ent.Policy {
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
