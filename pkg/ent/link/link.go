// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package link

import (
	"fmt"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
)

const (
	// Label holds the string label denoting the link type in the database.
	Label = "link"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldFutureState holds the string denoting the future_state field in the database.
	FieldFutureState = "future_state"

	// EdgePorts holds the string denoting the ports edge name in mutations.
	EdgePorts = "ports"
	// EdgeWorkOrder holds the string denoting the work_order edge name in mutations.
	EdgeWorkOrder = "work_order"
	// EdgeProperties holds the string denoting the properties edge name in mutations.
	EdgeProperties = "properties"
	// EdgeService holds the string denoting the service edge name in mutations.
	EdgeService = "service"

	// Table holds the table name of the link in the database.
	Table = "links"
	// PortsTable is the table the holds the ports relation/edge.
	PortsTable = "equipment_ports"
	// PortsInverseTable is the table name for the EquipmentPort entity.
	// It exists in this package in order to avoid circular dependency with the "equipmentport" package.
	PortsInverseTable = "equipment_ports"
	// PortsColumn is the table column denoting the ports relation/edge.
	PortsColumn = "equipment_port_link"
	// WorkOrderTable is the table the holds the work_order relation/edge.
	WorkOrderTable = "links"
	// WorkOrderInverseTable is the table name for the WorkOrder entity.
	// It exists in this package in order to avoid circular dependency with the "workorder" package.
	WorkOrderInverseTable = "work_orders"
	// WorkOrderColumn is the table column denoting the work_order relation/edge.
	WorkOrderColumn = "link_work_order"
	// PropertiesTable is the table the holds the properties relation/edge.
	PropertiesTable = "properties"
	// PropertiesInverseTable is the table name for the Property entity.
	// It exists in this package in order to avoid circular dependency with the "property" package.
	PropertiesInverseTable = "properties"
	// PropertiesColumn is the table column denoting the properties relation/edge.
	PropertiesColumn = "link_properties"
	// ServiceTable is the table the holds the service relation/edge. The primary key declared below.
	ServiceTable = "service_links"
	// ServiceInverseTable is the table name for the Service entity.
	// It exists in this package in order to avoid circular dependency with the "service" package.
	ServiceInverseTable = "services"
)

// Columns holds all SQL columns for link fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldFutureState,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Link type.
var ForeignKeys = []string{
	"link_work_order",
}

var (
	// ServicePrimaryKey and ServiceColumn2 are the table columns denoting the
	// primary key for the service relation (M2M).
	ServicePrimaryKey = []string{"service_id", "link_id"}
)

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

// FutureStateValidator is a validator for the "future_state" field enum values. It is called by the builders before save.
func FutureStateValidator(fs enum.FutureState) error {
	switch fs {
	case "INSTALL", "REMOVE":
		return nil
	default:
		return fmt.Errorf("link: invalid enum value for future_state field: %q", fs)
	}
}

var (
	// enum.FutureState must implement graphql.Marshaler.
	_ graphql.Marshaler = enum.FutureState("")
	// enum.FutureState must implement graphql.Unmarshaler.
	_ graphql.Unmarshaler = (*enum.FutureState)(nil)
)
