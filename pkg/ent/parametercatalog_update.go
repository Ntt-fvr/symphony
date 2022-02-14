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
	"github.com/facebookincubator/symphony/pkg/ent/parametercatalog"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/propertycategory"
)

// ParameterCatalogUpdate is the builder for updating ParameterCatalog entities.
type ParameterCatalogUpdate struct {
	config
	hooks    []Hook
	mutation *ParameterCatalogMutation
}

// Where adds a new predicate for the builder.
func (pcu *ParameterCatalogUpdate) Where(ps ...predicate.ParameterCatalog) *ParameterCatalogUpdate {
	pcu.mutation.predicates = append(pcu.mutation.predicates, ps...)
	return pcu
}

// SetName sets the name field.
func (pcu *ParameterCatalogUpdate) SetName(s string) *ParameterCatalogUpdate {
	pcu.mutation.SetName(s)
	return pcu
}

// SetIndex sets the index field.
func (pcu *ParameterCatalogUpdate) SetIndex(i int) *ParameterCatalogUpdate {
	pcu.mutation.ResetIndex()
	pcu.mutation.SetIndex(i)
	return pcu
}

// SetNillableIndex sets the index field if the given value is not nil.
func (pcu *ParameterCatalogUpdate) SetNillableIndex(i *int) *ParameterCatalogUpdate {
	if i != nil {
		pcu.SetIndex(*i)
	}
	return pcu
}

// AddIndex adds i to index.
func (pcu *ParameterCatalogUpdate) AddIndex(i int) *ParameterCatalogUpdate {
	pcu.mutation.AddIndex(i)
	return pcu
}

// SetDisabled sets the disabled field.
func (pcu *ParameterCatalogUpdate) SetDisabled(b bool) *ParameterCatalogUpdate {
	pcu.mutation.SetDisabled(b)
	return pcu
}

// SetNillableDisabled sets the disabled field if the given value is not nil.
func (pcu *ParameterCatalogUpdate) SetNillableDisabled(b *bool) *ParameterCatalogUpdate {
	if b != nil {
		pcu.SetDisabled(*b)
	}
	return pcu
}

// AddPropertyCategoryIDs adds the property_categories edge to PropertyCategory by ids.
func (pcu *ParameterCatalogUpdate) AddPropertyCategoryIDs(ids ...int) *ParameterCatalogUpdate {
	pcu.mutation.AddPropertyCategoryIDs(ids...)
	return pcu
}

// AddPropertyCategories adds the property_categories edges to PropertyCategory.
func (pcu *ParameterCatalogUpdate) AddPropertyCategories(p ...*PropertyCategory) *ParameterCatalogUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return pcu.AddPropertyCategoryIDs(ids...)
}

// Mutation returns the ParameterCatalogMutation object of the builder.
func (pcu *ParameterCatalogUpdate) Mutation() *ParameterCatalogMutation {
	return pcu.mutation
}

// ClearPropertyCategories clears all "property_categories" edges to type PropertyCategory.
func (pcu *ParameterCatalogUpdate) ClearPropertyCategories() *ParameterCatalogUpdate {
	pcu.mutation.ClearPropertyCategories()
	return pcu
}

// RemovePropertyCategoryIDs removes the property_categories edge to PropertyCategory by ids.
func (pcu *ParameterCatalogUpdate) RemovePropertyCategoryIDs(ids ...int) *ParameterCatalogUpdate {
	pcu.mutation.RemovePropertyCategoryIDs(ids...)
	return pcu
}

// RemovePropertyCategories removes property_categories edges to PropertyCategory.
func (pcu *ParameterCatalogUpdate) RemovePropertyCategories(p ...*PropertyCategory) *ParameterCatalogUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return pcu.RemovePropertyCategoryIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (pcu *ParameterCatalogUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	pcu.defaults()
	if len(pcu.hooks) == 0 {
		affected, err = pcu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ParameterCatalogMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			pcu.mutation = mutation
			affected, err = pcu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(pcu.hooks) - 1; i >= 0; i-- {
			mut = pcu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, pcu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (pcu *ParameterCatalogUpdate) SaveX(ctx context.Context) int {
	affected, err := pcu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (pcu *ParameterCatalogUpdate) Exec(ctx context.Context) error {
	_, err := pcu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pcu *ParameterCatalogUpdate) ExecX(ctx context.Context) {
	if err := pcu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (pcu *ParameterCatalogUpdate) defaults() {
	if _, ok := pcu.mutation.UpdateTime(); !ok {
		v := parametercatalog.UpdateDefaultUpdateTime()
		pcu.mutation.SetUpdateTime(v)
	}
}

func (pcu *ParameterCatalogUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   parametercatalog.Table,
			Columns: parametercatalog.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: parametercatalog.FieldID,
			},
		},
	}
	if ps := pcu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := pcu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: parametercatalog.FieldUpdateTime,
		})
	}
	if value, ok := pcu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: parametercatalog.FieldName,
		})
	}
	if value, ok := pcu.mutation.Index(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: parametercatalog.FieldIndex,
		})
	}
	if value, ok := pcu.mutation.AddedIndex(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: parametercatalog.FieldIndex,
		})
	}
	if value, ok := pcu.mutation.Disabled(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: parametercatalog.FieldDisabled,
		})
	}
	if pcu.mutation.PropertyCategoriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pcu.mutation.RemovedPropertyCategoriesIDs(); len(nodes) > 0 && !pcu.mutation.PropertyCategoriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pcu.mutation.PropertyCategoriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, pcu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{parametercatalog.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// ParameterCatalogUpdateOne is the builder for updating a single ParameterCatalog entity.
type ParameterCatalogUpdateOne struct {
	config
	hooks    []Hook
	mutation *ParameterCatalogMutation
}

// SetName sets the name field.
func (pcuo *ParameterCatalogUpdateOne) SetName(s string) *ParameterCatalogUpdateOne {
	pcuo.mutation.SetName(s)
	return pcuo
}

// SetIndex sets the index field.
func (pcuo *ParameterCatalogUpdateOne) SetIndex(i int) *ParameterCatalogUpdateOne {
	pcuo.mutation.ResetIndex()
	pcuo.mutation.SetIndex(i)
	return pcuo
}

// SetNillableIndex sets the index field if the given value is not nil.
func (pcuo *ParameterCatalogUpdateOne) SetNillableIndex(i *int) *ParameterCatalogUpdateOne {
	if i != nil {
		pcuo.SetIndex(*i)
	}
	return pcuo
}

// AddIndex adds i to index.
func (pcuo *ParameterCatalogUpdateOne) AddIndex(i int) *ParameterCatalogUpdateOne {
	pcuo.mutation.AddIndex(i)
	return pcuo
}

// SetDisabled sets the disabled field.
func (pcuo *ParameterCatalogUpdateOne) SetDisabled(b bool) *ParameterCatalogUpdateOne {
	pcuo.mutation.SetDisabled(b)
	return pcuo
}

// SetNillableDisabled sets the disabled field if the given value is not nil.
func (pcuo *ParameterCatalogUpdateOne) SetNillableDisabled(b *bool) *ParameterCatalogUpdateOne {
	if b != nil {
		pcuo.SetDisabled(*b)
	}
	return pcuo
}

// AddPropertyCategoryIDs adds the property_categories edge to PropertyCategory by ids.
func (pcuo *ParameterCatalogUpdateOne) AddPropertyCategoryIDs(ids ...int) *ParameterCatalogUpdateOne {
	pcuo.mutation.AddPropertyCategoryIDs(ids...)
	return pcuo
}

// AddPropertyCategories adds the property_categories edges to PropertyCategory.
func (pcuo *ParameterCatalogUpdateOne) AddPropertyCategories(p ...*PropertyCategory) *ParameterCatalogUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return pcuo.AddPropertyCategoryIDs(ids...)
}

// Mutation returns the ParameterCatalogMutation object of the builder.
func (pcuo *ParameterCatalogUpdateOne) Mutation() *ParameterCatalogMutation {
	return pcuo.mutation
}

// ClearPropertyCategories clears all "property_categories" edges to type PropertyCategory.
func (pcuo *ParameterCatalogUpdateOne) ClearPropertyCategories() *ParameterCatalogUpdateOne {
	pcuo.mutation.ClearPropertyCategories()
	return pcuo
}

// RemovePropertyCategoryIDs removes the property_categories edge to PropertyCategory by ids.
func (pcuo *ParameterCatalogUpdateOne) RemovePropertyCategoryIDs(ids ...int) *ParameterCatalogUpdateOne {
	pcuo.mutation.RemovePropertyCategoryIDs(ids...)
	return pcuo
}

// RemovePropertyCategories removes property_categories edges to PropertyCategory.
func (pcuo *ParameterCatalogUpdateOne) RemovePropertyCategories(p ...*PropertyCategory) *ParameterCatalogUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return pcuo.RemovePropertyCategoryIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (pcuo *ParameterCatalogUpdateOne) Save(ctx context.Context) (*ParameterCatalog, error) {
	var (
		err  error
		node *ParameterCatalog
	)
	pcuo.defaults()
	if len(pcuo.hooks) == 0 {
		node, err = pcuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ParameterCatalogMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			pcuo.mutation = mutation
			node, err = pcuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(pcuo.hooks) - 1; i >= 0; i-- {
			mut = pcuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, pcuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (pcuo *ParameterCatalogUpdateOne) SaveX(ctx context.Context) *ParameterCatalog {
	node, err := pcuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (pcuo *ParameterCatalogUpdateOne) Exec(ctx context.Context) error {
	_, err := pcuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pcuo *ParameterCatalogUpdateOne) ExecX(ctx context.Context) {
	if err := pcuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (pcuo *ParameterCatalogUpdateOne) defaults() {
	if _, ok := pcuo.mutation.UpdateTime(); !ok {
		v := parametercatalog.UpdateDefaultUpdateTime()
		pcuo.mutation.SetUpdateTime(v)
	}
}

func (pcuo *ParameterCatalogUpdateOne) sqlSave(ctx context.Context) (_node *ParameterCatalog, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   parametercatalog.Table,
			Columns: parametercatalog.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: parametercatalog.FieldID,
			},
		},
	}
	id, ok := pcuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing ParameterCatalog.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := pcuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: parametercatalog.FieldUpdateTime,
		})
	}
	if value, ok := pcuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: parametercatalog.FieldName,
		})
	}
	if value, ok := pcuo.mutation.Index(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: parametercatalog.FieldIndex,
		})
	}
	if value, ok := pcuo.mutation.AddedIndex(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: parametercatalog.FieldIndex,
		})
	}
	if value, ok := pcuo.mutation.Disabled(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: parametercatalog.FieldDisabled,
		})
	}
	if pcuo.mutation.PropertyCategoriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pcuo.mutation.RemovedPropertyCategoriesIDs(); len(nodes) > 0 && !pcuo.mutation.PropertyCategoriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pcuo.mutation.PropertyCategoriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   parametercatalog.PropertyCategoriesTable,
			Columns: []string{parametercatalog.PropertyCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertycategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &ParameterCatalog{config: pcuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, pcuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{parametercatalog.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
