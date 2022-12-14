// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
)

// ResourceSpecificationRelationshipCreate is the builder for creating a ResourceSpecificationRelationship entity.
type ResourceSpecificationRelationshipCreate struct {
	config
	mutation *ResourceSpecificationRelationshipMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rsrc *ResourceSpecificationRelationshipCreate) SetCreateTime(t time.Time) *ResourceSpecificationRelationshipCreate {
	rsrc.mutation.SetCreateTime(t)
	return rsrc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rsrc *ResourceSpecificationRelationshipCreate) SetNillableCreateTime(t *time.Time) *ResourceSpecificationRelationshipCreate {
	if t != nil {
		rsrc.SetCreateTime(*t)
	}
	return rsrc
}

// SetUpdateTime sets the update_time field.
func (rsrc *ResourceSpecificationRelationshipCreate) SetUpdateTime(t time.Time) *ResourceSpecificationRelationshipCreate {
	rsrc.mutation.SetUpdateTime(t)
	return rsrc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rsrc *ResourceSpecificationRelationshipCreate) SetNillableUpdateTime(t *time.Time) *ResourceSpecificationRelationshipCreate {
	if t != nil {
		rsrc.SetUpdateTime(*t)
	}
	return rsrc
}

// SetName sets the name field.
func (rsrc *ResourceSpecificationRelationshipCreate) SetName(s string) *ResourceSpecificationRelationshipCreate {
	rsrc.mutation.SetName(s)
	return rsrc
}

// SetResourcespecificationID sets the resourcespecification edge to ResourceSpecification by id.
func (rsrc *ResourceSpecificationRelationshipCreate) SetResourcespecificationID(id int) *ResourceSpecificationRelationshipCreate {
	rsrc.mutation.SetResourcespecificationID(id)
	return rsrc
}

// SetNillableResourcespecificationID sets the resourcespecification edge to ResourceSpecification by id if the given value is not nil.
func (rsrc *ResourceSpecificationRelationshipCreate) SetNillableResourcespecificationID(id *int) *ResourceSpecificationRelationshipCreate {
	if id != nil {
		rsrc = rsrc.SetResourcespecificationID(*id)
	}
	return rsrc
}

// SetResourcespecification sets the resourcespecification edge to ResourceSpecification.
func (rsrc *ResourceSpecificationRelationshipCreate) SetResourcespecification(r *ResourceSpecification) *ResourceSpecificationRelationshipCreate {
	return rsrc.SetResourcespecificationID(r.ID)
}

// AddResourceSrIDs adds the resource_sr edge to ResourceSpecificationItems by ids.
func (rsrc *ResourceSpecificationRelationshipCreate) AddResourceSrIDs(ids ...int) *ResourceSpecificationRelationshipCreate {
	rsrc.mutation.AddResourceSrIDs(ids...)
	return rsrc
}

// AddResourceSr adds the resource_sr edges to ResourceSpecificationItems.
func (rsrc *ResourceSpecificationRelationshipCreate) AddResourceSr(r ...*ResourceSpecificationItems) *ResourceSpecificationRelationshipCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsrc.AddResourceSrIDs(ids...)
}

// Mutation returns the ResourceSpecificationRelationshipMutation object of the builder.
func (rsrc *ResourceSpecificationRelationshipCreate) Mutation() *ResourceSpecificationRelationshipMutation {
	return rsrc.mutation
}

// Save creates the ResourceSpecificationRelationship in the database.
func (rsrc *ResourceSpecificationRelationshipCreate) Save(ctx context.Context) (*ResourceSpecificationRelationship, error) {
	var (
		err  error
		node *ResourceSpecificationRelationship
	)
	rsrc.defaults()
	if len(rsrc.hooks) == 0 {
		if err = rsrc.check(); err != nil {
			return nil, err
		}
		node, err = rsrc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSpecificationRelationshipMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rsrc.check(); err != nil {
				return nil, err
			}
			rsrc.mutation = mutation
			node, err = rsrc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rsrc.hooks) - 1; i >= 0; i-- {
			mut = rsrc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rsrc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rsrc *ResourceSpecificationRelationshipCreate) SaveX(ctx context.Context) *ResourceSpecificationRelationship {
	v, err := rsrc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rsrc *ResourceSpecificationRelationshipCreate) defaults() {
	if _, ok := rsrc.mutation.CreateTime(); !ok {
		v := resourcespecificationrelationship.DefaultCreateTime()
		rsrc.mutation.SetCreateTime(v)
	}
	if _, ok := rsrc.mutation.UpdateTime(); !ok {
		v := resourcespecificationrelationship.DefaultUpdateTime()
		rsrc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsrc *ResourceSpecificationRelationshipCreate) check() error {
	if _, ok := rsrc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rsrc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := rsrc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := rsrc.mutation.Name(); ok {
		if err := resourcespecificationrelationship.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (rsrc *ResourceSpecificationRelationshipCreate) sqlSave(ctx context.Context) (*ResourceSpecificationRelationship, error) {
	_node, _spec := rsrc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rsrc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rsrc *ResourceSpecificationRelationshipCreate) createSpec() (*ResourceSpecificationRelationship, *sqlgraph.CreateSpec) {
	var (
		_node = &ResourceSpecificationRelationship{config: rsrc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: resourcespecificationrelationship.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecificationrelationship.FieldID,
			},
		}
	)
	if value, ok := rsrc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecificationrelationship.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rsrc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecificationrelationship.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := rsrc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcespecificationrelationship.FieldName,
		})
		_node.Name = value
	}
	if nodes := rsrc.mutation.ResourcespecificationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcespecificationrelationship.ResourcespecificationTable,
			Columns: []string{resourcespecificationrelationship.ResourcespecificationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcespecification.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rsrc.mutation.ResourceSrIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecificationrelationship.ResourceSrTable,
			Columns: []string{resourcespecificationrelationship.ResourceSrColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcespecificationitems.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// ResourceSpecificationRelationshipCreateBulk is the builder for creating a bulk of ResourceSpecificationRelationship entities.
type ResourceSpecificationRelationshipCreateBulk struct {
	config
	builders []*ResourceSpecificationRelationshipCreate
}

// Save creates the ResourceSpecificationRelationship entities in the database.
func (rsrcb *ResourceSpecificationRelationshipCreateBulk) Save(ctx context.Context) ([]*ResourceSpecificationRelationship, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rsrcb.builders))
	nodes := make([]*ResourceSpecificationRelationship, len(rsrcb.builders))
	mutators := make([]Mutator, len(rsrcb.builders))
	for i := range rsrcb.builders {
		func(i int, root context.Context) {
			builder := rsrcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResourceSpecificationRelationshipMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, rsrcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rsrcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, rsrcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rsrcb *ResourceSpecificationRelationshipCreateBulk) SaveX(ctx context.Context) []*ResourceSpecificationRelationship {
	v, err := rsrcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
