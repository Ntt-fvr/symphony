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
)

// Counter defines the property type schema.
type Comparator struct {
	schema
}

// Counter returns property type counter.
func (Comparator) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (Comparator) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("comparatorrulelimit", RuleLimit.Type).
			Annotations(entgql.MapsTo("rulelimit")),
	}
}

// Policy returns entity policy.
func (Comparator) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AssuranceTemplatesWritePolicyRule(),
		),
	)
}
