// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package flowinstance

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the flowinstance type in the database.
	Label = "flow_instance"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldStartParams holds the string denoting the start_params field in the database.
	FieldStartParams = "start_params"
	// FieldOutputParams holds the string denoting the output_params field in the database.
	FieldOutputParams = "output_params"
	// FieldIncompletionReason holds the string denoting the incompletion_reason field in the database.
	FieldIncompletionReason = "incompletion_reason"
	// FieldBssCode holds the string denoting the bss_code field in the database.
	FieldBssCode = "bss_code"
	// FieldServiceInstanceCode holds the string denoting the service_instance_code field in the database.
	FieldServiceInstanceCode = "service_instance_code"
	// FieldStartDate holds the string denoting the start_date field in the database.
	FieldStartDate = "start_date"
	// FieldEndDate holds the string denoting the end_date field in the database.
	FieldEndDate = "end_date"

	// EdgeFlow holds the string denoting the flow edge name in mutations.
	EdgeFlow = "flow"
	// EdgeTemplate holds the string denoting the template edge name in mutations.
	EdgeTemplate = "template"
	// EdgeBlocks holds the string denoting the blocks edge name in mutations.
	EdgeBlocks = "blocks"
	// EdgeParentSubflowBlock holds the string denoting the parent_subflow_block edge name in mutations.
	EdgeParentSubflowBlock = "parent_subflow_block"
	// EdgeFlowActivities holds the string denoting the flow_activities edge name in mutations.
	EdgeFlowActivities = "flow_activities"

	// Table holds the table name of the flowinstance in the database.
	Table = "flow_instances"
	// FlowTable is the table the holds the flow relation/edge.
	FlowTable = "flow_instances"
	// FlowInverseTable is the table name for the Flow entity.
	// It exists in this package in order to avoid circular dependency with the "flow" package.
	FlowInverseTable = "flows"
	// FlowColumn is the table column denoting the flow relation/edge.
	FlowColumn = "flow_instance_flow"
	// TemplateTable is the table the holds the template relation/edge.
	TemplateTable = "flow_instances"
	// TemplateInverseTable is the table name for the FlowExecutionTemplate entity.
	// It exists in this package in order to avoid circular dependency with the "flowexecutiontemplate" package.
	TemplateInverseTable = "flow_execution_templates"
	// TemplateColumn is the table column denoting the template relation/edge.
	TemplateColumn = "flow_instance_template"
	// BlocksTable is the table the holds the blocks relation/edge.
	BlocksTable = "block_instances"
	// BlocksInverseTable is the table name for the BlockInstance entity.
	// It exists in this package in order to avoid circular dependency with the "blockinstance" package.
	BlocksInverseTable = "block_instances"
	// BlocksColumn is the table column denoting the blocks relation/edge.
	BlocksColumn = "flow_instance_blocks"
	// ParentSubflowBlockTable is the table the holds the parent_subflow_block relation/edge.
	ParentSubflowBlockTable = "flow_instances"
	// ParentSubflowBlockInverseTable is the table name for the BlockInstance entity.
	// It exists in this package in order to avoid circular dependency with the "blockinstance" package.
	ParentSubflowBlockInverseTable = "block_instances"
	// ParentSubflowBlockColumn is the table column denoting the parent_subflow_block relation/edge.
	ParentSubflowBlockColumn = "block_instance_subflow_instance"
	// FlowActivitiesTable is the table the holds the flow_activities relation/edge.
	FlowActivitiesTable = "automation_activities"
	// FlowActivitiesInverseTable is the table name for the AutomationActivity entity.
	// It exists in this package in order to avoid circular dependency with the "automationactivity" package.
	FlowActivitiesInverseTable = "automation_activities"
	// FlowActivitiesColumn is the table column denoting the flow_activities relation/edge.
	FlowActivitiesColumn = "flow_instance_flow_activities"
)

// Columns holds all SQL columns for flowinstance fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldStatus,
	FieldStartParams,
	FieldOutputParams,
	FieldIncompletionReason,
	FieldBssCode,
	FieldServiceInstanceCode,
	FieldStartDate,
	FieldEndDate,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the FlowInstance type.
var ForeignKeys = []string{
	"block_instance_subflow_instance",
	"flow_instance_flow",
	"flow_instance_template",
}

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
	Hooks  [3]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
)

// Status defines the type for the status enum field.
type Status string

// StatusInProgress is the default Status.
const DefaultStatus = StatusInProgress

// Status values.
const (
	StatusInProgress Status = "IN_PROGRESS"
	StatusFailed     Status = "FAILED"
	StatusCompleted  Status = "COMPLETED"
	StatusCancelled  Status = "CANCELED"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusInProgress, StatusFailed, StatusCompleted, StatusCancelled:
		return nil
	default:
		return fmt.Errorf("flowinstance: invalid enum value for status field: %q", s)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Status) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Status) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*s = Status(str)
	if err := StatusValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}
