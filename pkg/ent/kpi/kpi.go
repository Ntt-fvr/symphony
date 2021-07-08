// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package kpi

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the kpi type in the database.
	Label = "kpi"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"

	// EdgeDomain holds the string denoting the domain edge name in mutations.
	EdgeDomain = "domain"
	// EdgeFormulakpi holds the string denoting the formulakpi edge name in mutations.
	EdgeFormulakpi = "formulakpi"
	// EdgeTresholdkpi holds the string denoting the tresholdkpi edge name in mutations.
	EdgeTresholdkpi = "tresholdkpi"

	// Table holds the table name of the kpi in the database.
	Table = "kpis"
	// DomainTable is the table the holds the domain relation/edge.
	DomainTable = "kpis"
	// DomainInverseTable is the table name for the Domain entity.
	// It exists in this package in order to avoid circular dependency with the "domain" package.
	DomainInverseTable = "domains"
	// DomainColumn is the table column denoting the domain relation/edge.
	DomainColumn = "domain_kpidomain"
	// FormulakpiTable is the table the holds the formulakpi relation/edge.
	FormulakpiTable = "formulas"
	// FormulakpiInverseTable is the table name for the Formula entity.
	// It exists in this package in order to avoid circular dependency with the "formula" package.
	FormulakpiInverseTable = "formulas"
	// FormulakpiColumn is the table column denoting the formulakpi relation/edge.
	FormulakpiColumn = "kpi_formulakpi"
	// TresholdkpiTable is the table the holds the tresholdkpi relation/edge.
	TresholdkpiTable = "tresholds"
	// TresholdkpiInverseTable is the table name for the Treshold entity.
	// It exists in this package in order to avoid circular dependency with the "treshold" package.
	TresholdkpiInverseTable = "tresholds"
	// TresholdkpiColumn is the table column denoting the tresholdkpi relation/edge.
	TresholdkpiColumn = "kpi_tresholdkpi"
)

// Columns holds all SQL columns for kpi fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldStatus,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Kpi type.
var ForeignKeys = []string{
	"domain_kpidomain",
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
)
