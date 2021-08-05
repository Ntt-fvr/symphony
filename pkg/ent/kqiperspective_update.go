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
	"github.com/facebookincubator/symphony/pkg/ent/kqi"
	"github.com/facebookincubator/symphony/pkg/ent/kqiperspective"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// KqiPerspectiveUpdate is the builder for updating KqiPerspective entities.
type KqiPerspectiveUpdate struct {
	config
	hooks    []Hook
	mutation *KqiPerspectiveMutation
}

// Where adds a new predicate for the builder.
func (kpu *KqiPerspectiveUpdate) Where(ps ...predicate.KqiPerspective) *KqiPerspectiveUpdate {
	kpu.mutation.predicates = append(kpu.mutation.predicates, ps...)
	return kpu
}

// SetName sets the name field.
func (kpu *KqiPerspectiveUpdate) SetName(s string) *KqiPerspectiveUpdate {
	kpu.mutation.SetName(s)
	return kpu
}

// AddKqiPerspectiveFkIDs adds the kqiPerspectiveFk edge to Kqi by ids.
func (kpu *KqiPerspectiveUpdate) AddKqiPerspectiveFkIDs(ids ...int) *KqiPerspectiveUpdate {
	kpu.mutation.AddKqiPerspectiveFkIDs(ids...)
	return kpu
}

// AddKqiPerspectiveFk adds the kqiPerspectiveFk edges to Kqi.
func (kpu *KqiPerspectiveUpdate) AddKqiPerspectiveFk(k ...*Kqi) *KqiPerspectiveUpdate {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return kpu.AddKqiPerspectiveFkIDs(ids...)
}

// Mutation returns the KqiPerspectiveMutation object of the builder.
func (kpu *KqiPerspectiveUpdate) Mutation() *KqiPerspectiveMutation {
	return kpu.mutation
}

// ClearKqiPerspectiveFk clears all "kqiPerspectiveFk" edges to type Kqi.
func (kpu *KqiPerspectiveUpdate) ClearKqiPerspectiveFk() *KqiPerspectiveUpdate {
	kpu.mutation.ClearKqiPerspectiveFk()
	return kpu
}

// RemoveKqiPerspectiveFkIDs removes the kqiPerspectiveFk edge to Kqi by ids.
func (kpu *KqiPerspectiveUpdate) RemoveKqiPerspectiveFkIDs(ids ...int) *KqiPerspectiveUpdate {
	kpu.mutation.RemoveKqiPerspectiveFkIDs(ids...)
	return kpu
}

// RemoveKqiPerspectiveFk removes kqiPerspectiveFk edges to Kqi.
func (kpu *KqiPerspectiveUpdate) RemoveKqiPerspectiveFk(k ...*Kqi) *KqiPerspectiveUpdate {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return kpu.RemoveKqiPerspectiveFkIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (kpu *KqiPerspectiveUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	kpu.defaults()
	if len(kpu.hooks) == 0 {
		if err = kpu.check(); err != nil {
			return 0, err
		}
		affected, err = kpu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KqiPerspectiveMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = kpu.check(); err != nil {
				return 0, err
			}
			kpu.mutation = mutation
			affected, err = kpu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(kpu.hooks) - 1; i >= 0; i-- {
			mut = kpu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, kpu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (kpu *KqiPerspectiveUpdate) SaveX(ctx context.Context) int {
	affected, err := kpu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (kpu *KqiPerspectiveUpdate) Exec(ctx context.Context) error {
	_, err := kpu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (kpu *KqiPerspectiveUpdate) ExecX(ctx context.Context) {
	if err := kpu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (kpu *KqiPerspectiveUpdate) defaults() {
	if _, ok := kpu.mutation.UpdateTime(); !ok {
		v := kqiperspective.UpdateDefaultUpdateTime()
		kpu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (kpu *KqiPerspectiveUpdate) check() error {
	if v, ok := kpu.mutation.Name(); ok {
		if err := kqiperspective.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (kpu *KqiPerspectiveUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kqiperspective.Table,
			Columns: kqiperspective.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kqiperspective.FieldID,
			},
		},
	}
	if ps := kpu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := kpu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqiperspective.FieldUpdateTime,
		})
	}
	if value, ok := kpu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kqiperspective.FieldName,
		})
	}
	if kpu.mutation.KqiPerspectiveFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kpu.mutation.RemovedKqiPerspectiveFkIDs(); len(nodes) > 0 && !kpu.mutation.KqiPerspectiveFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kpu.mutation.KqiPerspectiveFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, kpu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kqiperspective.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// KqiPerspectiveUpdateOne is the builder for updating a single KqiPerspective entity.
type KqiPerspectiveUpdateOne struct {
	config
	hooks    []Hook
	mutation *KqiPerspectiveMutation
}

// SetName sets the name field.
func (kpuo *KqiPerspectiveUpdateOne) SetName(s string) *KqiPerspectiveUpdateOne {
	kpuo.mutation.SetName(s)
	return kpuo
}

// AddKqiPerspectiveFkIDs adds the kqiPerspectiveFk edge to Kqi by ids.
func (kpuo *KqiPerspectiveUpdateOne) AddKqiPerspectiveFkIDs(ids ...int) *KqiPerspectiveUpdateOne {
	kpuo.mutation.AddKqiPerspectiveFkIDs(ids...)
	return kpuo
}

// AddKqiPerspectiveFk adds the kqiPerspectiveFk edges to Kqi.
func (kpuo *KqiPerspectiveUpdateOne) AddKqiPerspectiveFk(k ...*Kqi) *KqiPerspectiveUpdateOne {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return kpuo.AddKqiPerspectiveFkIDs(ids...)
}

// Mutation returns the KqiPerspectiveMutation object of the builder.
func (kpuo *KqiPerspectiveUpdateOne) Mutation() *KqiPerspectiveMutation {
	return kpuo.mutation
}

// ClearKqiPerspectiveFk clears all "kqiPerspectiveFk" edges to type Kqi.
func (kpuo *KqiPerspectiveUpdateOne) ClearKqiPerspectiveFk() *KqiPerspectiveUpdateOne {
	kpuo.mutation.ClearKqiPerspectiveFk()
	return kpuo
}

// RemoveKqiPerspectiveFkIDs removes the kqiPerspectiveFk edge to Kqi by ids.
func (kpuo *KqiPerspectiveUpdateOne) RemoveKqiPerspectiveFkIDs(ids ...int) *KqiPerspectiveUpdateOne {
	kpuo.mutation.RemoveKqiPerspectiveFkIDs(ids...)
	return kpuo
}

// RemoveKqiPerspectiveFk removes kqiPerspectiveFk edges to Kqi.
func (kpuo *KqiPerspectiveUpdateOne) RemoveKqiPerspectiveFk(k ...*Kqi) *KqiPerspectiveUpdateOne {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return kpuo.RemoveKqiPerspectiveFkIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (kpuo *KqiPerspectiveUpdateOne) Save(ctx context.Context) (*KqiPerspective, error) {
	var (
		err  error
		node *KqiPerspective
	)
	kpuo.defaults()
	if len(kpuo.hooks) == 0 {
		if err = kpuo.check(); err != nil {
			return nil, err
		}
		node, err = kpuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KqiPerspectiveMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = kpuo.check(); err != nil {
				return nil, err
			}
			kpuo.mutation = mutation
			node, err = kpuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(kpuo.hooks) - 1; i >= 0; i-- {
			mut = kpuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, kpuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (kpuo *KqiPerspectiveUpdateOne) SaveX(ctx context.Context) *KqiPerspective {
	node, err := kpuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (kpuo *KqiPerspectiveUpdateOne) Exec(ctx context.Context) error {
	_, err := kpuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (kpuo *KqiPerspectiveUpdateOne) ExecX(ctx context.Context) {
	if err := kpuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (kpuo *KqiPerspectiveUpdateOne) defaults() {
	if _, ok := kpuo.mutation.UpdateTime(); !ok {
		v := kqiperspective.UpdateDefaultUpdateTime()
		kpuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (kpuo *KqiPerspectiveUpdateOne) check() error {
	if v, ok := kpuo.mutation.Name(); ok {
		if err := kqiperspective.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (kpuo *KqiPerspectiveUpdateOne) sqlSave(ctx context.Context) (_node *KqiPerspective, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kqiperspective.Table,
			Columns: kqiperspective.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kqiperspective.FieldID,
			},
		},
	}
	id, ok := kpuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing KqiPerspective.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := kpuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqiperspective.FieldUpdateTime,
		})
	}
	if value, ok := kpuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kqiperspective.FieldName,
		})
	}
	if kpuo.mutation.KqiPerspectiveFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kpuo.mutation.RemovedKqiPerspectiveFkIDs(); len(nodes) > 0 && !kpuo.mutation.KqiPerspectiveFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kpuo.mutation.KqiPerspectiveFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kqiperspective.KqiPerspectiveFkTable,
			Columns: []string{kqiperspective.KqiPerspectiveFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &KqiPerspective{config: kpuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, kpuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kqiperspective.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
