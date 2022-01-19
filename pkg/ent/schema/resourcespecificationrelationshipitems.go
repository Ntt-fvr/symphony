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

// ResourceSpecificationRelationshipItems defines the property type schema.
type ResourceSRItems struct {
	schema
}

// ResourceSRItems returns property type Resource.
func (ResourceSRItems) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// ResourceSRItems returns property type edges.
func (ResourceSRItems) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("resourcesr", ResourceSpecificationRelationship.Type).
			Ref("resource_sr").Unique().Annotations(entgql.OrderField("NAME")),
		edge.From("resourcetype", ResourceType.Type).
			Ref("resourcetype_items").Unique().Annotations(entgql.OrderField("ResourceType")),
	}
}

// Policy returns entity policy.
func (ResourceSRItems) Policy() ent.Policy {
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
