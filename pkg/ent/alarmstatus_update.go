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
	"github.com/facebookincubator/symphony/pkg/ent/alarmfilter"
	"github.com/facebookincubator/symphony/pkg/ent/alarmstatus"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// AlarmStatusUpdate is the builder for updating AlarmStatus entities.
type AlarmStatusUpdate struct {
	config
	hooks    []Hook
	mutation *AlarmStatusMutation
}

// Where adds a new predicate for the builder.
func (asu *AlarmStatusUpdate) Where(ps ...predicate.AlarmStatus) *AlarmStatusUpdate {
	asu.mutation.predicates = append(asu.mutation.predicates, ps...)
	return asu
}

// SetName sets the name field.
func (asu *AlarmStatusUpdate) SetName(s string) *AlarmStatusUpdate {
	asu.mutation.SetName(s)
	return asu
}

// AddAlarmStatusFkIDs adds the alarmStatusFk edge to AlarmFilter by ids.
func (asu *AlarmStatusUpdate) AddAlarmStatusFkIDs(ids ...int) *AlarmStatusUpdate {
	asu.mutation.AddAlarmStatusFkIDs(ids...)
	return asu
}

// AddAlarmStatusFk adds the alarmStatusFk edges to AlarmFilter.
func (asu *AlarmStatusUpdate) AddAlarmStatusFk(a ...*AlarmFilter) *AlarmStatusUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asu.AddAlarmStatusFkIDs(ids...)
}

// Mutation returns the AlarmStatusMutation object of the builder.
func (asu *AlarmStatusUpdate) Mutation() *AlarmStatusMutation {
	return asu.mutation
}

// ClearAlarmStatusFk clears all "alarmStatusFk" edges to type AlarmFilter.
func (asu *AlarmStatusUpdate) ClearAlarmStatusFk() *AlarmStatusUpdate {
	asu.mutation.ClearAlarmStatusFk()
	return asu
}

// RemoveAlarmStatusFkIDs removes the alarmStatusFk edge to AlarmFilter by ids.
func (asu *AlarmStatusUpdate) RemoveAlarmStatusFkIDs(ids ...int) *AlarmStatusUpdate {
	asu.mutation.RemoveAlarmStatusFkIDs(ids...)
	return asu
}

// RemoveAlarmStatusFk removes alarmStatusFk edges to AlarmFilter.
func (asu *AlarmStatusUpdate) RemoveAlarmStatusFk(a ...*AlarmFilter) *AlarmStatusUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asu.RemoveAlarmStatusFkIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (asu *AlarmStatusUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	asu.defaults()
	if len(asu.hooks) == 0 {
		if err = asu.check(); err != nil {
			return 0, err
		}
		affected, err = asu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*AlarmStatusMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = asu.check(); err != nil {
				return 0, err
			}
			asu.mutation = mutation
			affected, err = asu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(asu.hooks) - 1; i >= 0; i-- {
			mut = asu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, asu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (asu *AlarmStatusUpdate) SaveX(ctx context.Context) int {
	affected, err := asu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (asu *AlarmStatusUpdate) Exec(ctx context.Context) error {
	_, err := asu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (asu *AlarmStatusUpdate) ExecX(ctx context.Context) {
	if err := asu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (asu *AlarmStatusUpdate) defaults() {
	if _, ok := asu.mutation.UpdateTime(); !ok {
		v := alarmstatus.UpdateDefaultUpdateTime()
		asu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (asu *AlarmStatusUpdate) check() error {
	if v, ok := asu.mutation.Name(); ok {
		if err := alarmstatus.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (asu *AlarmStatusUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   alarmstatus.Table,
			Columns: alarmstatus.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: alarmstatus.FieldID,
			},
		},
	}
	if ps := asu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := asu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: alarmstatus.FieldUpdateTime,
		})
	}
	if value, ok := asu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: alarmstatus.FieldName,
		})
	}
	if asu.mutation.AlarmStatusFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asu.mutation.RemovedAlarmStatusFkIDs(); len(nodes) > 0 && !asu.mutation.AlarmStatusFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asu.mutation.AlarmStatusFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, asu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{alarmstatus.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// AlarmStatusUpdateOne is the builder for updating a single AlarmStatus entity.
type AlarmStatusUpdateOne struct {
	config
	hooks    []Hook
	mutation *AlarmStatusMutation
}

// SetName sets the name field.
func (asuo *AlarmStatusUpdateOne) SetName(s string) *AlarmStatusUpdateOne {
	asuo.mutation.SetName(s)
	return asuo
}

// AddAlarmStatusFkIDs adds the alarmStatusFk edge to AlarmFilter by ids.
func (asuo *AlarmStatusUpdateOne) AddAlarmStatusFkIDs(ids ...int) *AlarmStatusUpdateOne {
	asuo.mutation.AddAlarmStatusFkIDs(ids...)
	return asuo
}

// AddAlarmStatusFk adds the alarmStatusFk edges to AlarmFilter.
func (asuo *AlarmStatusUpdateOne) AddAlarmStatusFk(a ...*AlarmFilter) *AlarmStatusUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asuo.AddAlarmStatusFkIDs(ids...)
}

// Mutation returns the AlarmStatusMutation object of the builder.
func (asuo *AlarmStatusUpdateOne) Mutation() *AlarmStatusMutation {
	return asuo.mutation
}

// ClearAlarmStatusFk clears all "alarmStatusFk" edges to type AlarmFilter.
func (asuo *AlarmStatusUpdateOne) ClearAlarmStatusFk() *AlarmStatusUpdateOne {
	asuo.mutation.ClearAlarmStatusFk()
	return asuo
}

// RemoveAlarmStatusFkIDs removes the alarmStatusFk edge to AlarmFilter by ids.
func (asuo *AlarmStatusUpdateOne) RemoveAlarmStatusFkIDs(ids ...int) *AlarmStatusUpdateOne {
	asuo.mutation.RemoveAlarmStatusFkIDs(ids...)
	return asuo
}

// RemoveAlarmStatusFk removes alarmStatusFk edges to AlarmFilter.
func (asuo *AlarmStatusUpdateOne) RemoveAlarmStatusFk(a ...*AlarmFilter) *AlarmStatusUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asuo.RemoveAlarmStatusFkIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (asuo *AlarmStatusUpdateOne) Save(ctx context.Context) (*AlarmStatus, error) {
	var (
		err  error
		node *AlarmStatus
	)
	asuo.defaults()
	if len(asuo.hooks) == 0 {
		if err = asuo.check(); err != nil {
			return nil, err
		}
		node, err = asuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*AlarmStatusMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = asuo.check(); err != nil {
				return nil, err
			}
			asuo.mutation = mutation
			node, err = asuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(asuo.hooks) - 1; i >= 0; i-- {
			mut = asuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, asuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (asuo *AlarmStatusUpdateOne) SaveX(ctx context.Context) *AlarmStatus {
	node, err := asuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (asuo *AlarmStatusUpdateOne) Exec(ctx context.Context) error {
	_, err := asuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (asuo *AlarmStatusUpdateOne) ExecX(ctx context.Context) {
	if err := asuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (asuo *AlarmStatusUpdateOne) defaults() {
	if _, ok := asuo.mutation.UpdateTime(); !ok {
		v := alarmstatus.UpdateDefaultUpdateTime()
		asuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (asuo *AlarmStatusUpdateOne) check() error {
	if v, ok := asuo.mutation.Name(); ok {
		if err := alarmstatus.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (asuo *AlarmStatusUpdateOne) sqlSave(ctx context.Context) (_node *AlarmStatus, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   alarmstatus.Table,
			Columns: alarmstatus.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: alarmstatus.FieldID,
			},
		},
	}
	id, ok := asuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing AlarmStatus.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := asuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: alarmstatus.FieldUpdateTime,
		})
	}
	if value, ok := asuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: alarmstatus.FieldName,
		})
	}
	if asuo.mutation.AlarmStatusFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asuo.mutation.RemovedAlarmStatusFkIDs(); len(nodes) > 0 && !asuo.mutation.AlarmStatusFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asuo.mutation.AlarmStatusFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   alarmstatus.AlarmStatusFkTable,
			Columns: []string{alarmstatus.AlarmStatusFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: alarmfilter.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &AlarmStatus{config: asuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, asuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{alarmstatus.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
