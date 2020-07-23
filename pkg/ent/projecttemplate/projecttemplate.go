// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package projecttemplate

import (
	"github.com/facebookincubator/ent"
)

const (
	// Label holds the string label denoting the projecttemplate type in the database.
	Label = "project_template"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"

	// EdgeProperties holds the string denoting the properties edge name in mutations.
	EdgeProperties = "properties"
	// EdgeWorkOrders holds the string denoting the work_orders edge name in mutations.
	EdgeWorkOrders = "work_orders"
	// EdgeType holds the string denoting the type edge name in mutations.
	EdgeType = "type"

	// Table holds the table name of the projecttemplate in the database.
	Table = "project_templates"
	// PropertiesTable is the table the holds the properties relation/edge.
	PropertiesTable = "property_types"
	// PropertiesInverseTable is the table name for the PropertyType entity.
	// It exists in this package in order to avoid circular dependency with the "propertytype" package.
	PropertiesInverseTable = "property_types"
	// PropertiesColumn is the table column denoting the properties relation/edge.
	PropertiesColumn = "project_template_properties"
	// WorkOrdersTable is the table the holds the work_orders relation/edge.
	WorkOrdersTable = "work_order_definitions"
	// WorkOrdersInverseTable is the table name for the WorkOrderDefinition entity.
	// It exists in this package in order to avoid circular dependency with the "workorderdefinition" package.
	WorkOrdersInverseTable = "work_order_definitions"
	// WorkOrdersColumn is the table column denoting the work_orders relation/edge.
	WorkOrdersColumn = "project_template_work_orders"
	// TypeTable is the table the holds the type relation/edge.
	TypeTable = "project_templates"
	// TypeInverseTable is the table name for the ProjectType entity.
	// It exists in this package in order to avoid circular dependency with the "projecttype" package.
	TypeInverseTable = "project_types"
	// TypeColumn is the table column denoting the type relation/edge.
	TypeColumn = "project_template_type"
)

// Columns holds all SQL columns for projecttemplate fields.
var Columns = []string{
	FieldID,
	FieldName,
	FieldDescription,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the ProjectTemplate type.
var ForeignKeys = []string{
	"project_template_type",
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
