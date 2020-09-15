// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package block

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebook/ent"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

const (
	// Label holds the string label denoting the block type in the database.
	Label = "block"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldActionType holds the string denoting the action_type field in the database.
	FieldActionType = "action_type"
	// FieldTriggerType holds the string denoting the trigger_type field in the database.
	FieldTriggerType = "trigger_type"
	// FieldStartParamDefinitions holds the string denoting the start_param_definitions field in the database.
	FieldStartParamDefinitions = "start_param_definitions"
	// FieldInputParams holds the string denoting the input_params field in the database.
	FieldInputParams = "input_params"
	// FieldUIRepresentation holds the string denoting the ui_representation field in the database.
	FieldUIRepresentation = "ui_representation"

	// EdgePrevBlocks holds the string denoting the prev_blocks edge name in mutations.
	EdgePrevBlocks = "prev_blocks"
	// EdgeNextBlocks holds the string denoting the next_blocks edge name in mutations.
	EdgeNextBlocks = "next_blocks"
	// EdgeFlow holds the string denoting the flow edge name in mutations.
	EdgeFlow = "flow"
	// EdgeFlowTemplate holds the string denoting the flow_template edge name in mutations.
	EdgeFlowTemplate = "flow_template"
	// EdgeFlowDraft holds the string denoting the flow_draft edge name in mutations.
	EdgeFlowDraft = "flow_draft"
	// EdgeSubFlow holds the string denoting the sub_flow edge name in mutations.
	EdgeSubFlow = "sub_flow"
	// EdgeSourceBlock holds the string denoting the source_block edge name in mutations.
	EdgeSourceBlock = "source_block"
	// EdgeGotoBlock holds the string denoting the goto_block edge name in mutations.
	EdgeGotoBlock = "goto_block"
	// EdgeInstances holds the string denoting the instances edge name in mutations.
	EdgeInstances = "instances"

	// Table holds the table name of the block in the database.
	Table = "blocks"
	// PrevBlocksTable is the table the holds the prev_blocks relation/edge. The primary key declared below.
	PrevBlocksTable = "block_next_blocks"
	// NextBlocksTable is the table the holds the next_blocks relation/edge. The primary key declared below.
	NextBlocksTable = "block_next_blocks"
	// FlowTable is the table the holds the flow relation/edge.
	FlowTable = "blocks"
	// FlowInverseTable is the table name for the Flow entity.
	// It exists in this package in order to avoid circular dependency with the "flow" package.
	FlowInverseTable = "flows"
	// FlowColumn is the table column denoting the flow relation/edge.
	FlowColumn = "flow_blocks"
	// FlowTemplateTable is the table the holds the flow_template relation/edge.
	FlowTemplateTable = "blocks"
	// FlowTemplateInverseTable is the table name for the FlowExecutionTemplate entity.
	// It exists in this package in order to avoid circular dependency with the "flowexecutiontemplate" package.
	FlowTemplateInverseTable = "flow_execution_templates"
	// FlowTemplateColumn is the table column denoting the flow_template relation/edge.
	FlowTemplateColumn = "flow_execution_template_blocks"
	// FlowDraftTable is the table the holds the flow_draft relation/edge.
	FlowDraftTable = "blocks"
	// FlowDraftInverseTable is the table name for the FlowDraft entity.
	// It exists in this package in order to avoid circular dependency with the "flowdraft" package.
	FlowDraftInverseTable = "flow_drafts"
	// FlowDraftColumn is the table column denoting the flow_draft relation/edge.
	FlowDraftColumn = "flow_draft_blocks"
	// SubFlowTable is the table the holds the sub_flow relation/edge.
	SubFlowTable = "blocks"
	// SubFlowInverseTable is the table name for the Flow entity.
	// It exists in this package in order to avoid circular dependency with the "flow" package.
	SubFlowInverseTable = "flows"
	// SubFlowColumn is the table column denoting the sub_flow relation/edge.
	SubFlowColumn = "block_sub_flow"
	// SourceBlockTable is the table the holds the source_block relation/edge.
	SourceBlockTable = "blocks"
	// SourceBlockColumn is the table column denoting the source_block relation/edge.
	SourceBlockColumn = "block_goto_block"
	// GotoBlockTable is the table the holds the goto_block relation/edge.
	GotoBlockTable = "blocks"
	// GotoBlockColumn is the table column denoting the goto_block relation/edge.
	GotoBlockColumn = "block_goto_block"
	// InstancesTable is the table the holds the instances relation/edge.
	InstancesTable = "block_instances"
	// InstancesInverseTable is the table name for the BlockInstance entity.
	// It exists in this package in order to avoid circular dependency with the "blockinstance" package.
	InstancesInverseTable = "block_instances"
	// InstancesColumn is the table column denoting the instances relation/edge.
	InstancesColumn = "block_instance_block"
)

// Columns holds all SQL columns for block fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldType,
	FieldActionType,
	FieldTriggerType,
	FieldStartParamDefinitions,
	FieldInputParams,
	FieldUIRepresentation,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Block type.
var ForeignKeys = []string{
	"block_sub_flow",
	"block_goto_block",
	"flow_blocks",
	"flow_draft_blocks",
	"flow_execution_template_blocks",
}

var (
	// PrevBlocksPrimaryKey and PrevBlocksColumn2 are the table columns denoting the
	// primary key for the prev_blocks relation (M2M).
	PrevBlocksPrimaryKey = []string{"block_id", "prev_block_id"}
	// NextBlocksPrimaryKey and NextBlocksColumn2 are the table columns denoting the
	// primary key for the next_blocks relation (M2M).
	NextBlocksPrimaryKey = []string{"block_id", "prev_block_id"}
)

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	for i := range ForeignKeys {
		if column == ForeignKeys[i] {
			return true
		}
	}
	return false
}

// Note that the variables below are initialized by the runtime
// package on the initialization of the application. Therefore,
// it should be imported in the main as follows:
//
//	import _ "github.com/facebookincubator/symphony/pkg/ent/runtime"
//
var (
	Hooks  [2]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
	// NameValidator is a validator for the "name" field. It is called by the builders before save.
	NameValidator func(string) error
)

// Type defines the type for the type enum field.
type Type string

// Type values.
const (
	TypeStart   Type = "START"
	TypeEnd     Type = "END"
	TypeSubFlow Type = "SUB_FLOW"
	TypeGoTo    Type = "GO_TO"
	TypeTrigger Type = "TRIGGER"
	TypeAction  Type = "ACTION"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeStart, TypeEnd, TypeSubFlow, TypeGoTo, TypeTrigger, TypeAction:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for type field: %q", _type)
	}
}

// ActionTypeValidator is a validator for the "action_type" field enum values. It is called by the builders before save.
func ActionTypeValidator(at flowschema.ActionTypeID) error {
	switch at {
	case "work_order":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for action_type field: %q", at)
	}
}

// TriggerTypeValidator is a validator for the "trigger_type" field enum values. It is called by the builders before save.
func TriggerTypeValidator(tt flowschema.TriggerTypeID) error {
	switch tt {
	case "work_order":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for trigger_type field: %q", tt)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_type Type) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_type.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_type *Type) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", v)
	}
	*_type = Type(str)
	if err := TypeValidator(*_type); err != nil {
		return fmt.Errorf("%s is not a valid Type", str)
	}
	return nil
}

var (
	// flowschema.ActionTypeID must implement graphql.Marshaler.
	_ graphql.Marshaler = flowschema.ActionTypeID("")
	// flowschema.ActionTypeID must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*flowschema.ActionTypeID)(nil)
)

var (
	// flowschema.TriggerTypeID must implement graphql.Marshaler.
	_ graphql.Marshaler = flowschema.TriggerTypeID("")
	// flowschema.TriggerTypeID must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*flowschema.TriggerTypeID)(nil)
)
