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
	"github.com/facebookincubator/symphony/pkg/ent/contract"
	"github.com/facebookincubator/symphony/pkg/ent/upl"
)

// UplCreate is the builder for creating a Upl entity.
type UplCreate struct {
	config
	mutation *UplMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (uc *UplCreate) SetCreateTime(t time.Time) *UplCreate {
	uc.mutation.SetCreateTime(t)
	return uc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (uc *UplCreate) SetNillableCreateTime(t *time.Time) *UplCreate {
	if t != nil {
		uc.SetCreateTime(*t)
	}
	return uc
}

// SetUpdateTime sets the update_time field.
func (uc *UplCreate) SetUpdateTime(t time.Time) *UplCreate {
	uc.mutation.SetUpdateTime(t)
	return uc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (uc *UplCreate) SetNillableUpdateTime(t *time.Time) *UplCreate {
	if t != nil {
		uc.SetUpdateTime(*t)
	}
	return uc
}

// SetName sets the name field.
func (uc *UplCreate) SetName(s string) *UplCreate {
	uc.mutation.SetName(s)
	return uc
}

// SetDescription sets the description field.
func (uc *UplCreate) SetDescription(s string) *UplCreate {
	uc.mutation.SetDescription(s)
	return uc
}

// SetContractID sets the contract edge to Contract by id.
func (uc *UplCreate) SetContractID(id int) *UplCreate {
	uc.mutation.SetContractID(id)
	return uc
}

// SetNillableContractID sets the contract edge to Contract by id if the given value is not nil.
func (uc *UplCreate) SetNillableContractID(id *int) *UplCreate {
	if id != nil {
		uc = uc.SetContractID(*id)
	}
	return uc
}

// SetContract sets the contract edge to Contract.
func (uc *UplCreate) SetContract(c *Contract) *UplCreate {
	return uc.SetContractID(c.ID)
}

// Mutation returns the UplMutation object of the builder.
func (uc *UplCreate) Mutation() *UplMutation {
	return uc.mutation
}

// Save creates the Upl in the database.
func (uc *UplCreate) Save(ctx context.Context) (*Upl, error) {
	var (
		err  error
		node *Upl
	)
	uc.defaults()
	if len(uc.hooks) == 0 {
		if err = uc.check(); err != nil {
			return nil, err
		}
		node, err = uc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*UplMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = uc.check(); err != nil {
				return nil, err
			}
			uc.mutation = mutation
			node, err = uc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(uc.hooks) - 1; i >= 0; i-- {
			mut = uc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, uc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (uc *UplCreate) SaveX(ctx context.Context) *Upl {
	v, err := uc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (uc *UplCreate) defaults() {
	if _, ok := uc.mutation.CreateTime(); !ok {
		v := upl.DefaultCreateTime()
		uc.mutation.SetCreateTime(v)
	}
	if _, ok := uc.mutation.UpdateTime(); !ok {
		v := upl.DefaultUpdateTime()
		uc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (uc *UplCreate) check() error {
	if _, ok := uc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := uc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := uc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := uc.mutation.Name(); ok {
		if err := upl.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := uc.mutation.Description(); !ok {
		return &ValidationError{Name: "description", err: errors.New("ent: missing required field \"description\"")}
	}
	if v, ok := uc.mutation.Description(); ok {
		if err := upl.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf("ent: validator failed for field \"description\": %w", err)}
		}
	}
	return nil
}

func (uc *UplCreate) sqlSave(ctx context.Context) (*Upl, error) {
	_node, _spec := uc.createSpec()
	if err := sqlgraph.CreateNode(ctx, uc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (uc *UplCreate) createSpec() (*Upl, *sqlgraph.CreateSpec) {
	var (
		_node = &Upl{config: uc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: upl.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: upl.FieldID,
			},
		}
	)
	if value, ok := uc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: upl.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := uc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: upl.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := uc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldName,
		})
		_node.Name = value
	}
	if value, ok := uc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: upl.FieldDescription,
		})
		_node.Description = value
	}
	if nodes := uc.mutation.ContractIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   upl.ContractTable,
			Columns: []string{upl.ContractColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: contract.FieldID,
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

// UplCreateBulk is the builder for creating a bulk of Upl entities.
type UplCreateBulk struct {
	config
	builders []*UplCreate
}

// Save creates the Upl entities in the database.
func (ucb *UplCreateBulk) Save(ctx context.Context) ([]*Upl, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ucb.builders))
	nodes := make([]*Upl, len(ucb.builders))
	mutators := make([]Mutator, len(ucb.builders))
	for i := range ucb.builders {
		func(i int, root context.Context) {
			builder := ucb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*UplMutation)
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
					_, err = mutators[i+1].Mutate(root, ucb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ucb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ucb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ucb *UplCreateBulk) SaveX(ctx context.Context) []*Upl {
	v, err := ucb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
