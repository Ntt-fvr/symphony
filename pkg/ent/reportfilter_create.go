// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/reportfilter"
)

// ReportFilterCreate is the builder for creating a ReportFilter entity.
type ReportFilterCreate struct {
	config
	mutation *ReportFilterMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rfc *ReportFilterCreate) SetCreateTime(t time.Time) *ReportFilterCreate {
	rfc.mutation.SetCreateTime(t)
	return rfc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rfc *ReportFilterCreate) SetNillableCreateTime(t *time.Time) *ReportFilterCreate {
	if t != nil {
		rfc.SetCreateTime(*t)
	}
	return rfc
}

// SetUpdateTime sets the update_time field.
func (rfc *ReportFilterCreate) SetUpdateTime(t time.Time) *ReportFilterCreate {
	rfc.mutation.SetUpdateTime(t)
	return rfc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rfc *ReportFilterCreate) SetNillableUpdateTime(t *time.Time) *ReportFilterCreate {
	if t != nil {
		rfc.SetUpdateTime(*t)
	}
	return rfc
}

// SetName sets the name field.
func (rfc *ReportFilterCreate) SetName(s string) *ReportFilterCreate {
	rfc.mutation.SetName(s)
	return rfc
}

// SetEntity sets the entity field.
func (rfc *ReportFilterCreate) SetEntity(r reportfilter.Entity) *ReportFilterCreate {
	rfc.mutation.SetEntity(r)
	return rfc
}

// SetFilters sets the filters field.
func (rfc *ReportFilterCreate) SetFilters(s string) *ReportFilterCreate {
	rfc.mutation.SetFilters(s)
	return rfc
}

// SetNillableFilters sets the filters field if the given value is not nil.
func (rfc *ReportFilterCreate) SetNillableFilters(s *string) *ReportFilterCreate {
	if s != nil {
		rfc.SetFilters(*s)
	}
	return rfc
}

// Mutation returns the ReportFilterMutation object of the builder.
func (rfc *ReportFilterCreate) Mutation() *ReportFilterMutation {
	return rfc.mutation
}

// Save creates the ReportFilter in the database.
func (rfc *ReportFilterCreate) Save(ctx context.Context) (*ReportFilter, error) {
	if err := rfc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *ReportFilter
	)
	if len(rfc.hooks) == 0 {
		node, err = rfc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ReportFilterMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			rfc.mutation = mutation
			node, err = rfc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rfc.hooks) - 1; i >= 0; i-- {
			mut = rfc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rfc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rfc *ReportFilterCreate) SaveX(ctx context.Context) *ReportFilter {
	v, err := rfc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rfc *ReportFilterCreate) preSave() error {
	if _, ok := rfc.mutation.CreateTime(); !ok {
		v := reportfilter.DefaultCreateTime()
		rfc.mutation.SetCreateTime(v)
	}
	if _, ok := rfc.mutation.UpdateTime(); !ok {
		v := reportfilter.DefaultUpdateTime()
		rfc.mutation.SetUpdateTime(v)
	}
	if _, ok := rfc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := rfc.mutation.Name(); ok {
		if err := reportfilter.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := rfc.mutation.Entity(); !ok {
		return &ValidationError{Name: "entity", err: errors.New("ent: missing required field \"entity\"")}
	}
	if v, ok := rfc.mutation.Entity(); ok {
		if err := reportfilter.EntityValidator(v); err != nil {
			return &ValidationError{Name: "entity", err: fmt.Errorf("ent: validator failed for field \"entity\": %w", err)}
		}
	}
	if _, ok := rfc.mutation.Filters(); !ok {
		v := reportfilter.DefaultFilters
		rfc.mutation.SetFilters(v)
	}
	return nil
}

func (rfc *ReportFilterCreate) sqlSave(ctx context.Context) (*ReportFilter, error) {
	rf, _spec := rfc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rfc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	rf.ID = int(id)
	return rf, nil
}

func (rfc *ReportFilterCreate) createSpec() (*ReportFilter, *sqlgraph.CreateSpec) {
	var (
		rf    = &ReportFilter{config: rfc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: reportfilter.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: reportfilter.FieldID,
			},
		}
	)
	if value, ok := rfc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: reportfilter.FieldCreateTime,
		})
		rf.CreateTime = value
	}
	if value, ok := rfc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: reportfilter.FieldUpdateTime,
		})
		rf.UpdateTime = value
	}
	if value, ok := rfc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: reportfilter.FieldName,
		})
		rf.Name = value
	}
	if value, ok := rfc.mutation.Entity(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: reportfilter.FieldEntity,
		})
		rf.Entity = value
	}
	if value, ok := rfc.mutation.Filters(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: reportfilter.FieldFilters,
		})
		rf.Filters = value
	}
	return rf, _spec
}

// ReportFilterCreateBulk is the builder for creating a bulk of ReportFilter entities.
type ReportFilterCreateBulk struct {
	config
	builders []*ReportFilterCreate
}

// Save creates the ReportFilter entities in the database.
func (rfcb *ReportFilterCreateBulk) Save(ctx context.Context) ([]*ReportFilter, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rfcb.builders))
	nodes := make([]*ReportFilter, len(rfcb.builders))
	mutators := make([]Mutator, len(rfcb.builders))
	for i := range rfcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := rfcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*ReportFilterMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, rfcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rfcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
						if cerr, ok := isSQLConstraintError(err); ok {
							err = cerr
						}
					}
				}
				mutation.done = true
				if err != nil {
					return nil, err
				}
				id := specs[i].ID.Value.(int64)
				nodes[i].ID = int(id)
				return nodes[i], nil
			})
			for i := len(rfcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = rfcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, rfcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rfcb *ReportFilterCreateBulk) SaveX(ctx context.Context) []*ReportFilter {
	v, err := rfcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
