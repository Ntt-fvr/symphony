// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package entrypoint

import (
	"fmt"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebook/ent"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

const (
	// Label holds the string label denoting the entrypoint type in the database.
	Label = "entry_point"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldRole holds the string denoting the role field in the database.
	FieldRole = "role"
	// FieldCid holds the string denoting the cid field in the database.
	FieldCid = "cid"

	// EdgePrevExitPoints holds the string denoting the prev_exit_points edge name in mutations.
	EdgePrevExitPoints = "prev_exit_points"
	// EdgeParentBlock holds the string denoting the parent_block edge name in mutations.
	EdgeParentBlock = "parent_block"

	// Table holds the table name of the entrypoint in the database.
	Table = "entry_points"
	// PrevExitPointsTable is the table the holds the prev_exit_points relation/edge. The primary key declared below.
	PrevExitPointsTable = "exit_point_next_entry_points"
	// PrevExitPointsInverseTable is the table name for the ExitPoint entity.
	// It exists in this package in order to avoid circular dependency with the "exitpoint" package.
	PrevExitPointsInverseTable = "exit_points"
	// ParentBlockTable is the table the holds the parent_block relation/edge.
	ParentBlockTable = "entry_points"
	// ParentBlockInverseTable is the table name for the Block entity.
	// It exists in this package in order to avoid circular dependency with the "block" package.
	ParentBlockInverseTable = "blocks"
	// ParentBlockColumn is the table column denoting the parent_block relation/edge.
	ParentBlockColumn = "block_entry_point"
)

// Columns holds all SQL columns for entrypoint fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldRole,
	FieldCid,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the EntryPoint type.
var ForeignKeys = []string{
	"block_entry_point",
}

var (
	// PrevExitPointsPrimaryKey and PrevExitPointsColumn2 are the table columns denoting the
	// primary key for the prev_exit_points relation (M2M).
	PrevExitPointsPrimaryKey = []string{"exit_point_id", "entry_point_id"}
)

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
	Hooks  [2]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
)

// RoleValidator is a validator for the "role" field enum values. It is called by the builders before save.
func RoleValidator(r flowschema.EntryPointRole) error {
	switch r {
	case "DEFAULT":
		return nil
	default:
		return fmt.Errorf("entrypoint: invalid enum value for role field: %q", r)
	}
}

var (
	// flowschema.EntryPointRole must implement graphql.Marshaler.
	_ graphql.Marshaler = flowschema.EntryPointRole("")
	// flowschema.EntryPointRole must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*flowschema.EntryPointRole)(nil)
)
