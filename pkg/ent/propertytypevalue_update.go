// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/property"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
)

// PropertyTypeValueUpdate is the builder for updating PropertyTypeValue entities.
type PropertyTypeValueUpdate struct {
	config
	hooks    []Hook
	mutation *PropertyTypeValueMutation
}

// Where adds a new predicate for the builder.
func (ptvu *PropertyTypeValueUpdate) Where(ps ...predicate.PropertyTypeValue) *PropertyTypeValueUpdate {
	ptvu.mutation.predicates = append(ptvu.mutation.predicates, ps...)
	return ptvu
}

// SetName sets the name field.
func (ptvu *PropertyTypeValueUpdate) SetName(s string) *PropertyTypeValueUpdate {
	ptvu.mutation.SetName(s)
	return ptvu
}

// SetDeleted sets the deleted field.
func (ptvu *PropertyTypeValueUpdate) SetDeleted(b bool) *PropertyTypeValueUpdate {
	ptvu.mutation.SetDeleted(b)
	return ptvu
}

// SetNillableDeleted sets the deleted field if the given value is not nil.
func (ptvu *PropertyTypeValueUpdate) SetNillableDeleted(b *bool) *PropertyTypeValueUpdate {
	if b != nil {
		ptvu.SetDeleted(*b)
	}
	return ptvu
}

// SetPropertyTypeID sets the property_type edge to PropertyType by id.
func (ptvu *PropertyTypeValueUpdate) SetPropertyTypeID(id int) *PropertyTypeValueUpdate {
	ptvu.mutation.SetPropertyTypeID(id)
	return ptvu
}

// SetNillablePropertyTypeID sets the property_type edge to PropertyType by id if the given value is not nil.
func (ptvu *PropertyTypeValueUpdate) SetNillablePropertyTypeID(id *int) *PropertyTypeValueUpdate {
	if id != nil {
		ptvu = ptvu.SetPropertyTypeID(*id)
	}
	return ptvu
}

// SetPropertyType sets the property_type edge to PropertyType.
func (ptvu *PropertyTypeValueUpdate) SetPropertyType(p *PropertyType) *PropertyTypeValueUpdate {
	return ptvu.SetPropertyTypeID(p.ID)
}

// AddParentPropertyTypeValueIDs adds the parent_property_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) AddParentPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.AddParentPropertyTypeValueIDs(ids...)
	return ptvu
}

// AddParentPropertyTypeValue adds the parent_property_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) AddParentPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.AddParentPropertyTypeValueIDs(ids...)
}

// AddPropertyTypeValueIDs adds the property_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) AddPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.AddPropertyTypeValueIDs(ids...)
	return ptvu
}

// AddPropertyTypeValue adds the property_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) AddPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.AddPropertyTypeValueIDs(ids...)
}

// AddPropertyIDs adds the property edge to Property by ids.
func (ptvu *PropertyTypeValueUpdate) AddPropertyIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.AddPropertyIDs(ids...)
	return ptvu
}

// AddProperty adds the property edges to Property.
func (ptvu *PropertyTypeValueUpdate) AddProperty(p ...*Property) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.AddPropertyIDs(ids...)
}

// Mutation returns the PropertyTypeValueMutation object of the builder.
func (ptvu *PropertyTypeValueUpdate) Mutation() *PropertyTypeValueMutation {
	return ptvu.mutation
}

// ClearPropertyType clears the "property_type" edge to type PropertyType.
func (ptvu *PropertyTypeValueUpdate) ClearPropertyType() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearPropertyType()
	return ptvu
}

// ClearParentPropertyTypeValue clears all "parent_property_type_value" edges to type PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) ClearParentPropertyTypeValue() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearParentPropertyTypeValue()
	return ptvu
}

// RemoveParentPropertyTypeValueIDs removes the parent_property_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) RemoveParentPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.RemoveParentPropertyTypeValueIDs(ids...)
	return ptvu
}

// RemoveParentPropertyTypeValue removes parent_property_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) RemoveParentPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.RemoveParentPropertyTypeValueIDs(ids...)
}

// ClearPropertyTypeValue clears all "property_type_value" edges to type PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) ClearPropertyTypeValue() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearPropertyTypeValue()
	return ptvu
}

// RemovePropertyTypeValueIDs removes the property_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) RemovePropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.RemovePropertyTypeValueIDs(ids...)
	return ptvu
}

// RemovePropertyTypeValue removes property_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) RemovePropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.RemovePropertyTypeValueIDs(ids...)
}

// ClearProperty clears all "property" edges to type Property.
func (ptvu *PropertyTypeValueUpdate) ClearProperty() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearProperty()
	return ptvu
}

// RemovePropertyIDs removes the property edge to Property by ids.
func (ptvu *PropertyTypeValueUpdate) RemovePropertyIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.RemovePropertyIDs(ids...)
	return ptvu
}

// RemoveProperty removes property edges to Property.
func (ptvu *PropertyTypeValueUpdate) RemoveProperty(p ...*Property) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.RemovePropertyIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ptvu *PropertyTypeValueUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	ptvu.defaults()
	if len(ptvu.hooks) == 0 {
		if err = ptvu.check(); err != nil {
			return 0, err
		}
		affected, err = ptvu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PropertyTypeValueMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ptvu.check(); err != nil {
				return 0, err
			}
			ptvu.mutation = mutation
			affected, err = ptvu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ptvu.hooks) - 1; i >= 0; i-- {
			mut = ptvu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ptvu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ptvu *PropertyTypeValueUpdate) SaveX(ctx context.Context) int {
	affected, err := ptvu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ptvu *PropertyTypeValueUpdate) Exec(ctx context.Context) error {
	_, err := ptvu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ptvu *PropertyTypeValueUpdate) ExecX(ctx context.Context) {
	if err := ptvu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ptvu *PropertyTypeValueUpdate) defaults() {
	if _, ok := ptvu.mutation.UpdateTime(); !ok {
		v := propertytypevalue.UpdateDefaultUpdateTime()
		ptvu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ptvu *PropertyTypeValueUpdate) check() error {
	if v, ok := ptvu.mutation.Name(); ok {
		if err := propertytypevalue.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (ptvu *PropertyTypeValueUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   propertytypevalue.Table,
			Columns: propertytypevalue.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: propertytypevalue.FieldID,
			},
		},
	}
	if ps := ptvu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ptvu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertytypevalue.FieldUpdateTime,
		})
	}
	if value, ok := ptvu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytypevalue.FieldName,
		})
	}
	if value, ok := ptvu.mutation.Deleted(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytypevalue.FieldDeleted,
		})
	}
	if ptvu.mutation.PropertyTypeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.PropertyTypeTable,
			Columns: []string{propertytypevalue.PropertyTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.PropertyTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.PropertyTypeTable,
			Columns: []string{propertytypevalue.PropertyTypeColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvu.mutation.ParentPropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytypevalue.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.RemovedParentPropertyTypeValueIDs(); len(nodes) > 0 && !ptvu.mutation.ParentPropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.ParentPropertyTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvu.mutation.PropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytypevalue.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.RemovedPropertyTypeValueIDs(); len(nodes) > 0 && !ptvu.mutation.PropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.PropertyTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvu.mutation.PropertyCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: property.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.RemovedPropertyIDs(); len(nodes) > 0 && !ptvu.mutation.PropertyCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvu.mutation.PropertyIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ptvu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{propertytypevalue.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// PropertyTypeValueUpdateOne is the builder for updating a single PropertyTypeValue entity.
type PropertyTypeValueUpdateOne struct {
	config
	hooks    []Hook
	mutation *PropertyTypeValueMutation
}

// SetName sets the name field.
func (ptvuo *PropertyTypeValueUpdateOne) SetName(s string) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.SetName(s)
	return ptvuo
}

// SetDeleted sets the deleted field.
func (ptvuo *PropertyTypeValueUpdateOne) SetDeleted(b bool) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.SetDeleted(b)
	return ptvuo
}

// SetNillableDeleted sets the deleted field if the given value is not nil.
func (ptvuo *PropertyTypeValueUpdateOne) SetNillableDeleted(b *bool) *PropertyTypeValueUpdateOne {
	if b != nil {
		ptvuo.SetDeleted(*b)
	}
	return ptvuo
}

// SetPropertyTypeID sets the property_type edge to PropertyType by id.
func (ptvuo *PropertyTypeValueUpdateOne) SetPropertyTypeID(id int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.SetPropertyTypeID(id)
	return ptvuo
}

// SetNillablePropertyTypeID sets the property_type edge to PropertyType by id if the given value is not nil.
func (ptvuo *PropertyTypeValueUpdateOne) SetNillablePropertyTypeID(id *int) *PropertyTypeValueUpdateOne {
	if id != nil {
		ptvuo = ptvuo.SetPropertyTypeID(*id)
	}
	return ptvuo
}

// SetPropertyType sets the property_type edge to PropertyType.
func (ptvuo *PropertyTypeValueUpdateOne) SetPropertyType(p *PropertyType) *PropertyTypeValueUpdateOne {
	return ptvuo.SetPropertyTypeID(p.ID)
}

// AddParentPropertyTypeValueIDs adds the parent_property_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) AddParentPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.AddParentPropertyTypeValueIDs(ids...)
	return ptvuo
}

// AddParentPropertyTypeValue adds the parent_property_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) AddParentPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.AddParentPropertyTypeValueIDs(ids...)
}

// AddPropertyTypeValueIDs adds the property_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) AddPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.AddPropertyTypeValueIDs(ids...)
	return ptvuo
}

// AddPropertyTypeValue adds the property_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) AddPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.AddPropertyTypeValueIDs(ids...)
}

// AddPropertyIDs adds the property edge to Property by ids.
func (ptvuo *PropertyTypeValueUpdateOne) AddPropertyIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.AddPropertyIDs(ids...)
	return ptvuo
}

// AddProperty adds the property edges to Property.
func (ptvuo *PropertyTypeValueUpdateOne) AddProperty(p ...*Property) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.AddPropertyIDs(ids...)
}

// Mutation returns the PropertyTypeValueMutation object of the builder.
func (ptvuo *PropertyTypeValueUpdateOne) Mutation() *PropertyTypeValueMutation {
	return ptvuo.mutation
}

// ClearPropertyType clears the "property_type" edge to type PropertyType.
func (ptvuo *PropertyTypeValueUpdateOne) ClearPropertyType() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearPropertyType()
	return ptvuo
}

// ClearParentPropertyTypeValue clears all "parent_property_type_value" edges to type PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) ClearParentPropertyTypeValue() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearParentPropertyTypeValue()
	return ptvuo
}

// RemoveParentPropertyTypeValueIDs removes the parent_property_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) RemoveParentPropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.RemoveParentPropertyTypeValueIDs(ids...)
	return ptvuo
}

// RemoveParentPropertyTypeValue removes parent_property_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) RemoveParentPropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.RemoveParentPropertyTypeValueIDs(ids...)
}

// ClearPropertyTypeValue clears all "property_type_value" edges to type PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) ClearPropertyTypeValue() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearPropertyTypeValue()
	return ptvuo
}

// RemovePropertyTypeValueIDs removes the property_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) RemovePropertyTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.RemovePropertyTypeValueIDs(ids...)
	return ptvuo
}

// RemovePropertyTypeValue removes property_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) RemovePropertyTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.RemovePropertyTypeValueIDs(ids...)
}

// ClearProperty clears all "property" edges to type Property.
func (ptvuo *PropertyTypeValueUpdateOne) ClearProperty() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearProperty()
	return ptvuo
}

// RemovePropertyIDs removes the property edge to Property by ids.
func (ptvuo *PropertyTypeValueUpdateOne) RemovePropertyIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.RemovePropertyIDs(ids...)
	return ptvuo
}

// RemoveProperty removes property edges to Property.
func (ptvuo *PropertyTypeValueUpdateOne) RemoveProperty(p ...*Property) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.RemovePropertyIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (ptvuo *PropertyTypeValueUpdateOne) Save(ctx context.Context) (*PropertyTypeValue, error) {
	var (
		err  error
		node *PropertyTypeValue
	)
	ptvuo.defaults()
	if len(ptvuo.hooks) == 0 {
		if err = ptvuo.check(); err != nil {
			return nil, err
		}
		node, err = ptvuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PropertyTypeValueMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ptvuo.check(); err != nil {
				return nil, err
			}
			ptvuo.mutation = mutation
			node, err = ptvuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ptvuo.hooks) - 1; i >= 0; i-- {
			mut = ptvuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ptvuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ptvuo *PropertyTypeValueUpdateOne) SaveX(ctx context.Context) *PropertyTypeValue {
	node, err := ptvuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ptvuo *PropertyTypeValueUpdateOne) Exec(ctx context.Context) error {
	_, err := ptvuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ptvuo *PropertyTypeValueUpdateOne) ExecX(ctx context.Context) {
	if err := ptvuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ptvuo *PropertyTypeValueUpdateOne) defaults() {
	if _, ok := ptvuo.mutation.UpdateTime(); !ok {
		v := propertytypevalue.UpdateDefaultUpdateTime()
		ptvuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ptvuo *PropertyTypeValueUpdateOne) check() error {
	if v, ok := ptvuo.mutation.Name(); ok {
		if err := propertytypevalue.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (ptvuo *PropertyTypeValueUpdateOne) sqlSave(ctx context.Context) (_node *PropertyTypeValue, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   propertytypevalue.Table,
			Columns: propertytypevalue.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: propertytypevalue.FieldID,
			},
		},
	}
	id, ok := ptvuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing PropertyTypeValue.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := ptvuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertytypevalue.FieldUpdateTime,
		})
	}
	if value, ok := ptvuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytypevalue.FieldName,
		})
	}
	if value, ok := ptvuo.mutation.Deleted(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytypevalue.FieldDeleted,
		})
	}
	if ptvuo.mutation.PropertyTypeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.PropertyTypeTable,
			Columns: []string{propertytypevalue.PropertyTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.PropertyTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.PropertyTypeTable,
			Columns: []string{propertytypevalue.PropertyTypeColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvuo.mutation.ParentPropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytypevalue.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.RemovedParentPropertyTypeValueIDs(); len(nodes) > 0 && !ptvuo.mutation.ParentPropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.ParentPropertyTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   propertytypevalue.ParentPropertyTypeValueTable,
			Columns: propertytypevalue.ParentPropertyTypeValuePrimaryKey,
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvuo.mutation.PropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytypevalue.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.RemovedPropertyTypeValueIDs(); len(nodes) > 0 && !ptvuo.mutation.PropertyTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.PropertyTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTypeValueTable,
			Columns: propertytypevalue.PropertyTypeValuePrimaryKey,
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ptvuo.mutation.PropertyCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: property.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.RemovedPropertyIDs(); len(nodes) > 0 && !ptvuo.mutation.PropertyCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ptvuo.mutation.PropertyIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropertyTable,
			Columns: []string{propertytypevalue.PropertyColumn},
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &PropertyTypeValue{config: ptvuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, ptvuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{propertytypevalue.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}