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
	"github.com/facebookincubator/symphony/pkg/ent/temporalfrecuency"
)

// TemporalFrecuencyDelete is the builder for deleting a TemporalFrecuency entity.
type TemporalFrecuencyDelete struct {
	config
	hooks    []Hook
	mutation *TemporalFrecuencyMutation
}

// Where adds a new predicate to the delete builder.
func (tfd *TemporalFrecuencyDelete) Where(ps ...predicate.TemporalFrecuency) *TemporalFrecuencyDelete {
	tfd.mutation.predicates = append(tfd.mutation.predicates, ps...)
	return tfd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (tfd *TemporalFrecuencyDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(tfd.hooks) == 0 {
		affected, err = tfd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*TemporalFrecuencyMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			tfd.mutation = mutation
			affected, err = tfd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(tfd.hooks) - 1; i >= 0; i-- {
			mut = tfd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, tfd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (tfd *TemporalFrecuencyDelete) ExecX(ctx context.Context) int {
	n, err := tfd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (tfd *TemporalFrecuencyDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: temporalfrecuency.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: temporalfrecuency.FieldID,
			},
		},
	}
	if ps := tfd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, tfd.driver, _spec)
}

// TemporalFrecuencyDeleteOne is the builder for deleting a single TemporalFrecuency entity.
type TemporalFrecuencyDeleteOne struct {
	tfd *TemporalFrecuencyDelete
}

// Exec executes the deletion query.
func (tfdo *TemporalFrecuencyDeleteOne) Exec(ctx context.Context) error {
	n, err := tfdo.tfd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{temporalfrecuency.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (tfdo *TemporalFrecuencyDeleteOne) ExecX(ctx context.Context) {
	tfdo.tfd.ExecX(ctx)
}
