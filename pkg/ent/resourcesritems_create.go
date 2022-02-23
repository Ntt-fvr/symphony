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
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcesritems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceSRItemsCreate is the builder for creating a ResourceSRItems entity.
type ResourceSRItemsCreate struct {
	config
	mutation *ResourceSRItemsMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rsic *ResourceSRItemsCreate) SetCreateTime(t time.Time) *ResourceSRItemsCreate {
	rsic.mutation.SetCreateTime(t)
	return rsic
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rsic *ResourceSRItemsCreate) SetNillableCreateTime(t *time.Time) *ResourceSRItemsCreate {
	if t != nil {
		rsic.SetCreateTime(*t)
	}
	return rsic
}

// SetUpdateTime sets the update_time field.
func (rsic *ResourceSRItemsCreate) SetUpdateTime(t time.Time) *ResourceSRItemsCreate {
	rsic.mutation.SetUpdateTime(t)
	return rsic
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rsic *ResourceSRItemsCreate) SetNillableUpdateTime(t *time.Time) *ResourceSRItemsCreate {
	if t != nil {
		rsic.SetUpdateTime(*t)
	}
	return rsic
}

// SetName sets the name field.
func (rsic *ResourceSRItemsCreate) SetName(s string) *ResourceSRItemsCreate {
	rsic.mutation.SetName(s)
	return rsic
}

// SetNillableName sets the name field if the given value is not nil.
func (rsic *ResourceSRItemsCreate) SetNillableName(s *string) *ResourceSRItemsCreate {
	if s != nil {
		rsic.SetName(*s)
	}
	return rsic
}

// SetResourcesrID sets the resourcesr edge to ResourceSpecificationRelationship by id.
func (rsic *ResourceSRItemsCreate) SetResourcesrID(id int) *ResourceSRItemsCreate {
	rsic.mutation.SetResourcesrID(id)
	return rsic
}

// SetNillableResourcesrID sets the resourcesr edge to ResourceSpecificationRelationship by id if the given value is not nil.
func (rsic *ResourceSRItemsCreate) SetNillableResourcesrID(id *int) *ResourceSRItemsCreate {
	if id != nil {
		rsic = rsic.SetResourcesrID(*id)
	}
	return rsic
}

// SetResourcesr sets the resourcesr edge to ResourceSpecificationRelationship.
func (rsic *ResourceSRItemsCreate) SetResourcesr(r *ResourceSpecificationRelationship) *ResourceSRItemsCreate {
	return rsic.SetResourcesrID(r.ID)
}

// SetResourcetypeID sets the resourcetype edge to ResourceType by id.
func (rsic *ResourceSRItemsCreate) SetResourcetypeID(id int) *ResourceSRItemsCreate {
	rsic.mutation.SetResourcetypeID(id)
	return rsic
}

// SetNillableResourcetypeID sets the resourcetype edge to ResourceType by id if the given value is not nil.
func (rsic *ResourceSRItemsCreate) SetNillableResourcetypeID(id *int) *ResourceSRItemsCreate {
	if id != nil {
		rsic = rsic.SetResourcetypeID(*id)
	}
	return rsic
}

// SetResourcetype sets the resourcetype edge to ResourceType.
func (rsic *ResourceSRItemsCreate) SetResourcetype(r *ResourceType) *ResourceSRItemsCreate {
	return rsic.SetResourcetypeID(r.ID)
}

// Mutation returns the ResourceSRItemsMutation object of the builder.
func (rsic *ResourceSRItemsCreate) Mutation() *ResourceSRItemsMutation {
	return rsic.mutation
}

// Save creates the ResourceSRItems in the database.
func (rsic *ResourceSRItemsCreate) Save(ctx context.Context) (*ResourceSRItems, error) {
	var (
		err  error
		node *ResourceSRItems
	)
	rsic.defaults()
	if len(rsic.hooks) == 0 {
		if err = rsic.check(); err != nil {
			return nil, err
		}
		node, err = rsic.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSRItemsMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rsic.check(); err != nil {
				return nil, err
			}
			rsic.mutation = mutation
			node, err = rsic.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rsic.hooks) - 1; i >= 0; i-- {
			mut = rsic.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rsic.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rsic *ResourceSRItemsCreate) SaveX(ctx context.Context) *ResourceSRItems {
	v, err := rsic.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rsic *ResourceSRItemsCreate) defaults() {
	if _, ok := rsic.mutation.CreateTime(); !ok {
		v := resourcesritems.DefaultCreateTime()
		rsic.mutation.SetCreateTime(v)
	}
	if _, ok := rsic.mutation.UpdateTime(); !ok {
		v := resourcesritems.DefaultUpdateTime()
		rsic.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsic *ResourceSRItemsCreate) check() error {
	if _, ok := rsic.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rsic.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	return nil
}

func (rsic *ResourceSRItemsCreate) sqlSave(ctx context.Context) (*ResourceSRItems, error) {
	_node, _spec := rsic.createSpec()
	if err := sqlgraph.CreateNode(ctx, rsic.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rsic *ResourceSRItemsCreate) createSpec() (*ResourceSRItems, *sqlgraph.CreateSpec) {
	var (
		_node = &ResourceSRItems{config: rsic.config}
		_spec = &sqlgraph.CreateSpec{
			Table: resourcesritems.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcesritems.FieldID,
			},
		}
	)
	if value, ok := rsic.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcesritems.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rsic.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcesritems.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := rsic.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcesritems.FieldName,
		})
		_node.Name = &value
	}
	if nodes := rsic.mutation.ResourcesrIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcesritems.ResourcesrTable,
			Columns: []string{resourcesritems.ResourcesrColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcespecificationrelationship.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rsic.mutation.ResourcetypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcesritems.ResourcetypeTable,
			Columns: []string{resourcesritems.ResourcetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcetype.FieldID,
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

// ResourceSRItemsCreateBulk is the builder for creating a bulk of ResourceSRItems entities.
type ResourceSRItemsCreateBulk struct {
	config
	builders []*ResourceSRItemsCreate
}

// Save creates the ResourceSRItems entities in the database.
func (rsicb *ResourceSRItemsCreateBulk) Save(ctx context.Context) ([]*ResourceSRItems, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rsicb.builders))
	nodes := make([]*ResourceSRItems, len(rsicb.builders))
	mutators := make([]Mutator, len(rsicb.builders))
	for i := range rsicb.builders {
		func(i int, root context.Context) {
			builder := rsicb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResourceSRItemsMutation)
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
					_, err = mutators[i+1].Mutate(root, rsicb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rsicb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, rsicb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rsicb *ResourceSRItemsCreateBulk) SaveX(ctx context.Context) []*ResourceSRItems {
	v, err := rsicb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
