// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package workorder

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebookincubator/ent"
)

const (
	// Label holds the string label denoting the workorder type in the database.
	Label = "work_order"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldPriority holds the string denoting the priority field in the database.
	FieldPriority = "priority"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"
	// FieldInstallDate holds the string denoting the install_date field in the database.
	FieldInstallDate = "install_date"
	// FieldCreationDate holds the string denoting the creation_date field in the database.
	FieldCreationDate = "creation_date"
	// FieldIndex holds the string denoting the index field in the database.
	FieldIndex = "index"
	// FieldCloseDate holds the string denoting the close_date field in the database.
	FieldCloseDate = "close_date"

	// EdgeType holds the string denoting the type edge name in mutations.
	EdgeType = "type"
	// EdgeTemplate holds the string denoting the template edge name in mutations.
	EdgeTemplate = "template"
	// EdgeEquipment holds the string denoting the equipment edge name in mutations.
	EdgeEquipment = "equipment"
	// EdgeLinks holds the string denoting the links edge name in mutations.
	EdgeLinks = "links"
	// EdgeFiles holds the string denoting the files edge name in mutations.
	EdgeFiles = "files"
	// EdgeHyperlinks holds the string denoting the hyperlinks edge name in mutations.
	EdgeHyperlinks = "hyperlinks"
	// EdgeLocation holds the string denoting the location edge name in mutations.
	EdgeLocation = "location"
	// EdgeComments holds the string denoting the comments edge name in mutations.
	EdgeComments = "comments"
	// EdgeActivities holds the string denoting the activities edge name in mutations.
	EdgeActivities = "activities"
	// EdgeProperties holds the string denoting the properties edge name in mutations.
	EdgeProperties = "properties"
	// EdgeCheckListCategories holds the string denoting the check_list_categories edge name in mutations.
	EdgeCheckListCategories = "check_list_categories"
	// EdgeProject holds the string denoting the project edge name in mutations.
	EdgeProject = "project"
	// EdgeOwner holds the string denoting the owner edge name in mutations.
	EdgeOwner = "owner"
	// EdgeAssignee holds the string denoting the assignee edge name in mutations.
	EdgeAssignee = "assignee"

	// Table holds the table name of the workorder in the database.
	Table = "work_orders"
	// TypeTable is the table the holds the type relation/edge.
	TypeTable = "work_orders"
	// TypeInverseTable is the table name for the WorkOrderType entity.
	// It exists in this package in order to avoid circular dependency with the "workordertype" package.
	TypeInverseTable = "work_order_types"
	// TypeColumn is the table column denoting the type relation/edge.
	TypeColumn = "work_order_type"
	// TemplateTable is the table the holds the template relation/edge.
	TemplateTable = "work_orders"
	// TemplateInverseTable is the table name for the WorkOrderTemplate entity.
	// It exists in this package in order to avoid circular dependency with the "workordertemplate" package.
	TemplateInverseTable = "work_order_templates"
	// TemplateColumn is the table column denoting the template relation/edge.
	TemplateColumn = "work_order_template"
	// EquipmentTable is the table the holds the equipment relation/edge.
	EquipmentTable = "equipment"
	// EquipmentInverseTable is the table name for the Equipment entity.
	// It exists in this package in order to avoid circular dependency with the "equipment" package.
	EquipmentInverseTable = "equipment"
	// EquipmentColumn is the table column denoting the equipment relation/edge.
	EquipmentColumn = "equipment_work_order"
	// LinksTable is the table the holds the links relation/edge.
	LinksTable = "links"
	// LinksInverseTable is the table name for the Link entity.
	// It exists in this package in order to avoid circular dependency with the "link" package.
	LinksInverseTable = "links"
	// LinksColumn is the table column denoting the links relation/edge.
	LinksColumn = "link_work_order"
	// FilesTable is the table the holds the files relation/edge.
	FilesTable = "files"
	// FilesInverseTable is the table name for the File entity.
	// It exists in this package in order to avoid circular dependency with the "file" package.
	FilesInverseTable = "files"
	// FilesColumn is the table column denoting the files relation/edge.
	FilesColumn = "work_order_files"
	// HyperlinksTable is the table the holds the hyperlinks relation/edge.
	HyperlinksTable = "hyperlinks"
	// HyperlinksInverseTable is the table name for the Hyperlink entity.
	// It exists in this package in order to avoid circular dependency with the "hyperlink" package.
	HyperlinksInverseTable = "hyperlinks"
	// HyperlinksColumn is the table column denoting the hyperlinks relation/edge.
	HyperlinksColumn = "work_order_hyperlinks"
	// LocationTable is the table the holds the location relation/edge.
	LocationTable = "work_orders"
	// LocationInverseTable is the table name for the Location entity.
	// It exists in this package in order to avoid circular dependency with the "location" package.
	LocationInverseTable = "locations"
	// LocationColumn is the table column denoting the location relation/edge.
	LocationColumn = "work_order_location"
	// CommentsTable is the table the holds the comments relation/edge.
	CommentsTable = "comments"
	// CommentsInverseTable is the table name for the Comment entity.
	// It exists in this package in order to avoid circular dependency with the "comment" package.
	CommentsInverseTable = "comments"
	// CommentsColumn is the table column denoting the comments relation/edge.
	CommentsColumn = "work_order_comments"
	// ActivitiesTable is the table the holds the activities relation/edge.
	ActivitiesTable = "activities"
	// ActivitiesInverseTable is the table name for the Activity entity.
	// It exists in this package in order to avoid circular dependency with the "activity" package.
	ActivitiesInverseTable = "activities"
	// ActivitiesColumn is the table column denoting the activities relation/edge.
	ActivitiesColumn = "work_order_activities"
	// PropertiesTable is the table the holds the properties relation/edge.
	PropertiesTable = "properties"
	// PropertiesInverseTable is the table name for the Property entity.
	// It exists in this package in order to avoid circular dependency with the "property" package.
	PropertiesInverseTable = "properties"
	// PropertiesColumn is the table column denoting the properties relation/edge.
	PropertiesColumn = "work_order_properties"
	// CheckListCategoriesTable is the table the holds the check_list_categories relation/edge.
	CheckListCategoriesTable = "check_list_categories"
	// CheckListCategoriesInverseTable is the table name for the CheckListCategory entity.
	// It exists in this package in order to avoid circular dependency with the "checklistcategory" package.
	CheckListCategoriesInverseTable = "check_list_categories"
	// CheckListCategoriesColumn is the table column denoting the check_list_categories relation/edge.
	CheckListCategoriesColumn = "work_order_check_list_categories"
	// ProjectTable is the table the holds the project relation/edge.
	ProjectTable = "work_orders"
	// ProjectInverseTable is the table name for the Project entity.
	// It exists in this package in order to avoid circular dependency with the "project" package.
	ProjectInverseTable = "projects"
	// ProjectColumn is the table column denoting the project relation/edge.
	ProjectColumn = "project_work_orders"
	// OwnerTable is the table the holds the owner relation/edge.
	OwnerTable = "work_orders"
	// OwnerInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	OwnerInverseTable = "users"
	// OwnerColumn is the table column denoting the owner relation/edge.
	OwnerColumn = "work_order_owner"
	// AssigneeTable is the table the holds the assignee relation/edge.
	AssigneeTable = "work_orders"
	// AssigneeInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	AssigneeInverseTable = "users"
	// AssigneeColumn is the table column denoting the assignee relation/edge.
	AssigneeColumn = "work_order_assignee"
)

// Columns holds all SQL columns for workorder fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldName,
	FieldStatus,
	FieldPriority,
	FieldDescription,
	FieldInstallDate,
	FieldCreationDate,
	FieldIndex,
	FieldCloseDate,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the WorkOrder type.
var ForeignKeys = []string{
	"project_work_orders",
	"work_order_type",
	"work_order_template",
	"work_order_location",
	"work_order_owner",
	"work_order_assignee",
}

// Note that the variables below are initialized by the runtime
// package on the initialization of the application. Therefore,
// it should be imported in the main as follows:
//
//	import _ "github.com/facebookincubator/symphony/pkg/ent/runtime"
//
var (
	Hooks  [3]ent.Hook
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

// Status defines the type for the status enum field.
type Status string

// StatusPLANNED is the default Status.
const DefaultStatus = StatusPLANNED

// Status values.
const (
	StatusPENDING Status = "PENDING"
	StatusPLANNED Status = "PLANNED"
	StatusDONE    Status = "DONE"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "s" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusPENDING, StatusPLANNED, StatusDONE:
		return nil
	default:
		return fmt.Errorf("workorder: invalid enum value for status field: %q", s)
	}
}

// Priority defines the type for the priority enum field.
type Priority string

// PriorityNONE is the default Priority.
const DefaultPriority = PriorityNONE

// Priority values.
const (
	PriorityURGENT Priority = "URGENT"
	PriorityHIGH   Priority = "HIGH"
	PriorityMEDIUM Priority = "MEDIUM"
	PriorityLOW    Priority = "LOW"
	PriorityNONE   Priority = "NONE"
)

func (pr Priority) String() string {
	return string(pr)
}

// PriorityValidator is a validator for the "pr" field enum values. It is called by the builders before save.
func PriorityValidator(pr Priority) error {
	switch pr {
	case PriorityURGENT, PriorityHIGH, PriorityMEDIUM, PriorityLOW, PriorityNONE:
		return nil
	default:
		return fmt.Errorf("workorder: invalid enum value for priority field: %q", pr)
	}
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

// MarshalGQL implements graphql.Marshaler interface.
func (pr Priority) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(pr.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (pr *Priority) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", v)
	}
	*pr = Priority(str)
	if err := PriorityValidator(*pr); err != nil {
		return fmt.Errorf("%s is not a valid Priority", str)
	}
	return nil
}
