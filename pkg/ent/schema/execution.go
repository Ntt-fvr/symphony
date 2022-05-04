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
type Execution struct {
	schema
}

// Counter returns property type counter.
func (Execution) Fields() []ent.Field {
	return []ent.Field{
		field.Time("manualConfirmation").
			Annotations(entgql.OrderField("MANUALCONFIRMATION")),
	}
}

// Edges returns property type edges.
func (Execution) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("User_fk").
			Unique().Annotations(entgql.OrderField("USERFK")),
	}
}

// Policy returns entity policy.
func (Execution) Policy() ent.Policy {
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
