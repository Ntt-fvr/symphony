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
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// FlowDraftQuery is the builder for querying FlowDraft entities.
type FlowDraftQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.FlowDraft
	// eager-loading edges.
	withBlocks *BlockQuery
	withFlow   *FlowQuery
	withFKs    bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (fdq *FlowDraftQuery) Where(ps ...predicate.FlowDraft) *FlowDraftQuery {
	fdq.predicates = append(fdq.predicates, ps...)
	return fdq
}

// Limit adds a limit step to the query.
func (fdq *FlowDraftQuery) Limit(limit int) *FlowDraftQuery {
	fdq.limit = &limit
	return fdq
}

// Offset adds an offset step to the query.
func (fdq *FlowDraftQuery) Offset(offset int) *FlowDraftQuery {
	fdq.offset = &offset
	return fdq
}

// Order adds an order step to the query.
func (fdq *FlowDraftQuery) Order(o ...OrderFunc) *FlowDraftQuery {
	fdq.order = append(fdq.order, o...)
	return fdq
}

// QueryBlocks chains the current query on the blocks edge.
func (fdq *FlowDraftQuery) QueryBlocks() *BlockQuery {
	query := &BlockQuery{config: fdq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fdq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowdraft.Table, flowdraft.FieldID, fdq.sqlQuery()),
			sqlgraph.To(block.Table, block.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, flowdraft.BlocksTable, flowdraft.BlocksColumn),
		)
		fromU = sqlgraph.SetNeighbors(fdq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryFlow chains the current query on the flow edge.
func (fdq *FlowDraftQuery) QueryFlow() *FlowQuery {
	query := &FlowQuery{config: fdq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fdq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowdraft.Table, flowdraft.FieldID, fdq.sqlQuery()),
			sqlgraph.To(flow.Table, flow.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, flowdraft.FlowTable, flowdraft.FlowColumn),
		)
		fromU = sqlgraph.SetNeighbors(fdq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first FlowDraft entity in the query. Returns *NotFoundError when no flowdraft was found.
func (fdq *FlowDraftQuery) First(ctx context.Context) (*FlowDraft, error) {
	fds, err := fdq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(fds) == 0 {
		return nil, &NotFoundError{flowdraft.Label}
	}
	return fds[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (fdq *FlowDraftQuery) FirstX(ctx context.Context) *FlowDraft {
	fd, err := fdq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return fd
}

// FirstID returns the first FlowDraft id in the query. Returns *NotFoundError when no id was found.
func (fdq *FlowDraftQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = fdq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{flowdraft.Label}
		return
	}
	return ids[0], nil
}

// FirstXID is like FirstID, but panics if an error occurs.
func (fdq *FlowDraftQuery) FirstXID(ctx context.Context) int {
	id, err := fdq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only FlowDraft entity in the query, returns an error if not exactly one entity was returned.
func (fdq *FlowDraftQuery) Only(ctx context.Context) (*FlowDraft, error) {
	fds, err := fdq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(fds) {
	case 1:
		return fds[0], nil
	case 0:
		return nil, &NotFoundError{flowdraft.Label}
	default:
		return nil, &NotSingularError{flowdraft.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (fdq *FlowDraftQuery) OnlyX(ctx context.Context) *FlowDraft {
	fd, err := fdq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return fd
}

// OnlyID returns the only FlowDraft id in the query, returns an error if not exactly one id was returned.
func (fdq *FlowDraftQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = fdq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = &NotSingularError{flowdraft.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (fdq *FlowDraftQuery) OnlyIDX(ctx context.Context) int {
	id, err := fdq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of FlowDrafts.
func (fdq *FlowDraftQuery) All(ctx context.Context) ([]*FlowDraft, error) {
	if err := fdq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return fdq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (fdq *FlowDraftQuery) AllX(ctx context.Context) []*FlowDraft {
	fds, err := fdq.All(ctx)
	if err != nil {
		panic(err)
	}
	return fds
}

// IDs executes the query and returns a list of FlowDraft ids.
func (fdq *FlowDraftQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := fdq.Select(flowdraft.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (fdq *FlowDraftQuery) IDsX(ctx context.Context) []int {
	ids, err := fdq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (fdq *FlowDraftQuery) Count(ctx context.Context) (int, error) {
	if err := fdq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return fdq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (fdq *FlowDraftQuery) CountX(ctx context.Context) int {
	count, err := fdq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (fdq *FlowDraftQuery) Exist(ctx context.Context) (bool, error) {
	if err := fdq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return fdq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (fdq *FlowDraftQuery) ExistX(ctx context.Context) bool {
	exist, err := fdq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (fdq *FlowDraftQuery) Clone() *FlowDraftQuery {
	return &FlowDraftQuery{
		config:     fdq.config,
		limit:      fdq.limit,
		offset:     fdq.offset,
		order:      append([]OrderFunc{}, fdq.order...),
		unique:     append([]string{}, fdq.unique...),
		predicates: append([]predicate.FlowDraft{}, fdq.predicates...),
		// clone intermediate query.
		sql:  fdq.sql.Clone(),
		path: fdq.path,
	}
}

//  WithBlocks tells the query-builder to eager-loads the nodes that are connected to
// the "blocks" edge. The optional arguments used to configure the query builder of the edge.
func (fdq *FlowDraftQuery) WithBlocks(opts ...func(*BlockQuery)) *FlowDraftQuery {
	query := &BlockQuery{config: fdq.config}
	for _, opt := range opts {
		opt(query)
	}
	fdq.withBlocks = query
	return fdq
}

//  WithFlow tells the query-builder to eager-loads the nodes that are connected to
// the "flow" edge. The optional arguments used to configure the query builder of the edge.
func (fdq *FlowDraftQuery) WithFlow(opts ...func(*FlowQuery)) *FlowDraftQuery {
	query := &FlowQuery{config: fdq.config}
	for _, opt := range opts {
		opt(query)
	}
	fdq.withFlow = query
	return fdq
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
//	client.FlowDraft.Query().
//		GroupBy(flowdraft.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (fdq *FlowDraftQuery) GroupBy(field string, fields ...string) *FlowDraftGroupBy {
	group := &FlowDraftGroupBy{config: fdq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := fdq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return fdq.sqlQuery(), nil
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
//	client.FlowDraft.Query().
//		Select(flowdraft.FieldCreateTime).
//		Scan(ctx, &v)
//
func (fdq *FlowDraftQuery) Select(field string, fields ...string) *FlowDraftSelect {
	selector := &FlowDraftSelect{config: fdq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := fdq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return fdq.sqlQuery(), nil
	}
	return selector
}

func (fdq *FlowDraftQuery) prepareQuery(ctx context.Context) error {
	if fdq.path != nil {
		prev, err := fdq.path(ctx)
		if err != nil {
			return err
		}
		fdq.sql = prev
	}
	if err := flowdraft.Policy.EvalQuery(ctx, fdq); err != nil {
		return err
	}
	return nil
}

func (fdq *FlowDraftQuery) sqlAll(ctx context.Context) ([]*FlowDraft, error) {
	var (
		nodes       = []*FlowDraft{}
		withFKs     = fdq.withFKs
		_spec       = fdq.querySpec()
		loadedTypes = [2]bool{
			fdq.withBlocks != nil,
			fdq.withFlow != nil,
		}
	)
	if fdq.withFlow != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, flowdraft.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &FlowDraft{config: fdq.config}
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
	if err := sqlgraph.QueryNodes(ctx, fdq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := fdq.withBlocks; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*FlowDraft)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
		}
		query.withFKs = true
		query.Where(predicate.Block(func(s *sql.Selector) {
			s.Where(sql.InValues(flowdraft.BlocksColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.flow_draft_blocks
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "flow_draft_blocks" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "flow_draft_blocks" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.Blocks = append(node.Edges.Blocks, n)
		}
	}

	if query := fdq.withFlow; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*FlowDraft)
		for i := range nodes {
			if fk := nodes[i].flow_draft; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(flow.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "flow_draft" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Flow = n
			}
		}
	}

	return nodes, nil
}

func (fdq *FlowDraftQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := fdq.querySpec()
	return sqlgraph.CountNodes(ctx, fdq.driver, _spec)
}

func (fdq *FlowDraftQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := fdq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (fdq *FlowDraftQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowdraft.Table,
			Columns: flowdraft.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowdraft.FieldID,
			},
		},
		From:   fdq.sql,
		Unique: true,
	}
	if ps := fdq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := fdq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := fdq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := fdq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (fdq *FlowDraftQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(fdq.driver.Dialect())
	t1 := builder.Table(flowdraft.Table)
	selector := builder.Select(t1.Columns(flowdraft.Columns...)...).From(t1)
	if fdq.sql != nil {
		selector = fdq.sql
		selector.Select(selector.Columns(flowdraft.Columns...)...)
	}
	for _, p := range fdq.predicates {
		p(selector)
	}
	for _, p := range fdq.order {
		p(selector)
	}
	if offset := fdq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := fdq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// FlowDraftGroupBy is the builder for group-by FlowDraft entities.
type FlowDraftGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (fdgb *FlowDraftGroupBy) Aggregate(fns ...AggregateFunc) *FlowDraftGroupBy {
	fdgb.fns = append(fdgb.fns, fns...)
	return fdgb
}

// Scan applies the group-by query and scan the result into the given value.
func (fdgb *FlowDraftGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := fdgb.path(ctx)
	if err != nil {
		return err
	}
	fdgb.sql = query
	return fdgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := fdgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(fdgb.fields) > 1 {
		return nil, errors.New("ent: FlowDraftGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := fdgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) StringsX(ctx context.Context) []string {
	v, err := fdgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = fdgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) StringX(ctx context.Context) string {
	v, err := fdgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(fdgb.fields) > 1 {
		return nil, errors.New("ent: FlowDraftGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := fdgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) IntsX(ctx context.Context) []int {
	v, err := fdgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = fdgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) IntX(ctx context.Context) int {
	v, err := fdgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(fdgb.fields) > 1 {
		return nil, errors.New("ent: FlowDraftGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := fdgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := fdgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = fdgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) Float64X(ctx context.Context) float64 {
	v, err := fdgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(fdgb.fields) > 1 {
		return nil, errors.New("ent: FlowDraftGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := fdgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := fdgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (fdgb *FlowDraftGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = fdgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (fdgb *FlowDraftGroupBy) BoolX(ctx context.Context) bool {
	v, err := fdgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fdgb *FlowDraftGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := fdgb.sqlQuery().Query()
	if err := fdgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (fdgb *FlowDraftGroupBy) sqlQuery() *sql.Selector {
	selector := fdgb.sql
	columns := make([]string, 0, len(fdgb.fields)+len(fdgb.fns))
	columns = append(columns, fdgb.fields...)
	for _, fn := range fdgb.fns {
		columns = append(columns, fn(selector))
	}
	return selector.Select(columns...).GroupBy(fdgb.fields...)
}

// FlowDraftSelect is the builder for select fields of FlowDraft entities.
type FlowDraftSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (fds *FlowDraftSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := fds.path(ctx)
	if err != nil {
		return err
	}
	fds.sql = query
	return fds.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (fds *FlowDraftSelect) ScanX(ctx context.Context, v interface{}) {
	if err := fds.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Strings(ctx context.Context) ([]string, error) {
	if len(fds.fields) > 1 {
		return nil, errors.New("ent: FlowDraftSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := fds.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (fds *FlowDraftSelect) StringsX(ctx context.Context) []string {
	v, err := fds.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = fds.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (fds *FlowDraftSelect) StringX(ctx context.Context) string {
	v, err := fds.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Ints(ctx context.Context) ([]int, error) {
	if len(fds.fields) > 1 {
		return nil, errors.New("ent: FlowDraftSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := fds.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (fds *FlowDraftSelect) IntsX(ctx context.Context) []int {
	v, err := fds.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = fds.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (fds *FlowDraftSelect) IntX(ctx context.Context) int {
	v, err := fds.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(fds.fields) > 1 {
		return nil, errors.New("ent: FlowDraftSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := fds.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (fds *FlowDraftSelect) Float64sX(ctx context.Context) []float64 {
	v, err := fds.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = fds.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (fds *FlowDraftSelect) Float64X(ctx context.Context) float64 {
	v, err := fds.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(fds.fields) > 1 {
		return nil, errors.New("ent: FlowDraftSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := fds.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (fds *FlowDraftSelect) BoolsX(ctx context.Context) []bool {
	v, err := fds.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (fds *FlowDraftSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = fds.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowdraft.Label}
	default:
		err = fmt.Errorf("ent: FlowDraftSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (fds *FlowDraftSelect) BoolX(ctx context.Context) bool {
	v, err := fds.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fds *FlowDraftSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := fds.sqlQuery().Query()
	if err := fds.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (fds *FlowDraftSelect) sqlQuery() sql.Querier {
	selector := fds.sql
	selector.Select(selector.Columns(fds.fields...)...)
	return selector
}
