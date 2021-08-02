// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/kqi"
	"github.com/facebookincubator/symphony/pkg/ent/kqitarget"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// KqiTargetUpdate is the builder for updating KqiTarget entities.
type KqiTargetUpdate struct {
	config
	hooks    []Hook
	mutation *KqiTargetMutation
}

// Where adds a new predicate for the builder.
func (ktu *KqiTargetUpdate) Where(ps ...predicate.KqiTarget) *KqiTargetUpdate {
	ktu.mutation.predicates = append(ktu.mutation.predicates, ps...)
	return ktu
}

// SetComparator sets the comparator field.
func (ktu *KqiTargetUpdate) SetComparator(f float64) *KqiTargetUpdate {
	ktu.mutation.ResetComparator()
	ktu.mutation.SetComparator(f)
	return ktu
}

// AddComparator adds f to comparator.
func (ktu *KqiTargetUpdate) AddComparator(f float64) *KqiTargetUpdate {
	ktu.mutation.AddComparator(f)
	return ktu
}

// SetReferenceValue sets the referenceValue field.
func (ktu *KqiTargetUpdate) SetReferenceValue(f float64) *KqiTargetUpdate {
	ktu.mutation.ResetReferenceValue()
	ktu.mutation.SetReferenceValue(f)
	return ktu
}

// AddReferenceValue adds f to referenceValue.
func (ktu *KqiTargetUpdate) AddReferenceValue(f float64) *KqiTargetUpdate {
	ktu.mutation.AddReferenceValue(f)
	return ktu
}

// SetWarningComparator sets the warningComparator field.
func (ktu *KqiTargetUpdate) SetWarningComparator(f float64) *KqiTargetUpdate {
	ktu.mutation.ResetWarningComparator()
	ktu.mutation.SetWarningComparator(f)
	return ktu
}

// AddWarningComparator adds f to warningComparator.
func (ktu *KqiTargetUpdate) AddWarningComparator(f float64) *KqiTargetUpdate {
	ktu.mutation.AddWarningComparator(f)
	return ktu
}

// SetFrame sets the frame field.
func (ktu *KqiTargetUpdate) SetFrame(f float64) *KqiTargetUpdate {
	ktu.mutation.ResetFrame()
	ktu.mutation.SetFrame(f)
	return ktu
}

// AddFrame adds f to frame.
func (ktu *KqiTargetUpdate) AddFrame(f float64) *KqiTargetUpdate {
	ktu.mutation.AddFrame(f)
	return ktu
}

// SetAlowedValidation sets the alowedValidation field.
func (ktu *KqiTargetUpdate) SetAlowedValidation(f float64) *KqiTargetUpdate {
	ktu.mutation.ResetAlowedValidation()
	ktu.mutation.SetAlowedValidation(f)
	return ktu
}

// AddAlowedValidation adds f to alowedValidation.
func (ktu *KqiTargetUpdate) AddAlowedValidation(f float64) *KqiTargetUpdate {
	ktu.mutation.AddAlowedValidation(f)
	return ktu
}

// SetInitTime sets the initTime field.
func (ktu *KqiTargetUpdate) SetInitTime(t time.Time) *KqiTargetUpdate {
	ktu.mutation.SetInitTime(t)
	return ktu
}

// SetEndTime sets the endTime field.
func (ktu *KqiTargetUpdate) SetEndTime(t time.Time) *KqiTargetUpdate {
	ktu.mutation.SetEndTime(t)
	return ktu
}

// SetImpact sets the impact field.
func (ktu *KqiTargetUpdate) SetImpact(s string) *KqiTargetUpdate {
	ktu.mutation.SetImpact(s)
	return ktu
}

// SetActive sets the active field.
func (ktu *KqiTargetUpdate) SetActive(b bool) *KqiTargetUpdate {
	ktu.mutation.SetActive(b)
	return ktu
}

// SetKqiTargetFkID sets the kqiTargetFk edge to Kqi by id.
func (ktu *KqiTargetUpdate) SetKqiTargetFkID(id int) *KqiTargetUpdate {
	ktu.mutation.SetKqiTargetFkID(id)
	return ktu
}

// SetNillableKqiTargetFkID sets the kqiTargetFk edge to Kqi by id if the given value is not nil.
func (ktu *KqiTargetUpdate) SetNillableKqiTargetFkID(id *int) *KqiTargetUpdate {
	if id != nil {
		ktu = ktu.SetKqiTargetFkID(*id)
	}
	return ktu
}

// SetKqiTargetFk sets the kqiTargetFk edge to Kqi.
func (ktu *KqiTargetUpdate) SetKqiTargetFk(k *Kqi) *KqiTargetUpdate {
	return ktu.SetKqiTargetFkID(k.ID)
}

// Mutation returns the KqiTargetMutation object of the builder.
func (ktu *KqiTargetUpdate) Mutation() *KqiTargetMutation {
	return ktu.mutation
}

// ClearKqiTargetFk clears the "kqiTargetFk" edge to type Kqi.
func (ktu *KqiTargetUpdate) ClearKqiTargetFk() *KqiTargetUpdate {
	ktu.mutation.ClearKqiTargetFk()
	return ktu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ktu *KqiTargetUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	ktu.defaults()
	if len(ktu.hooks) == 0 {
		affected, err = ktu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KqiTargetMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ktu.mutation = mutation
			affected, err = ktu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ktu.hooks) - 1; i >= 0; i-- {
			mut = ktu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ktu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ktu *KqiTargetUpdate) SaveX(ctx context.Context) int {
	affected, err := ktu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ktu *KqiTargetUpdate) Exec(ctx context.Context) error {
	_, err := ktu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ktu *KqiTargetUpdate) ExecX(ctx context.Context) {
	if err := ktu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ktu *KqiTargetUpdate) defaults() {
	if _, ok := ktu.mutation.UpdateTime(); !ok {
		v := kqitarget.UpdateDefaultUpdateTime()
		ktu.mutation.SetUpdateTime(v)
	}
}

func (ktu *KqiTargetUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kqitarget.Table,
			Columns: kqitarget.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kqitarget.FieldID,
			},
		},
	}
	if ps := ktu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ktu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldUpdateTime,
		})
	}
	if value, ok := ktu.mutation.Comparator(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldComparator,
		})
	}
	if value, ok := ktu.mutation.AddedComparator(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldComparator,
		})
	}
	if value, ok := ktu.mutation.ReferenceValue(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldReferenceValue,
		})
	}
	if value, ok := ktu.mutation.AddedReferenceValue(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldReferenceValue,
		})
	}
	if value, ok := ktu.mutation.WarningComparator(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldWarningComparator,
		})
	}
	if value, ok := ktu.mutation.AddedWarningComparator(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldWarningComparator,
		})
	}
	if value, ok := ktu.mutation.Frame(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldFrame,
		})
	}
	if value, ok := ktu.mutation.AddedFrame(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldFrame,
		})
	}
	if value, ok := ktu.mutation.AlowedValidation(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldAlowedValidation,
		})
	}
	if value, ok := ktu.mutation.AddedAlowedValidation(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldAlowedValidation,
		})
	}
	if value, ok := ktu.mutation.InitTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldInitTime,
		})
	}
	if value, ok := ktu.mutation.EndTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldEndTime,
		})
	}
	if value, ok := ktu.mutation.Impact(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kqitarget.FieldImpact,
		})
	}
	if value, ok := ktu.mutation.Active(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: kqitarget.FieldActive,
		})
	}
	if ktu.mutation.KqiTargetFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kqitarget.KqiTargetFkTable,
			Columns: []string{kqitarget.KqiTargetFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ktu.mutation.KqiTargetFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kqitarget.KqiTargetFkTable,
			Columns: []string{kqitarget.KqiTargetFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ktu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kqitarget.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// KqiTargetUpdateOne is the builder for updating a single KqiTarget entity.
type KqiTargetUpdateOne struct {
	config
	hooks    []Hook
	mutation *KqiTargetMutation
}

// SetComparator sets the comparator field.
func (ktuo *KqiTargetUpdateOne) SetComparator(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.ResetComparator()
	ktuo.mutation.SetComparator(f)
	return ktuo
}

// AddComparator adds f to comparator.
func (ktuo *KqiTargetUpdateOne) AddComparator(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.AddComparator(f)
	return ktuo
}

// SetReferenceValue sets the referenceValue field.
func (ktuo *KqiTargetUpdateOne) SetReferenceValue(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.ResetReferenceValue()
	ktuo.mutation.SetReferenceValue(f)
	return ktuo
}

// AddReferenceValue adds f to referenceValue.
func (ktuo *KqiTargetUpdateOne) AddReferenceValue(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.AddReferenceValue(f)
	return ktuo
}

// SetWarningComparator sets the warningComparator field.
func (ktuo *KqiTargetUpdateOne) SetWarningComparator(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.ResetWarningComparator()
	ktuo.mutation.SetWarningComparator(f)
	return ktuo
}

// AddWarningComparator adds f to warningComparator.
func (ktuo *KqiTargetUpdateOne) AddWarningComparator(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.AddWarningComparator(f)
	return ktuo
}

// SetFrame sets the frame field.
func (ktuo *KqiTargetUpdateOne) SetFrame(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.ResetFrame()
	ktuo.mutation.SetFrame(f)
	return ktuo
}

// AddFrame adds f to frame.
func (ktuo *KqiTargetUpdateOne) AddFrame(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.AddFrame(f)
	return ktuo
}

// SetAlowedValidation sets the alowedValidation field.
func (ktuo *KqiTargetUpdateOne) SetAlowedValidation(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.ResetAlowedValidation()
	ktuo.mutation.SetAlowedValidation(f)
	return ktuo
}

// AddAlowedValidation adds f to alowedValidation.
func (ktuo *KqiTargetUpdateOne) AddAlowedValidation(f float64) *KqiTargetUpdateOne {
	ktuo.mutation.AddAlowedValidation(f)
	return ktuo
}

// SetInitTime sets the initTime field.
func (ktuo *KqiTargetUpdateOne) SetInitTime(t time.Time) *KqiTargetUpdateOne {
	ktuo.mutation.SetInitTime(t)
	return ktuo
}

// SetEndTime sets the endTime field.
func (ktuo *KqiTargetUpdateOne) SetEndTime(t time.Time) *KqiTargetUpdateOne {
	ktuo.mutation.SetEndTime(t)
	return ktuo
}

// SetImpact sets the impact field.
func (ktuo *KqiTargetUpdateOne) SetImpact(s string) *KqiTargetUpdateOne {
	ktuo.mutation.SetImpact(s)
	return ktuo
}

// SetActive sets the active field.
func (ktuo *KqiTargetUpdateOne) SetActive(b bool) *KqiTargetUpdateOne {
	ktuo.mutation.SetActive(b)
	return ktuo
}

// SetKqiTargetFkID sets the kqiTargetFk edge to Kqi by id.
func (ktuo *KqiTargetUpdateOne) SetKqiTargetFkID(id int) *KqiTargetUpdateOne {
	ktuo.mutation.SetKqiTargetFkID(id)
	return ktuo
}

// SetNillableKqiTargetFkID sets the kqiTargetFk edge to Kqi by id if the given value is not nil.
func (ktuo *KqiTargetUpdateOne) SetNillableKqiTargetFkID(id *int) *KqiTargetUpdateOne {
	if id != nil {
		ktuo = ktuo.SetKqiTargetFkID(*id)
	}
	return ktuo
}

// SetKqiTargetFk sets the kqiTargetFk edge to Kqi.
func (ktuo *KqiTargetUpdateOne) SetKqiTargetFk(k *Kqi) *KqiTargetUpdateOne {
	return ktuo.SetKqiTargetFkID(k.ID)
}

// Mutation returns the KqiTargetMutation object of the builder.
func (ktuo *KqiTargetUpdateOne) Mutation() *KqiTargetMutation {
	return ktuo.mutation
}

// ClearKqiTargetFk clears the "kqiTargetFk" edge to type Kqi.
func (ktuo *KqiTargetUpdateOne) ClearKqiTargetFk() *KqiTargetUpdateOne {
	ktuo.mutation.ClearKqiTargetFk()
	return ktuo
}

// Save executes the query and returns the updated entity.
func (ktuo *KqiTargetUpdateOne) Save(ctx context.Context) (*KqiTarget, error) {
	var (
		err  error
		node *KqiTarget
	)
	ktuo.defaults()
	if len(ktuo.hooks) == 0 {
		node, err = ktuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*KqiTargetMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ktuo.mutation = mutation
			node, err = ktuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ktuo.hooks) - 1; i >= 0; i-- {
			mut = ktuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ktuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ktuo *KqiTargetUpdateOne) SaveX(ctx context.Context) *KqiTarget {
	node, err := ktuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ktuo *KqiTargetUpdateOne) Exec(ctx context.Context) error {
	_, err := ktuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ktuo *KqiTargetUpdateOne) ExecX(ctx context.Context) {
	if err := ktuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ktuo *KqiTargetUpdateOne) defaults() {
	if _, ok := ktuo.mutation.UpdateTime(); !ok {
		v := kqitarget.UpdateDefaultUpdateTime()
		ktuo.mutation.SetUpdateTime(v)
	}
}

func (ktuo *KqiTargetUpdateOne) sqlSave(ctx context.Context) (_node *KqiTarget, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   kqitarget.Table,
			Columns: kqitarget.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: kqitarget.FieldID,
			},
		},
	}
	id, ok := ktuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing KqiTarget.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := ktuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldUpdateTime,
		})
	}
	if value, ok := ktuo.mutation.Comparator(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldComparator,
		})
	}
	if value, ok := ktuo.mutation.AddedComparator(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldComparator,
		})
	}
	if value, ok := ktuo.mutation.ReferenceValue(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldReferenceValue,
		})
	}
	if value, ok := ktuo.mutation.AddedReferenceValue(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldReferenceValue,
		})
	}
	if value, ok := ktuo.mutation.WarningComparator(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldWarningComparator,
		})
	}
	if value, ok := ktuo.mutation.AddedWarningComparator(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldWarningComparator,
		})
	}
	if value, ok := ktuo.mutation.Frame(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldFrame,
		})
	}
	if value, ok := ktuo.mutation.AddedFrame(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldFrame,
		})
	}
	if value, ok := ktuo.mutation.AlowedValidation(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldAlowedValidation,
		})
	}
	if value, ok := ktuo.mutation.AddedAlowedValidation(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: kqitarget.FieldAlowedValidation,
		})
	}
	if value, ok := ktuo.mutation.InitTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldInitTime,
		})
	}
	if value, ok := ktuo.mutation.EndTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: kqitarget.FieldEndTime,
		})
	}
	if value, ok := ktuo.mutation.Impact(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: kqitarget.FieldImpact,
		})
	}
	if value, ok := ktuo.mutation.Active(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: kqitarget.FieldActive,
		})
	}
	if ktuo.mutation.KqiTargetFkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kqitarget.KqiTargetFkTable,
			Columns: []string{kqitarget.KqiTargetFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ktuo.mutation.KqiTargetFkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   kqitarget.KqiTargetFkTable,
			Columns: []string{kqitarget.KqiTargetFkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: kqi.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &KqiTarget{config: ktuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, ktuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{kqitarget.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
