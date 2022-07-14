// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// AutomationActivity defines the location type schema.
type AutomationActivity struct {
	schema
}

// Fields returns AutomationActivity fields.
func (AutomationActivity) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("activity_type").
			NamedValues(
				"Creation", "CREATION",
				"Status", "STATUS",
			),
		field.Enum("automation_entity_type").
			NamedValues(
				"FlowInstance", "FLOW_INSTANCE",
				"BlockInstance", "BLOCK_INSTANCE",
			),
		field.String("old_value").
			Optional().
			Comment("raw value of the previous state (enum, entID ..)"),
		field.String("new_value").
			Optional().
			Comment("raw value of the next state (enum, entID ..)"),
	}
}

// Edges returns AutomationActivity edges.
func (AutomationActivity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("author", User.Type).
			Unique(),
		edge.From("flow_instance", FlowInstance.Type).
			Ref("flow_activities").
			Unique(),
		edge.From("block_instance", BlockInstance.Type).
			Ref("block_activities").
			Unique(),
	}
}

// Policy returns AutomationActivity policy.
func (AutomationActivity) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithQueryRules(
			privacy.AlwaysAllowRule(),
		),
		/*
			authz.WithQueryRules(
				authz.ActivityReadPolicyRule(),
			),
			authz.WithMutationRules(
				authz.ActivityWritePolicyRule(),
				authz.ActivityCreatePolicyRule(),
			),
		*/
	)
}
