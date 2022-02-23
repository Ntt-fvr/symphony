// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package resourcerelationship

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the resourcerelationship type in the database.
	Label = "resource_relationship"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldResourceRelationshipTypes holds the string denoting the resourcerelationshiptypes field in the database.
	FieldResourceRelationshipTypes = "resource_relationship_types"

	// EdgeResourcea holds the string denoting the resourcea edge name in mutations.
	EdgeResourcea = "resourcea"
	// EdgeResourceb holds the string denoting the resourceb edge name in mutations.
	EdgeResourceb = "resourceb"
	// EdgeResourcelocation holds the string denoting the resourcelocation edge name in mutations.
	EdgeResourcelocation = "resourcelocation"

	// Table holds the table name of the resourcerelationship in the database.
	Table = "resource_relationships"
	// ResourceaTable is the table the holds the resourcea relation/edge.
	ResourceaTable = "resource_relationships"
	// ResourceaInverseTable is the table name for the Resource entity.
	// It exists in this package in order to avoid circular dependency with the "resource" package.
	ResourceaInverseTable = "resources"
	// ResourceaColumn is the table column denoting the resourcea relation/edge.
	ResourceaColumn = "resource_resource_a"
	// ResourcebTable is the table the holds the resourceb relation/edge.
	ResourcebTable = "resource_relationships"
	// ResourcebInverseTable is the table name for the Resource entity.
	// It exists in this package in order to avoid circular dependency with the "resource" package.
	ResourcebInverseTable = "resources"
	// ResourcebColumn is the table column denoting the resourceb relation/edge.
	ResourcebColumn = "resource_resource_b"
	// ResourcelocationTable is the table the holds the resourcelocation relation/edge.
	ResourcelocationTable = "resource_relationships"
	// ResourcelocationInverseTable is the table name for the Location entity.
	// It exists in this package in order to avoid circular dependency with the "location" package.
	ResourcelocationInverseTable = "locations"
	// ResourcelocationColumn is the table column denoting the resourcelocation relation/edge.
	ResourcelocationColumn = "location_rs_location"
)

// Columns holds all SQL columns for resourcerelationship fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldResourceRelationshipTypes,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the ResourceRelationship type.
var ForeignKeys = []string{
	"location_rs_location",
	"resource_resource_a",
	"resource_resource_b",
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

// ResourceRelationshipTypes defines the type for the ResourceRelationshipTypes enum field.
type ResourceRelationshipTypes string

// ResourceRelationshipTypes values.
const (
	ResourceRelationshipTypesBELONGS_TO       ResourceRelationshipTypes = "BELONGS_TO"
	ResourceRelationshipTypesLOCATED_IN       ResourceRelationshipTypes = "LOCATED_IN"
	ResourceRelationshipTypesPHYSICAL_LINK    ResourceRelationshipTypes = "PHYSICAL_LINK"
	ResourceRelationshipTypesLOGICAL_LINK     ResourceRelationshipTypes = "LOGICAL_LINK"
	ResourceRelationshipTypesCROSS_CONNECTION ResourceRelationshipTypes = "CROSS_CONNECTION"
)

func (_resourcerelationshiptypes ResourceRelationshipTypes) String() string {
	return string(_resourcerelationshiptypes)
}

// ResourceRelationshipTypesValidator is a validator for the "ResourceRelationshipTypes" field enum values. It is called by the builders before save.
func ResourceRelationshipTypesValidator(_resourcerelationshiptypes ResourceRelationshipTypes) error {
	switch _resourcerelationshiptypes {
	case ResourceRelationshipTypesBELONGS_TO, ResourceRelationshipTypesLOCATED_IN, ResourceRelationshipTypesPHYSICAL_LINK, ResourceRelationshipTypesLOGICAL_LINK, ResourceRelationshipTypesCROSS_CONNECTION:
		return nil
	default:
		return fmt.Errorf("resourcerelationship: invalid enum value for ResourceRelationshipTypes field: %q", _resourcerelationshiptypes)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_resourcerelationshiptypes ResourceRelationshipTypes) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_resourcerelationshiptypes.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_resourcerelationshiptypes *ResourceRelationshipTypes) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*_resourcerelationshiptypes = ResourceRelationshipTypes(str)
	if err := ResourceRelationshipTypesValidator(*_resourcerelationshiptypes); err != nil {
		return fmt.Errorf("%s is not a valid ResourceRelationshipTypes", str)
	}
	return nil
}
