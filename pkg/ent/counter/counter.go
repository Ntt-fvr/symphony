// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package counter

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the counter type in the database.
	Label = "counter"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldExternalId holds the string denoting the externalid field in the database.
	FieldExternalId = "external_id"

	// EdgeCounterfamily holds the string denoting the counterfamily edge name in mutations.
	EdgeCounterfamily = "counterfamily"
	// EdgeCounterFk holds the string denoting the counter_fk edge name in mutations.
	EdgeCounterFk = "counter_fk"

	// Table holds the table name of the counter in the database.
	Table = "counters"
	// CounterfamilyTable is the table the holds the counterfamily relation/edge.
	CounterfamilyTable = "counters"
	// CounterfamilyInverseTable is the table name for the CounterFamily entity.
	// It exists in this package in order to avoid circular dependency with the "counterfamily" package.
	CounterfamilyInverseTable = "counter_families"
	// CounterfamilyColumn is the table column denoting the counterfamily relation/edge.
	CounterfamilyColumn = "counter_family_counterfamily"
	// CounterFkTable is the table the holds the counter_fk relation/edge.
	CounterFkTable = "counter_vendor_formulas"
	// CounterFkInverseTable is the table name for the CounterVendorFormula entity.
	// It exists in this package in order to avoid circular dependency with the "countervendorformula" package.
	CounterFkInverseTable = "counter_vendor_formulas"
	// CounterFkColumn is the table column denoting the counter_fk relation/edge.
	CounterFkColumn = "counter_counter_fk"
)

// Columns holds all SQL columns for counter fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldExternalId,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Counter type.
var ForeignKeys = []string{
	"counter_family_counterfamily",
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
