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

// SetProTypValID sets the pro_typ_val edge to PropertyTypeValue by id.
func (ptvu *PropertyTypeValueUpdate) SetProTypValID(id int) *PropertyTypeValueUpdate {
	ptvu.mutation.SetProTypValID(id)
	return ptvu
}

// SetNillableProTypValID sets the pro_typ_val edge to PropertyTypeValue by id if the given value is not nil.
func (ptvu *PropertyTypeValueUpdate) SetNillableProTypValID(id *int) *PropertyTypeValueUpdate {
	if id != nil {
		ptvu = ptvu.SetProTypValID(*id)
	}
	return ptvu
}

// SetProTypVal sets the pro_typ_val edge to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) SetProTypVal(p *PropertyTypeValue) *PropertyTypeValueUpdate {
	return ptvu.SetProTypValID(p.ID)
}

// AddPropTypeValueIDs adds the prop_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) AddPropTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.AddPropTypeValueIDs(ids...)
	return ptvu
}

// AddPropTypeValue adds the prop_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) AddPropTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.AddPropTypeValueIDs(ids...)
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

// ClearProTypVal clears the "pro_typ_val" edge to type PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) ClearProTypVal() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearProTypVal()
	return ptvu
}

// ClearPropTypeValue clears all "prop_type_value" edges to type PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) ClearPropTypeValue() *PropertyTypeValueUpdate {
	ptvu.mutation.ClearPropTypeValue()
	return ptvu
}

// RemovePropTypeValueIDs removes the prop_type_value edge to PropertyTypeValue by ids.
func (ptvu *PropertyTypeValueUpdate) RemovePropTypeValueIDs(ids ...int) *PropertyTypeValueUpdate {
	ptvu.mutation.RemovePropTypeValueIDs(ids...)
	return ptvu
}

// RemovePropTypeValue removes prop_type_value edges to PropertyTypeValue.
func (ptvu *PropertyTypeValueUpdate) RemovePropTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvu.RemovePropTypeValueIDs(ids...)
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
	if ptvu.mutation.ProTypValCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.ProTypValTable,
			Columns: []string{propertytypevalue.ProTypValColumn},
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
	if nodes := ptvu.mutation.ProTypValIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.ProTypValTable,
			Columns: []string{propertytypevalue.ProTypValColumn},
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
	if ptvu.mutation.PropTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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
	if nodes := ptvu.mutation.RemovedPropTypeValueIDs(); len(nodes) > 0 && !ptvu.mutation.PropTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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
	if nodes := ptvu.mutation.PropTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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

// SetProTypValID sets the pro_typ_val edge to PropertyTypeValue by id.
func (ptvuo *PropertyTypeValueUpdateOne) SetProTypValID(id int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.SetProTypValID(id)
	return ptvuo
}

// SetNillableProTypValID sets the pro_typ_val edge to PropertyTypeValue by id if the given value is not nil.
func (ptvuo *PropertyTypeValueUpdateOne) SetNillableProTypValID(id *int) *PropertyTypeValueUpdateOne {
	if id != nil {
		ptvuo = ptvuo.SetProTypValID(*id)
	}
	return ptvuo
}

// SetProTypVal sets the pro_typ_val edge to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) SetProTypVal(p *PropertyTypeValue) *PropertyTypeValueUpdateOne {
	return ptvuo.SetProTypValID(p.ID)
}

// AddPropTypeValueIDs adds the prop_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) AddPropTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.AddPropTypeValueIDs(ids...)
	return ptvuo
}

// AddPropTypeValue adds the prop_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) AddPropTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.AddPropTypeValueIDs(ids...)
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

// ClearProTypVal clears the "pro_typ_val" edge to type PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) ClearProTypVal() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearProTypVal()
	return ptvuo
}

// ClearPropTypeValue clears all "prop_type_value" edges to type PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) ClearPropTypeValue() *PropertyTypeValueUpdateOne {
	ptvuo.mutation.ClearPropTypeValue()
	return ptvuo
}

// RemovePropTypeValueIDs removes the prop_type_value edge to PropertyTypeValue by ids.
func (ptvuo *PropertyTypeValueUpdateOne) RemovePropTypeValueIDs(ids ...int) *PropertyTypeValueUpdateOne {
	ptvuo.mutation.RemovePropTypeValueIDs(ids...)
	return ptvuo
}

// RemovePropTypeValue removes prop_type_value edges to PropertyTypeValue.
func (ptvuo *PropertyTypeValueUpdateOne) RemovePropTypeValue(p ...*PropertyTypeValue) *PropertyTypeValueUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptvuo.RemovePropTypeValueIDs(ids...)
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
	if ptvuo.mutation.ProTypValCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.ProTypValTable,
			Columns: []string{propertytypevalue.ProTypValColumn},
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
	if nodes := ptvuo.mutation.ProTypValIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytypevalue.ProTypValTable,
			Columns: []string{propertytypevalue.ProTypValColumn},
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
	if ptvuo.mutation.PropTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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
	if nodes := ptvuo.mutation.RemovedPropTypeValueIDs(); len(nodes) > 0 && !ptvuo.mutation.PropTypeValueCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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
	if nodes := ptvuo.mutation.PropTypeValueIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   propertytypevalue.PropTypeValueTable,
			Columns: []string{propertytypevalue.PropTypeValueColumn},
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
