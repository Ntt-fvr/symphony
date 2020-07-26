// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/actions/core"
	"github.com/facebookincubator/symphony/pkg/ent/actionsrule"
)

// ActionsRuleCreate is the builder for creating a ActionsRule entity.
type ActionsRuleCreate struct {
	config
	mutation *ActionsRuleMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (arc *ActionsRuleCreate) SetCreateTime(t time.Time) *ActionsRuleCreate {
	arc.mutation.SetCreateTime(t)
	return arc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (arc *ActionsRuleCreate) SetNillableCreateTime(t *time.Time) *ActionsRuleCreate {
	if t != nil {
		arc.SetCreateTime(*t)
	}
	return arc
}

// SetUpdateTime sets the update_time field.
func (arc *ActionsRuleCreate) SetUpdateTime(t time.Time) *ActionsRuleCreate {
	arc.mutation.SetUpdateTime(t)
	return arc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (arc *ActionsRuleCreate) SetNillableUpdateTime(t *time.Time) *ActionsRuleCreate {
	if t != nil {
		arc.SetUpdateTime(*t)
	}
	return arc
}

// SetName sets the name field.
func (arc *ActionsRuleCreate) SetName(s string) *ActionsRuleCreate {
	arc.mutation.SetName(s)
	return arc
}

// SetTriggerID sets the triggerID field.
func (arc *ActionsRuleCreate) SetTriggerID(s string) *ActionsRuleCreate {
	arc.mutation.SetTriggerID(s)
	return arc
}

// SetRuleFilters sets the ruleFilters field.
func (arc *ActionsRuleCreate) SetRuleFilters(crf []*core.ActionsRuleFilter) *ActionsRuleCreate {
	arc.mutation.SetRuleFilters(crf)
	return arc
}

// SetRuleActions sets the ruleActions field.
func (arc *ActionsRuleCreate) SetRuleActions(cra []*core.ActionsRuleAction) *ActionsRuleCreate {
	arc.mutation.SetRuleActions(cra)
	return arc
}

// Mutation returns the ActionsRuleMutation object of the builder.
func (arc *ActionsRuleCreate) Mutation() *ActionsRuleMutation {
	return arc.mutation
}

// Save creates the ActionsRule in the database.
func (arc *ActionsRuleCreate) Save(ctx context.Context) (*ActionsRule, error) {
	if err := arc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *ActionsRule
	)
	if len(arc.hooks) == 0 {
		node, err = arc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ActionsRuleMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			arc.mutation = mutation
			node, err = arc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(arc.hooks) - 1; i >= 0; i-- {
			mut = arc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, arc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (arc *ActionsRuleCreate) SaveX(ctx context.Context) *ActionsRule {
	v, err := arc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (arc *ActionsRuleCreate) preSave() error {
	if _, ok := arc.mutation.CreateTime(); !ok {
		v := actionsrule.DefaultCreateTime()
		arc.mutation.SetCreateTime(v)
	}
	if _, ok := arc.mutation.UpdateTime(); !ok {
		v := actionsrule.DefaultUpdateTime()
		arc.mutation.SetUpdateTime(v)
	}
	if _, ok := arc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if _, ok := arc.mutation.TriggerID(); !ok {
		return &ValidationError{Name: "triggerID", err: errors.New("ent: missing required field \"triggerID\"")}
	}
	if _, ok := arc.mutation.RuleFilters(); !ok {
		return &ValidationError{Name: "ruleFilters", err: errors.New("ent: missing required field \"ruleFilters\"")}
	}
	if _, ok := arc.mutation.RuleActions(); !ok {
		return &ValidationError{Name: "ruleActions", err: errors.New("ent: missing required field \"ruleActions\"")}
	}
	return nil
}

func (arc *ActionsRuleCreate) sqlSave(ctx context.Context) (*ActionsRule, error) {
	ar, _spec := arc.createSpec()
	if err := sqlgraph.CreateNode(ctx, arc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	ar.ID = int(id)
	return ar, nil
}

func (arc *ActionsRuleCreate) createSpec() (*ActionsRule, *sqlgraph.CreateSpec) {
	var (
		ar    = &ActionsRule{config: arc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: actionsrule.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: actionsrule.FieldID,
			},
		}
	)
	if value, ok := arc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: actionsrule.FieldCreateTime,
		})
		ar.CreateTime = value
	}
	if value, ok := arc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: actionsrule.FieldUpdateTime,
		})
		ar.UpdateTime = value
	}
	if value, ok := arc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: actionsrule.FieldName,
		})
		ar.Name = value
	}
	if value, ok := arc.mutation.TriggerID(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: actionsrule.FieldTriggerID,
		})
		ar.TriggerID = value
	}
	if value, ok := arc.mutation.RuleFilters(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: actionsrule.FieldRuleFilters,
		})
		ar.RuleFilters = value
	}
	if value, ok := arc.mutation.RuleActions(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: actionsrule.FieldRuleActions,
		})
		ar.RuleActions = value
	}
	return ar, _spec
}

// ActionsRuleCreateBulk is the builder for creating a bulk of ActionsRule entities.
type ActionsRuleCreateBulk struct {
	config
	builders []*ActionsRuleCreate
}

// Save creates the ActionsRule entities in the database.
func (arcb *ActionsRuleCreateBulk) Save(ctx context.Context) ([]*ActionsRule, error) {
	specs := make([]*sqlgraph.CreateSpec, len(arcb.builders))
	nodes := make([]*ActionsRule, len(arcb.builders))
	mutators := make([]Mutator, len(arcb.builders))
	for i := range arcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := arcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*ActionsRuleMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, arcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, arcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(arcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = arcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, arcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (arcb *ActionsRuleCreateBulk) SaveX(ctx context.Context) []*ActionsRule {
	v, err := arcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
