// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowexecutiontemplate"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// FlowInstanceUpdate is the builder for updating FlowInstance entities.
type FlowInstanceUpdate struct {
	config
	hooks    []Hook
	mutation *FlowInstanceMutation
}

// Where adds a new predicate for the builder.
func (fiu *FlowInstanceUpdate) Where(ps ...predicate.FlowInstance) *FlowInstanceUpdate {
	fiu.mutation.predicates = append(fiu.mutation.predicates, ps...)
	return fiu
}

// SetStatus sets the status field.
func (fiu *FlowInstanceUpdate) SetStatus(f flowinstance.Status) *FlowInstanceUpdate {
	fiu.mutation.SetStatus(f)
	return fiu
}

// SetNillableStatus sets the status field if the given value is not nil.
func (fiu *FlowInstanceUpdate) SetNillableStatus(f *flowinstance.Status) *FlowInstanceUpdate {
	if f != nil {
		fiu.SetStatus(*f)
	}
	return fiu
}

// SetOutputParams sets the output_params field.
func (fiu *FlowInstanceUpdate) SetOutputParams(fv []*flowschema.VariableValue) *FlowInstanceUpdate {
	fiu.mutation.SetOutputParams(fv)
	return fiu
}

// ClearOutputParams clears the value of output_params.
func (fiu *FlowInstanceUpdate) ClearOutputParams() *FlowInstanceUpdate {
	fiu.mutation.ClearOutputParams()
	return fiu
}

// SetIncompletionReason sets the incompletion_reason field.
func (fiu *FlowInstanceUpdate) SetIncompletionReason(s string) *FlowInstanceUpdate {
	fiu.mutation.SetIncompletionReason(s)
	return fiu
}

// SetNillableIncompletionReason sets the incompletion_reason field if the given value is not nil.
func (fiu *FlowInstanceUpdate) SetNillableIncompletionReason(s *string) *FlowInstanceUpdate {
	if s != nil {
		fiu.SetIncompletionReason(*s)
	}
	return fiu
}

// ClearIncompletionReason clears the value of incompletion_reason.
func (fiu *FlowInstanceUpdate) ClearIncompletionReason() *FlowInstanceUpdate {
	fiu.mutation.ClearIncompletionReason()
	return fiu
}

// SetFlowID sets the flow edge to Flow by id.
func (fiu *FlowInstanceUpdate) SetFlowID(id int) *FlowInstanceUpdate {
	fiu.mutation.SetFlowID(id)
	return fiu
}

// SetNillableFlowID sets the flow edge to Flow by id if the given value is not nil.
func (fiu *FlowInstanceUpdate) SetNillableFlowID(id *int) *FlowInstanceUpdate {
	if id != nil {
		fiu = fiu.SetFlowID(*id)
	}
	return fiu
}

// SetFlow sets the flow edge to Flow.
func (fiu *FlowInstanceUpdate) SetFlow(f *Flow) *FlowInstanceUpdate {
	return fiu.SetFlowID(f.ID)
}

// SetTemplateID sets the template edge to FlowExecutionTemplate by id.
func (fiu *FlowInstanceUpdate) SetTemplateID(id int) *FlowInstanceUpdate {
	fiu.mutation.SetTemplateID(id)
	return fiu
}

// SetTemplate sets the template edge to FlowExecutionTemplate.
func (fiu *FlowInstanceUpdate) SetTemplate(f *FlowExecutionTemplate) *FlowInstanceUpdate {
	return fiu.SetTemplateID(f.ID)
}

// AddBlockIDs adds the blocks edge to BlockInstance by ids.
func (fiu *FlowInstanceUpdate) AddBlockIDs(ids ...int) *FlowInstanceUpdate {
	fiu.mutation.AddBlockIDs(ids...)
	return fiu
}

// AddBlocks adds the blocks edges to BlockInstance.
func (fiu *FlowInstanceUpdate) AddBlocks(b ...*BlockInstance) *FlowInstanceUpdate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fiu.AddBlockIDs(ids...)
}

// SetParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id.
func (fiu *FlowInstanceUpdate) SetParentSubflowBlockID(id int) *FlowInstanceUpdate {
	fiu.mutation.SetParentSubflowBlockID(id)
	return fiu
}

// SetNillableParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id if the given value is not nil.
func (fiu *FlowInstanceUpdate) SetNillableParentSubflowBlockID(id *int) *FlowInstanceUpdate {
	if id != nil {
		fiu = fiu.SetParentSubflowBlockID(*id)
	}
	return fiu
}

// SetParentSubflowBlock sets the parent_subflow_block edge to BlockInstance.
func (fiu *FlowInstanceUpdate) SetParentSubflowBlock(b *BlockInstance) *FlowInstanceUpdate {
	return fiu.SetParentSubflowBlockID(b.ID)
}

// Mutation returns the FlowInstanceMutation object of the builder.
func (fiu *FlowInstanceUpdate) Mutation() *FlowInstanceMutation {
	return fiu.mutation
}

// ClearFlow clears the "flow" edge to type Flow.
func (fiu *FlowInstanceUpdate) ClearFlow() *FlowInstanceUpdate {
	fiu.mutation.ClearFlow()
	return fiu
}

// ClearTemplate clears the "template" edge to type FlowExecutionTemplate.
func (fiu *FlowInstanceUpdate) ClearTemplate() *FlowInstanceUpdate {
	fiu.mutation.ClearTemplate()
	return fiu
}

// ClearBlocks clears all "blocks" edges to type BlockInstance.
func (fiu *FlowInstanceUpdate) ClearBlocks() *FlowInstanceUpdate {
	fiu.mutation.ClearBlocks()
	return fiu
}

// RemoveBlockIDs removes the blocks edge to BlockInstance by ids.
func (fiu *FlowInstanceUpdate) RemoveBlockIDs(ids ...int) *FlowInstanceUpdate {
	fiu.mutation.RemoveBlockIDs(ids...)
	return fiu
}

// RemoveBlocks removes blocks edges to BlockInstance.
func (fiu *FlowInstanceUpdate) RemoveBlocks(b ...*BlockInstance) *FlowInstanceUpdate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fiu.RemoveBlockIDs(ids...)
}

// ClearParentSubflowBlock clears the "parent_subflow_block" edge to type BlockInstance.
func (fiu *FlowInstanceUpdate) ClearParentSubflowBlock() *FlowInstanceUpdate {
	fiu.mutation.ClearParentSubflowBlock()
	return fiu
}

// Save executes the query and returns the number of rows/vertices matched by this operation.
func (fiu *FlowInstanceUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	fiu.defaults()
	if len(fiu.hooks) == 0 {
		if err = fiu.check(); err != nil {
			return 0, err
		}
		affected, err = fiu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowInstanceMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fiu.check(); err != nil {
				return 0, err
			}
			fiu.mutation = mutation
			affected, err = fiu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(fiu.hooks) - 1; i >= 0; i-- {
			mut = fiu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fiu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (fiu *FlowInstanceUpdate) SaveX(ctx context.Context) int {
	affected, err := fiu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (fiu *FlowInstanceUpdate) Exec(ctx context.Context) error {
	_, err := fiu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fiu *FlowInstanceUpdate) ExecX(ctx context.Context) {
	if err := fiu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fiu *FlowInstanceUpdate) defaults() {
	if _, ok := fiu.mutation.UpdateTime(); !ok {
		v := flowinstance.UpdateDefaultUpdateTime()
		fiu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fiu *FlowInstanceUpdate) check() error {
	if v, ok := fiu.mutation.Status(); ok {
		if err := flowinstance.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if _, ok := fiu.mutation.TemplateID(); fiu.mutation.TemplateCleared() && !ok {
		return errors.New("ent: clearing a required unique edge \"template\"")
	}
	return nil
}

func (fiu *FlowInstanceUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowinstance.Table,
			Columns: flowinstance.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowinstance.FieldID,
			},
		},
	}
	if ps := fiu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := fiu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowinstance.FieldUpdateTime,
		})
	}
	if value, ok := fiu.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: flowinstance.FieldStatus,
		})
	}
	if value, ok := fiu.mutation.OutputParams(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flowinstance.FieldOutputParams,
		})
	}
	if fiu.mutation.OutputParamsCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Column: flowinstance.FieldOutputParams,
		})
	}
	if value, ok := fiu.mutation.IncompletionReason(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowinstance.FieldIncompletionReason,
		})
	}
	if fiu.mutation.IncompletionReasonCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: flowinstance.FieldIncompletionReason,
		})
	}
	if fiu.mutation.FlowCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiu.mutation.FlowIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiu.mutation.TemplateCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiu.mutation.TemplateIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiu.mutation.BlocksCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiu.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !fiu.mutation.BlocksCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiu.mutation.BlocksIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiu.mutation.ParentSubflowBlockCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiu.mutation.ParentSubflowBlockIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, fiu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{flowinstance.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// FlowInstanceUpdateOne is the builder for updating a single FlowInstance entity.
type FlowInstanceUpdateOne struct {
	config
	hooks    []Hook
	mutation *FlowInstanceMutation
}

// SetStatus sets the status field.
func (fiuo *FlowInstanceUpdateOne) SetStatus(f flowinstance.Status) *FlowInstanceUpdateOne {
	fiuo.mutation.SetStatus(f)
	return fiuo
}

// SetNillableStatus sets the status field if the given value is not nil.
func (fiuo *FlowInstanceUpdateOne) SetNillableStatus(f *flowinstance.Status) *FlowInstanceUpdateOne {
	if f != nil {
		fiuo.SetStatus(*f)
	}
	return fiuo
}

// SetOutputParams sets the output_params field.
func (fiuo *FlowInstanceUpdateOne) SetOutputParams(fv []*flowschema.VariableValue) *FlowInstanceUpdateOne {
	fiuo.mutation.SetOutputParams(fv)
	return fiuo
}

// ClearOutputParams clears the value of output_params.
func (fiuo *FlowInstanceUpdateOne) ClearOutputParams() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearOutputParams()
	return fiuo
}

// SetIncompletionReason sets the incompletion_reason field.
func (fiuo *FlowInstanceUpdateOne) SetIncompletionReason(s string) *FlowInstanceUpdateOne {
	fiuo.mutation.SetIncompletionReason(s)
	return fiuo
}

// SetNillableIncompletionReason sets the incompletion_reason field if the given value is not nil.
func (fiuo *FlowInstanceUpdateOne) SetNillableIncompletionReason(s *string) *FlowInstanceUpdateOne {
	if s != nil {
		fiuo.SetIncompletionReason(*s)
	}
	return fiuo
}

// ClearIncompletionReason clears the value of incompletion_reason.
func (fiuo *FlowInstanceUpdateOne) ClearIncompletionReason() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearIncompletionReason()
	return fiuo
}

// SetFlowID sets the flow edge to Flow by id.
func (fiuo *FlowInstanceUpdateOne) SetFlowID(id int) *FlowInstanceUpdateOne {
	fiuo.mutation.SetFlowID(id)
	return fiuo
}

// SetNillableFlowID sets the flow edge to Flow by id if the given value is not nil.
func (fiuo *FlowInstanceUpdateOne) SetNillableFlowID(id *int) *FlowInstanceUpdateOne {
	if id != nil {
		fiuo = fiuo.SetFlowID(*id)
	}
	return fiuo
}

// SetFlow sets the flow edge to Flow.
func (fiuo *FlowInstanceUpdateOne) SetFlow(f *Flow) *FlowInstanceUpdateOne {
	return fiuo.SetFlowID(f.ID)
}

// SetTemplateID sets the template edge to FlowExecutionTemplate by id.
func (fiuo *FlowInstanceUpdateOne) SetTemplateID(id int) *FlowInstanceUpdateOne {
	fiuo.mutation.SetTemplateID(id)
	return fiuo
}

// SetTemplate sets the template edge to FlowExecutionTemplate.
func (fiuo *FlowInstanceUpdateOne) SetTemplate(f *FlowExecutionTemplate) *FlowInstanceUpdateOne {
	return fiuo.SetTemplateID(f.ID)
}

// AddBlockIDs adds the blocks edge to BlockInstance by ids.
func (fiuo *FlowInstanceUpdateOne) AddBlockIDs(ids ...int) *FlowInstanceUpdateOne {
	fiuo.mutation.AddBlockIDs(ids...)
	return fiuo
}

// AddBlocks adds the blocks edges to BlockInstance.
func (fiuo *FlowInstanceUpdateOne) AddBlocks(b ...*BlockInstance) *FlowInstanceUpdateOne {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fiuo.AddBlockIDs(ids...)
}

// SetParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id.
func (fiuo *FlowInstanceUpdateOne) SetParentSubflowBlockID(id int) *FlowInstanceUpdateOne {
	fiuo.mutation.SetParentSubflowBlockID(id)
	return fiuo
}

// SetNillableParentSubflowBlockID sets the parent_subflow_block edge to BlockInstance by id if the given value is not nil.
func (fiuo *FlowInstanceUpdateOne) SetNillableParentSubflowBlockID(id *int) *FlowInstanceUpdateOne {
	if id != nil {
		fiuo = fiuo.SetParentSubflowBlockID(*id)
	}
	return fiuo
}

// SetParentSubflowBlock sets the parent_subflow_block edge to BlockInstance.
func (fiuo *FlowInstanceUpdateOne) SetParentSubflowBlock(b *BlockInstance) *FlowInstanceUpdateOne {
	return fiuo.SetParentSubflowBlockID(b.ID)
}

// Mutation returns the FlowInstanceMutation object of the builder.
func (fiuo *FlowInstanceUpdateOne) Mutation() *FlowInstanceMutation {
	return fiuo.mutation
}

// ClearFlow clears the "flow" edge to type Flow.
func (fiuo *FlowInstanceUpdateOne) ClearFlow() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearFlow()
	return fiuo
}

// ClearTemplate clears the "template" edge to type FlowExecutionTemplate.
func (fiuo *FlowInstanceUpdateOne) ClearTemplate() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearTemplate()
	return fiuo
}

// ClearBlocks clears all "blocks" edges to type BlockInstance.
func (fiuo *FlowInstanceUpdateOne) ClearBlocks() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearBlocks()
	return fiuo
}

// RemoveBlockIDs removes the blocks edge to BlockInstance by ids.
func (fiuo *FlowInstanceUpdateOne) RemoveBlockIDs(ids ...int) *FlowInstanceUpdateOne {
	fiuo.mutation.RemoveBlockIDs(ids...)
	return fiuo
}

// RemoveBlocks removes blocks edges to BlockInstance.
func (fiuo *FlowInstanceUpdateOne) RemoveBlocks(b ...*BlockInstance) *FlowInstanceUpdateOne {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fiuo.RemoveBlockIDs(ids...)
}

// ClearParentSubflowBlock clears the "parent_subflow_block" edge to type BlockInstance.
func (fiuo *FlowInstanceUpdateOne) ClearParentSubflowBlock() *FlowInstanceUpdateOne {
	fiuo.mutation.ClearParentSubflowBlock()
	return fiuo
}

// Save executes the query and returns the updated entity.
func (fiuo *FlowInstanceUpdateOne) Save(ctx context.Context) (*FlowInstance, error) {
	var (
		err  error
		node *FlowInstance
	)
	fiuo.defaults()
	if len(fiuo.hooks) == 0 {
		if err = fiuo.check(); err != nil {
			return nil, err
		}
		node, err = fiuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowInstanceMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fiuo.check(); err != nil {
				return nil, err
			}
			fiuo.mutation = mutation
			node, err = fiuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fiuo.hooks) - 1; i >= 0; i-- {
			mut = fiuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fiuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (fiuo *FlowInstanceUpdateOne) SaveX(ctx context.Context) *FlowInstance {
	node, err := fiuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (fiuo *FlowInstanceUpdateOne) Exec(ctx context.Context) error {
	_, err := fiuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fiuo *FlowInstanceUpdateOne) ExecX(ctx context.Context) {
	if err := fiuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fiuo *FlowInstanceUpdateOne) defaults() {
	if _, ok := fiuo.mutation.UpdateTime(); !ok {
		v := flowinstance.UpdateDefaultUpdateTime()
		fiuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fiuo *FlowInstanceUpdateOne) check() error {
	if v, ok := fiuo.mutation.Status(); ok {
		if err := flowinstance.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if _, ok := fiuo.mutation.TemplateID(); fiuo.mutation.TemplateCleared() && !ok {
		return errors.New("ent: clearing a required unique edge \"template\"")
	}
	return nil
}

func (fiuo *FlowInstanceUpdateOne) sqlSave(ctx context.Context) (_node *FlowInstance, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowinstance.Table,
			Columns: flowinstance.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowinstance.FieldID,
			},
		},
	}
	id, ok := fiuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing FlowInstance.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := fiuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowinstance.FieldUpdateTime,
		})
	}
	if value, ok := fiuo.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: flowinstance.FieldStatus,
		})
	}
	if value, ok := fiuo.mutation.OutputParams(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flowinstance.FieldOutputParams,
		})
	}
	if fiuo.mutation.OutputParamsCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Column: flowinstance.FieldOutputParams,
		})
	}
	if value, ok := fiuo.mutation.IncompletionReason(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowinstance.FieldIncompletionReason,
		})
	}
	if fiuo.mutation.IncompletionReasonCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: flowinstance.FieldIncompletionReason,
		})
	}
	if fiuo.mutation.FlowCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiuo.mutation.FlowIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiuo.mutation.TemplateCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiuo.mutation.TemplateIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiuo.mutation.BlocksCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiuo.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !fiuo.mutation.BlocksCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiuo.mutation.BlocksIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fiuo.mutation.ParentSubflowBlockCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fiuo.mutation.ParentSubflowBlockIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &FlowInstance{config: fiuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, fiuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{flowinstance.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
