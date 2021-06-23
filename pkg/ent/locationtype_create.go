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
	"github.com/facebookincubator/symphony/pkg/ent/filecategorytype"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatecategory"
)

// LocationTypeCreate is the builder for creating a LocationType entity.
type LocationTypeCreate struct {
	config
	mutation *LocationTypeMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (ltc *LocationTypeCreate) SetCreateTime(t time.Time) *LocationTypeCreate {
	ltc.mutation.SetCreateTime(t)
	return ltc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableCreateTime(t *time.Time) *LocationTypeCreate {
	if t != nil {
		ltc.SetCreateTime(*t)
	}
	return ltc
}

// SetUpdateTime sets the update_time field.
func (ltc *LocationTypeCreate) SetUpdateTime(t time.Time) *LocationTypeCreate {
	ltc.mutation.SetUpdateTime(t)
	return ltc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableUpdateTime(t *time.Time) *LocationTypeCreate {
	if t != nil {
		ltc.SetUpdateTime(*t)
	}
	return ltc
}

// SetSite sets the site field.
func (ltc *LocationTypeCreate) SetSite(b bool) *LocationTypeCreate {
	ltc.mutation.SetSite(b)
	return ltc
}

// SetNillableSite sets the site field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableSite(b *bool) *LocationTypeCreate {
	if b != nil {
		ltc.SetSite(*b)
	}
	return ltc
}

// SetName sets the name field.
func (ltc *LocationTypeCreate) SetName(s string) *LocationTypeCreate {
	ltc.mutation.SetName(s)
	return ltc
}

// SetMapType sets the map_type field.
func (ltc *LocationTypeCreate) SetMapType(s string) *LocationTypeCreate {
	ltc.mutation.SetMapType(s)
	return ltc
}

// SetNillableMapType sets the map_type field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableMapType(s *string) *LocationTypeCreate {
	if s != nil {
		ltc.SetMapType(*s)
	}
	return ltc
}

// SetMapZoomLevel sets the map_zoom_level field.
func (ltc *LocationTypeCreate) SetMapZoomLevel(i int) *LocationTypeCreate {
	ltc.mutation.SetMapZoomLevel(i)
	return ltc
}

// SetNillableMapZoomLevel sets the map_zoom_level field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableMapZoomLevel(i *int) *LocationTypeCreate {
	if i != nil {
		ltc.SetMapZoomLevel(*i)
	}
	return ltc
}

// SetIndex sets the index field.
func (ltc *LocationTypeCreate) SetIndex(i int) *LocationTypeCreate {
	ltc.mutation.SetIndex(i)
	return ltc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (ltc *LocationTypeCreate) SetNillableIndex(i *int) *LocationTypeCreate {
	if i != nil {
		ltc.SetIndex(*i)
	}
	return ltc
}

// AddLocationIDs adds the locations edge to Location by ids.
func (ltc *LocationTypeCreate) AddLocationIDs(ids ...int) *LocationTypeCreate {
	ltc.mutation.AddLocationIDs(ids...)
	return ltc
}

// AddLocations adds the locations edges to Location.
func (ltc *LocationTypeCreate) AddLocations(l ...*Location) *LocationTypeCreate {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return ltc.AddLocationIDs(ids...)
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (ltc *LocationTypeCreate) AddPropertyTypeIDs(ids ...int) *LocationTypeCreate {
	ltc.mutation.AddPropertyTypeIDs(ids...)
	return ltc
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (ltc *LocationTypeCreate) AddPropertyTypes(p ...*PropertyType) *LocationTypeCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ltc.AddPropertyTypeIDs(ids...)
}

// AddFileCategoryTypeIDs adds the file_category_type edge to FileCategoryType by ids.
func (ltc *LocationTypeCreate) AddFileCategoryTypeIDs(ids ...int) *LocationTypeCreate {
	ltc.mutation.AddFileCategoryTypeIDs(ids...)
	return ltc
}

// AddFileCategoryType adds the file_category_type edges to FileCategoryType.
func (ltc *LocationTypeCreate) AddFileCategoryType(f ...*FileCategoryType) *LocationTypeCreate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ltc.AddFileCategoryTypeIDs(ids...)
}

// AddSurveyTemplateCategoryIDs adds the survey_template_categories edge to SurveyTemplateCategory by ids.
func (ltc *LocationTypeCreate) AddSurveyTemplateCategoryIDs(ids ...int) *LocationTypeCreate {
	ltc.mutation.AddSurveyTemplateCategoryIDs(ids...)
	return ltc
}

// AddSurveyTemplateCategories adds the survey_template_categories edges to SurveyTemplateCategory.
func (ltc *LocationTypeCreate) AddSurveyTemplateCategories(s ...*SurveyTemplateCategory) *LocationTypeCreate {
	ids := make([]int, len(s))
	for i := range s {
		ids[i] = s[i].ID
	}
	return ltc.AddSurveyTemplateCategoryIDs(ids...)
}

// Mutation returns the LocationTypeMutation object of the builder.
func (ltc *LocationTypeCreate) Mutation() *LocationTypeMutation {
	return ltc.mutation
}

// Save creates the LocationType in the database.
func (ltc *LocationTypeCreate) Save(ctx context.Context) (*LocationType, error) {
	var (
		err  error
		node *LocationType
	)
	ltc.defaults()
	if len(ltc.hooks) == 0 {
		if err = ltc.check(); err != nil {
			return nil, err
		}
		node, err = ltc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*LocationTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ltc.check(); err != nil {
				return nil, err
			}
			ltc.mutation = mutation
			node, err = ltc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ltc.hooks) - 1; i >= 0; i-- {
			mut = ltc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ltc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ltc *LocationTypeCreate) SaveX(ctx context.Context) *LocationType {
	v, err := ltc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (ltc *LocationTypeCreate) defaults() {
	if _, ok := ltc.mutation.CreateTime(); !ok {
		v := locationtype.DefaultCreateTime()
		ltc.mutation.SetCreateTime(v)
	}
	if _, ok := ltc.mutation.UpdateTime(); !ok {
		v := locationtype.DefaultUpdateTime()
		ltc.mutation.SetUpdateTime(v)
	}
	if _, ok := ltc.mutation.Site(); !ok {
		v := locationtype.DefaultSite
		ltc.mutation.SetSite(v)
	}
	if _, ok := ltc.mutation.MapZoomLevel(); !ok {
		v := locationtype.DefaultMapZoomLevel
		ltc.mutation.SetMapZoomLevel(v)
	}
	if _, ok := ltc.mutation.Index(); !ok {
		v := locationtype.DefaultIndex
		ltc.mutation.SetIndex(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ltc *LocationTypeCreate) check() error {
	if _, ok := ltc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := ltc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := ltc.mutation.Site(); !ok {
		return &ValidationError{Name: "site", err: errors.New("ent: missing required field \"site\"")}
	}
	if _, ok := ltc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if _, ok := ltc.mutation.Index(); !ok {
		return &ValidationError{Name: "index", err: errors.New("ent: missing required field \"index\"")}
	}
	return nil
}

func (ltc *LocationTypeCreate) sqlSave(ctx context.Context) (*LocationType, error) {
	_node, _spec := ltc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ltc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (ltc *LocationTypeCreate) createSpec() (*LocationType, *sqlgraph.CreateSpec) {
	var (
		_node = &LocationType{config: ltc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: locationtype.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: locationtype.FieldID,
			},
		}
	)
	if value, ok := ltc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: locationtype.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := ltc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: locationtype.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := ltc.mutation.Site(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: locationtype.FieldSite,
		})
		_node.Site = value
	}
	if value, ok := ltc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldName,
		})
		_node.Name = value
	}
	if value, ok := ltc.mutation.MapType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldMapType,
		})
		_node.MapType = value
	}
	if value, ok := ltc.mutation.MapZoomLevel(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldMapZoomLevel,
		})
		_node.MapZoomLevel = value
	}
	if value, ok := ltc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldIndex,
		})
		_node.Index = value
	}
	if nodes := ltc.mutation.LocationsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   locationtype.LocationsTable,
			Columns: []string{locationtype.LocationsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ltc.mutation.PropertyTypesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   locationtype.PropertyTypesTable,
			Columns: []string{locationtype.PropertyTypesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: propertytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ltc.mutation.FileCategoryTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   locationtype.FileCategoryTypeTable,
			Columns: []string{locationtype.FileCategoryTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: filecategorytype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ltc.mutation.SurveyTemplateCategoriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   locationtype.SurveyTemplateCategoriesTable,
			Columns: []string{locationtype.SurveyTemplateCategoriesColumn},
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
	return _node, _spec
}

// LocationTypeCreateBulk is the builder for creating a bulk of LocationType entities.
type LocationTypeCreateBulk struct {
	config
	builders []*LocationTypeCreate
}

// Save creates the LocationType entities in the database.
func (ltcb *LocationTypeCreateBulk) Save(ctx context.Context) ([]*LocationType, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ltcb.builders))
	nodes := make([]*LocationType, len(ltcb.builders))
	mutators := make([]Mutator, len(ltcb.builders))
	for i := range ltcb.builders {
		func(i int, root context.Context) {
			builder := ltcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*LocationTypeMutation)
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
					_, err = mutators[i+1].Mutate(root, ltcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ltcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ltcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ltcb *LocationTypeCreateBulk) SaveX(ctx context.Context) []*LocationType {
	v, err := ltcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
