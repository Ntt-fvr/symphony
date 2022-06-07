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

// Upl defines the property type schema.
type Upl struct {
	schema
}

// Upl returns property type upl.
func (Upl) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
		field.String("description").NotEmpty(),
	}
}

// Edges returns property type edges.
func (Upl) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("contract", Contract.Type).
			Ref("upl_contract").Unique().Annotations(entgql.OrderField("CONTRACT")),
		edge.To("upl_items", UplItem.Type).
			Annotations(entgql.MapsTo("uplitems")),
	}
}

// Policy returns entity policy.
func (Upl) Policy() ent.Policy {
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
