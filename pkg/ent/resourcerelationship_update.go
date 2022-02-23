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
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/resource"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
)

// ResourceRelationshipUpdate is the builder for updating ResourceRelationship entities.
type ResourceRelationshipUpdate struct {
	config
	hooks    []Hook
	mutation *ResourceRelationshipMutation
}

// Where adds a new predicate for the builder.
func (rru *ResourceRelationshipUpdate) Where(ps ...predicate.ResourceRelationship) *ResourceRelationshipUpdate {
	rru.mutation.predicates = append(rru.mutation.predicates, ps...)
	return rru
}

// SetResourceRelationshipTypes sets the ResourceRelationshipTypes field.
func (rru *ResourceRelationshipUpdate) SetResourceRelationshipTypes(rrt resourcerelationship.ResourceRelationshipTypes) *ResourceRelationshipUpdate {
	rru.mutation.SetResourceRelationshipTypes(rrt)
	return rru
}

// SetResourceaID sets the resourcea edge to Resource by id.
func (rru *ResourceRelationshipUpdate) SetResourceaID(id int) *ResourceRelationshipUpdate {
	rru.mutation.SetResourceaID(id)
	return rru
}

// SetNillableResourceaID sets the resourcea edge to Resource by id if the given value is not nil.
func (rru *ResourceRelationshipUpdate) SetNillableResourceaID(id *int) *ResourceRelationshipUpdate {
	if id != nil {
		rru = rru.SetResourceaID(*id)
	}
	return rru
}

// SetResourcea sets the resourcea edge to Resource.
func (rru *ResourceRelationshipUpdate) SetResourcea(r *Resource) *ResourceRelationshipUpdate {
	return rru.SetResourceaID(r.ID)
}

// SetResourcebID sets the resourceb edge to Resource by id.
func (rru *ResourceRelationshipUpdate) SetResourcebID(id int) *ResourceRelationshipUpdate {
	rru.mutation.SetResourcebID(id)
	return rru
}

// SetNillableResourcebID sets the resourceb edge to Resource by id if the given value is not nil.
func (rru *ResourceRelationshipUpdate) SetNillableResourcebID(id *int) *ResourceRelationshipUpdate {
	if id != nil {
		rru = rru.SetResourcebID(*id)
	}
	return rru
}

// SetResourceb sets the resourceb edge to Resource.
func (rru *ResourceRelationshipUpdate) SetResourceb(r *Resource) *ResourceRelationshipUpdate {
	return rru.SetResourcebID(r.ID)
}

// SetResourcelocationID sets the resourcelocation edge to Location by id.
func (rru *ResourceRelationshipUpdate) SetResourcelocationID(id int) *ResourceRelationshipUpdate {
	rru.mutation.SetResourcelocationID(id)
	return rru
}

// SetNillableResourcelocationID sets the resourcelocation edge to Location by id if the given value is not nil.
func (rru *ResourceRelationshipUpdate) SetNillableResourcelocationID(id *int) *ResourceRelationshipUpdate {
	if id != nil {
		rru = rru.SetResourcelocationID(*id)
	}
	return rru
}

// SetResourcelocation sets the resourcelocation edge to Location.
func (rru *ResourceRelationshipUpdate) SetResourcelocation(l *Location) *ResourceRelationshipUpdate {
	return rru.SetResourcelocationID(l.ID)
}

// Mutation returns the ResourceRelationshipMutation object of the builder.
func (rru *ResourceRelationshipUpdate) Mutation() *ResourceRelationshipMutation {
	return rru.mutation
}

// ClearResourcea clears the "resourcea" edge to type Resource.
func (rru *ResourceRelationshipUpdate) ClearResourcea() *ResourceRelationshipUpdate {
	rru.mutation.ClearResourcea()
	return rru
}

// ClearResourceb clears the "resourceb" edge to type Resource.
func (rru *ResourceRelationshipUpdate) ClearResourceb() *ResourceRelationshipUpdate {
	rru.mutation.ClearResourceb()
	return rru
}

// ClearResourcelocation clears the "resourcelocation" edge to type Location.
func (rru *ResourceRelationshipUpdate) ClearResourcelocation() *ResourceRelationshipUpdate {
	rru.mutation.ClearResourcelocation()
	return rru
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (rru *ResourceRelationshipUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	rru.defaults()
	if len(rru.hooks) == 0 {
		if err = rru.check(); err != nil {
			return 0, err
		}
		affected, err = rru.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceRelationshipMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rru.check(); err != nil {
				return 0, err
			}
			rru.mutation = mutation
			affected, err = rru.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(rru.hooks) - 1; i >= 0; i-- {
			mut = rru.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rru.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (rru *ResourceRelationshipUpdate) SaveX(ctx context.Context) int {
	affected, err := rru.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (rru *ResourceRelationshipUpdate) Exec(ctx context.Context) error {
	_, err := rru.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rru *ResourceRelationshipUpdate) ExecX(ctx context.Context) {
	if err := rru.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rru *ResourceRelationshipUpdate) defaults() {
	if _, ok := rru.mutation.UpdateTime(); !ok {
		v := resourcerelationship.UpdateDefaultUpdateTime()
		rru.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rru *ResourceRelationshipUpdate) check() error {
	if v, ok := rru.mutation.ResourceRelationshipTypes(); ok {
		if err := resourcerelationship.ResourceRelationshipTypesValidator(v); err != nil {
			return &ValidationError{Name: "ResourceRelationshipTypes", err: fmt.Errorf("ent: validator failed for field \"ResourceRelationshipTypes\": %w", err)}
		}
	}
	return nil
}

func (rru *ResourceRelationshipUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcerelationship.Table,
			Columns: resourcerelationship.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcerelationship.FieldID,
			},
		},
	}
	if ps := rru.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := rru.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcerelationship.FieldUpdateTime,
		})
	}
	if value, ok := rru.mutation.ResourceRelationshipTypes(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: resourcerelationship.FieldResourceRelationshipTypes,
		})
	}
	if rru.mutation.ResourceaCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourceaTable,
			Columns: []string{resourcerelationship.ResourceaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rru.mutation.ResourceaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourceaTable,
			Columns: []string{resourcerelationship.ResourceaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rru.mutation.ResourcebCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcebTable,
			Columns: []string{resourcerelationship.ResourcebColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rru.mutation.ResourcebIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcebTable,
			Columns: []string{resourcerelationship.ResourcebColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rru.mutation.ResourcelocationCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcelocationTable,
			Columns: []string{resourcerelationship.ResourcelocationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rru.mutation.ResourcelocationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcelocationTable,
			Columns: []string{resourcerelationship.ResourcelocationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, rru.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{resourcerelationship.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// ResourceRelationshipUpdateOne is the builder for updating a single ResourceRelationship entity.
type ResourceRelationshipUpdateOne struct {
	config
	hooks    []Hook
	mutation *ResourceRelationshipMutation
}

// SetResourceRelationshipTypes sets the ResourceRelationshipTypes field.
func (rruo *ResourceRelationshipUpdateOne) SetResourceRelationshipTypes(rrt resourcerelationship.ResourceRelationshipTypes) *ResourceRelationshipUpdateOne {
	rruo.mutation.SetResourceRelationshipTypes(rrt)
	return rruo
}

// SetResourceaID sets the resourcea edge to Resource by id.
func (rruo *ResourceRelationshipUpdateOne) SetResourceaID(id int) *ResourceRelationshipUpdateOne {
	rruo.mutation.SetResourceaID(id)
	return rruo
}

// SetNillableResourceaID sets the resourcea edge to Resource by id if the given value is not nil.
func (rruo *ResourceRelationshipUpdateOne) SetNillableResourceaID(id *int) *ResourceRelationshipUpdateOne {
	if id != nil {
		rruo = rruo.SetResourceaID(*id)
	}
	return rruo
}

// SetResourcea sets the resourcea edge to Resource.
func (rruo *ResourceRelationshipUpdateOne) SetResourcea(r *Resource) *ResourceRelationshipUpdateOne {
	return rruo.SetResourceaID(r.ID)
}

// SetResourcebID sets the resourceb edge to Resource by id.
func (rruo *ResourceRelationshipUpdateOne) SetResourcebID(id int) *ResourceRelationshipUpdateOne {
	rruo.mutation.SetResourcebID(id)
	return rruo
}

// SetNillableResourcebID sets the resourceb edge to Resource by id if the given value is not nil.
func (rruo *ResourceRelationshipUpdateOne) SetNillableResourcebID(id *int) *ResourceRelationshipUpdateOne {
	if id != nil {
		rruo = rruo.SetResourcebID(*id)
	}
	return rruo
}

// SetResourceb sets the resourceb edge to Resource.
func (rruo *ResourceRelationshipUpdateOne) SetResourceb(r *Resource) *ResourceRelationshipUpdateOne {
	return rruo.SetResourcebID(r.ID)
}

// SetResourcelocationID sets the resourcelocation edge to Location by id.
func (rruo *ResourceRelationshipUpdateOne) SetResourcelocationID(id int) *ResourceRelationshipUpdateOne {
	rruo.mutation.SetResourcelocationID(id)
	return rruo
}

// SetNillableResourcelocationID sets the resourcelocation edge to Location by id if the given value is not nil.
func (rruo *ResourceRelationshipUpdateOne) SetNillableResourcelocationID(id *int) *ResourceRelationshipUpdateOne {
	if id != nil {
		rruo = rruo.SetResourcelocationID(*id)
	}
	return rruo
}

// SetResourcelocation sets the resourcelocation edge to Location.
func (rruo *ResourceRelationshipUpdateOne) SetResourcelocation(l *Location) *ResourceRelationshipUpdateOne {
	return rruo.SetResourcelocationID(l.ID)
}

// Mutation returns the ResourceRelationshipMutation object of the builder.
func (rruo *ResourceRelationshipUpdateOne) Mutation() *ResourceRelationshipMutation {
	return rruo.mutation
}

// ClearResourcea clears the "resourcea" edge to type Resource.
func (rruo *ResourceRelationshipUpdateOne) ClearResourcea() *ResourceRelationshipUpdateOne {
	rruo.mutation.ClearResourcea()
	return rruo
}

// ClearResourceb clears the "resourceb" edge to type Resource.
func (rruo *ResourceRelationshipUpdateOne) ClearResourceb() *ResourceRelationshipUpdateOne {
	rruo.mutation.ClearResourceb()
	return rruo
}

// ClearResourcelocation clears the "resourcelocation" edge to type Location.
func (rruo *ResourceRelationshipUpdateOne) ClearResourcelocation() *ResourceRelationshipUpdateOne {
	rruo.mutation.ClearResourcelocation()
	return rruo
}

// Save executes the query and returns the updated entity.
func (rruo *ResourceRelationshipUpdateOne) Save(ctx context.Context) (*ResourceRelationship, error) {
	var (
		err  error
		node *ResourceRelationship
	)
	rruo.defaults()
	if len(rruo.hooks) == 0 {
		if err = rruo.check(); err != nil {
			return nil, err
		}
		node, err = rruo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceRelationshipMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rruo.check(); err != nil {
				return nil, err
			}
			rruo.mutation = mutation
			node, err = rruo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rruo.hooks) - 1; i >= 0; i-- {
			mut = rruo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rruo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (rruo *ResourceRelationshipUpdateOne) SaveX(ctx context.Context) *ResourceRelationship {
	node, err := rruo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (rruo *ResourceRelationshipUpdateOne) Exec(ctx context.Context) error {
	_, err := rruo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rruo *ResourceRelationshipUpdateOne) ExecX(ctx context.Context) {
	if err := rruo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rruo *ResourceRelationshipUpdateOne) defaults() {
	if _, ok := rruo.mutation.UpdateTime(); !ok {
		v := resourcerelationship.UpdateDefaultUpdateTime()
		rruo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rruo *ResourceRelationshipUpdateOne) check() error {
	if v, ok := rruo.mutation.ResourceRelationshipTypes(); ok {
		if err := resourcerelationship.ResourceRelationshipTypesValidator(v); err != nil {
			return &ValidationError{Name: "ResourceRelationshipTypes", err: fmt.Errorf("ent: validator failed for field \"ResourceRelationshipTypes\": %w", err)}
		}
	}
	return nil
}

func (rruo *ResourceRelationshipUpdateOne) sqlSave(ctx context.Context) (_node *ResourceRelationship, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcerelationship.Table,
			Columns: resourcerelationship.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcerelationship.FieldID,
			},
		},
	}
	id, ok := rruo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing ResourceRelationship.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := rruo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcerelationship.FieldUpdateTime,
		})
	}
	if value, ok := rruo.mutation.ResourceRelationshipTypes(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: resourcerelationship.FieldResourceRelationshipTypes,
		})
	}
	if rruo.mutation.ResourceaCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourceaTable,
			Columns: []string{resourcerelationship.ResourceaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rruo.mutation.ResourceaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourceaTable,
			Columns: []string{resourcerelationship.ResourceaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rruo.mutation.ResourcebCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcebTable,
			Columns: []string{resourcerelationship.ResourcebColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rruo.mutation.ResourcebIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcebTable,
			Columns: []string{resourcerelationship.ResourcebColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resource.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rruo.mutation.ResourcelocationCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcelocationTable,
			Columns: []string{resourcerelationship.ResourcelocationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rruo.mutation.ResourcelocationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcerelationship.ResourcelocationTable,
			Columns: []string{resourcerelationship.ResourcelocationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &ResourceRelationship{config: rruo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, rruo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{resourcerelationship.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
