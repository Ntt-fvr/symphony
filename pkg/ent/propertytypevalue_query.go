// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"errors"
	"fmt"
	"math"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
)

// PropertyTypeValueQuery is the builder for querying PropertyTypeValue entities.
type PropertyTypeValueQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.PropertyTypeValue
	// eager-loading edges.
	withPropertyType                *PropertyTypeQuery
	withPropertyTypeValueDependence *PropertyTypeValueQuery
	withPropertyTypeValue           *PropertyTypeValueQuery
	withFKs                         bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (ptvq *PropertyTypeValueQuery) Where(ps ...predicate.PropertyTypeValue) *PropertyTypeValueQuery {
	ptvq.predicates = append(ptvq.predicates, ps...)
	return ptvq
}

// Limit adds a limit step to the query.
func (ptvq *PropertyTypeValueQuery) Limit(limit int) *PropertyTypeValueQuery {
	ptvq.limit = &limit
	return ptvq
}

// Offset adds an offset step to the query.
func (ptvq *PropertyTypeValueQuery) Offset(offset int) *PropertyTypeValueQuery {
	ptvq.offset = &offset
	return ptvq
}

// Order adds an order step to the query.
func (ptvq *PropertyTypeValueQuery) Order(o ...OrderFunc) *PropertyTypeValueQuery {
	ptvq.order = append(ptvq.order, o...)
	return ptvq
}

// QueryPropertyType chains the current query on the property_type edge.
func (ptvq *PropertyTypeValueQuery) QueryPropertyType() *PropertyTypeQuery {
	query := &PropertyTypeQuery{config: ptvq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptvq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ptvq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(propertytypevalue.Table, propertytypevalue.FieldID, selector),
			sqlgraph.To(propertytype.Table, propertytype.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, propertytypevalue.PropertyTypeTable, propertytypevalue.PropertyTypeColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptvq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryPropertyTypeValueDependence chains the current query on the property_type_value_dependence edge.
func (ptvq *PropertyTypeValueQuery) QueryPropertyTypeValueDependence() *PropertyTypeValueQuery {
	query := &PropertyTypeValueQuery{config: ptvq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptvq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ptvq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(propertytypevalue.Table, propertytypevalue.FieldID, selector),
			sqlgraph.To(propertytypevalue.Table, propertytypevalue.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, propertytypevalue.PropertyTypeValueDependenceTable, propertytypevalue.PropertyTypeValueDependenceColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptvq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryPropertyTypeValue chains the current query on the property_type_value edge.
func (ptvq *PropertyTypeValueQuery) QueryPropertyTypeValue() *PropertyTypeValueQuery {
	query := &PropertyTypeValueQuery{config: ptvq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ptvq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ptvq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(propertytypevalue.Table, propertytypevalue.FieldID, selector),
			sqlgraph.To(propertytypevalue.Table, propertytypevalue.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, propertytypevalue.PropertyTypeValueTable, propertytypevalue.PropertyTypeValueColumn),
		)
		fromU = sqlgraph.SetNeighbors(ptvq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first PropertyTypeValue entity in the query. Returns *NotFoundError when no propertytypevalue was found.
func (ptvq *PropertyTypeValueQuery) First(ctx context.Context) (*PropertyTypeValue, error) {
	nodes, err := ptvq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{propertytypevalue.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) FirstX(ctx context.Context) *PropertyTypeValue {
	node, err := ptvq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first PropertyTypeValue id in the query. Returns *NotFoundError when no id was found.
func (ptvq *PropertyTypeValueQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ptvq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{propertytypevalue.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) FirstIDX(ctx context.Context) int {
	id, err := ptvq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only PropertyTypeValue entity in the query, returns an error if not exactly one entity was returned.
func (ptvq *PropertyTypeValueQuery) Only(ctx context.Context) (*PropertyTypeValue, error) {
	nodes, err := ptvq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{propertytypevalue.Label}
	default:
		return nil, &NotSingularError{propertytypevalue.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) OnlyX(ctx context.Context) *PropertyTypeValue {
	node, err := ptvq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only PropertyTypeValue id in the query, returns an error if not exactly one id was returned.
func (ptvq *PropertyTypeValueQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ptvq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = &NotSingularError{propertytypevalue.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) OnlyIDX(ctx context.Context) int {
	id, err := ptvq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of PropertyTypeValues.
func (ptvq *PropertyTypeValueQuery) All(ctx context.Context) ([]*PropertyTypeValue, error) {
	if err := ptvq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ptvq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) AllX(ctx context.Context) []*PropertyTypeValue {
	nodes, err := ptvq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of PropertyTypeValue ids.
func (ptvq *PropertyTypeValueQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := ptvq.Select(propertytypevalue.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) IDsX(ctx context.Context) []int {
	ids, err := ptvq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ptvq *PropertyTypeValueQuery) Count(ctx context.Context) (int, error) {
	if err := ptvq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ptvq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) CountX(ctx context.Context) int {
	count, err := ptvq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ptvq *PropertyTypeValueQuery) Exist(ctx context.Context) (bool, error) {
	if err := ptvq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ptvq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ptvq *PropertyTypeValueQuery) ExistX(ctx context.Context) bool {
	exist, err := ptvq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ptvq *PropertyTypeValueQuery) Clone() *PropertyTypeValueQuery {
	if ptvq == nil {
		return nil
	}
	return &PropertyTypeValueQuery{
		config:                          ptvq.config,
		limit:                           ptvq.limit,
		offset:                          ptvq.offset,
		order:                           append([]OrderFunc{}, ptvq.order...),
		unique:                          append([]string{}, ptvq.unique...),
		predicates:                      append([]predicate.PropertyTypeValue{}, ptvq.predicates...),
		withPropertyType:                ptvq.withPropertyType.Clone(),
		withPropertyTypeValueDependence: ptvq.withPropertyTypeValueDependence.Clone(),
		withPropertyTypeValue:           ptvq.withPropertyTypeValue.Clone(),
		// clone intermediate query.
		sql:  ptvq.sql.Clone(),
		path: ptvq.path,
	}
}

//  WithPropertyType tells the query-builder to eager-loads the nodes that are connected to
// the "property_type" edge. The optional arguments used to configure the query builder of the edge.
func (ptvq *PropertyTypeValueQuery) WithPropertyType(opts ...func(*PropertyTypeQuery)) *PropertyTypeValueQuery {
	query := &PropertyTypeQuery{config: ptvq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptvq.withPropertyType = query
	return ptvq
}

//  WithPropertyTypeValueDependence tells the query-builder to eager-loads the nodes that are connected to
// the "property_type_value_dependence" edge. The optional arguments used to configure the query builder of the edge.
func (ptvq *PropertyTypeValueQuery) WithPropertyTypeValueDependence(opts ...func(*PropertyTypeValueQuery)) *PropertyTypeValueQuery {
	query := &PropertyTypeValueQuery{config: ptvq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptvq.withPropertyTypeValueDependence = query
	return ptvq
}

//  WithPropertyTypeValue tells the query-builder to eager-loads the nodes that are connected to
// the "property_type_value" edge. The optional arguments used to configure the query builder of the edge.
func (ptvq *PropertyTypeValueQuery) WithPropertyTypeValue(opts ...func(*PropertyTypeValueQuery)) *PropertyTypeValueQuery {
	query := &PropertyTypeValueQuery{config: ptvq.config}
	for _, opt := range opts {
		opt(query)
	}
	ptvq.withPropertyTypeValue = query
	return ptvq
}

// GroupBy used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		CreateTime time.Time `json:"create_time,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.PropertyTypeValue.Query().
//		GroupBy(propertytypevalue.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ptvq *PropertyTypeValueQuery) GroupBy(field string, fields ...string) *PropertyTypeValueGroupBy {
	group := &PropertyTypeValueGroupBy{config: ptvq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ptvq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ptvq.sqlQuery(), nil
	}
	return group
}

// Select one or more fields from the given query.
//
// Example:
//
//	var v []struct {
//		CreateTime time.Time `json:"create_time,omitempty"`
//	}
//
//	client.PropertyTypeValue.Query().
//		Select(propertytypevalue.FieldCreateTime).
//		Scan(ctx, &v)
//
func (ptvq *PropertyTypeValueQuery) Select(field string, fields ...string) *PropertyTypeValueSelect {
	selector := &PropertyTypeValueSelect{config: ptvq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ptvq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ptvq.sqlQuery(), nil
	}
	return selector
}

func (ptvq *PropertyTypeValueQuery) prepareQuery(ctx context.Context) error {
	if ptvq.path != nil {
		prev, err := ptvq.path(ctx)
		if err != nil {
			return err
		}
		ptvq.sql = prev
	}
	if err := propertytypevalue.Policy.EvalQuery(ctx, ptvq); err != nil {
		return err
	}
	return nil
}

func (ptvq *PropertyTypeValueQuery) sqlAll(ctx context.Context) ([]*PropertyTypeValue, error) {
	var (
		nodes       = []*PropertyTypeValue{}
		withFKs     = ptvq.withFKs
		_spec       = ptvq.querySpec()
		loadedTypes = [3]bool{
			ptvq.withPropertyType != nil,
			ptvq.withPropertyTypeValueDependence != nil,
			ptvq.withPropertyTypeValue != nil,
		}
	)
	if ptvq.withPropertyType != nil || ptvq.withPropertyTypeValueDependence != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, propertytypevalue.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &PropertyTypeValue{config: ptvq.config}
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
	if err := sqlgraph.QueryNodes(ctx, ptvq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := ptvq.withPropertyType; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*PropertyTypeValue)
		for i := range nodes {
			if fk := nodes[i].property_type_property_type_values; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(propertytype.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "property_type_property_type_values" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.PropertyType = n
			}
		}
	}

	if query := ptvq.withPropertyTypeValueDependence; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*PropertyTypeValue)
		for i := range nodes {
			if fk := nodes[i].property_type_value_property_type_value; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(propertytypevalue.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "property_type_value_property_type_value" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.PropertyTypeValueDependence = n
			}
		}
	}

	if query := ptvq.withPropertyTypeValue; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*PropertyTypeValue)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.PropertyTypeValue = []*PropertyTypeValue{}
		}
		query.withFKs = true
		query.Where(predicate.PropertyTypeValue(func(s *sql.Selector) {
			s.Where(sql.InValues(propertytypevalue.PropertyTypeValueColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.property_type_value_property_type_value
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "property_type_value_property_type_value" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "property_type_value_property_type_value" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.PropertyTypeValue = append(node.Edges.PropertyTypeValue, n)
		}
	}

	return nodes, nil
}

func (ptvq *PropertyTypeValueQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ptvq.querySpec()
	return sqlgraph.CountNodes(ctx, ptvq.driver, _spec)
}

func (ptvq *PropertyTypeValueQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ptvq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (ptvq *PropertyTypeValueQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   propertytypevalue.Table,
			Columns: propertytypevalue.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: propertytypevalue.FieldID,
			},
		},
		From:   ptvq.sql,
		Unique: true,
	}
	if ps := ptvq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ptvq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ptvq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ptvq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, propertytypevalue.ValidColumn)
			}
		}
	}
	return _spec
}

func (ptvq *PropertyTypeValueQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(ptvq.driver.Dialect())
	t1 := builder.Table(propertytypevalue.Table)
	selector := builder.Select(t1.Columns(propertytypevalue.Columns...)...).From(t1)
	if ptvq.sql != nil {
		selector = ptvq.sql
		selector.Select(selector.Columns(propertytypevalue.Columns...)...)
	}
	for _, p := range ptvq.predicates {
		p(selector)
	}
	for _, p := range ptvq.order {
		p(selector, propertytypevalue.ValidColumn)
	}
	if offset := ptvq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ptvq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// PropertyTypeValueGroupBy is the builder for group-by PropertyTypeValue entities.
type PropertyTypeValueGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ptvgb *PropertyTypeValueGroupBy) Aggregate(fns ...AggregateFunc) *PropertyTypeValueGroupBy {
	ptvgb.fns = append(ptvgb.fns, fns...)
	return ptvgb
}

// Scan applies the group-by query and scan the result into the given value.
func (ptvgb *PropertyTypeValueGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ptvgb.path(ctx)
	if err != nil {
		return err
	}
	ptvgb.sql = query
	return ptvgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ptvgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ptvgb.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ptvgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) StringsX(ctx context.Context) []string {
	v, err := ptvgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ptvgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) StringX(ctx context.Context) string {
	v, err := ptvgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ptvgb.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ptvgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) IntsX(ctx context.Context) []int {
	v, err := ptvgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ptvgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) IntX(ctx context.Context) int {
	v, err := ptvgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ptvgb.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ptvgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ptvgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ptvgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ptvgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ptvgb.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ptvgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ptvgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (ptvgb *PropertyTypeValueGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ptvgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ptvgb *PropertyTypeValueGroupBy) BoolX(ctx context.Context) bool {
	v, err := ptvgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ptvgb *PropertyTypeValueGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ptvgb.fields {
		if !propertytypevalue.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := ptvgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ptvgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ptvgb *PropertyTypeValueGroupBy) sqlQuery() *sql.Selector {
	selector := ptvgb.sql
	columns := make([]string, 0, len(ptvgb.fields)+len(ptvgb.fns))
	columns = append(columns, ptvgb.fields...)
	for _, fn := range ptvgb.fns {
		columns = append(columns, fn(selector, propertytypevalue.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(ptvgb.fields...)
}

// PropertyTypeValueSelect is the builder for select fields of PropertyTypeValue entities.
type PropertyTypeValueSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (ptvs *PropertyTypeValueSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := ptvs.path(ctx)
	if err != nil {
		return err
	}
	ptvs.sql = query
	return ptvs.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) ScanX(ctx context.Context, v interface{}) {
	if err := ptvs.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Strings(ctx context.Context) ([]string, error) {
	if len(ptvs.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := ptvs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) StringsX(ctx context.Context) []string {
	v, err := ptvs.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ptvs.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) StringX(ctx context.Context) string {
	v, err := ptvs.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Ints(ctx context.Context) ([]int, error) {
	if len(ptvs.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := ptvs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) IntsX(ctx context.Context) []int {
	v, err := ptvs.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ptvs.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) IntX(ctx context.Context) int {
	v, err := ptvs.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(ptvs.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := ptvs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) Float64sX(ctx context.Context) []float64 {
	v, err := ptvs.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ptvs.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) Float64X(ctx context.Context) float64 {
	v, err := ptvs.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(ptvs.fields) > 1 {
		return nil, errors.New("ent: PropertyTypeValueSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := ptvs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) BoolsX(ctx context.Context) []bool {
	v, err := ptvs.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (ptvs *PropertyTypeValueSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ptvs.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{propertytypevalue.Label}
	default:
		err = fmt.Errorf("ent: PropertyTypeValueSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ptvs *PropertyTypeValueSelect) BoolX(ctx context.Context) bool {
	v, err := ptvs.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ptvs *PropertyTypeValueSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ptvs.fields {
		if !propertytypevalue.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := ptvs.sqlQuery().Query()
	if err := ptvs.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ptvs *PropertyTypeValueSelect) sqlQuery() sql.Querier {
	selector := ptvs.sql
	selector.Select(selector.Columns(ptvs.fields...)...)
	return selector
}
