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
	"github.com/facebookincubator/symphony/pkg/ent/countervendorformula"
	"github.com/facebookincubator/symphony/pkg/ent/formula"
	"github.com/facebookincubator/symphony/pkg/ent/kpi"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/tech"
)

// FormulaUpdate is the builder for updating Formula entities.
type FormulaUpdate struct {
	config
	hooks    []Hook
	mutation *FormulaMutation
}

// Where adds a new predicate for the builder.
func (fu *FormulaUpdate) Where(ps ...predicate.Formula) *FormulaUpdate {
	fu.mutation.predicates = append(fu.mutation.predicates, ps...)
	return fu
}

// SetName sets the name field.
func (fu *FormulaUpdate) SetName(s string) *FormulaUpdate {
	fu.mutation.SetName(s)
	return fu
}

// SetActive sets the active field.
func (fu *FormulaUpdate) SetActive(b bool) *FormulaUpdate {
	fu.mutation.SetActive(b)
	return fu
}

// SetTechID sets the tech edge to Tech by id.
func (fu *FormulaUpdate) SetTechID(id int) *FormulaUpdate {
	fu.mutation.SetTechID(id)
	return fu
}

// SetNillableTechID sets the tech edge to Tech by id if the given value is not nil.
func (fu *FormulaUpdate) SetNillableTechID(id *int) *FormulaUpdate {
	if id != nil {
		fu = fu.SetTechID(*id)
	}
	return fu
}

// SetTech sets the tech edge to Tech.
func (fu *FormulaUpdate) SetTech(t *Tech) *FormulaUpdate {
	return fu.SetTechID(t.ID)
}

// SetKpiID sets the kpi edge to Kpi by id.
func (fu *FormulaUpdate) SetKpiID(id int) *FormulaUpdate {
	fu.mutation.SetKpiID(id)
	return fu
}

// SetNillableKpiID sets the kpi edge to Kpi by id if the given value is not nil.
func (fu *FormulaUpdate) SetNillableKpiID(id *int) *FormulaUpdate {
	if id != nil {
		fu = fu.SetKpiID(*id)
	}
	return fu
}

// SetKpi sets the kpi edge to Kpi.
func (fu *FormulaUpdate) SetKpi(k *Kpi) *FormulaUpdate {
	return fu.SetKpiID(k.ID)
}

// AddFormulaFkIDs adds the formula_fk edge to CounterVendorFormula by ids.
func (fu *FormulaUpdate) AddFormulaFkIDs(ids ...int) *FormulaUpdate {
	fu.mutation.AddFormulaFkIDs(ids...)
	return fu
}

// AddFormulaFk adds the formula_fk edges to CounterVendorFormula.
func (fu *FormulaUpdate) AddFormulaFk(c ...*CounterVendorFormula) *FormulaUpdate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return fu.AddFormulaFkIDs(ids...)
}

// Mutation returns the FormulaMutation object of the builder.
func (fu *FormulaUpdate) Mutation() *FormulaMutation {
	return fu.mutation
}

// ClearTech clears the "tech" edge to type Tech.
func (fu *FormulaUpdate) ClearTech() *FormulaUpdate {
	fu.mutation.ClearTech()
	return fu
}

// ClearKpi clears the "kpi" edge to type Kpi.
func (fu *FormulaUpdate) ClearKpi() *FormulaUpdate {
	fu.mutation.ClearKpi()
	return fu
}

// ClearFormulaFk clears all "formula_fk" edges to type CounterVendorFormula.
func (fu *FormulaUpdate) ClearFormulaFk() *FormulaUpdate {
	fu.mutation.ClearFormulaFk()
	return fu
}

// RemoveFormulaFkIDs removes the formula_fk edge to CounterVendorFormula by ids.
func (fu *FormulaUpdate) RemoveFormulaFkIDs(ids ...int) *FormulaUpdate {
	fu.mutation.RemoveFormulaFkIDs(ids...)
	return fu
}

// RemoveFormulaFk removes formula_fk edges to CounterVendorFormula.
func (fu *FormulaUpdate) RemoveFormulaFk(c ...*CounterVendorFormula) *FormulaUpdate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return fu.RemoveFormulaFkIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (fu *FormulaUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	fu.defaults()
	if len(fu.hooks) == 0 {
		if err = fu.check(); err != nil {
			return 0, err
		}
		affected, err = fu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FormulaMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fu.check(); err != nil {
				return 0, err
			}
			fu.mutation = mutation
			affected, err = fu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(fu.hooks) - 1; i >= 0; i-- {
			mut = fu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (fu *FormulaUpdate) SaveX(ctx context.Context) int {
	affected, err := fu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (fu *FormulaUpdate) Exec(ctx context.Context) error {
	_, err := fu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fu *FormulaUpdate) ExecX(ctx context.Context) {
	if err := fu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fu *FormulaUpdate) defaults() {
	if _, ok := fu.mutation.UpdateTime(); !ok {
		v := formula.UpdateDefaultUpdateTime()
		fu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fu *FormulaUpdate) check() error {
	if v, ok := fu.mutation.Name(); ok {
		if err := formula.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fu *FormulaUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   formula.Table,
			Columns: formula.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: formula.FieldID,
			},
		},
	}
	if ps := fu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := fu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: formula.FieldUpdateTime,
		})
	}
	if value, ok := fu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: formula.FieldName,
		})
	}
	if value, ok := fu.mutation.Active(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: formula.FieldActive,
		})
	}
	if fu.mutation.TechCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.TechTable,
			Columns: []string{formula.TechColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: tech.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fu.mutation.TechIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.TechTable,
			Columns: []string{formula.TechColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: tech.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fu.mutation.KpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.KpiTable,
			Columns: []string{formula.KpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kpi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fu.mutation.KpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.KpiTable,
			Columns: []string{formula.KpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kpi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fu.mutation.FormulaFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fu.mutation.RemovedFormulaFkIDs(); len(nodes) > 0 && !fu.mutation.FormulaFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fu.mutation.FormulaFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, fu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{formula.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// FormulaUpdateOne is the builder for updating a single Formula entity.
type FormulaUpdateOne struct {
	config
	hooks    []Hook
	mutation *FormulaMutation
}

// SetName sets the name field.
func (fuo *FormulaUpdateOne) SetName(s string) *FormulaUpdateOne {
	fuo.mutation.SetName(s)
	return fuo
}

// SetActive sets the active field.
func (fuo *FormulaUpdateOne) SetActive(b bool) *FormulaUpdateOne {
	fuo.mutation.SetActive(b)
	return fuo
}

// SetTechID sets the tech edge to Tech by id.
func (fuo *FormulaUpdateOne) SetTechID(id int) *FormulaUpdateOne {
	fuo.mutation.SetTechID(id)
	return fuo
}

// SetNillableTechID sets the tech edge to Tech by id if the given value is not nil.
func (fuo *FormulaUpdateOne) SetNillableTechID(id *int) *FormulaUpdateOne {
	if id != nil {
		fuo = fuo.SetTechID(*id)
	}
	return fuo
}

// SetTech sets the tech edge to Tech.
func (fuo *FormulaUpdateOne) SetTech(t *Tech) *FormulaUpdateOne {
	return fuo.SetTechID(t.ID)
}

// SetKpiID sets the kpi edge to Kpi by id.
func (fuo *FormulaUpdateOne) SetKpiID(id int) *FormulaUpdateOne {
	fuo.mutation.SetKpiID(id)
	return fuo
}

// SetNillableKpiID sets the kpi edge to Kpi by id if the given value is not nil.
func (fuo *FormulaUpdateOne) SetNillableKpiID(id *int) *FormulaUpdateOne {
	if id != nil {
		fuo = fuo.SetKpiID(*id)
	}
	return fuo
}

// SetKpi sets the kpi edge to Kpi.
func (fuo *FormulaUpdateOne) SetKpi(k *Kpi) *FormulaUpdateOne {
	return fuo.SetKpiID(k.ID)
}

// AddFormulaFkIDs adds the formula_fk edge to CounterVendorFormula by ids.
func (fuo *FormulaUpdateOne) AddFormulaFkIDs(ids ...int) *FormulaUpdateOne {
	fuo.mutation.AddFormulaFkIDs(ids...)
	return fuo
}

// AddFormulaFk adds the formula_fk edges to CounterVendorFormula.
func (fuo *FormulaUpdateOne) AddFormulaFk(c ...*CounterVendorFormula) *FormulaUpdateOne {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return fuo.AddFormulaFkIDs(ids...)
}

// Mutation returns the FormulaMutation object of the builder.
func (fuo *FormulaUpdateOne) Mutation() *FormulaMutation {
	return fuo.mutation
}

// ClearTech clears the "tech" edge to type Tech.
func (fuo *FormulaUpdateOne) ClearTech() *FormulaUpdateOne {
	fuo.mutation.ClearTech()
	return fuo
}

// ClearKpi clears the "kpi" edge to type Kpi.
func (fuo *FormulaUpdateOne) ClearKpi() *FormulaUpdateOne {
	fuo.mutation.ClearKpi()
	return fuo
}

// ClearFormulaFk clears all "formula_fk" edges to type CounterVendorFormula.
func (fuo *FormulaUpdateOne) ClearFormulaFk() *FormulaUpdateOne {
	fuo.mutation.ClearFormulaFk()
	return fuo
}

// RemoveFormulaFkIDs removes the formula_fk edge to CounterVendorFormula by ids.
func (fuo *FormulaUpdateOne) RemoveFormulaFkIDs(ids ...int) *FormulaUpdateOne {
	fuo.mutation.RemoveFormulaFkIDs(ids...)
	return fuo
}

// RemoveFormulaFk removes formula_fk edges to CounterVendorFormula.
func (fuo *FormulaUpdateOne) RemoveFormulaFk(c ...*CounterVendorFormula) *FormulaUpdateOne {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return fuo.RemoveFormulaFkIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (fuo *FormulaUpdateOne) Save(ctx context.Context) (*Formula, error) {
	var (
		err  error
		node *Formula
	)
	fuo.defaults()
	if len(fuo.hooks) == 0 {
		if err = fuo.check(); err != nil {
			return nil, err
		}
		node, err = fuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FormulaMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fuo.check(); err != nil {
				return nil, err
			}
			fuo.mutation = mutation
			node, err = fuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fuo.hooks) - 1; i >= 0; i-- {
			mut = fuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (fuo *FormulaUpdateOne) SaveX(ctx context.Context) *Formula {
	node, err := fuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (fuo *FormulaUpdateOne) Exec(ctx context.Context) error {
	_, err := fuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (fuo *FormulaUpdateOne) ExecX(ctx context.Context) {
	if err := fuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (fuo *FormulaUpdateOne) defaults() {
	if _, ok := fuo.mutation.UpdateTime(); !ok {
		v := formula.UpdateDefaultUpdateTime()
		fuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fuo *FormulaUpdateOne) check() error {
	if v, ok := fuo.mutation.Name(); ok {
		if err := formula.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fuo *FormulaUpdateOne) sqlSave(ctx context.Context) (_node *Formula, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   formula.Table,
			Columns: formula.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: formula.FieldID,
			},
		},
	}
	id, ok := fuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Formula.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := fuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: formula.FieldUpdateTime,
		})
	}
	if value, ok := fuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: formula.FieldName,
		})
	}
	if value, ok := fuo.mutation.Active(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: formula.FieldActive,
		})
	}
	if fuo.mutation.TechCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.TechTable,
			Columns: []string{formula.TechColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: tech.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fuo.mutation.TechIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.TechTable,
			Columns: []string{formula.TechColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: tech.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fuo.mutation.KpiCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.KpiTable,
			Columns: []string{formula.KpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kpi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fuo.mutation.KpiIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   formula.KpiTable,
			Columns: []string{formula.KpiColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kpi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if fuo.mutation.FormulaFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fuo.mutation.RemovedFormulaFkIDs(); len(nodes) > 0 && !fuo.mutation.FormulaFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := fuo.mutation.FormulaFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.FormulaFkTable,
			Columns: []string{formula.FormulaFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: countervendorformula.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Formula{config: fuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, fuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{formula.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
