// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/filecategorytype"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatecategory"
)

// LocationTypeUpdate is the builder for updating LocationType entities.
type LocationTypeUpdate struct {
	config
	hooks    []Hook
	mutation *LocationTypeMutation
}

// Where adds a new predicate for the builder.
func (ltu *LocationTypeUpdate) Where(ps ...predicate.LocationType) *LocationTypeUpdate {
	ltu.mutation.predicates = append(ltu.mutation.predicates, ps...)
	return ltu
}

// SetSite sets the site field.
func (ltu *LocationTypeUpdate) SetSite(b bool) *LocationTypeUpdate {
	ltu.mutation.SetSite(b)
	return ltu
}

// SetNillableSite sets the site field if the given value is not nil.
func (ltu *LocationTypeUpdate) SetNillableSite(b *bool) *LocationTypeUpdate {
	if b != nil {
		ltu.SetSite(*b)
	}
	return ltu
}

// SetName sets the name field.
func (ltu *LocationTypeUpdate) SetName(s string) *LocationTypeUpdate {
	ltu.mutation.SetName(s)
	return ltu
}

// SetMapType sets the map_type field.
func (ltu *LocationTypeUpdate) SetMapType(s string) *LocationTypeUpdate {
	ltu.mutation.SetMapType(s)
	return ltu
}

// SetNillableMapType sets the map_type field if the given value is not nil.
func (ltu *LocationTypeUpdate) SetNillableMapType(s *string) *LocationTypeUpdate {
	if s != nil {
		ltu.SetMapType(*s)
	}
	return ltu
}

// ClearMapType clears the value of map_type.
func (ltu *LocationTypeUpdate) ClearMapType() *LocationTypeUpdate {
	ltu.mutation.ClearMapType()
	return ltu
}

// SetMapZoomLevel sets the map_zoom_level field.
func (ltu *LocationTypeUpdate) SetMapZoomLevel(i int) *LocationTypeUpdate {
	ltu.mutation.ResetMapZoomLevel()
	ltu.mutation.SetMapZoomLevel(i)
	return ltu
}

// SetNillableMapZoomLevel sets the map_zoom_level field if the given value is not nil.
func (ltu *LocationTypeUpdate) SetNillableMapZoomLevel(i *int) *LocationTypeUpdate {
	if i != nil {
		ltu.SetMapZoomLevel(*i)
	}
	return ltu
}

// AddMapZoomLevel adds i to map_zoom_level.
func (ltu *LocationTypeUpdate) AddMapZoomLevel(i int) *LocationTypeUpdate {
	ltu.mutation.AddMapZoomLevel(i)
	return ltu
}

// ClearMapZoomLevel clears the value of map_zoom_level.
func (ltu *LocationTypeUpdate) ClearMapZoomLevel() *LocationTypeUpdate {
	ltu.mutation.ClearMapZoomLevel()
	return ltu
}

// SetIndex sets the index field.
func (ltu *LocationTypeUpdate) SetIndex(i int) *LocationTypeUpdate {
	ltu.mutation.ResetIndex()
	ltu.mutation.SetIndex(i)
	return ltu
}

// SetNillableIndex sets the index field if the given value is not nil.
func (ltu *LocationTypeUpdate) SetNillableIndex(i *int) *LocationTypeUpdate {
	if i != nil {
		ltu.SetIndex(*i)
	}
	return ltu
}

// AddIndex adds i to index.
func (ltu *LocationTypeUpdate) AddIndex(i int) *LocationTypeUpdate {
	ltu.mutation.AddIndex(i)
	return ltu
}

// AddLocationIDs adds the locations edge to Location by ids.
func (ltu *LocationTypeUpdate) AddLocationIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.AddLocationIDs(ids...)
	return ltu
}

// AddLocations adds the locations edges to Location.
func (ltu *LocationTypeUpdate) AddLocations(l ...*Location) *LocationTypeUpdate {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return ltu.AddLocationIDs(ids...)
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (ltu *LocationTypeUpdate) AddPropertyTypeIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.AddPropertyTypeIDs(ids...)
	return ltu
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (ltu *LocationTypeUpdate) AddPropertyTypes(p ...*PropertyType) *LocationTypeUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ltu.AddPropertyTypeIDs(ids...)
}

// AddFileCategoryTypeIDs adds the file_category_type edge to FileCategoryType by ids.
func (ltu *LocationTypeUpdate) AddFileCategoryTypeIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.AddFileCategoryTypeIDs(ids...)
	return ltu
}

// AddFileCategoryType adds the file_category_type edges to FileCategoryType.
func (ltu *LocationTypeUpdate) AddFileCategoryType(f ...*FileCategoryType) *LocationTypeUpdate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ltu.AddFileCategoryTypeIDs(ids...)
}

// AddSurveyTemplateCategoryIDs adds the survey_template_categories edge to SurveyTemplateCategory by ids.
func (ltu *LocationTypeUpdate) AddSurveyTemplateCategoryIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.AddSurveyTemplateCategoryIDs(ids...)
	return ltu
}

// AddSurveyTemplateCategories adds the survey_template_categories edges to SurveyTemplateCategory.
func (ltu *LocationTypeUpdate) AddSurveyTemplateCategories(s ...*SurveyTemplateCategory) *LocationTypeUpdate {
	ids := make([]int, len(s))
	for i := range s {
		ids[i] = s[i].ID
	}
	return ltu.AddSurveyTemplateCategoryIDs(ids...)
}

// Mutation returns the LocationTypeMutation object of the builder.
func (ltu *LocationTypeUpdate) Mutation() *LocationTypeMutation {
	return ltu.mutation
}

// ClearLocations clears all "locations" edges to type Location.
func (ltu *LocationTypeUpdate) ClearLocations() *LocationTypeUpdate {
	ltu.mutation.ClearLocations()
	return ltu
}

// RemoveLocationIDs removes the locations edge to Location by ids.
func (ltu *LocationTypeUpdate) RemoveLocationIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.RemoveLocationIDs(ids...)
	return ltu
}

// RemoveLocations removes locations edges to Location.
func (ltu *LocationTypeUpdate) RemoveLocations(l ...*Location) *LocationTypeUpdate {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return ltu.RemoveLocationIDs(ids...)
}

// ClearPropertyTypes clears all "property_types" edges to type PropertyType.
func (ltu *LocationTypeUpdate) ClearPropertyTypes() *LocationTypeUpdate {
	ltu.mutation.ClearPropertyTypes()
	return ltu
}

// RemovePropertyTypeIDs removes the property_types edge to PropertyType by ids.
func (ltu *LocationTypeUpdate) RemovePropertyTypeIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.RemovePropertyTypeIDs(ids...)
	return ltu
}

// RemovePropertyTypes removes property_types edges to PropertyType.
func (ltu *LocationTypeUpdate) RemovePropertyTypes(p ...*PropertyType) *LocationTypeUpdate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ltu.RemovePropertyTypeIDs(ids...)
}

// ClearFileCategoryType clears all "file_category_type" edges to type FileCategoryType.
func (ltu *LocationTypeUpdate) ClearFileCategoryType() *LocationTypeUpdate {
	ltu.mutation.ClearFileCategoryType()
	return ltu
}

// RemoveFileCategoryTypeIDs removes the file_category_type edge to FileCategoryType by ids.
func (ltu *LocationTypeUpdate) RemoveFileCategoryTypeIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.RemoveFileCategoryTypeIDs(ids...)
	return ltu
}

// RemoveFileCategoryType removes file_category_type edges to FileCategoryType.
func (ltu *LocationTypeUpdate) RemoveFileCategoryType(f ...*FileCategoryType) *LocationTypeUpdate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ltu.RemoveFileCategoryTypeIDs(ids...)
}

// ClearSurveyTemplateCategories clears all "survey_template_categories" edges to type SurveyTemplateCategory.
func (ltu *LocationTypeUpdate) ClearSurveyTemplateCategories() *LocationTypeUpdate {
	ltu.mutation.ClearSurveyTemplateCategories()
	return ltu
}

// RemoveSurveyTemplateCategoryIDs removes the survey_template_categories edge to SurveyTemplateCategory by ids.
func (ltu *LocationTypeUpdate) RemoveSurveyTemplateCategoryIDs(ids ...int) *LocationTypeUpdate {
	ltu.mutation.RemoveSurveyTemplateCategoryIDs(ids...)
	return ltu
}

// RemoveSurveyTemplateCategories removes survey_template_categories edges to SurveyTemplateCategory.
func (ltu *LocationTypeUpdate) RemoveSurveyTemplateCategories(s ...*SurveyTemplateCategory) *LocationTypeUpdate {
	ids := make([]int, len(s))
	for i := range s {
		ids[i] = s[i].ID
	}
	return ltu.RemoveSurveyTemplateCategoryIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ltu *LocationTypeUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	ltu.defaults()
	if len(ltu.hooks) == 0 {
		affected, err = ltu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*LocationTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ltu.mutation = mutation
			affected, err = ltu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ltu.hooks) - 1; i >= 0; i-- {
			mut = ltu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ltu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ltu *LocationTypeUpdate) SaveX(ctx context.Context) int {
	affected, err := ltu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ltu *LocationTypeUpdate) Exec(ctx context.Context) error {
	_, err := ltu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ltu *LocationTypeUpdate) ExecX(ctx context.Context) {
	if err := ltu.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ltu *LocationTypeUpdate) defaults() {
	if _, ok := ltu.mutation.UpdateTime(); !ok {
		v := locationtype.UpdateDefaultUpdateTime()
		ltu.mutation.SetUpdateTime(v)
	}
}

func (ltu *LocationTypeUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   locationtype.Table,
			Columns: locationtype.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: locationtype.FieldID,
			},
		},
	}
	if ps := ltu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ltu.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: locationtype.FieldUpdateTime,
		})
	}
	if value, ok := ltu.mutation.Site(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: locationtype.FieldSite,
		})
	}
	if value, ok := ltu.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldName,
		})
	}
	if value, ok := ltu.mutation.MapType(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldMapType,
		})
	}
	if ltu.mutation.MapTypeCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: locationtype.FieldMapType,
		})
	}
	if value, ok := ltu.mutation.MapZoomLevel(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if value, ok := ltu.mutation.AddedMapZoomLevel(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if ltu.mutation.MapZoomLevelCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if value, ok := ltu.mutation.Index(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldIndex,
		})
	}
	if value, ok := ltu.mutation.AddedIndex(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldIndex,
		})
	}
	if ltu.mutation.LocationsCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.RemovedLocationsIDs(); len(nodes) > 0 && !ltu.mutation.LocationsCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.LocationsIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltu.mutation.PropertyTypesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.RemovedPropertyTypesIDs(); len(nodes) > 0 && !ltu.mutation.PropertyTypesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.PropertyTypesIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltu.mutation.FileCategoryTypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.RemovedFileCategoryTypeIDs(); len(nodes) > 0 && !ltu.mutation.FileCategoryTypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.FileCategoryTypeIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltu.mutation.SurveyTemplateCategoriesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.RemovedSurveyTemplateCategoriesIDs(); len(nodes) > 0 && !ltu.mutation.SurveyTemplateCategoriesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltu.mutation.SurveyTemplateCategoriesIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ltu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{locationtype.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// LocationTypeUpdateOne is the builder for updating a single LocationType entity.
type LocationTypeUpdateOne struct {
	config
	hooks    []Hook
	mutation *LocationTypeMutation
}

// SetSite sets the site field.
func (ltuo *LocationTypeUpdateOne) SetSite(b bool) *LocationTypeUpdateOne {
	ltuo.mutation.SetSite(b)
	return ltuo
}

// SetNillableSite sets the site field if the given value is not nil.
func (ltuo *LocationTypeUpdateOne) SetNillableSite(b *bool) *LocationTypeUpdateOne {
	if b != nil {
		ltuo.SetSite(*b)
	}
	return ltuo
}

// SetName sets the name field.
func (ltuo *LocationTypeUpdateOne) SetName(s string) *LocationTypeUpdateOne {
	ltuo.mutation.SetName(s)
	return ltuo
}

// SetMapType sets the map_type field.
func (ltuo *LocationTypeUpdateOne) SetMapType(s string) *LocationTypeUpdateOne {
	ltuo.mutation.SetMapType(s)
	return ltuo
}

// SetNillableMapType sets the map_type field if the given value is not nil.
func (ltuo *LocationTypeUpdateOne) SetNillableMapType(s *string) *LocationTypeUpdateOne {
	if s != nil {
		ltuo.SetMapType(*s)
	}
	return ltuo
}

// ClearMapType clears the value of map_type.
func (ltuo *LocationTypeUpdateOne) ClearMapType() *LocationTypeUpdateOne {
	ltuo.mutation.ClearMapType()
	return ltuo
}

// SetMapZoomLevel sets the map_zoom_level field.
func (ltuo *LocationTypeUpdateOne) SetMapZoomLevel(i int) *LocationTypeUpdateOne {
	ltuo.mutation.ResetMapZoomLevel()
	ltuo.mutation.SetMapZoomLevel(i)
	return ltuo
}

// SetNillableMapZoomLevel sets the map_zoom_level field if the given value is not nil.
func (ltuo *LocationTypeUpdateOne) SetNillableMapZoomLevel(i *int) *LocationTypeUpdateOne {
	if i != nil {
		ltuo.SetMapZoomLevel(*i)
	}
	return ltuo
}

// AddMapZoomLevel adds i to map_zoom_level.
func (ltuo *LocationTypeUpdateOne) AddMapZoomLevel(i int) *LocationTypeUpdateOne {
	ltuo.mutation.AddMapZoomLevel(i)
	return ltuo
}

// ClearMapZoomLevel clears the value of map_zoom_level.
func (ltuo *LocationTypeUpdateOne) ClearMapZoomLevel() *LocationTypeUpdateOne {
	ltuo.mutation.ClearMapZoomLevel()
	return ltuo
}

// SetIndex sets the index field.
func (ltuo *LocationTypeUpdateOne) SetIndex(i int) *LocationTypeUpdateOne {
	ltuo.mutation.ResetIndex()
	ltuo.mutation.SetIndex(i)
	return ltuo
}

// SetNillableIndex sets the index field if the given value is not nil.
func (ltuo *LocationTypeUpdateOne) SetNillableIndex(i *int) *LocationTypeUpdateOne {
	if i != nil {
		ltuo.SetIndex(*i)
	}
	return ltuo
}

// AddIndex adds i to index.
func (ltuo *LocationTypeUpdateOne) AddIndex(i int) *LocationTypeUpdateOne {
	ltuo.mutation.AddIndex(i)
	return ltuo
}

// AddLocationIDs adds the locations edge to Location by ids.
func (ltuo *LocationTypeUpdateOne) AddLocationIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.AddLocationIDs(ids...)
	return ltuo
}

// AddLocations adds the locations edges to Location.
func (ltuo *LocationTypeUpdateOne) AddLocations(l ...*Location) *LocationTypeUpdateOne {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return ltuo.AddLocationIDs(ids...)
}

// AddPropertyTypeIDs adds the property_types edge to PropertyType by ids.
func (ltuo *LocationTypeUpdateOne) AddPropertyTypeIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.AddPropertyTypeIDs(ids...)
	return ltuo
}

// AddPropertyTypes adds the property_types edges to PropertyType.
func (ltuo *LocationTypeUpdateOne) AddPropertyTypes(p ...*PropertyType) *LocationTypeUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ltuo.AddPropertyTypeIDs(ids...)
}

// AddFileCategoryTypeIDs adds the file_category_type edge to FileCategoryType by ids.
func (ltuo *LocationTypeUpdateOne) AddFileCategoryTypeIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.AddFileCategoryTypeIDs(ids...)
	return ltuo
}

// AddFileCategoryType adds the file_category_type edges to FileCategoryType.
func (ltuo *LocationTypeUpdateOne) AddFileCategoryType(f ...*FileCategoryType) *LocationTypeUpdateOne {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ltuo.AddFileCategoryTypeIDs(ids...)
}

// AddSurveyTemplateCategoryIDs adds the survey_template_categories edge to SurveyTemplateCategory by ids.
func (ltuo *LocationTypeUpdateOne) AddSurveyTemplateCategoryIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.AddSurveyTemplateCategoryIDs(ids...)
	return ltuo
}

// AddSurveyTemplateCategories adds the survey_template_categories edges to SurveyTemplateCategory.
func (ltuo *LocationTypeUpdateOne) AddSurveyTemplateCategories(s ...*SurveyTemplateCategory) *LocationTypeUpdateOne {
	ids := make([]int, len(s))
	for i := range s {
		ids[i] = s[i].ID
	}
	return ltuo.AddSurveyTemplateCategoryIDs(ids...)
}

// Mutation returns the LocationTypeMutation object of the builder.
func (ltuo *LocationTypeUpdateOne) Mutation() *LocationTypeMutation {
	return ltuo.mutation
}

// ClearLocations clears all "locations" edges to type Location.
func (ltuo *LocationTypeUpdateOne) ClearLocations() *LocationTypeUpdateOne {
	ltuo.mutation.ClearLocations()
	return ltuo
}

// RemoveLocationIDs removes the locations edge to Location by ids.
func (ltuo *LocationTypeUpdateOne) RemoveLocationIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.RemoveLocationIDs(ids...)
	return ltuo
}

// RemoveLocations removes locations edges to Location.
func (ltuo *LocationTypeUpdateOne) RemoveLocations(l ...*Location) *LocationTypeUpdateOne {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return ltuo.RemoveLocationIDs(ids...)
}

// ClearPropertyTypes clears all "property_types" edges to type PropertyType.
func (ltuo *LocationTypeUpdateOne) ClearPropertyTypes() *LocationTypeUpdateOne {
	ltuo.mutation.ClearPropertyTypes()
	return ltuo
}

// RemovePropertyTypeIDs removes the property_types edge to PropertyType by ids.
func (ltuo *LocationTypeUpdateOne) RemovePropertyTypeIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.RemovePropertyTypeIDs(ids...)
	return ltuo
}

// RemovePropertyTypes removes property_types edges to PropertyType.
func (ltuo *LocationTypeUpdateOne) RemovePropertyTypes(p ...*PropertyType) *LocationTypeUpdateOne {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ltuo.RemovePropertyTypeIDs(ids...)
}

// ClearFileCategoryType clears all "file_category_type" edges to type FileCategoryType.
func (ltuo *LocationTypeUpdateOne) ClearFileCategoryType() *LocationTypeUpdateOne {
	ltuo.mutation.ClearFileCategoryType()
	return ltuo
}

// RemoveFileCategoryTypeIDs removes the file_category_type edge to FileCategoryType by ids.
func (ltuo *LocationTypeUpdateOne) RemoveFileCategoryTypeIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.RemoveFileCategoryTypeIDs(ids...)
	return ltuo
}

// RemoveFileCategoryType removes file_category_type edges to FileCategoryType.
func (ltuo *LocationTypeUpdateOne) RemoveFileCategoryType(f ...*FileCategoryType) *LocationTypeUpdateOne {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return ltuo.RemoveFileCategoryTypeIDs(ids...)
}

// ClearSurveyTemplateCategories clears all "survey_template_categories" edges to type SurveyTemplateCategory.
func (ltuo *LocationTypeUpdateOne) ClearSurveyTemplateCategories() *LocationTypeUpdateOne {
	ltuo.mutation.ClearSurveyTemplateCategories()
	return ltuo
}

// RemoveSurveyTemplateCategoryIDs removes the survey_template_categories edge to SurveyTemplateCategory by ids.
func (ltuo *LocationTypeUpdateOne) RemoveSurveyTemplateCategoryIDs(ids ...int) *LocationTypeUpdateOne {
	ltuo.mutation.RemoveSurveyTemplateCategoryIDs(ids...)
	return ltuo
}

// RemoveSurveyTemplateCategories removes survey_template_categories edges to SurveyTemplateCategory.
func (ltuo *LocationTypeUpdateOne) RemoveSurveyTemplateCategories(s ...*SurveyTemplateCategory) *LocationTypeUpdateOne {
	ids := make([]int, len(s))
	for i := range s {
		ids[i] = s[i].ID
	}
	return ltuo.RemoveSurveyTemplateCategoryIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (ltuo *LocationTypeUpdateOne) Save(ctx context.Context) (*LocationType, error) {
	var (
		err  error
		node *LocationType
	)
	ltuo.defaults()
	if len(ltuo.hooks) == 0 {
		node, err = ltuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*LocationTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ltuo.mutation = mutation
			node, err = ltuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ltuo.hooks) - 1; i >= 0; i-- {
			mut = ltuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ltuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ltuo *LocationTypeUpdateOne) SaveX(ctx context.Context) *LocationType {
	node, err := ltuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ltuo *LocationTypeUpdateOne) Exec(ctx context.Context) error {
	_, err := ltuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ltuo *LocationTypeUpdateOne) ExecX(ctx context.Context) {
	if err := ltuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ltuo *LocationTypeUpdateOne) defaults() {
	if _, ok := ltuo.mutation.UpdateTime(); !ok {
		v := locationtype.UpdateDefaultUpdateTime()
		ltuo.mutation.SetUpdateTime(v)
	}
}

func (ltuo *LocationTypeUpdateOne) sqlSave(ctx context.Context) (_node *LocationType, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   locationtype.Table,
			Columns: locationtype.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: locationtype.FieldID,
			},
		},
	}
	id, ok := ltuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing LocationType.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := ltuo.mutation.UpdateTime(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: locationtype.FieldUpdateTime,
		})
	}
	if value, ok := ltuo.mutation.Site(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: locationtype.FieldSite,
		})
	}
	if value, ok := ltuo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldName,
		})
	}
	if value, ok := ltuo.mutation.MapType(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: locationtype.FieldMapType,
		})
	}
	if ltuo.mutation.MapTypeCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Column: locationtype.FieldMapType,
		})
	}
	if value, ok := ltuo.mutation.MapZoomLevel(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if value, ok := ltuo.mutation.AddedMapZoomLevel(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if ltuo.mutation.MapZoomLevelCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Column: locationtype.FieldMapZoomLevel,
		})
	}
	if value, ok := ltuo.mutation.Index(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldIndex,
		})
	}
	if value, ok := ltuo.mutation.AddedIndex(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: locationtype.FieldIndex,
		})
	}
	if ltuo.mutation.LocationsCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.RemovedLocationsIDs(); len(nodes) > 0 && !ltuo.mutation.LocationsCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.LocationsIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltuo.mutation.PropertyTypesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.RemovedPropertyTypesIDs(); len(nodes) > 0 && !ltuo.mutation.PropertyTypesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.PropertyTypesIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltuo.mutation.FileCategoryTypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.RemovedFileCategoryTypeIDs(); len(nodes) > 0 && !ltuo.mutation.FileCategoryTypeCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.FileCategoryTypeIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if ltuo.mutation.SurveyTemplateCategoriesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.RemovedSurveyTemplateCategoriesIDs(); len(nodes) > 0 && !ltuo.mutation.SurveyTemplateCategoriesCleared() {
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ltuo.mutation.SurveyTemplateCategoriesIDs(); len(nodes) > 0 {
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
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &LocationType{config: ltuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, ltuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{locationtype.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
