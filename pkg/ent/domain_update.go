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
	"github.com/facebookincubator/symphony/pkg/ent/kpi"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/tech"
)

// DomainUpdate is the builder for updating Domain entities.
type DomainUpdate struct {
	config
	hooks    []Hook
	mutation *DomainMutation
}

// Where adds a new predicate for the builder.
func (du *DomainUpdate) Where(ps ...predicate.Domain) *DomainUpdate {
	du.mutation.predicates = append(du.mutation.predicates, ps...)
	return du
}

// SetName sets the name field.
func (du *DomainUpdate) SetName(s string) *DomainUpdate {
	du.mutation.SetName(s)
	return du
}

// AddTechdomainIDs adds the techdomain edge to Tech by ids.
func (du *DomainUpdate) AddTechdomainIDs(ids ...int) *DomainUpdate {
	du.mutation.AddTechdomainIDs(ids...)
	return du
}

// AddTechdomain adds the techdomain edges to Tech.
func (du *DomainUpdate) AddTechdomain(t ...*Tech) *DomainUpdate {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return du.AddTechdomainIDs(ids...)
}

// AddKpidomainIDs adds the kpidomain edge to Kpi by ids.
func (du *DomainUpdate) AddKpidomainIDs(ids ...int) *DomainUpdate {
	du.mutation.AddKpidomainIDs(ids...)
	return du
}

// AddKpidomain adds the kpidomain edges to Kpi.
func (du *DomainUpdate) AddKpidomain(k ...*Kpi) *DomainUpdate {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return du.AddKpidomainIDs(ids...)
}

// Mutation returns the DomainMutation object of the builder.
func (du *DomainUpdate) Mutation() *DomainMutation {
	return du.mutation
}

// ClearTechdomain clears all "techdomain" edges to type Tech.
func (du *DomainUpdate) ClearTechdomain() *DomainUpdate {
	du.mutation.ClearTechdomain()
	return du
}

// RemoveTechdomainIDs removes the techdomain edge to Tech by ids.
func (du *DomainUpdate) RemoveTechdomainIDs(ids ...int) *DomainUpdate {
	du.mutation.RemoveTechdomainIDs(ids...)
	return du
}

// RemoveTechdomain removes techdomain edges to Tech.
func (du *DomainUpdate) RemoveTechdomain(t ...*Tech) *DomainUpdate {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return du.RemoveTechdomainIDs(ids...)
}

// ClearKpidomain clears all "kpidomain" edges to type Kpi.
func (du *DomainUpdate) ClearKpidomain() *DomainUpdate {
	du.mutation.ClearKpidomain()
	return du
}

// RemoveKpidomainIDs removes the kpidomain edge to Kpi by ids.
func (du *DomainUpdate) RemoveKpidomainIDs(ids ...int) *DomainUpdate {
	du.mutation.RemoveKpidomainIDs(ids...)
	return du
}

// RemoveKpidomain removes kpidomain edges to Kpi.
func (du *DomainUpdate) RemoveKpidomain(k ...*Kpi) *DomainUpdate {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return du.RemoveKpidomainIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (du *DomainUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	du.defaults()
	if len(du.hooks) == 0 {
		if err = du.check(); err != nil {
			return 0, err
		}
		affected, err = du.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DomainMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = du.check(); err != nil {
				return 0, err
			}
			du.mutation = mutation
			affected, err = du.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(du.hooks) - 1; i >= 0; i-- {
			mut = du.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, du.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (du *DomainUpdate) SaveX(ctx context.Context) int {
	affected, err := du.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (du *DomainUpdate) Exec(ctx context.Context) error {
	_, err := du.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (du *DomainUpdate) ExecX(ctx context.Context) {
	if err := du.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (du *DomainUpdate) defaults() {
	if _, ok := du.mutation.UpdateTime(); !ok {
		v := domain.UpdateDefaultUpdateTime()
		du.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (du *DomainUpdate) check() error {
	if v, ok := du.mutation.Name(); ok {
		if err := domain.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (du *DomainUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   domain.Table,
			Columns: domain.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: domain.FieldID,
			},
		},
	}
	if ps := du.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := du.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: domain.FieldUpdateTime,
		})
	}
	if value, ok := du.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: domain.FieldName,
		})
	}
	if du.mutation.TechdomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
	if nodes := du.mutation.RemovedTechdomainIDs(); len(nodes) > 0 && !du.mutation.TechdomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.TechdomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
	if du.mutation.KpidomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
	if nodes := du.mutation.RemovedKpidomainIDs(); len(nodes) > 0 && !du.mutation.KpidomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.KpidomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
	if n, err = sqlgraph.UpdateNodes(ctx, du.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{domain.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// DomainUpdateOne is the builder for updating a single Domain entity.
type DomainUpdateOne struct {
	config
	hooks    []Hook
	mutation *DomainMutation
}

// SetName sets the name field.
func (duo *DomainUpdateOne) SetName(s string) *DomainUpdateOne {
	duo.mutation.SetName(s)
	return duo
}

// AddTechdomainIDs adds the techdomain edge to Tech by ids.
func (duo *DomainUpdateOne) AddTechdomainIDs(ids ...int) *DomainUpdateOne {
	duo.mutation.AddTechdomainIDs(ids...)
	return duo
}

// AddTechdomain adds the techdomain edges to Tech.
func (duo *DomainUpdateOne) AddTechdomain(t ...*Tech) *DomainUpdateOne {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return duo.AddTechdomainIDs(ids...)
}

// AddKpidomainIDs adds the kpidomain edge to Kpi by ids.
func (duo *DomainUpdateOne) AddKpidomainIDs(ids ...int) *DomainUpdateOne {
	duo.mutation.AddKpidomainIDs(ids...)
	return duo
}

// AddKpidomain adds the kpidomain edges to Kpi.
func (duo *DomainUpdateOne) AddKpidomain(k ...*Kpi) *DomainUpdateOne {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return duo.AddKpidomainIDs(ids...)
}

// Mutation returns the DomainMutation object of the builder.
func (duo *DomainUpdateOne) Mutation() *DomainMutation {
	return duo.mutation
}

// ClearTechdomain clears all "techdomain" edges to type Tech.
func (duo *DomainUpdateOne) ClearTechdomain() *DomainUpdateOne {
	duo.mutation.ClearTechdomain()
	return duo
}

// RemoveTechdomainIDs removes the techdomain edge to Tech by ids.
func (duo *DomainUpdateOne) RemoveTechdomainIDs(ids ...int) *DomainUpdateOne {
	duo.mutation.RemoveTechdomainIDs(ids...)
	return duo
}

// RemoveTechdomain removes techdomain edges to Tech.
func (duo *DomainUpdateOne) RemoveTechdomain(t ...*Tech) *DomainUpdateOne {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return duo.RemoveTechdomainIDs(ids...)
}

// ClearKpidomain clears all "kpidomain" edges to type Kpi.
func (duo *DomainUpdateOne) ClearKpidomain() *DomainUpdateOne {
	duo.mutation.ClearKpidomain()
	return duo
}

// RemoveKpidomainIDs removes the kpidomain edge to Kpi by ids.
func (duo *DomainUpdateOne) RemoveKpidomainIDs(ids ...int) *DomainUpdateOne {
	duo.mutation.RemoveKpidomainIDs(ids...)
	return duo
}

// RemoveKpidomain removes kpidomain edges to Kpi.
func (duo *DomainUpdateOne) RemoveKpidomain(k ...*Kpi) *DomainUpdateOne {
	ids := make([]int, len(k))
	for i := range k {
		ids[i] = k[i].ID
	}
	return duo.RemoveKpidomainIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (duo *DomainUpdateOne) Save(ctx context.Context) (*Domain, error) {
	var (
		err  error
		node *Domain
	)
	duo.defaults()
	if len(duo.hooks) == 0 {
		if err = duo.check(); err != nil {
			return nil, err
		}
		node, err = duo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DomainMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = duo.check(); err != nil {
				return nil, err
			}
			duo.mutation = mutation
			node, err = duo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(duo.hooks) - 1; i >= 0; i-- {
			mut = duo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, duo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (duo *DomainUpdateOne) SaveX(ctx context.Context) *Domain {
	node, err := duo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (duo *DomainUpdateOne) Exec(ctx context.Context) error {
	_, err := duo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (duo *DomainUpdateOne) ExecX(ctx context.Context) {
	if err := duo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (duo *DomainUpdateOne) defaults() {
	if _, ok := duo.mutation.UpdateTime(); !ok {
		v := domain.UpdateDefaultUpdateTime()
		duo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (duo *DomainUpdateOne) check() error {
	if v, ok := duo.mutation.Name(); ok {
		if err := domain.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (duo *DomainUpdateOne) sqlSave(ctx context.Context) (_node *Domain, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   domain.Table,
			Columns: domain.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: domain.FieldID,
			},
		},
	}
	id, ok := duo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Domain.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := duo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: domain.FieldUpdateTime,
		})
	}
	if value, ok := duo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: domain.FieldName,
		})
	}
	if duo.mutation.TechdomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
	if nodes := duo.mutation.RemovedTechdomainIDs(); len(nodes) > 0 && !duo.mutation.TechdomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.TechdomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.TechdomainTable,
			Columns: []string{domain.TechdomainColumn},
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
	if duo.mutation.KpidomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
	if nodes := duo.mutation.RemovedKpidomainIDs(); len(nodes) > 0 && !duo.mutation.KpidomainCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.KpidomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   domain.KpidomainTable,
			Columns: []string{domain.KpidomainColumn},
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
	_node = &Domain{config: duo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, duo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{domain.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
