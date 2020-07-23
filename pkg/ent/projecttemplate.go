// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
)

// ProjectTemplate is the model entity for the ProjectTemplate schema.
type ProjectTemplate struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Description holds the value of the "description" field.
	Description *string `json:"description,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ProjectTemplateQuery when eager-loading is set.
	Edges                 ProjectTemplateEdges `json:"edges"`
	project_template_type *int
}

// ProjectTemplateEdges holds the relations/edges for other nodes in the graph.
type ProjectTemplateEdges struct {
	// Properties holds the value of the properties edge.
	Properties []*PropertyType `gqlgen:"properties"`
	// WorkOrders holds the value of the work_orders edge.
	WorkOrders []*WorkOrderDefinition `gqlgen:"workOrders"`
	// Type holds the value of the type edge.
	Type *ProjectType
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// PropertiesOrErr returns the Properties value or an error if the edge
// was not loaded in eager-loading.
func (e ProjectTemplateEdges) PropertiesOrErr() ([]*PropertyType, error) {
	if e.loadedTypes[0] {
		return e.Properties, nil
	}
	return nil, &NotLoadedError{edge: "properties"}
}

// WorkOrdersOrErr returns the WorkOrders value or an error if the edge
// was not loaded in eager-loading.
func (e ProjectTemplateEdges) WorkOrdersOrErr() ([]*WorkOrderDefinition, error) {
	if e.loadedTypes[1] {
		return e.WorkOrders, nil
	}
	return nil, &NotLoadedError{edge: "work_orders"}
}

// TypeOrErr returns the Type value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ProjectTemplateEdges) TypeOrErr() (*ProjectType, error) {
	if e.loadedTypes[2] {
		if e.Type == nil {
			// The edge type was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: projecttype.Label}
		}
		return e.Type, nil
	}
	return nil, &NotLoadedError{edge: "type"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ProjectTemplate) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullString{}, // name
		&sql.NullString{}, // description
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*ProjectTemplate) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // project_template_type
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ProjectTemplate fields.
func (pt *ProjectTemplate) assignValues(values ...interface{}) error {
	if m, n := len(values), len(projecttemplate.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	pt.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[0])
	} else if value.Valid {
		pt.Name = value.String
	}
	if value, ok := values[1].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field description", values[1])
	} else if value.Valid {
		pt.Description = new(string)
		*pt.Description = value.String
	}
	values = values[2:]
	if len(values) == len(projecttemplate.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field project_template_type", value)
		} else if value.Valid {
			pt.project_template_type = new(int)
			*pt.project_template_type = int(value.Int64)
		}
	}
	return nil
}

// QueryProperties queries the properties edge of the ProjectTemplate.
func (pt *ProjectTemplate) QueryProperties() *PropertyTypeQuery {
	return (&ProjectTemplateClient{config: pt.config}).QueryProperties(pt)
}

// QueryWorkOrders queries the work_orders edge of the ProjectTemplate.
func (pt *ProjectTemplate) QueryWorkOrders() *WorkOrderDefinitionQuery {
	return (&ProjectTemplateClient{config: pt.config}).QueryWorkOrders(pt)
}

// QueryType queries the type edge of the ProjectTemplate.
func (pt *ProjectTemplate) QueryType() *ProjectTypeQuery {
	return (&ProjectTemplateClient{config: pt.config}).QueryType(pt)
}

// Update returns a builder for updating this ProjectTemplate.
// Note that, you need to call ProjectTemplate.Unwrap() before calling this method, if this ProjectTemplate
// was returned from a transaction, and the transaction was committed or rolled back.
func (pt *ProjectTemplate) Update() *ProjectTemplateUpdateOne {
	return (&ProjectTemplateClient{config: pt.config}).UpdateOne(pt)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (pt *ProjectTemplate) Unwrap() *ProjectTemplate {
	tx, ok := pt.config.driver.(*txDriver)
	if !ok {
		panic("ent: ProjectTemplate is not a transactional entity")
	}
	pt.config.driver = tx.drv
	return pt
}

// String implements the fmt.Stringer.
func (pt *ProjectTemplate) String() string {
	var builder strings.Builder
	builder.WriteString("ProjectTemplate(")
	builder.WriteString(fmt.Sprintf("id=%v", pt.ID))
	builder.WriteString(", name=")
	builder.WriteString(pt.Name)
	if v := pt.Description; v != nil {
		builder.WriteString(", description=")
		builder.WriteString(*v)
	}
	builder.WriteByte(')')
	return builder.String()
}

// ProjectTemplates is a parsable slice of ProjectTemplate.
type ProjectTemplates []*ProjectTemplate

func (pt ProjectTemplates) config(cfg config) {
	for _i := range pt {
		pt[_i].config = cfg
	}
}
