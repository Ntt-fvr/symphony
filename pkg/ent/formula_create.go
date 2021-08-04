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
	"github.com/facebookincubator/symphony/pkg/ent/counterformula"
	"github.com/facebookincubator/symphony/pkg/ent/formula"
	"github.com/facebookincubator/symphony/pkg/ent/kpi"
	"github.com/facebookincubator/symphony/pkg/ent/tech"
)

// FormulaCreate is the builder for creating a Formula entity.
type FormulaCreate struct {
	config
	mutation *FormulaMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (fc *FormulaCreate) SetCreateTime(t time.Time) *FormulaCreate {
	fc.mutation.SetCreateTime(t)
	return fc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fc *FormulaCreate) SetNillableCreateTime(t *time.Time) *FormulaCreate {
	if t != nil {
		fc.SetCreateTime(*t)
	}
	return fc
}

// SetUpdateTime sets the update_time field.
func (fc *FormulaCreate) SetUpdateTime(t time.Time) *FormulaCreate {
	fc.mutation.SetUpdateTime(t)
	return fc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fc *FormulaCreate) SetNillableUpdateTime(t *time.Time) *FormulaCreate {
	if t != nil {
		fc.SetUpdateTime(*t)
	}
	return fc
}

// SetName sets the name field.
func (fc *FormulaCreate) SetName(s string) *FormulaCreate {
	fc.mutation.SetName(s)
	return fc
}

// SetStatus sets the status field.
func (fc *FormulaCreate) SetStatus(b bool) *FormulaCreate {
	fc.mutation.SetStatus(b)
	return fc
}

// SetTechID sets the tech edge to Tech by id.
func (fc *FormulaCreate) SetTechID(id int) *FormulaCreate {
	fc.mutation.SetTechID(id)
	return fc
}

// SetNillableTechID sets the tech edge to Tech by id if the given value is not nil.
func (fc *FormulaCreate) SetNillableTechID(id *int) *FormulaCreate {
	if id != nil {
		fc = fc.SetTechID(*id)
	}
	return fc
}

// SetTech sets the tech edge to Tech.
func (fc *FormulaCreate) SetTech(t *Tech) *FormulaCreate {
	return fc.SetTechID(t.ID)
}

// SetKpiID sets the kpi edge to Kpi by id.
func (fc *FormulaCreate) SetKpiID(id int) *FormulaCreate {
	fc.mutation.SetKpiID(id)
	return fc
}

// SetNillableKpiID sets the kpi edge to Kpi by id if the given value is not nil.
func (fc *FormulaCreate) SetNillableKpiID(id *int) *FormulaCreate {
	if id != nil {
		fc = fc.SetKpiID(*id)
	}
	return fc
}

// SetKpi sets the kpi edge to Kpi.
func (fc *FormulaCreate) SetKpi(k *Kpi) *FormulaCreate {
	return fc.SetKpiID(k.ID)
}

// AddCounterformulaIDs adds the counterformula edge to CounterFormula by ids.
func (fc *FormulaCreate) AddCounterformulaIDs(ids ...int) *FormulaCreate {
	fc.mutation.AddCounterformulaIDs(ids...)
	return fc
}

// AddCounterformula adds the counterformula edges to CounterFormula.
func (fc *FormulaCreate) AddCounterformula(c ...*CounterFormula) *FormulaCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return fc.AddCounterformulaIDs(ids...)
}

// Mutation returns the FormulaMutation object of the builder.
func (fc *FormulaCreate) Mutation() *FormulaMutation {
	return fc.mutation
}

// Save creates the Formula in the database.
func (fc *FormulaCreate) Save(ctx context.Context) (*Formula, error) {
	var (
		err  error
		node *Formula
	)
	fc.defaults()
	if len(fc.hooks) == 0 {
		if err = fc.check(); err != nil {
			return nil, err
		}
		node, err = fc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FormulaMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fc.check(); err != nil {
				return nil, err
			}
			fc.mutation = mutation
			node, err = fc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fc.hooks) - 1; i >= 0; i-- {
			mut = fc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fc *FormulaCreate) SaveX(ctx context.Context) *Formula {
	v, err := fc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (fc *FormulaCreate) defaults() {
	if _, ok := fc.mutation.CreateTime(); !ok {
		v := formula.DefaultCreateTime()
		fc.mutation.SetCreateTime(v)
	}
	if _, ok := fc.mutation.UpdateTime(); !ok {
		v := formula.DefaultUpdateTime()
		fc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fc *FormulaCreate) check() error {
	if _, ok := fc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := fc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := fc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := fc.mutation.Name(); ok {
		if err := formula.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := fc.mutation.Status(); !ok {
		return &ValidationError{Name: "status", err: errors.New("ent: missing required field \"status\"")}
	}
	return nil
}

func (fc *FormulaCreate) sqlSave(ctx context.Context) (*Formula, error) {
	_node, _spec := fc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (fc *FormulaCreate) createSpec() (*Formula, *sqlgraph.CreateSpec) {
	var (
		_node = &Formula{config: fc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: formula.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: formula.FieldID,
			},
		}
	)
	if value, ok := fc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: formula.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := fc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: formula.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := fc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: formula.FieldName,
		})
		_node.Name = value
	}
	if value, ok := fc.mutation.Status(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: formula.FieldStatus,
		})
		_node.Status = value
	}
	if nodes := fc.mutation.TechIDs(); len(nodes) > 0 {
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fc.mutation.KpiIDs(); len(nodes) > 0 {
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fc.mutation.CounterformulaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   formula.CounterformulaTable,
			Columns: []string{formula.CounterformulaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: counterformula.FieldID,
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

// FormulaCreateBulk is the builder for creating a bulk of Formula entities.
type FormulaCreateBulk struct {
	config
	builders []*FormulaCreate
}

// Save creates the Formula entities in the database.
func (fcb *FormulaCreateBulk) Save(ctx context.Context) ([]*Formula, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fcb.builders))
	nodes := make([]*Formula, len(fcb.builders))
	mutators := make([]Mutator, len(fcb.builders))
	for i := range fcb.builders {
		func(i int, root context.Context) {
			builder := fcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*FormulaMutation)
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
					_, err = mutators[i+1].Mutate(root, fcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, fcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, fcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (fcb *FormulaCreateBulk) SaveX(ctx context.Context) []*Formula {
	v, err := fcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
