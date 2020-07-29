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

	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatecategory"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatequestion"
)

// SurveyTemplateQuestionCreate is the builder for creating a SurveyTemplateQuestion entity.
type SurveyTemplateQuestionCreate struct {
	config
	mutation *SurveyTemplateQuestionMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (stqc *SurveyTemplateQuestionCreate) SetCreateTime(t time.Time) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetCreateTime(t)
	return stqc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (stqc *SurveyTemplateQuestionCreate) SetNillableCreateTime(t *time.Time) *SurveyTemplateQuestionCreate {
	if t != nil {
		stqc.SetCreateTime(*t)
	}
	return stqc
}

// SetUpdateTime sets the update_time field.
func (stqc *SurveyTemplateQuestionCreate) SetUpdateTime(t time.Time) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetUpdateTime(t)
	return stqc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (stqc *SurveyTemplateQuestionCreate) SetNillableUpdateTime(t *time.Time) *SurveyTemplateQuestionCreate {
	if t != nil {
		stqc.SetUpdateTime(*t)
	}
	return stqc
}

// SetQuestionTitle sets the question_title field.
func (stqc *SurveyTemplateQuestionCreate) SetQuestionTitle(s string) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetQuestionTitle(s)
	return stqc
}

// SetQuestionDescription sets the question_description field.
func (stqc *SurveyTemplateQuestionCreate) SetQuestionDescription(s string) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetQuestionDescription(s)
	return stqc
}

// SetQuestionType sets the question_type field.
func (stqc *SurveyTemplateQuestionCreate) SetQuestionType(s string) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetQuestionType(s)
	return stqc
}

// SetIndex sets the index field.
func (stqc *SurveyTemplateQuestionCreate) SetIndex(i int) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetIndex(i)
	return stqc
}

// SetCategoryID sets the category edge to SurveyTemplateCategory by id.
func (stqc *SurveyTemplateQuestionCreate) SetCategoryID(id int) *SurveyTemplateQuestionCreate {
	stqc.mutation.SetCategoryID(id)
	return stqc
}

// SetNillableCategoryID sets the category edge to SurveyTemplateCategory by id if the given value is not nil.
func (stqc *SurveyTemplateQuestionCreate) SetNillableCategoryID(id *int) *SurveyTemplateQuestionCreate {
	if id != nil {
		stqc = stqc.SetCategoryID(*id)
	}
	return stqc
}

// SetCategory sets the category edge to SurveyTemplateCategory.
func (stqc *SurveyTemplateQuestionCreate) SetCategory(s *SurveyTemplateCategory) *SurveyTemplateQuestionCreate {
	return stqc.SetCategoryID(s.ID)
}

// Mutation returns the SurveyTemplateQuestionMutation object of the builder.
func (stqc *SurveyTemplateQuestionCreate) Mutation() *SurveyTemplateQuestionMutation {
	return stqc.mutation
}

// Save creates the SurveyTemplateQuestion in the database.
func (stqc *SurveyTemplateQuestionCreate) Save(ctx context.Context) (*SurveyTemplateQuestion, error) {
	if err := stqc.preSave(); err != nil {
		return nil, err
	}
	var (
		err  error
		node *SurveyTemplateQuestion
	)
	if len(stqc.hooks) == 0 {
		node, err = stqc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*SurveyTemplateQuestionMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			stqc.mutation = mutation
			node, err = stqc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(stqc.hooks) - 1; i >= 0; i-- {
			mut = stqc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, stqc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (stqc *SurveyTemplateQuestionCreate) SaveX(ctx context.Context) *SurveyTemplateQuestion {
	v, err := stqc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (stqc *SurveyTemplateQuestionCreate) preSave() error {
	if _, ok := stqc.mutation.CreateTime(); !ok {
		v := surveytemplatequestion.DefaultCreateTime()
		stqc.mutation.SetCreateTime(v)
	}
	if _, ok := stqc.mutation.UpdateTime(); !ok {
		v := surveytemplatequestion.DefaultUpdateTime()
		stqc.mutation.SetUpdateTime(v)
	}
	if _, ok := stqc.mutation.QuestionTitle(); !ok {
		return &ValidationError{Name: "question_title", err: errors.New("ent: missing required field \"question_title\"")}
	}
	if _, ok := stqc.mutation.QuestionDescription(); !ok {
		return &ValidationError{Name: "question_description", err: errors.New("ent: missing required field \"question_description\"")}
	}
	if _, ok := stqc.mutation.QuestionType(); !ok {
		return &ValidationError{Name: "question_type", err: errors.New("ent: missing required field \"question_type\"")}
	}
	if _, ok := stqc.mutation.Index(); !ok {
		return &ValidationError{Name: "index", err: errors.New("ent: missing required field \"index\"")}
	}
	return nil
}

func (stqc *SurveyTemplateQuestionCreate) sqlSave(ctx context.Context) (*SurveyTemplateQuestion, error) {
	stq, _spec := stqc.createSpec()
	if err := sqlgraph.CreateNode(ctx, stqc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	stq.ID = int(id)
	return stq, nil
}

func (stqc *SurveyTemplateQuestionCreate) createSpec() (*SurveyTemplateQuestion, *sqlgraph.CreateSpec) {
	var (
		stq   = &SurveyTemplateQuestion{config: stqc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: surveytemplatequestion.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: surveytemplatequestion.FieldID,
			},
		}
	)
	if value, ok := stqc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: surveytemplatequestion.FieldCreateTime,
		})
		stq.CreateTime = value
	}
	if value, ok := stqc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: surveytemplatequestion.FieldUpdateTime,
		})
		stq.UpdateTime = value
	}
	if value, ok := stqc.mutation.QuestionTitle(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: surveytemplatequestion.FieldQuestionTitle,
		})
		stq.QuestionTitle = value
	}
	if value, ok := stqc.mutation.QuestionDescription(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: surveytemplatequestion.FieldQuestionDescription,
		})
		stq.QuestionDescription = value
	}
	if value, ok := stqc.mutation.QuestionType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: surveytemplatequestion.FieldQuestionType,
		})
		stq.QuestionType = value
	}
	if value, ok := stqc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: surveytemplatequestion.FieldIndex,
		})
		stq.Index = value
	}
	if nodes := stqc.mutation.CategoryIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   surveytemplatequestion.CategoryTable,
			Columns: []string{surveytemplatequestion.CategoryColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: surveytemplatecategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return stq, _spec
}

// SurveyTemplateQuestionCreateBulk is the builder for creating a bulk of SurveyTemplateQuestion entities.
type SurveyTemplateQuestionCreateBulk struct {
	config
	builders []*SurveyTemplateQuestionCreate
}

// Save creates the SurveyTemplateQuestion entities in the database.
func (stqcb *SurveyTemplateQuestionCreateBulk) Save(ctx context.Context) ([]*SurveyTemplateQuestion, error) {
	specs := make([]*sqlgraph.CreateSpec, len(stqcb.builders))
	nodes := make([]*SurveyTemplateQuestion, len(stqcb.builders))
	mutators := make([]Mutator, len(stqcb.builders))
	for i := range stqcb.builders {
		func(i int, root context.Context) {
			builder := stqcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				if err := builder.preSave(); err != nil {
					return nil, err
				}
				mutation, ok := m.(*SurveyTemplateQuestionMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, stqcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, stqcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, stqcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (stqcb *SurveyTemplateQuestionCreateBulk) SaveX(ctx context.Context) []*SurveyTemplateQuestion {
	v, err := stqcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
