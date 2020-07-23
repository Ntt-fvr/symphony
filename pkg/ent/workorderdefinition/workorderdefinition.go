// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package workorderdefinition

import (
	"time"

	"github.com/facebookincubator/ent"
)

const (
	// Label holds the string label denoting the workorderdefinition type in the database.
	Label = "work_order_definition"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldIndex holds the string denoting the index field in the database.
	FieldIndex = "index"

	// EdgeType holds the string denoting the type edge name in mutations.
	EdgeType = "type"
	// EdgeProjectType holds the string denoting the project_type edge name in mutations.
	EdgeProjectType = "project_type"
	// EdgeProjectTemplate holds the string denoting the project_template edge name in mutations.
	EdgeProjectTemplate = "project_template"

	// Table holds the table name of the workorderdefinition in the database.
	Table = "work_order_definitions"
	// TypeTable is the table the holds the type relation/edge.
	TypeTable = "work_order_definitions"
	// TypeInverseTable is the table name for the WorkOrderType entity.
	// It exists in this package in order to avoid circular dependency with the "workordertype" package.
	TypeInverseTable = "work_order_types"
	// TypeColumn is the table column denoting the type relation/edge.
	TypeColumn = "work_order_definition_type"
	// ProjectTypeTable is the table the holds the project_type relation/edge.
	ProjectTypeTable = "work_order_definitions"
	// ProjectTypeInverseTable is the table name for the ProjectType entity.
	// It exists in this package in order to avoid circular dependency with the "projecttype" package.
	ProjectTypeInverseTable = "project_types"
	// ProjectTypeColumn is the table column denoting the project_type relation/edge.
	ProjectTypeColumn = "project_type_work_orders"
	// ProjectTemplateTable is the table the holds the project_template relation/edge.
	ProjectTemplateTable = "work_order_definitions"
	// ProjectTemplateInverseTable is the table name for the ProjectTemplate entity.
	// It exists in this package in order to avoid circular dependency with the "projecttemplate" package.
	ProjectTemplateInverseTable = "project_templates"
	// ProjectTemplateColumn is the table column denoting the project_template relation/edge.
	ProjectTemplateColumn = "project_template_work_orders"
)

// Columns holds all SQL columns for workorderdefinition fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldIndex,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the WorkOrderDefinition type.
var ForeignKeys = []string{
	"project_template_work_orders",
	"project_type_work_orders",
	"work_order_definition_type",
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
