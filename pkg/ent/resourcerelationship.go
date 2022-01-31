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
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceRelationship is the model entity for the ResourceRelationship schema.
type ResourceRelationship struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// ResourceRelationshipType holds the value of the "ResourceRelationshipType" field.
	ResourceRelationshipType resourcerelationship.ResourceRelationshipType `json:"ResourceRelationshipType,omitempty"`
	// ResourceRelationshipMultiplicity holds the value of the "ResourceRelationshipMultiplicity" field.
	ResourceRelationshipMultiplicity resourcerelationship.ResourceRelationshipMultiplicity `json:"ResourceRelationshipMultiplicity,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ResourceRelationshipQuery when eager-loading is set.
	Edges                                        ResourceRelationshipEdges `json:"edges"`
	location_type_resource_relationship_location *int
	resource_type_resource_relationship_a        *int
	resource_type_resource_relationship_b        *int
}

// ResourceRelationshipEdges holds the relations/edges for other nodes in the graph.
type ResourceRelationshipEdges struct {
	// Resourcetypea holds the value of the resourcetypea edge.
	Resourcetypea *ResourceType
	// Resourcetypeb holds the value of the resourcetypeb edge.
	Resourcetypeb *ResourceType
	// LocationType holds the value of the locationType edge.
	LocationType *LocationType
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// ResourcetypeaOrErr returns the Resourcetypea value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResourceRelationshipEdges) ResourcetypeaOrErr() (*ResourceType, error) {
	if e.loadedTypes[0] {
		if e.Resourcetypea == nil {
			// The edge resourcetypea was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: resourcetype.Label}
		}
		return e.Resourcetypea, nil
	}
	return nil, &NotLoadedError{edge: "resourcetypea"}
}

// ResourcetypebOrErr returns the Resourcetypeb value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResourceRelationshipEdges) ResourcetypebOrErr() (*ResourceType, error) {
	if e.loadedTypes[1] {
		if e.Resourcetypeb == nil {
			// The edge resourcetypeb was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: resourcetype.Label}
		}
		return e.Resourcetypeb, nil
	}
	return nil, &NotLoadedError{edge: "resourcetypeb"}
}

// LocationTypeOrErr returns the LocationType value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResourceRelationshipEdges) LocationTypeOrErr() (*LocationType, error) {
	if e.loadedTypes[2] {
		if e.LocationType == nil {
			// The edge locationType was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: locationtype.Label}
		}
		return e.LocationType, nil
	}
	return nil, &NotLoadedError{edge: "locationType"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ResourceRelationship) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullString{}, // ResourceRelationshipType
		&sql.NullString{}, // ResourceRelationshipMultiplicity
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*ResourceRelationship) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // location_type_resource_relationship_location
		&sql.NullInt64{}, // resource_type_resource_relationship_a
		&sql.NullInt64{}, // resource_type_resource_relationship_b
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ResourceRelationship fields.
func (rr *ResourceRelationship) assignValues(values ...interface{}) error {
	if m, n := len(values), len(resourcerelationship.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	rr.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		rr.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		rr.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		rr.Name = value.String
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field ResourceRelationshipType", values[3])
	} else if value.Valid {
		rr.ResourceRelationshipType = resourcerelationship.ResourceRelationshipType(value.String)
	}
	if value, ok := values[4].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field ResourceRelationshipMultiplicity", values[4])
	} else if value.Valid {
		rr.ResourceRelationshipMultiplicity = resourcerelationship.ResourceRelationshipMultiplicity(value.String)
	}
	values = values[5:]
	if len(values) == len(resourcerelationship.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field location_type_resource_relationship_location", value)
		} else if value.Valid {
			rr.location_type_resource_relationship_location = new(int)
			*rr.location_type_resource_relationship_location = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field resource_type_resource_relationship_a", value)
		} else if value.Valid {
			rr.resource_type_resource_relationship_a = new(int)
			*rr.resource_type_resource_relationship_a = int(value.Int64)
		}
		if value, ok := values[2].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field resource_type_resource_relationship_b", value)
		} else if value.Valid {
			rr.resource_type_resource_relationship_b = new(int)
			*rr.resource_type_resource_relationship_b = int(value.Int64)
		}
	}
	return nil
}

// QueryResourcetypea queries the resourcetypea edge of the ResourceRelationship.
func (rr *ResourceRelationship) QueryResourcetypea() *ResourceTypeQuery {
	return (&ResourceRelationshipClient{config: rr.config}).QueryResourcetypea(rr)
}

// QueryResourcetypeb queries the resourcetypeb edge of the ResourceRelationship.
func (rr *ResourceRelationship) QueryResourcetypeb() *ResourceTypeQuery {
	return (&ResourceRelationshipClient{config: rr.config}).QueryResourcetypeb(rr)
}

// QueryLocationType queries the locationType edge of the ResourceRelationship.
func (rr *ResourceRelationship) QueryLocationType() *LocationTypeQuery {
	return (&ResourceRelationshipClient{config: rr.config}).QueryLocationType(rr)
}

// Update returns a builder for updating this ResourceRelationship.
// Note that, you need to call ResourceRelationship.Unwrap() before calling this method, if this ResourceRelationship
// was returned from a transaction, and the transaction was committed or rolled back.
func (rr *ResourceRelationship) Update() *ResourceRelationshipUpdateOne {
	return (&ResourceRelationshipClient{config: rr.config}).UpdateOne(rr)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (rr *ResourceRelationship) Unwrap() *ResourceRelationship {
	tx, ok := rr.config.driver.(*txDriver)
	if !ok {
		panic("ent: ResourceRelationship is not a transactional entity")
	}
	rr.config.driver = tx.drv
	return rr
}

// String implements the fmt.Stringer.
func (rr *ResourceRelationship) String() string {
	var builder strings.Builder
	builder.WriteString("ResourceRelationship(")
	builder.WriteString(fmt.Sprintf("id=%v", rr.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(rr.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(rr.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(rr.Name)
	builder.WriteString(", ResourceRelationshipType=")
	builder.WriteString(fmt.Sprintf("%v", rr.ResourceRelationshipType))
	builder.WriteString(", ResourceRelationshipMultiplicity=")
	builder.WriteString(fmt.Sprintf("%v", rr.ResourceRelationshipMultiplicity))
	builder.WriteByte(')')
	return builder.String()
}

// ResourceRelationships is a parsable slice of ResourceRelationship.
type ResourceRelationships []*ResourceRelationship

func (rr ResourceRelationships) config(cfg config) {
	for _i := range rr {
		rr[_i].config = cfg
	}
}
