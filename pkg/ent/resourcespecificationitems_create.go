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

// ResourceSpecificationItemsCreate is the builder for creating a ResourceSpecificationItems entity.
type ResourceSpecificationItemsCreate struct {
	config
	mutation *ResourceSpecificationItemsMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rsic *ResourceSpecificationItemsCreate) SetCreateTime(t time.Time) *ResourceSpecificationItemsCreate {
	rsic.mutation.SetCreateTime(t)
	return rsic
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rsic *ResourceSpecificationItemsCreate) SetNillableCreateTime(t *time.Time) *ResourceSpecificationItemsCreate {
	if t != nil {
		rsic.SetCreateTime(*t)
	}
	return rsic
}

// SetUpdateTime sets the update_time field.
func (rsic *ResourceSpecificationItemsCreate) SetUpdateTime(t time.Time) *ResourceSpecificationItemsCreate {
	rsic.mutation.SetUpdateTime(t)
	return rsic
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rsic *ResourceSpecificationItemsCreate) SetNillableUpdateTime(t *time.Time) *ResourceSpecificationItemsCreate {
	if t != nil {
		rsic.SetUpdateTime(*t)
	}
	return rsic
}

// SetResourcespecificationrelationshipID sets the resourcespecificationrelationship edge to ResourceSpecificationRelationship by id.
func (rsic *ResourceSpecificationItemsCreate) SetResourcespecificationrelationshipID(id int) *ResourceSpecificationItemsCreate {
	rsic.mutation.SetResourcespecificationrelationshipID(id)
	return rsic
}

// SetNillableResourcespecificationrelationshipID sets the resourcespecificationrelationship edge to ResourceSpecificationRelationship by id if the given value is not nil.
func (rsic *ResourceSpecificationItemsCreate) SetNillableResourcespecificationrelationshipID(id *int) *ResourceSpecificationItemsCreate {
	if id != nil {
		rsic = rsic.SetResourcespecificationrelationshipID(*id)
	}
	return rsic
}

// SetResourcespecificationrelationship sets the resourcespecificationrelationship edge to ResourceSpecificationRelationship.
func (rsic *ResourceSpecificationItemsCreate) SetResourcespecificationrelationship(r *ResourceSpecificationRelationship) *ResourceSpecificationItemsCreate {
	return rsic.SetResourcespecificationrelationshipID(r.ID)
}

// SetResourcespecificationitemsID sets the resourcespecificationitems edge to ResourceSpecification by id.
func (rsic *ResourceSpecificationItemsCreate) SetResourcespecificationitemsID(id int) *ResourceSpecificationItemsCreate {
	rsic.mutation.SetResourcespecificationitemsID(id)
	return rsic
}

// SetNillableResourcespecificationitemsID sets the resourcespecificationitems edge to ResourceSpecification by id if the given value is not nil.
func (rsic *ResourceSpecificationItemsCreate) SetNillableResourcespecificationitemsID(id *int) *ResourceSpecificationItemsCreate {
	if id != nil {
		rsic = rsic.SetResourcespecificationitemsID(*id)
	}
	return rsic
}

// SetResourcespecificationitems sets the resourcespecificationitems edge to ResourceSpecification.
func (rsic *ResourceSpecificationItemsCreate) SetResourcespecificationitems(r *ResourceSpecification) *ResourceSpecificationItemsCreate {
	return rsic.SetResourcespecificationitemsID(r.ID)
}

// Mutation returns the ResourceSpecificationItemsMutation object of the builder.
func (rsic *ResourceSpecificationItemsCreate) Mutation() *ResourceSpecificationItemsMutation {
	return rsic.mutation
}

// Save creates the ResourceSpecificationItems in the database.
func (rsic *ResourceSpecificationItemsCreate) Save(ctx context.Context) (*ResourceSpecificationItems, error) {
	var (
		err  error
		node *ResourceSpecificationItems
	)
	rsic.defaults()
	if len(rsic.hooks) == 0 {
		if err = rsic.check(); err != nil {
			return nil, err
		}
		node, err = rsic.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSpecificationItemsMutation)
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
func (rsic *ResourceSpecificationItemsCreate) SaveX(ctx context.Context) *ResourceSpecificationItems {
	v, err := rsic.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rsic *ResourceSpecificationItemsCreate) defaults() {
	if _, ok := rsic.mutation.CreateTime(); !ok {
		v := resourcespecificationitems.DefaultCreateTime()
		rsic.mutation.SetCreateTime(v)
	}
	if _, ok := rsic.mutation.UpdateTime(); !ok {
		v := resourcespecificationitems.DefaultUpdateTime()
		rsic.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsic *ResourceSpecificationItemsCreate) check() error {
	if _, ok := rsic.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rsic.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	return nil
}

func (rsic *ResourceSpecificationItemsCreate) sqlSave(ctx context.Context) (*ResourceSpecificationItems, error) {
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

func (rsic *ResourceSpecificationItemsCreate) createSpec() (*ResourceSpecificationItems, *sqlgraph.CreateSpec) {
	var (
		_node = &ResourceSpecificationItems{config: rsic.config}
		_spec = &sqlgraph.CreateSpec{
			Table: resourcespecificationitems.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecificationitems.FieldID,
			},
		}
	)
	if value, ok := rsic.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecificationitems.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rsic.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecificationitems.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if nodes := rsic.mutation.ResourcespecificationrelationshipIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcespecificationitems.ResourcespecificationrelationshipTable,
			Columns: []string{resourcespecificationitems.ResourcespecificationrelationshipColumn},
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
	if nodes := rsic.mutation.ResourcespecificationitemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcespecificationitems.ResourcespecificationitemsTable,
			Columns: []string{resourcespecificationitems.ResourcespecificationitemsColumn},
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
	return _node, _spec
}

// ResourceSpecificationItemsCreateBulk is the builder for creating a bulk of ResourceSpecificationItems entities.
type ResourceSpecificationItemsCreateBulk struct {
	config
	builders []*ResourceSpecificationItemsCreate
}

// Save creates the ResourceSpecificationItems entities in the database.
func (rsicb *ResourceSpecificationItemsCreateBulk) Save(ctx context.Context) ([]*ResourceSpecificationItems, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rsicb.builders))
	nodes := make([]*ResourceSpecificationItems, len(rsicb.builders))
	mutators := make([]Mutator, len(rsicb.builders))
	for i := range rsicb.builders {
		func(i int, root context.Context) {
			builder := rsicb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResourceSpecificationItemsMutation)
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
func (rsicb *ResourceSpecificationItemsCreateBulk) SaveX(ctx context.Context) []*ResourceSpecificationItems {
	v, err := rsicb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}