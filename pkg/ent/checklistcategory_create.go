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
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategory"
	"github.com/facebookincubator/symphony/pkg/ent/checklistitem"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
)

// CheckListCategoryCreate is the builder for creating a CheckListCategory entity.
type CheckListCategoryCreate struct {
	config
	mutation *CheckListCategoryMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (clcc *CheckListCategoryCreate) SetCreateTime(t time.Time) *CheckListCategoryCreate {
	clcc.mutation.SetCreateTime(t)
	return clcc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (clcc *CheckListCategoryCreate) SetNillableCreateTime(t *time.Time) *CheckListCategoryCreate {
	if t != nil {
		clcc.SetCreateTime(*t)
	}
	return clcc
}

// SetUpdateTime sets the update_time field.
func (clcc *CheckListCategoryCreate) SetUpdateTime(t time.Time) *CheckListCategoryCreate {
	clcc.mutation.SetUpdateTime(t)
	return clcc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (clcc *CheckListCategoryCreate) SetNillableUpdateTime(t *time.Time) *CheckListCategoryCreate {
	if t != nil {
		clcc.SetUpdateTime(*t)
	}
	return clcc
}

// SetTitle sets the title field.
func (clcc *CheckListCategoryCreate) SetTitle(s string) *CheckListCategoryCreate {
	clcc.mutation.SetTitle(s)
	return clcc
}

// SetDescription sets the description field.
func (clcc *CheckListCategoryCreate) SetDescription(s string) *CheckListCategoryCreate {
	clcc.mutation.SetDescription(s)
	return clcc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (clcc *CheckListCategoryCreate) SetNillableDescription(s *string) *CheckListCategoryCreate {
	if s != nil {
		clcc.SetDescription(*s)
	}
	return clcc
}

// AddCheckListItemIDs adds the check_list_items edge to CheckListItem by ids.
func (clcc *CheckListCategoryCreate) AddCheckListItemIDs(ids ...int) *CheckListCategoryCreate {
	clcc.mutation.AddCheckListItemIDs(ids...)
	return clcc
}

// AddCheckListItems adds the check_list_items edges to CheckListItem.
func (clcc *CheckListCategoryCreate) AddCheckListItems(c ...*CheckListItem) *CheckListCategoryCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return clcc.AddCheckListItemIDs(ids...)
}

// SetWorkOrderID sets the work_order edge to WorkOrder by id.
func (clcc *CheckListCategoryCreate) SetWorkOrderID(id int) *CheckListCategoryCreate {
	clcc.mutation.SetWorkOrderID(id)
	return clcc
}

// SetWorkOrder sets the work_order edge to WorkOrder.
func (clcc *CheckListCategoryCreate) SetWorkOrder(w *WorkOrder) *CheckListCategoryCreate {
	return clcc.SetWorkOrderID(w.ID)
}

// Mutation returns the CheckListCategoryMutation object of the builder.
func (clcc *CheckListCategoryCreate) Mutation() *CheckListCategoryMutation {
	return clcc.mutation
}

// Save creates the CheckListCategory in the database.
func (clcc *CheckListCategoryCreate) Save(ctx context.Context) (*CheckListCategory, error) {
	if err := clcc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *CheckListCategory
	)
	if len(clcc.hooks) == 0 {
		node, err = clcc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*CheckListCategoryMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			clcc.mutation = mutation
			node, err = clcc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(clcc.hooks) - 1; i >= 0; i-- {
			mut = clcc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, clcc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (clcc *CheckListCategoryCreate) SaveX(ctx context.Context) *CheckListCategory {
	v, err := clcc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (clcc *CheckListCategoryCreate) preSave() error {
	if _, ok := clcc.mutation.CreateTime(); !ok {
		v := checklistcategory.DefaultCreateTime()
		clcc.mutation.SetCreateTime(v)
	}
	if _, ok := clcc.mutation.UpdateTime(); !ok {
		v := checklistcategory.DefaultUpdateTime()
		clcc.mutation.SetUpdateTime(v)
	}
	if _, ok := clcc.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New("ent: missing required field \"title\"")}
	}
	if _, ok := clcc.mutation.WorkOrderID(); !ok {
		return &ValidationError{Name: "work_order", err: errors.New("ent: missing required edge \"work_order\"")}
	}
	return nil
}

func (clcc *CheckListCategoryCreate) sqlSave(ctx context.Context) (*CheckListCategory, error) {
	clc, _spec := clcc.createSpec()
	if err := sqlgraph.CreateNode(ctx, clcc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	clc.ID = int(id)
	return clc, nil
}

func (clcc *CheckListCategoryCreate) createSpec() (*CheckListCategory, *sqlgraph.CreateSpec) {
	var (
		clc   = &CheckListCategory{config: clcc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: checklistcategory.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: checklistcategory.FieldID,
			},
		}
	)
	if value, ok := clcc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: checklistcategory.FieldCreateTime,
		})
		clc.CreateTime = value
	}
	if value, ok := clcc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: checklistcategory.FieldUpdateTime,
		})
		clc.UpdateTime = value
	}
	if value, ok := clcc.mutation.Title(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistcategory.FieldTitle,
		})
		clc.Title = value
	}
	if value, ok := clcc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistcategory.FieldDescription,
		})
		clc.Description = value
	}
	if nodes := clcc.mutation.CheckListItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   checklistcategory.CheckListItemsTable,
			Columns: []string{checklistcategory.CheckListItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: checklistitem.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := clcc.mutation.WorkOrderIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   checklistcategory.WorkOrderTable,
			Columns: []string{checklistcategory.WorkOrderColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return clc, _spec
}

// CheckListCategoryCreateBulk is the builder for creating a bulk of CheckListCategory entities.
type CheckListCategoryCreateBulk struct {
	config
	builders []*CheckListCategoryCreate
}

// Save creates the CheckListCategory entities in the database.
func (clccb *CheckListCategoryCreateBulk) Save(ctx context.Context) ([]*CheckListCategory, error) {
	specs := make([]*sqlgraph.CreateSpec, len(clccb.builders))
	nodes := make([]*CheckListCategory, len(clccb.builders))
	mutators := make([]Mutator, len(clccb.builders))
	for i := range clccb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := clccb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*CheckListCategoryMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, clccb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, clccb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(clccb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = clccb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, clccb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (clccb *CheckListCategoryCreateBulk) SaveX(ctx context.Context) []*CheckListCategory {
	v, err := clccb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
