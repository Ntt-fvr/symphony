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
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ExportTaskUpdate is the builder for updating ExportTask entities.
type ExportTaskUpdate struct {
	config
	hooks      []Hook
	mutation   *ExportTaskMutation
	predicates []predicate.ExportTask
}

// Where adds a new predicate for the builder.
func (etu *ExportTaskUpdate) Where(ps ...predicate.ExportTask) *ExportTaskUpdate {
	etu.predicates = append(etu.predicates, ps...)
	return etu
}

// SetType sets the type field.
func (etu *ExportTaskUpdate) SetType(e exporttask.Type) *ExportTaskUpdate {
	etu.mutation.SetType(e)
	return etu
}

// SetStatus sets the status field.
func (etu *ExportTaskUpdate) SetStatus(e exporttask.Status) *ExportTaskUpdate {
	etu.mutation.SetStatus(e)
	return etu
}

// SetProgress sets the progress field.
func (etu *ExportTaskUpdate) SetProgress(f float64) *ExportTaskUpdate {
	etu.mutation.ResetProgress()
	etu.mutation.SetProgress(f)
	return etu
}

// SetNillableProgress sets the progress field if the given value is not nil.
func (etu *ExportTaskUpdate) SetNillableProgress(f *float64) *ExportTaskUpdate {
	if f != nil {
		etu.SetProgress(*f)
	}
	return etu
}

// AddProgress adds f to progress.
func (etu *ExportTaskUpdate) AddProgress(f float64) *ExportTaskUpdate {
	etu.mutation.AddProgress(f)
	return etu
}

// SetFilters sets the filters field.
func (etu *ExportTaskUpdate) SetFilters(s string) *ExportTaskUpdate {
	etu.mutation.SetFilters(s)
	return etu
}

// SetNillableFilters sets the filters field if the given value is not nil.
func (etu *ExportTaskUpdate) SetNillableFilters(s *string) *ExportTaskUpdate {
	if s != nil {
		etu.SetFilters(*s)
	}
	return etu
}

// SetStoreKey sets the store_key field.
func (etu *ExportTaskUpdate) SetStoreKey(s string) *ExportTaskUpdate {
	etu.mutation.SetStoreKey(s)
	return etu
}

// SetNillableStoreKey sets the store_key field if the given value is not nil.
func (etu *ExportTaskUpdate) SetNillableStoreKey(s *string) *ExportTaskUpdate {
	if s != nil {
		etu.SetStoreKey(*s)
	}
	return etu
}

// ClearStoreKey clears the value of store_key.
func (etu *ExportTaskUpdate) ClearStoreKey() *ExportTaskUpdate {
	etu.mutation.ClearStoreKey()
	return etu
}

// Mutation returns the ExportTaskMutation object of the builder.
func (etu *ExportTaskUpdate) Mutation() *ExportTaskMutation {
	return etu.mutation
}

// Save executes the query and returns the number of rows/vertices matched by this operation.
func (etu *ExportTaskUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(etu.hooks) == 0 {
		if err = etu.check(); err != nil {
			return 0, err
		}
		affected, err = etu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ExportTaskMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = etu.check(); err != nil {
				return 0, err
			}
			etu.mutation = mutation
			affected, err = etu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(etu.hooks) - 1; i >= 0; i-- {
			mut = etu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, etu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (etu *ExportTaskUpdate) SaveX(ctx context.Context) int {
	affected, err := etu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (etu *ExportTaskUpdate) Exec(ctx context.Context) error {
	_, err := etu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (etu *ExportTaskUpdate) ExecX(ctx context.Context) {
	if err := etu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (etu *ExportTaskUpdate) check() error {
	if v, ok := etu.mutation.GetType(); ok {
		if err := exporttask.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf("ent: validator failed for field \"type\": %w", err)}
		}
	}
	if v, ok := etu.mutation.Status(); ok {
		if err := exporttask.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if v, ok := etu.mutation.Progress(); ok {
		if err := exporttask.ProgressValidator(v); err != nil {
			return &ValidationError{Name: "progress", err: fmt.Errorf("ent: validator failed for field \"progress\": %w", err)}
		}
	}
	return nil
}

func (etu *ExportTaskUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   exporttask.Table,
			Columns: exporttask.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: exporttask.FieldID,
			},
		},
	}
	if ps := etu.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := etu.mutation.GetType(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: exporttask.FieldType,
		})
	}
	if value, ok := etu.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: exporttask.FieldStatus,
		})
	}
	if value, ok := etu.mutation.Progress(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: exporttask.FieldProgress,
		})
	}
	if value, ok := etu.mutation.AddedProgress(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: exporttask.FieldProgress,
		})
	}
	if value, ok := etu.mutation.Filters(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: exporttask.FieldFilters,
		})
	}
	if value, ok := etu.mutation.StoreKey(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: exporttask.FieldStoreKey,
		})
	}
	if etu.mutation.StoreKeyCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: exporttask.FieldStoreKey,
		})
	}
	if n, err = sqlgraph.UpdateNodes(ctx, etu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{exporttask.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// ExportTaskUpdateOne is the builder for updating a single ExportTask entity.
type ExportTaskUpdateOne struct {
	config
	hooks    []Hook
	mutation *ExportTaskMutation
}

// SetType sets the type field.
func (etuo *ExportTaskUpdateOne) SetType(e exporttask.Type) *ExportTaskUpdateOne {
	etuo.mutation.SetType(e)
	return etuo
}

// SetStatus sets the status field.
func (etuo *ExportTaskUpdateOne) SetStatus(e exporttask.Status) *ExportTaskUpdateOne {
	etuo.mutation.SetStatus(e)
	return etuo
}

// SetProgress sets the progress field.
func (etuo *ExportTaskUpdateOne) SetProgress(f float64) *ExportTaskUpdateOne {
	etuo.mutation.ResetProgress()
	etuo.mutation.SetProgress(f)
	return etuo
}

// SetNillableProgress sets the progress field if the given value is not nil.
func (etuo *ExportTaskUpdateOne) SetNillableProgress(f *float64) *ExportTaskUpdateOne {
	if f != nil {
		etuo.SetProgress(*f)
	}
	return etuo
}

// AddProgress adds f to progress.
func (etuo *ExportTaskUpdateOne) AddProgress(f float64) *ExportTaskUpdateOne {
	etuo.mutation.AddProgress(f)
	return etuo
}

// SetFilters sets the filters field.
func (etuo *ExportTaskUpdateOne) SetFilters(s string) *ExportTaskUpdateOne {
	etuo.mutation.SetFilters(s)
	return etuo
}

// SetNillableFilters sets the filters field if the given value is not nil.
func (etuo *ExportTaskUpdateOne) SetNillableFilters(s *string) *ExportTaskUpdateOne {
	if s != nil {
		etuo.SetFilters(*s)
	}
	return etuo
}

// SetStoreKey sets the store_key field.
func (etuo *ExportTaskUpdateOne) SetStoreKey(s string) *ExportTaskUpdateOne {
	etuo.mutation.SetStoreKey(s)
	return etuo
}

// SetNillableStoreKey sets the store_key field if the given value is not nil.
func (etuo *ExportTaskUpdateOne) SetNillableStoreKey(s *string) *ExportTaskUpdateOne {
	if s != nil {
		etuo.SetStoreKey(*s)
	}
	return etuo
}

// ClearStoreKey clears the value of store_key.
func (etuo *ExportTaskUpdateOne) ClearStoreKey() *ExportTaskUpdateOne {
	etuo.mutation.ClearStoreKey()
	return etuo
}

// Mutation returns the ExportTaskMutation object of the builder.
func (etuo *ExportTaskUpdateOne) Mutation() *ExportTaskMutation {
	return etuo.mutation
}

// Save executes the query and returns the updated entity.
func (etuo *ExportTaskUpdateOne) Save(ctx context.Context) (*ExportTask, error) {
	var (
		err  error
		node *ExportTask
	)
	if len(etuo.hooks) == 0 {
		if err = etuo.check(); err != nil {
			return nil, err
		}
		node, err = etuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ExportTaskMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = etuo.check(); err != nil {
				return nil, err
			}
			etuo.mutation = mutation
			node, err = etuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(etuo.hooks) - 1; i >= 0; i-- {
			mut = etuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, etuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (etuo *ExportTaskUpdateOne) SaveX(ctx context.Context) *ExportTask {
	node, err := etuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (etuo *ExportTaskUpdateOne) Exec(ctx context.Context) error {
	_, err := etuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (etuo *ExportTaskUpdateOne) ExecX(ctx context.Context) {
	if err := etuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (etuo *ExportTaskUpdateOne) check() error {
	if v, ok := etuo.mutation.GetType(); ok {
		if err := exporttask.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf("ent: validator failed for field \"type\": %w", err)}
		}
	}
	if v, ok := etuo.mutation.Status(); ok {
		if err := exporttask.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if v, ok := etuo.mutation.Progress(); ok {
		if err := exporttask.ProgressValidator(v); err != nil {
			return &ValidationError{Name: "progress", err: fmt.Errorf("ent: validator failed for field \"progress\": %w", err)}
		}
	}
	return nil
}

func (etuo *ExportTaskUpdateOne) sqlSave(ctx context.Context) (_node *ExportTask, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   exporttask.Table,
			Columns: exporttask.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: exporttask.FieldID,
			},
		},
	}
	id, ok := etuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing ExportTask.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := etuo.mutation.GetType(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: exporttask.FieldType,
		})
	}
	if value, ok := etuo.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: exporttask.FieldStatus,
		})
	}
	if value, ok := etuo.mutation.Progress(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: exporttask.FieldProgress,
		})
	}
	if value, ok := etuo.mutation.AddedProgress(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: exporttask.FieldProgress,
		})
	}
	if value, ok := etuo.mutation.Filters(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: exporttask.FieldFilters,
		})
	}
	if value, ok := etuo.mutation.StoreKey(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: exporttask.FieldStoreKey,
		})
	}
	if etuo.mutation.StoreKeyCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: exporttask.FieldStoreKey,
		})
	}
	_node = &ExportTask{config: etuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, etuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{exporttask.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
