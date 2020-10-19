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
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/entrypoint"
	"github.com/facebookincubator/symphony/pkg/ent/exitpoint"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ExitPointQuery is the builder for querying ExitPoint entities.
type ExitPointQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.ExitPoint
	// eager-loading edges.
	withNextEntryPoints *EntryPointQuery
	withParentBlock     *BlockQuery
	withFKs             bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (epq *ExitPointQuery) Where(ps ...predicate.ExitPoint) *ExitPointQuery {
	epq.predicates = append(epq.predicates, ps...)
	return epq
}

// Limit adds a limit step to the query.
func (epq *ExitPointQuery) Limit(limit int) *ExitPointQuery {
	epq.limit = &limit
	return epq
}

// Offset adds an offset step to the query.
func (epq *ExitPointQuery) Offset(offset int) *ExitPointQuery {
	epq.offset = &offset
	return epq
}

// Order adds an order step to the query.
func (epq *ExitPointQuery) Order(o ...OrderFunc) *ExitPointQuery {
	epq.order = append(epq.order, o...)
	return epq
}

// QueryNextEntryPoints chains the current query on the next_entry_points edge.
func (epq *ExitPointQuery) QueryNextEntryPoints() *EntryPointQuery {
	query := &EntryPointQuery{config: epq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := epq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := epq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(exitpoint.Table, exitpoint.FieldID, selector),
			sqlgraph.To(entrypoint.Table, entrypoint.FieldID),
			sqlgraph.Edge(sqlgraph.M2M, false, exitpoint.NextEntryPointsTable, exitpoint.NextEntryPointsPrimaryKey...),
		)
		fromU = sqlgraph.SetNeighbors(epq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryParentBlock chains the current query on the parent_block edge.
func (epq *ExitPointQuery) QueryParentBlock() *BlockQuery {
	query := &BlockQuery{config: epq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := epq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := epq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(exitpoint.Table, exitpoint.FieldID, selector),
			sqlgraph.To(block.Table, block.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, exitpoint.ParentBlockTable, exitpoint.ParentBlockColumn),
		)
		fromU = sqlgraph.SetNeighbors(epq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first ExitPoint entity in the query. Returns *NotFoundError when no exitpoint was found.
func (epq *ExitPointQuery) First(ctx context.Context) (*ExitPoint, error) {
	nodes, err := epq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{exitpoint.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (epq *ExitPointQuery) FirstX(ctx context.Context) *ExitPoint {
	node, err := epq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first ExitPoint id in the query. Returns *NotFoundError when no id was found.
func (epq *ExitPointQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = epq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{exitpoint.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (epq *ExitPointQuery) FirstIDX(ctx context.Context) int {
	id, err := epq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only ExitPoint entity in the query, returns an error if not exactly one entity was returned.
func (epq *ExitPointQuery) Only(ctx context.Context) (*ExitPoint, error) {
	nodes, err := epq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{exitpoint.Label}
	default:
		return nil, &NotSingularError{exitpoint.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (epq *ExitPointQuery) OnlyX(ctx context.Context) *ExitPoint {
	node, err := epq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only ExitPoint id in the query, returns an error if not exactly one id was returned.
func (epq *ExitPointQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = epq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = &NotSingularError{exitpoint.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (epq *ExitPointQuery) OnlyIDX(ctx context.Context) int {
	id, err := epq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ExitPoints.
func (epq *ExitPointQuery) All(ctx context.Context) ([]*ExitPoint, error) {
	if err := epq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return epq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (epq *ExitPointQuery) AllX(ctx context.Context) []*ExitPoint {
	nodes, err := epq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of ExitPoint ids.
func (epq *ExitPointQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := epq.Select(exitpoint.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (epq *ExitPointQuery) IDsX(ctx context.Context) []int {
	ids, err := epq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (epq *ExitPointQuery) Count(ctx context.Context) (int, error) {
	if err := epq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return epq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (epq *ExitPointQuery) CountX(ctx context.Context) int {
	count, err := epq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (epq *ExitPointQuery) Exist(ctx context.Context) (bool, error) {
	if err := epq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return epq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (epq *ExitPointQuery) ExistX(ctx context.Context) bool {
	exist, err := epq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (epq *ExitPointQuery) Clone() *ExitPointQuery {
	return &ExitPointQuery{
		config:     epq.config,
		limit:      epq.limit,
		offset:     epq.offset,
		order:      append([]OrderFunc{}, epq.order...),
		unique:     append([]string{}, epq.unique...),
		predicates: append([]predicate.ExitPoint{}, epq.predicates...),
		// clone intermediate query.
		sql:  epq.sql.Clone(),
		path: epq.path,
	}
}

//  WithNextEntryPoints tells the query-builder to eager-loads the nodes that are connected to
// the "next_entry_points" edge. The optional arguments used to configure the query builder of the edge.
func (epq *ExitPointQuery) WithNextEntryPoints(opts ...func(*EntryPointQuery)) *ExitPointQuery {
	query := &EntryPointQuery{config: epq.config}
	for _, opt := range opts {
		opt(query)
	}
	epq.withNextEntryPoints = query
	return epq
}

//  WithParentBlock tells the query-builder to eager-loads the nodes that are connected to
// the "parent_block" edge. The optional arguments used to configure the query builder of the edge.
func (epq *ExitPointQuery) WithParentBlock(opts ...func(*BlockQuery)) *ExitPointQuery {
	query := &BlockQuery{config: epq.config}
	for _, opt := range opts {
		opt(query)
	}
	epq.withParentBlock = query
	return epq
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
//	client.ExitPoint.Query().
//		GroupBy(exitpoint.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (epq *ExitPointQuery) GroupBy(field string, fields ...string) *ExitPointGroupBy {
	group := &ExitPointGroupBy{config: epq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := epq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return epq.sqlQuery(), nil
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
//	client.ExitPoint.Query().
//		Select(exitpoint.FieldCreateTime).
//		Scan(ctx, &v)
//
func (epq *ExitPointQuery) Select(field string, fields ...string) *ExitPointSelect {
	selector := &ExitPointSelect{config: epq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := epq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return epq.sqlQuery(), nil
	}
	return selector
}

func (epq *ExitPointQuery) prepareQuery(ctx context.Context) error {
	if epq.path != nil {
		prev, err := epq.path(ctx)
		if err != nil {
			return err
		}
		epq.sql = prev
	}
	if err := exitpoint.Policy.EvalQuery(ctx, epq); err != nil {
		return err
	}
	return nil
}

func (epq *ExitPointQuery) sqlAll(ctx context.Context) ([]*ExitPoint, error) {
	var (
		nodes       = []*ExitPoint{}
		withFKs     = epq.withFKs
		_spec       = epq.querySpec()
		loadedTypes = [2]bool{
			epq.withNextEntryPoints != nil,
			epq.withParentBlock != nil,
		}
	)
	if epq.withParentBlock != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, exitpoint.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &ExitPoint{config: epq.config}
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
	if err := sqlgraph.QueryNodes(ctx, epq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := epq.withNextEntryPoints; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		ids := make(map[int]*ExitPoint, len(nodes))
		for _, node := range nodes {
			ids[node.ID] = node
			fks = append(fks, node.ID)
			node.Edges.NextEntryPoints = []*EntryPoint{}
		}
		var (
			edgeids []int
			edges   = make(map[int][]*ExitPoint)
		)
		_spec := &sqlgraph.EdgeQuerySpec{
			Edge: &sqlgraph.EdgeSpec{
				Inverse: false,
				Table:   exitpoint.NextEntryPointsTable,
				Columns: exitpoint.NextEntryPointsPrimaryKey,
			},
			Predicate: func(s *sql.Selector) {
				s.Where(sql.InValues(exitpoint.NextEntryPointsPrimaryKey[0], fks...))
			},

			ScanValues: func() [2]interface{} {
				return [2]interface{}{&sql.NullInt64{}, &sql.NullInt64{}}
			},
			Assign: func(out, in interface{}) error {
				eout, ok := out.(*sql.NullInt64)
				if !ok || eout == nil {
					return fmt.Errorf("unexpected id value for edge-out")
				}
				ein, ok := in.(*sql.NullInt64)
				if !ok || ein == nil {
					return fmt.Errorf("unexpected id value for edge-in")
				}
				outValue := int(eout.Int64)
				inValue := int(ein.Int64)
				node, ok := ids[outValue]
				if !ok {
					return fmt.Errorf("unexpected node id in edges: %v", outValue)
				}
				edgeids = append(edgeids, inValue)
				edges[inValue] = append(edges[inValue], node)
				return nil
			},
		}
		if err := sqlgraph.QueryEdges(ctx, epq.driver, _spec); err != nil {
			return nil, fmt.Errorf(`query edges "next_entry_points": %v`, err)
		}
		query.Where(entrypoint.IDIn(edgeids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := edges[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected "next_entry_points" node returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.NextEntryPoints = append(nodes[i].Edges.NextEntryPoints, n)
			}
		}
	}

	if query := epq.withParentBlock; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*ExitPoint)
		for i := range nodes {
			if fk := nodes[i].block_exit_points; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(block.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "block_exit_points" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.ParentBlock = n
			}
		}
	}

	return nodes, nil
}

func (epq *ExitPointQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := epq.querySpec()
	return sqlgraph.CountNodes(ctx, epq.driver, _spec)
}

func (epq *ExitPointQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := epq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (epq *ExitPointQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   exitpoint.Table,
			Columns: exitpoint.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: exitpoint.FieldID,
			},
		},
		From:   epq.sql,
		Unique: true,
	}
	if ps := epq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := epq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := epq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := epq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, exitpoint.ValidColumn)
			}
		}
	}
	return _spec
}

func (epq *ExitPointQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(epq.driver.Dialect())
	t1 := builder.Table(exitpoint.Table)
	selector := builder.Select(t1.Columns(exitpoint.Columns...)...).From(t1)
	if epq.sql != nil {
		selector = epq.sql
		selector.Select(selector.Columns(exitpoint.Columns...)...)
	}
	for _, p := range epq.predicates {
		p(selector)
	}
	for _, p := range epq.order {
		p(selector, exitpoint.ValidColumn)
	}
	if offset := epq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := epq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ExitPointGroupBy is the builder for group-by ExitPoint entities.
type ExitPointGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (epgb *ExitPointGroupBy) Aggregate(fns ...AggregateFunc) *ExitPointGroupBy {
	epgb.fns = append(epgb.fns, fns...)
	return epgb
}

// Scan applies the group-by query and scan the result into the given value.
func (epgb *ExitPointGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := epgb.path(ctx)
	if err != nil {
		return err
	}
	epgb.sql = query
	return epgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (epgb *ExitPointGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := epgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(epgb.fields) > 1 {
		return nil, errors.New("ent: ExitPointGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := epgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (epgb *ExitPointGroupBy) StringsX(ctx context.Context) []string {
	v, err := epgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = epgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (epgb *ExitPointGroupBy) StringX(ctx context.Context) string {
	v, err := epgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(epgb.fields) > 1 {
		return nil, errors.New("ent: ExitPointGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := epgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (epgb *ExitPointGroupBy) IntsX(ctx context.Context) []int {
	v, err := epgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = epgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (epgb *ExitPointGroupBy) IntX(ctx context.Context) int {
	v, err := epgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(epgb.fields) > 1 {
		return nil, errors.New("ent: ExitPointGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := epgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (epgb *ExitPointGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := epgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = epgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (epgb *ExitPointGroupBy) Float64X(ctx context.Context) float64 {
	v, err := epgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(epgb.fields) > 1 {
		return nil, errors.New("ent: ExitPointGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := epgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (epgb *ExitPointGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := epgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (epgb *ExitPointGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = epgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (epgb *ExitPointGroupBy) BoolX(ctx context.Context) bool {
	v, err := epgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (epgb *ExitPointGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range epgb.fields {
		if !exitpoint.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := epgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := epgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (epgb *ExitPointGroupBy) sqlQuery() *sql.Selector {
	selector := epgb.sql
	columns := make([]string, 0, len(epgb.fields)+len(epgb.fns))
	columns = append(columns, epgb.fields...)
	for _, fn := range epgb.fns {
		columns = append(columns, fn(selector, exitpoint.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(epgb.fields...)
}

// ExitPointSelect is the builder for select fields of ExitPoint entities.
type ExitPointSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (eps *ExitPointSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := eps.path(ctx)
	if err != nil {
		return err
	}
	eps.sql = query
	return eps.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (eps *ExitPointSelect) ScanX(ctx context.Context, v interface{}) {
	if err := eps.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Strings(ctx context.Context) ([]string, error) {
	if len(eps.fields) > 1 {
		return nil, errors.New("ent: ExitPointSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := eps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (eps *ExitPointSelect) StringsX(ctx context.Context) []string {
	v, err := eps.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = eps.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (eps *ExitPointSelect) StringX(ctx context.Context) string {
	v, err := eps.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Ints(ctx context.Context) ([]int, error) {
	if len(eps.fields) > 1 {
		return nil, errors.New("ent: ExitPointSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := eps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (eps *ExitPointSelect) IntsX(ctx context.Context) []int {
	v, err := eps.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = eps.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (eps *ExitPointSelect) IntX(ctx context.Context) int {
	v, err := eps.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(eps.fields) > 1 {
		return nil, errors.New("ent: ExitPointSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := eps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (eps *ExitPointSelect) Float64sX(ctx context.Context) []float64 {
	v, err := eps.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = eps.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (eps *ExitPointSelect) Float64X(ctx context.Context) float64 {
	v, err := eps.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(eps.fields) > 1 {
		return nil, errors.New("ent: ExitPointSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := eps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (eps *ExitPointSelect) BoolsX(ctx context.Context) []bool {
	v, err := eps.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (eps *ExitPointSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = eps.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exitpoint.Label}
	default:
		err = fmt.Errorf("ent: ExitPointSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (eps *ExitPointSelect) BoolX(ctx context.Context) bool {
	v, err := eps.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (eps *ExitPointSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range eps.fields {
		if !exitpoint.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := eps.sqlQuery().Query()
	if err := eps.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (eps *ExitPointSelect) sqlQuery() sql.Querier {
	selector := eps.sql
	selector.Select(selector.Columns(eps.fields...)...)
	return selector
}
