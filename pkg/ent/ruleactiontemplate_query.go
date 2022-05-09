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
	"github.com/facebookincubator/symphony/pkg/ent/ruleaction"
	"github.com/facebookincubator/symphony/pkg/ent/ruleactiontemplate"
)

// RuleActionTemplateQuery is the builder for querying RuleActionTemplate entities.
type RuleActionTemplateQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.RuleActionTemplate
	// eager-loading edges.
	withRuleActionTemplateRuleAction *RuleActionQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (ratq *RuleActionTemplateQuery) Where(ps ...predicate.RuleActionTemplate) *RuleActionTemplateQuery {
	ratq.predicates = append(ratq.predicates, ps...)
	return ratq
}

// Limit adds a limit step to the query.
func (ratq *RuleActionTemplateQuery) Limit(limit int) *RuleActionTemplateQuery {
	ratq.limit = &limit
	return ratq
}

// Offset adds an offset step to the query.
func (ratq *RuleActionTemplateQuery) Offset(offset int) *RuleActionTemplateQuery {
	ratq.offset = &offset
	return ratq
}

// Order adds an order step to the query.
func (ratq *RuleActionTemplateQuery) Order(o ...OrderFunc) *RuleActionTemplateQuery {
	ratq.order = append(ratq.order, o...)
	return ratq
}

// QueryRuleActionTemplateRuleAction chains the current query on the rule_action_template_rule_action edge.
func (ratq *RuleActionTemplateQuery) QueryRuleActionTemplateRuleAction() *RuleActionQuery {
	query := &RuleActionQuery{config: ratq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ratq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ratq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(ruleactiontemplate.Table, ruleactiontemplate.FieldID, selector),
			sqlgraph.To(ruleaction.Table, ruleaction.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ruleactiontemplate.RuleActionTemplateRuleActionTable, ruleactiontemplate.RuleActionTemplateRuleActionColumn),
		)
		fromU = sqlgraph.SetNeighbors(ratq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first RuleActionTemplate entity in the query. Returns *NotFoundError when no ruleactiontemplate was found.
func (ratq *RuleActionTemplateQuery) First(ctx context.Context) (*RuleActionTemplate, error) {
	nodes, err := ratq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{ruleactiontemplate.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) FirstX(ctx context.Context) *RuleActionTemplate {
	node, err := ratq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first RuleActionTemplate id in the query. Returns *NotFoundError when no id was found.
func (ratq *RuleActionTemplateQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ratq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{ruleactiontemplate.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) FirstIDX(ctx context.Context) int {
	id, err := ratq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only RuleActionTemplate entity in the query, returns an error if not exactly one entity was returned.
func (ratq *RuleActionTemplateQuery) Only(ctx context.Context) (*RuleActionTemplate, error) {
	nodes, err := ratq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{ruleactiontemplate.Label}
	default:
		return nil, &NotSingularError{ruleactiontemplate.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) OnlyX(ctx context.Context) *RuleActionTemplate {
	node, err := ratq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only RuleActionTemplate id in the query, returns an error if not exactly one id was returned.
func (ratq *RuleActionTemplateQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = ratq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = &NotSingularError{ruleactiontemplate.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) OnlyIDX(ctx context.Context) int {
	id, err := ratq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of RuleActionTemplates.
func (ratq *RuleActionTemplateQuery) All(ctx context.Context) ([]*RuleActionTemplate, error) {
	if err := ratq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ratq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) AllX(ctx context.Context) []*RuleActionTemplate {
	nodes, err := ratq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of RuleActionTemplate ids.
func (ratq *RuleActionTemplateQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := ratq.Select(ruleactiontemplate.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) IDsX(ctx context.Context) []int {
	ids, err := ratq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ratq *RuleActionTemplateQuery) Count(ctx context.Context) (int, error) {
	if err := ratq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ratq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) CountX(ctx context.Context) int {
	count, err := ratq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ratq *RuleActionTemplateQuery) Exist(ctx context.Context) (bool, error) {
	if err := ratq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ratq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ratq *RuleActionTemplateQuery) ExistX(ctx context.Context) bool {
	exist, err := ratq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ratq *RuleActionTemplateQuery) Clone() *RuleActionTemplateQuery {
	if ratq == nil {
		return nil
	}
	return &RuleActionTemplateQuery{
		config:                           ratq.config,
		limit:                            ratq.limit,
		offset:                           ratq.offset,
		order:                            append([]OrderFunc{}, ratq.order...),
		unique:                           append([]string{}, ratq.unique...),
		predicates:                       append([]predicate.RuleActionTemplate{}, ratq.predicates...),
		withRuleActionTemplateRuleAction: ratq.withRuleActionTemplateRuleAction.Clone(),
		// clone intermediate query.
		sql:  ratq.sql.Clone(),
		path: ratq.path,
	}
}

//  WithRuleActionTemplateRuleAction tells the query-builder to eager-loads the nodes that are connected to
// the "rule_action_template_rule_action" edge. The optional arguments used to configure the query builder of the edge.
func (ratq *RuleActionTemplateQuery) WithRuleActionTemplateRuleAction(opts ...func(*RuleActionQuery)) *RuleActionTemplateQuery {
	query := &RuleActionQuery{config: ratq.config}
	for _, opt := range opts {
		opt(query)
	}
	ratq.withRuleActionTemplateRuleAction = query
	return ratq
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
//	client.RuleActionTemplate.Query().
//		GroupBy(ruleactiontemplate.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ratq *RuleActionTemplateQuery) GroupBy(field string, fields ...string) *RuleActionTemplateGroupBy {
	group := &RuleActionTemplateGroupBy{config: ratq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ratq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ratq.sqlQuery(), nil
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
//	client.RuleActionTemplate.Query().
//		Select(ruleactiontemplate.FieldCreateTime).
//		Scan(ctx, &v)
//
func (ratq *RuleActionTemplateQuery) Select(field string, fields ...string) *RuleActionTemplateSelect {
	selector := &RuleActionTemplateSelect{config: ratq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ratq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ratq.sqlQuery(), nil
	}
	return selector
}

func (ratq *RuleActionTemplateQuery) prepareQuery(ctx context.Context) error {
	if ratq.path != nil {
		prev, err := ratq.path(ctx)
		if err != nil {
			return err
		}
		ratq.sql = prev
	}
	if err := ruleactiontemplate.Policy.EvalQuery(ctx, ratq); err != nil {
		return err
	}
	return nil
}

func (ratq *RuleActionTemplateQuery) sqlAll(ctx context.Context) ([]*RuleActionTemplate, error) {
	var (
		nodes       = []*RuleActionTemplate{}
		_spec       = ratq.querySpec()
		loadedTypes = [1]bool{
			ratq.withRuleActionTemplateRuleAction != nil,
		}
	)
	_spec.ScanValues = func() []interface{} {
		node := &RuleActionTemplate{config: ratq.config}
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
	if err := sqlgraph.QueryNodes(ctx, ratq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := ratq.withRuleActionTemplateRuleAction; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*RuleActionTemplate)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.RuleActionTemplateRuleAction = []*RuleAction{}
		}
		query.withFKs = true
		query.Where(predicate.RuleAction(func(s *sql.Selector) {
			s.Where(sql.InValues(ruleactiontemplate.RuleActionTemplateRuleActionColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.rule_action_template_rule_action_template_rule_action
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "rule_action_template_rule_action_template_rule_action" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "rule_action_template_rule_action_template_rule_action" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.RuleActionTemplateRuleAction = append(node.Edges.RuleActionTemplateRuleAction, n)
		}
	}

	return nodes, nil
}

func (ratq *RuleActionTemplateQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ratq.querySpec()
	return sqlgraph.CountNodes(ctx, ratq.driver, _spec)
}

func (ratq *RuleActionTemplateQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ratq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (ratq *RuleActionTemplateQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   ruleactiontemplate.Table,
			Columns: ruleactiontemplate.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: ruleactiontemplate.FieldID,
			},
		},
		From:   ratq.sql,
		Unique: true,
	}
	if ps := ratq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ratq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ratq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ratq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, ruleactiontemplate.ValidColumn)
			}
		}
	}
	return _spec
}

func (ratq *RuleActionTemplateQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(ratq.driver.Dialect())
	t1 := builder.Table(ruleactiontemplate.Table)
	selector := builder.Select(t1.Columns(ruleactiontemplate.Columns...)...).From(t1)
	if ratq.sql != nil {
		selector = ratq.sql
		selector.Select(selector.Columns(ruleactiontemplate.Columns...)...)
	}
	for _, p := range ratq.predicates {
		p(selector)
	}
	for _, p := range ratq.order {
		p(selector, ruleactiontemplate.ValidColumn)
	}
	if offset := ratq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ratq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// RuleActionTemplateGroupBy is the builder for group-by RuleActionTemplate entities.
type RuleActionTemplateGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ratgb *RuleActionTemplateGroupBy) Aggregate(fns ...AggregateFunc) *RuleActionTemplateGroupBy {
	ratgb.fns = append(ratgb.fns, fns...)
	return ratgb
}

// Scan applies the group-by query and scan the result into the given value.
func (ratgb *RuleActionTemplateGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ratgb.path(ctx)
	if err != nil {
		return err
	}
	ratgb.sql = query
	return ratgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ratgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ratgb.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ratgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) StringsX(ctx context.Context) []string {
	v, err := ratgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ratgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) StringX(ctx context.Context) string {
	v, err := ratgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ratgb.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ratgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) IntsX(ctx context.Context) []int {
	v, err := ratgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ratgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) IntX(ctx context.Context) int {
	v, err := ratgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ratgb.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ratgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ratgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ratgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ratgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ratgb.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ratgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ratgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (ratgb *RuleActionTemplateGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ratgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ratgb *RuleActionTemplateGroupBy) BoolX(ctx context.Context) bool {
	v, err := ratgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ratgb *RuleActionTemplateGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ratgb.fields {
		if !ruleactiontemplate.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := ratgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ratgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ratgb *RuleActionTemplateGroupBy) sqlQuery() *sql.Selector {
	selector := ratgb.sql
	columns := make([]string, 0, len(ratgb.fields)+len(ratgb.fns))
	columns = append(columns, ratgb.fields...)
	for _, fn := range ratgb.fns {
		columns = append(columns, fn(selector, ruleactiontemplate.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(ratgb.fields...)
}

// RuleActionTemplateSelect is the builder for select fields of RuleActionTemplate entities.
type RuleActionTemplateSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (rats *RuleActionTemplateSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := rats.path(ctx)
	if err != nil {
		return err
	}
	rats.sql = query
	return rats.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) ScanX(ctx context.Context, v interface{}) {
	if err := rats.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Strings(ctx context.Context) ([]string, error) {
	if len(rats.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := rats.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) StringsX(ctx context.Context) []string {
	v, err := rats.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rats.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) StringX(ctx context.Context) string {
	v, err := rats.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Ints(ctx context.Context) ([]int, error) {
	if len(rats.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := rats.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) IntsX(ctx context.Context) []int {
	v, err := rats.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rats.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) IntX(ctx context.Context) int {
	v, err := rats.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(rats.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := rats.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) Float64sX(ctx context.Context) []float64 {
	v, err := rats.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rats.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) Float64X(ctx context.Context) float64 {
	v, err := rats.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(rats.fields) > 1 {
		return nil, errors.New("ent: RuleActionTemplateSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := rats.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) BoolsX(ctx context.Context) []bool {
	v, err := rats.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (rats *RuleActionTemplateSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rats.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{ruleactiontemplate.Label}
	default:
		err = fmt.Errorf("ent: RuleActionTemplateSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rats *RuleActionTemplateSelect) BoolX(ctx context.Context) bool {
	v, err := rats.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rats *RuleActionTemplateSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rats.fields {
		if !ruleactiontemplate.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := rats.sqlQuery().Query()
	if err := rats.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rats *RuleActionTemplateSelect) sqlQuery() sql.Querier {
	selector := rats.sql
	selector.Select(selector.Columns(rats.fields...)...)
	return selector
}
