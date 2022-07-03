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
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/hooks"
)

// Block defines the block schema.
type Block struct {
	schema
}
type DecisionRoute struct {
	ExitPoint ExitPoint
	Condition string
}

// Fields returns block fields.
func (Block) Fields() []ent.Field {
	return []ent.Field{
		field.String("cid").
			NotEmpty(),
		field.Enum("type").
			NamedValues(
				"Start", "START",
				"End", "END",
				"Decision", "DECISION",
				"SubFlow", "SUB_FLOW",
				"GoTo", "GO_TO",
				"Trigger", "TRIGGER",
				"Action", "ACTION",
				"TrueFalse", "TRUE_FALSE",
				"Choice", "CHOICE",
				"ExecuteFlow", "EXECUTE_FLOW",
				"NetworkAction", "NETWORK_ACTION",
				"Timer", "TIMER",
				"InvokeRestAPI", "INVOKE_REST_API",
				"WaitForSignal", "WAIT_FOR_SIGNAL",
				"ForEach", "FOREACH",
				"Parallel", "PARALLEL",
				"Kafka", "KAFKA",
			),
		field.Enum("action_type").
			GoType(flowschema.ActionTypeID("")).
			Optional().
			Nillable(),
		field.Enum("trigger_type").
			GoType(flowschema.TriggerTypeID("")).
			Optional().
			Nillable(),
		field.JSON("start_param_definitions", []*flowschema.VariableDefinition{}).
			Optional(),
		field.JSON("input_params", []*flowschema.VariableExpression{}).
			Optional(),
		field.JSON("ui_representation", &flowschema.BlockUIRepresentation{}).
			Optional(),
		field.Bool("enable_input_transformation").
			Optional().
			Nillable(),
		field.Enum("input_transf_strategy").
			GoType(enum.TransfStrategy("")).
			Optional().
			Nillable(),
		field.String("input_transformation").
			Optional().
			Nillable(),
		field.Bool("enable_output_transformation").
			Optional().
			Nillable(),
		field.Enum("output_transf_strategy").
			GoType(enum.TransfStrategy("")).
			Optional().
			Nillable(),
		field.String("output_transformation").
			Optional().
			Nillable(),
		field.Bool("enable_input_state_transformation").
			Optional().
			Nillable(),
		field.Enum("input_state_transf_strategy").
			GoType(enum.TransfStrategy("")).
			Optional().
			Nillable(),
		field.String("input_state_transformation").
			Optional().
			Nillable(),
		field.Bool("enable_output_state_transformation").
			Optional().
			Nillable(),
		field.Enum("output_state_transf_strategy").
			GoType(enum.TransfStrategy("")).
			Optional().
			Nillable(),
		field.String("output_state_transformation").
			Optional().
			Nillable(),
		field.Bool("enable_error_handling").
			Optional().
			Nillable(),
		field.Bool("enable_retry_policy").
			Optional().
			Nillable(),
		field.Int("retryInterval").
			Optional().
			Nillable(),
		field.Enum("retry_unit").
			NamedValues(
				"SECONDS", "seconds",
				"MINUTES", "minutes",
				"HOURS", "hours",
			).
			Optional(),
		field.Int("maxAttemps").
			Optional().
			Nillable(),
		field.Int("backOffRate").
			Optional().
			Nillable(),

		field.Enum("timer_behavior").
			NamedValues(
				"FIXED_INTERVAL", "fixed_interval",
				"SPECIFIC_DATETIME", "specific_time",
			).
			Optional().
			Nillable(),
		field.Int("seconds").
			Optional().
			Nillable(),
		field.Bool("enable_timer_expression").
			Optional().
			Nillable(),
		field.String("timer_expression").
			Optional().
			Nillable(),
		field.Time("timer_specific_date").
			Optional().
			Nillable(),

		field.Enum("url_method").
			NamedValues(
				"POST", "POST",
				"GET", "GET",
				"PUT", "PUT",
				"DELETE", "DELETE",
				"PATCH", "PATCH",
			).
			Optional().
			Nillable(),
		field.String("url").
			Optional().
			Nillable(),
		field.Int("connection_timeout").
			Optional().
			Nillable(),
		field.Text("body").
			Optional().
			Nillable(),
		field.JSON("headers", []*flowschema.VariableValue{}).
			Optional(),

		field.Enum("signal_type").
			NamedValues(
				"NOTIFICATION", "NOTIFICATION",
				"WOCREATION", "WOCREATION",
				"CRCREATION", "CRCREATION",
				"WOUPDATE", "WOUPDATE",
				"CRUPDATE", "CRUPDATE",
			).
			Optional(),
		field.Enum("signal_module").
			NamedValues(
				"INVENTORY", "INVENTORY",
				"CONFIGURATION", "CONFIGURATION",
			).
			Optional(),
		field.String("custom_filter").
			Optional(),
		field.Bool("block_flow").
			Optional(),

		field.Strings("kafka_brokers").
			Optional(),
		field.String("kafka_topic").
			Optional(),
		field.String("kafka_message").
			Optional(),
		field.Enum("kafka_message_type").
			GoType(enum.KafkaMessageType("")).
			Optional(),

		field.String("foreach_key").
			Optional(),
		field.String("foreach_start_blockID").
			Optional(),
	}
}

// Edges returns block edges.
func (Block) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("flow", Flow.Type).
			Ref("blocks").
			Unique(),
		edge.From("flow_template", FlowExecutionTemplate.Type).
			Ref("blocks").
			Unique(),
		edge.From("flow_draft", FlowDraft.Type).
			Ref("blocks").
			Unique(),
		edge.To("sub_flow", Flow.Type).
			Unique(),
		edge.To("goto_block", Block.Type).
			Unique().
			From("source_block"),
		edge.From("instances", BlockInstance.Type).
			Ref("block"),
		edge.To("entry_point", EntryPoint.Type).
			Unique(),
		edge.To("exit_points", ExitPoint.Type),
	}
}

// Indexes returns block indexes.
func (Block) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("cid").
			Edges("flow_draft").
			Unique(),
		index.Fields("cid").
			Edges("flow").
			Unique(),
		index.Fields("cid").
			Edges("flow_template").
			Unique(),
	}
}

// Hooks returns block hooks.
func (Block) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.VerifyStartParamDefinitionsHook(),
		hooks.AddDefaultEntryAndExitPointsHook(),
		hooks.DeleteEntryAndExitPointsHook(),
		hooks.UpdateDraftChangedHook(),
	}
}

// Policy returns block policy.
func (Block) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			authz.AutomationTemplatesWritePolicyRule(),
		),
	)
}

// BlockInstance defines the block instance schema.
type BlockInstance struct {
	schema
}

// Fields returns block instance fields.
func (BlockInstance) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			NamedValues(
				"Pending", "PENDING",
				"InProgress", "IN_PROGRESS",
				"Failed", "FAILED",
				"Completed", "COMPLETED",
				"Waiting", "WAITING",
			).Default("PENDING"),
		field.JSON("inputs", []*flowschema.VariableValue{}).
			Optional(),
		field.JSON("outputs", []*flowschema.VariableValue{}).
			Optional(),
		field.String("failure_reason").
			Optional(),
		field.Int("block_instance_counter").
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
func (BlockInstance) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.CreateTime{},
		mixin.AnnotateFields(
			mixin.UpdateTime{},
			entgql.OrderField("UPDATED_AT"),
		),
	}
}

// Edges returns block instance edges.
func (BlockInstance) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("flow_instance", FlowInstance.Type).
			Ref("blocks").
			Unique().
			Required(),
		edge.To("block", Block.Type).
			Unique().
			Required(),
		edge.To("subflow_instance", FlowInstance.Type).
			Unique(),
	}
}

// Policy returns block instance policy.
func (BlockInstance) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}

func (BlockInstance) Hooks() []ent.Hook {
	return []ent.Hook{
		hooks.UpdateFlowInstanceStatus(),
	}
}
