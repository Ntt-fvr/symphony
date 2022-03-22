// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package propertycategory

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the propertycategory type in the database.
	Label = "property_category"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldIndex holds the string denoting the index field in the database.
	FieldIndex = "index"

	// EdgePropertiesType holds the string denoting the properties_type edge name in mutations.
	EdgePropertiesType = "properties_type"
	// EdgeResourcePropertiesType holds the string denoting the resource_properties_type edge name in mutations.
	EdgeResourcePropertiesType = "resource_properties_type"
	// EdgeParameterCatalog holds the string denoting the parameter_catalog edge name in mutations.
	EdgeParameterCatalog = "parameter_catalog"

	// Table holds the table name of the propertycategory in the database.
	Table = "property_categories"
	// PropertiesTypeTable is the table the holds the properties_type relation/edge.
	PropertiesTypeTable = "property_types"
	// PropertiesTypeInverseTable is the table name for the PropertyType entity.
	// It exists in this package in order to avoid circular dependency with the "propertytype" package.
	PropertiesTypeInverseTable = "property_types"
	// PropertiesTypeColumn is the table column denoting the properties_type relation/edge.
	PropertiesTypeColumn = "property_category_properties_type"
	// ResourcePropertiesTypeTable is the table the holds the resource_properties_type relation/edge.
	ResourcePropertiesTypeTable = "resource_property_types"
	// ResourcePropertiesTypeInverseTable is the table name for the ResourcePropertyType entity.
	// It exists in this package in order to avoid circular dependency with the "resourcepropertytype" package.
	ResourcePropertiesTypeInverseTable = "resource_property_types"
	// ResourcePropertiesTypeColumn is the table column denoting the resource_properties_type relation/edge.
	ResourcePropertiesTypeColumn = "property_category_resource_properties_type"
	// ParameterCatalogTable is the table the holds the parameter_catalog relation/edge.
	ParameterCatalogTable = "property_categories"
	// ParameterCatalogInverseTable is the table name for the ParameterCatalog entity.
	// It exists in this package in order to avoid circular dependency with the "parametercatalog" package.
	ParameterCatalogInverseTable = "parameter_catalogs"
	// ParameterCatalogColumn is the table column denoting the parameter_catalog relation/edge.
	ParameterCatalogColumn = "parameter_catalog_property_categories"
)

// Columns holds all SQL columns for propertycategory fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldIndex,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the PropertyCategory type.
var ForeignKeys = []string{
	"parameter_catalog_property_categories",
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
