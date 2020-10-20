// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package exitpoint

import (
	"fmt"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebook/ent"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

const (
	// Label holds the string label denoting the exitpoint type in the database.
	Label = "exit_point"
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

	// EdgeNextEntryPoints holds the string denoting the next_entry_points edge name in mutations.
	EdgeNextEntryPoints = "next_entry_points"
	// EdgeParentBlock holds the string denoting the parent_block edge name in mutations.
	EdgeParentBlock = "parent_block"

	// Table holds the table name of the exitpoint in the database.
	Table = "exit_points"
	// NextEntryPointsTable is the table the holds the next_entry_points relation/edge. The primary key declared below.
	NextEntryPointsTable = "exit_point_next_entry_points"
	// NextEntryPointsInverseTable is the table name for the EntryPoint entity.
	// It exists in this package in order to avoid circular dependency with the "entrypoint" package.
	NextEntryPointsInverseTable = "entry_points"
	// ParentBlockTable is the table the holds the parent_block relation/edge.
	ParentBlockTable = "exit_points"
	// ParentBlockInverseTable is the table name for the Block entity.
	// It exists in this package in order to avoid circular dependency with the "block" package.
	ParentBlockInverseTable = "blocks"
	// ParentBlockColumn is the table column denoting the parent_block relation/edge.
	ParentBlockColumn = "block_exit_points"
)

// Columns holds all SQL columns for exitpoint fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldRole,
	FieldCid,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the ExitPoint type.
var ForeignKeys = []string{
	"block_exit_points",
}

var (
	// NextEntryPointsPrimaryKey and NextEntryPointsColumn2 are the table columns denoting the
	// primary key for the next_entry_points relation (M2M).
	NextEntryPointsPrimaryKey = []string{"exit_point_id", "entry_point_id"}
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
	Hooks  [3]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
)

// RoleValidator is a validator for the "role" field enum values. It is called by the builders before save.
func RoleValidator(r flowschema.ExitPointRole) error {
	switch r {
	case "DEFAULT", "DECISION":
		return nil
	default:
		return fmt.Errorf("exitpoint: invalid enum value for role field: %q", r)
	}
}

var (
	// flowschema.ExitPointRole must implement graphql.Marshaler.
	_ graphql.Marshaler = flowschema.ExitPointRole("")
	// flowschema.ExitPointRole must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*flowschema.ExitPointRole)(nil)
)
