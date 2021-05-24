// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package formula

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the formula type in the database.
	Label = "formula"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldActive holds the string denoting the active field in the database.
	FieldActive = "active"

	// EdgeTech holds the string denoting the tech edge name in mutations.
	EdgeTech = "tech"
	// EdgeKpi holds the string denoting the kpi edge name in mutations.
	EdgeKpi = "kpi"
	// EdgeFormulaFk holds the string denoting the formula_fk edge name in mutations.
	EdgeFormulaFk = "formula_fk"

	// Table holds the table name of the formula in the database.
	Table = "formulas"
	// TechTable is the table the holds the tech relation/edge.
	TechTable = "formulas"
	// TechInverseTable is the table name for the Tech entity.
	// It exists in this package in order to avoid circular dependency with the "tech" package.
	TechInverseTable = "teches"
	// TechColumn is the table column denoting the tech relation/edge.
	TechColumn = "tech_formulatech"
	// KpiTable is the table the holds the kpi relation/edge.
	KpiTable = "formulas"
	// KpiInverseTable is the table name for the Kpi entity.
	// It exists in this package in order to avoid circular dependency with the "kpi" package.
	KpiInverseTable = "kpis"
	// KpiColumn is the table column denoting the kpi relation/edge.
	KpiColumn = "kpi_formulakpi"
	// FormulaFkTable is the table the holds the formula_fk relation/edge.
	FormulaFkTable = "counter_vendor_formulas"
	// FormulaFkInverseTable is the table name for the CounterVendorFormula entity.
	// It exists in this package in order to avoid circular dependency with the "countervendorformula" package.
	FormulaFkInverseTable = "counter_vendor_formulas"
	// FormulaFkColumn is the table column denoting the formula_fk relation/edge.
	FormulaFkColumn = "formula_formula_fk"
)

// Columns holds all SQL columns for formula fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldActive,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Formula type.
var ForeignKeys = []string{
	"kpi_formulakpi",
	"tech_formulatech",
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
