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
	"github.com/facebookincubator/symphony/pkg/ent/contract"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/upl"
	"github.com/facebookincubator/symphony/pkg/ent/uplitem"
)

// UplUpdate is the builder for updating Upl entities.
type UplUpdate struct {
	config
	hooks    []Hook
	mutation *UplMutation
}

// Where adds a new predicate for the builder.
func (uu *UplUpdate) Where(ps ...predicate.Upl) *UplUpdate {
	uu.mutation.predicates = append(uu.mutation.predicates, ps...)
	return uu
}

// SetName sets the name field.
func (uu *UplUpdate) SetName(s string) *UplUpdate {
	uu.mutation.SetName(s)
	return uu
}

// SetDescription sets the description field.
func (uu *UplUpdate) SetDescription(s string) *UplUpdate {
	uu.mutation.SetDescription(s)
	return uu
}

// SetContractID sets the contract edge to Contract by id.
func (uu *UplUpdate) SetContractID(id int) *UplUpdate {
	uu.mutation.SetContractID(id)
	return uu
}

// SetNillableContractID sets the contract edge to Contract by id if the given value is not nil.
func (uu *UplUpdate) SetNillableContractID(id *int) *UplUpdate {
	if id != nil {
		uu = uu.SetContractID(*id)
	}
	return uu
}

// SetContract sets the contract edge to Contract.
func (uu *UplUpdate) SetContract(c *Contract) *UplUpdate {
	return uu.SetContractID(c.ID)
}

// AddUplItemIDs adds the upl_items edge to UplItem by ids.
func (uu *UplUpdate) AddUplItemIDs(ids ...int) *UplUpdate {
	uu.mutation.AddUplItemIDs(ids...)
	return uu
}

// AddUplItems adds the upl_items edges to UplItem.
func (uu *UplUpdate) AddUplItems(u ...*UplItem) *UplUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uu.AddUplItemIDs(ids...)
}

// Mutation returns the UplMutation object of the builder.
func (uu *UplUpdate) Mutation() *UplMutation {
	return uu.mutation
}

// ClearContract clears the "contract" edge to type Contract.
func (uu *UplUpdate) ClearContract() *UplUpdate {
	uu.mutation.ClearContract()
	return uu
}

// ClearUplItems clears all "upl_items" edges to type UplItem.
func (uu *UplUpdate) ClearUplItems() *UplUpdate {
	uu.mutation.ClearUplItems()
	return uu
}

// RemoveUplItemIDs removes the upl_items edge to UplItem by ids.
func (uu *UplUpdate) RemoveUplItemIDs(ids ...int) *UplUpdate {
	uu.mutation.RemoveUplItemIDs(ids...)
	return uu
}

// RemoveUplItems removes upl_items edges to UplItem.
func (uu *UplUpdate) RemoveUplItems(u ...*UplItem) *UplUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uu.RemoveUplItemIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (uu *UplUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	uu.defaults()
	if len(uu.hooks) == 0 {
		if err = uu.check(); err != nil {
			return 0, err
		}
		affected, err = uu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*UplMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = uu.check(); err != nil {
				return 0, err
			}
			uu.mutation = mutation
			affected, err = uu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(uu.hooks) - 1; i >= 0; i-- {
			mut = uu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, uu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (uu *UplUpdate) SaveX(ctx context.Context) int {
	affected, err := uu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (uu *UplUpdate) Exec(ctx context.Context) error {
	_, err := uu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (uu *UplUpdate) ExecX(ctx context.Context) {
	if err := uu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (uu *UplUpdate) defaults() {
	if _, ok := uu.mutation.UpdateTime(); !ok {
		v := upl.UpdateDefaultUpdateTime()
		uu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (uu *UplUpdate) check() error {
	if v, ok := uu.mutation.Name(); ok {
		if err := upl.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if v, ok := uu.mutation.Description(); ok {
		if err := upl.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf("ent: validator failed for field \"description\": %w", err)}
		}
	}
	return nil
}

func (uu *UplUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   upl.Table,
			Columns: upl.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: upl.FieldID,
			},
		},
	}
	if ps := uu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := uu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: upl.FieldUpdateTime,
		})
	}
	if value, ok := uu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldName,
		})
	}
	if value, ok := uu.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldDescription,
		})
	}
	if uu.mutation.ContractCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   upl.ContractTable,
			Columns: []string{upl.ContractColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: contract.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uu.mutation.ContractIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   upl.ContractTable,
			Columns: []string{upl.ContractColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: contract.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if uu.mutation.UplItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uu.mutation.RemovedUplItemsIDs(); len(nodes) > 0 && !uu.mutation.UplItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uu.mutation.UplItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, uu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{upl.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// UplUpdateOne is the builder for updating a single Upl entity.
type UplUpdateOne struct {
	config
	hooks    []Hook
	mutation *UplMutation
}

// SetName sets the name field.
func (uuo *UplUpdateOne) SetName(s string) *UplUpdateOne {
	uuo.mutation.SetName(s)
	return uuo
}

// SetDescription sets the description field.
func (uuo *UplUpdateOne) SetDescription(s string) *UplUpdateOne {
	uuo.mutation.SetDescription(s)
	return uuo
}

// SetContractID sets the contract edge to Contract by id.
func (uuo *UplUpdateOne) SetContractID(id int) *UplUpdateOne {
	uuo.mutation.SetContractID(id)
	return uuo
}

// SetNillableContractID sets the contract edge to Contract by id if the given value is not nil.
func (uuo *UplUpdateOne) SetNillableContractID(id *int) *UplUpdateOne {
	if id != nil {
		uuo = uuo.SetContractID(*id)
	}
	return uuo
}

// SetContract sets the contract edge to Contract.
func (uuo *UplUpdateOne) SetContract(c *Contract) *UplUpdateOne {
	return uuo.SetContractID(c.ID)
}

// AddUplItemIDs adds the upl_items edge to UplItem by ids.
func (uuo *UplUpdateOne) AddUplItemIDs(ids ...int) *UplUpdateOne {
	uuo.mutation.AddUplItemIDs(ids...)
	return uuo
}

// AddUplItems adds the upl_items edges to UplItem.
func (uuo *UplUpdateOne) AddUplItems(u ...*UplItem) *UplUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uuo.AddUplItemIDs(ids...)
}

// Mutation returns the UplMutation object of the builder.
func (uuo *UplUpdateOne) Mutation() *UplMutation {
	return uuo.mutation
}

// ClearContract clears the "contract" edge to type Contract.
func (uuo *UplUpdateOne) ClearContract() *UplUpdateOne {
	uuo.mutation.ClearContract()
	return uuo
}

// ClearUplItems clears all "upl_items" edges to type UplItem.
func (uuo *UplUpdateOne) ClearUplItems() *UplUpdateOne {
	uuo.mutation.ClearUplItems()
	return uuo
}

// RemoveUplItemIDs removes the upl_items edge to UplItem by ids.
func (uuo *UplUpdateOne) RemoveUplItemIDs(ids ...int) *UplUpdateOne {
	uuo.mutation.RemoveUplItemIDs(ids...)
	return uuo
}

// RemoveUplItems removes upl_items edges to UplItem.
func (uuo *UplUpdateOne) RemoveUplItems(u ...*UplItem) *UplUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uuo.RemoveUplItemIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (uuo *UplUpdateOne) Save(ctx context.Context) (*Upl, error) {
	var (
		err  error
		node *Upl
	)
	uuo.defaults()
	if len(uuo.hooks) == 0 {
		if err = uuo.check(); err != nil {
			return nil, err
		}
		node, err = uuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*UplMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = uuo.check(); err != nil {
				return nil, err
			}
			uuo.mutation = mutation
			node, err = uuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(uuo.hooks) - 1; i >= 0; i-- {
			mut = uuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, uuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (uuo *UplUpdateOne) SaveX(ctx context.Context) *Upl {
	node, err := uuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (uuo *UplUpdateOne) Exec(ctx context.Context) error {
	_, err := uuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (uuo *UplUpdateOne) ExecX(ctx context.Context) {
	if err := uuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (uuo *UplUpdateOne) defaults() {
	if _, ok := uuo.mutation.UpdateTime(); !ok {
		v := upl.UpdateDefaultUpdateTime()
		uuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (uuo *UplUpdateOne) check() error {
	if v, ok := uuo.mutation.Name(); ok {
		if err := upl.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if v, ok := uuo.mutation.Description(); ok {
		if err := upl.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf("ent: validator failed for field \"description\": %w", err)}
		}
	}
	return nil
}

func (uuo *UplUpdateOne) sqlSave(ctx context.Context) (_node *Upl, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   upl.Table,
			Columns: upl.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: upl.FieldID,
			},
		},
	}
	id, ok := uuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Upl.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := uuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: upl.FieldUpdateTime,
		})
	}
	if value, ok := uuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldName,
		})
	}
	if value, ok := uuo.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldDescription,
		})
	}
	if uuo.mutation.ContractCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   upl.ContractTable,
			Columns: []string{upl.ContractColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: contract.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uuo.mutation.ContractIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   upl.ContractTable,
			Columns: []string{upl.ContractColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: contract.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if uuo.mutation.UplItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uuo.mutation.RemovedUplItemsIDs(); len(nodes) > 0 && !uuo.mutation.UplItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uuo.mutation.UplItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   upl.UplItemsTable,
			Columns: []string{upl.UplItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: uplitem.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Upl{config: uuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, uuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{upl.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
