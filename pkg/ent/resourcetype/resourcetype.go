// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package resourcetype

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the resourcetype type in the database.
	Label = "resource_type"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldResourceTypeClass holds the string denoting the resourcetypeclass field in the database.
	FieldResourceTypeClass = "resource_type_class"
	// FieldResourceTypeBaseType holds the string denoting the resourcetypebasetype field in the database.
	FieldResourceTypeBaseType = "resource_type_base_type"

	// EdgeResourceRelationshipA holds the string denoting the resource_relationship_a edge name in mutations.
	EdgeResourceRelationshipA = "resource_relationship_a"
	// EdgeResourceRelationshipB holds the string denoting the resource_relationship_b edge name in mutations.
	EdgeResourceRelationshipB = "resource_relationship_b"
	// EdgeResourceSpecification holds the string denoting the resource_specification edge name in mutations.
	EdgeResourceSpecification = "resource_specification"
	// EdgeResourcetypeItems holds the string denoting the resourcetype_items edge name in mutations.
	EdgeResourcetypeItems = "resourcetype_items"

	// Table holds the table name of the resourcetype in the database.
	Table = "resource_types"
	// ResourceRelationshipATable is the table the holds the resource_relationship_a relation/edge.
	ResourceRelationshipATable = "resource_type_relationships"
	// ResourceRelationshipAInverseTable is the table name for the ResourceTypeRelationship entity.
	// It exists in this package in order to avoid circular dependency with the "resourcetyperelationship" package.
	ResourceRelationshipAInverseTable = "resource_type_relationships"
	// ResourceRelationshipAColumn is the table column denoting the resource_relationship_a relation/edge.
	ResourceRelationshipAColumn = "resource_type_resource_relationship_a"
	// ResourceRelationshipBTable is the table the holds the resource_relationship_b relation/edge.
	ResourceRelationshipBTable = "resource_type_relationships"
	// ResourceRelationshipBInverseTable is the table name for the ResourceTypeRelationship entity.
	// It exists in this package in order to avoid circular dependency with the "resourcetyperelationship" package.
	ResourceRelationshipBInverseTable = "resource_type_relationships"
	// ResourceRelationshipBColumn is the table column denoting the resource_relationship_b relation/edge.
	ResourceRelationshipBColumn = "resource_type_resource_relationship_b"
	// ResourceSpecificationTable is the table the holds the resource_specification relation/edge.
	ResourceSpecificationTable = "resource_specifications"
	// ResourceSpecificationInverseTable is the table name for the ResourceSpecification entity.
	// It exists in this package in order to avoid circular dependency with the "resourcespecification" package.
	ResourceSpecificationInverseTable = "resource_specifications"
	// ResourceSpecificationColumn is the table column denoting the resource_specification relation/edge.
	ResourceSpecificationColumn = "resource_type_resource_specification"
	// ResourcetypeItemsTable is the table the holds the resourcetype_items relation/edge.
	ResourcetypeItemsTable = "resource_sr_items"
	// ResourcetypeItemsInverseTable is the table name for the ResourceSRItems entity.
	// It exists in this package in order to avoid circular dependency with the "resourcesritems" package.
	ResourcetypeItemsInverseTable = "resource_sr_items"
	// ResourcetypeItemsColumn is the table column denoting the resourcetype_items relation/edge.
	ResourcetypeItemsColumn = "resource_type_resourcetype_items"
)

// Columns holds all SQL columns for resourcetype fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldResourceTypeClass,
	FieldResourceTypeBaseType,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
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

// ResourceTypeClass defines the type for the ResourceTypeClass enum field.
type ResourceTypeClass string

// ResourceTypeClass values.
const (
	ResourceTypeClassLOGICAL_RESOURCE  ResourceTypeClass = "LOGICAL_RESOURCE"
	ResourceTypeClassPHYSICAL_RESOURCE ResourceTypeClass = "PHYSICAL_RESOURCE"
	ResourceTypeClassVIRTUAL_RESOURCE  ResourceTypeClass = "VIRTUAL_RESOURCE"
)

func (_resourcetypeclass ResourceTypeClass) String() string {
	return string(_resourcetypeclass)
}

// ResourceTypeClassValidator is a validator for the "ResourceTypeClass" field enum values. It is called by the builders before save.
func ResourceTypeClassValidator(_resourcetypeclass ResourceTypeClass) error {
	switch _resourcetypeclass {
	case ResourceTypeClassLOGICAL_RESOURCE, ResourceTypeClassPHYSICAL_RESOURCE, ResourceTypeClassVIRTUAL_RESOURCE:
		return nil
	default:
		return fmt.Errorf("resourcetype: invalid enum value for ResourceTypeClass field: %q", _resourcetypeclass)
	}
}

// ResourceTypeBaseType defines the type for the ResourceTypeBaseType enum field.
type ResourceTypeBaseType string

// ResourceTypeBaseType values.
const (
	ResourceTypeBaseTypeEQUIPMENT ResourceTypeBaseType = "EQUIPMENT"
	ResourceTypeBaseTypeSLOT      ResourceTypeBaseType = "SLOT"
	ResourceTypeBaseTypeRACK      ResourceTypeBaseType = "RACK"
	ResourceTypeBaseTypePORT      ResourceTypeBaseType = "PORT"
	ResourceTypeBaseTypeCARD      ResourceTypeBaseType = "CARD"
)

func (_resourcetypebasetype ResourceTypeBaseType) String() string {
	return string(_resourcetypebasetype)
}

// ResourceTypeBaseTypeValidator is a validator for the "ResourceTypeBaseType" field enum values. It is called by the builders before save.
func ResourceTypeBaseTypeValidator(_resourcetypebasetype ResourceTypeBaseType) error {
	switch _resourcetypebasetype {
	case ResourceTypeBaseTypeEQUIPMENT, ResourceTypeBaseTypeSLOT, ResourceTypeBaseTypeRACK, ResourceTypeBaseTypePORT, ResourceTypeBaseTypeCARD:
		return nil
	default:
		return fmt.Errorf("resourcetype: invalid enum value for ResourceTypeBaseType field: %q", _resourcetypebasetype)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_resourcetypeclass ResourceTypeClass) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_resourcetypeclass.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_resourcetypeclass *ResourceTypeClass) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*_resourcetypeclass = ResourceTypeClass(str)
	if err := ResourceTypeClassValidator(*_resourcetypeclass); err != nil {
		return fmt.Errorf("%s is not a valid ResourceTypeClass", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (_resourcetypebasetype ResourceTypeBaseType) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_resourcetypebasetype.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_resourcetypebasetype *ResourceTypeBaseType) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*_resourcetypebasetype = ResourceTypeBaseType(str)
	if err := ResourceTypeBaseTypeValidator(*_resourcetypebasetype); err != nil {
		return fmt.Errorf("%s is not a valid ResourceTypeBaseType", str)
	}
	return nil
}
