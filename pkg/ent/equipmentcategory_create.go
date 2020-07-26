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
	"github.com/facebookincubator/symphony/pkg/ent/equipmentcategory"
	"github.com/facebookincubator/symphony/pkg/ent/equipmenttype"
)

// EquipmentCategoryCreate is the builder for creating a EquipmentCategory entity.
type EquipmentCategoryCreate struct {
	config
	mutation *EquipmentCategoryMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (ecc *EquipmentCategoryCreate) SetCreateTime(t time.Time) *EquipmentCategoryCreate {
	ecc.mutation.SetCreateTime(t)
	return ecc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (ecc *EquipmentCategoryCreate) SetNillableCreateTime(t *time.Time) *EquipmentCategoryCreate {
	if t != nil {
		ecc.SetCreateTime(*t)
	}
	return ecc
}

// SetUpdateTime sets the update_time field.
func (ecc *EquipmentCategoryCreate) SetUpdateTime(t time.Time) *EquipmentCategoryCreate {
	ecc.mutation.SetUpdateTime(t)
	return ecc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (ecc *EquipmentCategoryCreate) SetNillableUpdateTime(t *time.Time) *EquipmentCategoryCreate {
	if t != nil {
		ecc.SetUpdateTime(*t)
	}
	return ecc
}

// SetName sets the name field.
func (ecc *EquipmentCategoryCreate) SetName(s string) *EquipmentCategoryCreate {
	ecc.mutation.SetName(s)
	return ecc
}

// AddTypeIDs adds the types edge to EquipmentType by ids.
func (ecc *EquipmentCategoryCreate) AddTypeIDs(ids ...int) *EquipmentCategoryCreate {
	ecc.mutation.AddTypeIDs(ids...)
	return ecc
}

// AddTypes adds the types edges to EquipmentType.
func (ecc *EquipmentCategoryCreate) AddTypes(e ...*EquipmentType) *EquipmentCategoryCreate {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return ecc.AddTypeIDs(ids...)
}

// Mutation returns the EquipmentCategoryMutation object of the builder.
func (ecc *EquipmentCategoryCreate) Mutation() *EquipmentCategoryMutation {
	return ecc.mutation
}

// Save creates the EquipmentCategory in the database.
func (ecc *EquipmentCategoryCreate) Save(ctx context.Context) (*EquipmentCategory, error) {
	if err := ecc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *EquipmentCategory
	)
	if len(ecc.hooks) == 0 {
		node, err = ecc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*EquipmentCategoryMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ecc.mutation = mutation
			node, err = ecc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ecc.hooks) - 1; i >= 0; i-- {
			mut = ecc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ecc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ecc *EquipmentCategoryCreate) SaveX(ctx context.Context) *EquipmentCategory {
	v, err := ecc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ecc *EquipmentCategoryCreate) preSave() error {
	if _, ok := ecc.mutation.CreateTime(); !ok {
		v := equipmentcategory.DefaultCreateTime()
		ecc.mutation.SetCreateTime(v)
	}
	if _, ok := ecc.mutation.UpdateTime(); !ok {
		v := equipmentcategory.DefaultUpdateTime()
		ecc.mutation.SetUpdateTime(v)
	}
	if _, ok := ecc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	return nil
}

func (ecc *EquipmentCategoryCreate) sqlSave(ctx context.Context) (*EquipmentCategory, error) {
	ec, _spec := ecc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ecc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	ec.ID = int(id)
	return ec, nil
}

func (ecc *EquipmentCategoryCreate) createSpec() (*EquipmentCategory, *sqlgraph.CreateSpec) {
	var (
		ec    = &EquipmentCategory{config: ecc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: equipmentcategory.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: equipmentcategory.FieldID,
			},
		}
	)
	if value, ok := ecc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: equipmentcategory.FieldCreateTime,
		})
		ec.CreateTime = value
	}
	if value, ok := ecc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: equipmentcategory.FieldUpdateTime,
		})
		ec.UpdateTime = value
	}
	if value, ok := ecc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: equipmentcategory.FieldName,
		})
		ec.Name = value
	}
	if nodes := ecc.mutation.TypesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   equipmentcategory.TypesTable,
			Columns: []string{equipmentcategory.TypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmenttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return ec, _spec
}

// EquipmentCategoryCreateBulk is the builder for creating a bulk of EquipmentCategory entities.
type EquipmentCategoryCreateBulk struct {
	config
	builders []*EquipmentCategoryCreate
}

// Save creates the EquipmentCategory entities in the database.
func (eccb *EquipmentCategoryCreateBulk) Save(ctx context.Context) ([]*EquipmentCategory, error) {
	specs := make([]*sqlgraph.CreateSpec, len(eccb.builders))
	nodes := make([]*EquipmentCategory, len(eccb.builders))
	mutators := make([]Mutator, len(eccb.builders))
	for i := range eccb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := eccb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*EquipmentCategoryMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, eccb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, eccb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(eccb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = eccb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, eccb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (eccb *EquipmentCategoryCreateBulk) SaveX(ctx context.Context) []*EquipmentCategory {
	v, err := eccb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
