// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package flowdraft

import (
	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the flowdraft type in the database.
	Label = "flow_draft"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"

	// EdgeBlocks holds the string denoting the blocks edge name in mutations.
	EdgeBlocks = "blocks"

	// Table holds the table name of the flowdraft in the database.
	Table = "flow_drafts"
	// BlocksTable is the table the holds the blocks relation/edge.
	BlocksTable = "blocks"
	// BlocksInverseTable is the table name for the Block entity.
	// It exists in this package in order to avoid circular dependency with the "block" package.
	BlocksInverseTable = "blocks"
	// BlocksColumn is the table column denoting the blocks relation/edge.
	BlocksColumn = "flow_draft_blocks"
)

// Columns holds all SQL columns for flowdraft fields.
var Columns = []string{
	FieldID,
	FieldName,
	FieldDescription,
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
	// NameValidator is a validator for the "name" field. It is called by the builders before save.
	NameValidator func(string) error
)