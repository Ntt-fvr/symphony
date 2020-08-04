// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package exporttask

import (
	"fmt"
	"io"
	"strconv"

	"github.com/facebookincubator/ent"
)

const (
	// Label holds the string label denoting the exporttask type in the database.
	Label = "export_task"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldProgress holds the string denoting the progress field in the database.
	FieldProgress = "progress"
	// FieldFilters holds the string denoting the filters field in the database.
	FieldFilters = "filters"
	// FieldStoreKey holds the string denoting the store_key field in the database.
	FieldStoreKey = "store_key"

	// Table holds the table name of the exporttask in the database.
	Table = "export_tasks"
)

// Columns holds all SQL columns for exporttask fields.
var Columns = []string{
	FieldID,
	FieldType,
	FieldStatus,
	FieldProgress,
	FieldFilters,
	FieldStoreKey,
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
	// DefaultProgress holds the default value on creation for the progress field.
	DefaultProgress float64
	// ProgressValidator is a validator for the "progress" field. It is called by the builders before save.
	ProgressValidator func(float64) error
	// DefaultFilters holds the default value on creation for the filters field.
	DefaultFilters string
)

// Type defines the type for the type enum field.
type Type string

// Type values.
const (
	TypeEquipment Type = "EQUIPMENT"
	TypeLocation  Type = "LOCATION"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeEquipment, TypeLocation:
		return nil
	default:
		return fmt.Errorf("exporttask: invalid enum value for type field: %q", _type)
	}
}

// Status defines the type for the status enum field.
type Status string

// Status values.
const (
	StatusFailed     Status = "FAILED"
	StatusInProgress Status = "IN_PROGRESS"
	StatusPending    Status = "PENDING"
	StatusSucceeded  Status = "SUCCEEDED"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusFailed, StatusInProgress, StatusPending, StatusSucceeded:
		return nil
	default:
		return fmt.Errorf("exporttask: invalid enum value for status field: %q", s)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_type Type) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_type.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_type *Type) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", v)
	}
	*_type = Type(str)
	if err := TypeValidator(*_type); err != nil {
		return fmt.Errorf("%s is not a valid Type", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Status) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Status) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", v)
	}
	*s = Status(str)
	if err := StatusValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}