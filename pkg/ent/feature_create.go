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
	"github.com/facebookincubator/symphony/pkg/ent/feature"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/usersgroup"
)

// FeatureCreate is the builder for creating a Feature entity.
type FeatureCreate struct {
	config
	mutation *FeatureMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (fc *FeatureCreate) SetCreateTime(t time.Time) *FeatureCreate {
	fc.mutation.SetCreateTime(t)
	return fc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (fc *FeatureCreate) SetNillableCreateTime(t *time.Time) *FeatureCreate {
	if t != nil {
		fc.SetCreateTime(*t)
	}
	return fc
}

// SetUpdateTime sets the update_time field.
func (fc *FeatureCreate) SetUpdateTime(t time.Time) *FeatureCreate {
	fc.mutation.SetUpdateTime(t)
	return fc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (fc *FeatureCreate) SetNillableUpdateTime(t *time.Time) *FeatureCreate {
	if t != nil {
		fc.SetUpdateTime(*t)
	}
	return fc
}

// SetName sets the name field.
func (fc *FeatureCreate) SetName(s string) *FeatureCreate {
	fc.mutation.SetName(s)
	return fc
}

// SetGlobal sets the global field.
func (fc *FeatureCreate) SetGlobal(b bool) *FeatureCreate {
	fc.mutation.SetGlobal(b)
	return fc
}

// SetNillableGlobal sets the global field if the given value is not nil.
func (fc *FeatureCreate) SetNillableGlobal(b *bool) *FeatureCreate {
	if b != nil {
		fc.SetGlobal(*b)
	}
	return fc
}

// AddUserIDs adds the users edge to User by ids.
func (fc *FeatureCreate) AddUserIDs(ids ...int) *FeatureCreate {
	fc.mutation.AddUserIDs(ids...)
	return fc
}

// AddUsers adds the users edges to User.
func (fc *FeatureCreate) AddUsers(u ...*User) *FeatureCreate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return fc.AddUserIDs(ids...)
}

// AddGroupIDs adds the groups edge to UsersGroup by ids.
func (fc *FeatureCreate) AddGroupIDs(ids ...int) *FeatureCreate {
	fc.mutation.AddGroupIDs(ids...)
	return fc
}

// AddGroups adds the groups edges to UsersGroup.
func (fc *FeatureCreate) AddGroups(u ...*UsersGroup) *FeatureCreate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return fc.AddGroupIDs(ids...)
}

// Mutation returns the FeatureMutation object of the builder.
func (fc *FeatureCreate) Mutation() *FeatureMutation {
	return fc.mutation
}

// Save creates the Feature in the database.
func (fc *FeatureCreate) Save(ctx context.Context) (*Feature, error) {
	var (
		err  error
		node *Feature
	)
	fc.defaults()
	if len(fc.hooks) == 0 {
		if err = fc.check(); err != nil {
			return nil, err
		}
		node, err = fc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FeatureMutation)
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
func (fc *FeatureCreate) SaveX(ctx context.Context) *Feature {
	v, err := fc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (fc *FeatureCreate) defaults() {
	if _, ok := fc.mutation.CreateTime(); !ok {
		v := feature.DefaultCreateTime()
		fc.mutation.SetCreateTime(v)
	}
	if _, ok := fc.mutation.UpdateTime(); !ok {
		v := feature.DefaultUpdateTime()
		fc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (fc *FeatureCreate) check() error {
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
		if err := feature.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	return nil
}

func (fc *FeatureCreate) sqlSave(ctx context.Context) (*Feature, error) {
	f, _spec := fc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	f.ID = int(id)
	return f, nil
}

func (fc *FeatureCreate) createSpec() (*Feature, *sqlgraph.CreateSpec) {
	var (
		f     = &Feature{config: fc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: feature.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: feature.FieldID,
			},
		}
	)
	if value, ok := fc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: feature.FieldCreateTime,
		})
		f.CreateTime = value
	}
	if value, ok := fc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: feature.FieldUpdateTime,
		})
		f.UpdateTime = value
	}
	if value, ok := fc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: feature.FieldName,
		})
		f.Name = value
	}
	if value, ok := fc.mutation.Global(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: feature.FieldGlobal,
		})
		f.Global = value
	}
	if nodes := fc.mutation.UsersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   feature.UsersTable,
			Columns: feature.UsersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := fc.mutation.GroupsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   feature.GroupsTable,
			Columns: feature.GroupsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: usersgroup.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return f, _spec
}

// FeatureCreateBulk is the builder for creating a bulk of Feature entities.
type FeatureCreateBulk struct {
	config
	builders []*FeatureCreate
}

// Save creates the Feature entities in the database.
func (fcb *FeatureCreateBulk) Save(ctx context.Context) ([]*Feature, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fcb.builders))
	nodes := make([]*Feature, len(fcb.builders))
	mutators := make([]Mutator, len(fcb.builders))
	for i := range fcb.builders {
		func(i int, root context.Context) {
			builder := fcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*FeatureMutation)
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
func (fcb *FeatureCreateBulk) SaveX(ctx context.Context) []*Feature {
	v, err := fcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
