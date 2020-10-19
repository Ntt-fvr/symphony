// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package user

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/facebook/ent"
)

const (
	// Label holds the string label denoting the user type in the database.
	Label = "user"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time field in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time field in the database.
	FieldUpdateTime = "update_time"
	// FieldAuthID holds the string denoting the auth_id field in the database.
	FieldAuthID = "auth_id"
	// FieldFirstName holds the string denoting the first_name field in the database.
	FieldFirstName = "first_name"
	// FieldLastName holds the string denoting the last_name field in the database.
	FieldLastName = "last_name"
	// FieldEmail holds the string denoting the email field in the database.
	FieldEmail = "email"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldRole holds the string denoting the role field in the database.
	FieldRole = "role"
	// FieldDistanceUnit holds the string denoting the distance_unit field in the database.
	FieldDistanceUnit = "distance_unit"

	// EdgeProfilePhoto holds the string denoting the profile_photo edge name in mutations.
	EdgeProfilePhoto = "profile_photo"
	// EdgeGroups holds the string denoting the groups edge name in mutations.
	EdgeGroups = "groups"
	// EdgeOwnedWorkOrders holds the string denoting the owned_work_orders edge name in mutations.
	EdgeOwnedWorkOrders = "owned_work_orders"
	// EdgeAssignedWorkOrders holds the string denoting the assigned_work_orders edge name in mutations.
	EdgeAssignedWorkOrders = "assigned_work_orders"
	// EdgeCreatedProjects holds the string denoting the created_projects edge name in mutations.
	EdgeCreatedProjects = "created_projects"
	// EdgeFeatures holds the string denoting the features edge name in mutations.
	EdgeFeatures = "features"

	// Table holds the table name of the user in the database.
	Table = "users"
	// ProfilePhotoTable is the table the holds the profile_photo relation/edge.
	ProfilePhotoTable = "files"
	// ProfilePhotoInverseTable is the table name for the File entity.
	// It exists in this package in order to avoid circular dependency with the "file" package.
	ProfilePhotoInverseTable = "files"
	// ProfilePhotoColumn is the table column denoting the profile_photo relation/edge.
	ProfilePhotoColumn = "user_profile_photo"
	// GroupsTable is the table the holds the groups relation/edge. The primary key declared below.
	GroupsTable = "users_group_members"
	// GroupsInverseTable is the table name for the UsersGroup entity.
	// It exists in this package in order to avoid circular dependency with the "usersgroup" package.
	GroupsInverseTable = "users_groups"
	// OwnedWorkOrdersTable is the table the holds the owned_work_orders relation/edge.
	OwnedWorkOrdersTable = "work_orders"
	// OwnedWorkOrdersInverseTable is the table name for the WorkOrder entity.
	// It exists in this package in order to avoid circular dependency with the "workorder" package.
	OwnedWorkOrdersInverseTable = "work_orders"
	// OwnedWorkOrdersColumn is the table column denoting the owned_work_orders relation/edge.
	OwnedWorkOrdersColumn = "work_order_owner"
	// AssignedWorkOrdersTable is the table the holds the assigned_work_orders relation/edge.
	AssignedWorkOrdersTable = "work_orders"
	// AssignedWorkOrdersInverseTable is the table name for the WorkOrder entity.
	// It exists in this package in order to avoid circular dependency with the "workorder" package.
	AssignedWorkOrdersInverseTable = "work_orders"
	// AssignedWorkOrdersColumn is the table column denoting the assigned_work_orders relation/edge.
	AssignedWorkOrdersColumn = "work_order_assignee"
	// CreatedProjectsTable is the table the holds the created_projects relation/edge.
	CreatedProjectsTable = "projects"
	// CreatedProjectsInverseTable is the table name for the Project entity.
	// It exists in this package in order to avoid circular dependency with the "project" package.
	CreatedProjectsInverseTable = "projects"
	// CreatedProjectsColumn is the table column denoting the created_projects relation/edge.
	CreatedProjectsColumn = "project_creator"
	// FeaturesTable is the table the holds the features relation/edge. The primary key declared below.
	FeaturesTable = "user_features"
	// FeaturesInverseTable is the table name for the Feature entity.
	// It exists in this package in order to avoid circular dependency with the "feature" package.
	FeaturesInverseTable = "features"
)

// Columns holds all SQL columns for user fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldAuthID,
	FieldFirstName,
	FieldLastName,
	FieldEmail,
	FieldStatus,
	FieldRole,
	FieldDistanceUnit,
}

var (
	// GroupsPrimaryKey and GroupsColumn2 are the table columns denoting the
	// primary key for the groups relation (M2M).
	GroupsPrimaryKey = []string{"users_group_id", "user_id"}
	// FeaturesPrimaryKey and FeaturesColumn2 are the table columns denoting the
	// primary key for the features relation (M2M).
	FeaturesPrimaryKey = []string{"user_id", "feature_id"}
)

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
	Hooks  [3]ent.Hook
	Policy ent.Policy
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime func() time.Time
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime func() time.Time
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime func() time.Time
	// AuthIDValidator is a validator for the "auth_id" field. It is called by the builders before save.
	AuthIDValidator func(string) error
	// FirstNameValidator is a validator for the "first_name" field. It is called by the builders before save.
	FirstNameValidator func(string) error
	// LastNameValidator is a validator for the "last_name" field. It is called by the builders before save.
	LastNameValidator func(string) error
	// EmailValidator is a validator for the "email" field. It is called by the builders before save.
	EmailValidator func(string) error
)

// Status defines the type for the status enum field.
type Status string

// StatusActive is the default Status.
const DefaultStatus = StatusActive

// Status values.
const (
	StatusActive      Status = "ACTIVE"
	StatusDeactivated Status = "DEACTIVATED"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusActive, StatusDeactivated:
		return nil
	default:
		return fmt.Errorf("user: invalid enum value for status field: %q", s)
	}
}

// Role defines the type for the role enum field.
type Role string

// RoleUser is the default Role.
const DefaultRole = RoleUser

// Role values.
const (
	RoleUser  Role = "USER"
	RoleAdmin Role = "ADMIN"
	RoleOwner Role = "OWNER"
)

func (r Role) String() string {
	return string(r)
}

// RoleValidator is a validator for the "role" field enum values. It is called by the builders before save.
func RoleValidator(r Role) error {
	switch r {
	case RoleUser, RoleAdmin, RoleOwner:
		return nil
	default:
		return fmt.Errorf("user: invalid enum value for role field: %q", r)
	}
}

// DistanceUnit defines the type for the distance_unit enum field.
type DistanceUnit string

// DistanceUnitKilometer is the default DistanceUnit.
const DefaultDistanceUnit = DistanceUnitKilometer

// DistanceUnit values.
const (
	DistanceUnitKilometer DistanceUnit = "KILOMETER"
	DistanceUnitMile      DistanceUnit = "MILE"
)

func (du DistanceUnit) String() string {
	return string(du)
}

// DistanceUnitValidator is a validator for the "distance_unit" field enum values. It is called by the builders before save.
func DistanceUnitValidator(du DistanceUnit) error {
	switch du {
	case DistanceUnitKilometer, DistanceUnitMile:
		return nil
	default:
		return fmt.Errorf("user: invalid enum value for distance_unit field: %q", du)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Status) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Status) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*s = Status(str)
	if err := StatusValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Status", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (r Role) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(r.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (r *Role) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*r = Role(str)
	if err := RoleValidator(*r); err != nil {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (du DistanceUnit) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(du.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (du *DistanceUnit) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*du = DistanceUnit(str)
	if err := DistanceUnitValidator(*du); err != nil {
		return fmt.Errorf("%s is not a valid DistanceUnit", str)
	}
	return nil
}
