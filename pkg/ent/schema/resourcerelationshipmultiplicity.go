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

// ResourceRelationshipMultiplicity defines the property type schema.
type ResourceRelationshipMultiplicity struct {
	schema
}

// ResourceRelationshipMultiplicity returns property type resourcetypeclass.
func (ResourceRelationshipMultiplicity) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique().
			Annotations(entgql.OrderField("NAME")),
	}
}

// Edges returns property type edges.
func (ResourceRelationshipMultiplicity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("resource_relationship_fk", ResourceRelationship.Type),
		edge.To("policies", PermissionsPolicy.Type),
	}
}

// Policy returns entity policy.
func (ResourceRelationshipMultiplicity) Policy() ent.Policy {
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
