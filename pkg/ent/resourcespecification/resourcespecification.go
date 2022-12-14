// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package resourcespecification

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the resourcespecification type in the database.
	Label = "resource_specification"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldQuantity holds the string denoting the quantity field in the database.
	FieldQuantity = "quantity"

	// EdgeResourcetype holds the string denoting the resourcetype edge name in mutations.
	EdgeResourcetype = "resourcetype"
	// EdgeResourcePropertyType holds the string denoting the resource_property_type edge name in mutations.
	EdgeResourcePropertyType = "resource_property_type"
	// EdgeResourceSpecification holds the string denoting the resource_specification edge name in mutations.
	EdgeResourceSpecification = "resource_specification"
	// EdgeResourceSpecificationItems holds the string denoting the resource_specification_items edge name in mutations.
	EdgeResourceSpecificationItems = "resource_specification_items"
	// EdgeVendor holds the string denoting the vendor edge name in mutations.
	EdgeVendor = "vendor"
	// EdgeResourceSpecificationVendor holds the string denoting the resource_specification_vendor edge name in mutations.
	EdgeResourceSpecificationVendor = "resource_specification_vendor"

	// Table holds the table name of the resourcespecification in the database.
	Table = "resource_specifications"
	// ResourcetypeTable is the table the holds the resourcetype relation/edge.
	ResourcetypeTable = "resource_specifications"
	// ResourcetypeInverseTable is the table name for the ResourceType entity.
	// It exists in this package in order to avoid circular dependency with the "resourcetype" package.
	ResourcetypeInverseTable = "resource_types"
	// ResourcetypeColumn is the table column denoting the resourcetype relation/edge.
	ResourcetypeColumn = "resource_type_resource_specification"
	// ResourcePropertyTypeTable is the table the holds the resource_property_type relation/edge.
	ResourcePropertyTypeTable = "resource_property_types"
	// ResourcePropertyTypeInverseTable is the table name for the ResourcePropertyType entity.
	// It exists in this package in order to avoid circular dependency with the "resourcepropertytype" package.
	ResourcePropertyTypeInverseTable = "resource_property_types"
	// ResourcePropertyTypeColumn is the table column denoting the resource_property_type relation/edge.
	ResourcePropertyTypeColumn = "resource_specification_resource_property_type"
	// ResourceSpecificationTable is the table the holds the resource_specification relation/edge.
	ResourceSpecificationTable = "resource_specification_relationships"
	// ResourceSpecificationInverseTable is the table name for the ResourceSpecificationRelationship entity.
	// It exists in this package in order to avoid circular dependency with the "resourcespecificationrelationship" package.
	ResourceSpecificationInverseTable = "resource_specification_relationships"
	// ResourceSpecificationColumn is the table column denoting the resource_specification relation/edge.
	ResourceSpecificationColumn = "resource_specification_resource_specification"
	// ResourceSpecificationItemsTable is the table the holds the resource_specification_items relation/edge.
	ResourceSpecificationItemsTable = "resource_specification_items"
	// ResourceSpecificationItemsInverseTable is the table name for the ResourceSpecificationItems entity.
	// It exists in this package in order to avoid circular dependency with the "resourcespecificationitems" package.
	ResourceSpecificationItemsInverseTable = "resource_specification_items"
	// ResourceSpecificationItemsColumn is the table column denoting the resource_specification_items relation/edge.
	ResourceSpecificationItemsColumn = "resource_specification_resource_specification_items"
	// VendorTable is the table the holds the vendor relation/edge.
	VendorTable = "resource_specifications"
	// VendorInverseTable is the table name for the Vendor entity.
	// It exists in this package in order to avoid circular dependency with the "vendor" package.
	VendorInverseTable = "vendors"
	// VendorColumn is the table column denoting the vendor relation/edge.
	VendorColumn = "vendor_vendor_rs"
	// ResourceSpecificationVendorTable is the table the holds the resource_specification_vendor relation/edge.
	ResourceSpecificationVendorTable = "vendors"
	// ResourceSpecificationVendorInverseTable is the table name for the Vendor entity.
	// It exists in this package in order to avoid circular dependency with the "vendor" package.
	ResourceSpecificationVendorInverseTable = "vendors"
	// ResourceSpecificationVendorColumn is the table column denoting the resource_specification_vendor relation/edge.
	ResourceSpecificationVendorColumn = "resource_specification_resource_specification_vendor"
)

// Columns holds all SQL columns for resourcespecification fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldQuantity,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the ResourceSpecification type.
var ForeignKeys = []string{
	"resource_type_resource_specification",
	"vendor_vendor_rs",
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
