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
	"github.com/facebookincubator/symphony/pkg/ent/property"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
	"github.com/facebookincubator/symphony/pkg/ent/propertyvalue"
)

// PropertyValueCreate is the builder for creating a PropertyValue entity.
type PropertyValueCreate struct {
	config
	mutation *PropertyValueMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (pvc *PropertyValueCreate) SetCreateTime(t time.Time) *PropertyValueCreate {
	pvc.mutation.SetCreateTime(t)
	return pvc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (pvc *PropertyValueCreate) SetNillableCreateTime(t *time.Time) *PropertyValueCreate {
	if t != nil {
		pvc.SetCreateTime(*t)
	}
	return pvc
}

// SetUpdateTime sets the update_time field.
func (pvc *PropertyValueCreate) SetUpdateTime(t time.Time) *PropertyValueCreate {
	pvc.mutation.SetUpdateTime(t)
	return pvc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (pvc *PropertyValueCreate) SetNillableUpdateTime(t *time.Time) *PropertyValueCreate {
	if t != nil {
		pvc.SetUpdateTime(*t)
	}
	return pvc
}

// SetName sets the name field.
func (pvc *PropertyValueCreate) SetName(s string) *PropertyValueCreate {
	pvc.mutation.SetName(s)
	return pvc
}

// SetPropertyID sets the property edge to Property by id.
func (pvc *PropertyValueCreate) SetPropertyID(id int) *PropertyValueCreate {
	pvc.mutation.SetPropertyID(id)
	return pvc
}

// SetNillablePropertyID sets the property edge to Property by id if the given value is not nil.
func (pvc *PropertyValueCreate) SetNillablePropertyID(id *int) *PropertyValueCreate {
	if id != nil {
		pvc = pvc.SetPropertyID(*id)
	}
	return pvc
}

// SetProperty sets the property edge to Property.
func (pvc *PropertyValueCreate) SetProperty(p *Property) *PropertyValueCreate {
	return pvc.SetPropertyID(p.ID)
}

// SetPropertyTypeValueID sets the property_type_value edge to PropertyTypeValue by id.
func (pvc *PropertyValueCreate) SetPropertyTypeValueID(id int) *PropertyValueCreate {
	pvc.mutation.SetPropertyTypeValueID(id)
	return pvc
}

// SetNillablePropertyTypeValueID sets the property_type_value edge to PropertyTypeValue by id if the given value is not nil.
func (pvc *PropertyValueCreate) SetNillablePropertyTypeValueID(id *int) *PropertyValueCreate {
	if id != nil {
		pvc = pvc.SetPropertyTypeValueID(*id)
	}
	return pvc
}

// SetPropertyTypeValue sets the property_type_value edge to PropertyTypeValue.
func (pvc *PropertyValueCreate) SetPropertyTypeValue(p *PropertyTypeValue) *PropertyValueCreate {
	return pvc.SetPropertyTypeValueID(p.ID)
}

// SetPropertyValueDependenceID sets the property_value_dependence edge to PropertyValue by id.
func (pvc *PropertyValueCreate) SetPropertyValueDependenceID(id int) *PropertyValueCreate {
	pvc.mutation.SetPropertyValueDependenceID(id)
	return pvc
}

// SetNillablePropertyValueDependenceID sets the property_value_dependence edge to PropertyValue by id if the given value is not nil.
func (pvc *PropertyValueCreate) SetNillablePropertyValueDependenceID(id *int) *PropertyValueCreate {
	if id != nil {
		pvc = pvc.SetPropertyValueDependenceID(*id)
	}
	return pvc
}

// SetPropertyValueDependence sets the property_value_dependence edge to PropertyValue.
func (pvc *PropertyValueCreate) SetPropertyValueDependence(p *PropertyValue) *PropertyValueCreate {
	return pvc.SetPropertyValueDependenceID(p.ID)
}

// AddPropertyValueIDs adds the property_value edge to PropertyValue by ids.
func (pvc *PropertyValueCreate) AddPropertyValueIDs(ids ...int) *PropertyValueCreate {
	pvc.mutation.AddPropertyValueIDs(ids...)
	return pvc
}

// AddPropertyValue adds the property_value edges to PropertyValue.
func (pvc *PropertyValueCreate) AddPropertyValue(p ...*PropertyValue) *PropertyValueCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return pvc.AddPropertyValueIDs(ids...)
}

// Mutation returns the PropertyValueMutation object of the builder.
func (pvc *PropertyValueCreate) Mutation() *PropertyValueMutation {
	return pvc.mutation
}

// Save creates the PropertyValue in the database.
func (pvc *PropertyValueCreate) Save(ctx context.Context) (*PropertyValue, error) {
	var (
		err  error
		node *PropertyValue
	)
	pvc.defaults()
	if len(pvc.hooks) == 0 {
		if err = pvc.check(); err != nil {
			return nil, err
		}
		node, err = pvc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PropertyValueMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = pvc.check(); err != nil {
				return nil, err
			}
			pvc.mutation = mutation
			node, err = pvc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(pvc.hooks) - 1; i >= 0; i-- {
			mut = pvc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, pvc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (pvc *PropertyValueCreate) SaveX(ctx context.Context) *PropertyValue {
	v, err := pvc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (pvc *PropertyValueCreate) defaults() {
	if _, ok := pvc.mutation.CreateTime(); !ok {
		v := propertyvalue.DefaultCreateTime()
		pvc.mutation.SetCreateTime(v)
	}
	if _, ok := pvc.mutation.UpdateTime(); !ok {
		v := propertyvalue.DefaultUpdateTime()
		pvc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (pvc *PropertyValueCreate) check() error {
	if _, ok := pvc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := pvc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := pvc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := pvc.mutation.Name(); ok {
		if err := propertyvalue.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (pvc *PropertyValueCreate) sqlSave(ctx context.Context) (*PropertyValue, error) {
	_node, _spec := pvc.createSpec()
	if err := sqlgraph.CreateNode(ctx, pvc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (pvc *PropertyValueCreate) createSpec() (*PropertyValue, *sqlgraph.CreateSpec) {
	var (
		_node = &PropertyValue{config: pvc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: propertyvalue.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: propertyvalue.FieldID,
			},
		}
	)
	if value, ok := pvc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertyvalue.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := pvc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertyvalue.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := pvc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertyvalue.FieldName,
		})
		_node.Name = value
	}
	if nodes := pvc.mutation.PropertyIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertyvalue.PropertyTable,
			Columns: []string{propertyvalue.PropertyColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: property.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := pvc.mutation.PropertyTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertyvalue.PropertyTypeValueTable,
			Columns: []string{propertyvalue.PropertyTypeValueColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytypevalue.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := pvc.mutation.PropertyValueDependenceIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertyvalue.PropertyValueDependenceTable,
			Columns: []string{propertyvalue.PropertyValueDependenceColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertyvalue.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := pvc.mutation.PropertyValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertyvalue.PropertyValueTable,
			Columns: []string{propertyvalue.PropertyValueColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertyvalue.FieldID,
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

// PropertyValueCreateBulk is the builder for creating a bulk of PropertyValue entities.
type PropertyValueCreateBulk struct {
	config
	builders []*PropertyValueCreate
}

// Save creates the PropertyValue entities in the database.
func (pvcb *PropertyValueCreateBulk) Save(ctx context.Context) ([]*PropertyValue, error) {
	specs := make([]*sqlgraph.CreateSpec, len(pvcb.builders))
	nodes := make([]*PropertyValue, len(pvcb.builders))
	mutators := make([]Mutator, len(pvcb.builders))
	for i := range pvcb.builders {
		func(i int, root context.Context) {
			builder := pvcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*PropertyValueMutation)
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
					_, err = mutators[i+1].Mutate(root, pvcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, pvcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, pvcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (pvcb *PropertyValueCreateBulk) SaveX(ctx context.Context) []*PropertyValue {
	v, err := pvcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
