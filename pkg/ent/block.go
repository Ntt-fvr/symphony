// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/entrypoint"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/ent/flowexecutiontemplate"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// Block is the model entity for the Block schema.
type Block struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Cid holds the value of the "cid" field.
	Cid string `json:"cid,omitempty"`
	// Type holds the value of the "type" field.
	Type block.Type `json:"type,omitempty"`
	// ActionType holds the value of the "action_type" field.
	ActionType *flowschema.ActionTypeID `json:"action_type,omitempty"`
	// TriggerType holds the value of the "trigger_type" field.
	TriggerType *flowschema.TriggerTypeID `json:"trigger_type,omitempty"`
	// StartParamDefinitions holds the value of the "start_param_definitions" field.
	StartParamDefinitions []*flowschema.VariableDefinition `json:"start_param_definitions,omitempty"`
	// InputParams holds the value of the "input_params" field.
	InputParams []*flowschema.VariableExpression `json:"input_params,omitempty"`
	// UIRepresentation holds the value of the "ui_representation" field.
	UIRepresentation *flowschema.BlockUIRepresentation `json:"ui_representation,omitempty"`
	// EnableInputTransformation holds the value of the "enable_input_transformation" field.
	EnableInputTransformation *bool `json:"enable_input_transformation,omitempty"`
	// InputTransfStrategy holds the value of the "input_transf_strategy" field.
	InputTransfStrategy *enum.TransfStrategy `json:"input_transf_strategy,omitempty"`
	// InputTransformation holds the value of the "input_transformation" field.
	InputTransformation *string `json:"input_transformation,omitempty"`
	// EnableOutputTransformation holds the value of the "enable_output_transformation" field.
	EnableOutputTransformation *bool `json:"enable_output_transformation,omitempty"`
	// OutputTransfStrategy holds the value of the "output_transf_strategy" field.
	OutputTransfStrategy *enum.TransfStrategy `json:"output_transf_strategy,omitempty"`
	// OutputTransformation holds the value of the "output_transformation" field.
	OutputTransformation *string `json:"output_transformation,omitempty"`
	// EnableInputStateTransformation holds the value of the "enable_input_state_transformation" field.
	EnableInputStateTransformation *bool `json:"enable_input_state_transformation,omitempty"`
	// InputStateTransfStrategy holds the value of the "input_state_transf_strategy" field.
	InputStateTransfStrategy *enum.TransfStrategy `json:"input_state_transf_strategy,omitempty"`
	// InputStateTransformation holds the value of the "input_state_transformation" field.
	InputStateTransformation *string `json:"input_state_transformation,omitempty"`
	// EnableOutputStateTransformation holds the value of the "enable_output_state_transformation" field.
	EnableOutputStateTransformation *bool `json:"enable_output_state_transformation,omitempty"`
	// OutputStateTransfStrategy holds the value of the "output_state_transf_strategy" field.
	OutputStateTransfStrategy *enum.TransfStrategy `json:"output_state_transf_strategy,omitempty"`
	// OutputStateTransformation holds the value of the "output_state_transformation" field.
	OutputStateTransformation *string `json:"output_state_transformation,omitempty"`
	// EnableErrorHandling holds the value of the "enable_error_handling" field.
	EnableErrorHandling *bool `json:"enable_error_handling,omitempty"`
	// EnableRetryPolicy holds the value of the "enable_retry_policy" field.
	EnableRetryPolicy *bool `json:"enable_retry_policy,omitempty"`
	// RetryInterval holds the value of the "retryInterval" field.
	RetryInterval *int `json:"retryInterval,omitempty"`
	// RetryUnit holds the value of the "retry_unit" field.
	RetryUnit block.RetryUnit `json:"retry_unit,omitempty"`
	// MaxAttemps holds the value of the "maxAttemps" field.
	MaxAttemps *int `json:"maxAttemps,omitempty"`
	// BackOffRate holds the value of the "backOffRate" field.
	BackOffRate *int `json:"backOffRate,omitempty"`
	// TimerBehavior holds the value of the "timer_behavior" field.
	TimerBehavior *block.TimerBehavior `json:"timer_behavior,omitempty"`
	// Seconds holds the value of the "seconds" field.
	Seconds *int `json:"seconds,omitempty"`
	// EnableTimerExpression holds the value of the "enable_timer_expression" field.
	EnableTimerExpression *bool `json:"enable_timer_expression,omitempty"`
	// TimerExpression holds the value of the "timer_expression" field.
	TimerExpression *string `json:"timer_expression,omitempty"`
	// TimerSpecificDate holds the value of the "timer_specific_date" field.
	TimerSpecificDate *time.Time `json:"timer_specific_date,omitempty"`
	// URLMethod holds the value of the "url_method" field.
	URLMethod *block.URLMethod `json:"url_method,omitempty"`
	// URL holds the value of the "url" field.
	URL *string `json:"url,omitempty"`
	// ConnectionTimeout holds the value of the "connection_timeout" field.
	ConnectionTimeout *int `json:"connection_timeout,omitempty"`
	// Body holds the value of the "body" field.
	Body *string `json:"body,omitempty"`
	// Headers holds the value of the "headers" field.
	Headers []*flowschema.VariableValue `json:"headers,omitempty"`
	// SignalType holds the value of the "signal_type" field.
	SignalType block.SignalType `json:"signal_type,omitempty"`
	// SignalModule holds the value of the "signal_module" field.
	SignalModule block.SignalModule `json:"signal_module,omitempty"`
	// CustomFilter holds the value of the "custom_filter" field.
	CustomFilter string `json:"custom_filter,omitempty"`
	// BlockFlow holds the value of the "block_flow" field.
	BlockFlow bool `json:"block_flow,omitempty"`
	// KafkaBrokers holds the value of the "kafka_brokers" field.
	KafkaBrokers []string `json:"kafka_brokers,omitempty"`
	// KafkaTopic holds the value of the "kafka_topic" field.
	KafkaTopic string `json:"kafka_topic,omitempty"`
	// KafkaMessage holds the value of the "kafka_message" field.
	KafkaMessage string `json:"kafka_message,omitempty"`
	// KafkaMessageType holds the value of the "kafka_message_type" field.
	KafkaMessageType enum.KafkaMessageType `json:"kafka_message_type,omitempty"`
	// ForeachKey holds the value of the "foreach_key" field.
	ForeachKey *string `json:"foreach_key,omitempty"`
	// ForeachStartBlockID holds the value of the "foreach_start_blockID" field.
	ForeachStartBlockID *int `json:"foreach_start_blockID,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the BlockQuery when eager-loading is set.
	Edges                          BlockEdges `json:"edges"`
	block_sub_flow                 *int
	block_goto_block               *int
	flow_blocks                    *int
	flow_draft_blocks              *int
	flow_execution_template_blocks *int
}

// BlockEdges holds the relations/edges for other nodes in the graph.
type BlockEdges struct {
	// Flow holds the value of the flow edge.
	Flow *Flow
	// FlowTemplate holds the value of the flow_template edge.
	FlowTemplate *FlowExecutionTemplate
	// FlowDraft holds the value of the flow_draft edge.
	FlowDraft *FlowDraft
	// SubFlow holds the value of the sub_flow edge.
	SubFlow *Flow
	// SourceBlock holds the value of the source_block edge.
	SourceBlock []*Block
	// GotoBlock holds the value of the goto_block edge.
	GotoBlock *Block
	// Instances holds the value of the instances edge.
	Instances []*BlockInstance
	// EntryPoint holds the value of the entry_point edge.
	EntryPoint *EntryPoint
	// ExitPoints holds the value of the exit_points edge.
	ExitPoints []*ExitPoint
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [9]bool
}

// FlowOrErr returns the Flow value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) FlowOrErr() (*Flow, error) {
	if e.loadedTypes[0] {
		if e.Flow == nil {
			// The edge flow was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flow.Label}
		}
		return e.Flow, nil
	}
	return nil, &NotLoadedError{edge: "flow"}
}

// FlowTemplateOrErr returns the FlowTemplate value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) FlowTemplateOrErr() (*FlowExecutionTemplate, error) {
	if e.loadedTypes[1] {
		if e.FlowTemplate == nil {
			// The edge flow_template was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flowexecutiontemplate.Label}
		}
		return e.FlowTemplate, nil
	}
	return nil, &NotLoadedError{edge: "flow_template"}
}

// FlowDraftOrErr returns the FlowDraft value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) FlowDraftOrErr() (*FlowDraft, error) {
	if e.loadedTypes[2] {
		if e.FlowDraft == nil {
			// The edge flow_draft was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flowdraft.Label}
		}
		return e.FlowDraft, nil
	}
	return nil, &NotLoadedError{edge: "flow_draft"}
}

// SubFlowOrErr returns the SubFlow value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) SubFlowOrErr() (*Flow, error) {
	if e.loadedTypes[3] {
		if e.SubFlow == nil {
			// The edge sub_flow was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flow.Label}
		}
		return e.SubFlow, nil
	}
	return nil, &NotLoadedError{edge: "sub_flow"}
}

// SourceBlockOrErr returns the SourceBlock value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) SourceBlockOrErr() ([]*Block, error) {
	if e.loadedTypes[4] {
		return e.SourceBlock, nil
	}
	return nil, &NotLoadedError{edge: "source_block"}
}

// GotoBlockOrErr returns the GotoBlock value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) GotoBlockOrErr() (*Block, error) {
	if e.loadedTypes[5] {
		if e.GotoBlock == nil {
			// The edge goto_block was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: block.Label}
		}
		return e.GotoBlock, nil
	}
	return nil, &NotLoadedError{edge: "goto_block"}
}

// InstancesOrErr returns the Instances value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) InstancesOrErr() ([]*BlockInstance, error) {
	if e.loadedTypes[6] {
		return e.Instances, nil
	}
	return nil, &NotLoadedError{edge: "instances"}
}

// EntryPointOrErr returns the EntryPoint value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) EntryPointOrErr() (*EntryPoint, error) {
	if e.loadedTypes[7] {
		if e.EntryPoint == nil {
			// The edge entry_point was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: entrypoint.Label}
		}
		return e.EntryPoint, nil
	}
	return nil, &NotLoadedError{edge: "entry_point"}
}

// ExitPointsOrErr returns the ExitPoints value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) ExitPointsOrErr() ([]*ExitPoint, error) {
	if e.loadedTypes[8] {
		return e.ExitPoints, nil
	}
	return nil, &NotLoadedError{edge: "exit_points"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Block) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // cid
		&sql.NullString{}, // type
		&sql.NullString{}, // action_type
		&sql.NullString{}, // trigger_type
		&[]byte{},         // start_param_definitions
		&[]byte{},         // input_params
		&[]byte{},         // ui_representation
		&sql.NullBool{},   // enable_input_transformation
		&sql.NullString{}, // input_transf_strategy
		&sql.NullString{}, // input_transformation
		&sql.NullBool{},   // enable_output_transformation
		&sql.NullString{}, // output_transf_strategy
		&sql.NullString{}, // output_transformation
		&sql.NullBool{},   // enable_input_state_transformation
		&sql.NullString{}, // input_state_transf_strategy
		&sql.NullString{}, // input_state_transformation
		&sql.NullBool{},   // enable_output_state_transformation
		&sql.NullString{}, // output_state_transf_strategy
		&sql.NullString{}, // output_state_transformation
		&sql.NullBool{},   // enable_error_handling
		&sql.NullBool{},   // enable_retry_policy
		&sql.NullInt64{},  // retryInterval
		&sql.NullString{}, // retry_unit
		&sql.NullInt64{},  // maxAttemps
		&sql.NullInt64{},  // backOffRate
		&sql.NullString{}, // timer_behavior
		&sql.NullInt64{},  // seconds
		&sql.NullBool{},   // enable_timer_expression
		&sql.NullString{}, // timer_expression
		&sql.NullTime{},   // timer_specific_date
		&sql.NullString{}, // url_method
		&sql.NullString{}, // url
		&sql.NullInt64{},  // connection_timeout
		&sql.NullString{}, // body
		&[]byte{},         // headers
		&sql.NullString{}, // signal_type
		&sql.NullString{}, // signal_module
		&sql.NullString{}, // custom_filter
		&sql.NullBool{},   // block_flow
		&[]byte{},         // kafka_brokers
		&sql.NullString{}, // kafka_topic
		&sql.NullString{}, // kafka_message
		&sql.NullString{}, // kafka_message_type
		&sql.NullString{}, // foreach_key
		&sql.NullInt64{},  // foreach_start_blockID
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*Block) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // block_sub_flow
		&sql.NullInt64{}, // block_goto_block
		&sql.NullInt64{}, // flow_blocks
		&sql.NullInt64{}, // flow_draft_blocks
		&sql.NullInt64{}, // flow_execution_template_blocks
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Block fields.
func (b *Block) assignValues(values ...interface{}) error {
	if m, n := len(values), len(block.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	b.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		b.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		b.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field cid", values[2])
	} else if value.Valid {
		b.Cid = value.String
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field type", values[3])
	} else if value.Valid {
		b.Type = block.Type(value.String)
	}
	if value, ok := values[4].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field action_type", values[4])
	} else if value.Valid {
		b.ActionType = new(flowschema.ActionTypeID)
		*b.ActionType = flowschema.ActionTypeID(value.String)
	}
	if value, ok := values[5].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field trigger_type", values[5])
	} else if value.Valid {
		b.TriggerType = new(flowschema.TriggerTypeID)
		*b.TriggerType = flowschema.TriggerTypeID(value.String)
	}

	if value, ok := values[6].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field start_param_definitions", values[6])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &b.StartParamDefinitions); err != nil {
			return fmt.Errorf("unmarshal field start_param_definitions: %v", err)
		}
	}

	if value, ok := values[7].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field input_params", values[7])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &b.InputParams); err != nil {
			return fmt.Errorf("unmarshal field input_params: %v", err)
		}
	}

	if value, ok := values[8].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field ui_representation", values[8])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &b.UIRepresentation); err != nil {
			return fmt.Errorf("unmarshal field ui_representation: %v", err)
		}
	}
	if value, ok := values[9].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_input_transformation", values[9])
	} else if value.Valid {
		b.EnableInputTransformation = new(bool)
		*b.EnableInputTransformation = value.Bool
	}
	if value, ok := values[10].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field input_transf_strategy", values[10])
	} else if value.Valid {
		b.InputTransfStrategy = new(enum.TransfStrategy)
		*b.InputTransfStrategy = enum.TransfStrategy(value.String)
	}
	if value, ok := values[11].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field input_transformation", values[11])
	} else if value.Valid {
		b.InputTransformation = new(string)
		*b.InputTransformation = value.String
	}
	if value, ok := values[12].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_output_transformation", values[12])
	} else if value.Valid {
		b.EnableOutputTransformation = new(bool)
		*b.EnableOutputTransformation = value.Bool
	}
	if value, ok := values[13].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field output_transf_strategy", values[13])
	} else if value.Valid {
		b.OutputTransfStrategy = new(enum.TransfStrategy)
		*b.OutputTransfStrategy = enum.TransfStrategy(value.String)
	}
	if value, ok := values[14].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field output_transformation", values[14])
	} else if value.Valid {
		b.OutputTransformation = new(string)
		*b.OutputTransformation = value.String
	}
	if value, ok := values[15].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_input_state_transformation", values[15])
	} else if value.Valid {
		b.EnableInputStateTransformation = new(bool)
		*b.EnableInputStateTransformation = value.Bool
	}
	if value, ok := values[16].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field input_state_transf_strategy", values[16])
	} else if value.Valid {
		b.InputStateTransfStrategy = new(enum.TransfStrategy)
		*b.InputStateTransfStrategy = enum.TransfStrategy(value.String)
	}
	if value, ok := values[17].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field input_state_transformation", values[17])
	} else if value.Valid {
		b.InputStateTransformation = new(string)
		*b.InputStateTransformation = value.String
	}
	if value, ok := values[18].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_output_state_transformation", values[18])
	} else if value.Valid {
		b.EnableOutputStateTransformation = new(bool)
		*b.EnableOutputStateTransformation = value.Bool
	}
	if value, ok := values[19].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field output_state_transf_strategy", values[19])
	} else if value.Valid {
		b.OutputStateTransfStrategy = new(enum.TransfStrategy)
		*b.OutputStateTransfStrategy = enum.TransfStrategy(value.String)
	}
	if value, ok := values[20].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field output_state_transformation", values[20])
	} else if value.Valid {
		b.OutputStateTransformation = new(string)
		*b.OutputStateTransformation = value.String
	}
	if value, ok := values[21].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_error_handling", values[21])
	} else if value.Valid {
		b.EnableErrorHandling = new(bool)
		*b.EnableErrorHandling = value.Bool
	}
	if value, ok := values[22].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_retry_policy", values[22])
	} else if value.Valid {
		b.EnableRetryPolicy = new(bool)
		*b.EnableRetryPolicy = value.Bool
	}
	if value, ok := values[23].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field retryInterval", values[23])
	} else if value.Valid {
		b.RetryInterval = new(int)
		*b.RetryInterval = int(value.Int64)
	}
	if value, ok := values[24].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field retry_unit", values[24])
	} else if value.Valid {
		b.RetryUnit = block.RetryUnit(value.String)
	}
	if value, ok := values[25].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field maxAttemps", values[25])
	} else if value.Valid {
		b.MaxAttemps = new(int)
		*b.MaxAttemps = int(value.Int64)
	}
	if value, ok := values[26].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field backOffRate", values[26])
	} else if value.Valid {
		b.BackOffRate = new(int)
		*b.BackOffRate = int(value.Int64)
	}
	if value, ok := values[27].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field timer_behavior", values[27])
	} else if value.Valid {
		b.TimerBehavior = new(block.TimerBehavior)
		*b.TimerBehavior = block.TimerBehavior(value.String)
	}
	if value, ok := values[28].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field seconds", values[28])
	} else if value.Valid {
		b.Seconds = new(int)
		*b.Seconds = int(value.Int64)
	}
	if value, ok := values[29].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field enable_timer_expression", values[29])
	} else if value.Valid {
		b.EnableTimerExpression = new(bool)
		*b.EnableTimerExpression = value.Bool
	}
	if value, ok := values[30].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field timer_expression", values[30])
	} else if value.Valid {
		b.TimerExpression = new(string)
		*b.TimerExpression = value.String
	}
	if value, ok := values[31].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field timer_specific_date", values[31])
	} else if value.Valid {
		b.TimerSpecificDate = new(time.Time)
		*b.TimerSpecificDate = value.Time
	}
	if value, ok := values[32].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field url_method", values[32])
	} else if value.Valid {
		b.URLMethod = new(block.URLMethod)
		*b.URLMethod = block.URLMethod(value.String)
	}
	if value, ok := values[33].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field url", values[33])
	} else if value.Valid {
		b.URL = new(string)
		*b.URL = value.String
	}
	if value, ok := values[34].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field connection_timeout", values[34])
	} else if value.Valid {
		b.ConnectionTimeout = new(int)
		*b.ConnectionTimeout = int(value.Int64)
	}
	if value, ok := values[35].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field body", values[35])
	} else if value.Valid {
		b.Body = new(string)
		*b.Body = value.String
	}

	if value, ok := values[36].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field headers", values[36])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &b.Headers); err != nil {
			return fmt.Errorf("unmarshal field headers: %v", err)
		}
	}
	if value, ok := values[37].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field signal_type", values[37])
	} else if value.Valid {
		b.SignalType = block.SignalType(value.String)
	}
	if value, ok := values[38].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field signal_module", values[38])
	} else if value.Valid {
		b.SignalModule = block.SignalModule(value.String)
	}
	if value, ok := values[39].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field custom_filter", values[39])
	} else if value.Valid {
		b.CustomFilter = value.String
	}
	if value, ok := values[40].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field block_flow", values[40])
	} else if value.Valid {
		b.BlockFlow = value.Bool
	}

	if value, ok := values[41].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field kafka_brokers", values[41])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &b.KafkaBrokers); err != nil {
			return fmt.Errorf("unmarshal field kafka_brokers: %v", err)
		}
	}
	if value, ok := values[42].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field kafka_topic", values[42])
	} else if value.Valid {
		b.KafkaTopic = value.String
	}
	if value, ok := values[43].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field kafka_message", values[43])
	} else if value.Valid {
		b.KafkaMessage = value.String
	}
	if value, ok := values[44].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field kafka_message_type", values[44])
	} else if value.Valid {
		b.KafkaMessageType = enum.KafkaMessageType(value.String)
	}
	if value, ok := values[45].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field foreach_key", values[45])
	} else if value.Valid {
		b.ForeachKey = new(string)
		*b.ForeachKey = value.String
	}
	if value, ok := values[46].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field foreach_start_blockID", values[46])
	} else if value.Valid {
		b.ForeachStartBlockID = new(int)
		*b.ForeachStartBlockID = int(value.Int64)
	}
	values = values[47:]
	if len(values) == len(block.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field block_sub_flow", value)
		} else if value.Valid {
			b.block_sub_flow = new(int)
			*b.block_sub_flow = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field block_goto_block", value)
		} else if value.Valid {
			b.block_goto_block = new(int)
			*b.block_goto_block = int(value.Int64)
		}
		if value, ok := values[2].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field flow_blocks", value)
		} else if value.Valid {
			b.flow_blocks = new(int)
			*b.flow_blocks = int(value.Int64)
		}
		if value, ok := values[3].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field flow_draft_blocks", value)
		} else if value.Valid {
			b.flow_draft_blocks = new(int)
			*b.flow_draft_blocks = int(value.Int64)
		}
		if value, ok := values[4].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field flow_execution_template_blocks", value)
		} else if value.Valid {
			b.flow_execution_template_blocks = new(int)
			*b.flow_execution_template_blocks = int(value.Int64)
		}
	}
	return nil
}

// QueryFlow queries the flow edge of the Block.
func (b *Block) QueryFlow() *FlowQuery {
	return (&BlockClient{config: b.config}).QueryFlow(b)
}

// QueryFlowTemplate queries the flow_template edge of the Block.
func (b *Block) QueryFlowTemplate() *FlowExecutionTemplateQuery {
	return (&BlockClient{config: b.config}).QueryFlowTemplate(b)
}

// QueryFlowDraft queries the flow_draft edge of the Block.
func (b *Block) QueryFlowDraft() *FlowDraftQuery {
	return (&BlockClient{config: b.config}).QueryFlowDraft(b)
}

// QuerySubFlow queries the sub_flow edge of the Block.
func (b *Block) QuerySubFlow() *FlowQuery {
	return (&BlockClient{config: b.config}).QuerySubFlow(b)
}

// QuerySourceBlock queries the source_block edge of the Block.
func (b *Block) QuerySourceBlock() *BlockQuery {
	return (&BlockClient{config: b.config}).QuerySourceBlock(b)
}

// QueryGotoBlock queries the goto_block edge of the Block.
func (b *Block) QueryGotoBlock() *BlockQuery {
	return (&BlockClient{config: b.config}).QueryGotoBlock(b)
}

// QueryInstances queries the instances edge of the Block.
func (b *Block) QueryInstances() *BlockInstanceQuery {
	return (&BlockClient{config: b.config}).QueryInstances(b)
}

// QueryEntryPoint queries the entry_point edge of the Block.
func (b *Block) QueryEntryPoint() *EntryPointQuery {
	return (&BlockClient{config: b.config}).QueryEntryPoint(b)
}

// QueryExitPoints queries the exit_points edge of the Block.
func (b *Block) QueryExitPoints() *ExitPointQuery {
	return (&BlockClient{config: b.config}).QueryExitPoints(b)
}

// Update returns a builder for updating this Block.
// Note that, you need to call Block.Unwrap() before calling this method, if this Block
// was returned from a transaction, and the transaction was committed or rolled back.
func (b *Block) Update() *BlockUpdateOne {
	return (&BlockClient{config: b.config}).UpdateOne(b)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (b *Block) Unwrap() *Block {
	tx, ok := b.config.driver.(*txDriver)
	if !ok {
		panic("ent: Block is not a transactional entity")
	}
	b.config.driver = tx.drv
	return b
}

// String implements the fmt.Stringer.
func (b *Block) String() string {
	var builder strings.Builder
	builder.WriteString("Block(")
	builder.WriteString(fmt.Sprintf("id=%v", b.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(b.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(b.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", cid=")
	builder.WriteString(b.Cid)
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", b.Type))
	if v := b.ActionType; v != nil {
		builder.WriteString(", action_type=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.TriggerType; v != nil {
		builder.WriteString(", trigger_type=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteString(", start_param_definitions=")
	builder.WriteString(fmt.Sprintf("%v", b.StartParamDefinitions))
	builder.WriteString(", input_params=")
	builder.WriteString(fmt.Sprintf("%v", b.InputParams))
	builder.WriteString(", ui_representation=")
	builder.WriteString(fmt.Sprintf("%v", b.UIRepresentation))
	if v := b.EnableInputTransformation; v != nil {
		builder.WriteString(", enable_input_transformation=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.InputTransfStrategy; v != nil {
		builder.WriteString(", input_transf_strategy=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.InputTransformation; v != nil {
		builder.WriteString(", input_transformation=")
		builder.WriteString(*v)
	}
	if v := b.EnableOutputTransformation; v != nil {
		builder.WriteString(", enable_output_transformation=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.OutputTransfStrategy; v != nil {
		builder.WriteString(", output_transf_strategy=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.OutputTransformation; v != nil {
		builder.WriteString(", output_transformation=")
		builder.WriteString(*v)
	}
	if v := b.EnableInputStateTransformation; v != nil {
		builder.WriteString(", enable_input_state_transformation=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.InputStateTransfStrategy; v != nil {
		builder.WriteString(", input_state_transf_strategy=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.InputStateTransformation; v != nil {
		builder.WriteString(", input_state_transformation=")
		builder.WriteString(*v)
	}
	if v := b.EnableOutputStateTransformation; v != nil {
		builder.WriteString(", enable_output_state_transformation=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.OutputStateTransfStrategy; v != nil {
		builder.WriteString(", output_state_transf_strategy=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.OutputStateTransformation; v != nil {
		builder.WriteString(", output_state_transformation=")
		builder.WriteString(*v)
	}
	if v := b.EnableErrorHandling; v != nil {
		builder.WriteString(", enable_error_handling=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.EnableRetryPolicy; v != nil {
		builder.WriteString(", enable_retry_policy=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.RetryInterval; v != nil {
		builder.WriteString(", retryInterval=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteString(", retry_unit=")
	builder.WriteString(fmt.Sprintf("%v", b.RetryUnit))
	if v := b.MaxAttemps; v != nil {
		builder.WriteString(", maxAttemps=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.BackOffRate; v != nil {
		builder.WriteString(", backOffRate=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.TimerBehavior; v != nil {
		builder.WriteString(", timer_behavior=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.Seconds; v != nil {
		builder.WriteString(", seconds=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.EnableTimerExpression; v != nil {
		builder.WriteString(", enable_timer_expression=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.TimerExpression; v != nil {
		builder.WriteString(", timer_expression=")
		builder.WriteString(*v)
	}
	if v := b.TimerSpecificDate; v != nil {
		builder.WriteString(", timer_specific_date=")
		builder.WriteString(v.Format(time.ANSIC))
	}
	if v := b.URLMethod; v != nil {
		builder.WriteString(", url_method=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.URL; v != nil {
		builder.WriteString(", url=")
		builder.WriteString(*v)
	}
	if v := b.ConnectionTimeout; v != nil {
		builder.WriteString(", connection_timeout=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	if v := b.Body; v != nil {
		builder.WriteString(", body=")
		builder.WriteString(*v)
	}
	builder.WriteString(", headers=")
	builder.WriteString(fmt.Sprintf("%v", b.Headers))
	builder.WriteString(", signal_type=")
	builder.WriteString(fmt.Sprintf("%v", b.SignalType))
	builder.WriteString(", signal_module=")
	builder.WriteString(fmt.Sprintf("%v", b.SignalModule))
	builder.WriteString(", custom_filter=")
	builder.WriteString(b.CustomFilter)
	builder.WriteString(", block_flow=")
	builder.WriteString(fmt.Sprintf("%v", b.BlockFlow))
	builder.WriteString(", kafka_brokers=")
	builder.WriteString(fmt.Sprintf("%v", b.KafkaBrokers))
	builder.WriteString(", kafka_topic=")
	builder.WriteString(b.KafkaTopic)
	builder.WriteString(", kafka_message=")
	builder.WriteString(b.KafkaMessage)
	builder.WriteString(", kafka_message_type=")
	builder.WriteString(fmt.Sprintf("%v", b.KafkaMessageType))
	if v := b.ForeachKey; v != nil {
		builder.WriteString(", foreach_key=")
		builder.WriteString(*v)
	}
	if v := b.ForeachStartBlockID; v != nil {
		builder.WriteString(", foreach_start_blockID=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteByte(')')
	return builder.String()
}

// Blocks is a parsable slice of Block.
type Blocks []*Block

func (b Blocks) config(cfg config) {
	for _i := range b {
		b[_i].config = cfg
	}
}
