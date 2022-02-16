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
	"github.com/facebookincubator/symphony/pkg/ent/rule"
	"github.com/facebookincubator/symphony/pkg/ent/ruletype"
)

// RuleTypeQuery is the builder for querying RuleType entities.
type RuleTypeQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.RuleType
	// eager-loading edges.
	withRuletyperule *RuleQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (rtq *RuleTypeQuery) Where(ps ...predicate.RuleType) *RuleTypeQuery {
	rtq.predicates = append(rtq.predicates, ps...)
	return rtq
}

// Limit adds a limit step to the query.
func (rtq *RuleTypeQuery) Limit(limit int) *RuleTypeQuery {
	rtq.limit = &limit
	return rtq
}

// Offset adds an offset step to the query.
func (rtq *RuleTypeQuery) Offset(offset int) *RuleTypeQuery {
	rtq.offset = &offset
	return rtq
}

// Order adds an order step to the query.
func (rtq *RuleTypeQuery) Order(o ...OrderFunc) *RuleTypeQuery {
	rtq.order = append(rtq.order, o...)
	return rtq
}

// QueryRuletyperule chains the current query on the ruletyperule edge.
func (rtq *RuleTypeQuery) QueryRuletyperule() *RuleQuery {
	query := &RuleQuery{config: rtq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rtq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rtq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(ruletype.Table, ruletype.FieldID, selector),
			sqlgraph.To(rule.Table, rule.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ruletype.RuletyperuleTable, ruletype.RuletyperuleColumn),
		)
		fromU = sqlgraph.SetNeighbors(rtq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first RuleType entity in the query. Returns *NotFoundError when no ruletype was found.
func (rtq *RuleTypeQuery) First(ctx context.Context) (*RuleType, error) {
	nodes, err := rtq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{ruletype.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (rtq *RuleTypeQuery) FirstX(ctx context.Context) *RuleType {
	node, err := rtq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first RuleType id in the query. Returns *NotFoundError when no id was found.
func (rtq *RuleTypeQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rtq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{ruletype.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (rtq *RuleTypeQuery) FirstIDX(ctx context.Context) int {
	id, err := rtq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only RuleType entity in the query, returns an error if not exactly one entity was returned.
func (rtq *RuleTypeQuery) Only(ctx context.Context) (*RuleType, error) {
	nodes, err := rtq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{ruletype.Label}
	default:
		return nil, &NotSingularError{ruletype.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (rtq *RuleTypeQuery) OnlyX(ctx context.Context) *RuleType {
	node, err := rtq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only RuleType id in the query, returns an error if not exactly one id was returned.
func (rtq *RuleTypeQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rtq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = &NotSingularError{ruletype.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (rtq *RuleTypeQuery) OnlyIDX(ctx context.Context) int {
	id, err := rtq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of RuleTypes.
func (rtq *RuleTypeQuery) All(ctx context.Context) ([]*RuleType, error) {
	if err := rtq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return rtq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (rtq *RuleTypeQuery) AllX(ctx context.Context) []*RuleType {
	nodes, err := rtq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of RuleType ids.
func (rtq *RuleTypeQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := rtq.Select(ruletype.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (rtq *RuleTypeQuery) IDsX(ctx context.Context) []int {
	ids, err := rtq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (rtq *RuleTypeQuery) Count(ctx context.Context) (int, error) {
	if err := rtq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return rtq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (rtq *RuleTypeQuery) CountX(ctx context.Context) int {
	count, err := rtq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (rtq *RuleTypeQuery) Exist(ctx context.Context) (bool, error) {
	if err := rtq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return rtq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (rtq *RuleTypeQuery) ExistX(ctx context.Context) bool {
	exist, err := rtq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (rtq *RuleTypeQuery) Clone() *RuleTypeQuery {
	if rtq == nil {
		return nil
	}
	return &RuleTypeQuery{
		config:           rtq.config,
		limit:            rtq.limit,
		offset:           rtq.offset,
		order:            append([]OrderFunc{}, rtq.order...),
		unique:           append([]string{}, rtq.unique...),
		predicates:       append([]predicate.RuleType{}, rtq.predicates...),
		withRuletyperule: rtq.withRuletyperule.Clone(),
		// clone intermediate query.
		sql:  rtq.sql.Clone(),
		path: rtq.path,
	}
}

//  WithRuletyperule tells the query-builder to eager-loads the nodes that are connected to
// the "ruletyperule" edge. The optional arguments used to configure the query builder of the edge.
func (rtq *RuleTypeQuery) WithRuletyperule(opts ...func(*RuleQuery)) *RuleTypeQuery {
	query := &RuleQuery{config: rtq.config}
	for _, opt := range opts {
		opt(query)
	}
	rtq.withRuletyperule = query
	return rtq
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
//	client.RuleType.Query().
//		GroupBy(ruletype.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (rtq *RuleTypeQuery) GroupBy(field string, fields ...string) *RuleTypeGroupBy {
	group := &RuleTypeGroupBy{config: rtq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rtq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rtq.sqlQuery(), nil
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
//	client.RuleType.Query().
//		Select(ruletype.FieldCreateTime).
//		Scan(ctx, &v)
//
func (rtq *RuleTypeQuery) Select(field string, fields ...string) *RuleTypeSelect {
	selector := &RuleTypeSelect{config: rtq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rtq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rtq.sqlQuery(), nil
	}
	return selector
}

func (rtq *RuleTypeQuery) prepareQuery(ctx context.Context) error {
	if rtq.path != nil {
		prev, err := rtq.path(ctx)
		if err != nil {
			return err
		}
		rtq.sql = prev
	}
	if err := ruletype.Policy.EvalQuery(ctx, rtq); err != nil {
		return err
	}
	return nil
}

func (rtq *RuleTypeQuery) sqlAll(ctx context.Context) ([]*RuleType, error) {
	var (
		nodes       = []*RuleType{}
		_spec       = rtq.querySpec()
		loadedTypes = [1]bool{
			rtq.withRuletyperule != nil,
		}
	)
	_spec.ScanValues = func() []interface{} {
		node := &RuleType{config: rtq.config}
		nodes = append(nodes, node)
		values := node.scanValues()
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
	if err := sqlgraph.QueryNodes(ctx, rtq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := rtq.withRuletyperule; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*RuleType)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.Ruletyperule = []*Rule{}
		}
		query.withFKs = true
		query.Where(predicate.Rule(func(s *sql.Selector) {
			s.Where(sql.InValues(ruletype.RuletyperuleColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.rule_type_ruletyperule
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "rule_type_ruletyperule" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "rule_type_ruletyperule" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.Ruletyperule = append(node.Edges.Ruletyperule, n)
		}
	}

	return nodes, nil
}

func (rtq *RuleTypeQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := rtq.querySpec()
	return sqlgraph.CountNodes(ctx, rtq.driver, _spec)
}

func (rtq *RuleTypeQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := rtq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (rtq *RuleTypeQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   ruletype.Table,
			Columns: ruletype.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: ruletype.FieldID,
			},
		},
		From:   rtq.sql,
		Unique: true,
	}
	if ps := rtq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := rtq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := rtq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := rtq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, ruletype.ValidColumn)
			}
		}
	}
	return _spec
}

func (rtq *RuleTypeQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(rtq.driver.Dialect())
	t1 := builder.Table(ruletype.Table)
	selector := builder.Select(t1.Columns(ruletype.Columns...)...).From(t1)
	if rtq.sql != nil {
		selector = rtq.sql
		selector.Select(selector.Columns(ruletype.Columns...)...)
	}
	for _, p := range rtq.predicates {
		p(selector)
	}
	for _, p := range rtq.order {
		p(selector, ruletype.ValidColumn)
	}
	if offset := rtq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := rtq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// RuleTypeGroupBy is the builder for group-by RuleType entities.
type RuleTypeGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (rtgb *RuleTypeGroupBy) Aggregate(fns ...AggregateFunc) *RuleTypeGroupBy {
	rtgb.fns = append(rtgb.fns, fns...)
	return rtgb
}

// Scan applies the group-by query and scan the result into the given value.
func (rtgb *RuleTypeGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := rtgb.path(ctx)
	if err != nil {
		return err
	}
	rtgb.sql = query
	return rtgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := rtgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(rtgb.fields) > 1 {
		return nil, errors.New("ent: RuleTypeGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := rtgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) StringsX(ctx context.Context) []string {
	v, err := rtgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rtgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) StringX(ctx context.Context) string {
	v, err := rtgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(rtgb.fields) > 1 {
		return nil, errors.New("ent: RuleTypeGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := rtgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) IntsX(ctx context.Context) []int {
	v, err := rtgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rtgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) IntX(ctx context.Context) int {
	v, err := rtgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(rtgb.fields) > 1 {
		return nil, errors.New("ent: RuleTypeGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := rtgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := rtgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rtgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) Float64X(ctx context.Context) float64 {
	v, err := rtgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(rtgb.fields) > 1 {
		return nil, errors.New("ent: RuleTypeGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := rtgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := rtgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (rtgb *RuleTypeGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rtgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rtgb *RuleTypeGroupBy) BoolX(ctx context.Context) bool {
	v, err := rtgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rtgb *RuleTypeGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rtgb.fields {
		if !ruletype.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := rtgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rtgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rtgb *RuleTypeGroupBy) sqlQuery() *sql.Selector {
	selector := rtgb.sql
	columns := make([]string, 0, len(rtgb.fields)+len(rtgb.fns))
	columns = append(columns, rtgb.fields...)
	for _, fn := range rtgb.fns {
		columns = append(columns, fn(selector, ruletype.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(rtgb.fields...)
}

// RuleTypeSelect is the builder for select fields of RuleType entities.
type RuleTypeSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (rts *RuleTypeSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := rts.path(ctx)
	if err != nil {
		return err
	}
	rts.sql = query
	return rts.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rts *RuleTypeSelect) ScanX(ctx context.Context, v interface{}) {
	if err := rts.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Strings(ctx context.Context) ([]string, error) {
	if len(rts.fields) > 1 {
		return nil, errors.New("ent: RuleTypeSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := rts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rts *RuleTypeSelect) StringsX(ctx context.Context) []string {
	v, err := rts.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rts.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rts *RuleTypeSelect) StringX(ctx context.Context) string {
	v, err := rts.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Ints(ctx context.Context) ([]int, error) {
	if len(rts.fields) > 1 {
		return nil, errors.New("ent: RuleTypeSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := rts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rts *RuleTypeSelect) IntsX(ctx context.Context) []int {
	v, err := rts.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rts.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rts *RuleTypeSelect) IntX(ctx context.Context) int {
	v, err := rts.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(rts.fields) > 1 {
		return nil, errors.New("ent: RuleTypeSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := rts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rts *RuleTypeSelect) Float64sX(ctx context.Context) []float64 {
	v, err := rts.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rts.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rts *RuleTypeSelect) Float64X(ctx context.Context) float64 {
	v, err := rts.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(rts.fields) > 1 {
		return nil, errors.New("ent: RuleTypeSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := rts.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rts *RuleTypeSelect) BoolsX(ctx context.Context) []bool {
	v, err := rts.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (rts *RuleTypeSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rts.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruletype.Label}
	default:
		err = fmt.Errorf("ent: RuleTypeSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rts *RuleTypeSelect) BoolX(ctx context.Context) bool {
	v, err := rts.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rts *RuleTypeSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rts.fields {
		if !ruletype.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := rts.sqlQuery().Query()
	if err := rts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rts *RuleTypeSelect) sqlQuery() sql.Querier {
	selector := rts.sql
	selector.Select(selector.Columns(rts.fields...)...)
	return selector
}