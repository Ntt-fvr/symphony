// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/workorderdefinition"
	"github.com/facebookincubator/symphony/pkg/ent/workordertype"
)

// WorkOrderDefinitionCreate is the builder for creating a WorkOrderDefinition entity.
type WorkOrderDefinitionCreate struct {
	config
	mutation *WorkOrderDefinitionMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (wodc *WorkOrderDefinitionCreate) SetCreateTime(t time.Time) *WorkOrderDefinitionCreate {
	wodc.mutation.SetCreateTime(t)
	return wodc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableCreateTime(t *time.Time) *WorkOrderDefinitionCreate {
	if t != nil {
		wodc.SetCreateTime(*t)
	}
	return wodc
}

// SetUpdateTime sets the update_time field.
func (wodc *WorkOrderDefinitionCreate) SetUpdateTime(t time.Time) *WorkOrderDefinitionCreate {
	wodc.mutation.SetUpdateTime(t)
	return wodc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableUpdateTime(t *time.Time) *WorkOrderDefinitionCreate {
	if t != nil {
		wodc.SetUpdateTime(*t)
	}
	return wodc
}

// SetIndex sets the index field.
func (wodc *WorkOrderDefinitionCreate) SetIndex(i int) *WorkOrderDefinitionCreate {
	wodc.mutation.SetIndex(i)
	return wodc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableIndex(i *int) *WorkOrderDefinitionCreate {
	if i != nil {
		wodc.SetIndex(*i)
	}
	return wodc
}

// SetTypeID sets the type edge to WorkOrderType by id.
func (wodc *WorkOrderDefinitionCreate) SetTypeID(id int) *WorkOrderDefinitionCreate {
	wodc.mutation.SetTypeID(id)
	return wodc
}

// SetNillableTypeID sets the type edge to WorkOrderType by id if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableTypeID(id *int) *WorkOrderDefinitionCreate {
	if id != nil {
		wodc = wodc.SetTypeID(*id)
	}
	return wodc
}

// SetType sets the type edge to WorkOrderType.
func (wodc *WorkOrderDefinitionCreate) SetType(w *WorkOrderType) *WorkOrderDefinitionCreate {
	return wodc.SetTypeID(w.ID)
}

// SetProjectTypeID sets the project_type edge to ProjectType by id.
func (wodc *WorkOrderDefinitionCreate) SetProjectTypeID(id int) *WorkOrderDefinitionCreate {
	wodc.mutation.SetProjectTypeID(id)
	return wodc
}

// SetNillableProjectTypeID sets the project_type edge to ProjectType by id if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableProjectTypeID(id *int) *WorkOrderDefinitionCreate {
	if id != nil {
		wodc = wodc.SetProjectTypeID(*id)
	}
	return wodc
}

// SetProjectType sets the project_type edge to ProjectType.
func (wodc *WorkOrderDefinitionCreate) SetProjectType(p *ProjectType) *WorkOrderDefinitionCreate {
	return wodc.SetProjectTypeID(p.ID)
}

// SetProjectTemplateID sets the project_template edge to ProjectTemplate by id.
func (wodc *WorkOrderDefinitionCreate) SetProjectTemplateID(id int) *WorkOrderDefinitionCreate {
	wodc.mutation.SetProjectTemplateID(id)
	return wodc
}

// SetNillableProjectTemplateID sets the project_template edge to ProjectTemplate by id if the given value is not nil.
func (wodc *WorkOrderDefinitionCreate) SetNillableProjectTemplateID(id *int) *WorkOrderDefinitionCreate {
	if id != nil {
		wodc = wodc.SetProjectTemplateID(*id)
	}
	return wodc
}

// SetProjectTemplate sets the project_template edge to ProjectTemplate.
func (wodc *WorkOrderDefinitionCreate) SetProjectTemplate(p *ProjectTemplate) *WorkOrderDefinitionCreate {
	return wodc.SetProjectTemplateID(p.ID)
}

// Mutation returns the WorkOrderDefinitionMutation object of the builder.
func (wodc *WorkOrderDefinitionCreate) Mutation() *WorkOrderDefinitionMutation {
	return wodc.mutation
}

// Save creates the WorkOrderDefinition in the database.
func (wodc *WorkOrderDefinitionCreate) Save(ctx context.Context) (*WorkOrderDefinition, error) {
	if err := wodc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *WorkOrderDefinition
	)
	if len(wodc.hooks) == 0 {
		node, err = wodc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WorkOrderDefinitionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wodc.mutation = mutation
			node, err = wodc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(wodc.hooks) - 1; i >= 0; i-- {
			mut = wodc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wodc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (wodc *WorkOrderDefinitionCreate) SaveX(ctx context.Context) *WorkOrderDefinition {
	v, err := wodc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (wodc *WorkOrderDefinitionCreate) preSave() error {
	if _, ok := wodc.mutation.CreateTime(); !ok {
		v := workorderdefinition.DefaultCreateTime()
		wodc.mutation.SetCreateTime(v)
	}
	if _, ok := wodc.mutation.UpdateTime(); !ok {
		v := workorderdefinition.DefaultUpdateTime()
		wodc.mutation.SetUpdateTime(v)
	}
	return nil
}

func (wodc *WorkOrderDefinitionCreate) sqlSave(ctx context.Context) (*WorkOrderDefinition, error) {
	wod, _spec := wodc.createSpec()
	if err := sqlgraph.CreateNode(ctx, wodc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	wod.ID = int(id)
	return wod, nil
}

func (wodc *WorkOrderDefinitionCreate) createSpec() (*WorkOrderDefinition, *sqlgraph.CreateSpec) {
	var (
		wod   = &WorkOrderDefinition{config: wodc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: workorderdefinition.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: workorderdefinition.FieldID,
			},
		}
	)
	if value, ok := wodc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorderdefinition.FieldCreateTime,
		})
		wod.CreateTime = value
	}
	if value, ok := wodc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorderdefinition.FieldUpdateTime,
		})
		wod.UpdateTime = value
	}
	if value, ok := wodc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: workorderdefinition.FieldIndex,
		})
		wod.Index = value
	}
	if nodes := wodc.mutation.TypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorderdefinition.TypeTable,
			Columns: []string{workorderdefinition.TypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workordertype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wodc.mutation.ProjectTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   workorderdefinition.ProjectTypeTable,
			Columns: []string{workorderdefinition.ProjectTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: projecttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wodc.mutation.ProjectTemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   workorderdefinition.ProjectTemplateTable,
			Columns: []string{workorderdefinition.ProjectTemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: projecttemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return wod, _spec
}

// WorkOrderDefinitionCreateBulk is the builder for creating a bulk of WorkOrderDefinition entities.
type WorkOrderDefinitionCreateBulk struct {
	config
	builders []*WorkOrderDefinitionCreate
}

// Save creates the WorkOrderDefinition entities in the database.
func (wodcb *WorkOrderDefinitionCreateBulk) Save(ctx context.Context) ([]*WorkOrderDefinition, error) {
	specs := make([]*sqlgraph.CreateSpec, len(wodcb.builders))
	nodes := make([]*WorkOrderDefinition, len(wodcb.builders))
	mutators := make([]Mutator, len(wodcb.builders))
	for i := range wodcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := wodcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*WorkOrderDefinitionMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, wodcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, wodcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(wodcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = wodcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, wodcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (wodcb *WorkOrderDefinitionCreateBulk) SaveX(ctx context.Context) []*WorkOrderDefinition {
	v, err := wodcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
