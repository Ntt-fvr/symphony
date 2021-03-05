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
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/workertype"
)

// WorkerTypeUpdate is the builder for updating WorkerType entities.
type WorkerTypeUpdate struct {
	config
	hooks    []Hook
	mutation *WorkerTypeMutation
}

// Where adds a new predicate for the builder.
func (wtu *WorkerTypeUpdate) Where(ps ...predicate.WorkerType) *WorkerTypeUpdate {
	wtu.mutation.predicates = append(wtu.mutation.predicates, ps...)
	return wtu
}

// SetName sets the name field.
func (wtu *WorkerTypeUpdate) SetName(s string) *WorkerTypeUpdate {
	wtu.mutation.SetName(s)
	return wtu
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (wtu *WorkerTypeUpdate) AddPropertyTypeIDs(ids ...int) *WorkerTypeUpdate {
	wtu.mutation.AddPropertyTypeIDs(ids...)
	return wtu
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (wtu *WorkerTypeUpdate) AddPropertyTypes(p ...*PropertyType) *WorkerTypeUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wtu.AddPropertyTypeIDs(ids...)
}

// Mutation returns the WorkerTypeMutation object of the builder.
func (wtu *WorkerTypeUpdate) Mutation() *WorkerTypeMutation {
	return wtu.mutation
}

// ClearPropertyTypes clears all "property_types" edges to type PropertyType.
func (wtu *WorkerTypeUpdate) ClearPropertyTypes() *WorkerTypeUpdate {
	wtu.mutation.ClearPropertyTypes()
	return wtu
}

// RemovePropertyTypeIDs removes the property_types edge to PropertyType by ids.
func (wtu *WorkerTypeUpdate) RemovePropertyTypeIDs(ids ...int) *WorkerTypeUpdate {
	wtu.mutation.RemovePropertyTypeIDs(ids...)
	return wtu
}

// RemovePropertyTypes removes property_types edges to PropertyType.
func (wtu *WorkerTypeUpdate) RemovePropertyTypes(p ...*PropertyType) *WorkerTypeUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wtu.RemovePropertyTypeIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (wtu *WorkerTypeUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	wtu.defaults()
	if len(wtu.hooks) == 0 {
		affected, err = wtu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WorkerTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wtu.mutation = mutation
			affected, err = wtu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(wtu.hooks) - 1; i >= 0; i-- {
			mut = wtu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wtu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (wtu *WorkerTypeUpdate) SaveX(ctx context.Context) int {
	affected, err := wtu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (wtu *WorkerTypeUpdate) Exec(ctx context.Context) error {
	_, err := wtu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wtu *WorkerTypeUpdate) ExecX(ctx context.Context) {
	if err := wtu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (wtu *WorkerTypeUpdate) defaults() {
	if _, ok := wtu.mutation.UpdateTime(); !ok {
		v := workertype.UpdateDefaultUpdateTime()
		wtu.mutation.SetUpdateTime(v)
	}
}

func (wtu *WorkerTypeUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   workertype.Table,
			Columns: workertype.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: workertype.FieldID,
			},
		},
	}
	if ps := wtu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := wtu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workertype.FieldUpdateTime,
		})
	}
	if value, ok := wtu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workertype.FieldName,
		})
	}
	if wtu.mutation.PropertyTypesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := wtu.mutation.RemovedPropertyTypesIDs(); len(nodes) > 0 && !wtu.mutation.PropertyTypesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := wtu.mutation.PropertyTypesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, wtu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{workertype.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// WorkerTypeUpdateOne is the builder for updating a single WorkerType entity.
type WorkerTypeUpdateOne struct {
	config
	hooks    []Hook
	mutation *WorkerTypeMutation
}

// SetName sets the name field.
func (wtuo *WorkerTypeUpdateOne) SetName(s string) *WorkerTypeUpdateOne {
	wtuo.mutation.SetName(s)
	return wtuo
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (wtuo *WorkerTypeUpdateOne) AddPropertyTypeIDs(ids ...int) *WorkerTypeUpdateOne {
	wtuo.mutation.AddPropertyTypeIDs(ids...)
	return wtuo
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (wtuo *WorkerTypeUpdateOne) AddPropertyTypes(p ...*PropertyType) *WorkerTypeUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wtuo.AddPropertyTypeIDs(ids...)
}

// Mutation returns the WorkerTypeMutation object of the builder.
func (wtuo *WorkerTypeUpdateOne) Mutation() *WorkerTypeMutation {
	return wtuo.mutation
}

// ClearPropertyTypes clears all "property_types" edges to type PropertyType.
func (wtuo *WorkerTypeUpdateOne) ClearPropertyTypes() *WorkerTypeUpdateOne {
	wtuo.mutation.ClearPropertyTypes()
	return wtuo
}

// RemovePropertyTypeIDs removes the property_types edge to PropertyType by ids.
func (wtuo *WorkerTypeUpdateOne) RemovePropertyTypeIDs(ids ...int) *WorkerTypeUpdateOne {
	wtuo.mutation.RemovePropertyTypeIDs(ids...)
	return wtuo
}

// RemovePropertyTypes removes property_types edges to PropertyType.
func (wtuo *WorkerTypeUpdateOne) RemovePropertyTypes(p ...*PropertyType) *WorkerTypeUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wtuo.RemovePropertyTypeIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (wtuo *WorkerTypeUpdateOne) Save(ctx context.Context) (*WorkerType, error) {
	var (
		err  error
		node *WorkerType
	)
	wtuo.defaults()
	if len(wtuo.hooks) == 0 {
		node, err = wtuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WorkerTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wtuo.mutation = mutation
			node, err = wtuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(wtuo.hooks) - 1; i >= 0; i-- {
			mut = wtuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wtuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (wtuo *WorkerTypeUpdateOne) SaveX(ctx context.Context) *WorkerType {
	node, err := wtuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (wtuo *WorkerTypeUpdateOne) Exec(ctx context.Context) error {
	_, err := wtuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wtuo *WorkerTypeUpdateOne) ExecX(ctx context.Context) {
	if err := wtuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (wtuo *WorkerTypeUpdateOne) defaults() {
	if _, ok := wtuo.mutation.UpdateTime(); !ok {
		v := workertype.UpdateDefaultUpdateTime()
		wtuo.mutation.SetUpdateTime(v)
	}
}

func (wtuo *WorkerTypeUpdateOne) sqlSave(ctx context.Context) (_node *WorkerType, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   workertype.Table,
			Columns: workertype.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: workertype.FieldID,
			},
		},
	}
	id, ok := wtuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing WorkerType.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := wtuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workertype.FieldUpdateTime,
		})
	}
	if value, ok := wtuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workertype.FieldName,
		})
	}
	if wtuo.mutation.PropertyTypesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := wtuo.mutation.RemovedPropertyTypesIDs(); len(nodes) > 0 && !wtuo.mutation.PropertyTypesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := wtuo.mutation.PropertyTypesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workertype.PropertyTypesTable,
			Columns: []string{workertype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &WorkerType{config: wtuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, wtuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{workertype.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
