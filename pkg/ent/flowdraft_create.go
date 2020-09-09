// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
)

// FlowDraftCreate is the builder for creating a FlowDraft entity.
type FlowDraftCreate struct {
	config
	mutation *FlowDraftMutation
	hooks    []Hook
}

// SetName sets the name field.
func (fdc *FlowDraftCreate) SetName(s string) *FlowDraftCreate {
	fdc.mutation.SetName(s)
	return fdc
}

// SetDescription sets the description field.
func (fdc *FlowDraftCreate) SetDescription(s string) *FlowDraftCreate {
	fdc.mutation.SetDescription(s)
	return fdc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (fdc *FlowDraftCreate) SetNillableDescription(s *string) *FlowDraftCreate {
	if s != nil {
		fdc.SetDescription(*s)
	}
	return fdc
}

// AddBlockIDs adds the blocks edge to Block by ids.
func (fdc *FlowDraftCreate) AddBlockIDs(ids ...int) *FlowDraftCreate {
	fdc.mutation.AddBlockIDs(ids...)
	return fdc
}

// AddBlocks adds the blocks edges to Block.
func (fdc *FlowDraftCreate) AddBlocks(b ...*Block) *FlowDraftCreate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fdc.AddBlockIDs(ids...)
}

// Mutation returns the FlowDraftMutation object of the builder.
func (fdc *FlowDraftCreate) Mutation() *FlowDraftMutation {
	return fdc.mutation
}

// Save creates the FlowDraft in the database.
func (fdc *FlowDraftCreate) Save(ctx context.Context) (*FlowDraft, error) {
	if err := fdc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *FlowDraft
	)
	if len(fdc.hooks) == 0 {
		node, err = fdc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowDraftMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			fdc.mutation = mutation
			node, err = fdc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fdc.hooks) - 1; i >= 0; i-- {
			mut = fdc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fdc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fdc *FlowDraftCreate) SaveX(ctx context.Context) *FlowDraft {
	v, err := fdc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fdc *FlowDraftCreate) preSave() error {
	if _, ok := fdc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := fdc.mutation.Name(); ok {
		if err := flowdraft.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fdc *FlowDraftCreate) sqlSave(ctx context.Context) (*FlowDraft, error) {
	fd, _spec := fdc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fdc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	fd.ID = int(id)
	return fd, nil
}

func (fdc *FlowDraftCreate) createSpec() (*FlowDraft, *sqlgraph.CreateSpec) {
	var (
		fd    = &FlowDraft{config: fdc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: flowdraft.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowdraft.FieldID,
			},
		}
	)
	if value, ok := fdc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowdraft.FieldName,
		})
		fd.Name = value
	}
	if value, ok := fdc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowdraft.FieldDescription,
		})
		fd.Description = &value
	}
	if nodes := fdc.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowdraft.BlocksTable,
			Columns: []string{flowdraft.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: block.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return fd, _spec
}

// FlowDraftCreateBulk is the builder for creating a bulk of FlowDraft entities.
type FlowDraftCreateBulk struct {
	config
	builders []*FlowDraftCreate
}

// Save creates the FlowDraft entities in the database.
func (fdcb *FlowDraftCreateBulk) Save(ctx context.Context) ([]*FlowDraft, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fdcb.builders))
	nodes := make([]*FlowDraft, len(fdcb.builders))
	mutators := make([]Mutator, len(fdcb.builders))
	for i := range fdcb.builders {
		func(i int, root context.Context) {
			builder := fdcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*FlowDraftMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, fdcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, fdcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
						if cerr, ok := isSQLConstraintError(err); ok {
							err = cerr
						}
					}
				}
				mutation.done = true
				if err != nil {
					return nil, err
				}
				id := specs[i].ID.Value.(int64)
				nodes[i].ID = int(id)
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, fdcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (fdcb *FlowDraftCreateBulk) SaveX(ctx context.Context) []*FlowDraft {
	v, err := fdcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}