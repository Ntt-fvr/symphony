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
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
)

// ResourceSpecificationRelationshipQuery is the builder for querying ResourceSpecificationRelationship entities.
type ResourceSpecificationRelationshipQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.ResourceSpecificationRelationship
	// eager-loading edges.
	withResourcespecification *ResourceSpecificationQuery
	withResourceSr            *ResourceSpecificationItemsQuery
	withFKs                   bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (rsrq *ResourceSpecificationRelationshipQuery) Where(ps ...predicate.ResourceSpecificationRelationship) *ResourceSpecificationRelationshipQuery {
	rsrq.predicates = append(rsrq.predicates, ps...)
	return rsrq
}

// Limit adds a limit step to the query.
func (rsrq *ResourceSpecificationRelationshipQuery) Limit(limit int) *ResourceSpecificationRelationshipQuery {
	rsrq.limit = &limit
	return rsrq
}

// Offset adds an offset step to the query.
func (rsrq *ResourceSpecificationRelationshipQuery) Offset(offset int) *ResourceSpecificationRelationshipQuery {
	rsrq.offset = &offset
	return rsrq
}

// Order adds an order step to the query.
func (rsrq *ResourceSpecificationRelationshipQuery) Order(o ...OrderFunc) *ResourceSpecificationRelationshipQuery {
	rsrq.order = append(rsrq.order, o...)
	return rsrq
}

// QueryResourcespecification chains the current query on the resourcespecification edge.
func (rsrq *ResourceSpecificationRelationshipQuery) QueryResourcespecification() *ResourceSpecificationQuery {
	query := &ResourceSpecificationQuery{config: rsrq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsrq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecificationrelationship.Table, resourcespecificationrelationship.FieldID, selector),
			sqlgraph.To(resourcespecification.Table, resourcespecification.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, resourcespecificationrelationship.ResourcespecificationTable, resourcespecificationrelationship.ResourcespecificationColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsrq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryResourceSr chains the current query on the resource_sr edge.
func (rsrq *ResourceSpecificationRelationshipQuery) QueryResourceSr() *ResourceSpecificationItemsQuery {
	query := &ResourceSpecificationItemsQuery{config: rsrq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsrq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecificationrelationship.Table, resourcespecificationrelationship.FieldID, selector),
			sqlgraph.To(resourcespecificationitems.Table, resourcespecificationitems.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, resourcespecificationrelationship.ResourceSrTable, resourcespecificationrelationship.ResourceSrColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsrq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first ResourceSpecificationRelationship entity in the query. Returns *NotFoundError when no resourcespecificationrelationship was found.
func (rsrq *ResourceSpecificationRelationshipQuery) First(ctx context.Context) (*ResourceSpecificationRelationship, error) {
	nodes, err := rsrq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{resourcespecificationrelationship.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) FirstX(ctx context.Context) *ResourceSpecificationRelationship {
	node, err := rsrq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first ResourceSpecificationRelationship id in the query. Returns *NotFoundError when no id was found.
func (rsrq *ResourceSpecificationRelationshipQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rsrq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{resourcespecificationrelationship.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) FirstIDX(ctx context.Context) int {
	id, err := rsrq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only ResourceSpecificationRelationship entity in the query, returns an error if not exactly one entity was returned.
func (rsrq *ResourceSpecificationRelationshipQuery) Only(ctx context.Context) (*ResourceSpecificationRelationship, error) {
	nodes, err := rsrq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{resourcespecificationrelationship.Label}
	default:
		return nil, &NotSingularError{resourcespecificationrelationship.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) OnlyX(ctx context.Context) *ResourceSpecificationRelationship {
	node, err := rsrq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only ResourceSpecificationRelationship id in the query, returns an error if not exactly one id was returned.
func (rsrq *ResourceSpecificationRelationshipQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rsrq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = &NotSingularError{resourcespecificationrelationship.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) OnlyIDX(ctx context.Context) int {
	id, err := rsrq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ResourceSpecificationRelationships.
func (rsrq *ResourceSpecificationRelationshipQuery) All(ctx context.Context) ([]*ResourceSpecificationRelationship, error) {
	if err := rsrq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return rsrq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) AllX(ctx context.Context) []*ResourceSpecificationRelationship {
	nodes, err := rsrq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of ResourceSpecificationRelationship ids.
func (rsrq *ResourceSpecificationRelationshipQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := rsrq.Select(resourcespecificationrelationship.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) IDsX(ctx context.Context) []int {
	ids, err := rsrq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (rsrq *ResourceSpecificationRelationshipQuery) Count(ctx context.Context) (int, error) {
	if err := rsrq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return rsrq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) CountX(ctx context.Context) int {
	count, err := rsrq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (rsrq *ResourceSpecificationRelationshipQuery) Exist(ctx context.Context) (bool, error) {
	if err := rsrq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return rsrq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (rsrq *ResourceSpecificationRelationshipQuery) ExistX(ctx context.Context) bool {
	exist, err := rsrq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (rsrq *ResourceSpecificationRelationshipQuery) Clone() *ResourceSpecificationRelationshipQuery {
	if rsrq == nil {
		return nil
	}
	return &ResourceSpecificationRelationshipQuery{
		config:                    rsrq.config,
		limit:                     rsrq.limit,
		offset:                    rsrq.offset,
		order:                     append([]OrderFunc{}, rsrq.order...),
		unique:                    append([]string{}, rsrq.unique...),
		predicates:                append([]predicate.ResourceSpecificationRelationship{}, rsrq.predicates...),
		withResourcespecification: rsrq.withResourcespecification.Clone(),
		withResourceSr:            rsrq.withResourceSr.Clone(),
		// clone intermediate query.
		sql:  rsrq.sql.Clone(),
		path: rsrq.path,
	}
}

//  WithResourcespecification tells the query-builder to eager-loads the nodes that are connected to
// the "resourcespecification" edge. The optional arguments used to configure the query builder of the edge.
func (rsrq *ResourceSpecificationRelationshipQuery) WithResourcespecification(opts ...func(*ResourceSpecificationQuery)) *ResourceSpecificationRelationshipQuery {
	query := &ResourceSpecificationQuery{config: rsrq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsrq.withResourcespecification = query
	return rsrq
}

//  WithResourceSr tells the query-builder to eager-loads the nodes that are connected to
// the "resource_sr" edge. The optional arguments used to configure the query builder of the edge.
func (rsrq *ResourceSpecificationRelationshipQuery) WithResourceSr(opts ...func(*ResourceSpecificationItemsQuery)) *ResourceSpecificationRelationshipQuery {
	query := &ResourceSpecificationItemsQuery{config: rsrq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsrq.withResourceSr = query
	return rsrq
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
//	client.ResourceSpecificationRelationship.Query().
//		GroupBy(resourcespecificationrelationship.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (rsrq *ResourceSpecificationRelationshipQuery) GroupBy(field string, fields ...string) *ResourceSpecificationRelationshipGroupBy {
	group := &ResourceSpecificationRelationshipGroupBy{config: rsrq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rsrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rsrq.sqlQuery(), nil
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
//	client.ResourceSpecificationRelationship.Query().
//		Select(resourcespecificationrelationship.FieldCreateTime).
//		Scan(ctx, &v)
//
func (rsrq *ResourceSpecificationRelationshipQuery) Select(field string, fields ...string) *ResourceSpecificationRelationshipSelect {
	selector := &ResourceSpecificationRelationshipSelect{config: rsrq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rsrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rsrq.sqlQuery(), nil
	}
	return selector
}

func (rsrq *ResourceSpecificationRelationshipQuery) prepareQuery(ctx context.Context) error {
	if rsrq.path != nil {
		prev, err := rsrq.path(ctx)
		if err != nil {
			return err
		}
		rsrq.sql = prev
	}
	if err := resourcespecificationrelationship.Policy.EvalQuery(ctx, rsrq); err != nil {
		return err
	}
	return nil
}

func (rsrq *ResourceSpecificationRelationshipQuery) sqlAll(ctx context.Context) ([]*ResourceSpecificationRelationship, error) {
	var (
		nodes       = []*ResourceSpecificationRelationship{}
		withFKs     = rsrq.withFKs
		_spec       = rsrq.querySpec()
		loadedTypes = [2]bool{
			rsrq.withResourcespecification != nil,
			rsrq.withResourceSr != nil,
		}
	)
	if rsrq.withResourcespecification != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, resourcespecificationrelationship.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &ResourceSpecificationRelationship{config: rsrq.config}
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
	if err := sqlgraph.QueryNodes(ctx, rsrq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := rsrq.withResourcespecification; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*ResourceSpecificationRelationship)
		for i := range nodes {
			if fk := nodes[i].resource_specification_resource_specification; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(resourcespecification.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_specification_resource_specification" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Resourcespecification = n
			}
		}
	}

	if query := rsrq.withResourceSr; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ResourceSpecificationRelationship)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.ResourceSr = []*ResourceSpecificationItems{}
		}
		query.withFKs = true
		query.Where(predicate.ResourceSpecificationItems(func(s *sql.Selector) {
			s.Where(sql.InValues(resourcespecificationrelationship.ResourceSrColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.resource_specification_relationship_resource_sr
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "resource_specification_relationship_resource_sr" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_specification_relationship_resource_sr" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.ResourceSr = append(node.Edges.ResourceSr, n)
		}
	}

	return nodes, nil
}

func (rsrq *ResourceSpecificationRelationshipQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := rsrq.querySpec()
	return sqlgraph.CountNodes(ctx, rsrq.driver, _spec)
}

func (rsrq *ResourceSpecificationRelationshipQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := rsrq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (rsrq *ResourceSpecificationRelationshipQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcespecificationrelationship.Table,
			Columns: resourcespecificationrelationship.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecificationrelationship.FieldID,
			},
		},
		From:   rsrq.sql,
		Unique: true,
	}
	if ps := rsrq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := rsrq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := rsrq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := rsrq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, resourcespecificationrelationship.ValidColumn)
			}
		}
	}
	return _spec
}

func (rsrq *ResourceSpecificationRelationshipQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(rsrq.driver.Dialect())
	t1 := builder.Table(resourcespecificationrelationship.Table)
	selector := builder.Select(t1.Columns(resourcespecificationrelationship.Columns...)...).From(t1)
	if rsrq.sql != nil {
		selector = rsrq.sql
		selector.Select(selector.Columns(resourcespecificationrelationship.Columns...)...)
	}
	for _, p := range rsrq.predicates {
		p(selector)
	}
	for _, p := range rsrq.order {
		p(selector, resourcespecificationrelationship.ValidColumn)
	}
	if offset := rsrq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := rsrq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ResourceSpecificationRelationshipGroupBy is the builder for group-by ResourceSpecificationRelationship entities.
type ResourceSpecificationRelationshipGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Aggregate(fns ...AggregateFunc) *ResourceSpecificationRelationshipGroupBy {
	rsrgb.fns = append(rsrgb.fns, fns...)
	return rsrgb
}

// Scan applies the group-by query and scan the result into the given value.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := rsrgb.path(ctx)
	if err != nil {
		return err
	}
	rsrgb.sql = query
	return rsrgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := rsrgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(rsrgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := rsrgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) StringsX(ctx context.Context) []string {
	v, err := rsrgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rsrgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) StringX(ctx context.Context) string {
	v, err := rsrgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(rsrgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := rsrgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) IntsX(ctx context.Context) []int {
	v, err := rsrgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rsrgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) IntX(ctx context.Context) int {
	v, err := rsrgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(rsrgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := rsrgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := rsrgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rsrgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Float64X(ctx context.Context) float64 {
	v, err := rsrgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(rsrgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := rsrgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := rsrgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rsrgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rsrgb *ResourceSpecificationRelationshipGroupBy) BoolX(ctx context.Context) bool {
	v, err := rsrgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rsrgb *ResourceSpecificationRelationshipGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rsrgb.fields {
		if !resourcespecificationrelationship.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := rsrgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rsrgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rsrgb *ResourceSpecificationRelationshipGroupBy) sqlQuery() *sql.Selector {
	selector := rsrgb.sql
	columns := make([]string, 0, len(rsrgb.fields)+len(rsrgb.fns))
	columns = append(columns, rsrgb.fields...)
	for _, fn := range rsrgb.fns {
		columns = append(columns, fn(selector, resourcespecificationrelationship.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(rsrgb.fields...)
}

// ResourceSpecificationRelationshipSelect is the builder for select fields of ResourceSpecificationRelationship entities.
type ResourceSpecificationRelationshipSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (rsrs *ResourceSpecificationRelationshipSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := rsrs.path(ctx)
	if err != nil {
		return err
	}
	rsrs.sql = query
	return rsrs.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) ScanX(ctx context.Context, v interface{}) {
	if err := rsrs.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Strings(ctx context.Context) ([]string, error) {
	if len(rsrs.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := rsrs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) StringsX(ctx context.Context) []string {
	v, err := rsrs.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rsrs.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) StringX(ctx context.Context) string {
	v, err := rsrs.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Ints(ctx context.Context) ([]int, error) {
	if len(rsrs.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := rsrs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) IntsX(ctx context.Context) []int {
	v, err := rsrs.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rsrs.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) IntX(ctx context.Context) int {
	v, err := rsrs.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(rsrs.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := rsrs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) Float64sX(ctx context.Context) []float64 {
	v, err := rsrs.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rsrs.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) Float64X(ctx context.Context) float64 {
	v, err := rsrs.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(rsrs.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationRelationshipSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := rsrs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) BoolsX(ctx context.Context) []bool {
	v, err := rsrs.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (rsrs *ResourceSpecificationRelationshipSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rsrs.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecificationrelationship.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationRelationshipSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rsrs *ResourceSpecificationRelationshipSelect) BoolX(ctx context.Context) bool {
	v, err := rsrs.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rsrs *ResourceSpecificationRelationshipSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rsrs.fields {
		if !resourcespecificationrelationship.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := rsrs.sqlQuery().Query()
	if err := rsrs.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rsrs *ResourceSpecificationRelationshipSelect) sqlQuery() sql.Querier {
	selector := rsrs.sql
	selector.Select(selector.Columns(rsrs.fields...)...)
	return selector
}
