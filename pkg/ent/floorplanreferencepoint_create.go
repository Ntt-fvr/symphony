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
	"github.com/facebookincubator/symphony/pkg/ent/floorplanreferencepoint"
)

// FloorPlanReferencePointCreate is the builder for creating a FloorPlanReferencePoint entity.
type FloorPlanReferencePointCreate struct {
	config
	mutation *FloorPlanReferencePointMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (fprpc *FloorPlanReferencePointCreate) SetCreateTime(t time.Time) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetCreateTime(t)
	return fprpc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fprpc *FloorPlanReferencePointCreate) SetNillableCreateTime(t *time.Time) *FloorPlanReferencePointCreate {
	if t != nil {
		fprpc.SetCreateTime(*t)
	}
	return fprpc
}

// SetUpdateTime sets the update_time field.
func (fprpc *FloorPlanReferencePointCreate) SetUpdateTime(t time.Time) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetUpdateTime(t)
	return fprpc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fprpc *FloorPlanReferencePointCreate) SetNillableUpdateTime(t *time.Time) *FloorPlanReferencePointCreate {
	if t != nil {
		fprpc.SetUpdateTime(*t)
	}
	return fprpc
}

// SetX sets the x field.
func (fprpc *FloorPlanReferencePointCreate) SetX(i int) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetX(i)
	return fprpc
}

// SetY sets the y field.
func (fprpc *FloorPlanReferencePointCreate) SetY(i int) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetY(i)
	return fprpc
}

// SetLatitude sets the latitude field.
func (fprpc *FloorPlanReferencePointCreate) SetLatitude(f float64) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetLatitude(f)
	return fprpc
}

// SetLongitude sets the longitude field.
func (fprpc *FloorPlanReferencePointCreate) SetLongitude(f float64) *FloorPlanReferencePointCreate {
	fprpc.mutation.SetLongitude(f)
	return fprpc
}

// Mutation returns the FloorPlanReferencePointMutation object of the builder.
func (fprpc *FloorPlanReferencePointCreate) Mutation() *FloorPlanReferencePointMutation {
	return fprpc.mutation
}

// Save creates the FloorPlanReferencePoint in the database.
func (fprpc *FloorPlanReferencePointCreate) Save(ctx context.Context) (*FloorPlanReferencePoint, error) {
	if err := fprpc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *FloorPlanReferencePoint
	)
	if len(fprpc.hooks) == 0 {
		node, err = fprpc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FloorPlanReferencePointMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			fprpc.mutation = mutation
			node, err = fprpc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fprpc.hooks) - 1; i >= 0; i-- {
			mut = fprpc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fprpc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fprpc *FloorPlanReferencePointCreate) SaveX(ctx context.Context) *FloorPlanReferencePoint {
	v, err := fprpc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fprpc *FloorPlanReferencePointCreate) preSave() error {
	if _, ok := fprpc.mutation.CreateTime(); !ok {
		v := floorplanreferencepoint.DefaultCreateTime()
		fprpc.mutation.SetCreateTime(v)
	}
	if _, ok := fprpc.mutation.UpdateTime(); !ok {
		v := floorplanreferencepoint.DefaultUpdateTime()
		fprpc.mutation.SetUpdateTime(v)
	}
	if _, ok := fprpc.mutation.X(); !ok {
		return &ValidationError{Name: "x", err: errors.New("ent: missing required field \"x\"")}
	}
	if _, ok := fprpc.mutation.Y(); !ok {
		return &ValidationError{Name: "y", err: errors.New("ent: missing required field \"y\"")}
	}
	if _, ok := fprpc.mutation.Latitude(); !ok {
		return &ValidationError{Name: "latitude", err: errors.New("ent: missing required field \"latitude\"")}
	}
	if _, ok := fprpc.mutation.Longitude(); !ok {
		return &ValidationError{Name: "longitude", err: errors.New("ent: missing required field \"longitude\"")}
	}
	return nil
}

func (fprpc *FloorPlanReferencePointCreate) sqlSave(ctx context.Context) (*FloorPlanReferencePoint, error) {
	fprp, _spec := fprpc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fprpc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	fprp.ID = int(id)
	return fprp, nil
}

func (fprpc *FloorPlanReferencePointCreate) createSpec() (*FloorPlanReferencePoint, *sqlgraph.CreateSpec) {
	var (
		fprp  = &FloorPlanReferencePoint{config: fprpc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: floorplanreferencepoint.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: floorplanreferencepoint.FieldID,
			},
		}
	)
	if value, ok := fprpc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: floorplanreferencepoint.FieldCreateTime,
		})
		fprp.CreateTime = value
	}
	if value, ok := fprpc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: floorplanreferencepoint.FieldUpdateTime,
		})
		fprp.UpdateTime = value
	}
	if value, ok := fprpc.mutation.X(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: floorplanreferencepoint.FieldX,
		})
		fprp.X = value
	}
	if value, ok := fprpc.mutation.Y(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: floorplanreferencepoint.FieldY,
		})
		fprp.Y = value
	}
	if value, ok := fprpc.mutation.Latitude(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: floorplanreferencepoint.FieldLatitude,
		})
		fprp.Latitude = value
	}
	if value, ok := fprpc.mutation.Longitude(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: floorplanreferencepoint.FieldLongitude,
		})
		fprp.Longitude = value
	}
	return fprp, _spec
}

// FloorPlanReferencePointCreateBulk is the builder for creating a bulk of FloorPlanReferencePoint entities.
type FloorPlanReferencePointCreateBulk struct {
	config
	builders []*FloorPlanReferencePointCreate
}

// Save creates the FloorPlanReferencePoint entities in the database.
func (fprpcb *FloorPlanReferencePointCreateBulk) Save(ctx context.Context) ([]*FloorPlanReferencePoint, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fprpcb.builders))
	nodes := make([]*FloorPlanReferencePoint, len(fprpcb.builders))
	mutators := make([]Mutator, len(fprpcb.builders))
	for i := range fprpcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := fprpcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*FloorPlanReferencePointMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, fprpcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, fprpcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(fprpcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = fprpcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, fprpcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (fprpcb *FloorPlanReferencePointCreateBulk) SaveX(ctx context.Context) []*FloorPlanReferencePoint {
	v, err := fprpcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
