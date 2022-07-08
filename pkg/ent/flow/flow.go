// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package flow

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the flow type in the database.
	Label = "flow"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"
	// FieldEndParamDefinitions holds the string denoting the end_param_definitions field in the database.
	FieldEndParamDefinitions = "end_param_definitions"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldNewInstancesPolicy holds the string denoting the newinstancespolicy field in the database.
	FieldNewInstancesPolicy = "new_instances_policy"
	// FieldCreationDate holds the string denoting the creation_date field in the database.
	FieldCreationDate = "creation_date"

	// EdgeBlocks holds the string denoting the blocks edge name in mutations.
	EdgeBlocks = "blocks"
	// EdgeDraft holds the string denoting the draft edge name in mutations.
	EdgeDraft = "draft"
	// EdgeAuthor holds the string denoting the author edge name in mutations.
	EdgeAuthor = "author"
	// EdgeEditor holds the string denoting the editor edge name in mutations.
	EdgeEditor = "editor"
	// EdgeInstance holds the string denoting the instance edge name in mutations.
	EdgeInstance = "instance"

	// Table holds the table name of the flow in the database.
	Table = "flows"
	// BlocksTable is the table the holds the blocks relation/edge.
	BlocksTable = "blocks"
	// BlocksInverseTable is the table name for the Block entity.
	// It exists in this package in order to avoid circular dependency with the "block" package.
	BlocksInverseTable = "blocks"
	// BlocksColumn is the table column denoting the blocks relation/edge.
	BlocksColumn = "flow_blocks"
	// DraftTable is the table the holds the draft relation/edge.
	DraftTable = "flow_drafts"
	// DraftInverseTable is the table name for the FlowDraft entity.
	// It exists in this package in order to avoid circular dependency with the "flowdraft" package.
	DraftInverseTable = "flow_drafts"
	// DraftColumn is the table column denoting the draft relation/edge.
	DraftColumn = "flow_draft"
	// AuthorTable is the table the holds the author relation/edge.
	AuthorTable = "flows"
	// AuthorInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	AuthorInverseTable = "users"
	// AuthorColumn is the table column denoting the author relation/edge.
	AuthorColumn = "flow_author"
	// EditorTable is the table the holds the editor relation/edge.
	EditorTable = "users"
	// EditorInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	EditorInverseTable = "users"
	// EditorColumn is the table column denoting the editor relation/edge.
	EditorColumn = "flow_editor"
	// InstanceTable is the table the holds the instance relation/edge.
	InstanceTable = "flow_instances"
	// InstanceInverseTable is the table name for the FlowInstance entity.
	// It exists in this package in order to avoid circular dependency with the "flowinstance" package.
	InstanceInverseTable = "flow_instances"
	// InstanceColumn is the table column denoting the instance relation/edge.
	InstanceColumn = "flow_instance_flow"
)

// Columns holds all SQL columns for flow fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldDescription,
	FieldEndParamDefinitions,
	FieldStatus,
	FieldNewInstancesPolicy,
	FieldCreationDate,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Flow type.
var ForeignKeys = []string{
	"flow_author",
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
	Hooks  [2]ent.Hook
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

// Status defines the type for the status enum field.
type Status string

// StatusUnpublished is the default Status.
const DefaultStatus = StatusUnpublished

// Status values.
const (
	StatusPublished   Status = "PUBLISHED"
	StatusUnpublished Status = "UNPUBLISHED"
	StatusArchived    Status = "ARCHIVED"
	StatusOn_Hold     Status = "ON_HOLD"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusPublished, StatusUnpublished, StatusArchived, StatusOn_Hold:
		return nil
	default:
		return fmt.Errorf("flow: invalid enum value for status field: %q", s)
	}
}

// NewInstancesPolicy defines the type for the newInstancesPolicy enum field.
type NewInstancesPolicy string

// NewInstancesPolicyDisabled is the default NewInstancesPolicy.
const DefaultNewInstancesPolicy = NewInstancesPolicyDisabled

// NewInstancesPolicy values.
const (
	NewInstancesPolicyEnabled  NewInstancesPolicy = "ENABLED"
	NewInstancesPolicyDisabled NewInstancesPolicy = "DISABLED"
)

func (nip NewInstancesPolicy) String() string {
	return string(nip)
}

// NewInstancesPolicyValidator is a validator for the "newInstancesPolicy" field enum values. It is called by the builders before save.
func NewInstancesPolicyValidator(nip NewInstancesPolicy) error {
	switch nip {
	case NewInstancesPolicyEnabled, NewInstancesPolicyDisabled:
		return nil
	default:
		return fmt.Errorf("flow: invalid enum value for newInstancesPolicy field: %q", nip)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Status) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Status) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*s = Status(str)
	if err := StatusValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (nip NewInstancesPolicy) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(nip.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (nip *NewInstancesPolicy) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*nip = NewInstancesPolicy(str)
	if err := NewInstancesPolicyValidator(*nip); err != nil {
		return fmt.Errorf("%s is not a valid NewInstancesPolicy", str)
	}
	return nil
}
