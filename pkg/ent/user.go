// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/organization"
	"github.com/facebookincubator/symphony/pkg/ent/user"
)

// User is the model entity for the User schema.
type User struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// AuthID holds the value of the "auth_id" field.
	AuthID string `json:"auth_id,omitempty"`
	// FirstName holds the value of the "first_name" field.
	FirstName string `json:"first_name,omitempty"`
	// LastName holds the value of the "last_name" field.
	LastName string `json:"last_name,omitempty"`
	// Email holds the value of the "email" field.
	Email string `json:"email,omitempty"`
	// Status holds the value of the "status" field.
	Status user.Status `json:"status,omitempty"`
	// Role holds the value of the "role" field.
	Role user.Role `json:"role,omitempty"`
	// DistanceUnit holds the value of the "distance_unit" field.
	DistanceUnit user.DistanceUnit `json:"distance_unit,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the UserQuery when eager-loading is set.
	Edges                UserEdges `json:"edges"`
	organization_user_fk *int
}

// UserEdges holds the relations/edges for other nodes in the graph.
type UserEdges struct {
	// ProfilePhoto holds the value of the profile_photo edge.
	ProfilePhoto *File
	// UserCreate holds the value of the User_create edge.
	UserCreate []*Recommendations
	// UserApproved holds the value of the User_approved edge.
	UserApproved []*Recommendations
	// User holds the value of the User edge.
	User []*Execution
	// Groups holds the value of the groups edge.
	Groups []*UsersGroup
	// Organization holds the value of the organization edge.
	Organization *Organization
	// OwnedWorkOrders holds the value of the owned_work_orders edge.
	OwnedWorkOrders []*WorkOrder
	// AssignedWorkOrders holds the value of the assigned_work_orders edge.
	AssignedWorkOrders []*WorkOrder
	// CreatedProjects holds the value of the created_projects edge.
	CreatedProjects []*Project
	// Features holds the value of the features edge.
	Features []*Feature
	// Appointment holds the value of the appointment edge.
	Appointment []*Appointment
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [11]bool
}

// ProfilePhotoOrErr returns the ProfilePhoto value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e UserEdges) ProfilePhotoOrErr() (*File, error) {
	if e.loadedTypes[0] {
		if e.ProfilePhoto == nil {
			// The edge profile_photo was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: file.Label}
		}
		return e.ProfilePhoto, nil
	}
	return nil, &NotLoadedError{edge: "profile_photo"}
}

// UserCreateOrErr returns the UserCreate value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) UserCreateOrErr() ([]*Recommendations, error) {
	if e.loadedTypes[1] {
		return e.UserCreate, nil
	}
	return nil, &NotLoadedError{edge: "User_create"}
}

// UserApprovedOrErr returns the UserApproved value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) UserApprovedOrErr() ([]*Recommendations, error) {
	if e.loadedTypes[2] {
		return e.UserApproved, nil
	}
	return nil, &NotLoadedError{edge: "User_approved"}
}

// UserOrErr returns the User value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) UserOrErr() ([]*Execution, error) {
	if e.loadedTypes[3] {
		return e.User, nil
	}
	return nil, &NotLoadedError{edge: "User"}
}

// GroupsOrErr returns the Groups value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) GroupsOrErr() ([]*UsersGroup, error) {
	if e.loadedTypes[4] {
		return e.Groups, nil
	}
	return nil, &NotLoadedError{edge: "groups"}
}

// OrganizationOrErr returns the Organization value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e UserEdges) OrganizationOrErr() (*Organization, error) {
	if e.loadedTypes[5] {
		if e.Organization == nil {
			// The edge organization was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: organization.Label}
		}
		return e.Organization, nil
	}
	return nil, &NotLoadedError{edge: "organization"}
}

// OwnedWorkOrdersOrErr returns the OwnedWorkOrders value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) OwnedWorkOrdersOrErr() ([]*WorkOrder, error) {
	if e.loadedTypes[6] {
		return e.OwnedWorkOrders, nil
	}
	return nil, &NotLoadedError{edge: "owned_work_orders"}
}

// AssignedWorkOrdersOrErr returns the AssignedWorkOrders value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) AssignedWorkOrdersOrErr() ([]*WorkOrder, error) {
	if e.loadedTypes[7] {
		return e.AssignedWorkOrders, nil
	}
	return nil, &NotLoadedError{edge: "assigned_work_orders"}
}

// CreatedProjectsOrErr returns the CreatedProjects value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) CreatedProjectsOrErr() ([]*Project, error) {
	if e.loadedTypes[8] {
		return e.CreatedProjects, nil
	}
	return nil, &NotLoadedError{edge: "created_projects"}
}

// FeaturesOrErr returns the Features value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) FeaturesOrErr() ([]*Feature, error) {
	if e.loadedTypes[9] {
		return e.Features, nil
	}
	return nil, &NotLoadedError{edge: "features"}
}

// AppointmentOrErr returns the Appointment value or an error if the edge
// was not loaded in eager-loading.
func (e UserEdges) AppointmentOrErr() ([]*Appointment, error) {
	if e.loadedTypes[10] {
		return e.Appointment, nil
	}
	return nil, &NotLoadedError{edge: "appointment"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*User) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // auth_id
		&sql.NullString{}, // first_name
		&sql.NullString{}, // last_name
		&sql.NullString{}, // email
		&sql.NullString{}, // status
		&sql.NullString{}, // role
		&sql.NullString{}, // distance_unit
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*User) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // organization_user_fk
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the User fields.
func (u *User) assignValues(values ...interface{}) error {
	if m, n := len(values), len(user.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	u.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		u.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		u.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field auth_id", values[2])
	} else if value.Valid {
		u.AuthID = value.String
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field first_name", values[3])
	} else if value.Valid {
		u.FirstName = value.String
	}
	if value, ok := values[4].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field last_name", values[4])
	} else if value.Valid {
		u.LastName = value.String
	}
	if value, ok := values[5].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field email", values[5])
	} else if value.Valid {
		u.Email = value.String
	}
	if value, ok := values[6].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field status", values[6])
	} else if value.Valid {
		u.Status = user.Status(value.String)
	}
	if value, ok := values[7].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field role", values[7])
	} else if value.Valid {
		u.Role = user.Role(value.String)
	}
	if value, ok := values[8].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field distance_unit", values[8])
	} else if value.Valid {
		u.DistanceUnit = user.DistanceUnit(value.String)
	}
	values = values[9:]
	if len(values) == len(user.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field organization_user_fk", value)
		} else if value.Valid {
			u.organization_user_fk = new(int)
			*u.organization_user_fk = int(value.Int64)
		}
	}
	return nil
}

// QueryProfilePhoto queries the profile_photo edge of the User.
func (u *User) QueryProfilePhoto() *FileQuery {
	return (&UserClient{config: u.config}).QueryProfilePhoto(u)
}

// QueryUserCreate queries the User_create edge of the User.
func (u *User) QueryUserCreate() *RecommendationsQuery {
	return (&UserClient{config: u.config}).QueryUserCreate(u)
}

// QueryUserApproved queries the User_approved edge of the User.
func (u *User) QueryUserApproved() *RecommendationsQuery {
	return (&UserClient{config: u.config}).QueryUserApproved(u)
}

// QueryUser queries the User edge of the User.
func (u *User) QueryUser() *ExecutionQuery {
	return (&UserClient{config: u.config}).QueryUser(u)
}

// QueryGroups queries the groups edge of the User.
func (u *User) QueryGroups() *UsersGroupQuery {
	return (&UserClient{config: u.config}).QueryGroups(u)
}

// QueryOrganization queries the organization edge of the User.
func (u *User) QueryOrganization() *OrganizationQuery {
	return (&UserClient{config: u.config}).QueryOrganization(u)
}

// QueryOwnedWorkOrders queries the owned_work_orders edge of the User.
func (u *User) QueryOwnedWorkOrders() *WorkOrderQuery {
	return (&UserClient{config: u.config}).QueryOwnedWorkOrders(u)
}

// QueryAssignedWorkOrders queries the assigned_work_orders edge of the User.
func (u *User) QueryAssignedWorkOrders() *WorkOrderQuery {
	return (&UserClient{config: u.config}).QueryAssignedWorkOrders(u)
}

// QueryCreatedProjects queries the created_projects edge of the User.
func (u *User) QueryCreatedProjects() *ProjectQuery {
	return (&UserClient{config: u.config}).QueryCreatedProjects(u)
}

// QueryFeatures queries the features edge of the User.
func (u *User) QueryFeatures() *FeatureQuery {
	return (&UserClient{config: u.config}).QueryFeatures(u)
}

// QueryAppointment queries the appointment edge of the User.
func (u *User) QueryAppointment() *AppointmentQuery {
	return (&UserClient{config: u.config}).QueryAppointment(u)
}

// Update returns a builder for updating this User.
// Note that, you need to call User.Unwrap() before calling this method, if this User
// was returned from a transaction, and the transaction was committed or rolled back.
func (u *User) Update() *UserUpdateOne {
	return (&UserClient{config: u.config}).UpdateOne(u)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (u *User) Unwrap() *User {
	tx, ok := u.config.driver.(*txDriver)
	if !ok {
		panic("ent: User is not a transactional entity")
	}
	u.config.driver = tx.drv
	return u
}

// String implements the fmt.Stringer.
func (u *User) String() string {
	var builder strings.Builder
	builder.WriteString("User(")
	builder.WriteString(fmt.Sprintf("id=%v", u.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(u.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(u.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", auth_id=")
	builder.WriteString(u.AuthID)
	builder.WriteString(", first_name=")
	builder.WriteString(u.FirstName)
	builder.WriteString(", last_name=")
	builder.WriteString(u.LastName)
	builder.WriteString(", email=")
	builder.WriteString(u.Email)
	builder.WriteString(", status=")
	builder.WriteString(fmt.Sprintf("%v", u.Status))
	builder.WriteString(", role=")
	builder.WriteString(fmt.Sprintf("%v", u.Role))
	builder.WriteString(", distance_unit=")
	builder.WriteString(fmt.Sprintf("%v", u.DistanceUnit))
	builder.WriteByte(')')
	return builder.String()
}

// Users is a parsable slice of User.
type Users []*User

func (u Users) config(cfg config) {
	for _i := range u {
		u[_i].config = cfg
	}
}
