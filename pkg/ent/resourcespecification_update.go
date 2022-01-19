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
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceSpecificationUpdate is the builder for updating ResourceSpecification entities.
type ResourceSpecificationUpdate struct {
	config
	hooks    []Hook
	mutation *ResourceSpecificationMutation
}

// Where adds a new predicate for the builder.
func (rsu *ResourceSpecificationUpdate) Where(ps ...predicate.ResourceSpecification) *ResourceSpecificationUpdate {
	rsu.mutation.predicates = append(rsu.mutation.predicates, ps...)
	return rsu
}

// SetName sets the name field.
func (rsu *ResourceSpecificationUpdate) SetName(s string) *ResourceSpecificationUpdate {
	rsu.mutation.SetName(s)
	return rsu
}

// SetResourcetypeID sets the resourcetype edge to ResourceType by id.
func (rsu *ResourceSpecificationUpdate) SetResourcetypeID(id int) *ResourceSpecificationUpdate {
	rsu.mutation.SetResourcetypeID(id)
	return rsu
}

// SetNillableResourcetypeID sets the resourcetype edge to ResourceType by id if the given value is not nil.
func (rsu *ResourceSpecificationUpdate) SetNillableResourcetypeID(id *int) *ResourceSpecificationUpdate {
	if id != nil {
		rsu = rsu.SetResourcetypeID(*id)
	}
	return rsu
}

// SetResourcetype sets the resourcetype edge to ResourceType.
func (rsu *ResourceSpecificationUpdate) SetResourcetype(r *ResourceType) *ResourceSpecificationUpdate {
	return rsu.SetResourcetypeID(r.ID)
}

// AddPropertyTypeFkIDs adds the property_type_fk edge to PropertyType by ids.
func (rsu *ResourceSpecificationUpdate) AddPropertyTypeFkIDs(ids ...int) *ResourceSpecificationUpdate {
	rsu.mutation.AddPropertyTypeFkIDs(ids...)
	return rsu
}

// AddPropertyTypeFk adds the property_type_fk edges to PropertyType.
func (rsu *ResourceSpecificationUpdate) AddPropertyTypeFk(p ...*PropertyType) *ResourceSpecificationUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return rsu.AddPropertyTypeFkIDs(ids...)
}

// AddResourceSpecificationIDs adds the resource_specification edge to ResourceSpecificationRelationship by ids.
func (rsu *ResourceSpecificationUpdate) AddResourceSpecificationIDs(ids ...int) *ResourceSpecificationUpdate {
	rsu.mutation.AddResourceSpecificationIDs(ids...)
	return rsu
}

// AddResourceSpecification adds the resource_specification edges to ResourceSpecificationRelationship.
func (rsu *ResourceSpecificationUpdate) AddResourceSpecification(r ...*ResourceSpecificationRelationship) *ResourceSpecificationUpdate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsu.AddResourceSpecificationIDs(ids...)
}

// Mutation returns the ResourceSpecificationMutation object of the builder.
func (rsu *ResourceSpecificationUpdate) Mutation() *ResourceSpecificationMutation {
	return rsu.mutation
}

// ClearResourcetype clears the "resourcetype" edge to type ResourceType.
func (rsu *ResourceSpecificationUpdate) ClearResourcetype() *ResourceSpecificationUpdate {
	rsu.mutation.ClearResourcetype()
	return rsu
}

// ClearPropertyTypeFk clears all "property_type_fk" edges to type PropertyType.
func (rsu *ResourceSpecificationUpdate) ClearPropertyTypeFk() *ResourceSpecificationUpdate {
	rsu.mutation.ClearPropertyTypeFk()
	return rsu
}

// RemovePropertyTypeFkIDs removes the property_type_fk edge to PropertyType by ids.
func (rsu *ResourceSpecificationUpdate) RemovePropertyTypeFkIDs(ids ...int) *ResourceSpecificationUpdate {
	rsu.mutation.RemovePropertyTypeFkIDs(ids...)
	return rsu
}

// RemovePropertyTypeFk removes property_type_fk edges to PropertyType.
func (rsu *ResourceSpecificationUpdate) RemovePropertyTypeFk(p ...*PropertyType) *ResourceSpecificationUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return rsu.RemovePropertyTypeFkIDs(ids...)
}

// ClearResourceSpecification clears all "resource_specification" edges to type ResourceSpecificationRelationship.
func (rsu *ResourceSpecificationUpdate) ClearResourceSpecification() *ResourceSpecificationUpdate {
	rsu.mutation.ClearResourceSpecification()
	return rsu
}

// RemoveResourceSpecificationIDs removes the resource_specification edge to ResourceSpecificationRelationship by ids.
func (rsu *ResourceSpecificationUpdate) RemoveResourceSpecificationIDs(ids ...int) *ResourceSpecificationUpdate {
	rsu.mutation.RemoveResourceSpecificationIDs(ids...)
	return rsu
}

// RemoveResourceSpecification removes resource_specification edges to ResourceSpecificationRelationship.
func (rsu *ResourceSpecificationUpdate) RemoveResourceSpecification(r ...*ResourceSpecificationRelationship) *ResourceSpecificationUpdate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsu.RemoveResourceSpecificationIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (rsu *ResourceSpecificationUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	rsu.defaults()
	if len(rsu.hooks) == 0 {
		if err = rsu.check(); err != nil {
			return 0, err
		}
		affected, err = rsu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSpecificationMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rsu.check(); err != nil {
				return 0, err
			}
			rsu.mutation = mutation
			affected, err = rsu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(rsu.hooks) - 1; i >= 0; i-- {
			mut = rsu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rsu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (rsu *ResourceSpecificationUpdate) SaveX(ctx context.Context) int {
	affected, err := rsu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (rsu *ResourceSpecificationUpdate) Exec(ctx context.Context) error {
	_, err := rsu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rsu *ResourceSpecificationUpdate) ExecX(ctx context.Context) {
	if err := rsu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rsu *ResourceSpecificationUpdate) defaults() {
	if _, ok := rsu.mutation.UpdateTime(); !ok {
		v := resourcespecification.UpdateDefaultUpdateTime()
		rsu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsu *ResourceSpecificationUpdate) check() error {
	if v, ok := rsu.mutation.Name(); ok {
		if err := resourcespecification.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (rsu *ResourceSpecificationUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcespecification.Table,
			Columns: resourcespecification.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecification.FieldID,
			},
		},
	}
	if ps := rsu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := rsu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecification.FieldUpdateTime,
		})
	}
	if value, ok := rsu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcespecification.FieldName,
		})
	}
	if rsu.mutation.ResourcetypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsu.mutation.ResourcetypeIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rsu.mutation.PropertyTypeFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
	if nodes := rsu.mutation.RemovedPropertyTypeFkIDs(); len(nodes) > 0 && !rsu.mutation.PropertyTypeFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsu.mutation.PropertyTypeFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
	if rsu.mutation.ResourceSpecificationCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsu.mutation.RemovedResourceSpecificationIDs(); len(nodes) > 0 && !rsu.mutation.ResourceSpecificationCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsu.mutation.ResourceSpecificationIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, rsu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{resourcespecification.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// ResourceSpecificationUpdateOne is the builder for updating a single ResourceSpecification entity.
type ResourceSpecificationUpdateOne struct {
	config
	hooks    []Hook
	mutation *ResourceSpecificationMutation
}

// SetName sets the name field.
func (rsuo *ResourceSpecificationUpdateOne) SetName(s string) *ResourceSpecificationUpdateOne {
	rsuo.mutation.SetName(s)
	return rsuo
}

// SetResourcetypeID sets the resourcetype edge to ResourceType by id.
func (rsuo *ResourceSpecificationUpdateOne) SetResourcetypeID(id int) *ResourceSpecificationUpdateOne {
	rsuo.mutation.SetResourcetypeID(id)
	return rsuo
}

// SetNillableResourcetypeID sets the resourcetype edge to ResourceType by id if the given value is not nil.
func (rsuo *ResourceSpecificationUpdateOne) SetNillableResourcetypeID(id *int) *ResourceSpecificationUpdateOne {
	if id != nil {
		rsuo = rsuo.SetResourcetypeID(*id)
	}
	return rsuo
}

// SetResourcetype sets the resourcetype edge to ResourceType.
func (rsuo *ResourceSpecificationUpdateOne) SetResourcetype(r *ResourceType) *ResourceSpecificationUpdateOne {
	return rsuo.SetResourcetypeID(r.ID)
}

// AddPropertyTypeFkIDs adds the property_type_fk edge to PropertyType by ids.
func (rsuo *ResourceSpecificationUpdateOne) AddPropertyTypeFkIDs(ids ...int) *ResourceSpecificationUpdateOne {
	rsuo.mutation.AddPropertyTypeFkIDs(ids...)
	return rsuo
}

// AddPropertyTypeFk adds the property_type_fk edges to PropertyType.
func (rsuo *ResourceSpecificationUpdateOne) AddPropertyTypeFk(p ...*PropertyType) *ResourceSpecificationUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return rsuo.AddPropertyTypeFkIDs(ids...)
}

// AddResourceSpecificationIDs adds the resource_specification edge to ResourceSpecificationRelationship by ids.
func (rsuo *ResourceSpecificationUpdateOne) AddResourceSpecificationIDs(ids ...int) *ResourceSpecificationUpdateOne {
	rsuo.mutation.AddResourceSpecificationIDs(ids...)
	return rsuo
}

// AddResourceSpecification adds the resource_specification edges to ResourceSpecificationRelationship.
func (rsuo *ResourceSpecificationUpdateOne) AddResourceSpecification(r ...*ResourceSpecificationRelationship) *ResourceSpecificationUpdateOne {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsuo.AddResourceSpecificationIDs(ids...)
}

// Mutation returns the ResourceSpecificationMutation object of the builder.
func (rsuo *ResourceSpecificationUpdateOne) Mutation() *ResourceSpecificationMutation {
	return rsuo.mutation
}

// ClearResourcetype clears the "resourcetype" edge to type ResourceType.
func (rsuo *ResourceSpecificationUpdateOne) ClearResourcetype() *ResourceSpecificationUpdateOne {
	rsuo.mutation.ClearResourcetype()
	return rsuo
}

// ClearPropertyTypeFk clears all "property_type_fk" edges to type PropertyType.
func (rsuo *ResourceSpecificationUpdateOne) ClearPropertyTypeFk() *ResourceSpecificationUpdateOne {
	rsuo.mutation.ClearPropertyTypeFk()
	return rsuo
}

// RemovePropertyTypeFkIDs removes the property_type_fk edge to PropertyType by ids.
func (rsuo *ResourceSpecificationUpdateOne) RemovePropertyTypeFkIDs(ids ...int) *ResourceSpecificationUpdateOne {
	rsuo.mutation.RemovePropertyTypeFkIDs(ids...)
	return rsuo
}

// RemovePropertyTypeFk removes property_type_fk edges to PropertyType.
func (rsuo *ResourceSpecificationUpdateOne) RemovePropertyTypeFk(p ...*PropertyType) *ResourceSpecificationUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return rsuo.RemovePropertyTypeFkIDs(ids...)
}

// ClearResourceSpecification clears all "resource_specification" edges to type ResourceSpecificationRelationship.
func (rsuo *ResourceSpecificationUpdateOne) ClearResourceSpecification() *ResourceSpecificationUpdateOne {
	rsuo.mutation.ClearResourceSpecification()
	return rsuo
}

// RemoveResourceSpecificationIDs removes the resource_specification edge to ResourceSpecificationRelationship by ids.
func (rsuo *ResourceSpecificationUpdateOne) RemoveResourceSpecificationIDs(ids ...int) *ResourceSpecificationUpdateOne {
	rsuo.mutation.RemoveResourceSpecificationIDs(ids...)
	return rsuo
}

// RemoveResourceSpecification removes resource_specification edges to ResourceSpecificationRelationship.
func (rsuo *ResourceSpecificationUpdateOne) RemoveResourceSpecification(r ...*ResourceSpecificationRelationship) *ResourceSpecificationUpdateOne {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rsuo.RemoveResourceSpecificationIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (rsuo *ResourceSpecificationUpdateOne) Save(ctx context.Context) (*ResourceSpecification, error) {
	var (
		err  error
		node *ResourceSpecification
	)
	rsuo.defaults()
	if len(rsuo.hooks) == 0 {
		if err = rsuo.check(); err != nil {
			return nil, err
		}
		node, err = rsuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ResourceSpecificationMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rsuo.check(); err != nil {
				return nil, err
			}
			rsuo.mutation = mutation
			node, err = rsuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rsuo.hooks) - 1; i >= 0; i-- {
			mut = rsuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rsuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (rsuo *ResourceSpecificationUpdateOne) SaveX(ctx context.Context) *ResourceSpecification {
	node, err := rsuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (rsuo *ResourceSpecificationUpdateOne) Exec(ctx context.Context) error {
	_, err := rsuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rsuo *ResourceSpecificationUpdateOne) ExecX(ctx context.Context) {
	if err := rsuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rsuo *ResourceSpecificationUpdateOne) defaults() {
	if _, ok := rsuo.mutation.UpdateTime(); !ok {
		v := resourcespecification.UpdateDefaultUpdateTime()
		rsuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rsuo *ResourceSpecificationUpdateOne) check() error {
	if v, ok := rsuo.mutation.Name(); ok {
		if err := resourcespecification.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (rsuo *ResourceSpecificationUpdateOne) sqlSave(ctx context.Context) (_node *ResourceSpecification, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcespecification.Table,
			Columns: resourcespecification.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecification.FieldID,
			},
		},
	}
	id, ok := rsuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing ResourceSpecification.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := rsuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: resourcespecification.FieldUpdateTime,
		})
	}
	if value, ok := rsuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: resourcespecification.FieldName,
		})
	}
	if rsuo.mutation.ResourcetypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsuo.mutation.ResourcetypeIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rsuo.mutation.PropertyTypeFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
	if nodes := rsuo.mutation.RemovedPropertyTypeFkIDs(); len(nodes) > 0 && !rsuo.mutation.PropertyTypeFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsuo.mutation.PropertyTypeFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   resourcespecification.PropertyTypeFkTable,
			Columns: []string{resourcespecification.PropertyTypeFkColumn},
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
	if rsuo.mutation.ResourceSpecificationCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsuo.mutation.RemovedResourceSpecificationIDs(); len(nodes) > 0 && !rsuo.mutation.ResourceSpecificationCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rsuo.mutation.ResourceSpecificationIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &ResourceSpecification{config: rsuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, rsuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{resourcespecification.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
