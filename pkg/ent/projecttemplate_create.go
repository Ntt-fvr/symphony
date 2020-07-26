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
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/workorderdefinition"
)

// ProjectTemplateCreate is the builder for creating a ProjectTemplate entity.
type ProjectTemplateCreate struct {
	config
	mutation *ProjectTemplateMutation
	hooks    []Hook
}

// SetName sets the name field.
func (ptc *ProjectTemplateCreate) SetName(s string) *ProjectTemplateCreate {
	ptc.mutation.SetName(s)
	return ptc
}

// SetDescription sets the description field.
func (ptc *ProjectTemplateCreate) SetDescription(s string) *ProjectTemplateCreate {
	ptc.mutation.SetDescription(s)
	return ptc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (ptc *ProjectTemplateCreate) SetNillableDescription(s *string) *ProjectTemplateCreate {
	if s != nil {
		ptc.SetDescription(*s)
	}
	return ptc
}

// AddPropertyIDs adds the properties edge to PropertyType by ids.
func (ptc *ProjectTemplateCreate) AddPropertyIDs(ids ...int) *ProjectTemplateCreate {
	ptc.mutation.AddPropertyIDs(ids...)
	return ptc
}

// AddProperties adds the properties edges to PropertyType.
func (ptc *ProjectTemplateCreate) AddProperties(p ...*PropertyType) *ProjectTemplateCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptc.AddPropertyIDs(ids...)
}

// AddWorkOrderIDs adds the work_orders edge to WorkOrderDefinition by ids.
func (ptc *ProjectTemplateCreate) AddWorkOrderIDs(ids ...int) *ProjectTemplateCreate {
	ptc.mutation.AddWorkOrderIDs(ids...)
	return ptc
}

// AddWorkOrders adds the work_orders edges to WorkOrderDefinition.
func (ptc *ProjectTemplateCreate) AddWorkOrders(w ...*WorkOrderDefinition) *ProjectTemplateCreate {
	ids := make([]int, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return ptc.AddWorkOrderIDs(ids...)
}

// SetTypeID sets the type edge to ProjectType by id.
func (ptc *ProjectTemplateCreate) SetTypeID(id int) *ProjectTemplateCreate {
	ptc.mutation.SetTypeID(id)
	return ptc
}

// SetNillableTypeID sets the type edge to ProjectType by id if the given value is not nil.
func (ptc *ProjectTemplateCreate) SetNillableTypeID(id *int) *ProjectTemplateCreate {
	if id != nil {
		ptc = ptc.SetTypeID(*id)
	}
	return ptc
}

// SetType sets the type edge to ProjectType.
func (ptc *ProjectTemplateCreate) SetType(p *ProjectType) *ProjectTemplateCreate {
	return ptc.SetTypeID(p.ID)
}

// Mutation returns the ProjectTemplateMutation object of the builder.
func (ptc *ProjectTemplateCreate) Mutation() *ProjectTemplateMutation {
	return ptc.mutation
}

// Save creates the ProjectTemplate in the database.
func (ptc *ProjectTemplateCreate) Save(ctx context.Context) (*ProjectTemplate, error) {
	if err := ptc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *ProjectTemplate
	)
	if len(ptc.hooks) == 0 {
		node, err = ptc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ProjectTemplateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ptc.mutation = mutation
			node, err = ptc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ptc.hooks) - 1; i >= 0; i-- {
			mut = ptc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ptc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ptc *ProjectTemplateCreate) SaveX(ctx context.Context) *ProjectTemplate {
	v, err := ptc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ptc *ProjectTemplateCreate) preSave() error {
	if _, ok := ptc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := ptc.mutation.Name(); ok {
		if err := projecttemplate.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (ptc *ProjectTemplateCreate) sqlSave(ctx context.Context) (*ProjectTemplate, error) {
	pt, _spec := ptc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ptc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	pt.ID = int(id)
	return pt, nil
}

func (ptc *ProjectTemplateCreate) createSpec() (*ProjectTemplate, *sqlgraph.CreateSpec) {
	var (
		pt    = &ProjectTemplate{config: ptc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: projecttemplate.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: projecttemplate.FieldID,
			},
		}
	)
	if value, ok := ptc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: projecttemplate.FieldName,
		})
		pt.Name = value
	}
	if value, ok := ptc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: projecttemplate.FieldDescription,
		})
		pt.Description = &value
	}
	if nodes := ptc.mutation.PropertiesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   projecttemplate.PropertiesTable,
			Columns: []string{projecttemplate.PropertiesColumn},
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
	if nodes := ptc.mutation.WorkOrdersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   projecttemplate.WorkOrdersTable,
			Columns: []string{projecttemplate.WorkOrdersColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorderdefinition.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.TypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   projecttemplate.TypeTable,
			Columns: []string{projecttemplate.TypeColumn},
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
	return pt, _spec
}

// ProjectTemplateCreateBulk is the builder for creating a bulk of ProjectTemplate entities.
type ProjectTemplateCreateBulk struct {
	config
	builders []*ProjectTemplateCreate
}

// Save creates the ProjectTemplate entities in the database.
func (ptcb *ProjectTemplateCreateBulk) Save(ctx context.Context) ([]*ProjectTemplate, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ptcb.builders))
	nodes := make([]*ProjectTemplate, len(ptcb.builders))
	mutators := make([]Mutator, len(ptcb.builders))
	for i := range ptcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := ptcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*ProjectTemplateMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ptcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ptcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(ptcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = ptcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, ptcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ptcb *ProjectTemplateCreateBulk) SaveX(ctx context.Context) []*ProjectTemplate {
	v, err := ptcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
