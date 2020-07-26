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
	"github.com/facebookincubator/symphony/pkg/ent/equipmentposition"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentpositiondefinition"
	"github.com/facebookincubator/symphony/pkg/ent/equipmenttype"
)

// EquipmentPositionDefinitionCreate is the builder for creating a EquipmentPositionDefinition entity.
type EquipmentPositionDefinitionCreate struct {
	config
	mutation *EquipmentPositionDefinitionMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (epdc *EquipmentPositionDefinitionCreate) SetCreateTime(t time.Time) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetCreateTime(t)
	return epdc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (epdc *EquipmentPositionDefinitionCreate) SetNillableCreateTime(t *time.Time) *EquipmentPositionDefinitionCreate {
	if t != nil {
		epdc.SetCreateTime(*t)
	}
	return epdc
}

// SetUpdateTime sets the update_time field.
func (epdc *EquipmentPositionDefinitionCreate) SetUpdateTime(t time.Time) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetUpdateTime(t)
	return epdc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (epdc *EquipmentPositionDefinitionCreate) SetNillableUpdateTime(t *time.Time) *EquipmentPositionDefinitionCreate {
	if t != nil {
		epdc.SetUpdateTime(*t)
	}
	return epdc
}

// SetName sets the name field.
func (epdc *EquipmentPositionDefinitionCreate) SetName(s string) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetName(s)
	return epdc
}

// SetIndex sets the index field.
func (epdc *EquipmentPositionDefinitionCreate) SetIndex(i int) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetIndex(i)
	return epdc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (epdc *EquipmentPositionDefinitionCreate) SetNillableIndex(i *int) *EquipmentPositionDefinitionCreate {
	if i != nil {
		epdc.SetIndex(*i)
	}
	return epdc
}

// SetVisibilityLabel sets the visibility_label field.
func (epdc *EquipmentPositionDefinitionCreate) SetVisibilityLabel(s string) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetVisibilityLabel(s)
	return epdc
}

// SetNillableVisibilityLabel sets the visibility_label field if the given value is not nil.
func (epdc *EquipmentPositionDefinitionCreate) SetNillableVisibilityLabel(s *string) *EquipmentPositionDefinitionCreate {
	if s != nil {
		epdc.SetVisibilityLabel(*s)
	}
	return epdc
}

// AddPositionIDs adds the positions edge to EquipmentPosition by ids.
func (epdc *EquipmentPositionDefinitionCreate) AddPositionIDs(ids ...int) *EquipmentPositionDefinitionCreate {
	epdc.mutation.AddPositionIDs(ids...)
	return epdc
}

// AddPositions adds the positions edges to EquipmentPosition.
func (epdc *EquipmentPositionDefinitionCreate) AddPositions(e ...*EquipmentPosition) *EquipmentPositionDefinitionCreate {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return epdc.AddPositionIDs(ids...)
}

// SetEquipmentTypeID sets the equipment_type edge to EquipmentType by id.
func (epdc *EquipmentPositionDefinitionCreate) SetEquipmentTypeID(id int) *EquipmentPositionDefinitionCreate {
	epdc.mutation.SetEquipmentTypeID(id)
	return epdc
}

// SetNillableEquipmentTypeID sets the equipment_type edge to EquipmentType by id if the given value is not nil.
func (epdc *EquipmentPositionDefinitionCreate) SetNillableEquipmentTypeID(id *int) *EquipmentPositionDefinitionCreate {
	if id != nil {
		epdc = epdc.SetEquipmentTypeID(*id)
	}
	return epdc
}

// SetEquipmentType sets the equipment_type edge to EquipmentType.
func (epdc *EquipmentPositionDefinitionCreate) SetEquipmentType(e *EquipmentType) *EquipmentPositionDefinitionCreate {
	return epdc.SetEquipmentTypeID(e.ID)
}

// Mutation returns the EquipmentPositionDefinitionMutation object of the builder.
func (epdc *EquipmentPositionDefinitionCreate) Mutation() *EquipmentPositionDefinitionMutation {
	return epdc.mutation
}

// Save creates the EquipmentPositionDefinition in the database.
func (epdc *EquipmentPositionDefinitionCreate) Save(ctx context.Context) (*EquipmentPositionDefinition, error) {
	if err := epdc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *EquipmentPositionDefinition
	)
	if len(epdc.hooks) == 0 {
		node, err = epdc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*EquipmentPositionDefinitionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			epdc.mutation = mutation
			node, err = epdc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(epdc.hooks) - 1; i >= 0; i-- {
			mut = epdc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, epdc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (epdc *EquipmentPositionDefinitionCreate) SaveX(ctx context.Context) *EquipmentPositionDefinition {
	v, err := epdc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (epdc *EquipmentPositionDefinitionCreate) preSave() error {
	if _, ok := epdc.mutation.CreateTime(); !ok {
		v := equipmentpositiondefinition.DefaultCreateTime()
		epdc.mutation.SetCreateTime(v)
	}
	if _, ok := epdc.mutation.UpdateTime(); !ok {
		v := equipmentpositiondefinition.DefaultUpdateTime()
		epdc.mutation.SetUpdateTime(v)
	}
	if _, ok := epdc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	return nil
}

func (epdc *EquipmentPositionDefinitionCreate) sqlSave(ctx context.Context) (*EquipmentPositionDefinition, error) {
	epd, _spec := epdc.createSpec()
	if err := sqlgraph.CreateNode(ctx, epdc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	epd.ID = int(id)
	return epd, nil
}

func (epdc *EquipmentPositionDefinitionCreate) createSpec() (*EquipmentPositionDefinition, *sqlgraph.CreateSpec) {
	var (
		epd   = &EquipmentPositionDefinition{config: epdc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: equipmentpositiondefinition.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: equipmentpositiondefinition.FieldID,
			},
		}
	)
	if value, ok := epdc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: equipmentpositiondefinition.FieldCreateTime,
		})
		epd.CreateTime = value
	}
	if value, ok := epdc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: equipmentpositiondefinition.FieldUpdateTime,
		})
		epd.UpdateTime = value
	}
	if value, ok := epdc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: equipmentpositiondefinition.FieldName,
		})
		epd.Name = value
	}
	if value, ok := epdc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: equipmentpositiondefinition.FieldIndex,
		})
		epd.Index = value
	}
	if value, ok := epdc.mutation.VisibilityLabel(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: equipmentpositiondefinition.FieldVisibilityLabel,
		})
		epd.VisibilityLabel = value
	}
	if nodes := epdc.mutation.PositionsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   equipmentpositiondefinition.PositionsTable,
			Columns: []string{equipmentpositiondefinition.PositionsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmentposition.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := epdc.mutation.EquipmentTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   equipmentpositiondefinition.EquipmentTypeTable,
			Columns: []string{equipmentpositiondefinition.EquipmentTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmenttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return epd, _spec
}

// EquipmentPositionDefinitionCreateBulk is the builder for creating a bulk of EquipmentPositionDefinition entities.
type EquipmentPositionDefinitionCreateBulk struct {
	config
	builders []*EquipmentPositionDefinitionCreate
}

// Save creates the EquipmentPositionDefinition entities in the database.
func (epdcb *EquipmentPositionDefinitionCreateBulk) Save(ctx context.Context) ([]*EquipmentPositionDefinition, error) {
	specs := make([]*sqlgraph.CreateSpec, len(epdcb.builders))
	nodes := make([]*EquipmentPositionDefinition, len(epdcb.builders))
	mutators := make([]Mutator, len(epdcb.builders))
	for i := range epdcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := epdcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*EquipmentPositionDefinitionMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, epdcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, epdcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(epdcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = epdcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, epdcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (epdcb *EquipmentPositionDefinitionCreateBulk) SaveX(ctx context.Context) []*EquipmentPositionDefinition {
	v, err := epdcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
