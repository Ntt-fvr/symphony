// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/index"
	"github.com/facebook/ent/schema/mixin"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/hooks"
)

// FlowMixin defines the flow mixin schema.
type FlowMixin struct {
	mixin.Schema
}

// Fields returns flow mixin fields.
func (FlowMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty(),
		field.String("description").
			Optional().
			Nillable(),
		field.JSON("end_param_definitions", []*flowschema.VariableDefinition{}).
			Optional(),
	}
}

// Edges returns flow mixin edges.
func (FlowMixin) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("blocks", Block.Type).
			Annotations(entgql.Bind()),
	}
}

// Hooks returns flow mixin hooks.
func (FlowMixin) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.VerifyEndParamDefinitionsHook(),
	}
}

// Flow defines the flow schema.
type Flow struct {
	schema
}

// Mixin returns flow mixins.
func (f Flow) Mixin() []ent.Mixin {
	return append(f.schema.Mixin(), FlowMixin{})
}

// Fields returns flow fields.
func (Flow) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			NamedValues(
				"Published", "PUBLISHED",
				"Draft", "DRAFT",
				"Archived", "ARCHIVED",
				"On_Hold", "ON_HOLD",
				"Deleted", "DELETED",
			).Default("DRAFT"),
		field.Enum("newInstancesPolicy").
			NamedValues(
				"Enabled", "ENABLED",
				"Disabled", "DISABLED",
			).Default("DISABLED"),
		field.Enum("cm_type").NamedValues(
			"initial_config", "INITIAL_CONFIG",
			"general_cr", "GENERAL_CR",
			"sync_parameters", "SYNC_PARAMETERS",
		).Default("INITIAL_CONFIG").Annotations(entgql.OrderField("CM_TYPE")),
		field.Time("creation_date").
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
	}
}

// Edges returns flow edges.
func (Flow) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("draft", FlowDraft.Type).
			Unique(),
		edge.To("author", User.Type).
			Required().
			Unique().
			Annotations(entgql.Bind()),
		edge.To("editor", User.Type).
			Annotations(entgql.Bind()),
		edge.From("instance", FlowInstance.Type).
			Ref("flow"),
	}
}

// Indexes returns flow indexes.
func (Flow) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name").
			Unique(),
	}
}

// Policy returns flow policy.
func (Flow) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AutomationTemplatesWritePolicyRule(),
		),
	)
}

// FlowExecutionTemplate defines the flow execution template schema.
type FlowExecutionTemplate struct {
	schema
}

// Mixin returns flow execution template mixins.
func (f FlowExecutionTemplate) Mixin() []ent.Mixin {
	return append(f.schema.Mixin(), FlowMixin{})
}

// Policy returns flow execution template policy.
func (FlowExecutionTemplate) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}

// FlowDraft defines the flow draft schema.
type FlowDraft struct {
	schema
}

// Mixin returns flow draft mixins.
func (f FlowDraft) Mixin() []ent.Mixin {
	return append(f.schema.Mixin(), FlowMixin{})
}

// Fields returns flow draft fields.
func (FlowDraft) Fields() []ent.Field {
	return []ent.Field{
		field.Bool("sameAsFlow").
			Default(true),
	}
}

// Edges returns flow draft edges.
func (FlowDraft) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("flow", Flow.Type).
			Unique().
			Required().
			Ref("draft"),
	}
}

// Hooks returns flow draft hooks.
func (FlowDraft) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.UpdateSameAsFlowOnDraftChangeHook(),
	}
}

// Policy returns flow draft policy.
func (FlowDraft) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AutomationTemplatesWritePolicyRule(),
		),
	)
}

// FlowInstance defines the flow instance schema.
type FlowInstance struct {
	schema
}

// Fields returns flow instance fields.
func (FlowInstance) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			NamedValues(
				"Running", "RUNNING",
				"Failed", "FAILED",
				"Failing", "FAILING",
				"Completed", "COMPLETED",
				"Cancelled", "CANCELED",
				"Canceling", "CANCELING",
				"Paused", "PAUSED",
				"Pausing", "PAUSING",
				"Closed", "CLOSED",
				"Resuming", "RESUMING",
			).Default("RUNNING"),
		field.JSON("start_params", []*flowschema.VariableValue{}).
			Optional(),
		field.JSON("output_params", []*flowschema.VariableValue{}).
			Optional(),
		field.String("incompletion_reason").
			Optional(),
		field.String("bss_code").
			Optional(),
		field.String("service_instance_code").
			Optional(),
		field.Time("start_date").
			Annotations(
				entgql.OrderField("START_AT"),
			),
		field.Time("end_date").
			Optional().
			Nillable().
			Annotations(
				entgql.OrderField("END_AT"),
			),
	}
}

// Mixin returns flow instance mixins.
func (FlowInstance) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.CreateTime{},
		mixin.AnnotateFields(
			mixin.UpdateTime{},
			entgql.OrderField("UPDATED_AT"),
		),
	}
}

// Edges returns flow instance edges.
func (FlowInstance) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("flow", Flow.Type).
			Unique(),
		edge.To("template", FlowExecutionTemplate.Type).
			Unique().
			Required(),
		edge.To("blocks", BlockInstance.Type),
		edge.From("parent_subflow_block", BlockInstance.Type).
			Unique().
			Ref("subflow_instance"),
		edge.To("flow_activities", AutomationActivity.Type),
	}
}

// Hooks returns flow instance hooks.
func (FlowInstance) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.DenyCreationOfInstanceOfDisabledFlowHook(),
		hooks.CopyFlowToFlowExecutionTemplateHook(),
		//hooks.FlowInstanceAutomationActivity(),
	}
}

// Policy returns flow instance policy.
func (FlowInstance) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
