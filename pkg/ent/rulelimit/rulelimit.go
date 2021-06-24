// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package rulelimit

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the rulelimit type in the database.
	Label = "rule_limit"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldLimitType holds the string denoting the limittype field in the database.
	FieldLimitType = "limit_type"

	// EdgeComparator holds the string denoting the comparator edge name in mutations.
	EdgeComparator = "comparator"
	// EdgeRule holds the string denoting the rule edge name in mutations.
	EdgeRule = "rule"

	// Table holds the table name of the rulelimit in the database.
	Table = "rule_limits"
	// ComparatorTable is the table the holds the comparator relation/edge.
	ComparatorTable = "rule_limits"
	// ComparatorInverseTable is the table name for the Comparator entity.
	// It exists in this package in order to avoid circular dependency with the "comparator" package.
	ComparatorInverseTable = "comparators"
	// ComparatorColumn is the table column denoting the comparator relation/edge.
	ComparatorColumn = "comparator_comparatorrulelimit"
	// RuleTable is the table the holds the rule relation/edge.
	RuleTable = "rule_limits"
	// RuleInverseTable is the table name for the Rule entity.
	// It exists in this package in order to avoid circular dependency with the "rule" package.
	RuleInverseTable = "rules"
	// RuleColumn is the table column denoting the rule relation/edge.
	RuleColumn = "rule_rulelimitrule"
)

// Columns holds all SQL columns for rulelimit fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldLimitType,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the RuleLimit type.
var ForeignKeys = []string{
	"comparator_comparatorrulelimit",
	"rule_rulelimitrule",
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
	// NameValidator is a validator for the "name" field. It is called by the builders before save.
	NameValidator func(string) error
	// LimitTypeValidator is a validator for the "limitType" field. It is called by the builders before save.
	LimitTypeValidator func(string) error
)
