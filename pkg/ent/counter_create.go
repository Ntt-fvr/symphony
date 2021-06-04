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
	"github.com/facebookincubator/symphony/pkg/ent/counter"
	"github.com/facebookincubator/symphony/pkg/ent/counterfamily"
	"github.com/facebookincubator/symphony/pkg/ent/countervendorformula"
)

// CounterCreate is the builder for creating a Counter entity.
type CounterCreate struct {
	config
	mutation *CounterMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (cc *CounterCreate) SetCreateTime(t time.Time) *CounterCreate {
	cc.mutation.SetCreateTime(t)
	return cc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (cc *CounterCreate) SetNillableCreateTime(t *time.Time) *CounterCreate {
	if t != nil {
		cc.SetCreateTime(*t)
	}
	return cc
}

// SetUpdateTime sets the update_time field.
func (cc *CounterCreate) SetUpdateTime(t time.Time) *CounterCreate {
	cc.mutation.SetUpdateTime(t)
	return cc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (cc *CounterCreate) SetNillableUpdateTime(t *time.Time) *CounterCreate {
	if t != nil {
		cc.SetUpdateTime(*t)
	}
	return cc
}

// SetName sets the name field.
func (cc *CounterCreate) SetName(s string) *CounterCreate {
	cc.mutation.SetName(s)
	return cc
}

// SetExternalId sets the externalId field.
func (cc *CounterCreate) SetExternalId(s string) *CounterCreate {
	cc.mutation.SetExternalId(s)
	return cc
}

// SetCounterfamilyID sets the counterfamily edge to CounterFamily by id.
func (cc *CounterCreate) SetCounterfamilyID(id int) *CounterCreate {
	cc.mutation.SetCounterfamilyID(id)
	return cc
}

// SetNillableCounterfamilyID sets the counterfamily edge to CounterFamily by id if the given value is not nil.
func (cc *CounterCreate) SetNillableCounterfamilyID(id *int) *CounterCreate {
	if id != nil {
		cc = cc.SetCounterfamilyID(*id)
	}
	return cc
}

// SetCounterfamily sets the counterfamily edge to CounterFamily.
func (cc *CounterCreate) SetCounterfamily(c *CounterFamily) *CounterCreate {
	return cc.SetCounterfamilyID(c.ID)
}

// AddCounterFkIDs adds the counter_fk edge to CounterVendorFormula by ids.
func (cc *CounterCreate) AddCounterFkIDs(ids ...int) *CounterCreate {
	cc.mutation.AddCounterFkIDs(ids...)
	return cc
}

// AddCounterFk adds the counter_fk edges to CounterVendorFormula.
func (cc *CounterCreate) AddCounterFk(c ...*CounterVendorFormula) *CounterCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return cc.AddCounterFkIDs(ids...)
}

// Mutation returns the CounterMutation object of the builder.
func (cc *CounterCreate) Mutation() *CounterMutation {
	return cc.mutation
}

// Save creates the Counter in the database.
func (cc *CounterCreate) Save(ctx context.Context) (*Counter, error) {
	var (
		err  error
		node *Counter
	)
	cc.defaults()
	if len(cc.hooks) == 0 {
		if err = cc.check(); err != nil {
			return nil, err
		}
		node, err = cc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*CounterMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = cc.check(); err != nil {
				return nil, err
			}
			cc.mutation = mutation
			node, err = cc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(cc.hooks) - 1; i >= 0; i-- {
			mut = cc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, cc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (cc *CounterCreate) SaveX(ctx context.Context) *Counter {
	v, err := cc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (cc *CounterCreate) defaults() {
	if _, ok := cc.mutation.CreateTime(); !ok {
		v := counter.DefaultCreateTime()
		cc.mutation.SetCreateTime(v)
	}
	if _, ok := cc.mutation.UpdateTime(); !ok {
		v := counter.DefaultUpdateTime()
		cc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (cc *CounterCreate) check() error {
	if _, ok := cc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := cc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := cc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := cc.mutation.Name(); ok {
		if err := counter.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := cc.mutation.ExternalId(); !ok {
		return &ValidationError{Name: "externalId", err: errors.New("ent: missing required field \"externalId\"")}
	}
	return nil
}

func (cc *CounterCreate) sqlSave(ctx context.Context) (*Counter, error) {
	_node, _spec := cc.createSpec()
	if err := sqlgraph.CreateNode(ctx, cc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (cc *CounterCreate) createSpec() (*Counter, *sqlgraph.CreateSpec) {
	var (
		_node = &Counter{config: cc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: counter.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: counter.FieldID,
			},
		}
	)
	if value, ok := cc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: counter.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := cc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: counter.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := cc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: counter.FieldName,
		})
		_node.Name = value
	}
	if value, ok := cc.mutation.ExternalId(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: counter.FieldExternalId,
		})
		_node.ExternalId = value
	}
	if nodes := cc.mutation.CounterfamilyIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   counter.CounterfamilyTable,
			Columns: []string{counter.CounterfamilyColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: counterfamily.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := cc.mutation.CounterFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   counter.CounterFkTable,
			Columns: []string{counter.CounterFkColumn},
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// CounterCreateBulk is the builder for creating a bulk of Counter entities.
type CounterCreateBulk struct {
	config
	builders []*CounterCreate
}

// Save creates the Counter entities in the database.
func (ccb *CounterCreateBulk) Save(ctx context.Context) ([]*Counter, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ccb.builders))
	nodes := make([]*Counter, len(ccb.builders))
	mutators := make([]Mutator, len(ccb.builders))
	for i := range ccb.builders {
		func(i int, root context.Context) {
			builder := ccb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*CounterMutation)
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
					_, err = mutators[i+1].Mutate(root, ccb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ccb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ccb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ccb *CounterCreateBulk) SaveX(ctx context.Context) []*Counter {
	v, err := ccb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
