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
type UplItem struct {
	schema
}

// Counter returns property type counter.
func (UplItem) Fields() []ent.Field {
	return []ent.Field{
		field.String("externalid").
			Annotations(entgql.OrderField("EXTERNALID")),
		field.String("item").
			Annotations(entgql.OrderField("ITEM")),
		field.Float("unit").
			Annotations(entgql.OrderField("UNIT")),
		field.Float("price").
			Annotations(entgql.OrderField("PRICE")),
	}
}

// Edges returns property type edges.
func (UplItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("UplItem", Cost.Type).
			Unique().
			Annotations(entgql.MapsTo("uplitem")),
		edge.From("upl", Upl.Type).
			Ref("upl_items").Unique().
			Annotations(entgql.OrderField("UPL")),
	}
}

// Policy returns entity policy.
func (UplItem) Policy() ent.Policy {
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
