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
	"github.com/facebookincubator/symphony/pkg/ent/eventseverity"
	"github.com/facebookincubator/symphony/pkg/ent/rule"
	"github.com/facebookincubator/symphony/pkg/ent/rulelimit"
	"github.com/facebookincubator/symphony/pkg/ent/ruletype"
	"github.com/facebookincubator/symphony/pkg/ent/treshold"
)

// RuleCreate is the builder for creating a Rule entity.
type RuleCreate struct {
	config
	mutation *RuleMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (rc *RuleCreate) SetCreateTime(t time.Time) *RuleCreate {
	rc.mutation.SetCreateTime(t)
	return rc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (rc *RuleCreate) SetNillableCreateTime(t *time.Time) *RuleCreate {
	if t != nil {
		rc.SetCreateTime(*t)
	}
	return rc
}

// SetUpdateTime sets the update_time field.
func (rc *RuleCreate) SetUpdateTime(t time.Time) *RuleCreate {
	rc.mutation.SetUpdateTime(t)
	return rc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (rc *RuleCreate) SetNillableUpdateTime(t *time.Time) *RuleCreate {
	if t != nil {
		rc.SetUpdateTime(*t)
	}
	return rc
}

// SetName sets the name field.
func (rc *RuleCreate) SetName(s string) *RuleCreate {
	rc.mutation.SetName(s)
	return rc
}

// SetGracePeriod sets the gracePeriod field.
func (rc *RuleCreate) SetGracePeriod(i int) *RuleCreate {
	rc.mutation.SetGracePeriod(i)
	return rc
}

// SetStartDateTime sets the startDateTime field.
func (rc *RuleCreate) SetStartDateTime(t time.Time) *RuleCreate {
	rc.mutation.SetStartDateTime(t)
	return rc
}

// SetEndDateTime sets the endDateTime field.
func (rc *RuleCreate) SetEndDateTime(t time.Time) *RuleCreate {
	rc.mutation.SetEndDateTime(t)
	return rc
}

// SetEventTypeName sets the eventTypeName field.
func (rc *RuleCreate) SetEventTypeName(s string) *RuleCreate {
	rc.mutation.SetEventTypeName(s)
	return rc
}

// SetNillableEventTypeName sets the eventTypeName field if the given value is not nil.
func (rc *RuleCreate) SetNillableEventTypeName(s *string) *RuleCreate {
	if s != nil {
		rc.SetEventTypeName(*s)
	}
	return rc
}

// SetSpecificProblem sets the specificProblem field.
func (rc *RuleCreate) SetSpecificProblem(s string) *RuleCreate {
	rc.mutation.SetSpecificProblem(s)
	return rc
}

// SetNillableSpecificProblem sets the specificProblem field if the given value is not nil.
func (rc *RuleCreate) SetNillableSpecificProblem(s *string) *RuleCreate {
	if s != nil {
		rc.SetSpecificProblem(*s)
	}
	return rc
}

// SetAdditionalInfo sets the additionalInfo field.
func (rc *RuleCreate) SetAdditionalInfo(s string) *RuleCreate {
	rc.mutation.SetAdditionalInfo(s)
	return rc
}

// SetNillableAdditionalInfo sets the additionalInfo field if the given value is not nil.
func (rc *RuleCreate) SetNillableAdditionalInfo(s *string) *RuleCreate {
	if s != nil {
		rc.SetAdditionalInfo(*s)
	}
	return rc
}

// SetRuletypeID sets the ruletype edge to RuleType by id.
func (rc *RuleCreate) SetRuletypeID(id int) *RuleCreate {
	rc.mutation.SetRuletypeID(id)
	return rc
}

// SetNillableRuletypeID sets the ruletype edge to RuleType by id if the given value is not nil.
func (rc *RuleCreate) SetNillableRuletypeID(id *int) *RuleCreate {
	if id != nil {
		rc = rc.SetRuletypeID(*id)
	}
	return rc
}

// SetRuletype sets the ruletype edge to RuleType.
func (rc *RuleCreate) SetRuletype(r *RuleType) *RuleCreate {
	return rc.SetRuletypeID(r.ID)
}

// SetEventseverityID sets the eventseverity edge to EventSeverity by id.
func (rc *RuleCreate) SetEventseverityID(id int) *RuleCreate {
	rc.mutation.SetEventseverityID(id)
	return rc
}

// SetNillableEventseverityID sets the eventseverity edge to EventSeverity by id if the given value is not nil.
func (rc *RuleCreate) SetNillableEventseverityID(id *int) *RuleCreate {
	if id != nil {
		rc = rc.SetEventseverityID(*id)
	}
	return rc
}

// SetEventseverity sets the eventseverity edge to EventSeverity.
func (rc *RuleCreate) SetEventseverity(e *EventSeverity) *RuleCreate {
	return rc.SetEventseverityID(e.ID)
}

// SetTresholdID sets the treshold edge to Treshold by id.
func (rc *RuleCreate) SetTresholdID(id int) *RuleCreate {
	rc.mutation.SetTresholdID(id)
	return rc
}

// SetNillableTresholdID sets the treshold edge to Treshold by id if the given value is not nil.
func (rc *RuleCreate) SetNillableTresholdID(id *int) *RuleCreate {
	if id != nil {
		rc = rc.SetTresholdID(*id)
	}
	return rc
}

// SetTreshold sets the treshold edge to Treshold.
func (rc *RuleCreate) SetTreshold(t *Treshold) *RuleCreate {
	return rc.SetTresholdID(t.ID)
}

// AddRulelimitruleIDs adds the rulelimitrule edge to RuleLimit by ids.
func (rc *RuleCreate) AddRulelimitruleIDs(ids ...int) *RuleCreate {
	rc.mutation.AddRulelimitruleIDs(ids...)
	return rc
}

// AddRulelimitrule adds the rulelimitrule edges to RuleLimit.
func (rc *RuleCreate) AddRulelimitrule(r ...*RuleLimit) *RuleCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rc.AddRulelimitruleIDs(ids...)
}

// Mutation returns the RuleMutation object of the builder.
func (rc *RuleCreate) Mutation() *RuleMutation {
	return rc.mutation
}

// Save creates the Rule in the database.
func (rc *RuleCreate) Save(ctx context.Context) (*Rule, error) {
	var (
		err  error
		node *Rule
	)
	rc.defaults()
	if len(rc.hooks) == 0 {
		if err = rc.check(); err != nil {
			return nil, err
		}
		node, err = rc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*RuleMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rc.check(); err != nil {
				return nil, err
			}
			rc.mutation = mutation
			node, err = rc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(rc.hooks) - 1; i >= 0; i-- {
			mut = rc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, rc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rc *RuleCreate) SaveX(ctx context.Context) *Rule {
	v, err := rc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (rc *RuleCreate) defaults() {
	if _, ok := rc.mutation.CreateTime(); !ok {
		v := rule.DefaultCreateTime()
		rc.mutation.SetCreateTime(v)
	}
	if _, ok := rc.mutation.UpdateTime(); !ok {
		v := rule.DefaultUpdateTime()
		rc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rc *RuleCreate) check() error {
	if _, ok := rc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := rc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := rc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := rc.mutation.Name(); ok {
		if err := rule.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := rc.mutation.GracePeriod(); !ok {
		return &ValidationError{Name: "gracePeriod", err: errors.New("ent: missing required field \"gracePeriod\"")}
	}
	if _, ok := rc.mutation.StartDateTime(); !ok {
		return &ValidationError{Name: "startDateTime", err: errors.New("ent: missing required field \"startDateTime\"")}
	}
	if _, ok := rc.mutation.EndDateTime(); !ok {
		return &ValidationError{Name: "endDateTime", err: errors.New("ent: missing required field \"endDateTime\"")}
	}
	return nil
}

func (rc *RuleCreate) sqlSave(ctx context.Context) (*Rule, error) {
	_node, _spec := rc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rc *RuleCreate) createSpec() (*Rule, *sqlgraph.CreateSpec) {
	var (
		_node = &Rule{config: rc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: rule.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: rule.FieldID,
			},
		}
	)
	if value, ok := rc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: rule.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := rc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: rule.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := rc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: rule.FieldName,
		})
		_node.Name = value
	}
	if value, ok := rc.mutation.GracePeriod(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: rule.FieldGracePeriod,
		})
		_node.GracePeriod = value
	}
	if value, ok := rc.mutation.StartDateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: rule.FieldStartDateTime,
		})
		_node.StartDateTime = value
	}
	if value, ok := rc.mutation.EndDateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: rule.FieldEndDateTime,
		})
		_node.EndDateTime = value
	}
	if value, ok := rc.mutation.EventTypeName(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: rule.FieldEventTypeName,
		})
		_node.EventTypeName = &value
	}
	if value, ok := rc.mutation.SpecificProblem(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: rule.FieldSpecificProblem,
		})
		_node.SpecificProblem = &value
	}
	if value, ok := rc.mutation.AdditionalInfo(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: rule.FieldAdditionalInfo,
		})
		_node.AdditionalInfo = &value
	}
	if nodes := rc.mutation.RuletypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   rule.RuletypeTable,
			Columns: []string{rule.RuletypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: ruletype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.EventseverityIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   rule.EventseverityTable,
			Columns: []string{rule.EventseverityColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: eventseverity.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.TresholdIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   rule.TresholdTable,
			Columns: []string{rule.TresholdColumn},
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.RulelimitruleIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   rule.RulelimitruleTable,
			Columns: []string{rule.RulelimitruleColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: rulelimit.FieldID,
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

// RuleCreateBulk is the builder for creating a bulk of Rule entities.
type RuleCreateBulk struct {
	config
	builders []*RuleCreate
}

// Save creates the Rule entities in the database.
func (rcb *RuleCreateBulk) Save(ctx context.Context) ([]*Rule, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rcb.builders))
	nodes := make([]*Rule, len(rcb.builders))
	mutators := make([]Mutator, len(rcb.builders))
	for i := range rcb.builders {
		func(i int, root context.Context) {
			builder := rcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*RuleMutation)
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
					_, err = mutators[i+1].Mutate(root, rcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, rcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (rcb *RuleCreateBulk) SaveX(ctx context.Context) []*Rule {
	v, err := rcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
