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
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationshipmultiplicity"
)

// ResourceRelationshipMultiplicityDelete is the builder for deleting a ResourceRelationshipMultiplicity entity.
type ResourceRelationshipMultiplicityDelete struct {
	config
	hooks    []Hook
	mutation *ResourceRelationshipMultiplicityMutation
}

// Where adds a new predicate to the delete builder.
func (rrmd *ResourceRelationshipMultiplicityDelete) Where(ps ...predicate.ResourceRelationshipMultiplicity) *ResourceRelationshipMultiplicityDelete {
	rrmd.mutation.predicates = append(rrmd.mutation.predicates, ps...)
	return rrmd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (rrmd *ResourceRelationshipMultiplicityDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(rrmd.hooks) == 0 {
		affected, err = rrmd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceRelationshipMultiplicityMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			rrmd.mutation = mutation
			affected, err = rrmd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(rrmd.hooks) - 1; i >= 0; i-- {
			mut = rrmd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rrmd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (rrmd *ResourceRelationshipMultiplicityDelete) ExecX(ctx context.Context) int {
	n, err := rrmd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (rrmd *ResourceRelationshipMultiplicityDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: resourcerelationshipmultiplicity.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcerelationshipmultiplicity.FieldID,
			},
		},
	}
	if ps := rrmd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, rrmd.driver, _spec)
}

// ResourceRelationshipMultiplicityDeleteOne is the builder for deleting a single ResourceRelationshipMultiplicity entity.
type ResourceRelationshipMultiplicityDeleteOne struct {
	rrmd *ResourceRelationshipMultiplicityDelete
}

// Exec executes the deletion query.
func (rrmdo *ResourceRelationshipMultiplicityDeleteOne) Exec(ctx context.Context) error {
	n, err := rrmdo.rrmd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{resourcerelationshipmultiplicity.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (rrmdo *ResourceRelationshipMultiplicityDeleteOne) ExecX(ctx context.Context) {
	rrmdo.rrmd.ExecX(ctx)
}
