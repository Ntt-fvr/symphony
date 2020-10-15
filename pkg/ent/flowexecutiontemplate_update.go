// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flowexecutiontemplate"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

// FlowExecutionTemplateUpdate is the builder for updating FlowExecutionTemplate entities.
type FlowExecutionTemplateUpdate struct {
	config
	hooks    []Hook
	mutation *FlowExecutionTemplateMutation
}

// Where adds a new predicate for the builder.
func (fetu *FlowExecutionTemplateUpdate) Where(ps ...predicate.FlowExecutionTemplate) *FlowExecutionTemplateUpdate {
	fetu.mutation.predicates = append(fetu.mutation.predicates, ps...)
	return fetu
}

// SetName sets the name field.
func (fetu *FlowExecutionTemplateUpdate) SetName(s string) *FlowExecutionTemplateUpdate {
	fetu.mutation.SetName(s)
	return fetu
}

// SetDescription sets the description field.
func (fetu *FlowExecutionTemplateUpdate) SetDescription(s string) *FlowExecutionTemplateUpdate {
	fetu.mutation.SetDescription(s)
	return fetu
}

// SetNillableDescription sets the description field if the given value is not nil.
func (fetu *FlowExecutionTemplateUpdate) SetNillableDescription(s *string) *FlowExecutionTemplateUpdate {
	if s != nil {
		fetu.SetDescription(*s)
	}
	return fetu
}

// ClearDescription clears the value of description.
func (fetu *FlowExecutionTemplateUpdate) ClearDescription() *FlowExecutionTemplateUpdate {
	fetu.mutation.ClearDescription()
	return fetu
}

// SetEndParamDefinitions sets the end_param_definitions field.
func (fetu *FlowExecutionTemplateUpdate) SetEndParamDefinitions(fd []*flowschema.VariableDefinition) *FlowExecutionTemplateUpdate {
	fetu.mutation.SetEndParamDefinitions(fd)
	return fetu
}

// ClearEndParamDefinitions clears the value of end_param_definitions.
func (fetu *FlowExecutionTemplateUpdate) ClearEndParamDefinitions() *FlowExecutionTemplateUpdate {
	fetu.mutation.ClearEndParamDefinitions()
	return fetu
}

// AddBlockIDs adds the blocks edge to Block by ids.
func (fetu *FlowExecutionTemplateUpdate) AddBlockIDs(ids ...int) *FlowExecutionTemplateUpdate {
	fetu.mutation.AddBlockIDs(ids...)
	return fetu
}

// AddBlocks adds the blocks edges to Block.
func (fetu *FlowExecutionTemplateUpdate) AddBlocks(b ...*Block) *FlowExecutionTemplateUpdate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fetu.AddBlockIDs(ids...)
}

// Mutation returns the FlowExecutionTemplateMutation object of the builder.
func (fetu *FlowExecutionTemplateUpdate) Mutation() *FlowExecutionTemplateMutation {
	return fetu.mutation
}

// ClearBlocks clears all "blocks" edges to type Block.
func (fetu *FlowExecutionTemplateUpdate) ClearBlocks() *FlowExecutionTemplateUpdate {
	fetu.mutation.ClearBlocks()
	return fetu
}

// RemoveBlockIDs removes the blocks edge to Block by ids.
func (fetu *FlowExecutionTemplateUpdate) RemoveBlockIDs(ids ...int) *FlowExecutionTemplateUpdate {
	fetu.mutation.RemoveBlockIDs(ids...)
	return fetu
}

// RemoveBlocks removes blocks edges to Block.
func (fetu *FlowExecutionTemplateUpdate) RemoveBlocks(b ...*Block) *FlowExecutionTemplateUpdate {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fetu.RemoveBlockIDs(ids...)
}

// Save executes the query and returns the number of rows/vertices matched by this operation.
func (fetu *FlowExecutionTemplateUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	fetu.defaults()
	if len(fetu.hooks) == 0 {
		if err = fetu.check(); err != nil {
			return 0, err
		}
		affected, err = fetu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowExecutionTemplateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fetu.check(); err != nil {
				return 0, err
			}
			fetu.mutation = mutation
			affected, err = fetu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(fetu.hooks) - 1; i >= 0; i-- {
			mut = fetu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fetu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (fetu *FlowExecutionTemplateUpdate) SaveX(ctx context.Context) int {
	affected, err := fetu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (fetu *FlowExecutionTemplateUpdate) Exec(ctx context.Context) error {
	_, err := fetu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fetu *FlowExecutionTemplateUpdate) ExecX(ctx context.Context) {
	if err := fetu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fetu *FlowExecutionTemplateUpdate) defaults() {
	if _, ok := fetu.mutation.UpdateTime(); !ok {
		v := flowexecutiontemplate.UpdateDefaultUpdateTime()
		fetu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fetu *FlowExecutionTemplateUpdate) check() error {
	if v, ok := fetu.mutation.Name(); ok {
		if err := flowexecutiontemplate.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fetu *FlowExecutionTemplateUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowexecutiontemplate.Table,
			Columns: flowexecutiontemplate.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowexecutiontemplate.FieldID,
			},
		},
	}
	if ps := fetu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := fetu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowexecutiontemplate.FieldUpdateTime,
		})
	}
	if value, ok := fetu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowexecutiontemplate.FieldName,
		})
	}
	if value, ok := fetu.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowexecutiontemplate.FieldDescription,
		})
	}
	if fetu.mutation.DescriptionCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: flowexecutiontemplate.FieldDescription,
		})
	}
	if value, ok := fetu.mutation.EndParamDefinitions(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flowexecutiontemplate.FieldEndParamDefinitions,
		})
	}
	if fetu.mutation.EndParamDefinitionsCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Column: flowexecutiontemplate.FieldEndParamDefinitions,
		})
	}
	if fetu.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: block.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fetu.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !fetu.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fetu.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, fetu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{flowexecutiontemplate.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// FlowExecutionTemplateUpdateOne is the builder for updating a single FlowExecutionTemplate entity.
type FlowExecutionTemplateUpdateOne struct {
	config
	hooks    []Hook
	mutation *FlowExecutionTemplateMutation
}

// SetName sets the name field.
func (fetuo *FlowExecutionTemplateUpdateOne) SetName(s string) *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.SetName(s)
	return fetuo
}

// SetDescription sets the description field.
func (fetuo *FlowExecutionTemplateUpdateOne) SetDescription(s string) *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.SetDescription(s)
	return fetuo
}

// SetNillableDescription sets the description field if the given value is not nil.
func (fetuo *FlowExecutionTemplateUpdateOne) SetNillableDescription(s *string) *FlowExecutionTemplateUpdateOne {
	if s != nil {
		fetuo.SetDescription(*s)
	}
	return fetuo
}

// ClearDescription clears the value of description.
func (fetuo *FlowExecutionTemplateUpdateOne) ClearDescription() *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.ClearDescription()
	return fetuo
}

// SetEndParamDefinitions sets the end_param_definitions field.
func (fetuo *FlowExecutionTemplateUpdateOne) SetEndParamDefinitions(fd []*flowschema.VariableDefinition) *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.SetEndParamDefinitions(fd)
	return fetuo
}

// ClearEndParamDefinitions clears the value of end_param_definitions.
func (fetuo *FlowExecutionTemplateUpdateOne) ClearEndParamDefinitions() *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.ClearEndParamDefinitions()
	return fetuo
}

// AddBlockIDs adds the blocks edge to Block by ids.
func (fetuo *FlowExecutionTemplateUpdateOne) AddBlockIDs(ids ...int) *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.AddBlockIDs(ids...)
	return fetuo
}

// AddBlocks adds the blocks edges to Block.
func (fetuo *FlowExecutionTemplateUpdateOne) AddBlocks(b ...*Block) *FlowExecutionTemplateUpdateOne {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fetuo.AddBlockIDs(ids...)
}

// Mutation returns the FlowExecutionTemplateMutation object of the builder.
func (fetuo *FlowExecutionTemplateUpdateOne) Mutation() *FlowExecutionTemplateMutation {
	return fetuo.mutation
}

// ClearBlocks clears all "blocks" edges to type Block.
func (fetuo *FlowExecutionTemplateUpdateOne) ClearBlocks() *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.ClearBlocks()
	return fetuo
}

// RemoveBlockIDs removes the blocks edge to Block by ids.
func (fetuo *FlowExecutionTemplateUpdateOne) RemoveBlockIDs(ids ...int) *FlowExecutionTemplateUpdateOne {
	fetuo.mutation.RemoveBlockIDs(ids...)
	return fetuo
}

// RemoveBlocks removes blocks edges to Block.
func (fetuo *FlowExecutionTemplateUpdateOne) RemoveBlocks(b ...*Block) *FlowExecutionTemplateUpdateOne {
	ids := make([]int, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return fetuo.RemoveBlockIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (fetuo *FlowExecutionTemplateUpdateOne) Save(ctx context.Context) (*FlowExecutionTemplate, error) {
	var (
		err  error
		node *FlowExecutionTemplate
	)
	fetuo.defaults()
	if len(fetuo.hooks) == 0 {
		if err = fetuo.check(); err != nil {
			return nil, err
		}
		node, err = fetuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FlowExecutionTemplateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fetuo.check(); err != nil {
				return nil, err
			}
			fetuo.mutation = mutation
			node, err = fetuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fetuo.hooks) - 1; i >= 0; i-- {
			mut = fetuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fetuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (fetuo *FlowExecutionTemplateUpdateOne) SaveX(ctx context.Context) *FlowExecutionTemplate {
	node, err := fetuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (fetuo *FlowExecutionTemplateUpdateOne) Exec(ctx context.Context) error {
	_, err := fetuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fetuo *FlowExecutionTemplateUpdateOne) ExecX(ctx context.Context) {
	if err := fetuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fetuo *FlowExecutionTemplateUpdateOne) defaults() {
	if _, ok := fetuo.mutation.UpdateTime(); !ok {
		v := flowexecutiontemplate.UpdateDefaultUpdateTime()
		fetuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fetuo *FlowExecutionTemplateUpdateOne) check() error {
	if v, ok := fetuo.mutation.Name(); ok {
		if err := flowexecutiontemplate.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fetuo *FlowExecutionTemplateUpdateOne) sqlSave(ctx context.Context) (_node *FlowExecutionTemplate, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowexecutiontemplate.Table,
			Columns: flowexecutiontemplate.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowexecutiontemplate.FieldID,
			},
		},
	}
	id, ok := fetuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing FlowExecutionTemplate.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := fetuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: flowexecutiontemplate.FieldUpdateTime,
		})
	}
	if value, ok := fetuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowexecutiontemplate.FieldName,
		})
	}
	if value, ok := fetuo.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: flowexecutiontemplate.FieldDescription,
		})
	}
	if fetuo.mutation.DescriptionCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: flowexecutiontemplate.FieldDescription,
		})
	}
	if value, ok := fetuo.mutation.EndParamDefinitions(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: flowexecutiontemplate.FieldEndParamDefinitions,
		})
	}
	if fetuo.mutation.EndParamDefinitionsCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Column: flowexecutiontemplate.FieldEndParamDefinitions,
		})
	}
	if fetuo.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: block.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fetuo.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !fetuo.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fetuo.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   flowexecutiontemplate.BlocksTable,
			Columns: []string{flowexecutiontemplate.BlocksColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &FlowExecutionTemplate{config: fetuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, fetuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{flowexecutiontemplate.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
