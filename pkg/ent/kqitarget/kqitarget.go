// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package kqitarget

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the kqitarget type in the database.
	Label = "kqi_target"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldPeriod holds the string denoting the period field in the database.
	FieldPeriod = "period"
	// FieldAllowedVariation holds the string denoting the allowedvariation field in the database.
	FieldAllowedVariation = "allowed_variation"
	// FieldInitTime holds the string denoting the inittime field in the database.
	FieldInitTime = "init_time"
	// FieldEndTime holds the string denoting the endtime field in the database.
	FieldEndTime = "end_time"
	// FieldImpact holds the string denoting the impact field in the database.
	FieldImpact = "impact"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"

	// EdgeKqiTargetFk holds the string denoting the kqitargetfk edge name in mutations.
	EdgeKqiTargetFk = "kqiTargetFk"
	// EdgeKqitargetcomparatorfk holds the string denoting the kqitargetcomparatorfk edge name in mutations.
	EdgeKqitargetcomparatorfk = "kqitargetcomparatorfk"

	// Table holds the table name of the kqitarget in the database.
	Table = "kqi_targets"
	// KqiTargetFkTable is the table the holds the kqiTargetFk relation/edge.
	KqiTargetFkTable = "kqi_targets"
	// KqiTargetFkInverseTable is the table name for the Kqi entity.
	// It exists in this package in order to avoid circular dependency with the "kqi" package.
	KqiTargetFkInverseTable = "kqis"
	// KqiTargetFkColumn is the table column denoting the kqiTargetFk relation/edge.
	KqiTargetFkColumn = "kqi_kqi_target_fk"
	// KqitargetcomparatorfkTable is the table the holds the kqitargetcomparatorfk relation/edge.
	KqitargetcomparatorfkTable = "kqi_comparators"
	// KqitargetcomparatorfkInverseTable is the table name for the KqiComparator entity.
	// It exists in this package in order to avoid circular dependency with the "kqicomparator" package.
	KqitargetcomparatorfkInverseTable = "kqi_comparators"
	// KqitargetcomparatorfkColumn is the table column denoting the kqitargetcomparatorfk relation/edge.
	KqitargetcomparatorfkColumn = "kqi_target_kqitargetcomparatorfk"
)

// Columns holds all SQL columns for kqitarget fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldPeriod,
	FieldAllowedVariation,
	FieldInitTime,
	FieldEndTime,
	FieldImpact,
	FieldStatus,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the KqiTarget type.
var ForeignKeys = []string{
	"kqi_kqi_target_fk",
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
