// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"errors"
	"fmt"
	"math"

	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/workorderdefinition"
)

// ProjectTemplateQuery is the builder for querying ProjectTemplate entities.
type ProjectTemplateQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.ProjectTemplate
	// eager-loading edges.
	withProperties *PropertyTypeQuery
	withWorkOrders *WorkOrderDefinitionQuery
	withType       *ProjectTypeQuery
	withFKs        bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (ptq *ProjectTemplateQuery) Where(ps ...predicate.ProjectTemplate) *ProjectTemplateQuery {
	ptq.predicates = append(ptq.predicates, ps...)
	return ptq
}

// Limit adds a limit step to the query.
func (ptq *ProjectTemplateQuery) Limit(limit int) *ProjectTemplateQuery {
	ptq.limit = &limit
	return ptq
}

// Offset adds an offset step to the query.
func (ptq *ProjectTemplateQuery) Offset(offset int) *ProjectTemplateQuery {
	ptq.offset = &offset
	return ptq
}

// Order adds an order step to the query.
func (ptq *ProjectTemplateQuery) Order(o ...OrderFunc) *ProjectTemplateQuery {
	ptq.order = append(ptq.order, o...)
	return ptq
}

// QueryProperties chains the current query on the properties edge.
func (ptq *ProjectTemplateQuery) QueryProperties() *PropertyTypeQuery {
	query := &PropertyTypeQuery{config: ptq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(projecttemplate.Table, projecttemplate.FieldID, ptq.sqlQuery()),
			sqlgraph.To(propertytype.Table, propertytype.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, projecttemplate.PropertiesTable, projecttemplate.PropertiesColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryWorkOrders chains the current query on the work_orders edge.
func (ptq *ProjectTemplateQuery) QueryWorkOrders() *WorkOrderDefinitionQuery {
	query := &WorkOrderDefinitionQuery{config: ptq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(projecttemplate.Table, projecttemplate.FieldID, ptq.sqlQuery()),
			sqlgraph.To(workorderdefinition.Table, workorderdefinition.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, projecttemplate.WorkOrdersTable, projecttemplate.WorkOrdersColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryType chains the current query on the type edge.
func (ptq *ProjectTemplateQuery) QueryType() *ProjectTypeQuery {
	query := &ProjectTypeQuery{config: ptq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(projecttemplate.Table, projecttemplate.FieldID, ptq.sqlQuery()),
			sqlgraph.To(projecttype.Table, projecttype.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, projecttemplate.TypeTable, projecttemplate.TypeColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first ProjectTemplate entity in the query. Returns *NotFoundError when no projecttemplate was found.
func (ptq *ProjectTemplateQuery) First(ctx context.Context) (*ProjectTemplate, error) {
	pts, err := ptq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(pts) == 0 {
		return nil, &NotFoundError{projecttemplate.Label}
	}
	return pts[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) FirstX(ctx context.Context) *ProjectTemplate {
	pt, err := ptq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return pt
}

// FirstID returns the first ProjectTemplate id in the query. Returns *NotFoundError when no id was found.
func (ptq *ProjectTemplateQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ptq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{projecttemplate.Label}
		return
	}
	return ids[0], nil
}

// FirstXID is like FirstID, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) FirstXID(ctx context.Context) int {
	id, err := ptq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only ProjectTemplate entity in the query, returns an error if not exactly one entity was returned.
func (ptq *ProjectTemplateQuery) Only(ctx context.Context) (*ProjectTemplate, error) {
	pts, err := ptq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(pts) {
	case 1:
		return pts[0], nil
	case 0:
		return nil, &NotFoundError{projecttemplate.Label}
	default:
		return nil, &NotSingularError{projecttemplate.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) OnlyX(ctx context.Context) *ProjectTemplate {
	pt, err := ptq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return pt
}

// OnlyID returns the only ProjectTemplate id in the query, returns an error if not exactly one id was returned.
func (ptq *ProjectTemplateQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ptq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = &NotSingularError{projecttemplate.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) OnlyIDX(ctx context.Context) int {
	id, err := ptq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ProjectTemplates.
func (ptq *ProjectTemplateQuery) All(ctx context.Context) ([]*ProjectTemplate, error) {
	if err := ptq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ptq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) AllX(ctx context.Context) []*ProjectTemplate {
	pts, err := ptq.All(ctx)
	if err != nil {
		panic(err)
	}
	return pts
}

// IDs executes the query and returns a list of ProjectTemplate ids.
func (ptq *ProjectTemplateQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := ptq.Select(projecttemplate.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) IDsX(ctx context.Context) []int {
	ids, err := ptq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ptq *ProjectTemplateQuery) Count(ctx context.Context) (int, error) {
	if err := ptq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ptq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) CountX(ctx context.Context) int {
	count, err := ptq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ptq *ProjectTemplateQuery) Exist(ctx context.Context) (bool, error) {
	if err := ptq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ptq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ptq *ProjectTemplateQuery) ExistX(ctx context.Context) bool {
	exist, err := ptq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ptq *ProjectTemplateQuery) Clone() *ProjectTemplateQuery {
	return &ProjectTemplateQuery{
		config:     ptq.config,
		limit:      ptq.limit,
		offset:     ptq.offset,
		order:      append([]OrderFunc{}, ptq.order...),
		unique:     append([]string{}, ptq.unique...),
		predicates: append([]predicate.ProjectTemplate{}, ptq.predicates...),
		// clone intermediate query.
		sql:  ptq.sql.Clone(),
		path: ptq.path,
	}
}

//  WithProperties tells the query-builder to eager-loads the nodes that are connected to
// the "properties" edge. The optional arguments used to configure the query builder of the edge.
func (ptq *ProjectTemplateQuery) WithProperties(opts ...func(*PropertyTypeQuery)) *ProjectTemplateQuery {
	query := &PropertyTypeQuery{config: ptq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptq.withProperties = query
	return ptq
}

//  WithWorkOrders tells the query-builder to eager-loads the nodes that are connected to
// the "work_orders" edge. The optional arguments used to configure the query builder of the edge.
func (ptq *ProjectTemplateQuery) WithWorkOrders(opts ...func(*WorkOrderDefinitionQuery)) *ProjectTemplateQuery {
	query := &WorkOrderDefinitionQuery{config: ptq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptq.withWorkOrders = query
	return ptq
}

//  WithType tells the query-builder to eager-loads the nodes that are connected to
// the "type" edge. The optional arguments used to configure the query builder of the edge.
func (ptq *ProjectTemplateQuery) WithType(opts ...func(*ProjectTypeQuery)) *ProjectTemplateQuery {
	query := &ProjectTypeQuery{config: ptq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptq.withType = query
	return ptq
}

// GroupBy used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.ProjectTemplate.Query().
//		GroupBy(projecttemplate.FieldName).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ptq *ProjectTemplateQuery) GroupBy(field string, fields ...string) *ProjectTemplateGroupBy {
	group := &ProjectTemplateGroupBy{config: ptq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ptq.sqlQuery(), nil
	}
	return group
}

// Select one or more fields from the given query.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//	}
//
//	client.ProjectTemplate.Query().
//		Select(projecttemplate.FieldName).
//		Scan(ctx, &v)
//
func (ptq *ProjectTemplateQuery) Select(field string, fields ...string) *ProjectTemplateSelect {
	selector := &ProjectTemplateSelect{config: ptq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ptq.sqlQuery(), nil
	}
	return selector
}

func (ptq *ProjectTemplateQuery) prepareQuery(ctx context.Context) error {
	if ptq.path != nil {
		prev, err := ptq.path(ctx)
		if err != nil {
			return err
		}
		ptq.sql = prev
	}
	if err := projecttemplate.Policy.EvalQuery(ctx, ptq); err != nil {
		return err
	}
	return nil
}

func (ptq *ProjectTemplateQuery) sqlAll(ctx context.Context) ([]*ProjectTemplate, error) {
	var (
		nodes       = []*ProjectTemplate{}
		withFKs     = ptq.withFKs
		_spec       = ptq.querySpec()
		loadedTypes = [3]bool{
			ptq.withProperties != nil,
			ptq.withWorkOrders != nil,
			ptq.withType != nil,
		}
	)
	if ptq.withType != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, projecttemplate.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &ProjectTemplate{config: ptq.config}
		nodes = append(nodes, node)
		values := node.scanValues()
		if withFKs {
			values = append(values, node.fkValues()...)
		}
		return values
	}
	_spec.Assign = func(values ...interface{}) error {
		if len(nodes) == 0 {
			return fmt.Errorf("ent: Assign called without calling ScanValues")
		}
		node := nodes[len(nodes)-1]
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(values...)
	}
	if err := sqlgraph.QueryNodes(ctx, ptq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := ptq.withProperties; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ProjectTemplate)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
		}
		query.withFKs = true
		query.Where(predicate.PropertyType(func(s *sql.Selector) {
			s.Where(sql.InValues(projecttemplate.PropertiesColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.project_template_properties
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "project_template_properties" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "project_template_properties" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.Properties = append(node.Edges.Properties, n)
		}
	}

	if query := ptq.withWorkOrders; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ProjectTemplate)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
		}
		query.withFKs = true
		query.Where(predicate.WorkOrderDefinition(func(s *sql.Selector) {
			s.Where(sql.InValues(projecttemplate.WorkOrdersColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.project_template_work_orders
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "project_template_work_orders" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "project_template_work_orders" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.WorkOrders = append(node.Edges.WorkOrders, n)
		}
	}

	if query := ptq.withType; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*ProjectTemplate)
		for i := range nodes {
			if fk := nodes[i].project_template_type; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(projecttype.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "project_template_type" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Type = n
			}
		}
	}

	return nodes, nil
}

func (ptq *ProjectTemplateQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ptq.querySpec()
	return sqlgraph.CountNodes(ctx, ptq.driver, _spec)
}

func (ptq *ProjectTemplateQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ptq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (ptq *ProjectTemplateQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   projecttemplate.Table,
			Columns: projecttemplate.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: projecttemplate.FieldID,
			},
		},
		From:   ptq.sql,
		Unique: true,
	}
	if ps := ptq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ptq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ptq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ptq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (ptq *ProjectTemplateQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(ptq.driver.Dialect())
	t1 := builder.Table(projecttemplate.Table)
	selector := builder.Select(t1.Columns(projecttemplate.Columns...)...).From(t1)
	if ptq.sql != nil {
		selector = ptq.sql
		selector.Select(selector.Columns(projecttemplate.Columns...)...)
	}
	for _, p := range ptq.predicates {
		p(selector)
	}
	for _, p := range ptq.order {
		p(selector)
	}
	if offset := ptq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ptq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ProjectTemplateGroupBy is the builder for group-by ProjectTemplate entities.
type ProjectTemplateGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ptgb *ProjectTemplateGroupBy) Aggregate(fns ...AggregateFunc) *ProjectTemplateGroupBy {
	ptgb.fns = append(ptgb.fns, fns...)
	return ptgb
}

// Scan applies the group-by query and scan the result into the given value.
func (ptgb *ProjectTemplateGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ptgb.path(ctx)
	if err != nil {
		return err
	}
	ptgb.sql = query
	return ptgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ptgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ptgb.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ptgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) StringsX(ctx context.Context) []string {
	v, err := ptgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ptgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) StringX(ctx context.Context) string {
	v, err := ptgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ptgb.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ptgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) IntsX(ctx context.Context) []int {
	v, err := ptgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ptgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) IntX(ctx context.Context) int {
	v, err := ptgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ptgb.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ptgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ptgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ptgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ptgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ptgb.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ptgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ptgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (ptgb *ProjectTemplateGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ptgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ptgb *ProjectTemplateGroupBy) BoolX(ctx context.Context) bool {
	v, err := ptgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ptgb *ProjectTemplateGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := ptgb.sqlQuery().Query()
	if err := ptgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ptgb *ProjectTemplateGroupBy) sqlQuery() *sql.Selector {
	selector := ptgb.sql
	columns := make([]string, 0, len(ptgb.fields)+len(ptgb.fns))
	columns = append(columns, ptgb.fields...)
	for _, fn := range ptgb.fns {
		columns = append(columns, fn(selector))
	}
	return selector.Select(columns...).GroupBy(ptgb.fields...)
}

// ProjectTemplateSelect is the builder for select fields of ProjectTemplate entities.
type ProjectTemplateSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (pts *ProjectTemplateSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := pts.path(ctx)
	if err != nil {
		return err
	}
	pts.sql = query
	return pts.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (pts *ProjectTemplateSelect) ScanX(ctx context.Context, v interface{}) {
	if err := pts.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Strings(ctx context.Context) ([]string, error) {
	if len(pts.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := pts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (pts *ProjectTemplateSelect) StringsX(ctx context.Context) []string {
	v, err := pts.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = pts.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (pts *ProjectTemplateSelect) StringX(ctx context.Context) string {
	v, err := pts.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Ints(ctx context.Context) ([]int, error) {
	if len(pts.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := pts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (pts *ProjectTemplateSelect) IntsX(ctx context.Context) []int {
	v, err := pts.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = pts.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (pts *ProjectTemplateSelect) IntX(ctx context.Context) int {
	v, err := pts.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(pts.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := pts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (pts *ProjectTemplateSelect) Float64sX(ctx context.Context) []float64 {
	v, err := pts.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = pts.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (pts *ProjectTemplateSelect) Float64X(ctx context.Context) float64 {
	v, err := pts.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(pts.fields) > 1 {
		return nil, errors.New("ent: ProjectTemplateSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := pts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (pts *ProjectTemplateSelect) BoolsX(ctx context.Context) []bool {
	v, err := pts.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (pts *ProjectTemplateSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = pts.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{projecttemplate.Label}
	default:
		err = fmt.Errorf("ent: ProjectTemplateSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (pts *ProjectTemplateSelect) BoolX(ctx context.Context) bool {
	v, err := pts.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (pts *ProjectTemplateSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := pts.sqlQuery().Query()
	if err := pts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (pts *ProjectTemplateSelect) sqlQuery() sql.Querier {
	selector := pts.sql
	selector.Select(selector.Columns(pts.fields...)...)
	return selector
}