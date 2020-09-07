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
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
)

// Block is the model entity for the Block schema.
type Block struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Type holds the value of the "type" field.
	Type block.Type `json:"type,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the BlockQuery when eager-loading is set.
	Edges             BlockEdges `json:"edges"`
	block_goto_block  *int
	flow_draft_blocks *int
}

// BlockEdges holds the relations/edges for other nodes in the graph.
type BlockEdges struct {
	// PrevBlocks holds the value of the prev_blocks edge.
	PrevBlocks []*Block
	// NextBlocks holds the value of the next_blocks edge.
	NextBlocks []*Block
	// FlowDraft holds the value of the flow_draft edge.
	FlowDraft *FlowDraft
	// SourceBlock holds the value of the source_block edge.
	SourceBlock []*Block
	// GotoBlock holds the value of the goto_block edge.
	GotoBlock *Block
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [5]bool
}

// PrevBlocksOrErr returns the PrevBlocks value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) PrevBlocksOrErr() ([]*Block, error) {
	if e.loadedTypes[0] {
		return e.PrevBlocks, nil
	}
	return nil, &NotLoadedError{edge: "prev_blocks"}
}

// NextBlocksOrErr returns the NextBlocks value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) NextBlocksOrErr() ([]*Block, error) {
	if e.loadedTypes[1] {
		return e.NextBlocks, nil
	}
	return nil, &NotLoadedError{edge: "next_blocks"}
}

// FlowDraftOrErr returns the FlowDraft value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) FlowDraftOrErr() (*FlowDraft, error) {
	if e.loadedTypes[2] {
		if e.FlowDraft == nil {
			// The edge flow_draft was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: flowdraft.Label}
		}
		return e.FlowDraft, nil
	}
	return nil, &NotLoadedError{edge: "flow_draft"}
}

// SourceBlockOrErr returns the SourceBlock value or an error if the edge
// was not loaded in eager-loading.
func (e BlockEdges) SourceBlockOrErr() ([]*Block, error) {
	if e.loadedTypes[3] {
		return e.SourceBlock, nil
	}
	return nil, &NotLoadedError{edge: "source_block"}
}

// GotoBlockOrErr returns the GotoBlock value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BlockEdges) GotoBlockOrErr() (*Block, error) {
	if e.loadedTypes[4] {
		if e.GotoBlock == nil {
			// The edge goto_block was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: block.Label}
		}
		return e.GotoBlock, nil
	}
	return nil, &NotLoadedError{edge: "goto_block"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Block) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullString{}, // type
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*Block) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // block_goto_block
		&sql.NullInt64{}, // flow_draft_blocks
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Block fields.
func (b *Block) assignValues(values ...interface{}) error {
	if m, n := len(values), len(block.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	b.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		b.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		b.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		b.Name = value.String
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field type", values[3])
	} else if value.Valid {
		b.Type = block.Type(value.String)
	}
	values = values[4:]
	if len(values) == len(block.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field block_goto_block", value)
		} else if value.Valid {
			b.block_goto_block = new(int)
			*b.block_goto_block = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field flow_draft_blocks", value)
		} else if value.Valid {
			b.flow_draft_blocks = new(int)
			*b.flow_draft_blocks = int(value.Int64)
		}
	}
	return nil
}

// QueryPrevBlocks queries the prev_blocks edge of the Block.
func (b *Block) QueryPrevBlocks() *BlockQuery {
	return (&BlockClient{config: b.config}).QueryPrevBlocks(b)
}

// QueryNextBlocks queries the next_blocks edge of the Block.
func (b *Block) QueryNextBlocks() *BlockQuery {
	return (&BlockClient{config: b.config}).QueryNextBlocks(b)
}

// QueryFlowDraft queries the flow_draft edge of the Block.
func (b *Block) QueryFlowDraft() *FlowDraftQuery {
	return (&BlockClient{config: b.config}).QueryFlowDraft(b)
}

// QuerySourceBlock queries the source_block edge of the Block.
func (b *Block) QuerySourceBlock() *BlockQuery {
	return (&BlockClient{config: b.config}).QuerySourceBlock(b)
}

// QueryGotoBlock queries the goto_block edge of the Block.
func (b *Block) QueryGotoBlock() *BlockQuery {
	return (&BlockClient{config: b.config}).QueryGotoBlock(b)
}

// Update returns a builder for updating this Block.
// Note that, you need to call Block.Unwrap() before calling this method, if this Block
// was returned from a transaction, and the transaction was committed or rolled back.
func (b *Block) Update() *BlockUpdateOne {
	return (&BlockClient{config: b.config}).UpdateOne(b)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (b *Block) Unwrap() *Block {
	tx, ok := b.config.driver.(*txDriver)
	if !ok {
		panic("ent: Block is not a transactional entity")
	}
	b.config.driver = tx.drv
	return b
}

// String implements the fmt.Stringer.
func (b *Block) String() string {
	var builder strings.Builder
	builder.WriteString("Block(")
	builder.WriteString(fmt.Sprintf("id=%v", b.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(b.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(b.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(b.Name)
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", b.Type))
	builder.WriteByte(')')
	return builder.String()
}

// Blocks is a parsable slice of Block.
type Blocks []*Block

func (b Blocks) config(cfg config) {
	for _i := range b {
		b[_i].config = cfg
	}
}
