// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package resourcespecificationrelationship

import (
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the resourcespecificationrelationship type in the database.
	Label = "resource_specification_relationship"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"

	// EdgeResourcespecification holds the string denoting the resourcespecification edge name in mutations.
	EdgeResourcespecification = "resourcespecification"
	// EdgeResourceSr holds the string denoting the resource_sr edge name in mutations.
	EdgeResourceSr = "resource_sr"

	// Table holds the table name of the resourcespecificationrelationship in the database.
	Table = "resource_specification_relationships"
	// ResourcespecificationTable is the table the holds the resourcespecification relation/edge.
	ResourcespecificationTable = "resource_specification_relationships"
	// ResourcespecificationInverseTable is the table name for the ResourceSpecification entity.
	// It exists in this package in order to avoid circular dependency with the "resourcespecification" package.
	ResourcespecificationInverseTable = "resource_specifications"
	// ResourcespecificationColumn is the table column denoting the resourcespecification relation/edge.
	ResourcespecificationColumn = "resource_specification_resource_specification"
	// ResourceSrTable is the table the holds the resource_sr relation/edge.
	ResourceSrTable = "resource_specification_items"
	// ResourceSrInverseTable is the table name for the ResourceSpecificationItems entity.
	// It exists in this package in order to avoid circular dependency with the "resourcespecificationitems" package.
	ResourceSrInverseTable = "resource_specification_items"
	// ResourceSrColumn is the table column denoting the resource_sr relation/edge.
	ResourceSrColumn = "resource_specification_relationship_resource_sr"
)

// Columns holds all SQL columns for resourcespecificationrelationship fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the ResourceSpecificationRelationship type.
var ForeignKeys = []string{
	"resource_specification_resource_specification",
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
