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
	"github.com/facebookincubator/symphony/pkg/ent/organization"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
)

// OrganizationUpdate is the builder for updating Organization entities.
type OrganizationUpdate struct {
	config
	hooks    []Hook
	mutation *OrganizationMutation
}

// Where adds a new predicate for the builder.
func (ou *OrganizationUpdate) Where(ps ...predicate.Organization) *OrganizationUpdate {
	ou.mutation.predicates = append(ou.mutation.predicates, ps...)
	return ou
}

// SetName sets the name field.
func (ou *OrganizationUpdate) SetName(s string) *OrganizationUpdate {
	ou.mutation.SetName(s)
	return ou
}

// SetDescription sets the description field.
func (ou *OrganizationUpdate) SetDescription(s string) *OrganizationUpdate {
	ou.mutation.SetDescription(s)
	return ou
}

// AddUserFkIDs adds the user_fk edge to User by ids.
func (ou *OrganizationUpdate) AddUserFkIDs(ids ...int) *OrganizationUpdate {
	ou.mutation.AddUserFkIDs(ids...)
	return ou
}

// AddUserFk adds the user_fk edges to User.
func (ou *OrganizationUpdate) AddUserFk(u ...*User) *OrganizationUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ou.AddUserFkIDs(ids...)
}

// AddWorkOrderFkIDs adds the work_order_fk edge to WorkOrder by ids.
func (ou *OrganizationUpdate) AddWorkOrderFkIDs(ids ...int) *OrganizationUpdate {
	ou.mutation.AddWorkOrderFkIDs(ids...)
	return ou
}

// AddWorkOrderFk adds the work_order_fk edges to WorkOrder.
func (ou *OrganizationUpdate) AddWorkOrderFk(w ...*WorkOrder) *OrganizationUpdate {
	ids := make([]int, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return ou.AddWorkOrderFkIDs(ids...)
}

// Mutation returns the OrganizationMutation object of the builder.
func (ou *OrganizationUpdate) Mutation() *OrganizationMutation {
	return ou.mutation
}

// ClearUserFk clears all "user_fk" edges to type User.
func (ou *OrganizationUpdate) ClearUserFk() *OrganizationUpdate {
	ou.mutation.ClearUserFk()
	return ou
}

// RemoveUserFkIDs removes the user_fk edge to User by ids.
func (ou *OrganizationUpdate) RemoveUserFkIDs(ids ...int) *OrganizationUpdate {
	ou.mutation.RemoveUserFkIDs(ids...)
	return ou
}

// RemoveUserFk removes user_fk edges to User.
func (ou *OrganizationUpdate) RemoveUserFk(u ...*User) *OrganizationUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ou.RemoveUserFkIDs(ids...)
}

// ClearWorkOrderFk clears all "work_order_fk" edges to type WorkOrder.
func (ou *OrganizationUpdate) ClearWorkOrderFk() *OrganizationUpdate {
	ou.mutation.ClearWorkOrderFk()
	return ou
}

// RemoveWorkOrderFkIDs removes the work_order_fk edge to WorkOrder by ids.
func (ou *OrganizationUpdate) RemoveWorkOrderFkIDs(ids ...int) *OrganizationUpdate {
	ou.mutation.RemoveWorkOrderFkIDs(ids...)
	return ou
}

// RemoveWorkOrderFk removes work_order_fk edges to WorkOrder.
func (ou *OrganizationUpdate) RemoveWorkOrderFk(w ...*WorkOrder) *OrganizationUpdate {
	ids := make([]int, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return ou.RemoveWorkOrderFkIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ou *OrganizationUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	ou.defaults()
	if len(ou.hooks) == 0 {
		if err = ou.check(); err != nil {
			return 0, err
		}
		affected, err = ou.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*OrganizationMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ou.check(); err != nil {
				return 0, err
			}
			ou.mutation = mutation
			affected, err = ou.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ou.hooks) - 1; i >= 0; i-- {
			mut = ou.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ou.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ou *OrganizationUpdate) SaveX(ctx context.Context) int {
	affected, err := ou.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ou *OrganizationUpdate) Exec(ctx context.Context) error {
	_, err := ou.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ou *OrganizationUpdate) ExecX(ctx context.Context) {
	if err := ou.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ou *OrganizationUpdate) defaults() {
	if _, ok := ou.mutation.UpdateTime(); !ok {
		v := organization.UpdateDefaultUpdateTime()
		ou.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ou *OrganizationUpdate) check() error {
	if v, ok := ou.mutation.Name(); ok {
		if err := organization.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (ou *OrganizationUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   organization.Table,
			Columns: organization.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: organization.FieldID,
			},
		},
	}
	if ps := ou.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ou.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: organization.FieldUpdateTime,
		})
	}
	if value, ok := ou.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: organization.FieldName,
		})
	}
	if value, ok := ou.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: organization.FieldDescription,
		})
	}
	if ou.mutation.UserFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ou.mutation.RemovedUserFkIDs(); len(nodes) > 0 && !ou.mutation.UserFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ou.mutation.UserFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ou.mutation.WorkOrderFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ou.mutation.RemovedWorkOrderFkIDs(); len(nodes) > 0 && !ou.mutation.WorkOrderFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ou.mutation.WorkOrderFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ou.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{organization.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// OrganizationUpdateOne is the builder for updating a single Organization entity.
type OrganizationUpdateOne struct {
	config
	hooks    []Hook
	mutation *OrganizationMutation
}

// SetName sets the name field.
func (ouo *OrganizationUpdateOne) SetName(s string) *OrganizationUpdateOne {
	ouo.mutation.SetName(s)
	return ouo
}

// SetDescription sets the description field.
func (ouo *OrganizationUpdateOne) SetDescription(s string) *OrganizationUpdateOne {
	ouo.mutation.SetDescription(s)
	return ouo
}

// AddUserFkIDs adds the user_fk edge to User by ids.
func (ouo *OrganizationUpdateOne) AddUserFkIDs(ids ...int) *OrganizationUpdateOne {
	ouo.mutation.AddUserFkIDs(ids...)
	return ouo
}

// AddUserFk adds the user_fk edges to User.
func (ouo *OrganizationUpdateOne) AddUserFk(u ...*User) *OrganizationUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ouo.AddUserFkIDs(ids...)
}

// AddWorkOrderFkIDs adds the work_order_fk edge to WorkOrder by ids.
func (ouo *OrganizationUpdateOne) AddWorkOrderFkIDs(ids ...int) *OrganizationUpdateOne {
	ouo.mutation.AddWorkOrderFkIDs(ids...)
	return ouo
}

// AddWorkOrderFk adds the work_order_fk edges to WorkOrder.
func (ouo *OrganizationUpdateOne) AddWorkOrderFk(w ...*WorkOrder) *OrganizationUpdateOne {
	ids := make([]int, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return ouo.AddWorkOrderFkIDs(ids...)
}

// Mutation returns the OrganizationMutation object of the builder.
func (ouo *OrganizationUpdateOne) Mutation() *OrganizationMutation {
	return ouo.mutation
}

// ClearUserFk clears all "user_fk" edges to type User.
func (ouo *OrganizationUpdateOne) ClearUserFk() *OrganizationUpdateOne {
	ouo.mutation.ClearUserFk()
	return ouo
}

// RemoveUserFkIDs removes the user_fk edge to User by ids.
func (ouo *OrganizationUpdateOne) RemoveUserFkIDs(ids ...int) *OrganizationUpdateOne {
	ouo.mutation.RemoveUserFkIDs(ids...)
	return ouo
}

// RemoveUserFk removes user_fk edges to User.
func (ouo *OrganizationUpdateOne) RemoveUserFk(u ...*User) *OrganizationUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ouo.RemoveUserFkIDs(ids...)
}

// ClearWorkOrderFk clears all "work_order_fk" edges to type WorkOrder.
func (ouo *OrganizationUpdateOne) ClearWorkOrderFk() *OrganizationUpdateOne {
	ouo.mutation.ClearWorkOrderFk()
	return ouo
}

// RemoveWorkOrderFkIDs removes the work_order_fk edge to WorkOrder by ids.
func (ouo *OrganizationUpdateOne) RemoveWorkOrderFkIDs(ids ...int) *OrganizationUpdateOne {
	ouo.mutation.RemoveWorkOrderFkIDs(ids...)
	return ouo
}

// RemoveWorkOrderFk removes work_order_fk edges to WorkOrder.
func (ouo *OrganizationUpdateOne) RemoveWorkOrderFk(w ...*WorkOrder) *OrganizationUpdateOne {
	ids := make([]int, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return ouo.RemoveWorkOrderFkIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (ouo *OrganizationUpdateOne) Save(ctx context.Context) (*Organization, error) {
	var (
		err  error
		node *Organization
	)
	ouo.defaults()
	if len(ouo.hooks) == 0 {
		if err = ouo.check(); err != nil {
			return nil, err
		}
		node, err = ouo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*OrganizationMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ouo.check(); err != nil {
				return nil, err
			}
			ouo.mutation = mutation
			node, err = ouo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ouo.hooks) - 1; i >= 0; i-- {
			mut = ouo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ouo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ouo *OrganizationUpdateOne) SaveX(ctx context.Context) *Organization {
	node, err := ouo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ouo *OrganizationUpdateOne) Exec(ctx context.Context) error {
	_, err := ouo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ouo *OrganizationUpdateOne) ExecX(ctx context.Context) {
	if err := ouo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ouo *OrganizationUpdateOne) defaults() {
	if _, ok := ouo.mutation.UpdateTime(); !ok {
		v := organization.UpdateDefaultUpdateTime()
		ouo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ouo *OrganizationUpdateOne) check() error {
	if v, ok := ouo.mutation.Name(); ok {
		if err := organization.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (ouo *OrganizationUpdateOne) sqlSave(ctx context.Context) (_node *Organization, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   organization.Table,
			Columns: organization.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: organization.FieldID,
			},
		},
	}
	id, ok := ouo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Organization.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := ouo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: organization.FieldUpdateTime,
		})
	}
	if value, ok := ouo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: organization.FieldName,
		})
	}
	if value, ok := ouo.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: organization.FieldDescription,
		})
	}
	if ouo.mutation.UserFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ouo.mutation.RemovedUserFkIDs(); len(nodes) > 0 && !ouo.mutation.UserFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ouo.mutation.UserFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.UserFkTable,
			Columns: []string{organization.UserFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ouo.mutation.WorkOrderFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ouo.mutation.RemovedWorkOrderFkIDs(); len(nodes) > 0 && !ouo.mutation.WorkOrderFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ouo.mutation.WorkOrderFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   organization.WorkOrderFkTable,
			Columns: []string{organization.WorkOrderFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workorder.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Organization{config: ouo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, ouo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{organization.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
