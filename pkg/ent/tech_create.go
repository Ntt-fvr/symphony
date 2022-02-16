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
	"github.com/facebookincubator/symphony/pkg/ent/domain"
	"github.com/facebookincubator/symphony/pkg/ent/formula"
	"github.com/facebookincubator/symphony/pkg/ent/tech"
)

// TechCreate is the builder for creating a Tech entity.
type TechCreate struct {
	config
	mutation *TechMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (tc *TechCreate) SetCreateTime(t time.Time) *TechCreate {
	tc.mutation.SetCreateTime(t)
	return tc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (tc *TechCreate) SetNillableCreateTime(t *time.Time) *TechCreate {
	if t != nil {
		tc.SetCreateTime(*t)
	}
	return tc
}

// SetUpdateTime sets the update_time field.
func (tc *TechCreate) SetUpdateTime(t time.Time) *TechCreate {
	tc.mutation.SetUpdateTime(t)
	return tc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (tc *TechCreate) SetNillableUpdateTime(t *time.Time) *TechCreate {
	if t != nil {
		tc.SetUpdateTime(*t)
	}
	return tc
}

// SetName sets the name field.
func (tc *TechCreate) SetName(s string) *TechCreate {
	tc.mutation.SetName(s)
	return tc
}

// SetDomainID sets the domain edge to Domain by id.
func (tc *TechCreate) SetDomainID(id int) *TechCreate {
	tc.mutation.SetDomainID(id)
	return tc
}

// SetNillableDomainID sets the domain edge to Domain by id if the given value is not nil.
func (tc *TechCreate) SetNillableDomainID(id *int) *TechCreate {
	if id != nil {
		tc = tc.SetDomainID(*id)
	}
	return tc
}

// SetDomain sets the domain edge to Domain.
func (tc *TechCreate) SetDomain(d *Domain) *TechCreate {
	return tc.SetDomainID(d.ID)
}

// AddFormulatechIDs adds the formulatech edge to Formula by ids.
func (tc *TechCreate) AddFormulatechIDs(ids ...int) *TechCreate {
	tc.mutation.AddFormulatechIDs(ids...)
	return tc
}

// AddFormulatech adds the formulatech edges to Formula.
func (tc *TechCreate) AddFormulatech(f ...*Formula) *TechCreate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return tc.AddFormulatechIDs(ids...)
}

// Mutation returns the TechMutation object of the builder.
func (tc *TechCreate) Mutation() *TechMutation {
	return tc.mutation
}

// Save creates the Tech in the database.
func (tc *TechCreate) Save(ctx context.Context) (*Tech, error) {
	var (
		err  error
		node *Tech
	)
	tc.defaults()
	if len(tc.hooks) == 0 {
		if err = tc.check(); err != nil {
			return nil, err
		}
		node, err = tc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*TechMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = tc.check(); err != nil {
				return nil, err
			}
			tc.mutation = mutation
			node, err = tc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(tc.hooks) - 1; i >= 0; i-- {
			mut = tc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, tc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (tc *TechCreate) SaveX(ctx context.Context) *Tech {
	v, err := tc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (tc *TechCreate) defaults() {
	if _, ok := tc.mutation.CreateTime(); !ok {
		v := tech.DefaultCreateTime()
		tc.mutation.SetCreateTime(v)
	}
	if _, ok := tc.mutation.UpdateTime(); !ok {
		v := tech.DefaultUpdateTime()
		tc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (tc *TechCreate) check() error {
	if _, ok := tc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := tc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := tc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := tc.mutation.Name(); ok {
		if err := tech.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (tc *TechCreate) sqlSave(ctx context.Context) (*Tech, error) {
	_node, _spec := tc.createSpec()
	if err := sqlgraph.CreateNode(ctx, tc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (tc *TechCreate) createSpec() (*Tech, *sqlgraph.CreateSpec) {
	var (
		_node = &Tech{config: tc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: tech.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: tech.FieldID,
			},
		}
	)
	if value, ok := tc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: tech.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := tc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: tech.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := tc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: tech.FieldName,
		})
		_node.Name = value
	}
	if nodes := tc.mutation.DomainIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   tech.DomainTable,
			Columns: []string{tech.DomainColumn},
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := tc.mutation.FormulatechIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   tech.FormulatechTable,
			Columns: []string{tech.FormulatechColumn},
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// TechCreateBulk is the builder for creating a bulk of Tech entities.
type TechCreateBulk struct {
	config
	builders []*TechCreate
}

// Save creates the Tech entities in the database.
func (tcb *TechCreateBulk) Save(ctx context.Context) ([]*Tech, error) {
	specs := make([]*sqlgraph.CreateSpec, len(tcb.builders))
	nodes := make([]*Tech, len(tcb.builders))
	mutators := make([]Mutator, len(tcb.builders))
	for i := range tcb.builders {
		func(i int, root context.Context) {
			builder := tcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*TechMutation)
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
					_, err = mutators[i+1].Mutate(root, tcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, tcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, tcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (tcb *TechCreateBulk) SaveX(ctx context.Context) []*Tech {
	v, err := tcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}