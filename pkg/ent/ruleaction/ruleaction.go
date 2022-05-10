// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ruleaction

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the ruleaction type in the database.
	Label = "rule_action"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldOperation holds the string denoting the operation field in the database.
	FieldOperation = "operation"

	// EdgeReconciliationrule holds the string denoting the reconciliationrule edge name in mutations.
	EdgeReconciliationrule = "reconciliationrule"
	// EdgeRuleactiontemplate holds the string denoting the ruleactiontemplate edge name in mutations.
	EdgeRuleactiontemplate = "ruleactiontemplate"
	// EdgeRuleAction holds the string denoting the rule_action edge name in mutations.
	EdgeRuleAction = "rule_action"

	// Table holds the table name of the ruleaction in the database.
	Table = "rule_actions"
	// ReconciliationruleTable is the table the holds the reconciliationrule relation/edge.
	ReconciliationruleTable = "rule_actions"
	// ReconciliationruleInverseTable is the table name for the ReconciliationRule entity.
	// It exists in this package in order to avoid circular dependency with the "reconciliationrule" package.
	ReconciliationruleInverseTable = "reconciliation_rules"
	// ReconciliationruleColumn is the table column denoting the reconciliationrule relation/edge.
	ReconciliationruleColumn = "reconciliation_rule_reconciliation_rule_rule_action"
	// RuleactiontemplateTable is the table the holds the ruleactiontemplate relation/edge.
	RuleactiontemplateTable = "rule_actions"
	// RuleactiontemplateInverseTable is the table name for the RuleActionTemplate entity.
	// It exists in this package in order to avoid circular dependency with the "ruleactiontemplate" package.
	RuleactiontemplateInverseTable = "rule_action_templates"
	// RuleactiontemplateColumn is the table column denoting the ruleactiontemplate relation/edge.
	RuleactiontemplateColumn = "rule_action_template_rule_action_template_rule_action"
	// RuleActionTable is the table the holds the rule_action relation/edge.
	RuleActionTable = "actions"
	// RuleActionInverseTable is the table name for the Action entity.
	// It exists in this package in order to avoid circular dependency with the "action" package.
	RuleActionInverseTable = "actions"
	// RuleActionColumn is the table column denoting the rule_action relation/edge.
	RuleActionColumn = "rule_action_rule_action"
)

// Columns holds all SQL columns for ruleaction fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldOperation,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the RuleAction type.
var ForeignKeys = []string{
	"reconciliation_rule_reconciliation_rule_rule_action",
	"rule_action_template_rule_action_template_rule_action",
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
	Hooks  [1]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
)

// Operation defines the type for the operation enum field.
type Operation string

// Operation values.
const (
	OperationNOAPLICA   Operation = "NOAPLICA"
	OperationMANUAL     Operation = "MANUAL"
	OperationAUTOMATICO Operation = "AUTOMATICO"
)

func (o Operation) String() string {
	return string(o)
}

// OperationValidator is a validator for the "operation" field enum values. It is called by the builders before save.
func OperationValidator(o Operation) error {
	switch o {
	case OperationNOAPLICA, OperationMANUAL, OperationAUTOMATICO:
		return nil
	default:
		return fmt.Errorf("ruleaction: invalid enum value for operation field: %q", o)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (o Operation) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(o.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (o *Operation) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*o = Operation(str)
	if err := OperationValidator(*o); err != nil {
		return fmt.Errorf("%s is not a valid Operation", str)
	}
	return nil
}
