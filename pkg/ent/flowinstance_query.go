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
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowexecutiontemplate"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// FlowInstanceQuery is the builder for querying FlowInstance entities.
type FlowInstanceQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.FlowInstance
	// eager-loading edges.
	withFlow               *FlowQuery
	withTemplate           *FlowExecutionTemplateQuery
	withBlocks             *BlockInstanceQuery
	withParentSubflowBlock *BlockInstanceQuery
	withFKs                bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (fiq *FlowInstanceQuery) Where(ps ...predicate.FlowInstance) *FlowInstanceQuery {
	fiq.predicates = append(fiq.predicates, ps...)
	return fiq
}

// Limit adds a limit step to the query.
func (fiq *FlowInstanceQuery) Limit(limit int) *FlowInstanceQuery {
	fiq.limit = &limit
	return fiq
}

// Offset adds an offset step to the query.
func (fiq *FlowInstanceQuery) Offset(offset int) *FlowInstanceQuery {
	fiq.offset = &offset
	return fiq
}

// Order adds an order step to the query.
func (fiq *FlowInstanceQuery) Order(o ...OrderFunc) *FlowInstanceQuery {
	fiq.order = append(fiq.order, o...)
	return fiq
}

// QueryFlow chains the current query on the flow edge.
func (fiq *FlowInstanceQuery) QueryFlow() *FlowQuery {
	query := &FlowQuery{config: fiq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowinstance.Table, flowinstance.FieldID, fiq.sqlQuery()),
			sqlgraph.To(flow.Table, flow.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, flowinstance.FlowTable, flowinstance.FlowColumn),
		)
		fromU = sqlgraph.SetNeighbors(fiq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryTemplate chains the current query on the template edge.
func (fiq *FlowInstanceQuery) QueryTemplate() *FlowExecutionTemplateQuery {
	query := &FlowExecutionTemplateQuery{config: fiq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowinstance.Table, flowinstance.FieldID, fiq.sqlQuery()),
			sqlgraph.To(flowexecutiontemplate.Table, flowexecutiontemplate.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, flowinstance.TemplateTable, flowinstance.TemplateColumn),
		)
		fromU = sqlgraph.SetNeighbors(fiq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryBlocks chains the current query on the blocks edge.
func (fiq *FlowInstanceQuery) QueryBlocks() *BlockInstanceQuery {
	query := &BlockInstanceQuery{config: fiq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowinstance.Table, flowinstance.FieldID, fiq.sqlQuery()),
			sqlgraph.To(blockinstance.Table, blockinstance.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, flowinstance.BlocksTable, flowinstance.BlocksColumn),
		)
		fromU = sqlgraph.SetNeighbors(fiq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryParentSubflowBlock chains the current query on the parent_subflow_block edge.
func (fiq *FlowInstanceQuery) QueryParentSubflowBlock() *BlockInstanceQuery {
	query := &BlockInstanceQuery{config: fiq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(flowinstance.Table, flowinstance.FieldID, fiq.sqlQuery()),
			sqlgraph.To(blockinstance.Table, blockinstance.FieldID),
			sqlgraph.Edge(sqlgraph.O2O, true, flowinstance.ParentSubflowBlockTable, flowinstance.ParentSubflowBlockColumn),
		)
		fromU = sqlgraph.SetNeighbors(fiq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first FlowInstance entity in the query. Returns *NotFoundError when no flowinstance was found.
func (fiq *FlowInstanceQuery) First(ctx context.Context) (*FlowInstance, error) {
	fis, err := fiq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(fis) == 0 {
		return nil, &NotFoundError{flowinstance.Label}
	}
	return fis[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (fiq *FlowInstanceQuery) FirstX(ctx context.Context) *FlowInstance {
	fi, err := fiq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return fi
}

// FirstID returns the first FlowInstance id in the query. Returns *NotFoundError when no id was found.
func (fiq *FlowInstanceQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = fiq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{flowinstance.Label}
		return
	}
	return ids[0], nil
}

// FirstXID is like FirstID, but panics if an error occurs.
func (fiq *FlowInstanceQuery) FirstXID(ctx context.Context) int {
	id, err := fiq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only FlowInstance entity in the query, returns an error if not exactly one entity was returned.
func (fiq *FlowInstanceQuery) Only(ctx context.Context) (*FlowInstance, error) {
	fis, err := fiq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(fis) {
	case 1:
		return fis[0], nil
	case 0:
		return nil, &NotFoundError{flowinstance.Label}
	default:
		return nil, &NotSingularError{flowinstance.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (fiq *FlowInstanceQuery) OnlyX(ctx context.Context) *FlowInstance {
	fi, err := fiq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return fi
}

// OnlyID returns the only FlowInstance id in the query, returns an error if not exactly one id was returned.
func (fiq *FlowInstanceQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = fiq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = &NotSingularError{flowinstance.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (fiq *FlowInstanceQuery) OnlyIDX(ctx context.Context) int {
	id, err := fiq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of FlowInstances.
func (fiq *FlowInstanceQuery) All(ctx context.Context) ([]*FlowInstance, error) {
	if err := fiq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return fiq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (fiq *FlowInstanceQuery) AllX(ctx context.Context) []*FlowInstance {
	fis, err := fiq.All(ctx)
	if err != nil {
		panic(err)
	}
	return fis
}

// IDs executes the query and returns a list of FlowInstance ids.
func (fiq *FlowInstanceQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := fiq.Select(flowinstance.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (fiq *FlowInstanceQuery) IDsX(ctx context.Context) []int {
	ids, err := fiq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (fiq *FlowInstanceQuery) Count(ctx context.Context) (int, error) {
	if err := fiq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return fiq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (fiq *FlowInstanceQuery) CountX(ctx context.Context) int {
	count, err := fiq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (fiq *FlowInstanceQuery) Exist(ctx context.Context) (bool, error) {
	if err := fiq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return fiq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (fiq *FlowInstanceQuery) ExistX(ctx context.Context) bool {
	exist, err := fiq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (fiq *FlowInstanceQuery) Clone() *FlowInstanceQuery {
	return &FlowInstanceQuery{
		config:     fiq.config,
		limit:      fiq.limit,
		offset:     fiq.offset,
		order:      append([]OrderFunc{}, fiq.order...),
		unique:     append([]string{}, fiq.unique...),
		predicates: append([]predicate.FlowInstance{}, fiq.predicates...),
		// clone intermediate query.
		sql:  fiq.sql.Clone(),
		path: fiq.path,
	}
}

//  WithFlow tells the query-builder to eager-loads the nodes that are connected to
// the "flow" edge. The optional arguments used to configure the query builder of the edge.
func (fiq *FlowInstanceQuery) WithFlow(opts ...func(*FlowQuery)) *FlowInstanceQuery {
	query := &FlowQuery{config: fiq.config}
	for _, opt := range opts {
		opt(query)
	}
	fiq.withFlow = query
	return fiq
}

//  WithTemplate tells the query-builder to eager-loads the nodes that are connected to
// the "template" edge. The optional arguments used to configure the query builder of the edge.
func (fiq *FlowInstanceQuery) WithTemplate(opts ...func(*FlowExecutionTemplateQuery)) *FlowInstanceQuery {
	query := &FlowExecutionTemplateQuery{config: fiq.config}
	for _, opt := range opts {
		opt(query)
	}
	fiq.withTemplate = query
	return fiq
}

//  WithBlocks tells the query-builder to eager-loads the nodes that are connected to
// the "blocks" edge. The optional arguments used to configure the query builder of the edge.
func (fiq *FlowInstanceQuery) WithBlocks(opts ...func(*BlockInstanceQuery)) *FlowInstanceQuery {
	query := &BlockInstanceQuery{config: fiq.config}
	for _, opt := range opts {
		opt(query)
	}
	fiq.withBlocks = query
	return fiq
}

//  WithParentSubflowBlock tells the query-builder to eager-loads the nodes that are connected to
// the "parent_subflow_block" edge. The optional arguments used to configure the query builder of the edge.
func (fiq *FlowInstanceQuery) WithParentSubflowBlock(opts ...func(*BlockInstanceQuery)) *FlowInstanceQuery {
	query := &BlockInstanceQuery{config: fiq.config}
	for _, opt := range opts {
		opt(query)
	}
	fiq.withParentSubflowBlock = query
	return fiq
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
//	client.FlowInstance.Query().
//		GroupBy(flowinstance.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (fiq *FlowInstanceQuery) GroupBy(field string, fields ...string) *FlowInstanceGroupBy {
	group := &FlowInstanceGroupBy{config: fiq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return fiq.sqlQuery(), nil
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
//	client.FlowInstance.Query().
//		Select(flowinstance.FieldCreateTime).
//		Scan(ctx, &v)
//
func (fiq *FlowInstanceQuery) Select(field string, fields ...string) *FlowInstanceSelect {
	selector := &FlowInstanceSelect{config: fiq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := fiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return fiq.sqlQuery(), nil
	}
	return selector
}

func (fiq *FlowInstanceQuery) prepareQuery(ctx context.Context) error {
	if fiq.path != nil {
		prev, err := fiq.path(ctx)
		if err != nil {
			return err
		}
		fiq.sql = prev
	}
	if err := flowinstance.Policy.EvalQuery(ctx, fiq); err != nil {
		return err
	}
	return nil
}

func (fiq *FlowInstanceQuery) sqlAll(ctx context.Context) ([]*FlowInstance, error) {
	var (
		nodes       = []*FlowInstance{}
		withFKs     = fiq.withFKs
		_spec       = fiq.querySpec()
		loadedTypes = [4]bool{
			fiq.withFlow != nil,
			fiq.withTemplate != nil,
			fiq.withBlocks != nil,
			fiq.withParentSubflowBlock != nil,
		}
	)
	if fiq.withFlow != nil || fiq.withTemplate != nil || fiq.withParentSubflowBlock != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, flowinstance.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &FlowInstance{config: fiq.config}
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
	if err := sqlgraph.QueryNodes(ctx, fiq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := fiq.withFlow; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*FlowInstance)
		for i := range nodes {
			if fk := nodes[i].flow_instance_flow; fk != nil {
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
				return nil, fmt.Errorf(`unexpected foreign-key "flow_instance_flow" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Flow = n
			}
		}
	}

	if query := fiq.withTemplate; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*FlowInstance)
		for i := range nodes {
			if fk := nodes[i].flow_instance_template; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(flowexecutiontemplate.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "flow_instance_template" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Template = n
			}
		}
	}

	if query := fiq.withBlocks; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*FlowInstance)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
		}
		query.withFKs = true
		query.Where(predicate.BlockInstance(func(s *sql.Selector) {
			s.Where(sql.InValues(flowinstance.BlocksColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.flow_instance_blocks
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "flow_instance_blocks" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "flow_instance_blocks" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.Blocks = append(node.Edges.Blocks, n)
		}
	}

	if query := fiq.withParentSubflowBlock; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*FlowInstance)
		for i := range nodes {
			if fk := nodes[i].block_instance_subflow_instance; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(blockinstance.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "block_instance_subflow_instance" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.ParentSubflowBlock = n
			}
		}
	}

	return nodes, nil
}

func (fiq *FlowInstanceQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := fiq.querySpec()
	return sqlgraph.CountNodes(ctx, fiq.driver, _spec)
}

func (fiq *FlowInstanceQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := fiq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (fiq *FlowInstanceQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   flowinstance.Table,
			Columns: flowinstance.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: flowinstance.FieldID,
			},
		},
		From:   fiq.sql,
		Unique: true,
	}
	if ps := fiq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := fiq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := fiq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := fiq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (fiq *FlowInstanceQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(fiq.driver.Dialect())
	t1 := builder.Table(flowinstance.Table)
	selector := builder.Select(t1.Columns(flowinstance.Columns...)...).From(t1)
	if fiq.sql != nil {
		selector = fiq.sql
		selector.Select(selector.Columns(flowinstance.Columns...)...)
	}
	for _, p := range fiq.predicates {
		p(selector)
	}
	for _, p := range fiq.order {
		p(selector)
	}
	if offset := fiq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := fiq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// FlowInstanceGroupBy is the builder for group-by FlowInstance entities.
type FlowInstanceGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (figb *FlowInstanceGroupBy) Aggregate(fns ...AggregateFunc) *FlowInstanceGroupBy {
	figb.fns = append(figb.fns, fns...)
	return figb
}

// Scan applies the group-by query and scan the result into the given value.
func (figb *FlowInstanceGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := figb.path(ctx)
	if err != nil {
		return err
	}
	figb.sql = query
	return figb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := figb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(figb.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := figb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) StringsX(ctx context.Context) []string {
	v, err := figb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = figb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) StringX(ctx context.Context) string {
	v, err := figb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(figb.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := figb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) IntsX(ctx context.Context) []int {
	v, err := figb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = figb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) IntX(ctx context.Context) int {
	v, err := figb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(figb.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := figb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := figb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = figb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) Float64X(ctx context.Context) float64 {
	v, err := figb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(figb.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := figb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := figb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (figb *FlowInstanceGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = figb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (figb *FlowInstanceGroupBy) BoolX(ctx context.Context) bool {
	v, err := figb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (figb *FlowInstanceGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := figb.sqlQuery().Query()
	if err := figb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (figb *FlowInstanceGroupBy) sqlQuery() *sql.Selector {
	selector := figb.sql
	columns := make([]string, 0, len(figb.fields)+len(figb.fns))
	columns = append(columns, figb.fields...)
	for _, fn := range figb.fns {
		columns = append(columns, fn(selector))
	}
	return selector.Select(columns...).GroupBy(figb.fields...)
}

// FlowInstanceSelect is the builder for select fields of FlowInstance entities.
type FlowInstanceSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (fis *FlowInstanceSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := fis.path(ctx)
	if err != nil {
		return err
	}
	fis.sql = query
	return fis.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (fis *FlowInstanceSelect) ScanX(ctx context.Context, v interface{}) {
	if err := fis.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Strings(ctx context.Context) ([]string, error) {
	if len(fis.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := fis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (fis *FlowInstanceSelect) StringsX(ctx context.Context) []string {
	v, err := fis.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = fis.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (fis *FlowInstanceSelect) StringX(ctx context.Context) string {
	v, err := fis.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Ints(ctx context.Context) ([]int, error) {
	if len(fis.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := fis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (fis *FlowInstanceSelect) IntsX(ctx context.Context) []int {
	v, err := fis.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = fis.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (fis *FlowInstanceSelect) IntX(ctx context.Context) int {
	v, err := fis.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(fis.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := fis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (fis *FlowInstanceSelect) Float64sX(ctx context.Context) []float64 {
	v, err := fis.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = fis.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (fis *FlowInstanceSelect) Float64X(ctx context.Context) float64 {
	v, err := fis.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(fis.fields) > 1 {
		return nil, errors.New("ent: FlowInstanceSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := fis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (fis *FlowInstanceSelect) BoolsX(ctx context.Context) []bool {
	v, err := fis.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (fis *FlowInstanceSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = fis.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{flowinstance.Label}
	default:
		err = fmt.Errorf("ent: FlowInstanceSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (fis *FlowInstanceSelect) BoolX(ctx context.Context) bool {
	v, err := fis.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (fis *FlowInstanceSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := fis.sqlQuery().Query()
	if err := fis.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (fis *FlowInstanceSelect) sqlQuery() sql.Querier {
	selector := fis.sql
	selector.Select(selector.Columns(fis.fields...)...)
	return selector
}
