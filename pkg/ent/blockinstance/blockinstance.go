// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package blockinstance

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the blockinstance type in the database.
	Label = "block_instance"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldInputs holds the string denoting the inputs field in the database.
	FieldInputs = "inputs"
	// FieldOutputs holds the string denoting the outputs field in the database.
	FieldOutputs = "outputs"
	// FieldFailureReason holds the string denoting the failure_reason field in the database.
	FieldFailureReason = "failure_reason"
	// FieldBlockInstanceCounter holds the string denoting the block_instance_counter field in the database.
	FieldBlockInstanceCounter = "block_instance_counter"

	// EdgeFlowInstance holds the string denoting the flow_instance edge name in mutations.
	EdgeFlowInstance = "flow_instance"
	// EdgeBlock holds the string denoting the block edge name in mutations.
	EdgeBlock = "block"
	// EdgeSubflowInstance holds the string denoting the subflow_instance edge name in mutations.
	EdgeSubflowInstance = "subflow_instance"

	// Table holds the table name of the blockinstance in the database.
	Table = "block_instances"
	// FlowInstanceTable is the table the holds the flow_instance relation/edge.
	FlowInstanceTable = "block_instances"
	// FlowInstanceInverseTable is the table name for the FlowInstance entity.
	// It exists in this package in order to avoid circular dependency with the "flowinstance" package.
	FlowInstanceInverseTable = "flow_instances"
	// FlowInstanceColumn is the table column denoting the flow_instance relation/edge.
	FlowInstanceColumn = "flow_instance_blocks"
	// BlockTable is the table the holds the block relation/edge.
	BlockTable = "block_instances"
	// BlockInverseTable is the table name for the Block entity.
	// It exists in this package in order to avoid circular dependency with the "block" package.
	BlockInverseTable = "blocks"
	// BlockColumn is the table column denoting the block relation/edge.
	BlockColumn = "block_instance_block"
	// SubflowInstanceTable is the table the holds the subflow_instance relation/edge.
	SubflowInstanceTable = "flow_instances"
	// SubflowInstanceInverseTable is the table name for the FlowInstance entity.
	// It exists in this package in order to avoid circular dependency with the "flowinstance" package.
	SubflowInstanceInverseTable = "flow_instances"
	// SubflowInstanceColumn is the table column denoting the subflow_instance relation/edge.
	SubflowInstanceColumn = "block_instance_subflow_instance"
)

// Columns holds all SQL columns for blockinstance fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldStatus,
	FieldInputs,
	FieldOutputs,
	FieldFailureReason,
	FieldBlockInstanceCounter,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the BlockInstance type.
var ForeignKeys = []string{
	"block_instance_block",
	"flow_instance_blocks",
}

// Note that the variables below are initialized by the runtime
// package on the initialization of the application. Therefore,
// it should be imported in the main as follows:
//
//	import _ "github.com/facebookincubator/symphony/pkg/ent/runtime"
//
var (
	Hooks  [1]ent.Hook
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

// StatusPending is the default Status.
const DefaultStatus = StatusPending

// Status values.
const (
	StatusPending    Status = "PENDING"
	StatusInProgress Status = "IN_PROGRESS"
	StatusFailed     Status = "FAILED"
	StatusCompleted  Status = "COMPLETED"
	StatusWaiting    Status = "WAITING"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusPending, StatusInProgress, StatusFailed, StatusCompleted, StatusWaiting:
		return nil
	default:
		return fmt.Errorf("blockinstance: invalid enum value for status field: %q", s)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Status) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Status) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", v)
	}
	*s = Status(str)
	if err := StatusValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}
