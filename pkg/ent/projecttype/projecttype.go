// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package projecttype

import (
	"github.com/facebookincubator/ent"
)

const (
	// Label holds the string label denoting the projecttype type in the database.
	Label = "project_type"
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
	// EdgeProjects holds the string denoting the projects edge name in mutations.
	EdgeProjects = "projects"

	// Table holds the table name of the projecttype in the database.
	Table = "project_types"
	// PropertiesTable is the table the holds the properties relation/edge.
	PropertiesTable = "property_types"
	// PropertiesInverseTable is the table name for the PropertyType entity.
	// It exists in this package in order to avoid circular dependency with the "propertytype" package.
	PropertiesInverseTable = "property_types"
	// PropertiesColumn is the table column denoting the properties relation/edge.
	PropertiesColumn = "project_type_properties"
	// WorkOrdersTable is the table the holds the work_orders relation/edge.
	WorkOrdersTable = "work_order_definitions"
	// WorkOrdersInverseTable is the table name for the WorkOrderDefinition entity.
	// It exists in this package in order to avoid circular dependency with the "workorderdefinition" package.
	WorkOrdersInverseTable = "work_order_definitions"
	// WorkOrdersColumn is the table column denoting the work_orders relation/edge.
	WorkOrdersColumn = "project_type_work_orders"
	// ProjectsTable is the table the holds the projects relation/edge.
	ProjectsTable = "projects"
	// ProjectsInverseTable is the table name for the Project entity.
	// It exists in this package in order to avoid circular dependency with the "project" package.
	ProjectsInverseTable = "projects"
	// ProjectsColumn is the table column denoting the projects relation/edge.
	ProjectsColumn = "project_type_projects"
)

// Columns holds all SQL columns for projecttype fields.
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
