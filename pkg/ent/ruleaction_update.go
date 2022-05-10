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
	"github.com/facebookincubator/symphony/pkg/ent/action"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/reconciliationrule"
	"github.com/facebookincubator/symphony/pkg/ent/ruleaction"
	"github.com/facebookincubator/symphony/pkg/ent/ruleactiontemplate"
)

// RuleActionUpdate is the builder for updating RuleAction entities.
type RuleActionUpdate struct {
	config
	hooks    []Hook
	mutation *RuleActionMutation
}

// Where adds a new predicate for the builder.
func (rau *RuleActionUpdate) Where(ps ...predicate.RuleAction) *RuleActionUpdate {
	rau.mutation.predicates = append(rau.mutation.predicates, ps...)
	return rau
}

// SetOperation sets the operation field.
func (rau *RuleActionUpdate) SetOperation(r ruleaction.Operation) *RuleActionUpdate {
	rau.mutation.SetOperation(r)
	return rau
}

// SetReconciliationruleID sets the reconciliationrule edge to ReconciliationRule by id.
func (rau *RuleActionUpdate) SetReconciliationruleID(id int) *RuleActionUpdate {
	rau.mutation.SetReconciliationruleID(id)
	return rau
}

// SetNillableReconciliationruleID sets the reconciliationrule edge to ReconciliationRule by id if the given value is not nil.
func (rau *RuleActionUpdate) SetNillableReconciliationruleID(id *int) *RuleActionUpdate {
	if id != nil {
		rau = rau.SetReconciliationruleID(*id)
	}
	return rau
}

// SetReconciliationrule sets the reconciliationrule edge to ReconciliationRule.
func (rau *RuleActionUpdate) SetReconciliationrule(r *ReconciliationRule) *RuleActionUpdate {
	return rau.SetReconciliationruleID(r.ID)
}

// SetRuleactiontemplateID sets the ruleactiontemplate edge to RuleActionTemplate by id.
func (rau *RuleActionUpdate) SetRuleactiontemplateID(id int) *RuleActionUpdate {
	rau.mutation.SetRuleactiontemplateID(id)
	return rau
}

// SetNillableRuleactiontemplateID sets the ruleactiontemplate edge to RuleActionTemplate by id if the given value is not nil.
func (rau *RuleActionUpdate) SetNillableRuleactiontemplateID(id *int) *RuleActionUpdate {
	if id != nil {
		rau = rau.SetRuleactiontemplateID(*id)
	}
	return rau
}

// SetRuleactiontemplate sets the ruleactiontemplate edge to RuleActionTemplate.
func (rau *RuleActionUpdate) SetRuleactiontemplate(r *RuleActionTemplate) *RuleActionUpdate {
	return rau.SetRuleactiontemplateID(r.ID)
}

// AddRuleActionIDs adds the rule_action edge to Action by ids.
func (rau *RuleActionUpdate) AddRuleActionIDs(ids ...int) *RuleActionUpdate {
	rau.mutation.AddRuleActionIDs(ids...)
	return rau
}

// AddRuleAction adds the rule_action edges to Action.
func (rau *RuleActionUpdate) AddRuleAction(a ...*Action) *RuleActionUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return rau.AddRuleActionIDs(ids...)
}

// Mutation returns the RuleActionMutation object of the builder.
func (rau *RuleActionUpdate) Mutation() *RuleActionMutation {
	return rau.mutation
}

// ClearReconciliationrule clears the "reconciliationrule" edge to type ReconciliationRule.
func (rau *RuleActionUpdate) ClearReconciliationrule() *RuleActionUpdate {
	rau.mutation.ClearReconciliationrule()
	return rau
}

// ClearRuleactiontemplate clears the "ruleactiontemplate" edge to type RuleActionTemplate.
func (rau *RuleActionUpdate) ClearRuleactiontemplate() *RuleActionUpdate {
	rau.mutation.ClearRuleactiontemplate()
	return rau
}

// ClearRuleAction clears all "rule_action" edges to type Action.
func (rau *RuleActionUpdate) ClearRuleAction() *RuleActionUpdate {
	rau.mutation.ClearRuleAction()
	return rau
}

// RemoveRuleActionIDs removes the rule_action edge to Action by ids.
func (rau *RuleActionUpdate) RemoveRuleActionIDs(ids ...int) *RuleActionUpdate {
	rau.mutation.RemoveRuleActionIDs(ids...)
	return rau
}

// RemoveRuleAction removes rule_action edges to Action.
func (rau *RuleActionUpdate) RemoveRuleAction(a ...*Action) *RuleActionUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return rau.RemoveRuleActionIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (rau *RuleActionUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	rau.defaults()
	if len(rau.hooks) == 0 {
		if err = rau.check(); err != nil {
			return 0, err
		}
		affected, err = rau.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*RuleActionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rau.check(); err != nil {
				return 0, err
			}
			rau.mutation = mutation
			affected, err = rau.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(rau.hooks) - 1; i >= 0; i-- {
			mut = rau.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rau.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (rau *RuleActionUpdate) SaveX(ctx context.Context) int {
	affected, err := rau.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (rau *RuleActionUpdate) Exec(ctx context.Context) error {
	_, err := rau.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rau *RuleActionUpdate) ExecX(ctx context.Context) {
	if err := rau.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rau *RuleActionUpdate) defaults() {
	if _, ok := rau.mutation.UpdateTime(); !ok {
		v := ruleaction.UpdateDefaultUpdateTime()
		rau.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rau *RuleActionUpdate) check() error {
	if v, ok := rau.mutation.Operation(); ok {
		if err := ruleaction.OperationValidator(v); err != nil {
			return &ValidationError{Name: "operation", err: fmt.Errorf("ent: validator failed for field \"operation\": %w", err)}
		}
	}
	return nil
}

func (rau *RuleActionUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   ruleaction.Table,
			Columns: ruleaction.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: ruleaction.FieldID,
			},
		},
	}
	if ps := rau.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := rau.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: ruleaction.FieldUpdateTime,
		})
	}
	if value, ok := rau.mutation.Operation(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: ruleaction.FieldOperation,
		})
	}
	if rau.mutation.ReconciliationruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.ReconciliationruleTable,
			Columns: []string{ruleaction.ReconciliationruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: reconciliationrule.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rau.mutation.ReconciliationruleIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.ReconciliationruleTable,
			Columns: []string{ruleaction.ReconciliationruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: reconciliationrule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rau.mutation.RuleactiontemplateCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.RuleactiontemplateTable,
			Columns: []string{ruleaction.RuleactiontemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: ruleactiontemplate.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rau.mutation.RuleactiontemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.RuleactiontemplateTable,
			Columns: []string{ruleaction.RuleactiontemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: ruleactiontemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rau.mutation.RuleActionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rau.mutation.RemovedRuleActionIDs(); len(nodes) > 0 && !rau.mutation.RuleActionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rau.mutation.RuleActionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, rau.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{ruleaction.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// RuleActionUpdateOne is the builder for updating a single RuleAction entity.
type RuleActionUpdateOne struct {
	config
	hooks    []Hook
	mutation *RuleActionMutation
}

// SetOperation sets the operation field.
func (rauo *RuleActionUpdateOne) SetOperation(r ruleaction.Operation) *RuleActionUpdateOne {
	rauo.mutation.SetOperation(r)
	return rauo
}

// SetReconciliationruleID sets the reconciliationrule edge to ReconciliationRule by id.
func (rauo *RuleActionUpdateOne) SetReconciliationruleID(id int) *RuleActionUpdateOne {
	rauo.mutation.SetReconciliationruleID(id)
	return rauo
}

// SetNillableReconciliationruleID sets the reconciliationrule edge to ReconciliationRule by id if the given value is not nil.
func (rauo *RuleActionUpdateOne) SetNillableReconciliationruleID(id *int) *RuleActionUpdateOne {
	if id != nil {
		rauo = rauo.SetReconciliationruleID(*id)
	}
	return rauo
}

// SetReconciliationrule sets the reconciliationrule edge to ReconciliationRule.
func (rauo *RuleActionUpdateOne) SetReconciliationrule(r *ReconciliationRule) *RuleActionUpdateOne {
	return rauo.SetReconciliationruleID(r.ID)
}

// SetRuleactiontemplateID sets the ruleactiontemplate edge to RuleActionTemplate by id.
func (rauo *RuleActionUpdateOne) SetRuleactiontemplateID(id int) *RuleActionUpdateOne {
	rauo.mutation.SetRuleactiontemplateID(id)
	return rauo
}

// SetNillableRuleactiontemplateID sets the ruleactiontemplate edge to RuleActionTemplate by id if the given value is not nil.
func (rauo *RuleActionUpdateOne) SetNillableRuleactiontemplateID(id *int) *RuleActionUpdateOne {
	if id != nil {
		rauo = rauo.SetRuleactiontemplateID(*id)
	}
	return rauo
}

// SetRuleactiontemplate sets the ruleactiontemplate edge to RuleActionTemplate.
func (rauo *RuleActionUpdateOne) SetRuleactiontemplate(r *RuleActionTemplate) *RuleActionUpdateOne {
	return rauo.SetRuleactiontemplateID(r.ID)
}

// AddRuleActionIDs adds the rule_action edge to Action by ids.
func (rauo *RuleActionUpdateOne) AddRuleActionIDs(ids ...int) *RuleActionUpdateOne {
	rauo.mutation.AddRuleActionIDs(ids...)
	return rauo
}

// AddRuleAction adds the rule_action edges to Action.
func (rauo *RuleActionUpdateOne) AddRuleAction(a ...*Action) *RuleActionUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return rauo.AddRuleActionIDs(ids...)
}

// Mutation returns the RuleActionMutation object of the builder.
func (rauo *RuleActionUpdateOne) Mutation() *RuleActionMutation {
	return rauo.mutation
}

// ClearReconciliationrule clears the "reconciliationrule" edge to type ReconciliationRule.
func (rauo *RuleActionUpdateOne) ClearReconciliationrule() *RuleActionUpdateOne {
	rauo.mutation.ClearReconciliationrule()
	return rauo
}

// ClearRuleactiontemplate clears the "ruleactiontemplate" edge to type RuleActionTemplate.
func (rauo *RuleActionUpdateOne) ClearRuleactiontemplate() *RuleActionUpdateOne {
	rauo.mutation.ClearRuleactiontemplate()
	return rauo
}

// ClearRuleAction clears all "rule_action" edges to type Action.
func (rauo *RuleActionUpdateOne) ClearRuleAction() *RuleActionUpdateOne {
	rauo.mutation.ClearRuleAction()
	return rauo
}

// RemoveRuleActionIDs removes the rule_action edge to Action by ids.
func (rauo *RuleActionUpdateOne) RemoveRuleActionIDs(ids ...int) *RuleActionUpdateOne {
	rauo.mutation.RemoveRuleActionIDs(ids...)
	return rauo
}

// RemoveRuleAction removes rule_action edges to Action.
func (rauo *RuleActionUpdateOne) RemoveRuleAction(a ...*Action) *RuleActionUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return rauo.RemoveRuleActionIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (rauo *RuleActionUpdateOne) Save(ctx context.Context) (*RuleAction, error) {
	var (
		err  error
		node *RuleAction
	)
	rauo.defaults()
	if len(rauo.hooks) == 0 {
		if err = rauo.check(); err != nil {
			return nil, err
		}
		node, err = rauo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*RuleActionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rauo.check(); err != nil {
				return nil, err
			}
			rauo.mutation = mutation
			node, err = rauo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rauo.hooks) - 1; i >= 0; i-- {
			mut = rauo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rauo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (rauo *RuleActionUpdateOne) SaveX(ctx context.Context) *RuleAction {
	node, err := rauo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (rauo *RuleActionUpdateOne) Exec(ctx context.Context) error {
	_, err := rauo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rauo *RuleActionUpdateOne) ExecX(ctx context.Context) {
	if err := rauo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rauo *RuleActionUpdateOne) defaults() {
	if _, ok := rauo.mutation.UpdateTime(); !ok {
		v := ruleaction.UpdateDefaultUpdateTime()
		rauo.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rauo *RuleActionUpdateOne) check() error {
	if v, ok := rauo.mutation.Operation(); ok {
		if err := ruleaction.OperationValidator(v); err != nil {
			return &ValidationError{Name: "operation", err: fmt.Errorf("ent: validator failed for field \"operation\": %w", err)}
		}
	}
	return nil
}

func (rauo *RuleActionUpdateOne) sqlSave(ctx context.Context) (_node *RuleAction, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   ruleaction.Table,
			Columns: ruleaction.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: ruleaction.FieldID,
			},
		},
	}
	id, ok := rauo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing RuleAction.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := rauo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: ruleaction.FieldUpdateTime,
		})
	}
	if value, ok := rauo.mutation.Operation(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: ruleaction.FieldOperation,
		})
	}
	if rauo.mutation.ReconciliationruleCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.ReconciliationruleTable,
			Columns: []string{ruleaction.ReconciliationruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: reconciliationrule.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rauo.mutation.ReconciliationruleIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.ReconciliationruleTable,
			Columns: []string{ruleaction.ReconciliationruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: reconciliationrule.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rauo.mutation.RuleactiontemplateCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.RuleactiontemplateTable,
			Columns: []string{ruleaction.RuleactiontemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: ruleactiontemplate.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rauo.mutation.RuleactiontemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   ruleaction.RuleactiontemplateTable,
			Columns: []string{ruleaction.RuleactiontemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: ruleactiontemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rauo.mutation.RuleActionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rauo.mutation.RemovedRuleActionIDs(); len(nodes) > 0 && !rauo.mutation.RuleActionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rauo.mutation.RuleActionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   ruleaction.RuleActionTable,
			Columns: []string{ruleaction.RuleActionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: action.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &RuleAction{config: rauo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, rauo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{ruleaction.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
