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
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// BlockInstanceQuery is the builder for querying BlockInstance entities.
type BlockInstanceQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.BlockInstance
	// eager-loading edges.
	withFlowInstance    *FlowInstanceQuery
	withBlock           *BlockQuery
	withSubflowInstance *FlowInstanceQuery
	withFKs             bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (biq *BlockInstanceQuery) Where(ps ...predicate.BlockInstance) *BlockInstanceQuery {
	biq.predicates = append(biq.predicates, ps...)
	return biq
}

// Limit adds a limit step to the query.
func (biq *BlockInstanceQuery) Limit(limit int) *BlockInstanceQuery {
	biq.limit = &limit
	return biq
}

// Offset adds an offset step to the query.
func (biq *BlockInstanceQuery) Offset(offset int) *BlockInstanceQuery {
	biq.offset = &offset
	return biq
}

// Order adds an order step to the query.
func (biq *BlockInstanceQuery) Order(o ...OrderFunc) *BlockInstanceQuery {
	biq.order = append(biq.order, o...)
	return biq
}

// QueryFlowInstance chains the current query on the flow_instance edge.
func (biq *BlockInstanceQuery) QueryFlowInstance() *FlowInstanceQuery {
	query := &FlowInstanceQuery{config: biq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := biq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := biq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blockinstance.Table, blockinstance.FieldID, selector),
			sqlgraph.To(flowinstance.Table, flowinstance.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, blockinstance.FlowInstanceTable, blockinstance.FlowInstanceColumn),
		)
		fromU = sqlgraph.SetNeighbors(biq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryBlock chains the current query on the block edge.
func (biq *BlockInstanceQuery) QueryBlock() *BlockQuery {
	query := &BlockQuery{config: biq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := biq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := biq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blockinstance.Table, blockinstance.FieldID, selector),
			sqlgraph.To(block.Table, block.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, blockinstance.BlockTable, blockinstance.BlockColumn),
		)
		fromU = sqlgraph.SetNeighbors(biq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QuerySubflowInstance chains the current query on the subflow_instance edge.
func (biq *BlockInstanceQuery) QuerySubflowInstance() *FlowInstanceQuery {
	query := &FlowInstanceQuery{config: biq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := biq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := biq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blockinstance.Table, blockinstance.FieldID, selector),
			sqlgraph.To(flowinstance.Table, flowinstance.FieldID),
			sqlgraph.Edge(sqlgraph.O2O, false, blockinstance.SubflowInstanceTable, blockinstance.SubflowInstanceColumn),
		)
		fromU = sqlgraph.SetNeighbors(biq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first BlockInstance entity in the query. Returns *NotFoundError when no blockinstance was found.
func (biq *BlockInstanceQuery) First(ctx context.Context) (*BlockInstance, error) {
	nodes, err := biq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{blockinstance.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (biq *BlockInstanceQuery) FirstX(ctx context.Context) *BlockInstance {
	node, err := biq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first BlockInstance id in the query. Returns *NotFoundError when no id was found.
func (biq *BlockInstanceQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = biq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{blockinstance.Label}
		return
	}
	return ids[0], nil
}

// FirstXID is like FirstID, but panics if an error occurs.
func (biq *BlockInstanceQuery) FirstXID(ctx context.Context) int {
	id, err := biq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only BlockInstance entity in the query, returns an error if not exactly one entity was returned.
func (biq *BlockInstanceQuery) Only(ctx context.Context) (*BlockInstance, error) {
	nodes, err := biq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{blockinstance.Label}
	default:
		return nil, &NotSingularError{blockinstance.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (biq *BlockInstanceQuery) OnlyX(ctx context.Context) *BlockInstance {
	node, err := biq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only BlockInstance id in the query, returns an error if not exactly one id was returned.
func (biq *BlockInstanceQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = biq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = &NotSingularError{blockinstance.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (biq *BlockInstanceQuery) OnlyIDX(ctx context.Context) int {
	id, err := biq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of BlockInstances.
func (biq *BlockInstanceQuery) All(ctx context.Context) ([]*BlockInstance, error) {
	if err := biq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return biq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (biq *BlockInstanceQuery) AllX(ctx context.Context) []*BlockInstance {
	nodes, err := biq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of BlockInstance ids.
func (biq *BlockInstanceQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := biq.Select(blockinstance.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (biq *BlockInstanceQuery) IDsX(ctx context.Context) []int {
	ids, err := biq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (biq *BlockInstanceQuery) Count(ctx context.Context) (int, error) {
	if err := biq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return biq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (biq *BlockInstanceQuery) CountX(ctx context.Context) int {
	count, err := biq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (biq *BlockInstanceQuery) Exist(ctx context.Context) (bool, error) {
	if err := biq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return biq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (biq *BlockInstanceQuery) ExistX(ctx context.Context) bool {
	exist, err := biq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (biq *BlockInstanceQuery) Clone() *BlockInstanceQuery {
	return &BlockInstanceQuery{
		config:     biq.config,
		limit:      biq.limit,
		offset:     biq.offset,
		order:      append([]OrderFunc{}, biq.order...),
		unique:     append([]string{}, biq.unique...),
		predicates: append([]predicate.BlockInstance{}, biq.predicates...),
		// clone intermediate query.
		sql:  biq.sql.Clone(),
		path: biq.path,
	}
}

//  WithFlowInstance tells the query-builder to eager-loads the nodes that are connected to
// the "flow_instance" edge. The optional arguments used to configure the query builder of the edge.
func (biq *BlockInstanceQuery) WithFlowInstance(opts ...func(*FlowInstanceQuery)) *BlockInstanceQuery {
	query := &FlowInstanceQuery{config: biq.config}
	for _, opt := range opts {
		opt(query)
	}
	biq.withFlowInstance = query
	return biq
}

//  WithBlock tells the query-builder to eager-loads the nodes that are connected to
// the "block" edge. The optional arguments used to configure the query builder of the edge.
func (biq *BlockInstanceQuery) WithBlock(opts ...func(*BlockQuery)) *BlockInstanceQuery {
	query := &BlockQuery{config: biq.config}
	for _, opt := range opts {
		opt(query)
	}
	biq.withBlock = query
	return biq
}

//  WithSubflowInstance tells the query-builder to eager-loads the nodes that are connected to
// the "subflow_instance" edge. The optional arguments used to configure the query builder of the edge.
func (biq *BlockInstanceQuery) WithSubflowInstance(opts ...func(*FlowInstanceQuery)) *BlockInstanceQuery {
	query := &FlowInstanceQuery{config: biq.config}
	for _, opt := range opts {
		opt(query)
	}
	biq.withSubflowInstance = query
	return biq
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
//	client.BlockInstance.Query().
//		GroupBy(blockinstance.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (biq *BlockInstanceQuery) GroupBy(field string, fields ...string) *BlockInstanceGroupBy {
	group := &BlockInstanceGroupBy{config: biq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := biq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return biq.sqlQuery(), nil
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
//	client.BlockInstance.Query().
//		Select(blockinstance.FieldCreateTime).
//		Scan(ctx, &v)
//
func (biq *BlockInstanceQuery) Select(field string, fields ...string) *BlockInstanceSelect {
	selector := &BlockInstanceSelect{config: biq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := biq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return biq.sqlQuery(), nil
	}
	return selector
}

func (biq *BlockInstanceQuery) prepareQuery(ctx context.Context) error {
	if biq.path != nil {
		prev, err := biq.path(ctx)
		if err != nil {
			return err
		}
		biq.sql = prev
	}
	if err := blockinstance.Policy.EvalQuery(ctx, biq); err != nil {
		return err
	}
	return nil
}

func (biq *BlockInstanceQuery) sqlAll(ctx context.Context) ([]*BlockInstance, error) {
	var (
		nodes       = []*BlockInstance{}
		withFKs     = biq.withFKs
		_spec       = biq.querySpec()
		loadedTypes = [3]bool{
			biq.withFlowInstance != nil,
			biq.withBlock != nil,
			biq.withSubflowInstance != nil,
		}
	)
	if biq.withFlowInstance != nil || biq.withBlock != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, blockinstance.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &BlockInstance{config: biq.config}
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
	if err := sqlgraph.QueryNodes(ctx, biq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := biq.withFlowInstance; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*BlockInstance)
		for i := range nodes {
			if fk := nodes[i].flow_instance_blocks; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(flowinstance.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "flow_instance_blocks" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.FlowInstance = n
			}
		}
	}

	if query := biq.withBlock; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*BlockInstance)
		for i := range nodes {
			if fk := nodes[i].block_instance_block; fk != nil {
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
				return nil, fmt.Errorf(`unexpected foreign-key "block_instance_block" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Block = n
			}
		}
	}

	if query := biq.withSubflowInstance; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*BlockInstance)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
		}
		query.withFKs = true
		query.Where(predicate.FlowInstance(func(s *sql.Selector) {
			s.Where(sql.InValues(blockinstance.SubflowInstanceColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.block_instance_subflow_instance
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "block_instance_subflow_instance" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "block_instance_subflow_instance" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.SubflowInstance = n
		}
	}

	return nodes, nil
}

func (biq *BlockInstanceQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := biq.querySpec()
	return sqlgraph.CountNodes(ctx, biq.driver, _spec)
}

func (biq *BlockInstanceQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := biq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (biq *BlockInstanceQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   blockinstance.Table,
			Columns: blockinstance.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: blockinstance.FieldID,
			},
		},
		From:   biq.sql,
		Unique: true,
	}
	if ps := biq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := biq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := biq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := biq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, blockinstance.ValidColumn)
			}
		}
	}
	return _spec
}

func (biq *BlockInstanceQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(biq.driver.Dialect())
	t1 := builder.Table(blockinstance.Table)
	selector := builder.Select(t1.Columns(blockinstance.Columns...)...).From(t1)
	if biq.sql != nil {
		selector = biq.sql
		selector.Select(selector.Columns(blockinstance.Columns...)...)
	}
	for _, p := range biq.predicates {
		p(selector)
	}
	for _, p := range biq.order {
		p(selector, blockinstance.ValidColumn)
	}
	if offset := biq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := biq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// BlockInstanceGroupBy is the builder for group-by BlockInstance entities.
type BlockInstanceGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (bigb *BlockInstanceGroupBy) Aggregate(fns ...AggregateFunc) *BlockInstanceGroupBy {
	bigb.fns = append(bigb.fns, fns...)
	return bigb
}

// Scan applies the group-by query and scan the result into the given value.
func (bigb *BlockInstanceGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := bigb.path(ctx)
	if err != nil {
		return err
	}
	bigb.sql = query
	return bigb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := bigb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(bigb.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := bigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) StringsX(ctx context.Context) []string {
	v, err := bigb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = bigb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) StringX(ctx context.Context) string {
	v, err := bigb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(bigb.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := bigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) IntsX(ctx context.Context) []int {
	v, err := bigb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = bigb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) IntX(ctx context.Context) int {
	v, err := bigb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(bigb.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := bigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := bigb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = bigb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) Float64X(ctx context.Context) float64 {
	v, err := bigb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(bigb.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := bigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := bigb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (bigb *BlockInstanceGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = bigb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (bigb *BlockInstanceGroupBy) BoolX(ctx context.Context) bool {
	v, err := bigb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (bigb *BlockInstanceGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range bigb.fields {
		if !blockinstance.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := bigb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := bigb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (bigb *BlockInstanceGroupBy) sqlQuery() *sql.Selector {
	selector := bigb.sql
	columns := make([]string, 0, len(bigb.fields)+len(bigb.fns))
	columns = append(columns, bigb.fields...)
	for _, fn := range bigb.fns {
		columns = append(columns, fn(selector, blockinstance.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(bigb.fields...)
}

// BlockInstanceSelect is the builder for select fields of BlockInstance entities.
type BlockInstanceSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (bis *BlockInstanceSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := bis.path(ctx)
	if err != nil {
		return err
	}
	bis.sql = query
	return bis.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (bis *BlockInstanceSelect) ScanX(ctx context.Context, v interface{}) {
	if err := bis.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Strings(ctx context.Context) ([]string, error) {
	if len(bis.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := bis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (bis *BlockInstanceSelect) StringsX(ctx context.Context) []string {
	v, err := bis.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = bis.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (bis *BlockInstanceSelect) StringX(ctx context.Context) string {
	v, err := bis.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Ints(ctx context.Context) ([]int, error) {
	if len(bis.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := bis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (bis *BlockInstanceSelect) IntsX(ctx context.Context) []int {
	v, err := bis.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = bis.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (bis *BlockInstanceSelect) IntX(ctx context.Context) int {
	v, err := bis.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(bis.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := bis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (bis *BlockInstanceSelect) Float64sX(ctx context.Context) []float64 {
	v, err := bis.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = bis.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (bis *BlockInstanceSelect) Float64X(ctx context.Context) float64 {
	v, err := bis.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(bis.fields) > 1 {
		return nil, errors.New("ent: BlockInstanceSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := bis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (bis *BlockInstanceSelect) BoolsX(ctx context.Context) []bool {
	v, err := bis.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (bis *BlockInstanceSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = bis.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{blockinstance.Label}
	default:
		err = fmt.Errorf("ent: BlockInstanceSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (bis *BlockInstanceSelect) BoolX(ctx context.Context) bool {
	v, err := bis.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (bis *BlockInstanceSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range bis.fields {
		if !blockinstance.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := bis.sqlQuery().Query()
	if err := bis.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (bis *BlockInstanceSelect) sqlQuery() sql.Querier {
	selector := bis.sql
	selector.Select(selector.Columns(bis.fields...)...)
	return selector
}
