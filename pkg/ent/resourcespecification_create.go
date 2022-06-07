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
	"github.com/facebookincubator/symphony/pkg/ent/resourcepropertytype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceSpecificationCreate is the builder for creating a ResourceSpecification entity.
type ResourceSpecificationCreate struct {
	config
	mutation *ResourceSpecificationMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rsc *ResourceSpecificationCreate) SetCreateTime(t time.Time) *ResourceSpecificationCreate {
	rsc.mutation.SetCreateTime(t)
	return rsc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rsc *ResourceSpecificationCreate) SetNillableCreateTime(t *time.Time) *ResourceSpecificationCreate {
	if t != nil {
		rsc.SetCreateTime(*t)
	}
	return rsc
}

// SetUpdateTime sets the update_time field.
func (rsc *ResourceSpecificationCreate) SetUpdateTime(t time.Time) *ResourceSpecificationCreate {
	rsc.mutation.SetUpdateTime(t)
	return rsc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rsc *ResourceSpecificationCreate) SetNillableUpdateTime(t *time.Time) *ResourceSpecificationCreate {
	if t != nil {
		rsc.SetUpdateTime(*t)
	}
	return rsc
}

// SetName sets the name field.
func (rsc *ResourceSpecificationCreate) SetName(s string) *ResourceSpecificationCreate {
	rsc.mutation.SetName(s)
	return rsc
}

// SetQuantity sets the quantity field.
func (rsc *ResourceSpecificationCreate) SetQuantity(i int) *ResourceSpecificationCreate {
	rsc.mutation.SetQuantity(i)
	return rsc
}

// SetNillableQuantity sets the quantity field if the given value is not nil.
func (rsc *ResourceSpecificationCreate) SetNillableQuantity(i *int) *ResourceSpecificationCreate {
	if i != nil {
		rsc.SetQuantity(*i)
	}
	return rsc
}

// SetResourcetypeID sets the resourcetype edge to ResourceType by id.
func (rsc *ResourceSpecificationCreate) SetResourcetypeID(id int) *ResourceSpecificationCreate {
	rsc.mutation.SetResourcetypeID(id)
	return rsc
}

// SetNillableResourcetypeID sets the resourcetype edge to ResourceType by id if the given value is not nil.
func (rsc *ResourceSpecificationCreate) SetNillableResourcetypeID(id *int) *ResourceSpecificationCreate {
	if id != nil {
		rsc = rsc.SetResourcetypeID(*id)
	}
	return rsc
}

// SetResourcetype sets the resourcetype edge to ResourceType.
func (rsc *ResourceSpecificationCreate) SetResourcetype(r *ResourceType) *ResourceSpecificationCreate {
	return rsc.SetResourcetypeID(r.ID)
}

// AddResourcePropertyTypeIDs adds the resource_property_type edge to ResourcePropertyType by ids.
func (rsc *ResourceSpecificationCreate) AddResourcePropertyTypeIDs(ids ...int) *ResourceSpecificationCreate {
	rsc.mutation.AddResourcePropertyTypeIDs(ids...)
	return rsc
}

// AddResourcePropertyType adds the resource_property_type edges to ResourcePropertyType.
func (rsc *ResourceSpecificationCreate) AddResourcePropertyType(r ...*ResourcePropertyType) *ResourceSpecificationCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsc.AddResourcePropertyTypeIDs(ids...)
}

// AddResourceSpecificationIDs adds the resource_specification edge to ResourceSpecificationRelationship by ids.
func (rsc *ResourceSpecificationCreate) AddResourceSpecificationIDs(ids ...int) *ResourceSpecificationCreate {
	rsc.mutation.AddResourceSpecificationIDs(ids...)
	return rsc
}

// AddResourceSpecification adds the resource_specification edges to ResourceSpecificationRelationship.
func (rsc *ResourceSpecificationCreate) AddResourceSpecification(r ...*ResourceSpecificationRelationship) *ResourceSpecificationCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsc.AddResourceSpecificationIDs(ids...)
}

// AddResourceSpecificationItemIDs adds the resource_specification_items edge to ResourceSpecificationItems by ids.
func (rsc *ResourceSpecificationCreate) AddResourceSpecificationItemIDs(ids ...int) *ResourceSpecificationCreate {
	rsc.mutation.AddResourceSpecificationItemIDs(ids...)
	return rsc
}

// AddResourceSpecificationItems adds the resource_specification_items edges to ResourceSpecificationItems.
func (rsc *ResourceSpecificationCreate) AddResourceSpecificationItems(r ...*ResourceSpecificationItems) *ResourceSpecificationCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsc.AddResourceSpecificationItemIDs(ids...)
}

// Mutation returns the ResourceSpecificationMutation object of the builder.
func (rsc *ResourceSpecificationCreate) Mutation() *ResourceSpecificationMutation {
	return rsc.mutation
}

// Save creates the ResourceSpecification in the database.
func (rsc *ResourceSpecificationCreate) Save(ctx context.Context) (*ResourceSpecification, error) {
	var (
		err  error
		node *ResourceSpecification
	)
	rsc.defaults()
	if len(rsc.hooks) == 0 {
		if err = rsc.check(); err != nil {
			return nil, err
		}
		node, err = rsc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSpecificationMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rsc.check(); err != nil {
				return nil, err
			}
			rsc.mutation = mutation
			node, err = rsc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rsc.hooks) - 1; i >= 0; i-- {
			mut = rsc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rsc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rsc *ResourceSpecificationCreate) SaveX(ctx context.Context) *ResourceSpecification {
	v, err := rsc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rsc *ResourceSpecificationCreate) defaults() {
	if _, ok := rsc.mutation.CreateTime(); !ok {
		v := resourcespecification.DefaultCreateTime()
		rsc.mutation.SetCreateTime(v)
	}
	if _, ok := rsc.mutation.UpdateTime(); !ok {
		v := resourcespecification.DefaultUpdateTime()
		rsc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsc *ResourceSpecificationCreate) check() error {
	if _, ok := rsc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rsc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := rsc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := rsc.mutation.Name(); ok {
		if err := resourcespecification.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (rsc *ResourceSpecificationCreate) sqlSave(ctx context.Context) (*ResourceSpecification, error) {
	_node, _spec := rsc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rsc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rsc *ResourceSpecificationCreate) createSpec() (*ResourceSpecification, *sqlgraph.CreateSpec) {
	var (
		_node = &ResourceSpecification{config: rsc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: resourcespecification.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecification.FieldID,
			},
		}
	)
	if value, ok := rsc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecification.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rsc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecification.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := rsc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcespecification.FieldName,
		})
		_node.Name = value
	}
	if value, ok := rsc.mutation.Quantity(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: resourcespecification.FieldQuantity,
		})
		_node.Quantity = value
	}
	if nodes := rsc.mutation.ResourcetypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcespecification.ResourcetypeTable,
			Columns: []string{resourcespecification.ResourcetypeColumn},
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
	if nodes := rsc.mutation.ResourcePropertyTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.ResourcePropertyTypeTable,
			Columns: []string{resourcespecification.ResourcePropertyTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcepropertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rsc.mutation.ResourceSpecificationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.ResourceSpecificationTable,
			Columns: []string{resourcespecification.ResourceSpecificationColumn},
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
	if nodes := rsc.mutation.ResourceSpecificationItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.ResourceSpecificationItemsTable,
			Columns: []string{resourcespecification.ResourceSpecificationItemsColumn},
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

// ResourceSpecificationCreateBulk is the builder for creating a bulk of ResourceSpecification entities.
type ResourceSpecificationCreateBulk struct {
	config
	builders []*ResourceSpecificationCreate
}

// Save creates the ResourceSpecification entities in the database.
func (rscb *ResourceSpecificationCreateBulk) Save(ctx context.Context) ([]*ResourceSpecification, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rscb.builders))
	nodes := make([]*ResourceSpecification, len(rscb.builders))
	mutators := make([]Mutator, len(rscb.builders))
	for i := range rscb.builders {
		func(i int, root context.Context) {
			builder := rscb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResourceSpecificationMutation)
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
					_, err = mutators[i+1].Mutate(root, rscb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rscb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, rscb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rscb *ResourceSpecificationCreateBulk) SaveX(ctx context.Context) []*ResourceSpecification {
	v, err := rscb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
