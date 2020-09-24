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
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowexecutiontemplate"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// FlowInstanceCreate is the builder for creating a FlowInstance entity.
type FlowInstanceCreate struct {
	config
	mutation *FlowInstanceMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (fic *FlowInstanceCreate) SetCreateTime(t time.Time) *FlowInstanceCreate {
	fic.mutation.SetCreateTime(t)
	return fic
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableCreateTime(t *time.Time) *FlowInstanceCreate {
	if t != nil {
		fic.SetCreateTime(*t)
	}
	return fic
}

// SetUpdateTime sets the update_time field.
func (fic *FlowInstanceCreate) SetUpdateTime(t time.Time) *FlowInstanceCreate {
	fic.mutation.SetUpdateTime(t)
	return fic
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableUpdateTime(t *time.Time) *FlowInstanceCreate {
	if t != nil {
		fic.SetUpdateTime(*t)
	}
	return fic
}

// SetStatus sets the status field.
func (fic *FlowInstanceCreate) SetStatus(f flowinstance.Status) *FlowInstanceCreate {
	fic.mutation.SetStatus(f)
	return fic
}

// SetNillableStatus sets the status field if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableStatus(f *flowinstance.Status) *FlowInstanceCreate {
	if f != nil {
		fic.SetStatus(*f)
	}
	return fic
}

// SetOutputParams sets the output_params field.
func (fic *FlowInstanceCreate) SetOutputParams(fv []*flowschema.VariableValue) *FlowInstanceCreate {
	fic.mutation.SetOutputParams(fv)
	return fic
}

// SetIncompletionReason sets the incompletion_reason field.
func (fic *FlowInstanceCreate) SetIncompletionReason(s string) *FlowInstanceCreate {
	fic.mutation.SetIncompletionReason(s)
	return fic
}

// SetNillableIncompletionReason sets the incompletion_reason field if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableIncompletionReason(s *string) *FlowInstanceCreate {
	if s != nil {
		fic.SetIncompletionReason(*s)
	}
	return fic
}

// SetFlowID sets the flow edge to Flow by id.
func (fic *FlowInstanceCreate) SetFlowID(id int) *FlowInstanceCreate {
	fic.mutation.SetFlowID(id)
	return fic
}

// SetNillableFlowID sets the flow edge to Flow by id if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableFlowID(id *int) *FlowInstanceCreate {
	if id != nil {
		fic = fic.SetFlowID(*id)
	}
	return fic
}

// SetFlow sets the flow edge to Flow.
func (fic *FlowInstanceCreate) SetFlow(f *Flow) *FlowInstanceCreate {
	return fic.SetFlowID(f.ID)
}

// SetTemplateID sets the template edge to FlowExecutionTemplate by id.
func (fic *FlowInstanceCreate) SetTemplateID(id int) *FlowInstanceCreate {
	fic.mutation.SetTemplateID(id)
	return fic
}

// SetTemplate sets the template edge to FlowExecutionTemplate.
func (fic *FlowInstanceCreate) SetTemplate(f *FlowExecutionTemplate) *FlowInstanceCreate {
	return fic.SetTemplateID(f.ID)
}

// AddBlockIDs adds the blocks edge to BlockInstance by ids.
func (fic *FlowInstanceCreate) AddBlockIDs(ids ...int) *FlowInstanceCreate {
	fic.mutation.AddBlockIDs(ids...)
	return fic
}

// AddBlocks adds the blocks edges to BlockInstance.
func (fic *FlowInstanceCreate) AddBlocks(b ...*BlockInstance) *FlowInstanceCreate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fic.AddBlockIDs(ids...)
}

// SetParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id.
func (fic *FlowInstanceCreate) SetParentSubflowBlockID(id int) *FlowInstanceCreate {
	fic.mutation.SetParentSubflowBlockID(id)
	return fic
}

// SetNillableParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id if the given value is not nil.
func (fic *FlowInstanceCreate) SetNillableParentSubflowBlockID(id *int) *FlowInstanceCreate {
	if id != nil {
		fic = fic.SetParentSubflowBlockID(*id)
	}
	return fic
}

// SetParentSubflowBlock sets the parent_subflow_block edge to BlockInstance.
func (fic *FlowInstanceCreate) SetParentSubflowBlock(b *BlockInstance) *FlowInstanceCreate {
	return fic.SetParentSubflowBlockID(b.ID)
}

// Mutation returns the FlowInstanceMutation object of the builder.
func (fic *FlowInstanceCreate) Mutation() *FlowInstanceMutation {
	return fic.mutation
}

// Save creates the FlowInstance in the database.
func (fic *FlowInstanceCreate) Save(ctx context.Context) (*FlowInstance, error) {
	var (
		err  error
		node *FlowInstance
	)
	fic.defaults()
	if len(fic.hooks) == 0 {
		if err = fic.check(); err != nil {
			return nil, err
		}
		node, err = fic.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowInstanceMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fic.check(); err != nil {
				return nil, err
			}
			fic.mutation = mutation
			node, err = fic.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fic.hooks) - 1; i >= 0; i-- {
			mut = fic.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fic.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fic *FlowInstanceCreate) SaveX(ctx context.Context) *FlowInstance {
	v, err := fic.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (fic *FlowInstanceCreate) defaults() {
	if _, ok := fic.mutation.CreateTime(); !ok {
		v := flowinstance.DefaultCreateTime()
		fic.mutation.SetCreateTime(v)
	}
	if _, ok := fic.mutation.UpdateTime(); !ok {
		v := flowinstance.DefaultUpdateTime()
		fic.mutation.SetUpdateTime(v)
	}
	if _, ok := fic.mutation.Status(); !ok {
		v := flowinstance.DefaultStatus
		fic.mutation.SetStatus(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fic *FlowInstanceCreate) check() error {
	if _, ok := fic.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := fic.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := fic.mutation.Status(); !ok {
		return &ValidationError{Name: "status", err: errors.New("ent: missing required field \"status\"")}
	}
	if v, ok := fic.mutation.Status(); ok {
		if err := flowinstance.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if _, ok := fic.mutation.TemplateID(); !ok {
		return &ValidationError{Name: "template", err: errors.New("ent: missing required edge \"template\"")}
	}
	return nil
}

func (fic *FlowInstanceCreate) sqlSave(ctx context.Context) (*FlowInstance, error) {
	_node, _spec := fic.createSpec()
	if err := sqlgraph.CreateNode(ctx, fic.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (fic *FlowInstanceCreate) createSpec() (*FlowInstance, *sqlgraph.CreateSpec) {
	var (
		_node = &FlowInstance{config: fic.config}
		_spec = &sqlgraph.CreateSpec{
			Table: flowinstance.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowinstance.FieldID,
			},
		}
	)
	if value, ok := fic.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowinstance.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := fic.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowinstance.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := fic.mutation.Status(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: flowinstance.FieldStatus,
		})
		_node.Status = value
	}
	if value, ok := fic.mutation.OutputParams(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flowinstance.FieldOutputParams,
		})
		_node.OutputParams = value
	}
	if value, ok := fic.mutation.IncompletionReason(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowinstance.FieldIncompletionReason,
		})
		_node.IncompletionReason = value
	}
	if nodes := fic.mutation.FlowIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   flowinstance.FlowTable,
			Columns: []string{flowinstance.FlowColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: flow.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fic.mutation.TemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   flowinstance.TemplateTable,
			Columns: []string{flowinstance.TemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: flowexecutiontemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fic.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowinstance.BlocksTable,
			Columns: []string{flowinstance.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: blockinstance.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fic.mutation.ParentSubflowBlockIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2O,
			Inverse: true,
			Table:   flowinstance.ParentSubflowBlockTable,
			Columns: []string{flowinstance.ParentSubflowBlockColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: blockinstance.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// FlowInstanceCreateBulk is the builder for creating a bulk of FlowInstance entities.
type FlowInstanceCreateBulk struct {
	config
	builders []*FlowInstanceCreate
}

// Save creates the FlowInstance entities in the database.
func (ficb *FlowInstanceCreateBulk) Save(ctx context.Context) ([]*FlowInstance, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ficb.builders))
	nodes := make([]*FlowInstance, len(ficb.builders))
	mutators := make([]Mutator, len(ficb.builders))
	for i := range ficb.builders {
		func(i int, root context.Context) {
			builder := ficb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*FlowInstanceMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ficb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ficb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ficb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ficb *FlowInstanceCreateBulk) SaveX(ctx context.Context) []*FlowInstance {
	v, err := ficb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
