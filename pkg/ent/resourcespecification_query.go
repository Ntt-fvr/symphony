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
	"github.com/facebookincubator/symphony/pkg/ent/resourcepropertytype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
)

// ResourceSpecificationQuery is the builder for querying ResourceSpecification entities.
type ResourceSpecificationQuery struct {
	config
	limit      *int
	offset     *int
	order      []OrderFunc
	unique     []string
	predicates []predicate.ResourceSpecification
	// eager-loading edges.
	withResourcetype               *ResourceTypeQuery
	withResourcePropertyType       *ResourcePropertyTypeQuery
	withResourceSpecification      *ResourceSpecificationRelationshipQuery
	withResourceSpecificationItems *ResourceSpecificationItemsQuery
	withFKs                        bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the builder.
func (rsq *ResourceSpecificationQuery) Where(ps ...predicate.ResourceSpecification) *ResourceSpecificationQuery {
	rsq.predicates = append(rsq.predicates, ps...)
	return rsq
}

// Limit adds a limit step to the query.
func (rsq *ResourceSpecificationQuery) Limit(limit int) *ResourceSpecificationQuery {
	rsq.limit = &limit
	return rsq
}

// Offset adds an offset step to the query.
func (rsq *ResourceSpecificationQuery) Offset(offset int) *ResourceSpecificationQuery {
	rsq.offset = &offset
	return rsq
}

// Order adds an order step to the query.
func (rsq *ResourceSpecificationQuery) Order(o ...OrderFunc) *ResourceSpecificationQuery {
	rsq.order = append(rsq.order, o...)
	return rsq
}

// QueryResourcetype chains the current query on the resourcetype edge.
func (rsq *ResourceSpecificationQuery) QueryResourcetype() *ResourceTypeQuery {
	query := &ResourceTypeQuery{config: rsq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecification.Table, resourcespecification.FieldID, selector),
			sqlgraph.To(resourcetype.Table, resourcetype.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, resourcespecification.ResourcetypeTable, resourcespecification.ResourcetypeColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryResourcePropertyType chains the current query on the resource_property_type edge.
func (rsq *ResourceSpecificationQuery) QueryResourcePropertyType() *ResourcePropertyTypeQuery {
	query := &ResourcePropertyTypeQuery{config: rsq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecification.Table, resourcespecification.FieldID, selector),
			sqlgraph.To(resourcepropertytype.Table, resourcepropertytype.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, resourcespecification.ResourcePropertyTypeTable, resourcespecification.ResourcePropertyTypeColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryResourceSpecification chains the current query on the resource_specification edge.
func (rsq *ResourceSpecificationQuery) QueryResourceSpecification() *ResourceSpecificationRelationshipQuery {
	query := &ResourceSpecificationRelationshipQuery{config: rsq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecification.Table, resourcespecification.FieldID, selector),
			sqlgraph.To(resourcespecificationrelationship.Table, resourcespecificationrelationship.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, resourcespecification.ResourceSpecificationTable, resourcespecification.ResourceSpecificationColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryResourceSpecificationItems chains the current query on the resource_specification_items edge.
func (rsq *ResourceSpecificationQuery) QueryResourceSpecificationItems() *ResourceSpecificationItemsQuery {
	query := &ResourceSpecificationItemsQuery{config: rsq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rsq.sqlQuery()
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(resourcespecification.Table, resourcespecification.FieldID, selector),
			sqlgraph.To(resourcespecificationitems.Table, resourcespecificationitems.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, resourcespecification.ResourceSpecificationItemsTable, resourcespecification.ResourceSpecificationItemsColumn),
		)
		fromU = sqlgraph.SetNeighbors(rsq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first ResourceSpecification entity in the query. Returns *NotFoundError when no resourcespecification was found.
func (rsq *ResourceSpecificationQuery) First(ctx context.Context) (*ResourceSpecification, error) {
	nodes, err := rsq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{resourcespecification.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) FirstX(ctx context.Context) *ResourceSpecification {
	node, err := rsq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first ResourceSpecification id in the query. Returns *NotFoundError when no id was found.
func (rsq *ResourceSpecificationQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rsq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{resourcespecification.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) FirstIDX(ctx context.Context) int {
	id, err := rsq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns the only ResourceSpecification entity in the query, returns an error if not exactly one entity was returned.
func (rsq *ResourceSpecificationQuery) Only(ctx context.Context) (*ResourceSpecification, error) {
	nodes, err := rsq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{resourcespecification.Label}
	default:
		return nil, &NotSingularError{resourcespecification.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) OnlyX(ctx context.Context) *ResourceSpecification {
	node, err := rsq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID returns the only ResourceSpecification id in the query, returns an error if not exactly one id was returned.
func (rsq *ResourceSpecificationQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = rsq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = &NotSingularError{resourcespecification.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) OnlyIDX(ctx context.Context) int {
	id, err := rsq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ResourceSpecifications.
func (rsq *ResourceSpecificationQuery) All(ctx context.Context) ([]*ResourceSpecification, error) {
	if err := rsq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return rsq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) AllX(ctx context.Context) []*ResourceSpecification {
	nodes, err := rsq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of ResourceSpecification ids.
func (rsq *ResourceSpecificationQuery) IDs(ctx context.Context) ([]int, error) {
	var ids []int
	if err := rsq.Select(resourcespecification.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) IDsX(ctx context.Context) []int {
	ids, err := rsq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (rsq *ResourceSpecificationQuery) Count(ctx context.Context) (int, error) {
	if err := rsq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return rsq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) CountX(ctx context.Context) int {
	count, err := rsq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (rsq *ResourceSpecificationQuery) Exist(ctx context.Context) (bool, error) {
	if err := rsq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return rsq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (rsq *ResourceSpecificationQuery) ExistX(ctx context.Context) bool {
	exist, err := rsq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the query builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (rsq *ResourceSpecificationQuery) Clone() *ResourceSpecificationQuery {
	if rsq == nil {
		return nil
	}
	return &ResourceSpecificationQuery{
		config:                         rsq.config,
		limit:                          rsq.limit,
		offset:                         rsq.offset,
		order:                          append([]OrderFunc{}, rsq.order...),
		unique:                         append([]string{}, rsq.unique...),
		predicates:                     append([]predicate.ResourceSpecification{}, rsq.predicates...),
		withResourcetype:               rsq.withResourcetype.Clone(),
		withResourcePropertyType:       rsq.withResourcePropertyType.Clone(),
		withResourceSpecification:      rsq.withResourceSpecification.Clone(),
		withResourceSpecificationItems: rsq.withResourceSpecificationItems.Clone(),
		// clone intermediate query.
		sql:  rsq.sql.Clone(),
		path: rsq.path,
	}
}

//  WithResourcetype tells the query-builder to eager-loads the nodes that are connected to
// the "resourcetype" edge. The optional arguments used to configure the query builder of the edge.
func (rsq *ResourceSpecificationQuery) WithResourcetype(opts ...func(*ResourceTypeQuery)) *ResourceSpecificationQuery {
	query := &ResourceTypeQuery{config: rsq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsq.withResourcetype = query
	return rsq
}

//  WithResourcePropertyType tells the query-builder to eager-loads the nodes that are connected to
// the "resource_property_type" edge. The optional arguments used to configure the query builder of the edge.
func (rsq *ResourceSpecificationQuery) WithResourcePropertyType(opts ...func(*ResourcePropertyTypeQuery)) *ResourceSpecificationQuery {
	query := &ResourcePropertyTypeQuery{config: rsq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsq.withResourcePropertyType = query
	return rsq
}

//  WithResourceSpecification tells the query-builder to eager-loads the nodes that are connected to
// the "resource_specification" edge. The optional arguments used to configure the query builder of the edge.
func (rsq *ResourceSpecificationQuery) WithResourceSpecification(opts ...func(*ResourceSpecificationRelationshipQuery)) *ResourceSpecificationQuery {
	query := &ResourceSpecificationRelationshipQuery{config: rsq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsq.withResourceSpecification = query
	return rsq
}

//  WithResourceSpecificationItems tells the query-builder to eager-loads the nodes that are connected to
// the "resource_specification_items" edge. The optional arguments used to configure the query builder of the edge.
func (rsq *ResourceSpecificationQuery) WithResourceSpecificationItems(opts ...func(*ResourceSpecificationItemsQuery)) *ResourceSpecificationQuery {
	query := &ResourceSpecificationItemsQuery{config: rsq.config}
	for _, opt := range opts {
		opt(query)
	}
	rsq.withResourceSpecificationItems = query
	return rsq
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
//	client.ResourceSpecification.Query().
//		GroupBy(resourcespecification.FieldCreateTime).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (rsq *ResourceSpecificationQuery) GroupBy(field string, fields ...string) *ResourceSpecificationGroupBy {
	group := &ResourceSpecificationGroupBy{config: rsq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rsq.sqlQuery(), nil
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
//	client.ResourceSpecification.Query().
//		Select(resourcespecification.FieldCreateTime).
//		Scan(ctx, &v)
//
func (rsq *ResourceSpecificationQuery) Select(field string, fields ...string) *ResourceSpecificationSelect {
	selector := &ResourceSpecificationSelect{config: rsq.config}
	selector.fields = append([]string{field}, fields...)
	selector.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := rsq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return rsq.sqlQuery(), nil
	}
	return selector
}

func (rsq *ResourceSpecificationQuery) prepareQuery(ctx context.Context) error {
	if rsq.path != nil {
		prev, err := rsq.path(ctx)
		if err != nil {
			return err
		}
		rsq.sql = prev
	}
	if err := resourcespecification.Policy.EvalQuery(ctx, rsq); err != nil {
		return err
	}
	return nil
}

func (rsq *ResourceSpecificationQuery) sqlAll(ctx context.Context) ([]*ResourceSpecification, error) {
	var (
		nodes       = []*ResourceSpecification{}
		withFKs     = rsq.withFKs
		_spec       = rsq.querySpec()
		loadedTypes = [4]bool{
			rsq.withResourcetype != nil,
			rsq.withResourcePropertyType != nil,
			rsq.withResourceSpecification != nil,
			rsq.withResourceSpecificationItems != nil,
		}
	)
	if rsq.withResourcetype != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, resourcespecification.ForeignKeys...)
	}
	_spec.ScanValues = func() []interface{} {
		node := &ResourceSpecification{config: rsq.config}
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
	if err := sqlgraph.QueryNodes(ctx, rsq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := rsq.withResourcetype; query != nil {
		ids := make([]int, 0, len(nodes))
		nodeids := make(map[int][]*ResourceSpecification)
		for i := range nodes {
			if fk := nodes[i].resource_type_resource_specification; fk != nil {
				ids = append(ids, *fk)
				nodeids[*fk] = append(nodeids[*fk], nodes[i])
			}
		}
		query.Where(resourcetype.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_type_resource_specification" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Resourcetype = n
			}
		}
	}

	if query := rsq.withResourcePropertyType; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ResourceSpecification)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.ResourcePropertyType = []*ResourcePropertyType{}
		}
		query.withFKs = true
		query.Where(predicate.ResourcePropertyType(func(s *sql.Selector) {
			s.Where(sql.InValues(resourcespecification.ResourcePropertyTypeColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.resource_specification_resource_property_type
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "resource_specification_resource_property_type" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_specification_resource_property_type" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.ResourcePropertyType = append(node.Edges.ResourcePropertyType, n)
		}
	}

	if query := rsq.withResourceSpecification; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ResourceSpecification)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.ResourceSpecification = []*ResourceSpecificationRelationship{}
		}
		query.withFKs = true
		query.Where(predicate.ResourceSpecificationRelationship(func(s *sql.Selector) {
			s.Where(sql.InValues(resourcespecification.ResourceSpecificationColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.resource_specification_resource_specification
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "resource_specification_resource_specification" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_specification_resource_specification" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.ResourceSpecification = append(node.Edges.ResourceSpecification, n)
		}
	}

	if query := rsq.withResourceSpecificationItems; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[int]*ResourceSpecification)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.ResourceSpecificationItems = []*ResourceSpecificationItems{}
		}
		query.withFKs = true
		query.Where(predicate.ResourceSpecificationItems(func(s *sql.Selector) {
			s.Where(sql.InValues(resourcespecification.ResourceSpecificationItemsColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.resource_specification_resource_specification_items
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "resource_specification_resource_specification_items" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "resource_specification_resource_specification_items" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.ResourceSpecificationItems = append(node.Edges.ResourceSpecificationItems, n)
		}
	}

	return nodes, nil
}

func (rsq *ResourceSpecificationQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := rsq.querySpec()
	return sqlgraph.CountNodes(ctx, rsq.driver, _spec)
}

func (rsq *ResourceSpecificationQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := rsq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %v", err)
	}
	return n > 0, nil
}

func (rsq *ResourceSpecificationQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   resourcespecification.Table,
			Columns: resourcespecification.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: resourcespecification.FieldID,
			},
		},
		From:   rsq.sql,
		Unique: true,
	}
	if ps := rsq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := rsq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := rsq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := rsq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector, resourcespecification.ValidColumn)
			}
		}
	}
	return _spec
}

func (rsq *ResourceSpecificationQuery) sqlQuery() *sql.Selector {
	builder := sql.Dialect(rsq.driver.Dialect())
	t1 := builder.Table(resourcespecification.Table)
	selector := builder.Select(t1.Columns(resourcespecification.Columns...)...).From(t1)
	if rsq.sql != nil {
		selector = rsq.sql
		selector.Select(selector.Columns(resourcespecification.Columns...)...)
	}
	for _, p := range rsq.predicates {
		p(selector)
	}
	for _, p := range rsq.order {
		p(selector, resourcespecification.ValidColumn)
	}
	if offset := rsq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := rsq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ResourceSpecificationGroupBy is the builder for group-by ResourceSpecification entities.
type ResourceSpecificationGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (rsgb *ResourceSpecificationGroupBy) Aggregate(fns ...AggregateFunc) *ResourceSpecificationGroupBy {
	rsgb.fns = append(rsgb.fns, fns...)
	return rsgb
}

// Scan applies the group-by query and scan the result into the given value.
func (rsgb *ResourceSpecificationGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := rsgb.path(ctx)
	if err != nil {
		return err
	}
	rsgb.sql = query
	return rsgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := rsgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(rsgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := rsgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) StringsX(ctx context.Context) []string {
	v, err := rsgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rsgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) StringX(ctx context.Context) string {
	v, err := rsgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(rsgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := rsgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) IntsX(ctx context.Context) []int {
	v, err := rsgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rsgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) IntX(ctx context.Context) int {
	v, err := rsgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(rsgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := rsgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := rsgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rsgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) Float64X(ctx context.Context) float64 {
	v, err := rsgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(rsgb.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := rsgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := rsgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from group-by. It is only allowed when querying group-by with one field.
func (rsgb *ResourceSpecificationGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rsgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rsgb *ResourceSpecificationGroupBy) BoolX(ctx context.Context) bool {
	v, err := rsgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rsgb *ResourceSpecificationGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rsgb.fields {
		if !resourcespecification.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := rsgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rsgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rsgb *ResourceSpecificationGroupBy) sqlQuery() *sql.Selector {
	selector := rsgb.sql
	columns := make([]string, 0, len(rsgb.fields)+len(rsgb.fns))
	columns = append(columns, rsgb.fields...)
	for _, fn := range rsgb.fns {
		columns = append(columns, fn(selector, resourcespecification.ValidColumn))
	}
	return selector.Select(columns...).GroupBy(rsgb.fields...)
}

// ResourceSpecificationSelect is the builder for select fields of ResourceSpecification entities.
type ResourceSpecificationSelect struct {
	config
	fields []string
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Scan applies the selector query and scan the result into the given value.
func (rss *ResourceSpecificationSelect) Scan(ctx context.Context, v interface{}) error {
	query, err := rss.path(ctx)
	if err != nil {
		return err
	}
	rss.sql = query
	return rss.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) ScanX(ctx context.Context, v interface{}) {
	if err := rss.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Strings(ctx context.Context) ([]string, error) {
	if len(rss.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := rss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) StringsX(ctx context.Context) []string {
	v, err := rss.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = rss.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) StringX(ctx context.Context) string {
	v, err := rss.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Ints(ctx context.Context) ([]int, error) {
	if len(rss.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := rss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) IntsX(ctx context.Context) []int {
	v, err := rss.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = rss.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) IntX(ctx context.Context) int {
	v, err := rss.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(rss.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := rss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) Float64sX(ctx context.Context) []float64 {
	v, err := rss.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = rss.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) Float64X(ctx context.Context) float64 {
	v, err := rss.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(rss.fields) > 1 {
		return nil, errors.New("ent: ResourceSpecificationSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := rss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) BoolsX(ctx context.Context) []bool {
	v, err := rss.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from selector. It is only allowed when selecting one field.
func (rss *ResourceSpecificationSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = rss.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{resourcespecification.Label}
	default:
		err = fmt.Errorf("ent: ResourceSpecificationSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (rss *ResourceSpecificationSelect) BoolX(ctx context.Context) bool {
	v, err := rss.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (rss *ResourceSpecificationSelect) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range rss.fields {
		if !resourcespecification.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for selection", f)}
		}
	}
	rows := &sql.Rows{}
	query, args := rss.sqlQuery().Query()
	if err := rss.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (rss *ResourceSpecificationSelect) sqlQuery() sql.Querier {
	selector := rss.sql
	selector.Select(selector.Columns(rss.fields...)...)
	return selector
}
