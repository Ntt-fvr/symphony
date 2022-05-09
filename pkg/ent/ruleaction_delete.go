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
	"github.com/facebookincubator/symphony/pkg/ent/ruleaction"
)

// RuleActionDelete is the builder for deleting a RuleAction entity.
type RuleActionDelete struct {
	config
	hooks    []Hook
	mutation *RuleActionMutation
}

// Where adds a new predicate to the delete builder.
func (rad *RuleActionDelete) Where(ps ...predicate.RuleAction) *RuleActionDelete {
	rad.mutation.predicates = append(rad.mutation.predicates, ps...)
	return rad
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (rad *RuleActionDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(rad.hooks) == 0 {
		affected, err = rad.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*RuleActionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			rad.mutation = mutation
			affected, err = rad.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(rad.hooks) - 1; i >= 0; i-- {
			mut = rad.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rad.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (rad *RuleActionDelete) ExecX(ctx context.Context) int {
	n, err := rad.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (rad *RuleActionDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: ruleaction.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: ruleaction.FieldID,
			},
		},
	}
	if ps := rad.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, rad.driver, _spec)
}

// RuleActionDeleteOne is the builder for deleting a single RuleAction entity.
type RuleActionDeleteOne struct {
	rad *RuleActionDelete
}

// Exec executes the deletion query.
func (rado *RuleActionDeleteOne) Exec(ctx context.Context) error {
	n, err := rado.rad.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{ruleaction.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (rado *RuleActionDeleteOne) ExecX(ctx context.Context) {
	rado.rad.ExecX(ctx)
}
