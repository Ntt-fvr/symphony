// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategorydefinition"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/workordertemplate"
	"github.com/facebookincubator/symphony/pkg/ent/workordertype"
)

// WorkOrderTemplateCreate is the builder for creating a WorkOrderTemplate entity.
type WorkOrderTemplateCreate struct {
	config
	mutation *WorkOrderTemplateMutation
	hooks    []Hook
}

// SetName sets the name field.
func (wotc *WorkOrderTemplateCreate) SetName(s string) *WorkOrderTemplateCreate {
	wotc.mutation.SetName(s)
	return wotc
}

// SetDescription sets the description field.
func (wotc *WorkOrderTemplateCreate) SetDescription(s string) *WorkOrderTemplateCreate {
	wotc.mutation.SetDescription(s)
	return wotc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (wotc *WorkOrderTemplateCreate) SetNillableDescription(s *string) *WorkOrderTemplateCreate {
	if s != nil {
		wotc.SetDescription(*s)
	}
	return wotc
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (wotc *WorkOrderTemplateCreate) AddPropertyTypeIDs(ids ...int) *WorkOrderTemplateCreate {
	wotc.mutation.AddPropertyTypeIDs(ids...)
	return wotc
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (wotc *WorkOrderTemplateCreate) AddPropertyTypes(p ...*PropertyType) *WorkOrderTemplateCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wotc.AddPropertyTypeIDs(ids...)
}

// AddCheckListCategoryDefinitionIDs adds the check_list_category_definitions edge to CheckListCategoryDefinition by ids.
func (wotc *WorkOrderTemplateCreate) AddCheckListCategoryDefinitionIDs(ids ...int) *WorkOrderTemplateCreate {
	wotc.mutation.AddCheckListCategoryDefinitionIDs(ids...)
	return wotc
}

// AddCheckListCategoryDefinitions adds the check_list_category_definitions edges to CheckListCategoryDefinition.
func (wotc *WorkOrderTemplateCreate) AddCheckListCategoryDefinitions(c ...*CheckListCategoryDefinition) *WorkOrderTemplateCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return wotc.AddCheckListCategoryDefinitionIDs(ids...)
}

// SetTypeID sets the type edge to WorkOrderType by id.
func (wotc *WorkOrderTemplateCreate) SetTypeID(id int) *WorkOrderTemplateCreate {
	wotc.mutation.SetTypeID(id)
	return wotc
}

// SetNillableTypeID sets the type edge to WorkOrderType by id if the given value is not nil.
func (wotc *WorkOrderTemplateCreate) SetNillableTypeID(id *int) *WorkOrderTemplateCreate {
	if id != nil {
		wotc = wotc.SetTypeID(*id)
	}
	return wotc
}

// SetType sets the type edge to WorkOrderType.
func (wotc *WorkOrderTemplateCreate) SetType(w *WorkOrderType) *WorkOrderTemplateCreate {
	return wotc.SetTypeID(w.ID)
}

// Mutation returns the WorkOrderTemplateMutation object of the builder.
func (wotc *WorkOrderTemplateCreate) Mutation() *WorkOrderTemplateMutation {
	return wotc.mutation
}

// Save creates the WorkOrderTemplate in the database.
func (wotc *WorkOrderTemplateCreate) Save(ctx context.Context) (*WorkOrderTemplate, error) {
	if err := wotc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *WorkOrderTemplate
	)
	if len(wotc.hooks) == 0 {
		node, err = wotc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WorkOrderTemplateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wotc.mutation = mutation
			node, err = wotc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(wotc.hooks) - 1; i >= 0; i-- {
			mut = wotc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wotc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (wotc *WorkOrderTemplateCreate) SaveX(ctx context.Context) *WorkOrderTemplate {
	v, err := wotc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (wotc *WorkOrderTemplateCreate) preSave() error {
	if _, ok := wotc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	return nil
}

func (wotc *WorkOrderTemplateCreate) sqlSave(ctx context.Context) (*WorkOrderTemplate, error) {
	wot, _spec := wotc.createSpec()
	if err := sqlgraph.CreateNode(ctx, wotc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	wot.ID = int(id)
	return wot, nil
}

func (wotc *WorkOrderTemplateCreate) createSpec() (*WorkOrderTemplate, *sqlgraph.CreateSpec) {
	var (
		wot   = &WorkOrderTemplate{config: wotc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: workordertemplate.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: workordertemplate.FieldID,
			},
		}
	)
	if value, ok := wotc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workordertemplate.FieldName,
		})
		wot.Name = value
	}
	if value, ok := wotc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workordertemplate.FieldDescription,
		})
		wot.Description = &value
	}
	if nodes := wotc.mutation.PropertyTypesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workordertemplate.PropertyTypesTable,
			Columns: []string{workordertemplate.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wotc.mutation.CheckListCategoryDefinitionsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workordertemplate.CheckListCategoryDefinitionsTable,
			Columns: []string{workordertemplate.CheckListCategoryDefinitionsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: checklistcategorydefinition.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wotc.mutation.TypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workordertemplate.TypeTable,
			Columns: []string{workordertemplate.TypeColumn},
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
	return wot, _spec
}

// WorkOrderTemplateCreateBulk is the builder for creating a bulk of WorkOrderTemplate entities.
type WorkOrderTemplateCreateBulk struct {
	config
	builders []*WorkOrderTemplateCreate
}

// Save creates the WorkOrderTemplate entities in the database.
func (wotcb *WorkOrderTemplateCreateBulk) Save(ctx context.Context) ([]*WorkOrderTemplate, error) {
	specs := make([]*sqlgraph.CreateSpec, len(wotcb.builders))
	nodes := make([]*WorkOrderTemplate, len(wotcb.builders))
	mutators := make([]Mutator, len(wotcb.builders))
	for i := range wotcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := wotcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*WorkOrderTemplateMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, wotcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, wotcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(wotcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = wotcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, wotcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (wotcb *WorkOrderTemplateCreateBulk) SaveX(ctx context.Context) []*WorkOrderTemplate {
	v, err := wotcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
