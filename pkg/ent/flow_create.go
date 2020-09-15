// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// FlowCreate is the builder for creating a Flow entity.
type FlowCreate struct {
	config
	mutation *FlowMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (fc *FlowCreate) SetCreateTime(t time.Time) *FlowCreate {
	fc.mutation.SetCreateTime(t)
	return fc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fc *FlowCreate) SetNillableCreateTime(t *time.Time) *FlowCreate {
	if t != nil {
		fc.SetCreateTime(*t)
	}
	return fc
}

// SetUpdateTime sets the update_time field.
func (fc *FlowCreate) SetUpdateTime(t time.Time) *FlowCreate {
	fc.mutation.SetUpdateTime(t)
	return fc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fc *FlowCreate) SetNillableUpdateTime(t *time.Time) *FlowCreate {
	if t != nil {
		fc.SetUpdateTime(*t)
	}
	return fc
}

// SetName sets the name field.
func (fc *FlowCreate) SetName(s string) *FlowCreate {
	fc.mutation.SetName(s)
	return fc
}

// SetDescription sets the description field.
func (fc *FlowCreate) SetDescription(s string) *FlowCreate {
	fc.mutation.SetDescription(s)
	return fc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (fc *FlowCreate) SetNillableDescription(s *string) *FlowCreate {
	if s != nil {
		fc.SetDescription(*s)
	}
	return fc
}

// SetEndParamDefinitions sets the end_param_definitions field.
func (fc *FlowCreate) SetEndParamDefinitions(fd []*flowschema.VariableDefinition) *FlowCreate {
	fc.mutation.SetEndParamDefinitions(fd)
	return fc
}

// SetStatus sets the status field.
func (fc *FlowCreate) SetStatus(f flow.Status) *FlowCreate {
	fc.mutation.SetStatus(f)
	return fc
}

// SetNillableStatus sets the status field if the given value is not nil.
func (fc *FlowCreate) SetNillableStatus(f *flow.Status) *FlowCreate {
	if f != nil {
		fc.SetStatus(*f)
	}
	return fc
}

// AddBlockIDs adds the blocks edge to Block by ids.
func (fc *FlowCreate) AddBlockIDs(ids ...int) *FlowCreate {
	fc.mutation.AddBlockIDs(ids...)
	return fc
}

// AddBlocks adds the blocks edges to Block.
func (fc *FlowCreate) AddBlocks(b ...*Block) *FlowCreate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fc.AddBlockIDs(ids...)
}

// AddDraftIDs adds the draft edge to FlowDraft by ids.
func (fc *FlowCreate) AddDraftIDs(ids ...int) *FlowCreate {
	fc.mutation.AddDraftIDs(ids...)
	return fc
}

// AddDraft adds the draft edges to FlowDraft.
func (fc *FlowCreate) AddDraft(f ...*FlowDraft) *FlowCreate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return fc.AddDraftIDs(ids...)
}

// Mutation returns the FlowMutation object of the builder.
func (fc *FlowCreate) Mutation() *FlowMutation {
	return fc.mutation
}

// Save creates the Flow in the database.
func (fc *FlowCreate) Save(ctx context.Context) (*Flow, error) {
	if err := fc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *Flow
	)
	if len(fc.hooks) == 0 {
		node, err = fc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			fc.mutation = mutation
			node, err = fc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fc.hooks) - 1; i >= 0; i-- {
			mut = fc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fc *FlowCreate) SaveX(ctx context.Context) *Flow {
	v, err := fc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fc *FlowCreate) preSave() error {
	if _, ok := fc.mutation.CreateTime(); !ok {
		v := flow.DefaultCreateTime()
		fc.mutation.SetCreateTime(v)
	}
	if _, ok := fc.mutation.UpdateTime(); !ok {
		v := flow.DefaultUpdateTime()
		fc.mutation.SetUpdateTime(v)
	}
	if _, ok := fc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := fc.mutation.Name(); ok {
		if err := flow.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := fc.mutation.Status(); !ok {
		v := flow.DefaultStatus
		fc.mutation.SetStatus(v)
	}
	if v, ok := fc.mutation.Status(); ok {
		if err := flow.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	return nil
}

func (fc *FlowCreate) sqlSave(ctx context.Context) (*Flow, error) {
	f, _spec := fc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	f.ID = int(id)
	return f, nil
}

func (fc *FlowCreate) createSpec() (*Flow, *sqlgraph.CreateSpec) {
	var (
		f     = &Flow{config: fc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: flow.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flow.FieldID,
			},
		}
	)
	if value, ok := fc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flow.FieldCreateTime,
		})
		f.CreateTime = value
	}
	if value, ok := fc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flow.FieldUpdateTime,
		})
		f.UpdateTime = value
	}
	if value, ok := fc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flow.FieldName,
		})
		f.Name = value
	}
	if value, ok := fc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flow.FieldDescription,
		})
		f.Description = &value
	}
	if value, ok := fc.mutation.EndParamDefinitions(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flow.FieldEndParamDefinitions,
		})
		f.EndParamDefinitions = value
	}
	if value, ok := fc.mutation.Status(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: flow.FieldStatus,
		})
		f.Status = value
	}
	if nodes := fc.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flow.BlocksTable,
			Columns: []string{flow.BlocksColumn},
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
	if nodes := fc.mutation.DraftIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flow.DraftTable,
			Columns: []string{flow.DraftColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: flowdraft.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return f, _spec
}

// FlowCreateBulk is the builder for creating a bulk of Flow entities.
type FlowCreateBulk struct {
	config
	builders []*FlowCreate
}

// Save creates the Flow entities in the database.
func (fcb *FlowCreateBulk) Save(ctx context.Context) ([]*Flow, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fcb.builders))
	nodes := make([]*Flow, len(fcb.builders))
	mutators := make([]Mutator, len(fcb.builders))
	for i := range fcb.builders {
		func(i int, root context.Context) {
			builder := fcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*FlowMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, fcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, fcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, fcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (fcb *FlowCreateBulk) SaveX(ctx context.Context) []*Flow {
	v, err := fcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
