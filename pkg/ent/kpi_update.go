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
	"github.com/facebookincubator/symphony/pkg/ent/domain"
	"github.com/facebookincubator/symphony/pkg/ent/formula"
	"github.com/facebookincubator/symphony/pkg/ent/kpi"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/treshold"
)

// KpiUpdate is the builder for updating Kpi entities.
type KpiUpdate struct {
	config
	hooks    []Hook
	mutation *KpiMutation
}

// Where adds a new predicate for the builder.
func (ku *KpiUpdate) Where(ps ...predicate.Kpi) *KpiUpdate {
	ku.mutation.predicates = append(ku.mutation.predicates, ps...)
	return ku
}

// SetName sets the name field.
func (ku *KpiUpdate) SetName(s string) *KpiUpdate {
	ku.mutation.SetName(s)
	return ku
}

// SetDescription sets the description field.
func (ku *KpiUpdate) SetDescription(s string) *KpiUpdate {
	ku.mutation.SetDescription(s)
	return ku
}

// SetStatus sets the status field.
func (ku *KpiUpdate) SetStatus(b bool) *KpiUpdate {
	ku.mutation.SetStatus(b)
	return ku
}

// SetDomainID sets the domain edge to Domain by id.
func (ku *KpiUpdate) SetDomainID(id int) *KpiUpdate {
	ku.mutation.SetDomainID(id)
	return ku
}

// SetNillableDomainID sets the domain edge to Domain by id if the given value is not nil.
func (ku *KpiUpdate) SetNillableDomainID(id *int) *KpiUpdate {
	if id != nil {
		ku = ku.SetDomainID(*id)
	}
	return ku
}

// SetDomain sets the domain edge to Domain.
func (ku *KpiUpdate) SetDomain(d *Domain) *KpiUpdate {
	return ku.SetDomainID(d.ID)
}

// AddFormulakpiIDs adds the formulakpi edge to Formula by ids.
func (ku *KpiUpdate) AddFormulakpiIDs(ids ...int) *KpiUpdate {
	ku.mutation.AddFormulakpiIDs(ids...)
	return ku
}

// AddFormulakpi adds the formulakpi edges to Formula.
func (ku *KpiUpdate) AddFormulakpi(f ...*Formula) *KpiUpdate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ku.AddFormulakpiIDs(ids...)
}

// SetTresholdkpiID sets the tresholdkpi edge to Treshold by id.
func (ku *KpiUpdate) SetTresholdkpiID(id int) *KpiUpdate {
	ku.mutation.SetTresholdkpiID(id)
	return ku
}

// SetNillableTresholdkpiID sets the tresholdkpi edge to Treshold by id if the given value is not nil.
func (ku *KpiUpdate) SetNillableTresholdkpiID(id *int) *KpiUpdate {
	if id != nil {
		ku = ku.SetTresholdkpiID(*id)
	}
	return ku
}

// SetTresholdkpi sets the tresholdkpi edge to Treshold.
func (ku *KpiUpdate) SetTresholdkpi(t *Treshold) *KpiUpdate {
	return ku.SetTresholdkpiID(t.ID)
}

// Mutation returns the KpiMutation object of the builder.
func (ku *KpiUpdate) Mutation() *KpiMutation {
	return ku.mutation
}

// ClearDomain clears the "domain" edge to type Domain.
func (ku *KpiUpdate) ClearDomain() *KpiUpdate {
	ku.mutation.ClearDomain()
	return ku
}

// ClearFormulakpi clears all "formulakpi" edges to type Formula.
func (ku *KpiUpdate) ClearFormulakpi() *KpiUpdate {
	ku.mutation.ClearFormulakpi()
	return ku
}

// RemoveFormulakpiIDs removes the formulakpi edge to Formula by ids.
func (ku *KpiUpdate) RemoveFormulakpiIDs(ids ...int) *KpiUpdate {
	ku.mutation.RemoveFormulakpiIDs(ids...)
	return ku
}

// RemoveFormulakpi removes formulakpi edges to Formula.
func (ku *KpiUpdate) RemoveFormulakpi(f ...*Formula) *KpiUpdate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ku.RemoveFormulakpiIDs(ids...)
}

// ClearTresholdkpi clears the "tresholdkpi" edge to type Treshold.
func (ku *KpiUpdate) ClearTresholdkpi() *KpiUpdate {
	ku.mutation.ClearTresholdkpi()
	return ku
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ku *KpiUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	ku.defaults()
	if len(ku.hooks) == 0 {
		if err = ku.check(); err != nil {
			return 0, err
		}
		affected, err = ku.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KpiMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ku.check(); err != nil {
				return 0, err
			}
			ku.mutation = mutation
			affected, err = ku.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ku.hooks) - 1; i >= 0; i-- {
			mut = ku.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ku.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ku *KpiUpdate) SaveX(ctx context.Context) int {
	affected, err := ku.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ku *KpiUpdate) Exec(ctx context.Context) error {
	_, err := ku.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ku *KpiUpdate) ExecX(ctx context.Context) {
	if err := ku.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ku *KpiUpdate) defaults() {
	if _, ok := ku.mutation.UpdateTime(); !ok {
		v := kpi.UpdateDefaultUpdateTime()
		ku.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ku *KpiUpdate) check() error {
	if v, ok := ku.mutation.Name(); ok {
		if err := kpi.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if v, ok := ku.mutation.Description(); ok {
		if err := kpi.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf("ent: validator failed for field \"description\": %w", err)}
		}
	}
	return nil
}

func (ku *KpiUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kpi.Table,
			Columns: kpi.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kpi.FieldID,
			},
		},
	}
	if ps := ku.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ku.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kpi.FieldUpdateTime,
		})
	}
	if value, ok := ku.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kpi.FieldName,
		})
	}
	if value, ok := ku.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kpi.FieldDescription,
		})
	}
	if value, ok := ku.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: kpi.FieldStatus,
		})
	}
	if ku.mutation.DomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kpi.DomainTable,
			Columns: []string{kpi.DomainColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: domain.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ku.mutation.DomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kpi.DomainTable,
			Columns: []string{kpi.DomainColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: domain.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ku.mutation.FormulakpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ku.mutation.RemovedFormulakpiIDs(); len(nodes) > 0 && !ku.mutation.FormulakpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ku.mutation.FormulakpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ku.mutation.TresholdkpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2O,
			Inverse: false,
			Table:   kpi.TresholdkpiTable,
			Columns: []string{kpi.TresholdkpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: treshold.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ku.mutation.TresholdkpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2O,
			Inverse: false,
			Table:   kpi.TresholdkpiTable,
			Columns: []string{kpi.TresholdkpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: treshold.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ku.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kpi.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// KpiUpdateOne is the builder for updating a single Kpi entity.
type KpiUpdateOne struct {
	config
	hooks    []Hook
	mutation *KpiMutation
}

// SetName sets the name field.
func (kuo *KpiUpdateOne) SetName(s string) *KpiUpdateOne {
	kuo.mutation.SetName(s)
	return kuo
}

// SetDescription sets the description field.
func (kuo *KpiUpdateOne) SetDescription(s string) *KpiUpdateOne {
	kuo.mutation.SetDescription(s)
	return kuo
}

// SetStatus sets the status field.
func (kuo *KpiUpdateOne) SetStatus(b bool) *KpiUpdateOne {
	kuo.mutation.SetStatus(b)
	return kuo
}

// SetDomainID sets the domain edge to Domain by id.
func (kuo *KpiUpdateOne) SetDomainID(id int) *KpiUpdateOne {
	kuo.mutation.SetDomainID(id)
	return kuo
}

// SetNillableDomainID sets the domain edge to Domain by id if the given value is not nil.
func (kuo *KpiUpdateOne) SetNillableDomainID(id *int) *KpiUpdateOne {
	if id != nil {
		kuo = kuo.SetDomainID(*id)
	}
	return kuo
}

// SetDomain sets the domain edge to Domain.
func (kuo *KpiUpdateOne) SetDomain(d *Domain) *KpiUpdateOne {
	return kuo.SetDomainID(d.ID)
}

// AddFormulakpiIDs adds the formulakpi edge to Formula by ids.
func (kuo *KpiUpdateOne) AddFormulakpiIDs(ids ...int) *KpiUpdateOne {
	kuo.mutation.AddFormulakpiIDs(ids...)
	return kuo
}

// AddFormulakpi adds the formulakpi edges to Formula.
func (kuo *KpiUpdateOne) AddFormulakpi(f ...*Formula) *KpiUpdateOne {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return kuo.AddFormulakpiIDs(ids...)
}

// SetTresholdkpiID sets the tresholdkpi edge to Treshold by id.
func (kuo *KpiUpdateOne) SetTresholdkpiID(id int) *KpiUpdateOne {
	kuo.mutation.SetTresholdkpiID(id)
	return kuo
}

// SetNillableTresholdkpiID sets the tresholdkpi edge to Treshold by id if the given value is not nil.
func (kuo *KpiUpdateOne) SetNillableTresholdkpiID(id *int) *KpiUpdateOne {
	if id != nil {
		kuo = kuo.SetTresholdkpiID(*id)
	}
	return kuo
}

// SetTresholdkpi sets the tresholdkpi edge to Treshold.
func (kuo *KpiUpdateOne) SetTresholdkpi(t *Treshold) *KpiUpdateOne {
	return kuo.SetTresholdkpiID(t.ID)
}

// Mutation returns the KpiMutation object of the builder.
func (kuo *KpiUpdateOne) Mutation() *KpiMutation {
	return kuo.mutation
}

// ClearDomain clears the "domain" edge to type Domain.
func (kuo *KpiUpdateOne) ClearDomain() *KpiUpdateOne {
	kuo.mutation.ClearDomain()
	return kuo
}

// ClearFormulakpi clears all "formulakpi" edges to type Formula.
func (kuo *KpiUpdateOne) ClearFormulakpi() *KpiUpdateOne {
	kuo.mutation.ClearFormulakpi()
	return kuo
}

// RemoveFormulakpiIDs removes the formulakpi edge to Formula by ids.
func (kuo *KpiUpdateOne) RemoveFormulakpiIDs(ids ...int) *KpiUpdateOne {
	kuo.mutation.RemoveFormulakpiIDs(ids...)
	return kuo
}

// RemoveFormulakpi removes formulakpi edges to Formula.
func (kuo *KpiUpdateOne) RemoveFormulakpi(f ...*Formula) *KpiUpdateOne {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return kuo.RemoveFormulakpiIDs(ids...)
}

// ClearTresholdkpi clears the "tresholdkpi" edge to type Treshold.
func (kuo *KpiUpdateOne) ClearTresholdkpi() *KpiUpdateOne {
	kuo.mutation.ClearTresholdkpi()
	return kuo
}

// Save executes the query and returns the updated entity.
func (kuo *KpiUpdateOne) Save(ctx context.Context) (*Kpi, error) {
	var (
		err  error
		node *Kpi
	)
	kuo.defaults()
	if len(kuo.hooks) == 0 {
		if err = kuo.check(); err != nil {
			return nil, err
		}
		node, err = kuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KpiMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = kuo.check(); err != nil {
				return nil, err
			}
			kuo.mutation = mutation
			node, err = kuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(kuo.hooks) - 1; i >= 0; i-- {
			mut = kuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, kuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (kuo *KpiUpdateOne) SaveX(ctx context.Context) *Kpi {
	node, err := kuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (kuo *KpiUpdateOne) Exec(ctx context.Context) error {
	_, err := kuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (kuo *KpiUpdateOne) ExecX(ctx context.Context) {
	if err := kuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (kuo *KpiUpdateOne) defaults() {
	if _, ok := kuo.mutation.UpdateTime(); !ok {
		v := kpi.UpdateDefaultUpdateTime()
		kuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (kuo *KpiUpdateOne) check() error {
	if v, ok := kuo.mutation.Name(); ok {
		if err := kpi.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if v, ok := kuo.mutation.Description(); ok {
		if err := kpi.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf("ent: validator failed for field \"description\": %w", err)}
		}
	}
	return nil
}

func (kuo *KpiUpdateOne) sqlSave(ctx context.Context) (_node *Kpi, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kpi.Table,
			Columns: kpi.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kpi.FieldID,
			},
		},
	}
	id, ok := kuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Kpi.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := kuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kpi.FieldUpdateTime,
		})
	}
	if value, ok := kuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kpi.FieldName,
		})
	}
	if value, ok := kuo.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kpi.FieldDescription,
		})
	}
	if value, ok := kuo.mutation.Status(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: kpi.FieldStatus,
		})
	}
	if kuo.mutation.DomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kpi.DomainTable,
			Columns: []string{kpi.DomainColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: domain.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kuo.mutation.DomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kpi.DomainTable,
			Columns: []string{kpi.DomainColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: domain.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if kuo.mutation.FormulakpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kuo.mutation.RemovedFormulakpiIDs(); len(nodes) > 0 && !kuo.mutation.FormulakpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kuo.mutation.FormulakpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   kpi.FormulakpiTable,
			Columns: []string{kpi.FormulakpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: formula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if kuo.mutation.TresholdkpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2O,
			Inverse: false,
			Table:   kpi.TresholdkpiTable,
			Columns: []string{kpi.TresholdkpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: treshold.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := kuo.mutation.TresholdkpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2O,
			Inverse: false,
			Table:   kpi.TresholdkpiTable,
			Columns: []string{kpi.TresholdkpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: treshold.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Kpi{config: kuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, kuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kpi.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
