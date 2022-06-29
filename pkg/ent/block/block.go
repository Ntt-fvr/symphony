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
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
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
	// FieldCid holds the string denoting the cid field in the database.
	FieldCid = "cid"
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
	// FieldEnableInputTransformation holds the string denoting the enable_input_transformation field in the database.
	FieldEnableInputTransformation = "enable_input_transformation"
	// FieldInputTransfStrategy holds the string denoting the input_transf_strategy field in the database.
	FieldInputTransfStrategy = "input_transf_strategy"
	// FieldInputTransformation holds the string denoting the input_transformation field in the database.
	FieldInputTransformation = "input_transformation"
	// FieldEnableOutputTransformation holds the string denoting the enable_output_transformation field in the database.
	FieldEnableOutputTransformation = "enable_output_transformation"
	// FieldOutputTransfStrategy holds the string denoting the output_transf_strategy field in the database.
	FieldOutputTransfStrategy = "output_transf_strategy"
	// FieldOutputTransformation holds the string denoting the output_transformation field in the database.
	FieldOutputTransformation = "output_transformation"
	// FieldEnableInputStateTransformation holds the string denoting the enable_input_state_transformation field in the database.
	FieldEnableInputStateTransformation = "enable_input_state_transformation"
	// FieldInputStateTransfStrategy holds the string denoting the input_state_transf_strategy field in the database.
	FieldInputStateTransfStrategy = "input_state_transf_strategy"
	// FieldInputStateTransformation holds the string denoting the input_state_transformation field in the database.
	FieldInputStateTransformation = "input_state_transformation"
	// FieldEnableOutputStateTransformation holds the string denoting the enable_output_state_transformation field in the database.
	FieldEnableOutputStateTransformation = "enable_output_state_transformation"
	// FieldOutputStateTransfStrategy holds the string denoting the output_state_transf_strategy field in the database.
	FieldOutputStateTransfStrategy = "output_state_transf_strategy"
	// FieldOutputStateTransformation holds the string denoting the output_state_transformation field in the database.
	FieldOutputStateTransformation = "output_state_transformation"
	// FieldEnableErrorHandling holds the string denoting the enable_error_handling field in the database.
	FieldEnableErrorHandling = "enable_error_handling"
	// FieldEnableRetryPolicy holds the string denoting the enable_retry_policy field in the database.
	FieldEnableRetryPolicy = "enable_retry_policy"
	// FieldRetryInterval holds the string denoting the retryinterval field in the database.
	FieldRetryInterval = "retry_interval"
	// FieldRetryUnit holds the string denoting the retry_unit field in the database.
	FieldRetryUnit = "retry_unit"
	// FieldMaxAttemps holds the string denoting the maxattemps field in the database.
	FieldMaxAttemps = "max_attemps"
	// FieldBackOffRate holds the string denoting the backoffrate field in the database.
	FieldBackOffRate = "back_off_rate"
	// FieldTimerBehavior holds the string denoting the timer_behavior field in the database.
	FieldTimerBehavior = "timer_behavior"
	// FieldSeconds holds the string denoting the seconds field in the database.
	FieldSeconds = "seconds"
	// FieldEnableTimerExpression holds the string denoting the enable_timer_expression field in the database.
	FieldEnableTimerExpression = "enable_timer_expression"
	// FieldTimerExpression holds the string denoting the timer_expression field in the database.
	FieldTimerExpression = "timer_expression"
	// FieldTimerSpecificDate holds the string denoting the timer_specific_date field in the database.
	FieldTimerSpecificDate = "timer_specific_date"
	// FieldURLMethod holds the string denoting the url_method field in the database.
	FieldURLMethod = "url_method"
	// FieldURL holds the string denoting the url field in the database.
	FieldURL = "url"
	// FieldConnectionTimeout holds the string denoting the connection_timeout field in the database.
	FieldConnectionTimeout = "connection_timeout"
	// FieldBody holds the string denoting the body field in the database.
	FieldBody = "body"
	// FieldHeaders holds the string denoting the headers field in the database.
	FieldHeaders = "headers"
	// FieldSignalType holds the string denoting the signal_type field in the database.
	FieldSignalType = "signal_type"
	// FieldSignalModule holds the string denoting the signal_module field in the database.
	FieldSignalModule = "signal_module"
	// FieldCustomFilter holds the string denoting the custom_filter field in the database.
	FieldCustomFilter = "custom_filter"
	// FieldBlockFlow holds the string denoting the block_flow field in the database.
	FieldBlockFlow = "block_flow"

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
	// EdgeEntryPoint holds the string denoting the entry_point edge name in mutations.
	EdgeEntryPoint = "entry_point"
	// EdgeExitPoints holds the string denoting the exit_points edge name in mutations.
	EdgeExitPoints = "exit_points"

	// Table holds the table name of the block in the database.
	Table = "blocks"
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
	// EntryPointTable is the table the holds the entry_point relation/edge.
	EntryPointTable = "entry_points"
	// EntryPointInverseTable is the table name for the EntryPoint entity.
	// It exists in this package in order to avoid circular dependency with the "entrypoint" package.
	EntryPointInverseTable = "entry_points"
	// EntryPointColumn is the table column denoting the entry_point relation/edge.
	EntryPointColumn = "block_entry_point"
	// ExitPointsTable is the table the holds the exit_points relation/edge.
	ExitPointsTable = "exit_points"
	// ExitPointsInverseTable is the table name for the ExitPoint entity.
	// It exists in this package in order to avoid circular dependency with the "exitpoint" package.
	ExitPointsInverseTable = "exit_points"
	// ExitPointsColumn is the table column denoting the exit_points relation/edge.
	ExitPointsColumn = "block_exit_points"
)

// Columns holds all SQL columns for block fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldCid,
	FieldType,
	FieldActionType,
	FieldTriggerType,
	FieldStartParamDefinitions,
	FieldInputParams,
	FieldUIRepresentation,
	FieldEnableInputTransformation,
	FieldInputTransfStrategy,
	FieldInputTransformation,
	FieldEnableOutputTransformation,
	FieldOutputTransfStrategy,
	FieldOutputTransformation,
	FieldEnableInputStateTransformation,
	FieldInputStateTransfStrategy,
	FieldInputStateTransformation,
	FieldEnableOutputStateTransformation,
	FieldOutputStateTransfStrategy,
	FieldOutputStateTransformation,
	FieldEnableErrorHandling,
	FieldEnableRetryPolicy,
	FieldRetryInterval,
	FieldRetryUnit,
	FieldMaxAttemps,
	FieldBackOffRate,
	FieldTimerBehavior,
	FieldSeconds,
	FieldEnableTimerExpression,
	FieldTimerExpression,
	FieldTimerSpecificDate,
	FieldURLMethod,
	FieldURL,
	FieldConnectionTimeout,
	FieldBody,
	FieldHeaders,
	FieldSignalType,
	FieldSignalModule,
	FieldCustomFilter,
	FieldBlockFlow,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Block type.
var ForeignKeys = []string{
	"block_sub_flow",
	"block_goto_block",
	"flow_blocks",
	"flow_draft_blocks",
	"flow_execution_template_blocks",
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
	Hooks  [5]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
	// CidValidator is a validator for the "cid" field. It is called by the builders before save.
	CidValidator func(string) error
)

// Type defines the type for the type enum field.
type Type string

// Type values.
const (
	TypeStart         Type = "START"
	TypeEnd           Type = "END"
	TypeDecision      Type = "DECISION"
	TypeSubFlow       Type = "SUB_FLOW"
	TypeGoTo          Type = "GO_TO"
	TypeTrigger       Type = "TRIGGER"
	TypeAction        Type = "ACTION"
	TypeTrueFalse     Type = "TRUE_FALSE"
	TypeChoice        Type = "CHOICE"
	TypeExecuteFlow   Type = "EXECUTE_FLOW"
	TypeNetworkAction Type = "NETWORK_ACTION"
	TypeTimer         Type = "TIMER"
	TypeInvokeRestAPI Type = "INVOKE_REST_API"
	TypeForEach       Type = "FOREACH"
	TypeParallel      Type = "PARALLEL"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeStart, TypeEnd, TypeDecision, TypeSubFlow, TypeGoTo, TypeTrigger, TypeAction, TypeTrueFalse, TypeChoice, TypeExecuteFlow, TypeNetworkAction, TypeTimer, TypeInvokeRestAPI, TypeForEach, TypeParallel:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for type field: %q", _type)
	}
}

// ActionTypeValidator is a validator for the "action_type" field enum values. It is called by the builders before save.
func ActionTypeValidator(at flowschema.ActionTypeID) error {
	switch at {
	case "work_order", "update_inventory", "update_workforce", "worker":
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

// InputTransfStrategyValidator is a validator for the "input_transf_strategy" field enum values. It is called by the builders before save.
func InputTransfStrategyValidator(its enum.TransfStrategy) error {
	switch its {
	case "replace", "merge":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for input_transf_strategy field: %q", its)
	}
}

// OutputTransfStrategyValidator is a validator for the "output_transf_strategy" field enum values. It is called by the builders before save.
func OutputTransfStrategyValidator(ots enum.TransfStrategy) error {
	switch ots {
	case "replace", "merge":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for output_transf_strategy field: %q", ots)
	}
}

// InputStateTransfStrategyValidator is a validator for the "input_state_transf_strategy" field enum values. It is called by the builders before save.
func InputStateTransfStrategyValidator(ists enum.TransfStrategy) error {
	switch ists {
	case "replace", "merge":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for input_state_transf_strategy field: %q", ists)
	}
}

// OutputStateTransfStrategyValidator is a validator for the "output_state_transf_strategy" field enum values. It is called by the builders before save.
func OutputStateTransfStrategyValidator(osts enum.TransfStrategy) error {
	switch osts {
	case "replace", "merge":
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for output_state_transf_strategy field: %q", osts)
	}
}

// RetryUnit defines the type for the retry_unit enum field.
type RetryUnit string

// RetryUnit values.
const (
	RetryUnitSECONDS RetryUnit = "seconds"
	RetryUnitMINUTES RetryUnit = "minutes"
	RetryUnitHOURS   RetryUnit = "hours"
)

func (ru RetryUnit) String() string {
	return string(ru)
}

// RetryUnitValidator is a validator for the "retry_unit" field enum values. It is called by the builders before save.
func RetryUnitValidator(ru RetryUnit) error {
	switch ru {
	case RetryUnitSECONDS, RetryUnitMINUTES, RetryUnitHOURS:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for retry_unit field: %q", ru)
	}
}

// TimerBehavior defines the type for the timer_behavior enum field.
type TimerBehavior string

// TimerBehavior values.
const (
	TimerBehaviorFIXED_INTERVAL    TimerBehavior = "fixed_interval"
	TimerBehaviorSPECIFIC_DATETIME TimerBehavior = "specific_time"
)

func (tb TimerBehavior) String() string {
	return string(tb)
}

// TimerBehaviorValidator is a validator for the "timer_behavior" field enum values. It is called by the builders before save.
func TimerBehaviorValidator(tb TimerBehavior) error {
	switch tb {
	case TimerBehaviorFIXED_INTERVAL, TimerBehaviorSPECIFIC_DATETIME:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for timer_behavior field: %q", tb)
	}
}

// URLMethod defines the type for the url_method enum field.
type URLMethod string

// URLMethod values.
const (
	URLMethodPOST   URLMethod = "post"
	URLMethodGET    URLMethod = "get"
	URLMethodPUT    URLMethod = "put"
	URLMethodDELETE URLMethod = "delete"
	URLMethodPATCH  URLMethod = "patch"
)

func (um URLMethod) String() string {
	return string(um)
}

// URLMethodValidator is a validator for the "url_method" field enum values. It is called by the builders before save.
func URLMethodValidator(um URLMethod) error {
	switch um {
	case URLMethodPOST, URLMethodGET, URLMethodPUT, URLMethodDELETE, URLMethodPATCH:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for url_method field: %q", um)
	}
}

// SignalType defines the type for the signal_type enum field.
type SignalType string

// SignalType values.
const (
	SignalTypeNOTIFICATION SignalType = "notification"
	SignalTypeWOCREATION   SignalType = "wo_creation"
	SignalTypeCRCREATION   SignalType = "cr_creation"
	SignalTypeWOUPDATE     SignalType = "wo_update"
	SignalTypeCRUPDATE     SignalType = "cr_update"
)

func (st SignalType) String() string {
	return string(st)
}

// SignalTypeValidator is a validator for the "signal_type" field enum values. It is called by the builders before save.
func SignalTypeValidator(st SignalType) error {
	switch st {
	case SignalTypeNOTIFICATION, SignalTypeWOCREATION, SignalTypeCRCREATION, SignalTypeWOUPDATE, SignalTypeCRUPDATE:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for signal_type field: %q", st)
	}
}

// SignalModule defines the type for the signal_module enum field.
type SignalModule string

// SignalModule values.
const (
	SignalModuleINVENTORY SignalModule = "inventory"
	SignalModuleCM        SignalModule = "cm"
)

func (sm SignalModule) String() string {
	return string(sm)
}

// SignalModuleValidator is a validator for the "signal_module" field enum values. It is called by the builders before save.
func SignalModuleValidator(sm SignalModule) error {
	switch sm {
	case SignalModuleINVENTORY, SignalModuleCM:
		return nil
	default:
		return fmt.Errorf("block: invalid enum value for signal_module field: %q", sm)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_type Type) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_type.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_type *Type) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
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

var (
	// enum.TransfStrategy must implement graphql.Marshaler.
	_ graphql.Marshaler = enum.TransfStrategy("")
	// enum.TransfStrategy must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*enum.TransfStrategy)(nil)
)

var (
	// enum.TransfStrategy must implement graphql.Marshaler.
	_ graphql.Marshaler = enum.TransfStrategy("")
	// enum.TransfStrategy must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*enum.TransfStrategy)(nil)
)

var (
	// enum.TransfStrategy must implement graphql.Marshaler.
	_ graphql.Marshaler = enum.TransfStrategy("")
	// enum.TransfStrategy must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*enum.TransfStrategy)(nil)
)

var (
	// enum.TransfStrategy must implement graphql.Marshaler.
	_ graphql.Marshaler = enum.TransfStrategy("")
	// enum.TransfStrategy must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*enum.TransfStrategy)(nil)
)

// MarshalGQL implements graphql.Marshaler interface.
func (ru RetryUnit) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(ru.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (ru *RetryUnit) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*ru = RetryUnit(str)
	if err := RetryUnitValidator(*ru); err != nil {
		return fmt.Errorf("%s is not a valid RetryUnit", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (tb TimerBehavior) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(tb.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (tb *TimerBehavior) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*tb = TimerBehavior(str)
	if err := TimerBehaviorValidator(*tb); err != nil {
		return fmt.Errorf("%s is not a valid TimerBehavior", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (um URLMethod) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(um.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (um *URLMethod) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*um = URLMethod(str)
	if err := URLMethodValidator(*um); err != nil {
		return fmt.Errorf("%s is not a valid URLMethod", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (st SignalType) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(st.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (st *SignalType) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*st = SignalType(str)
	if err := SignalTypeValidator(*st); err != nil {
		return fmt.Errorf("%s is not a valid SignalType", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (sm SignalModule) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(sm.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (sm *SignalModule) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*sm = SignalModule(str)
	if err := SignalModuleValidator(*sm); err != nil {
		return fmt.Errorf("%s is not a valid SignalModule", str)
	}
	return nil
}
