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
	"github.com/facebookincubator/symphony/pkg/ent/eventseverity"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/rule"
)

// EventSeverityUpdate is the builder for updating EventSeverity entities.
type EventSeverityUpdate struct {
	config
	hooks    []Hook
	mutation *EventSeverityMutation
}

// Where adds a new predicate for the builder.
func (esu *EventSeverityUpdate) Where(ps ...predicate.EventSeverity) *EventSeverityUpdate {
	esu.mutation.predicates = append(esu.mutation.predicates, ps...)
	return esu
}

// SetName sets the name field.
func (esu *EventSeverityUpdate) SetName(s string) *EventSeverityUpdate {
	esu.mutation.SetName(s)
	return esu
}

// AddEventseverityruleIDs adds the eventseverityrule edge to Rule by ids.
func (esu *EventSeverityUpdate) AddEventseverityruleIDs(ids ...int) *EventSeverityUpdate {
	esu.mutation.AddEventseverityruleIDs(ids...)
	return esu
}

// AddEventseverityrule adds the eventseverityrule edges to Rule.
func (esu *EventSeverityUpdate) AddEventseverityrule(r ...*Rule) *EventSeverityUpdate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return esu.AddEventseverityruleIDs(ids...)
}

// Mutation returns the EventSeverityMutation object of the builder.
func (esu *EventSeverityUpdate) Mutation() *EventSeverityMutation {
	return esu.mutation
}

// ClearEventseverityrule clears all "eventseverityrule" edges to type Rule.
func (esu *EventSeverityUpdate) ClearEventseverityrule() *EventSeverityUpdate {
	esu.mutation.ClearEventseverityrule()
	return esu
}

// RemoveEventseverityruleIDs removes the eventseverityrule edge to Rule by ids.
func (esu *EventSeverityUpdate) RemoveEventseverityruleIDs(ids ...int) *EventSeverityUpdate {
	esu.mutation.RemoveEventseverityruleIDs(ids...)
	return esu
}

// RemoveEventseverityrule removes eventseverityrule edges to Rule.
func (esu *EventSeverityUpdate) RemoveEventseverityrule(r ...*Rule) *EventSeverityUpdate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return esu.RemoveEventseverityruleIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (esu *EventSeverityUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	esu.defaults()
	if len(esu.hooks) == 0 {
		if err = esu.check(); err != nil {
			return 0, err
		}
		affected, err = esu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*EventSeverityMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = esu.check(); err != nil {
				return 0, err
			}
			esu.mutation = mutation
			affected, err = esu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(esu.hooks) - 1; i >= 0; i-- {
			mut = esu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, esu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (esu *EventSeverityUpdate) SaveX(ctx context.Context) int {
	affected, err := esu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (esu *EventSeverityUpdate) Exec(ctx context.Context) error {
	_, err := esu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (esu *EventSeverityUpdate) ExecX(ctx context.Context) {
	if err := esu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (esu *EventSeverityUpdate) defaults() {
	if _, ok := esu.mutation.UpdateTime(); !ok {
		v := eventseverity.UpdateDefaultUpdateTime()
		esu.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (esu *EventSeverityUpdate) check() error {
	if v, ok := esu.mutation.Name(); ok {
		if err := eventseverity.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (esu *EventSeverityUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   eventseverity.Table,
			Columns: eventseverity.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: eventseverity.FieldID,
			},
		},
	}
	if ps := esu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := esu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: eventseverity.FieldUpdateTime,
		})
	}
	if value, ok := esu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: eventseverity.FieldName,
		})
	}
	if esu.mutation.EventseverityruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := esu.mutation.RemovedEventseverityruleIDs(); len(nodes) > 0 && !esu.mutation.EventseverityruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := esu.mutation.EventseverityruleIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, esu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{eventseverity.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// EventSeverityUpdateOne is the builder for updating a single EventSeverity entity.
type EventSeverityUpdateOne struct {
	config
	hooks    []Hook
	mutation *EventSeverityMutation
}

// SetName sets the name field.
func (esuo *EventSeverityUpdateOne) SetName(s string) *EventSeverityUpdateOne {
	esuo.mutation.SetName(s)
	return esuo
}

// AddEventseverityruleIDs adds the eventseverityrule edge to Rule by ids.
func (esuo *EventSeverityUpdateOne) AddEventseverityruleIDs(ids ...int) *EventSeverityUpdateOne {
	esuo.mutation.AddEventseverityruleIDs(ids...)
	return esuo
}

// AddEventseverityrule adds the eventseverityrule edges to Rule.
func (esuo *EventSeverityUpdateOne) AddEventseverityrule(r ...*Rule) *EventSeverityUpdateOne {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return esuo.AddEventseverityruleIDs(ids...)
}

// Mutation returns the EventSeverityMutation object of the builder.
func (esuo *EventSeverityUpdateOne) Mutation() *EventSeverityMutation {
	return esuo.mutation
}

// ClearEventseverityrule clears all "eventseverityrule" edges to type Rule.
func (esuo *EventSeverityUpdateOne) ClearEventseverityrule() *EventSeverityUpdateOne {
	esuo.mutation.ClearEventseverityrule()
	return esuo
}

// RemoveEventseverityruleIDs removes the eventseverityrule edge to Rule by ids.
func (esuo *EventSeverityUpdateOne) RemoveEventseverityruleIDs(ids ...int) *EventSeverityUpdateOne {
	esuo.mutation.RemoveEventseverityruleIDs(ids...)
	return esuo
}

// RemoveEventseverityrule removes eventseverityrule edges to Rule.
func (esuo *EventSeverityUpdateOne) RemoveEventseverityrule(r ...*Rule) *EventSeverityUpdateOne {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return esuo.RemoveEventseverityruleIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (esuo *EventSeverityUpdateOne) Save(ctx context.Context) (*EventSeverity, error) {
	var (
		err  error
		node *EventSeverity
	)
	esuo.defaults()
	if len(esuo.hooks) == 0 {
		if err = esuo.check(); err != nil {
			return nil, err
		}
		node, err = esuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*EventSeverityMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = esuo.check(); err != nil {
				return nil, err
			}
			esuo.mutation = mutation
			node, err = esuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(esuo.hooks) - 1; i >= 0; i-- {
			mut = esuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, esuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (esuo *EventSeverityUpdateOne) SaveX(ctx context.Context) *EventSeverity {
	node, err := esuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (esuo *EventSeverityUpdateOne) Exec(ctx context.Context) error {
	_, err := esuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (esuo *EventSeverityUpdateOne) ExecX(ctx context.Context) {
	if err := esuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (esuo *EventSeverityUpdateOne) defaults() {
	if _, ok := esuo.mutation.UpdateTime(); !ok {
		v := eventseverity.UpdateDefaultUpdateTime()
		esuo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (esuo *EventSeverityUpdateOne) check() error {
	if v, ok := esuo.mutation.Name(); ok {
		if err := eventseverity.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (esuo *EventSeverityUpdateOne) sqlSave(ctx context.Context) (_node *EventSeverity, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   eventseverity.Table,
			Columns: eventseverity.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: eventseverity.FieldID,
			},
		},
	}
	id, ok := esuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing EventSeverity.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := esuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: eventseverity.FieldUpdateTime,
		})
	}
	if value, ok := esuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: eventseverity.FieldName,
		})
	}
	if esuo.mutation.EventseverityruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := esuo.mutation.RemovedEventseverityruleIDs(); len(nodes) > 0 && !esuo.mutation.EventseverityruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := esuo.mutation.EventseverityruleIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventseverity.EventseverityruleTable,
			Columns: []string{eventseverity.EventseverityruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &EventSeverity{config: esuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, esuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{eventseverity.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
