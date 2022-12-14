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
	"github.com/facebookincubator/symphony/pkg/ent/parametercatalog"
	"github.com/facebookincubator/symphony/pkg/ent/propertycategory"
)

// PropertyCategory is the model entity for the PropertyCategory schema.
type PropertyCategory struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Index holds the value of the "index" field.
	Index int `json:"index,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the PropertyCategoryQuery when eager-loading is set.
	Edges                                 PropertyCategoryEdges `json:"edges"`
	parameter_catalog_property_categories *int
}

// PropertyCategoryEdges holds the relations/edges for other nodes in the graph.
type PropertyCategoryEdges struct {
	// PropertiesType holds the value of the properties_type edge.
	PropertiesType []*PropertyType
	// ResourcePropertiesType holds the value of the resource_properties_type edge.
	ResourcePropertiesType []*ResourcePropertyType
	// ParameterCatalog holds the value of the parameter_catalog edge.
	ParameterCatalog *ParameterCatalog
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// PropertiesTypeOrErr returns the PropertiesType value or an error if the edge
// was not loaded in eager-loading.
func (e PropertyCategoryEdges) PropertiesTypeOrErr() ([]*PropertyType, error) {
	if e.loadedTypes[0] {
		return e.PropertiesType, nil
	}
	return nil, &NotLoadedError{edge: "properties_type"}
}

// ResourcePropertiesTypeOrErr returns the ResourcePropertiesType value or an error if the edge
// was not loaded in eager-loading.
func (e PropertyCategoryEdges) ResourcePropertiesTypeOrErr() ([]*ResourcePropertyType, error) {
	if e.loadedTypes[1] {
		return e.ResourcePropertiesType, nil
	}
	return nil, &NotLoadedError{edge: "resource_properties_type"}
}

// ParameterCatalogOrErr returns the ParameterCatalog value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e PropertyCategoryEdges) ParameterCatalogOrErr() (*ParameterCatalog, error) {
	if e.loadedTypes[2] {
		if e.ParameterCatalog == nil {
			// The edge parameter_catalog was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: parametercatalog.Label}
		}
		return e.ParameterCatalog, nil
	}
	return nil, &NotLoadedError{edge: "parameter_catalog"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*PropertyCategory) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullInt64{},  // index
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*PropertyCategory) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // parameter_catalog_property_categories
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the PropertyCategory fields.
func (pc *PropertyCategory) assignValues(values ...interface{}) error {
	if m, n := len(values), len(propertycategory.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	pc.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		pc.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		pc.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		pc.Name = value.String
	}
	if value, ok := values[3].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field index", values[3])
	} else if value.Valid {
		pc.Index = int(value.Int64)
	}
	values = values[4:]
	if len(values) == len(propertycategory.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field parameter_catalog_property_categories", value)
		} else if value.Valid {
			pc.parameter_catalog_property_categories = new(int)
			*pc.parameter_catalog_property_categories = int(value.Int64)
		}
	}
	return nil
}

// QueryPropertiesType queries the properties_type edge of the PropertyCategory.
func (pc *PropertyCategory) QueryPropertiesType() *PropertyTypeQuery {
	return (&PropertyCategoryClient{config: pc.config}).QueryPropertiesType(pc)
}

// QueryResourcePropertiesType queries the resource_properties_type edge of the PropertyCategory.
func (pc *PropertyCategory) QueryResourcePropertiesType() *ResourcePropertyTypeQuery {
	return (&PropertyCategoryClient{config: pc.config}).QueryResourcePropertiesType(pc)
}

// QueryParameterCatalog queries the parameter_catalog edge of the PropertyCategory.
func (pc *PropertyCategory) QueryParameterCatalog() *ParameterCatalogQuery {
	return (&PropertyCategoryClient{config: pc.config}).QueryParameterCatalog(pc)
}

// Update returns a builder for updating this PropertyCategory.
// Note that, you need to call PropertyCategory.Unwrap() before calling this method, if this PropertyCategory
// was returned from a transaction, and the transaction was committed or rolled back.
func (pc *PropertyCategory) Update() *PropertyCategoryUpdateOne {
	return (&PropertyCategoryClient{config: pc.config}).UpdateOne(pc)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (pc *PropertyCategory) Unwrap() *PropertyCategory {
	tx, ok := pc.config.driver.(*txDriver)
	if !ok {
		panic("ent: PropertyCategory is not a transactional entity")
	}
	pc.config.driver = tx.drv
	return pc
}

// String implements the fmt.Stringer.
func (pc *PropertyCategory) String() string {
	var builder strings.Builder
	builder.WriteString("PropertyCategory(")
	builder.WriteString(fmt.Sprintf("id=%v", pc.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(pc.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(pc.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(pc.Name)
	builder.WriteString(", index=")
	builder.WriteString(fmt.Sprintf("%v", pc.Index))
	builder.WriteByte(')')
	return builder.String()
}

// PropertyCategories is a parsable slice of PropertyCategory.
type PropertyCategories []*PropertyCategory

func (pc PropertyCategories) config(cfg config) {
	for _i := range pc {
		pc[_i].config = cfg
	}
}
