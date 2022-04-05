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
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
)

// PropertyTypeValue is the model entity for the PropertyTypeValue schema.
type PropertyTypeValue struct {
	config `gqlgen:"-" json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Deleted holds the value of the "deleted" field.
	Deleted bool `json:"deleted,omitempty" gqlgen:"isDeleted"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the PropertyTypeValueQuery when eager-loading is set.
	Edges                              PropertyTypeValueEdges `json:"edges"`
	property_type_property_type_values *int
}

// PropertyTypeValueEdges holds the relations/edges for other nodes in the graph.
type PropertyTypeValueEdges struct {
	// PropertyType holds the value of the property_type edge.
	PropertyType *PropertyType
	// ParentPropertyTypeValue holds the value of the parent_property_type_value edge.
	ParentPropertyTypeValue []*PropertyTypeValue
	// PropertyTypeValue holds the value of the property_type_value edge.
	PropertyTypeValue []*PropertyTypeValue
	// Property holds the value of the property edge.
	Property []*Property
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [4]bool
}

// PropertyTypeOrErr returns the PropertyType value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e PropertyTypeValueEdges) PropertyTypeOrErr() (*PropertyType, error) {
	if e.loadedTypes[0] {
		if e.PropertyType == nil {
			// The edge property_type was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: propertytype.Label}
		}
		return e.PropertyType, nil
	}
	return nil, &NotLoadedError{edge: "property_type"}
}

// ParentPropertyTypeValueOrErr returns the ParentPropertyTypeValue value or an error if the edge
// was not loaded in eager-loading.
func (e PropertyTypeValueEdges) ParentPropertyTypeValueOrErr() ([]*PropertyTypeValue, error) {
	if e.loadedTypes[1] {
		return e.ParentPropertyTypeValue, nil
	}
	return nil, &NotLoadedError{edge: "parent_property_type_value"}
}

// PropertyTypeValueOrErr returns the PropertyTypeValue value or an error if the edge
// was not loaded in eager-loading.
func (e PropertyTypeValueEdges) PropertyTypeValueOrErr() ([]*PropertyTypeValue, error) {
	if e.loadedTypes[2] {
		return e.PropertyTypeValue, nil
	}
	return nil, &NotLoadedError{edge: "property_type_value"}
}

// PropertyOrErr returns the Property value or an error if the edge
// was not loaded in eager-loading.
func (e PropertyTypeValueEdges) PropertyOrErr() ([]*Property, error) {
	if e.loadedTypes[3] {
		return e.Property, nil
	}
	return nil, &NotLoadedError{edge: "property"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*PropertyTypeValue) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullBool{},   // deleted
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*PropertyTypeValue) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // property_type_property_type_values
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the PropertyTypeValue fields.
func (ptv *PropertyTypeValue) assignValues(values ...interface{}) error {
	if m, n := len(values), len(propertytypevalue.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	ptv.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		ptv.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		ptv.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		ptv.Name = value.String
	}
	if value, ok := values[3].(*sql.NullBool); !ok {
		return fmt.Errorf("unexpected type %T for field deleted", values[3])
	} else if value.Valid {
		ptv.Deleted = value.Bool
	}
	values = values[4:]
	if len(values) == len(propertytypevalue.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field property_type_property_type_values", value)
		} else if value.Valid {
			ptv.property_type_property_type_values = new(int)
			*ptv.property_type_property_type_values = int(value.Int64)
		}
	}
	return nil
}

// QueryPropertyType queries the property_type edge of the PropertyTypeValue.
func (ptv *PropertyTypeValue) QueryPropertyType() *PropertyTypeQuery {
	return (&PropertyTypeValueClient{config: ptv.config}).QueryPropertyType(ptv)
}

// QueryParentPropertyTypeValue queries the parent_property_type_value edge of the PropertyTypeValue.
func (ptv *PropertyTypeValue) QueryParentPropertyTypeValue() *PropertyTypeValueQuery {
	return (&PropertyTypeValueClient{config: ptv.config}).QueryParentPropertyTypeValue(ptv)
}

// QueryPropertyTypeValue queries the property_type_value edge of the PropertyTypeValue.
func (ptv *PropertyTypeValue) QueryPropertyTypeValue() *PropertyTypeValueQuery {
	return (&PropertyTypeValueClient{config: ptv.config}).QueryPropertyTypeValue(ptv)
}

// QueryProperty queries the property edge of the PropertyTypeValue.
func (ptv *PropertyTypeValue) QueryProperty() *PropertyQuery {
	return (&PropertyTypeValueClient{config: ptv.config}).QueryProperty(ptv)
}

// Update returns a builder for updating this PropertyTypeValue.
// Note that, you need to call PropertyTypeValue.Unwrap() before calling this method, if this PropertyTypeValue
// was returned from a transaction, and the transaction was committed or rolled back.
func (ptv *PropertyTypeValue) Update() *PropertyTypeValueUpdateOne {
	return (&PropertyTypeValueClient{config: ptv.config}).UpdateOne(ptv)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (ptv *PropertyTypeValue) Unwrap() *PropertyTypeValue {
	tx, ok := ptv.config.driver.(*txDriver)
	if !ok {
		panic("ent: PropertyTypeValue is not a transactional entity")
	}
	ptv.config.driver = tx.drv
	return ptv
}

// String implements the fmt.Stringer.
func (ptv *PropertyTypeValue) String() string {
	var builder strings.Builder
	builder.WriteString("PropertyTypeValue(")
	builder.WriteString(fmt.Sprintf("id=%v", ptv.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(ptv.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(ptv.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(ptv.Name)
	builder.WriteString(", deleted=")
	builder.WriteString(fmt.Sprintf("%v", ptv.Deleted))
	builder.WriteByte(')')
	return builder.String()
}

// PropertyTypeValues is a parsable slice of PropertyTypeValue.
type PropertyTypeValues []*PropertyTypeValue

func (ptv PropertyTypeValues) config(cfg config) {
	for _i := range ptv {
		ptv[_i].config = cfg
	}
}
