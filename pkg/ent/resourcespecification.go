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
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceSpecification is the model entity for the ResourceSpecification schema.
type ResourceSpecification struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Quantity holds the value of the "quantity" field.
	Quantity int `json:"quantity,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ResourceSpecificationQuery when eager-loading is set.
	Edges                                ResourceSpecificationEdges `json:"edges"`
	resource_type_resource_specification *int
}

// ResourceSpecificationEdges holds the relations/edges for other nodes in the graph.
type ResourceSpecificationEdges struct {
	// Resourcetype holds the value of the resourcetype edge.
	Resourcetype *ResourceType
	// ResourcePropertyType holds the value of the resource_property_type edge.
	ResourcePropertyType []*ResourcePropertyType
	// ResourceSpecification holds the value of the resource_specification edge.
	ResourceSpecification []*ResourceSpecificationRelationship
	// ResourceSpecificationItems holds the value of the resource_specification_items edge.
	ResourceSpecificationItems []*ResourceSpecificationItems
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [4]bool
}

// ResourcetypeOrErr returns the Resourcetype value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResourceSpecificationEdges) ResourcetypeOrErr() (*ResourceType, error) {
	if e.loadedTypes[0] {
		if e.Resourcetype == nil {
			// The edge resourcetype was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: resourcetype.Label}
		}
		return e.Resourcetype, nil
	}
	return nil, &NotLoadedError{edge: "resourcetype"}
}

// ResourcePropertyTypeOrErr returns the ResourcePropertyType value or an error if the edge
// was not loaded in eager-loading.
func (e ResourceSpecificationEdges) ResourcePropertyTypeOrErr() ([]*ResourcePropertyType, error) {
	if e.loadedTypes[1] {
		return e.ResourcePropertyType, nil
	}
	return nil, &NotLoadedError{edge: "resource_property_type"}
}

// ResourceSpecificationOrErr returns the ResourceSpecification value or an error if the edge
// was not loaded in eager-loading.
func (e ResourceSpecificationEdges) ResourceSpecificationOrErr() ([]*ResourceSpecificationRelationship, error) {
	if e.loadedTypes[2] {
		return e.ResourceSpecification, nil
	}
	return nil, &NotLoadedError{edge: "resource_specification"}
}

// ResourceSpecificationItemsOrErr returns the ResourceSpecificationItems value or an error if the edge
// was not loaded in eager-loading.
func (e ResourceSpecificationEdges) ResourceSpecificationItemsOrErr() ([]*ResourceSpecificationItems, error) {
	if e.loadedTypes[3] {
		return e.ResourceSpecificationItems, nil
	}
	return nil, &NotLoadedError{edge: "resource_specification_items"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ResourceSpecification) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullInt64{},  // quantity
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*ResourceSpecification) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // resource_type_resource_specification
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ResourceSpecification fields.
func (rs *ResourceSpecification) assignValues(values ...interface{}) error {
	if m, n := len(values), len(resourcespecification.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	rs.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		rs.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		rs.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		rs.Name = value.String
	}
	if value, ok := values[3].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field quantity", values[3])
	} else if value.Valid {
		rs.Quantity = int(value.Int64)
	}
	values = values[4:]
	if len(values) == len(resourcespecification.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field resource_type_resource_specification", value)
		} else if value.Valid {
			rs.resource_type_resource_specification = new(int)
			*rs.resource_type_resource_specification = int(value.Int64)
		}
	}
	return nil
}

// QueryResourcetype queries the resourcetype edge of the ResourceSpecification.
func (rs *ResourceSpecification) QueryResourcetype() *ResourceTypeQuery {
	return (&ResourceSpecificationClient{config: rs.config}).QueryResourcetype(rs)
}

// QueryResourcePropertyType queries the resource_property_type edge of the ResourceSpecification.
func (rs *ResourceSpecification) QueryResourcePropertyType() *ResourcePropertyTypeQuery {
	return (&ResourceSpecificationClient{config: rs.config}).QueryResourcePropertyType(rs)
}

// QueryResourceSpecification queries the resource_specification edge of the ResourceSpecification.
func (rs *ResourceSpecification) QueryResourceSpecification() *ResourceSpecificationRelationshipQuery {
	return (&ResourceSpecificationClient{config: rs.config}).QueryResourceSpecification(rs)
}

// QueryResourceSpecificationItems queries the resource_specification_items edge of the ResourceSpecification.
func (rs *ResourceSpecification) QueryResourceSpecificationItems() *ResourceSpecificationItemsQuery {
	return (&ResourceSpecificationClient{config: rs.config}).QueryResourceSpecificationItems(rs)
}

// Update returns a builder for updating this ResourceSpecification.
// Note that, you need to call ResourceSpecification.Unwrap() before calling this method, if this ResourceSpecification
// was returned from a transaction, and the transaction was committed or rolled back.
func (rs *ResourceSpecification) Update() *ResourceSpecificationUpdateOne {
	return (&ResourceSpecificationClient{config: rs.config}).UpdateOne(rs)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (rs *ResourceSpecification) Unwrap() *ResourceSpecification {
	tx, ok := rs.config.driver.(*txDriver)
	if !ok {
		panic("ent: ResourceSpecification is not a transactional entity")
	}
	rs.config.driver = tx.drv
	return rs
}

// String implements the fmt.Stringer.
func (rs *ResourceSpecification) String() string {
	var builder strings.Builder
	builder.WriteString("ResourceSpecification(")
	builder.WriteString(fmt.Sprintf("id=%v", rs.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(rs.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(rs.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(rs.Name)
	builder.WriteString(", quantity=")
	builder.WriteString(fmt.Sprintf("%v", rs.Quantity))
	builder.WriteByte(')')
	return builder.String()
}

// ResourceSpecifications is a parsable slice of ResourceSpecification.
type ResourceSpecifications []*ResourceSpecification

func (rs ResourceSpecifications) config(cfg config) {
	for _i := range rs {
		rs[_i].config = cfg
	}
}
