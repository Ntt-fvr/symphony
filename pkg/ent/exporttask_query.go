// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"math"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ExportTaskQuery is the builder for querying ExportTask entities.
type ExportTaskQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.ExportTask
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (etq *ExportTaskQuery) Where(ps ...predicate.ExportTask) *ExportTaskQuery {
	etq.predicates = append(etq.predicates, ps...)
	return etq
}

// Limit adds a limit step to the query.
func (etq *ExportTaskQuery) Limit(limit int) *ExportTaskQuery {
	etq.limit = &limit
	return etq
}

// Offset adds an offset step to the query.
func (etq *ExportTaskQuery) Offset(offset int) *ExportTaskQuery {
	etq.offset = &offset
	return etq
}

// Order adds an order step to the query.
func (etq *ExportTaskQuery) Order(o ...OrderFunc) *ExportTaskQuery {
	etq.order = append(etq.order, o...)
	return etq
}

// First returns the first ExportTask entity in the query. Returns *NotFoundError when no exporttask was found.
func (etq *ExportTaskQuery) First(ctx context.Context) (*ExportTask, error) {
	ets, err := etq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(ets) == 0 {
		return nil, &NotFoundError{exporttask.Label}
	}
	return ets[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (etq *ExportTaskQuery) FirstX(ctx context.Context) *ExportTask {
	et, err := etq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return et
}

// FirstID returns the first ExportTask id in the query. Returns *NotFoundError when no id was found.
func (etq *ExportTaskQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = etq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{exporttask.Label}
		return
	}
	return ids[0], nil
}

// FirstXID is like FirstID, but panics if an error occurs.
func (etq *ExportTaskQuery) FirstXID(ctx context.Context) int {
	id, err := etq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only ExportTask entity in the query, returns an error if not exactly one entity was returned.
func (etq *ExportTaskQuery) Only(ctx context.Context) (*ExportTask, error) {
	ets, err := etq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(ets) {
	case 1:
		return ets[0], nil
	case 0:
		return nil, &NotFoundError{exporttask.Label}
	default:
		return nil, &NotSingularError{exporttask.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (etq *ExportTaskQuery) OnlyX(ctx context.Context) *ExportTask {
	et, err := etq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return et
}

// OnlyID returns the only ExportTask id in the query, returns an error if not exactly one id was returned.
func (etq *ExportTaskQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = etq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = &NotSingularError{exporttask.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (etq *ExportTaskQuery) OnlyIDX(ctx context.Context) int {
	id, err := etq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ExportTasks.
func (etq *ExportTaskQuery) All(ctx context.Context) ([]*ExportTask, error) {
	if err := etq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return etq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (etq *ExportTaskQuery) AllX(ctx context.Context) []*ExportTask {
	ets, err := etq.All(ctx)
	if err != nil {
		panic(err)
	}
	return ets
}

// IDs executes the query and returns a list of ExportTask ids.
func (etq *ExportTaskQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := etq.Select(exporttask.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (etq *ExportTaskQuery) IDsX(ctx context.Context) []int {
	ids, err := etq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (etq *ExportTaskQuery) Count(ctx context.Context) (int, error) {
	if err := etq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return etq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (etq *ExportTaskQuery) CountX(ctx context.Context) int {
	count, err := etq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (etq *ExportTaskQuery) Exist(ctx context.Context) (bool, error) {
	if err := etq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return etq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (etq *ExportTaskQuery) ExistX(ctx context.Context) bool {
	exist, err := etq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (etq *ExportTaskQuery) Clone() *ExportTaskQuery {
	return &ExportTaskQuery{
		config:     etq.config,
		limit:      etq.limit,
		offset:     etq.offset,
		order:      append([]OrderFunc{}, etq.order...),
		unique:     append([]string{}, etq.unique...),
		predicates: append([]predicate.ExportTask{}, etq.predicates...),
		// clone intermediate query.
		sql:  etq.sql.Clone(),
		path: etq.path,
	}
}

// GroupBy used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Type exporttask.Type `json:"type,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.ExportTask.Query().
//		GroupBy(exporttask.FieldType).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (etq *ExportTaskQuery) GroupBy(field string, fields ...string) *ExportTaskGroupBy {
	group := &ExportTaskGroupBy{config: etq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := etq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return etq.sqlQuery(), nil
	}
	return group
}

// Select one or more fields from the given query.
//
// Example:
//
//	var v []struct {
//		Type exporttask.Type `json:"type,omitempty"`
//	}
//
//	client.ExportTask.Query().
//		Select(exporttask.FieldType).
//		Scan(ctx, &v)
//
func (etq *ExportTaskQuery) Select(field string, fields ...string) *ExportTaskSelect {
	selector := &ExportTaskSelect{config: etq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := etq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return etq.sqlQuery(), nil
	}
	return selector
}

func (etq *ExportTaskQuery) prepareQuery(ctx context.Context) error {
	if etq.path != nil {
		prev, err := etq.path(ctx)
		if err != nil {
			return err
		}
		etq.sql = prev
	}
	if err := exporttask.Policy.EvalQuery(ctx, etq); err != nil {
		return err
	}
	return nil
}

func (etq *ExportTaskQuery) sqlAll(ctx context.Context) ([]*ExportTask, error) {
	var (
		nodes = []*ExportTask{}
		_spec = etq.querySpec()
	)
	_spec.ScanValues = func() []interface{} {
		node := &ExportTask{config: etq.config}
		nodes = append(nodes, node)
		values := node.scanValues()
		return values
	}
	_spec.Assign = func(values ...interface{}) error {
		if len(nodes) == 0 {
			return fmt.Errorf("ent: Assign called without calling ScanValues")
		}
		node := nodes[len(nodes)-1]
		return node.assignValues(values...)
	}
	if err := sqlgraph.QueryNodes(ctx, etq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	return nodes, nil
}

func (etq *ExportTaskQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := etq.querySpec()
	return sqlgraph.CountNodes(ctx, etq.driver, _spec)
}

func (etq *ExportTaskQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := etq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (etq *ExportTaskQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   exporttask.Table,
			Columns: exporttask.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: exporttask.FieldID,
			},
		},
		From:   etq.sql,
		Unique: true,
	}
	if ps := etq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := etq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := etq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := etq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (etq *ExportTaskQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(etq.driver.Dialect())
	t1 := builder.Table(exporttask.Table)
	selector := builder.Select(t1.Columns(exporttask.Columns...)...).From(t1)
	if etq.sql != nil {
		selector = etq.sql
		selector.Select(selector.Columns(exporttask.Columns...)...)
	}
	for _, p := range etq.predicates {
		p(selector)
	}
	for _, p := range etq.order {
		p(selector)
	}
	if offset := etq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := etq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ExportTaskGroupBy is the builder for group-by ExportTask entities.
type ExportTaskGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (etgb *ExportTaskGroupBy) Aggregate(fns ...AggregateFunc) *ExportTaskGroupBy {
	etgb.fns = append(etgb.fns, fns...)
	return etgb
}

// Scan applies the group-by query and scan the result into the given value.
func (etgb *ExportTaskGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := etgb.path(ctx)
	if err != nil {
		return err
	}
	etgb.sql = query
	return etgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := etgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(etgb.fields) > 1 {
		return nil, errors.New("ent: ExportTaskGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := etgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) StringsX(ctx context.Context) []string {
	v, err := etgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = etgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) StringX(ctx context.Context) string {
	v, err := etgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(etgb.fields) > 1 {
		return nil, errors.New("ent: ExportTaskGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := etgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) IntsX(ctx context.Context) []int {
	v, err := etgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = etgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) IntX(ctx context.Context) int {
	v, err := etgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(etgb.fields) > 1 {
		return nil, errors.New("ent: ExportTaskGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := etgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := etgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = etgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) Float64X(ctx context.Context) float64 {
	v, err := etgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(etgb.fields) > 1 {
		return nil, errors.New("ent: ExportTaskGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := etgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := etgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (etgb *ExportTaskGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = etgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (etgb *ExportTaskGroupBy) BoolX(ctx context.Context) bool {
	v, err := etgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (etgb *ExportTaskGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := etgb.sqlQuery().Query()
	if err := etgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (etgb *ExportTaskGroupBy) sqlQuery() *sql.Selector {
	selector := etgb.sql
	columns := make([]string, 0, len(etgb.fields)+len(etgb.fns))
	columns = append(columns, etgb.fields...)
	for _, fn := range etgb.fns {
		columns = append(columns, fn(selector))
	}
	return selector.Select(columns...).GroupBy(etgb.fields...)
}

// ExportTaskSelect is the builder for select fields of ExportTask entities.
type ExportTaskSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (ets *ExportTaskSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := ets.path(ctx)
	if err != nil {
		return err
	}
	ets.sql = query
	return ets.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ets *ExportTaskSelect) ScanX(ctx context.Context, v interface{}) {
	if err := ets.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Strings(ctx context.Context) ([]string, error) {
	if len(ets.fields) > 1 {
		return nil, errors.New("ent: ExportTaskSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := ets.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ets *ExportTaskSelect) StringsX(ctx context.Context) []string {
	v, err := ets.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ets.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ets *ExportTaskSelect) StringX(ctx context.Context) string {
	v, err := ets.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Ints(ctx context.Context) ([]int, error) {
	if len(ets.fields) > 1 {
		return nil, errors.New("ent: ExportTaskSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := ets.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ets *ExportTaskSelect) IntsX(ctx context.Context) []int {
	v, err := ets.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ets.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ets *ExportTaskSelect) IntX(ctx context.Context) int {
	v, err := ets.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(ets.fields) > 1 {
		return nil, errors.New("ent: ExportTaskSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := ets.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ets *ExportTaskSelect) Float64sX(ctx context.Context) []float64 {
	v, err := ets.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ets.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ets *ExportTaskSelect) Float64X(ctx context.Context) float64 {
	v, err := ets.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(ets.fields) > 1 {
		return nil, errors.New("ent: ExportTaskSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := ets.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ets *ExportTaskSelect) BoolsX(ctx context.Context) []bool {
	v, err := ets.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (ets *ExportTaskSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ets.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{exporttask.Label}
	default:
		err = fmt.Errorf("ent: ExportTaskSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ets *ExportTaskSelect) BoolX(ctx context.Context) bool {
	v, err := ets.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ets *ExportTaskSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := ets.sqlQuery().Query()
	if err := ets.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ets *ExportTaskSelect) sqlQuery() sql.Querier {
	selector := ets.sql
	selector.Select(selector.Columns(ets.fields...)...)
	return selector
}
