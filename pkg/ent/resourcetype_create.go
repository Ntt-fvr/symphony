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
	"github.com/facebookincubator/symphony/pkg/ent/resourcesritems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypebasetype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypeclass"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetyperelationship"
)

// ResourceTypeCreate is the builder for creating a ResourceType entity.
type ResourceTypeCreate struct {
	config
	mutation *ResourceTypeMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rtc *ResourceTypeCreate) SetCreateTime(t time.Time) *ResourceTypeCreate {
	rtc.mutation.SetCreateTime(t)
	return rtc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rtc *ResourceTypeCreate) SetNillableCreateTime(t *time.Time) *ResourceTypeCreate {
	if t != nil {
		rtc.SetCreateTime(*t)
	}
	return rtc
}

// SetUpdateTime sets the update_time field.
func (rtc *ResourceTypeCreate) SetUpdateTime(t time.Time) *ResourceTypeCreate {
	rtc.mutation.SetUpdateTime(t)
	return rtc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rtc *ResourceTypeCreate) SetNillableUpdateTime(t *time.Time) *ResourceTypeCreate {
	if t != nil {
		rtc.SetUpdateTime(*t)
	}
	return rtc
}

// SetName sets the name field.
func (rtc *ResourceTypeCreate) SetName(s string) *ResourceTypeCreate {
	rtc.mutation.SetName(s)
	return rtc
}

// SetResourcetypeclassID sets the resourcetypeclass edge to ResourceTypeClass by id.
func (rtc *ResourceTypeCreate) SetResourcetypeclassID(id int) *ResourceTypeCreate {
	rtc.mutation.SetResourcetypeclassID(id)
	return rtc
}

// SetNillableResourcetypeclassID sets the resourcetypeclass edge to ResourceTypeClass by id if the given value is not nil.
func (rtc *ResourceTypeCreate) SetNillableResourcetypeclassID(id *int) *ResourceTypeCreate {
	if id != nil {
		rtc = rtc.SetResourcetypeclassID(*id)
	}
	return rtc
}

// SetResourcetypeclass sets the resourcetypeclass edge to ResourceTypeClass.
func (rtc *ResourceTypeCreate) SetResourcetypeclass(r *ResourceTypeClass) *ResourceTypeCreate {
	return rtc.SetResourcetypeclassID(r.ID)
}

// SetResourcetypebasetypeID sets the resourcetypebasetype edge to ResourceTypeBaseType by id.
func (rtc *ResourceTypeCreate) SetResourcetypebasetypeID(id int) *ResourceTypeCreate {
	rtc.mutation.SetResourcetypebasetypeID(id)
	return rtc
}

// SetNillableResourcetypebasetypeID sets the resourcetypebasetype edge to ResourceTypeBaseType by id if the given value is not nil.
func (rtc *ResourceTypeCreate) SetNillableResourcetypebasetypeID(id *int) *ResourceTypeCreate {
	if id != nil {
		rtc = rtc.SetResourcetypebasetypeID(*id)
	}
	return rtc
}

// SetResourcetypebasetype sets the resourcetypebasetype edge to ResourceTypeBaseType.
func (rtc *ResourceTypeCreate) SetResourcetypebasetype(r *ResourceTypeBaseType) *ResourceTypeCreate {
	return rtc.SetResourcetypebasetypeID(r.ID)
}

// AddResourceRelationshipAIDs adds the resource_relationship_a edge to ResourceTypeRelationship by ids.
func (rtc *ResourceTypeCreate) AddResourceRelationshipAIDs(ids ...int) *ResourceTypeCreate {
	rtc.mutation.AddResourceRelationshipAIDs(ids...)
	return rtc
}

// AddResourceRelationshipA adds the resource_relationship_a edges to ResourceTypeRelationship.
func (rtc *ResourceTypeCreate) AddResourceRelationshipA(r ...*ResourceTypeRelationship) *ResourceTypeCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rtc.AddResourceRelationshipAIDs(ids...)
}

// AddResourceRelationshipBIDs adds the resource_relationship_b edge to ResourceTypeRelationship by ids.
func (rtc *ResourceTypeCreate) AddResourceRelationshipBIDs(ids ...int) *ResourceTypeCreate {
	rtc.mutation.AddResourceRelationshipBIDs(ids...)
	return rtc
}

// AddResourceRelationshipB adds the resource_relationship_b edges to ResourceTypeRelationship.
func (rtc *ResourceTypeCreate) AddResourceRelationshipB(r ...*ResourceTypeRelationship) *ResourceTypeCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rtc.AddResourceRelationshipBIDs(ids...)
}

// AddResourceSpecificationIDs adds the resource_specification edge to ResourceSpecification by ids.
func (rtc *ResourceTypeCreate) AddResourceSpecificationIDs(ids ...int) *ResourceTypeCreate {
	rtc.mutation.AddResourceSpecificationIDs(ids...)
	return rtc
}

// AddResourceSpecification adds the resource_specification edges to ResourceSpecification.
func (rtc *ResourceTypeCreate) AddResourceSpecification(r ...*ResourceSpecification) *ResourceTypeCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rtc.AddResourceSpecificationIDs(ids...)
}

// AddResourcetypeItemIDs adds the resourcetype_items edge to ResourceSRItems by ids.
func (rtc *ResourceTypeCreate) AddResourcetypeItemIDs(ids ...int) *ResourceTypeCreate {
	rtc.mutation.AddResourcetypeItemIDs(ids...)
	return rtc
}

// AddResourcetypeItems adds the resourcetype_items edges to ResourceSRItems.
func (rtc *ResourceTypeCreate) AddResourcetypeItems(r ...*ResourceSRItems) *ResourceTypeCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rtc.AddResourcetypeItemIDs(ids...)
}

// Mutation returns the ResourceTypeMutation object of the builder.
func (rtc *ResourceTypeCreate) Mutation() *ResourceTypeMutation {
	return rtc.mutation
}

// Save creates the ResourceType in the database.
func (rtc *ResourceTypeCreate) Save(ctx context.Context) (*ResourceType, error) {
	var (
		err  error
		node *ResourceType
	)
	rtc.defaults()
	if len(rtc.hooks) == 0 {
		if err = rtc.check(); err != nil {
			return nil, err
		}
		node, err = rtc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rtc.check(); err != nil {
				return nil, err
			}
			rtc.mutation = mutation
			node, err = rtc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rtc.hooks) - 1; i >= 0; i-- {
			mut = rtc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rtc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rtc *ResourceTypeCreate) SaveX(ctx context.Context) *ResourceType {
	v, err := rtc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rtc *ResourceTypeCreate) defaults() {
	if _, ok := rtc.mutation.CreateTime(); !ok {
		v := resourcetype.DefaultCreateTime()
		rtc.mutation.SetCreateTime(v)
	}
	if _, ok := rtc.mutation.UpdateTime(); !ok {
		v := resourcetype.DefaultUpdateTime()
		rtc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rtc *ResourceTypeCreate) check() error {
	if _, ok := rtc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rtc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := rtc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := rtc.mutation.Name(); ok {
		if err := resourcetype.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (rtc *ResourceTypeCreate) sqlSave(ctx context.Context) (*ResourceType, error) {
	_node, _spec := rtc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rtc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rtc *ResourceTypeCreate) createSpec() (*ResourceType, *sqlgraph.CreateSpec) {
	var (
		_node = &ResourceType{config: rtc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: resourcetype.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcetype.FieldID,
			},
		}
	)
	if value, ok := rtc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcetype.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rtc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcetype.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := rtc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcetype.FieldName,
		})
		_node.Name = value
	}
	if nodes := rtc.mutation.ResourcetypeclassIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcetype.ResourcetypeclassTable,
			Columns: []string{resourcetype.ResourcetypeclassColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcetypeclass.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rtc.mutation.ResourcetypebasetypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   resourcetype.ResourcetypebasetypeTable,
			Columns: []string{resourcetype.ResourcetypebasetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcetypebasetype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rtc.mutation.ResourceRelationshipAIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcetype.ResourceRelationshipATable,
			Columns: []string{resourcetype.ResourceRelationshipAColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcetyperelationship.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rtc.mutation.ResourceRelationshipBIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcetype.ResourceRelationshipBTable,
			Columns: []string{resourcetype.ResourceRelationshipBColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcetyperelationship.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rtc.mutation.ResourceSpecificationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcetype.ResourceSpecificationTable,
			Columns: []string{resourcetype.ResourceSpecificationColumn},
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
	if nodes := rtc.mutation.ResourcetypeItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcetype.ResourcetypeItemsTable,
			Columns: []string{resourcetype.ResourcetypeItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: resourcesritems.FieldID,
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

// ResourceTypeCreateBulk is the builder for creating a bulk of ResourceType entities.
type ResourceTypeCreateBulk struct {
	config
	builders []*ResourceTypeCreate
}

// Save creates the ResourceType entities in the database.
func (rtcb *ResourceTypeCreateBulk) Save(ctx context.Context) ([]*ResourceType, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rtcb.builders))
	nodes := make([]*ResourceType, len(rtcb.builders))
	mutators := make([]Mutator, len(rtcb.builders))
	for i := range rtcb.builders {
		func(i int, root context.Context) {
			builder := rtcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResourceTypeMutation)
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
					_, err = mutators[i+1].Mutate(root, rtcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rtcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, rtcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rtcb *ResourceTypeCreateBulk) SaveX(ctx context.Context) []*ResourceType {
	v, err := rtcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
