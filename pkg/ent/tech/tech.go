// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package tech

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the tech type in the database.
	Label = "tech"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"

	// EdgeDomain holds the string denoting the domain edge name in mutations.
	EdgeDomain = "domain"
	// EdgeFormulatech holds the string denoting the formulatech edge name in mutations.
	EdgeFormulatech = "formulatech"

	// Table holds the table name of the tech in the database.
	Table = "teches"
	// DomainTable is the table the holds the domain relation/edge.
	DomainTable = "teches"
	// DomainInverseTable is the table name for the Domain entity.
	// It exists in this package in order to avoid circular dependency with the "domain" package.
	DomainInverseTable = "domains"
	// DomainColumn is the table column denoting the domain relation/edge.
	DomainColumn = "domain_techdomain"
	// FormulatechTable is the table the holds the formulatech relation/edge.
	FormulatechTable = "formulas"
	// FormulatechInverseTable is the table name for the Formula entity.
	// It exists in this package in order to avoid circular dependency with the "formula" package.
	FormulatechInverseTable = "formulas"
	// FormulatechColumn is the table column denoting the formulatech relation/edge.
	FormulatechColumn = "tech_formulatech"
)

// Columns holds all SQL columns for tech fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Tech type.
var ForeignKeys = []string{
	"domain_techdomain",
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
