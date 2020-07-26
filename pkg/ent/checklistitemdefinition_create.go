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
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategorydefinition"
	"github.com/facebookincubator/symphony/pkg/ent/checklistitemdefinition"
)

// CheckListItemDefinitionCreate is the builder for creating a CheckListItemDefinition entity.
type CheckListItemDefinitionCreate struct {
	config
	mutation *CheckListItemDefinitionMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (clidc *CheckListItemDefinitionCreate) SetCreateTime(t time.Time) *CheckListItemDefinitionCreate {
	clidc.mutation.SetCreateTime(t)
	return clidc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableCreateTime(t *time.Time) *CheckListItemDefinitionCreate {
	if t != nil {
		clidc.SetCreateTime(*t)
	}
	return clidc
}

// SetUpdateTime sets the update_time field.
func (clidc *CheckListItemDefinitionCreate) SetUpdateTime(t time.Time) *CheckListItemDefinitionCreate {
	clidc.mutation.SetUpdateTime(t)
	return clidc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableUpdateTime(t *time.Time) *CheckListItemDefinitionCreate {
	if t != nil {
		clidc.SetUpdateTime(*t)
	}
	return clidc
}

// SetTitle sets the title field.
func (clidc *CheckListItemDefinitionCreate) SetTitle(s string) *CheckListItemDefinitionCreate {
	clidc.mutation.SetTitle(s)
	return clidc
}

// SetType sets the type field.
func (clidc *CheckListItemDefinitionCreate) SetType(s string) *CheckListItemDefinitionCreate {
	clidc.mutation.SetType(s)
	return clidc
}

// SetIndex sets the index field.
func (clidc *CheckListItemDefinitionCreate) SetIndex(i int) *CheckListItemDefinitionCreate {
	clidc.mutation.SetIndex(i)
	return clidc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableIndex(i *int) *CheckListItemDefinitionCreate {
	if i != nil {
		clidc.SetIndex(*i)
	}
	return clidc
}

// SetIsMandatory sets the is_mandatory field.
func (clidc *CheckListItemDefinitionCreate) SetIsMandatory(b bool) *CheckListItemDefinitionCreate {
	clidc.mutation.SetIsMandatory(b)
	return clidc
}

// SetNillableIsMandatory sets the is_mandatory field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableIsMandatory(b *bool) *CheckListItemDefinitionCreate {
	if b != nil {
		clidc.SetIsMandatory(*b)
	}
	return clidc
}

// SetEnumValues sets the enum_values field.
func (clidc *CheckListItemDefinitionCreate) SetEnumValues(s string) *CheckListItemDefinitionCreate {
	clidc.mutation.SetEnumValues(s)
	return clidc
}

// SetNillableEnumValues sets the enum_values field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableEnumValues(s *string) *CheckListItemDefinitionCreate {
	if s != nil {
		clidc.SetEnumValues(*s)
	}
	return clidc
}

// SetEnumSelectionModeValue sets the enum_selection_mode_value field.
func (clidc *CheckListItemDefinitionCreate) SetEnumSelectionModeValue(csmv checklistitemdefinition.EnumSelectionModeValue) *CheckListItemDefinitionCreate {
	clidc.mutation.SetEnumSelectionModeValue(csmv)
	return clidc
}

// SetNillableEnumSelectionModeValue sets the enum_selection_mode_value field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableEnumSelectionModeValue(csmv *checklistitemdefinition.EnumSelectionModeValue) *CheckListItemDefinitionCreate {
	if csmv != nil {
		clidc.SetEnumSelectionModeValue(*csmv)
	}
	return clidc
}

// SetHelpText sets the help_text field.
func (clidc *CheckListItemDefinitionCreate) SetHelpText(s string) *CheckListItemDefinitionCreate {
	clidc.mutation.SetHelpText(s)
	return clidc
}

// SetNillableHelpText sets the help_text field if the given value is not nil.
func (clidc *CheckListItemDefinitionCreate) SetNillableHelpText(s *string) *CheckListItemDefinitionCreate {
	if s != nil {
		clidc.SetHelpText(*s)
	}
	return clidc
}

// SetCheckListCategoryDefinitionID sets the check_list_category_definition edge to CheckListCategoryDefinition by id.
func (clidc *CheckListItemDefinitionCreate) SetCheckListCategoryDefinitionID(id int) *CheckListItemDefinitionCreate {
	clidc.mutation.SetCheckListCategoryDefinitionID(id)
	return clidc
}

// SetCheckListCategoryDefinition sets the check_list_category_definition edge to CheckListCategoryDefinition.
func (clidc *CheckListItemDefinitionCreate) SetCheckListCategoryDefinition(c *CheckListCategoryDefinition) *CheckListItemDefinitionCreate {
	return clidc.SetCheckListCategoryDefinitionID(c.ID)
}

// Mutation returns the CheckListItemDefinitionMutation object of the builder.
func (clidc *CheckListItemDefinitionCreate) Mutation() *CheckListItemDefinitionMutation {
	return clidc.mutation
}

// Save creates the CheckListItemDefinition in the database.
func (clidc *CheckListItemDefinitionCreate) Save(ctx context.Context) (*CheckListItemDefinition, error) {
	if err := clidc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *CheckListItemDefinition
	)
	if len(clidc.hooks) == 0 {
		node, err = clidc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*CheckListItemDefinitionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			clidc.mutation = mutation
			node, err = clidc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(clidc.hooks) - 1; i >= 0; i-- {
			mut = clidc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, clidc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (clidc *CheckListItemDefinitionCreate) SaveX(ctx context.Context) *CheckListItemDefinition {
	v, err := clidc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (clidc *CheckListItemDefinitionCreate) preSave() error {
	if _, ok := clidc.mutation.CreateTime(); !ok {
		v := checklistitemdefinition.DefaultCreateTime()
		clidc.mutation.SetCreateTime(v)
	}
	if _, ok := clidc.mutation.UpdateTime(); !ok {
		v := checklistitemdefinition.DefaultUpdateTime()
		clidc.mutation.SetUpdateTime(v)
	}
	if _, ok := clidc.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New("ent: missing required field \"title\"")}
	}
	if _, ok := clidc.mutation.GetType(); !ok {
		return &ValidationError{Name: "type", err: errors.New("ent: missing required field \"type\"")}
	}
	if v, ok := clidc.mutation.EnumSelectionModeValue(); ok {
		if err := checklistitemdefinition.EnumSelectionModeValueValidator(v); err != nil {
			return &ValidationError{Name: "enum_selection_mode_value", err: fmt.Errorf("ent: validator failed for field \"enum_selection_mode_value\": %w", err)}
		}
	}
	if _, ok := clidc.mutation.CheckListCategoryDefinitionID(); !ok {
		return &ValidationError{Name: "check_list_category_definition", err: errors.New("ent: missing required edge \"check_list_category_definition\"")}
	}
	return nil
}

func (clidc *CheckListItemDefinitionCreate) sqlSave(ctx context.Context) (*CheckListItemDefinition, error) {
	clid, _spec := clidc.createSpec()
	if err := sqlgraph.CreateNode(ctx, clidc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	clid.ID = int(id)
	return clid, nil
}

func (clidc *CheckListItemDefinitionCreate) createSpec() (*CheckListItemDefinition, *sqlgraph.CreateSpec) {
	var (
		clid  = &CheckListItemDefinition{config: clidc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: checklistitemdefinition.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: checklistitemdefinition.FieldID,
			},
		}
	)
	if value, ok := clidc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: checklistitemdefinition.FieldCreateTime,
		})
		clid.CreateTime = value
	}
	if value, ok := clidc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: checklistitemdefinition.FieldUpdateTime,
		})
		clid.UpdateTime = value
	}
	if value, ok := clidc.mutation.Title(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistitemdefinition.FieldTitle,
		})
		clid.Title = value
	}
	if value, ok := clidc.mutation.GetType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistitemdefinition.FieldType,
		})
		clid.Type = value
	}
	if value, ok := clidc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: checklistitemdefinition.FieldIndex,
		})
		clid.Index = value
	}
	if value, ok := clidc.mutation.IsMandatory(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: checklistitemdefinition.FieldIsMandatory,
		})
		clid.IsMandatory = value
	}
	if value, ok := clidc.mutation.EnumValues(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistitemdefinition.FieldEnumValues,
		})
		clid.EnumValues = &value
	}
	if value, ok := clidc.mutation.EnumSelectionModeValue(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: checklistitemdefinition.FieldEnumSelectionModeValue,
		})
		clid.EnumSelectionModeValue = value
	}
	if value, ok := clidc.mutation.HelpText(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: checklistitemdefinition.FieldHelpText,
		})
		clid.HelpText = &value
	}
	if nodes := clidc.mutation.CheckListCategoryDefinitionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   checklistitemdefinition.CheckListCategoryDefinitionTable,
			Columns: []string{checklistitemdefinition.CheckListCategoryDefinitionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: checklistcategorydefinition.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return clid, _spec
}

// CheckListItemDefinitionCreateBulk is the builder for creating a bulk of CheckListItemDefinition entities.
type CheckListItemDefinitionCreateBulk struct {
	config
	builders []*CheckListItemDefinitionCreate
}

// Save creates the CheckListItemDefinition entities in the database.
func (clidcb *CheckListItemDefinitionCreateBulk) Save(ctx context.Context) ([]*CheckListItemDefinition, error) {
	specs := make([]*sqlgraph.CreateSpec, len(clidcb.builders))
	nodes := make([]*CheckListItemDefinition, len(clidcb.builders))
	mutators := make([]Mutator, len(clidcb.builders))
	for i := range clidcb.builders {
		func(i int, root context.Context) {
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				builder := clidcb.builders[i]
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*CheckListItemDefinitionMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, clidcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, clidcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
			for i := len(clidcb.builders[i].hooks) - 1; i >= 0; i-- {
				mut = clidcb.builders[i].hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if _, err := mutators[0].Mutate(ctx, clidcb.builders[0].mutation); err != nil {
		return nil, err
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (clidcb *CheckListItemDefinitionCreateBulk) SaveX(ctx context.Context) []*CheckListItemDefinition {
	v, err := clidcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
