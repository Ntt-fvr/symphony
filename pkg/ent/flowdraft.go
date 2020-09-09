// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// FlowDraft is the model entity for the FlowDraft schema.
type FlowDraft struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Description holds the value of the "description" field.
	Description *string `json:"description,omitempty"`
	// EndParamDefinitions holds the value of the "end_param_definitions" field.
	EndParamDefinitions []*flowschema.VariableDefinition `json:"end_param_definitions,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the FlowDraftQuery when eager-loading is set.
	Edges      FlowDraftEdges `json:"edges"`
	flow_draft *int
}

// FlowDraftEdges holds the relations/edges for other nodes in the graph.
type FlowDraftEdges struct {
	// Blocks holds the value of the blocks edge.
	Blocks []*Block
	// Flow holds the value of the flow edge.
	Flow *Flow
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// BlocksOrErr returns the Blocks value or an error if the edge
// was not loaded in eager-loading.
func (e FlowDraftEdges) BlocksOrErr() ([]*Block, error) {
	if e.loadedTypes[0] {
		return e.Blocks, nil
	}
	return nil, &NotLoadedError{edge: "blocks"}
}

// FlowOrErr returns the Flow value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e FlowDraftEdges) FlowOrErr() (*Flow, error) {
	if e.loadedTypes[1] {
		if e.Flow == nil {
			// The edge flow was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flow.Label}
		}
		return e.Flow, nil
	}
	return nil, &NotLoadedError{edge: "flow"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*FlowDraft) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullString{}, // name
		&sql.NullString{}, // description
		&[]byte{},         // end_param_definitions
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*FlowDraft) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // flow_draft
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the FlowDraft fields.
func (fd *FlowDraft) assignValues(values ...interface{}) error {
	if m, n := len(values), len(flowdraft.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	fd.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[0])
	} else if value.Valid {
		fd.Name = value.String
	}
	if value, ok := values[1].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field description", values[1])
	} else if value.Valid {
		fd.Description = new(string)
		*fd.Description = value.String
	}

	if value, ok := values[2].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field end_param_definitions", values[2])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &fd.EndParamDefinitions); err != nil {
			return fmt.Errorf("unmarshal field end_param_definitions: %v", err)
		}
	}
	values = values[3:]
	if len(values) == len(flowdraft.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field flow_draft", value)
		} else if value.Valid {
			fd.flow_draft = new(int)
			*fd.flow_draft = int(value.Int64)
		}
	}
	return nil
}

// QueryBlocks queries the blocks edge of the FlowDraft.
func (fd *FlowDraft) QueryBlocks() *BlockQuery {
	return (&FlowDraftClient{config: fd.config}).QueryBlocks(fd)
}

// QueryFlow queries the flow edge of the FlowDraft.
func (fd *FlowDraft) QueryFlow() *FlowQuery {
	return (&FlowDraftClient{config: fd.config}).QueryFlow(fd)
}

// Update returns a builder for updating this FlowDraft.
// Note that, you need to call FlowDraft.Unwrap() before calling this method, if this FlowDraft
// was returned from a transaction, and the transaction was committed or rolled back.
func (fd *FlowDraft) Update() *FlowDraftUpdateOne {
	return (&FlowDraftClient{config: fd.config}).UpdateOne(fd)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (fd *FlowDraft) Unwrap() *FlowDraft {
	tx, ok := fd.config.driver.(*txDriver)
	if !ok {
		panic("ent: FlowDraft is not a transactional entity")
	}
	fd.config.driver = tx.drv
	return fd
}

// String implements the fmt.Stringer.
func (fd *FlowDraft) String() string {
	var builder strings.Builder
	builder.WriteString("FlowDraft(")
	builder.WriteString(fmt.Sprintf("id=%v", fd.ID))
	builder.WriteString(", name=")
	builder.WriteString(fd.Name)
	if v := fd.Description; v != nil {
		builder.WriteString(", description=")
		builder.WriteString(*v)
	}
	builder.WriteString(", end_param_definitions=")
	builder.WriteString(fmt.Sprintf("%v", fd.EndParamDefinitions))
	builder.WriteByte(')')
	return builder.String()
}

// FlowDrafts is a parsable slice of FlowDraft.
type FlowDrafts []*FlowDraft

func (fd FlowDrafts) config(cfg config) {
	for _i := range fd {
		fd[_i].config = cfg
	}
}
