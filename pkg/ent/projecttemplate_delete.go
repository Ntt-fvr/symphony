// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
)

// ProjectTemplateDelete is the builder for deleting a ProjectTemplate entity.
type ProjectTemplateDelete struct {
	config
	hooks      []Hook
	mutation   *ProjectTemplateMutation
	predicates []predicate.ProjectTemplate
}

// Where adds a new predicate to the delete builder.
func (ptd *ProjectTemplateDelete) Where(ps ...predicate.ProjectTemplate) *ProjectTemplateDelete {
	ptd.predicates = append(ptd.predicates, ps...)
	return ptd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ptd *ProjectTemplateDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ptd.hooks) == 0 {
		affected, err = ptd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ProjectTemplateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ptd.mutation = mutation
			affected, err = ptd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ptd.hooks) - 1; i >= 0; i-- {
			mut = ptd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ptd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (ptd *ProjectTemplateDelete) ExecX(ctx context.Context) int {
	n, err := ptd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ptd *ProjectTemplateDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: projecttemplate.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: projecttemplate.FieldID,
			},
		},
	}
	if ps := ptd.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, ptd.driver, _spec)
}

// ProjectTemplateDeleteOne is the builder for deleting a single ProjectTemplate entity.
type ProjectTemplateDeleteOne struct {
	ptd *ProjectTemplateDelete
}

// Exec executes the deletion query.
func (ptdo *ProjectTemplateDeleteOne) Exec(ctx context.Context) error {
	n, err := ptdo.ptd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{projecttemplate.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ptdo *ProjectTemplateDeleteOne) ExecX(ctx context.Context) {
	ptdo.ptd.ExecX(ctx)
}
