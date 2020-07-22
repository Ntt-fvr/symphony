// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"encoding/base64"
	"encoding/gob"
	"errors"
	"fmt"
	"io"
	"strconv"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/actionsrule"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategory"
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategorydefinition"
	"github.com/facebookincubator/symphony/pkg/ent/checklistitem"
	"github.com/facebookincubator/symphony/pkg/ent/checklistitemdefinition"
	"github.com/facebookincubator/symphony/pkg/ent/comment"
	"github.com/facebookincubator/symphony/pkg/ent/customer"
	"github.com/facebookincubator/symphony/pkg/ent/equipment"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentcategory"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentport"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentportdefinition"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentporttype"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentposition"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentpositiondefinition"
	"github.com/facebookincubator/symphony/pkg/ent/equipmenttype"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/floorplan"
	"github.com/facebookincubator/symphony/pkg/ent/floorplanreferencepoint"
	"github.com/facebookincubator/symphony/pkg/ent/floorplanscale"
	"github.com/facebookincubator/symphony/pkg/ent/hyperlink"
	"github.com/facebookincubator/symphony/pkg/ent/link"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/permissionspolicy"
	"github.com/facebookincubator/symphony/pkg/ent/project"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/property"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/reportfilter"
	"github.com/facebookincubator/symphony/pkg/ent/service"
	"github.com/facebookincubator/symphony/pkg/ent/serviceendpoint"
	"github.com/facebookincubator/symphony/pkg/ent/serviceendpointdefinition"
	"github.com/facebookincubator/symphony/pkg/ent/servicetype"
	"github.com/facebookincubator/symphony/pkg/ent/survey"
	"github.com/facebookincubator/symphony/pkg/ent/surveycellscan"
	"github.com/facebookincubator/symphony/pkg/ent/surveyquestion"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatecategory"
	"github.com/facebookincubator/symphony/pkg/ent/surveytemplatequestion"
	"github.com/facebookincubator/symphony/pkg/ent/surveywifiscan"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/usersgroup"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/ent/workorderdefinition"
	"github.com/facebookincubator/symphony/pkg/ent/workordertemplate"
	"github.com/facebookincubator/symphony/pkg/ent/workordertype"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func init() {
	gob.Register(time.Time{})
}

// OrderDirection defines the directions in which to order a list of items.
type OrderDirection string

const (
	// OrderDirectionAsc specifies an ascending order.
	OrderDirectionAsc OrderDirection = "ASC"
	// OrderDirectionDesc specifies a descending order.
	OrderDirectionDesc OrderDirection = "DESC"
)

// Validate the order direction value.
func (o OrderDirection) Validate() error {
	if o != OrderDirectionAsc && o != OrderDirectionDesc {
		return fmt.Errorf("%s is not a valid OrderDirection", o)
	}
	return nil
}

// String implements fmt.Stringer interface.
func (o OrderDirection) String() string {
	return string(o)
}

// MarshalGQL implements graphql.Marshaler interface.
func (o OrderDirection) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(o.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (o *OrderDirection) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("order direction %T must be a string", v)
	}
	*o = OrderDirection(str)
	return o.Validate()
}

func (o OrderDirection) reverse() OrderDirection {
	if o == OrderDirectionDesc {
		return OrderDirectionAsc
	}
	return OrderDirectionDesc
}

func (o OrderDirection) orderFunc(field string) OrderFunc {
	if o == OrderDirectionDesc {
		return Desc(field)
	}
	return Asc(field)
}

func cursorsToPredicates(direction OrderDirection, after, before *Cursor, field, idField string) []func(s *sql.Selector) {
	var predicates []func(s *sql.Selector)
	if after != nil {
		if after.Value != nil {
			var predicate func([]string, ...interface{}) *sql.Predicate
			if direction == OrderDirectionAsc {
				predicate = sql.CompositeGT
			} else {
				predicate = sql.CompositeLT
			}
			predicates = append(predicates, func(s *sql.Selector) {
				s.Where(predicate(
					s.Columns(field, idField),
					after.Value, after.ID,
				))
			})
		} else {
			var predicate func(string, interface{}) *sql.Predicate
			if direction == OrderDirectionAsc {
				predicate = sql.GT
			} else {
				predicate = sql.LT
			}
			predicates = append(predicates, func(s *sql.Selector) {
				s.Where(predicate(
					s.C(idField),
					after.ID,
				))
			})
		}
	}
	if before != nil {
		if before.Value != nil {
			var predicate func([]string, ...interface{}) *sql.Predicate
			if direction == OrderDirectionAsc {
				predicate = sql.CompositeLT
			} else {
				predicate = sql.CompositeGT
			}
			predicates = append(predicates, func(s *sql.Selector) {
				s.Where(predicate(
					s.Columns(field, idField),
					before.Value, before.ID,
				))
			})
		} else {
			var predicate func(string, interface{}) *sql.Predicate
			if direction == OrderDirectionAsc {
				predicate = sql.LT
			} else {
				predicate = sql.GT
			}
			predicates = append(predicates, func(s *sql.Selector) {
				s.Where(predicate(
					s.C(idField),
					before.ID,
				))
			})
		}
	}
	return predicates
}

// PageInfo of a connection type.
type PageInfo struct {
	HasNextPage     bool    `json:"hasNextPage"`
	HasPreviousPage bool    `json:"hasPreviousPage"`
	StartCursor     *Cursor `json:"startCursor"`
	EndCursor       *Cursor `json:"endCursor"`
}

// Cursor of an edge type.
type Cursor struct {
	ID    int
	Value Value
}

// MarshalGQL implements graphql.Marshaler interface.
func (c Cursor) MarshalGQL(w io.Writer) {
	quote := []byte{'"'}
	w.Write(quote)
	defer w.Write(quote)
	wc := base64.NewEncoder(base64.RawStdEncoding, w)
	defer wc.Close()
	_ = gob.NewEncoder(wc).Encode(c)
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (c *Cursor) UnmarshalGQL(v interface{}) error {
	s, ok := v.(string)
	if !ok {
		return fmt.Errorf("%T is not a string", v)
	}
	if err := gob.NewDecoder(
		base64.NewDecoder(
			base64.RawStdEncoding,
			strings.NewReader(s),
		),
	).Decode(c); err != nil {
		return fmt.Errorf("cannot decode cursor: %w", err)
	}
	return nil
}

const errInvalidPagination = "INVALID_PAGINATION"

func validateFirstLast(first, last *int) (err *gqlerror.Error) {
	switch {
	case first != nil && last != nil:
		err = &gqlerror.Error{
			Message: "Passing both `first` and `last` to paginate a connection is not supported.",
		}
	case first != nil && *first < 0:
		err = &gqlerror.Error{
			Message: "`first` on a connection cannot be less than zero.",
		}
		errcode.Set(err, errInvalidPagination)
	case last != nil && *last < 0:
		err = &gqlerror.Error{
			Message: "`last` on a connection cannot be less than zero.",
		}
		errcode.Set(err, errInvalidPagination)
	}
	return err
}

func getCollectedField(ctx context.Context, path ...string) *graphql.CollectedField {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return nil
	}
	oc := graphql.GetOperationContext(ctx)
	field := fc.Field

walk:
	for _, name := range path {
		for _, f := range graphql.CollectFields(oc, field.Selections, nil) {
			if f.Name == name {
				field = f
				continue walk
			}
		}
		return nil
	}
	return &field
}

func hasCollectedField(ctx context.Context, path ...string) bool {
	if graphql.GetFieldContext(ctx) == nil {
		return true
	}
	return getCollectedField(ctx, path...) != nil
}

const (
	edgesField      = "edges"
	nodeField       = "node"
	pageInfoField   = "pageInfo"
	totalCountField = "totalCount"
)

// ActionsRuleEdge is the edge representation of ActionsRule.
type ActionsRuleEdge struct {
	Node   *ActionsRule `json:"node"`
	Cursor Cursor       `json:"cursor"`
}

// ActionsRuleConnection is the connection containing edges to ActionsRule.
type ActionsRuleConnection struct {
	Edges      []*ActionsRuleEdge `json:"edges"`
	PageInfo   PageInfo           `json:"pageInfo"`
	TotalCount int                `json:"totalCount"`
}

// ActionsRulePaginateOption enables pagination customization.
type ActionsRulePaginateOption func(*actionsRulePager) error

// WithActionsRuleOrder configures pagination ordering.
func WithActionsRuleOrder(order *ActionsRuleOrder) ActionsRulePaginateOption {
	if order == nil {
		order = DefaultActionsRuleOrder
	}
	o := *order
	return func(pager *actionsRulePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultActionsRuleOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithActionsRuleFilter configures pagination filter.
func WithActionsRuleFilter(filter func(*ActionsRuleQuery) (*ActionsRuleQuery, error)) ActionsRulePaginateOption {
	return func(pager *actionsRulePager) error {
		if filter == nil {
			return errors.New("ActionsRuleQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type actionsRulePager struct {
	order  *ActionsRuleOrder
	filter func(*ActionsRuleQuery) (*ActionsRuleQuery, error)
}

func newActionsRulePager(opts []ActionsRulePaginateOption) (*actionsRulePager, error) {
	pager := &actionsRulePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultActionsRuleOrder
	}
	return pager, nil
}

func (p *actionsRulePager) applyFilter(query *ActionsRuleQuery) (*ActionsRuleQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *actionsRulePager) toCursor(ar *ActionsRule) Cursor {
	return p.order.Field.toCursor(ar)
}

func (p *actionsRulePager) applyCursors(query *ActionsRuleQuery, after, before *Cursor) *ActionsRuleQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultActionsRuleOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *actionsRulePager) applyOrder(query *ActionsRuleQuery, reverse bool) *ActionsRuleQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultActionsRuleOrder.Field {
		query = query.Order(Asc(DefaultActionsRuleOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ActionsRule.
func (ar *ActionsRuleQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ActionsRulePaginateOption,
) (*ActionsRuleConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newActionsRulePager(opts)
	if err != nil {
		return nil, err
	}

	if ar, err = pager.applyFilter(ar); err != nil {
		return nil, err
	}

	conn := &ActionsRuleConnection{Edges: []*ActionsRuleEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ar.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ar.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ar = pager.applyCursors(ar, after, before)
	ar = pager.applyOrder(ar, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ar = ar.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ar = ar.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ar.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ActionsRule
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ActionsRule {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ActionsRule {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ActionsRuleEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ActionsRuleEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ActionsRuleOrderField defines the ordering field of ActionsRule.
type ActionsRuleOrderField struct {
	field    string
	toCursor func(*ActionsRule) Cursor
}

// ActionsRuleOrder defines the ordering of ActionsRule.
type ActionsRuleOrder struct {
	Direction OrderDirection         `json:"direction"`
	Field     *ActionsRuleOrderField `json:"field"`
}

// DefaultActionsRuleOrder is the default ordering of ActionsRule.
var DefaultActionsRuleOrder = &ActionsRuleOrder{
	Direction: OrderDirectionAsc,
	Field: &ActionsRuleOrderField{
		field: actionsrule.FieldID,
		toCursor: func(ar *ActionsRule) Cursor {
			return Cursor{ID: ar.ID}
		},
	},
}

// ActivityEdge is the edge representation of Activity.
type ActivityEdge struct {
	Node   *Activity `json:"node"`
	Cursor Cursor    `json:"cursor"`
}

// ActivityConnection is the connection containing edges to Activity.
type ActivityConnection struct {
	Edges      []*ActivityEdge `json:"edges"`
	PageInfo   PageInfo        `json:"pageInfo"`
	TotalCount int             `json:"totalCount"`
}

// ActivityPaginateOption enables pagination customization.
type ActivityPaginateOption func(*activityPager) error

// WithActivityOrder configures pagination ordering.
func WithActivityOrder(order *ActivityOrder) ActivityPaginateOption {
	if order == nil {
		order = DefaultActivityOrder
	}
	o := *order
	return func(pager *activityPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultActivityOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithActivityFilter configures pagination filter.
func WithActivityFilter(filter func(*ActivityQuery) (*ActivityQuery, error)) ActivityPaginateOption {
	return func(pager *activityPager) error {
		if filter == nil {
			return errors.New("ActivityQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type activityPager struct {
	order  *ActivityOrder
	filter func(*ActivityQuery) (*ActivityQuery, error)
}

func newActivityPager(opts []ActivityPaginateOption) (*activityPager, error) {
	pager := &activityPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultActivityOrder
	}
	return pager, nil
}

func (p *activityPager) applyFilter(query *ActivityQuery) (*ActivityQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *activityPager) toCursor(a *Activity) Cursor {
	return p.order.Field.toCursor(a)
}

func (p *activityPager) applyCursors(query *ActivityQuery, after, before *Cursor) *ActivityQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultActivityOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *activityPager) applyOrder(query *ActivityQuery, reverse bool) *ActivityQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultActivityOrder.Field {
		query = query.Order(Asc(DefaultActivityOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Activity.
func (a *ActivityQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ActivityPaginateOption,
) (*ActivityConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newActivityPager(opts)
	if err != nil {
		return nil, err
	}

	if a, err = pager.applyFilter(a); err != nil {
		return nil, err
	}

	conn := &ActivityConnection{Edges: []*ActivityEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := a.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := a.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	a = pager.applyCursors(a, after, before)
	a = pager.applyOrder(a, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		a = a.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		a = a.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := a.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Activity
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Activity {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Activity {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ActivityEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ActivityEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ActivityOrderField defines the ordering field of Activity.
type ActivityOrderField struct {
	field    string
	toCursor func(*Activity) Cursor
}

// ActivityOrder defines the ordering of Activity.
type ActivityOrder struct {
	Direction OrderDirection      `json:"direction"`
	Field     *ActivityOrderField `json:"field"`
}

// DefaultActivityOrder is the default ordering of Activity.
var DefaultActivityOrder = &ActivityOrder{
	Direction: OrderDirectionAsc,
	Field: &ActivityOrderField{
		field: activity.FieldID,
		toCursor: func(a *Activity) Cursor {
			return Cursor{ID: a.ID}
		},
	},
}

// CheckListCategoryEdge is the edge representation of CheckListCategory.
type CheckListCategoryEdge struct {
	Node   *CheckListCategory `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// CheckListCategoryConnection is the connection containing edges to CheckListCategory.
type CheckListCategoryConnection struct {
	Edges      []*CheckListCategoryEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// CheckListCategoryPaginateOption enables pagination customization.
type CheckListCategoryPaginateOption func(*checkListCategoryPager) error

// WithCheckListCategoryOrder configures pagination ordering.
func WithCheckListCategoryOrder(order *CheckListCategoryOrder) CheckListCategoryPaginateOption {
	if order == nil {
		order = DefaultCheckListCategoryOrder
	}
	o := *order
	return func(pager *checkListCategoryPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCheckListCategoryOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCheckListCategoryFilter configures pagination filter.
func WithCheckListCategoryFilter(filter func(*CheckListCategoryQuery) (*CheckListCategoryQuery, error)) CheckListCategoryPaginateOption {
	return func(pager *checkListCategoryPager) error {
		if filter == nil {
			return errors.New("CheckListCategoryQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type checkListCategoryPager struct {
	order  *CheckListCategoryOrder
	filter func(*CheckListCategoryQuery) (*CheckListCategoryQuery, error)
}

func newCheckListCategoryPager(opts []CheckListCategoryPaginateOption) (*checkListCategoryPager, error) {
	pager := &checkListCategoryPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCheckListCategoryOrder
	}
	return pager, nil
}

func (p *checkListCategoryPager) applyFilter(query *CheckListCategoryQuery) (*CheckListCategoryQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *checkListCategoryPager) toCursor(clc *CheckListCategory) Cursor {
	return p.order.Field.toCursor(clc)
}

func (p *checkListCategoryPager) applyCursors(query *CheckListCategoryQuery, after, before *Cursor) *CheckListCategoryQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCheckListCategoryOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *checkListCategoryPager) applyOrder(query *CheckListCategoryQuery, reverse bool) *CheckListCategoryQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCheckListCategoryOrder.Field {
		query = query.Order(Asc(DefaultCheckListCategoryOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to CheckListCategory.
func (clc *CheckListCategoryQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CheckListCategoryPaginateOption,
) (*CheckListCategoryConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCheckListCategoryPager(opts)
	if err != nil {
		return nil, err
	}

	if clc, err = pager.applyFilter(clc); err != nil {
		return nil, err
	}

	conn := &CheckListCategoryConnection{Edges: []*CheckListCategoryEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := clc.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := clc.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	clc = pager.applyCursors(clc, after, before)
	clc = pager.applyOrder(clc, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		clc = clc.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		clc = clc.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := clc.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *CheckListCategory
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *CheckListCategory {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *CheckListCategory {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CheckListCategoryEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CheckListCategoryEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CheckListCategoryOrderField defines the ordering field of CheckListCategory.
type CheckListCategoryOrderField struct {
	field    string
	toCursor func(*CheckListCategory) Cursor
}

// CheckListCategoryOrder defines the ordering of CheckListCategory.
type CheckListCategoryOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *CheckListCategoryOrderField `json:"field"`
}

// DefaultCheckListCategoryOrder is the default ordering of CheckListCategory.
var DefaultCheckListCategoryOrder = &CheckListCategoryOrder{
	Direction: OrderDirectionAsc,
	Field: &CheckListCategoryOrderField{
		field: checklistcategory.FieldID,
		toCursor: func(clc *CheckListCategory) Cursor {
			return Cursor{ID: clc.ID}
		},
	},
}

// CheckListCategoryDefinitionEdge is the edge representation of CheckListCategoryDefinition.
type CheckListCategoryDefinitionEdge struct {
	Node   *CheckListCategoryDefinition `json:"node"`
	Cursor Cursor                       `json:"cursor"`
}

// CheckListCategoryDefinitionConnection is the connection containing edges to CheckListCategoryDefinition.
type CheckListCategoryDefinitionConnection struct {
	Edges      []*CheckListCategoryDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                           `json:"pageInfo"`
	TotalCount int                                `json:"totalCount"`
}

// CheckListCategoryDefinitionPaginateOption enables pagination customization.
type CheckListCategoryDefinitionPaginateOption func(*checkListCategoryDefinitionPager) error

// WithCheckListCategoryDefinitionOrder configures pagination ordering.
func WithCheckListCategoryDefinitionOrder(order *CheckListCategoryDefinitionOrder) CheckListCategoryDefinitionPaginateOption {
	if order == nil {
		order = DefaultCheckListCategoryDefinitionOrder
	}
	o := *order
	return func(pager *checkListCategoryDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCheckListCategoryDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCheckListCategoryDefinitionFilter configures pagination filter.
func WithCheckListCategoryDefinitionFilter(filter func(*CheckListCategoryDefinitionQuery) (*CheckListCategoryDefinitionQuery, error)) CheckListCategoryDefinitionPaginateOption {
	return func(pager *checkListCategoryDefinitionPager) error {
		if filter == nil {
			return errors.New("CheckListCategoryDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type checkListCategoryDefinitionPager struct {
	order  *CheckListCategoryDefinitionOrder
	filter func(*CheckListCategoryDefinitionQuery) (*CheckListCategoryDefinitionQuery, error)
}

func newCheckListCategoryDefinitionPager(opts []CheckListCategoryDefinitionPaginateOption) (*checkListCategoryDefinitionPager, error) {
	pager := &checkListCategoryDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCheckListCategoryDefinitionOrder
	}
	return pager, nil
}

func (p *checkListCategoryDefinitionPager) applyFilter(query *CheckListCategoryDefinitionQuery) (*CheckListCategoryDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *checkListCategoryDefinitionPager) toCursor(clcd *CheckListCategoryDefinition) Cursor {
	return p.order.Field.toCursor(clcd)
}

func (p *checkListCategoryDefinitionPager) applyCursors(query *CheckListCategoryDefinitionQuery, after, before *Cursor) *CheckListCategoryDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCheckListCategoryDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *checkListCategoryDefinitionPager) applyOrder(query *CheckListCategoryDefinitionQuery, reverse bool) *CheckListCategoryDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCheckListCategoryDefinitionOrder.Field {
		query = query.Order(Asc(DefaultCheckListCategoryDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to CheckListCategoryDefinition.
func (clcd *CheckListCategoryDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CheckListCategoryDefinitionPaginateOption,
) (*CheckListCategoryDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCheckListCategoryDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if clcd, err = pager.applyFilter(clcd); err != nil {
		return nil, err
	}

	conn := &CheckListCategoryDefinitionConnection{Edges: []*CheckListCategoryDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := clcd.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := clcd.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	clcd = pager.applyCursors(clcd, after, before)
	clcd = pager.applyOrder(clcd, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		clcd = clcd.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		clcd = clcd.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := clcd.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *CheckListCategoryDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *CheckListCategoryDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *CheckListCategoryDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CheckListCategoryDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CheckListCategoryDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CheckListCategoryDefinitionOrderField defines the ordering field of CheckListCategoryDefinition.
type CheckListCategoryDefinitionOrderField struct {
	field    string
	toCursor func(*CheckListCategoryDefinition) Cursor
}

// CheckListCategoryDefinitionOrder defines the ordering of CheckListCategoryDefinition.
type CheckListCategoryDefinitionOrder struct {
	Direction OrderDirection                         `json:"direction"`
	Field     *CheckListCategoryDefinitionOrderField `json:"field"`
}

// DefaultCheckListCategoryDefinitionOrder is the default ordering of CheckListCategoryDefinition.
var DefaultCheckListCategoryDefinitionOrder = &CheckListCategoryDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &CheckListCategoryDefinitionOrderField{
		field: checklistcategorydefinition.FieldID,
		toCursor: func(clcd *CheckListCategoryDefinition) Cursor {
			return Cursor{ID: clcd.ID}
		},
	},
}

// CheckListItemEdge is the edge representation of CheckListItem.
type CheckListItemEdge struct {
	Node   *CheckListItem `json:"node"`
	Cursor Cursor         `json:"cursor"`
}

// CheckListItemConnection is the connection containing edges to CheckListItem.
type CheckListItemConnection struct {
	Edges      []*CheckListItemEdge `json:"edges"`
	PageInfo   PageInfo             `json:"pageInfo"`
	TotalCount int                  `json:"totalCount"`
}

// CheckListItemPaginateOption enables pagination customization.
type CheckListItemPaginateOption func(*checkListItemPager) error

// WithCheckListItemOrder configures pagination ordering.
func WithCheckListItemOrder(order *CheckListItemOrder) CheckListItemPaginateOption {
	if order == nil {
		order = DefaultCheckListItemOrder
	}
	o := *order
	return func(pager *checkListItemPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCheckListItemOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCheckListItemFilter configures pagination filter.
func WithCheckListItemFilter(filter func(*CheckListItemQuery) (*CheckListItemQuery, error)) CheckListItemPaginateOption {
	return func(pager *checkListItemPager) error {
		if filter == nil {
			return errors.New("CheckListItemQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type checkListItemPager struct {
	order  *CheckListItemOrder
	filter func(*CheckListItemQuery) (*CheckListItemQuery, error)
}

func newCheckListItemPager(opts []CheckListItemPaginateOption) (*checkListItemPager, error) {
	pager := &checkListItemPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCheckListItemOrder
	}
	return pager, nil
}

func (p *checkListItemPager) applyFilter(query *CheckListItemQuery) (*CheckListItemQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *checkListItemPager) toCursor(cli *CheckListItem) Cursor {
	return p.order.Field.toCursor(cli)
}

func (p *checkListItemPager) applyCursors(query *CheckListItemQuery, after, before *Cursor) *CheckListItemQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCheckListItemOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *checkListItemPager) applyOrder(query *CheckListItemQuery, reverse bool) *CheckListItemQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCheckListItemOrder.Field {
		query = query.Order(Asc(DefaultCheckListItemOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to CheckListItem.
func (cli *CheckListItemQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CheckListItemPaginateOption,
) (*CheckListItemConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCheckListItemPager(opts)
	if err != nil {
		return nil, err
	}

	if cli, err = pager.applyFilter(cli); err != nil {
		return nil, err
	}

	conn := &CheckListItemConnection{Edges: []*CheckListItemEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := cli.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := cli.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	cli = pager.applyCursors(cli, after, before)
	cli = pager.applyOrder(cli, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		cli = cli.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		cli = cli.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := cli.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *CheckListItem
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *CheckListItem {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *CheckListItem {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CheckListItemEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CheckListItemEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CheckListItemOrderField defines the ordering field of CheckListItem.
type CheckListItemOrderField struct {
	field    string
	toCursor func(*CheckListItem) Cursor
}

// CheckListItemOrder defines the ordering of CheckListItem.
type CheckListItemOrder struct {
	Direction OrderDirection           `json:"direction"`
	Field     *CheckListItemOrderField `json:"field"`
}

// DefaultCheckListItemOrder is the default ordering of CheckListItem.
var DefaultCheckListItemOrder = &CheckListItemOrder{
	Direction: OrderDirectionAsc,
	Field: &CheckListItemOrderField{
		field: checklistitem.FieldID,
		toCursor: func(cli *CheckListItem) Cursor {
			return Cursor{ID: cli.ID}
		},
	},
}

// CheckListItemDefinitionEdge is the edge representation of CheckListItemDefinition.
type CheckListItemDefinitionEdge struct {
	Node   *CheckListItemDefinition `json:"node"`
	Cursor Cursor                   `json:"cursor"`
}

// CheckListItemDefinitionConnection is the connection containing edges to CheckListItemDefinition.
type CheckListItemDefinitionConnection struct {
	Edges      []*CheckListItemDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                       `json:"pageInfo"`
	TotalCount int                            `json:"totalCount"`
}

// CheckListItemDefinitionPaginateOption enables pagination customization.
type CheckListItemDefinitionPaginateOption func(*checkListItemDefinitionPager) error

// WithCheckListItemDefinitionOrder configures pagination ordering.
func WithCheckListItemDefinitionOrder(order *CheckListItemDefinitionOrder) CheckListItemDefinitionPaginateOption {
	if order == nil {
		order = DefaultCheckListItemDefinitionOrder
	}
	o := *order
	return func(pager *checkListItemDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCheckListItemDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCheckListItemDefinitionFilter configures pagination filter.
func WithCheckListItemDefinitionFilter(filter func(*CheckListItemDefinitionQuery) (*CheckListItemDefinitionQuery, error)) CheckListItemDefinitionPaginateOption {
	return func(pager *checkListItemDefinitionPager) error {
		if filter == nil {
			return errors.New("CheckListItemDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type checkListItemDefinitionPager struct {
	order  *CheckListItemDefinitionOrder
	filter func(*CheckListItemDefinitionQuery) (*CheckListItemDefinitionQuery, error)
}

func newCheckListItemDefinitionPager(opts []CheckListItemDefinitionPaginateOption) (*checkListItemDefinitionPager, error) {
	pager := &checkListItemDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCheckListItemDefinitionOrder
	}
	return pager, nil
}

func (p *checkListItemDefinitionPager) applyFilter(query *CheckListItemDefinitionQuery) (*CheckListItemDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *checkListItemDefinitionPager) toCursor(clid *CheckListItemDefinition) Cursor {
	return p.order.Field.toCursor(clid)
}

func (p *checkListItemDefinitionPager) applyCursors(query *CheckListItemDefinitionQuery, after, before *Cursor) *CheckListItemDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCheckListItemDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *checkListItemDefinitionPager) applyOrder(query *CheckListItemDefinitionQuery, reverse bool) *CheckListItemDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCheckListItemDefinitionOrder.Field {
		query = query.Order(Asc(DefaultCheckListItemDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to CheckListItemDefinition.
func (clid *CheckListItemDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CheckListItemDefinitionPaginateOption,
) (*CheckListItemDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCheckListItemDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if clid, err = pager.applyFilter(clid); err != nil {
		return nil, err
	}

	conn := &CheckListItemDefinitionConnection{Edges: []*CheckListItemDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := clid.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := clid.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	clid = pager.applyCursors(clid, after, before)
	clid = pager.applyOrder(clid, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		clid = clid.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		clid = clid.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := clid.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *CheckListItemDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *CheckListItemDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *CheckListItemDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CheckListItemDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CheckListItemDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CheckListItemDefinitionOrderField defines the ordering field of CheckListItemDefinition.
type CheckListItemDefinitionOrderField struct {
	field    string
	toCursor func(*CheckListItemDefinition) Cursor
}

// CheckListItemDefinitionOrder defines the ordering of CheckListItemDefinition.
type CheckListItemDefinitionOrder struct {
	Direction OrderDirection                     `json:"direction"`
	Field     *CheckListItemDefinitionOrderField `json:"field"`
}

// DefaultCheckListItemDefinitionOrder is the default ordering of CheckListItemDefinition.
var DefaultCheckListItemDefinitionOrder = &CheckListItemDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &CheckListItemDefinitionOrderField{
		field: checklistitemdefinition.FieldID,
		toCursor: func(clid *CheckListItemDefinition) Cursor {
			return Cursor{ID: clid.ID}
		},
	},
}

// CommentEdge is the edge representation of Comment.
type CommentEdge struct {
	Node   *Comment `json:"node"`
	Cursor Cursor   `json:"cursor"`
}

// CommentConnection is the connection containing edges to Comment.
type CommentConnection struct {
	Edges      []*CommentEdge `json:"edges"`
	PageInfo   PageInfo       `json:"pageInfo"`
	TotalCount int            `json:"totalCount"`
}

// CommentPaginateOption enables pagination customization.
type CommentPaginateOption func(*commentPager) error

// WithCommentOrder configures pagination ordering.
func WithCommentOrder(order *CommentOrder) CommentPaginateOption {
	if order == nil {
		order = DefaultCommentOrder
	}
	o := *order
	return func(pager *commentPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCommentOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCommentFilter configures pagination filter.
func WithCommentFilter(filter func(*CommentQuery) (*CommentQuery, error)) CommentPaginateOption {
	return func(pager *commentPager) error {
		if filter == nil {
			return errors.New("CommentQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type commentPager struct {
	order  *CommentOrder
	filter func(*CommentQuery) (*CommentQuery, error)
}

func newCommentPager(opts []CommentPaginateOption) (*commentPager, error) {
	pager := &commentPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCommentOrder
	}
	return pager, nil
}

func (p *commentPager) applyFilter(query *CommentQuery) (*CommentQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *commentPager) toCursor(c *Comment) Cursor {
	return p.order.Field.toCursor(c)
}

func (p *commentPager) applyCursors(query *CommentQuery, after, before *Cursor) *CommentQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCommentOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *commentPager) applyOrder(query *CommentQuery, reverse bool) *CommentQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCommentOrder.Field {
		query = query.Order(Asc(DefaultCommentOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Comment.
func (c *CommentQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CommentPaginateOption,
) (*CommentConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCommentPager(opts)
	if err != nil {
		return nil, err
	}

	if c, err = pager.applyFilter(c); err != nil {
		return nil, err
	}

	conn := &CommentConnection{Edges: []*CommentEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := c.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := c.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	c = pager.applyCursors(c, after, before)
	c = pager.applyOrder(c, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		c = c.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		c = c.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := c.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Comment
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Comment {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Comment {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CommentEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CommentEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CommentOrderField defines the ordering field of Comment.
type CommentOrderField struct {
	field    string
	toCursor func(*Comment) Cursor
}

// CommentOrder defines the ordering of Comment.
type CommentOrder struct {
	Direction OrderDirection     `json:"direction"`
	Field     *CommentOrderField `json:"field"`
}

// DefaultCommentOrder is the default ordering of Comment.
var DefaultCommentOrder = &CommentOrder{
	Direction: OrderDirectionAsc,
	Field: &CommentOrderField{
		field: comment.FieldID,
		toCursor: func(c *Comment) Cursor {
			return Cursor{ID: c.ID}
		},
	},
}

// CustomerEdge is the edge representation of Customer.
type CustomerEdge struct {
	Node   *Customer `json:"node"`
	Cursor Cursor    `json:"cursor"`
}

// CustomerConnection is the connection containing edges to Customer.
type CustomerConnection struct {
	Edges      []*CustomerEdge `json:"edges"`
	PageInfo   PageInfo        `json:"pageInfo"`
	TotalCount int             `json:"totalCount"`
}

// CustomerPaginateOption enables pagination customization.
type CustomerPaginateOption func(*customerPager) error

// WithCustomerOrder configures pagination ordering.
func WithCustomerOrder(order *CustomerOrder) CustomerPaginateOption {
	if order == nil {
		order = DefaultCustomerOrder
	}
	o := *order
	return func(pager *customerPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultCustomerOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithCustomerFilter configures pagination filter.
func WithCustomerFilter(filter func(*CustomerQuery) (*CustomerQuery, error)) CustomerPaginateOption {
	return func(pager *customerPager) error {
		if filter == nil {
			return errors.New("CustomerQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type customerPager struct {
	order  *CustomerOrder
	filter func(*CustomerQuery) (*CustomerQuery, error)
}

func newCustomerPager(opts []CustomerPaginateOption) (*customerPager, error) {
	pager := &customerPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultCustomerOrder
	}
	return pager, nil
}

func (p *customerPager) applyFilter(query *CustomerQuery) (*CustomerQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *customerPager) toCursor(c *Customer) Cursor {
	return p.order.Field.toCursor(c)
}

func (p *customerPager) applyCursors(query *CustomerQuery, after, before *Cursor) *CustomerQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultCustomerOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *customerPager) applyOrder(query *CustomerQuery, reverse bool) *CustomerQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultCustomerOrder.Field {
		query = query.Order(Asc(DefaultCustomerOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Customer.
func (c *CustomerQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...CustomerPaginateOption,
) (*CustomerConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newCustomerPager(opts)
	if err != nil {
		return nil, err
	}

	if c, err = pager.applyFilter(c); err != nil {
		return nil, err
	}

	conn := &CustomerConnection{Edges: []*CustomerEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := c.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := c.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	c = pager.applyCursors(c, after, before)
	c = pager.applyOrder(c, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		c = c.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		c = c.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := c.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Customer
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Customer {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Customer {
			return nodes[i]
		}
	}

	conn.Edges = make([]*CustomerEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &CustomerEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// CustomerOrderField defines the ordering field of Customer.
type CustomerOrderField struct {
	field    string
	toCursor func(*Customer) Cursor
}

// CustomerOrder defines the ordering of Customer.
type CustomerOrder struct {
	Direction OrderDirection      `json:"direction"`
	Field     *CustomerOrderField `json:"field"`
}

// DefaultCustomerOrder is the default ordering of Customer.
var DefaultCustomerOrder = &CustomerOrder{
	Direction: OrderDirectionAsc,
	Field: &CustomerOrderField{
		field: customer.FieldID,
		toCursor: func(c *Customer) Cursor {
			return Cursor{ID: c.ID}
		},
	},
}

// EquipmentEdge is the edge representation of Equipment.
type EquipmentEdge struct {
	Node   *Equipment `json:"node"`
	Cursor Cursor     `json:"cursor"`
}

// EquipmentConnection is the connection containing edges to Equipment.
type EquipmentConnection struct {
	Edges      []*EquipmentEdge `json:"edges"`
	PageInfo   PageInfo         `json:"pageInfo"`
	TotalCount int              `json:"totalCount"`
}

// EquipmentPaginateOption enables pagination customization.
type EquipmentPaginateOption func(*equipmentPager) error

// WithEquipmentOrder configures pagination ordering.
func WithEquipmentOrder(order *EquipmentOrder) EquipmentPaginateOption {
	if order == nil {
		order = DefaultEquipmentOrder
	}
	o := *order
	return func(pager *equipmentPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentFilter configures pagination filter.
func WithEquipmentFilter(filter func(*EquipmentQuery) (*EquipmentQuery, error)) EquipmentPaginateOption {
	return func(pager *equipmentPager) error {
		if filter == nil {
			return errors.New("EquipmentQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPager struct {
	order  *EquipmentOrder
	filter func(*EquipmentQuery) (*EquipmentQuery, error)
}

func newEquipmentPager(opts []EquipmentPaginateOption) (*equipmentPager, error) {
	pager := &equipmentPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentOrder
	}
	return pager, nil
}

func (p *equipmentPager) applyFilter(query *EquipmentQuery) (*EquipmentQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPager) toCursor(e *Equipment) Cursor {
	return p.order.Field.toCursor(e)
}

func (p *equipmentPager) applyCursors(query *EquipmentQuery, after, before *Cursor) *EquipmentQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPager) applyOrder(query *EquipmentQuery, reverse bool) *EquipmentQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentOrder.Field {
		query = query.Order(Asc(DefaultEquipmentOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Equipment.
func (e *EquipmentQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPaginateOption,
) (*EquipmentConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPager(opts)
	if err != nil {
		return nil, err
	}

	if e, err = pager.applyFilter(e); err != nil {
		return nil, err
	}

	conn := &EquipmentConnection{Edges: []*EquipmentEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := e.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := e.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	e = pager.applyCursors(e, after, before)
	e = pager.applyOrder(e, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		e = e.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		e = e.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := e.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Equipment
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Equipment {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Equipment {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentOrderField defines the ordering field of Equipment.
type EquipmentOrderField struct {
	field    string
	toCursor func(*Equipment) Cursor
}

// EquipmentOrder defines the ordering of Equipment.
type EquipmentOrder struct {
	Direction OrderDirection       `json:"direction"`
	Field     *EquipmentOrderField `json:"field"`
}

// DefaultEquipmentOrder is the default ordering of Equipment.
var DefaultEquipmentOrder = &EquipmentOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentOrderField{
		field: equipment.FieldID,
		toCursor: func(e *Equipment) Cursor {
			return Cursor{ID: e.ID}
		},
	},
}

// EquipmentCategoryEdge is the edge representation of EquipmentCategory.
type EquipmentCategoryEdge struct {
	Node   *EquipmentCategory `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// EquipmentCategoryConnection is the connection containing edges to EquipmentCategory.
type EquipmentCategoryConnection struct {
	Edges      []*EquipmentCategoryEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// EquipmentCategoryPaginateOption enables pagination customization.
type EquipmentCategoryPaginateOption func(*equipmentCategoryPager) error

// WithEquipmentCategoryOrder configures pagination ordering.
func WithEquipmentCategoryOrder(order *EquipmentCategoryOrder) EquipmentCategoryPaginateOption {
	if order == nil {
		order = DefaultEquipmentCategoryOrder
	}
	o := *order
	return func(pager *equipmentCategoryPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentCategoryOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentCategoryFilter configures pagination filter.
func WithEquipmentCategoryFilter(filter func(*EquipmentCategoryQuery) (*EquipmentCategoryQuery, error)) EquipmentCategoryPaginateOption {
	return func(pager *equipmentCategoryPager) error {
		if filter == nil {
			return errors.New("EquipmentCategoryQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentCategoryPager struct {
	order  *EquipmentCategoryOrder
	filter func(*EquipmentCategoryQuery) (*EquipmentCategoryQuery, error)
}

func newEquipmentCategoryPager(opts []EquipmentCategoryPaginateOption) (*equipmentCategoryPager, error) {
	pager := &equipmentCategoryPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentCategoryOrder
	}
	return pager, nil
}

func (p *equipmentCategoryPager) applyFilter(query *EquipmentCategoryQuery) (*EquipmentCategoryQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentCategoryPager) toCursor(ec *EquipmentCategory) Cursor {
	return p.order.Field.toCursor(ec)
}

func (p *equipmentCategoryPager) applyCursors(query *EquipmentCategoryQuery, after, before *Cursor) *EquipmentCategoryQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentCategoryOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentCategoryPager) applyOrder(query *EquipmentCategoryQuery, reverse bool) *EquipmentCategoryQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentCategoryOrder.Field {
		query = query.Order(Asc(DefaultEquipmentCategoryOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentCategory.
func (ec *EquipmentCategoryQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentCategoryPaginateOption,
) (*EquipmentCategoryConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentCategoryPager(opts)
	if err != nil {
		return nil, err
	}

	if ec, err = pager.applyFilter(ec); err != nil {
		return nil, err
	}

	conn := &EquipmentCategoryConnection{Edges: []*EquipmentCategoryEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ec.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ec.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ec = pager.applyCursors(ec, after, before)
	ec = pager.applyOrder(ec, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ec = ec.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ec = ec.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ec.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentCategory
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentCategory {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentCategory {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentCategoryEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentCategoryEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentCategoryOrderField defines the ordering field of EquipmentCategory.
type EquipmentCategoryOrderField struct {
	field    string
	toCursor func(*EquipmentCategory) Cursor
}

// EquipmentCategoryOrder defines the ordering of EquipmentCategory.
type EquipmentCategoryOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *EquipmentCategoryOrderField `json:"field"`
}

// DefaultEquipmentCategoryOrder is the default ordering of EquipmentCategory.
var DefaultEquipmentCategoryOrder = &EquipmentCategoryOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentCategoryOrderField{
		field: equipmentcategory.FieldID,
		toCursor: func(ec *EquipmentCategory) Cursor {
			return Cursor{ID: ec.ID}
		},
	},
}

// EquipmentPortEdge is the edge representation of EquipmentPort.
type EquipmentPortEdge struct {
	Node   *EquipmentPort `json:"node"`
	Cursor Cursor         `json:"cursor"`
}

// EquipmentPortConnection is the connection containing edges to EquipmentPort.
type EquipmentPortConnection struct {
	Edges      []*EquipmentPortEdge `json:"edges"`
	PageInfo   PageInfo             `json:"pageInfo"`
	TotalCount int                  `json:"totalCount"`
}

// EquipmentPortPaginateOption enables pagination customization.
type EquipmentPortPaginateOption func(*equipmentPortPager) error

// WithEquipmentPortOrder configures pagination ordering.
func WithEquipmentPortOrder(order *EquipmentPortOrder) EquipmentPortPaginateOption {
	if order == nil {
		order = DefaultEquipmentPortOrder
	}
	o := *order
	return func(pager *equipmentPortPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentPortOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentPortFilter configures pagination filter.
func WithEquipmentPortFilter(filter func(*EquipmentPortQuery) (*EquipmentPortQuery, error)) EquipmentPortPaginateOption {
	return func(pager *equipmentPortPager) error {
		if filter == nil {
			return errors.New("EquipmentPortQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPortPager struct {
	order  *EquipmentPortOrder
	filter func(*EquipmentPortQuery) (*EquipmentPortQuery, error)
}

func newEquipmentPortPager(opts []EquipmentPortPaginateOption) (*equipmentPortPager, error) {
	pager := &equipmentPortPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentPortOrder
	}
	return pager, nil
}

func (p *equipmentPortPager) applyFilter(query *EquipmentPortQuery) (*EquipmentPortQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPortPager) toCursor(ep *EquipmentPort) Cursor {
	return p.order.Field.toCursor(ep)
}

func (p *equipmentPortPager) applyCursors(query *EquipmentPortQuery, after, before *Cursor) *EquipmentPortQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentPortOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPortPager) applyOrder(query *EquipmentPortQuery, reverse bool) *EquipmentPortQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentPortOrder.Field {
		query = query.Order(Asc(DefaultEquipmentPortOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentPort.
func (ep *EquipmentPortQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPortPaginateOption,
) (*EquipmentPortConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPortPager(opts)
	if err != nil {
		return nil, err
	}

	if ep, err = pager.applyFilter(ep); err != nil {
		return nil, err
	}

	conn := &EquipmentPortConnection{Edges: []*EquipmentPortEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ep.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ep.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ep = pager.applyCursors(ep, after, before)
	ep = pager.applyOrder(ep, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ep = ep.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ep = ep.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ep.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentPort
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentPort {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentPort {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentPortEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentPortEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentPortOrderField defines the ordering field of EquipmentPort.
type EquipmentPortOrderField struct {
	field    string
	toCursor func(*EquipmentPort) Cursor
}

// EquipmentPortOrder defines the ordering of EquipmentPort.
type EquipmentPortOrder struct {
	Direction OrderDirection           `json:"direction"`
	Field     *EquipmentPortOrderField `json:"field"`
}

// DefaultEquipmentPortOrder is the default ordering of EquipmentPort.
var DefaultEquipmentPortOrder = &EquipmentPortOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentPortOrderField{
		field: equipmentport.FieldID,
		toCursor: func(ep *EquipmentPort) Cursor {
			return Cursor{ID: ep.ID}
		},
	},
}

// EquipmentPortDefinitionEdge is the edge representation of EquipmentPortDefinition.
type EquipmentPortDefinitionEdge struct {
	Node   *EquipmentPortDefinition `json:"node"`
	Cursor Cursor                   `json:"cursor"`
}

// EquipmentPortDefinitionConnection is the connection containing edges to EquipmentPortDefinition.
type EquipmentPortDefinitionConnection struct {
	Edges      []*EquipmentPortDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                       `json:"pageInfo"`
	TotalCount int                            `json:"totalCount"`
}

// EquipmentPortDefinitionPaginateOption enables pagination customization.
type EquipmentPortDefinitionPaginateOption func(*equipmentPortDefinitionPager) error

// WithEquipmentPortDefinitionOrder configures pagination ordering.
func WithEquipmentPortDefinitionOrder(order *EquipmentPortDefinitionOrder) EquipmentPortDefinitionPaginateOption {
	if order == nil {
		order = DefaultEquipmentPortDefinitionOrder
	}
	o := *order
	return func(pager *equipmentPortDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentPortDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentPortDefinitionFilter configures pagination filter.
func WithEquipmentPortDefinitionFilter(filter func(*EquipmentPortDefinitionQuery) (*EquipmentPortDefinitionQuery, error)) EquipmentPortDefinitionPaginateOption {
	return func(pager *equipmentPortDefinitionPager) error {
		if filter == nil {
			return errors.New("EquipmentPortDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPortDefinitionPager struct {
	order  *EquipmentPortDefinitionOrder
	filter func(*EquipmentPortDefinitionQuery) (*EquipmentPortDefinitionQuery, error)
}

func newEquipmentPortDefinitionPager(opts []EquipmentPortDefinitionPaginateOption) (*equipmentPortDefinitionPager, error) {
	pager := &equipmentPortDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentPortDefinitionOrder
	}
	return pager, nil
}

func (p *equipmentPortDefinitionPager) applyFilter(query *EquipmentPortDefinitionQuery) (*EquipmentPortDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPortDefinitionPager) toCursor(epd *EquipmentPortDefinition) Cursor {
	return p.order.Field.toCursor(epd)
}

func (p *equipmentPortDefinitionPager) applyCursors(query *EquipmentPortDefinitionQuery, after, before *Cursor) *EquipmentPortDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentPortDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPortDefinitionPager) applyOrder(query *EquipmentPortDefinitionQuery, reverse bool) *EquipmentPortDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentPortDefinitionOrder.Field {
		query = query.Order(Asc(DefaultEquipmentPortDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentPortDefinition.
func (epd *EquipmentPortDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPortDefinitionPaginateOption,
) (*EquipmentPortDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPortDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if epd, err = pager.applyFilter(epd); err != nil {
		return nil, err
	}

	conn := &EquipmentPortDefinitionConnection{Edges: []*EquipmentPortDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := epd.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := epd.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	epd = pager.applyCursors(epd, after, before)
	epd = pager.applyOrder(epd, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		epd = epd.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		epd = epd.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := epd.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentPortDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentPortDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentPortDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentPortDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentPortDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentPortDefinitionOrderField defines the ordering field of EquipmentPortDefinition.
type EquipmentPortDefinitionOrderField struct {
	field    string
	toCursor func(*EquipmentPortDefinition) Cursor
}

// EquipmentPortDefinitionOrder defines the ordering of EquipmentPortDefinition.
type EquipmentPortDefinitionOrder struct {
	Direction OrderDirection                     `json:"direction"`
	Field     *EquipmentPortDefinitionOrderField `json:"field"`
}

// DefaultEquipmentPortDefinitionOrder is the default ordering of EquipmentPortDefinition.
var DefaultEquipmentPortDefinitionOrder = &EquipmentPortDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentPortDefinitionOrderField{
		field: equipmentportdefinition.FieldID,
		toCursor: func(epd *EquipmentPortDefinition) Cursor {
			return Cursor{ID: epd.ID}
		},
	},
}

// EquipmentPortTypeEdge is the edge representation of EquipmentPortType.
type EquipmentPortTypeEdge struct {
	Node   *EquipmentPortType `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// EquipmentPortTypeConnection is the connection containing edges to EquipmentPortType.
type EquipmentPortTypeConnection struct {
	Edges      []*EquipmentPortTypeEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// EquipmentPortTypePaginateOption enables pagination customization.
type EquipmentPortTypePaginateOption func(*equipmentPortTypePager) error

// WithEquipmentPortTypeOrder configures pagination ordering.
func WithEquipmentPortTypeOrder(order *EquipmentPortTypeOrder) EquipmentPortTypePaginateOption {
	if order == nil {
		order = DefaultEquipmentPortTypeOrder
	}
	o := *order
	return func(pager *equipmentPortTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentPortTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentPortTypeFilter configures pagination filter.
func WithEquipmentPortTypeFilter(filter func(*EquipmentPortTypeQuery) (*EquipmentPortTypeQuery, error)) EquipmentPortTypePaginateOption {
	return func(pager *equipmentPortTypePager) error {
		if filter == nil {
			return errors.New("EquipmentPortTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPortTypePager struct {
	order  *EquipmentPortTypeOrder
	filter func(*EquipmentPortTypeQuery) (*EquipmentPortTypeQuery, error)
}

func newEquipmentPortTypePager(opts []EquipmentPortTypePaginateOption) (*equipmentPortTypePager, error) {
	pager := &equipmentPortTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentPortTypeOrder
	}
	return pager, nil
}

func (p *equipmentPortTypePager) applyFilter(query *EquipmentPortTypeQuery) (*EquipmentPortTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPortTypePager) toCursor(ept *EquipmentPortType) Cursor {
	return p.order.Field.toCursor(ept)
}

func (p *equipmentPortTypePager) applyCursors(query *EquipmentPortTypeQuery, after, before *Cursor) *EquipmentPortTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentPortTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPortTypePager) applyOrder(query *EquipmentPortTypeQuery, reverse bool) *EquipmentPortTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentPortTypeOrder.Field {
		query = query.Order(Asc(DefaultEquipmentPortTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentPortType.
func (ept *EquipmentPortTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPortTypePaginateOption,
) (*EquipmentPortTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPortTypePager(opts)
	if err != nil {
		return nil, err
	}

	if ept, err = pager.applyFilter(ept); err != nil {
		return nil, err
	}

	conn := &EquipmentPortTypeConnection{Edges: []*EquipmentPortTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ept.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ept.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ept = pager.applyCursors(ept, after, before)
	ept = pager.applyOrder(ept, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ept = ept.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ept = ept.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ept.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentPortType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentPortType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentPortType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentPortTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentPortTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentPortTypeOrderField defines the ordering field of EquipmentPortType.
type EquipmentPortTypeOrderField struct {
	field    string
	toCursor func(*EquipmentPortType) Cursor
}

// EquipmentPortTypeOrder defines the ordering of EquipmentPortType.
type EquipmentPortTypeOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *EquipmentPortTypeOrderField `json:"field"`
}

// DefaultEquipmentPortTypeOrder is the default ordering of EquipmentPortType.
var DefaultEquipmentPortTypeOrder = &EquipmentPortTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentPortTypeOrderField{
		field: equipmentporttype.FieldID,
		toCursor: func(ept *EquipmentPortType) Cursor {
			return Cursor{ID: ept.ID}
		},
	},
}

// EquipmentPositionEdge is the edge representation of EquipmentPosition.
type EquipmentPositionEdge struct {
	Node   *EquipmentPosition `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// EquipmentPositionConnection is the connection containing edges to EquipmentPosition.
type EquipmentPositionConnection struct {
	Edges      []*EquipmentPositionEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// EquipmentPositionPaginateOption enables pagination customization.
type EquipmentPositionPaginateOption func(*equipmentPositionPager) error

// WithEquipmentPositionOrder configures pagination ordering.
func WithEquipmentPositionOrder(order *EquipmentPositionOrder) EquipmentPositionPaginateOption {
	if order == nil {
		order = DefaultEquipmentPositionOrder
	}
	o := *order
	return func(pager *equipmentPositionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentPositionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentPositionFilter configures pagination filter.
func WithEquipmentPositionFilter(filter func(*EquipmentPositionQuery) (*EquipmentPositionQuery, error)) EquipmentPositionPaginateOption {
	return func(pager *equipmentPositionPager) error {
		if filter == nil {
			return errors.New("EquipmentPositionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPositionPager struct {
	order  *EquipmentPositionOrder
	filter func(*EquipmentPositionQuery) (*EquipmentPositionQuery, error)
}

func newEquipmentPositionPager(opts []EquipmentPositionPaginateOption) (*equipmentPositionPager, error) {
	pager := &equipmentPositionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentPositionOrder
	}
	return pager, nil
}

func (p *equipmentPositionPager) applyFilter(query *EquipmentPositionQuery) (*EquipmentPositionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPositionPager) toCursor(ep *EquipmentPosition) Cursor {
	return p.order.Field.toCursor(ep)
}

func (p *equipmentPositionPager) applyCursors(query *EquipmentPositionQuery, after, before *Cursor) *EquipmentPositionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentPositionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPositionPager) applyOrder(query *EquipmentPositionQuery, reverse bool) *EquipmentPositionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentPositionOrder.Field {
		query = query.Order(Asc(DefaultEquipmentPositionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentPosition.
func (ep *EquipmentPositionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPositionPaginateOption,
) (*EquipmentPositionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPositionPager(opts)
	if err != nil {
		return nil, err
	}

	if ep, err = pager.applyFilter(ep); err != nil {
		return nil, err
	}

	conn := &EquipmentPositionConnection{Edges: []*EquipmentPositionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ep.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ep.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ep = pager.applyCursors(ep, after, before)
	ep = pager.applyOrder(ep, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ep = ep.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ep = ep.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ep.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentPosition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentPosition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentPosition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentPositionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentPositionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentPositionOrderField defines the ordering field of EquipmentPosition.
type EquipmentPositionOrderField struct {
	field    string
	toCursor func(*EquipmentPosition) Cursor
}

// EquipmentPositionOrder defines the ordering of EquipmentPosition.
type EquipmentPositionOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *EquipmentPositionOrderField `json:"field"`
}

// DefaultEquipmentPositionOrder is the default ordering of EquipmentPosition.
var DefaultEquipmentPositionOrder = &EquipmentPositionOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentPositionOrderField{
		field: equipmentposition.FieldID,
		toCursor: func(ep *EquipmentPosition) Cursor {
			return Cursor{ID: ep.ID}
		},
	},
}

// EquipmentPositionDefinitionEdge is the edge representation of EquipmentPositionDefinition.
type EquipmentPositionDefinitionEdge struct {
	Node   *EquipmentPositionDefinition `json:"node"`
	Cursor Cursor                       `json:"cursor"`
}

// EquipmentPositionDefinitionConnection is the connection containing edges to EquipmentPositionDefinition.
type EquipmentPositionDefinitionConnection struct {
	Edges      []*EquipmentPositionDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                           `json:"pageInfo"`
	TotalCount int                                `json:"totalCount"`
}

// EquipmentPositionDefinitionPaginateOption enables pagination customization.
type EquipmentPositionDefinitionPaginateOption func(*equipmentPositionDefinitionPager) error

// WithEquipmentPositionDefinitionOrder configures pagination ordering.
func WithEquipmentPositionDefinitionOrder(order *EquipmentPositionDefinitionOrder) EquipmentPositionDefinitionPaginateOption {
	if order == nil {
		order = DefaultEquipmentPositionDefinitionOrder
	}
	o := *order
	return func(pager *equipmentPositionDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentPositionDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentPositionDefinitionFilter configures pagination filter.
func WithEquipmentPositionDefinitionFilter(filter func(*EquipmentPositionDefinitionQuery) (*EquipmentPositionDefinitionQuery, error)) EquipmentPositionDefinitionPaginateOption {
	return func(pager *equipmentPositionDefinitionPager) error {
		if filter == nil {
			return errors.New("EquipmentPositionDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentPositionDefinitionPager struct {
	order  *EquipmentPositionDefinitionOrder
	filter func(*EquipmentPositionDefinitionQuery) (*EquipmentPositionDefinitionQuery, error)
}

func newEquipmentPositionDefinitionPager(opts []EquipmentPositionDefinitionPaginateOption) (*equipmentPositionDefinitionPager, error) {
	pager := &equipmentPositionDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentPositionDefinitionOrder
	}
	return pager, nil
}

func (p *equipmentPositionDefinitionPager) applyFilter(query *EquipmentPositionDefinitionQuery) (*EquipmentPositionDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentPositionDefinitionPager) toCursor(epd *EquipmentPositionDefinition) Cursor {
	return p.order.Field.toCursor(epd)
}

func (p *equipmentPositionDefinitionPager) applyCursors(query *EquipmentPositionDefinitionQuery, after, before *Cursor) *EquipmentPositionDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentPositionDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentPositionDefinitionPager) applyOrder(query *EquipmentPositionDefinitionQuery, reverse bool) *EquipmentPositionDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentPositionDefinitionOrder.Field {
		query = query.Order(Asc(DefaultEquipmentPositionDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentPositionDefinition.
func (epd *EquipmentPositionDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentPositionDefinitionPaginateOption,
) (*EquipmentPositionDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentPositionDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if epd, err = pager.applyFilter(epd); err != nil {
		return nil, err
	}

	conn := &EquipmentPositionDefinitionConnection{Edges: []*EquipmentPositionDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := epd.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := epd.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	epd = pager.applyCursors(epd, after, before)
	epd = pager.applyOrder(epd, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		epd = epd.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		epd = epd.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := epd.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentPositionDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentPositionDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentPositionDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentPositionDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentPositionDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentPositionDefinitionOrderField defines the ordering field of EquipmentPositionDefinition.
type EquipmentPositionDefinitionOrderField struct {
	field    string
	toCursor func(*EquipmentPositionDefinition) Cursor
}

// EquipmentPositionDefinitionOrder defines the ordering of EquipmentPositionDefinition.
type EquipmentPositionDefinitionOrder struct {
	Direction OrderDirection                         `json:"direction"`
	Field     *EquipmentPositionDefinitionOrderField `json:"field"`
}

// DefaultEquipmentPositionDefinitionOrder is the default ordering of EquipmentPositionDefinition.
var DefaultEquipmentPositionDefinitionOrder = &EquipmentPositionDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentPositionDefinitionOrderField{
		field: equipmentpositiondefinition.FieldID,
		toCursor: func(epd *EquipmentPositionDefinition) Cursor {
			return Cursor{ID: epd.ID}
		},
	},
}

// EquipmentTypeEdge is the edge representation of EquipmentType.
type EquipmentTypeEdge struct {
	Node   *EquipmentType `json:"node"`
	Cursor Cursor         `json:"cursor"`
}

// EquipmentTypeConnection is the connection containing edges to EquipmentType.
type EquipmentTypeConnection struct {
	Edges      []*EquipmentTypeEdge `json:"edges"`
	PageInfo   PageInfo             `json:"pageInfo"`
	TotalCount int                  `json:"totalCount"`
}

// EquipmentTypePaginateOption enables pagination customization.
type EquipmentTypePaginateOption func(*equipmentTypePager) error

// WithEquipmentTypeOrder configures pagination ordering.
func WithEquipmentTypeOrder(order *EquipmentTypeOrder) EquipmentTypePaginateOption {
	if order == nil {
		order = DefaultEquipmentTypeOrder
	}
	o := *order
	return func(pager *equipmentTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultEquipmentTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithEquipmentTypeFilter configures pagination filter.
func WithEquipmentTypeFilter(filter func(*EquipmentTypeQuery) (*EquipmentTypeQuery, error)) EquipmentTypePaginateOption {
	return func(pager *equipmentTypePager) error {
		if filter == nil {
			return errors.New("EquipmentTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type equipmentTypePager struct {
	order  *EquipmentTypeOrder
	filter func(*EquipmentTypeQuery) (*EquipmentTypeQuery, error)
}

func newEquipmentTypePager(opts []EquipmentTypePaginateOption) (*equipmentTypePager, error) {
	pager := &equipmentTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultEquipmentTypeOrder
	}
	return pager, nil
}

func (p *equipmentTypePager) applyFilter(query *EquipmentTypeQuery) (*EquipmentTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *equipmentTypePager) toCursor(et *EquipmentType) Cursor {
	return p.order.Field.toCursor(et)
}

func (p *equipmentTypePager) applyCursors(query *EquipmentTypeQuery, after, before *Cursor) *EquipmentTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultEquipmentTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *equipmentTypePager) applyOrder(query *EquipmentTypeQuery, reverse bool) *EquipmentTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultEquipmentTypeOrder.Field {
		query = query.Order(Asc(DefaultEquipmentTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to EquipmentType.
func (et *EquipmentTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...EquipmentTypePaginateOption,
) (*EquipmentTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newEquipmentTypePager(opts)
	if err != nil {
		return nil, err
	}

	if et, err = pager.applyFilter(et); err != nil {
		return nil, err
	}

	conn := &EquipmentTypeConnection{Edges: []*EquipmentTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := et.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := et.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	et = pager.applyCursors(et, after, before)
	et = pager.applyOrder(et, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		et = et.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		et = et.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := et.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *EquipmentType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *EquipmentType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *EquipmentType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*EquipmentTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &EquipmentTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// EquipmentTypeOrderField defines the ordering field of EquipmentType.
type EquipmentTypeOrderField struct {
	field    string
	toCursor func(*EquipmentType) Cursor
}

// EquipmentTypeOrder defines the ordering of EquipmentType.
type EquipmentTypeOrder struct {
	Direction OrderDirection           `json:"direction"`
	Field     *EquipmentTypeOrderField `json:"field"`
}

// DefaultEquipmentTypeOrder is the default ordering of EquipmentType.
var DefaultEquipmentTypeOrder = &EquipmentTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &EquipmentTypeOrderField{
		field: equipmenttype.FieldID,
		toCursor: func(et *EquipmentType) Cursor {
			return Cursor{ID: et.ID}
		},
	},
}

// FileEdge is the edge representation of File.
type FileEdge struct {
	Node   *File  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// FileConnection is the connection containing edges to File.
type FileConnection struct {
	Edges      []*FileEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

// FilePaginateOption enables pagination customization.
type FilePaginateOption func(*filePager) error

// WithFileOrder configures pagination ordering.
func WithFileOrder(order *FileOrder) FilePaginateOption {
	if order == nil {
		order = DefaultFileOrder
	}
	o := *order
	return func(pager *filePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultFileOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithFileFilter configures pagination filter.
func WithFileFilter(filter func(*FileQuery) (*FileQuery, error)) FilePaginateOption {
	return func(pager *filePager) error {
		if filter == nil {
			return errors.New("FileQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type filePager struct {
	order  *FileOrder
	filter func(*FileQuery) (*FileQuery, error)
}

func newFilePager(opts []FilePaginateOption) (*filePager, error) {
	pager := &filePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultFileOrder
	}
	return pager, nil
}

func (p *filePager) applyFilter(query *FileQuery) (*FileQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *filePager) toCursor(f *File) Cursor {
	return p.order.Field.toCursor(f)
}

func (p *filePager) applyCursors(query *FileQuery, after, before *Cursor) *FileQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultFileOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *filePager) applyOrder(query *FileQuery, reverse bool) *FileQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultFileOrder.Field {
		query = query.Order(Asc(DefaultFileOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to File.
func (f *FileQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...FilePaginateOption,
) (*FileConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newFilePager(opts)
	if err != nil {
		return nil, err
	}

	if f, err = pager.applyFilter(f); err != nil {
		return nil, err
	}

	conn := &FileConnection{Edges: []*FileEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := f.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := f.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	f = pager.applyCursors(f, after, before)
	f = pager.applyOrder(f, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		f = f.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		f = f.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := f.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *File
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *File {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *File {
			return nodes[i]
		}
	}

	conn.Edges = make([]*FileEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &FileEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// FileOrderField defines the ordering field of File.
type FileOrderField struct {
	field    string
	toCursor func(*File) Cursor
}

// FileOrder defines the ordering of File.
type FileOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *FileOrderField `json:"field"`
}

// DefaultFileOrder is the default ordering of File.
var DefaultFileOrder = &FileOrder{
	Direction: OrderDirectionAsc,
	Field: &FileOrderField{
		field: file.FieldID,
		toCursor: func(f *File) Cursor {
			return Cursor{ID: f.ID}
		},
	},
}

// FloorPlanEdge is the edge representation of FloorPlan.
type FloorPlanEdge struct {
	Node   *FloorPlan `json:"node"`
	Cursor Cursor     `json:"cursor"`
}

// FloorPlanConnection is the connection containing edges to FloorPlan.
type FloorPlanConnection struct {
	Edges      []*FloorPlanEdge `json:"edges"`
	PageInfo   PageInfo         `json:"pageInfo"`
	TotalCount int              `json:"totalCount"`
}

// FloorPlanPaginateOption enables pagination customization.
type FloorPlanPaginateOption func(*floorPlanPager) error

// WithFloorPlanOrder configures pagination ordering.
func WithFloorPlanOrder(order *FloorPlanOrder) FloorPlanPaginateOption {
	if order == nil {
		order = DefaultFloorPlanOrder
	}
	o := *order
	return func(pager *floorPlanPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultFloorPlanOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithFloorPlanFilter configures pagination filter.
func WithFloorPlanFilter(filter func(*FloorPlanQuery) (*FloorPlanQuery, error)) FloorPlanPaginateOption {
	return func(pager *floorPlanPager) error {
		if filter == nil {
			return errors.New("FloorPlanQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type floorPlanPager struct {
	order  *FloorPlanOrder
	filter func(*FloorPlanQuery) (*FloorPlanQuery, error)
}

func newFloorPlanPager(opts []FloorPlanPaginateOption) (*floorPlanPager, error) {
	pager := &floorPlanPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultFloorPlanOrder
	}
	return pager, nil
}

func (p *floorPlanPager) applyFilter(query *FloorPlanQuery) (*FloorPlanQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *floorPlanPager) toCursor(fp *FloorPlan) Cursor {
	return p.order.Field.toCursor(fp)
}

func (p *floorPlanPager) applyCursors(query *FloorPlanQuery, after, before *Cursor) *FloorPlanQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultFloorPlanOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *floorPlanPager) applyOrder(query *FloorPlanQuery, reverse bool) *FloorPlanQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultFloorPlanOrder.Field {
		query = query.Order(Asc(DefaultFloorPlanOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to FloorPlan.
func (fp *FloorPlanQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...FloorPlanPaginateOption,
) (*FloorPlanConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newFloorPlanPager(opts)
	if err != nil {
		return nil, err
	}

	if fp, err = pager.applyFilter(fp); err != nil {
		return nil, err
	}

	conn := &FloorPlanConnection{Edges: []*FloorPlanEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := fp.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := fp.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	fp = pager.applyCursors(fp, after, before)
	fp = pager.applyOrder(fp, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		fp = fp.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		fp = fp.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := fp.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *FloorPlan
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *FloorPlan {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *FloorPlan {
			return nodes[i]
		}
	}

	conn.Edges = make([]*FloorPlanEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &FloorPlanEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// FloorPlanOrderField defines the ordering field of FloorPlan.
type FloorPlanOrderField struct {
	field    string
	toCursor func(*FloorPlan) Cursor
}

// FloorPlanOrder defines the ordering of FloorPlan.
type FloorPlanOrder struct {
	Direction OrderDirection       `json:"direction"`
	Field     *FloorPlanOrderField `json:"field"`
}

// DefaultFloorPlanOrder is the default ordering of FloorPlan.
var DefaultFloorPlanOrder = &FloorPlanOrder{
	Direction: OrderDirectionAsc,
	Field: &FloorPlanOrderField{
		field: floorplan.FieldID,
		toCursor: func(fp *FloorPlan) Cursor {
			return Cursor{ID: fp.ID}
		},
	},
}

// FloorPlanReferencePointEdge is the edge representation of FloorPlanReferencePoint.
type FloorPlanReferencePointEdge struct {
	Node   *FloorPlanReferencePoint `json:"node"`
	Cursor Cursor                   `json:"cursor"`
}

// FloorPlanReferencePointConnection is the connection containing edges to FloorPlanReferencePoint.
type FloorPlanReferencePointConnection struct {
	Edges      []*FloorPlanReferencePointEdge `json:"edges"`
	PageInfo   PageInfo                       `json:"pageInfo"`
	TotalCount int                            `json:"totalCount"`
}

// FloorPlanReferencePointPaginateOption enables pagination customization.
type FloorPlanReferencePointPaginateOption func(*floorPlanReferencePointPager) error

// WithFloorPlanReferencePointOrder configures pagination ordering.
func WithFloorPlanReferencePointOrder(order *FloorPlanReferencePointOrder) FloorPlanReferencePointPaginateOption {
	if order == nil {
		order = DefaultFloorPlanReferencePointOrder
	}
	o := *order
	return func(pager *floorPlanReferencePointPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultFloorPlanReferencePointOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithFloorPlanReferencePointFilter configures pagination filter.
func WithFloorPlanReferencePointFilter(filter func(*FloorPlanReferencePointQuery) (*FloorPlanReferencePointQuery, error)) FloorPlanReferencePointPaginateOption {
	return func(pager *floorPlanReferencePointPager) error {
		if filter == nil {
			return errors.New("FloorPlanReferencePointQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type floorPlanReferencePointPager struct {
	order  *FloorPlanReferencePointOrder
	filter func(*FloorPlanReferencePointQuery) (*FloorPlanReferencePointQuery, error)
}

func newFloorPlanReferencePointPager(opts []FloorPlanReferencePointPaginateOption) (*floorPlanReferencePointPager, error) {
	pager := &floorPlanReferencePointPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultFloorPlanReferencePointOrder
	}
	return pager, nil
}

func (p *floorPlanReferencePointPager) applyFilter(query *FloorPlanReferencePointQuery) (*FloorPlanReferencePointQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *floorPlanReferencePointPager) toCursor(fprp *FloorPlanReferencePoint) Cursor {
	return p.order.Field.toCursor(fprp)
}

func (p *floorPlanReferencePointPager) applyCursors(query *FloorPlanReferencePointQuery, after, before *Cursor) *FloorPlanReferencePointQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultFloorPlanReferencePointOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *floorPlanReferencePointPager) applyOrder(query *FloorPlanReferencePointQuery, reverse bool) *FloorPlanReferencePointQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultFloorPlanReferencePointOrder.Field {
		query = query.Order(Asc(DefaultFloorPlanReferencePointOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to FloorPlanReferencePoint.
func (fprp *FloorPlanReferencePointQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...FloorPlanReferencePointPaginateOption,
) (*FloorPlanReferencePointConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newFloorPlanReferencePointPager(opts)
	if err != nil {
		return nil, err
	}

	if fprp, err = pager.applyFilter(fprp); err != nil {
		return nil, err
	}

	conn := &FloorPlanReferencePointConnection{Edges: []*FloorPlanReferencePointEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := fprp.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := fprp.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	fprp = pager.applyCursors(fprp, after, before)
	fprp = pager.applyOrder(fprp, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		fprp = fprp.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		fprp = fprp.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := fprp.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *FloorPlanReferencePoint
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *FloorPlanReferencePoint {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *FloorPlanReferencePoint {
			return nodes[i]
		}
	}

	conn.Edges = make([]*FloorPlanReferencePointEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &FloorPlanReferencePointEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// FloorPlanReferencePointOrderField defines the ordering field of FloorPlanReferencePoint.
type FloorPlanReferencePointOrderField struct {
	field    string
	toCursor func(*FloorPlanReferencePoint) Cursor
}

// FloorPlanReferencePointOrder defines the ordering of FloorPlanReferencePoint.
type FloorPlanReferencePointOrder struct {
	Direction OrderDirection                     `json:"direction"`
	Field     *FloorPlanReferencePointOrderField `json:"field"`
}

// DefaultFloorPlanReferencePointOrder is the default ordering of FloorPlanReferencePoint.
var DefaultFloorPlanReferencePointOrder = &FloorPlanReferencePointOrder{
	Direction: OrderDirectionAsc,
	Field: &FloorPlanReferencePointOrderField{
		field: floorplanreferencepoint.FieldID,
		toCursor: func(fprp *FloorPlanReferencePoint) Cursor {
			return Cursor{ID: fprp.ID}
		},
	},
}

// FloorPlanScaleEdge is the edge representation of FloorPlanScale.
type FloorPlanScaleEdge struct {
	Node   *FloorPlanScale `json:"node"`
	Cursor Cursor          `json:"cursor"`
}

// FloorPlanScaleConnection is the connection containing edges to FloorPlanScale.
type FloorPlanScaleConnection struct {
	Edges      []*FloorPlanScaleEdge `json:"edges"`
	PageInfo   PageInfo              `json:"pageInfo"`
	TotalCount int                   `json:"totalCount"`
}

// FloorPlanScalePaginateOption enables pagination customization.
type FloorPlanScalePaginateOption func(*floorPlanScalePager) error

// WithFloorPlanScaleOrder configures pagination ordering.
func WithFloorPlanScaleOrder(order *FloorPlanScaleOrder) FloorPlanScalePaginateOption {
	if order == nil {
		order = DefaultFloorPlanScaleOrder
	}
	o := *order
	return func(pager *floorPlanScalePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultFloorPlanScaleOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithFloorPlanScaleFilter configures pagination filter.
func WithFloorPlanScaleFilter(filter func(*FloorPlanScaleQuery) (*FloorPlanScaleQuery, error)) FloorPlanScalePaginateOption {
	return func(pager *floorPlanScalePager) error {
		if filter == nil {
			return errors.New("FloorPlanScaleQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type floorPlanScalePager struct {
	order  *FloorPlanScaleOrder
	filter func(*FloorPlanScaleQuery) (*FloorPlanScaleQuery, error)
}

func newFloorPlanScalePager(opts []FloorPlanScalePaginateOption) (*floorPlanScalePager, error) {
	pager := &floorPlanScalePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultFloorPlanScaleOrder
	}
	return pager, nil
}

func (p *floorPlanScalePager) applyFilter(query *FloorPlanScaleQuery) (*FloorPlanScaleQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *floorPlanScalePager) toCursor(fps *FloorPlanScale) Cursor {
	return p.order.Field.toCursor(fps)
}

func (p *floorPlanScalePager) applyCursors(query *FloorPlanScaleQuery, after, before *Cursor) *FloorPlanScaleQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultFloorPlanScaleOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *floorPlanScalePager) applyOrder(query *FloorPlanScaleQuery, reverse bool) *FloorPlanScaleQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultFloorPlanScaleOrder.Field {
		query = query.Order(Asc(DefaultFloorPlanScaleOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to FloorPlanScale.
func (fps *FloorPlanScaleQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...FloorPlanScalePaginateOption,
) (*FloorPlanScaleConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newFloorPlanScalePager(opts)
	if err != nil {
		return nil, err
	}

	if fps, err = pager.applyFilter(fps); err != nil {
		return nil, err
	}

	conn := &FloorPlanScaleConnection{Edges: []*FloorPlanScaleEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := fps.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := fps.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	fps = pager.applyCursors(fps, after, before)
	fps = pager.applyOrder(fps, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		fps = fps.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		fps = fps.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := fps.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *FloorPlanScale
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *FloorPlanScale {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *FloorPlanScale {
			return nodes[i]
		}
	}

	conn.Edges = make([]*FloorPlanScaleEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &FloorPlanScaleEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// FloorPlanScaleOrderField defines the ordering field of FloorPlanScale.
type FloorPlanScaleOrderField struct {
	field    string
	toCursor func(*FloorPlanScale) Cursor
}

// FloorPlanScaleOrder defines the ordering of FloorPlanScale.
type FloorPlanScaleOrder struct {
	Direction OrderDirection            `json:"direction"`
	Field     *FloorPlanScaleOrderField `json:"field"`
}

// DefaultFloorPlanScaleOrder is the default ordering of FloorPlanScale.
var DefaultFloorPlanScaleOrder = &FloorPlanScaleOrder{
	Direction: OrderDirectionAsc,
	Field: &FloorPlanScaleOrderField{
		field: floorplanscale.FieldID,
		toCursor: func(fps *FloorPlanScale) Cursor {
			return Cursor{ID: fps.ID}
		},
	},
}

// HyperlinkEdge is the edge representation of Hyperlink.
type HyperlinkEdge struct {
	Node   *Hyperlink `json:"node"`
	Cursor Cursor     `json:"cursor"`
}

// HyperlinkConnection is the connection containing edges to Hyperlink.
type HyperlinkConnection struct {
	Edges      []*HyperlinkEdge `json:"edges"`
	PageInfo   PageInfo         `json:"pageInfo"`
	TotalCount int              `json:"totalCount"`
}

// HyperlinkPaginateOption enables pagination customization.
type HyperlinkPaginateOption func(*hyperlinkPager) error

// WithHyperlinkOrder configures pagination ordering.
func WithHyperlinkOrder(order *HyperlinkOrder) HyperlinkPaginateOption {
	if order == nil {
		order = DefaultHyperlinkOrder
	}
	o := *order
	return func(pager *hyperlinkPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultHyperlinkOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithHyperlinkFilter configures pagination filter.
func WithHyperlinkFilter(filter func(*HyperlinkQuery) (*HyperlinkQuery, error)) HyperlinkPaginateOption {
	return func(pager *hyperlinkPager) error {
		if filter == nil {
			return errors.New("HyperlinkQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type hyperlinkPager struct {
	order  *HyperlinkOrder
	filter func(*HyperlinkQuery) (*HyperlinkQuery, error)
}

func newHyperlinkPager(opts []HyperlinkPaginateOption) (*hyperlinkPager, error) {
	pager := &hyperlinkPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultHyperlinkOrder
	}
	return pager, nil
}

func (p *hyperlinkPager) applyFilter(query *HyperlinkQuery) (*HyperlinkQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *hyperlinkPager) toCursor(h *Hyperlink) Cursor {
	return p.order.Field.toCursor(h)
}

func (p *hyperlinkPager) applyCursors(query *HyperlinkQuery, after, before *Cursor) *HyperlinkQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultHyperlinkOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *hyperlinkPager) applyOrder(query *HyperlinkQuery, reverse bool) *HyperlinkQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultHyperlinkOrder.Field {
		query = query.Order(Asc(DefaultHyperlinkOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Hyperlink.
func (h *HyperlinkQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...HyperlinkPaginateOption,
) (*HyperlinkConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newHyperlinkPager(opts)
	if err != nil {
		return nil, err
	}

	if h, err = pager.applyFilter(h); err != nil {
		return nil, err
	}

	conn := &HyperlinkConnection{Edges: []*HyperlinkEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := h.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := h.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	h = pager.applyCursors(h, after, before)
	h = pager.applyOrder(h, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		h = h.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		h = h.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := h.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Hyperlink
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Hyperlink {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Hyperlink {
			return nodes[i]
		}
	}

	conn.Edges = make([]*HyperlinkEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &HyperlinkEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// HyperlinkOrderField defines the ordering field of Hyperlink.
type HyperlinkOrderField struct {
	field    string
	toCursor func(*Hyperlink) Cursor
}

// HyperlinkOrder defines the ordering of Hyperlink.
type HyperlinkOrder struct {
	Direction OrderDirection       `json:"direction"`
	Field     *HyperlinkOrderField `json:"field"`
}

// DefaultHyperlinkOrder is the default ordering of Hyperlink.
var DefaultHyperlinkOrder = &HyperlinkOrder{
	Direction: OrderDirectionAsc,
	Field: &HyperlinkOrderField{
		field: hyperlink.FieldID,
		toCursor: func(h *Hyperlink) Cursor {
			return Cursor{ID: h.ID}
		},
	},
}

// LinkEdge is the edge representation of Link.
type LinkEdge struct {
	Node   *Link  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// LinkConnection is the connection containing edges to Link.
type LinkConnection struct {
	Edges      []*LinkEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

// LinkPaginateOption enables pagination customization.
type LinkPaginateOption func(*linkPager) error

// WithLinkOrder configures pagination ordering.
func WithLinkOrder(order *LinkOrder) LinkPaginateOption {
	if order == nil {
		order = DefaultLinkOrder
	}
	o := *order
	return func(pager *linkPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultLinkOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithLinkFilter configures pagination filter.
func WithLinkFilter(filter func(*LinkQuery) (*LinkQuery, error)) LinkPaginateOption {
	return func(pager *linkPager) error {
		if filter == nil {
			return errors.New("LinkQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type linkPager struct {
	order  *LinkOrder
	filter func(*LinkQuery) (*LinkQuery, error)
}

func newLinkPager(opts []LinkPaginateOption) (*linkPager, error) {
	pager := &linkPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultLinkOrder
	}
	return pager, nil
}

func (p *linkPager) applyFilter(query *LinkQuery) (*LinkQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *linkPager) toCursor(l *Link) Cursor {
	return p.order.Field.toCursor(l)
}

func (p *linkPager) applyCursors(query *LinkQuery, after, before *Cursor) *LinkQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultLinkOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *linkPager) applyOrder(query *LinkQuery, reverse bool) *LinkQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultLinkOrder.Field {
		query = query.Order(Asc(DefaultLinkOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Link.
func (l *LinkQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...LinkPaginateOption,
) (*LinkConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newLinkPager(opts)
	if err != nil {
		return nil, err
	}

	if l, err = pager.applyFilter(l); err != nil {
		return nil, err
	}

	conn := &LinkConnection{Edges: []*LinkEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := l.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := l.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	l = pager.applyCursors(l, after, before)
	l = pager.applyOrder(l, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		l = l.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		l = l.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := l.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Link
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Link {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Link {
			return nodes[i]
		}
	}

	conn.Edges = make([]*LinkEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &LinkEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// LinkOrderField defines the ordering field of Link.
type LinkOrderField struct {
	field    string
	toCursor func(*Link) Cursor
}

// LinkOrder defines the ordering of Link.
type LinkOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *LinkOrderField `json:"field"`
}

// DefaultLinkOrder is the default ordering of Link.
var DefaultLinkOrder = &LinkOrder{
	Direction: OrderDirectionAsc,
	Field: &LinkOrderField{
		field: link.FieldID,
		toCursor: func(l *Link) Cursor {
			return Cursor{ID: l.ID}
		},
	},
}

// LocationEdge is the edge representation of Location.
type LocationEdge struct {
	Node   *Location `json:"node"`
	Cursor Cursor    `json:"cursor"`
}

// LocationConnection is the connection containing edges to Location.
type LocationConnection struct {
	Edges      []*LocationEdge `json:"edges"`
	PageInfo   PageInfo        `json:"pageInfo"`
	TotalCount int             `json:"totalCount"`
}

// LocationPaginateOption enables pagination customization.
type LocationPaginateOption func(*locationPager) error

// WithLocationOrder configures pagination ordering.
func WithLocationOrder(order *LocationOrder) LocationPaginateOption {
	if order == nil {
		order = DefaultLocationOrder
	}
	o := *order
	return func(pager *locationPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultLocationOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithLocationFilter configures pagination filter.
func WithLocationFilter(filter func(*LocationQuery) (*LocationQuery, error)) LocationPaginateOption {
	return func(pager *locationPager) error {
		if filter == nil {
			return errors.New("LocationQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type locationPager struct {
	order  *LocationOrder
	filter func(*LocationQuery) (*LocationQuery, error)
}

func newLocationPager(opts []LocationPaginateOption) (*locationPager, error) {
	pager := &locationPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultLocationOrder
	}
	return pager, nil
}

func (p *locationPager) applyFilter(query *LocationQuery) (*LocationQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *locationPager) toCursor(l *Location) Cursor {
	return p.order.Field.toCursor(l)
}

func (p *locationPager) applyCursors(query *LocationQuery, after, before *Cursor) *LocationQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultLocationOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *locationPager) applyOrder(query *LocationQuery, reverse bool) *LocationQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultLocationOrder.Field {
		query = query.Order(Asc(DefaultLocationOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Location.
func (l *LocationQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...LocationPaginateOption,
) (*LocationConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newLocationPager(opts)
	if err != nil {
		return nil, err
	}

	if l, err = pager.applyFilter(l); err != nil {
		return nil, err
	}

	conn := &LocationConnection{Edges: []*LocationEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := l.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := l.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	l = pager.applyCursors(l, after, before)
	l = pager.applyOrder(l, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		l = l.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		l = l.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := l.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Location
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Location {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Location {
			return nodes[i]
		}
	}

	conn.Edges = make([]*LocationEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &LocationEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// LocationOrderField defines the ordering field of Location.
type LocationOrderField struct {
	field    string
	toCursor func(*Location) Cursor
}

// LocationOrder defines the ordering of Location.
type LocationOrder struct {
	Direction OrderDirection      `json:"direction"`
	Field     *LocationOrderField `json:"field"`
}

// DefaultLocationOrder is the default ordering of Location.
var DefaultLocationOrder = &LocationOrder{
	Direction: OrderDirectionAsc,
	Field: &LocationOrderField{
		field: location.FieldID,
		toCursor: func(l *Location) Cursor {
			return Cursor{ID: l.ID}
		},
	},
}

// LocationTypeEdge is the edge representation of LocationType.
type LocationTypeEdge struct {
	Node   *LocationType `json:"node"`
	Cursor Cursor        `json:"cursor"`
}

// LocationTypeConnection is the connection containing edges to LocationType.
type LocationTypeConnection struct {
	Edges      []*LocationTypeEdge `json:"edges"`
	PageInfo   PageInfo            `json:"pageInfo"`
	TotalCount int                 `json:"totalCount"`
}

// LocationTypePaginateOption enables pagination customization.
type LocationTypePaginateOption func(*locationTypePager) error

// WithLocationTypeOrder configures pagination ordering.
func WithLocationTypeOrder(order *LocationTypeOrder) LocationTypePaginateOption {
	if order == nil {
		order = DefaultLocationTypeOrder
	}
	o := *order
	return func(pager *locationTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultLocationTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithLocationTypeFilter configures pagination filter.
func WithLocationTypeFilter(filter func(*LocationTypeQuery) (*LocationTypeQuery, error)) LocationTypePaginateOption {
	return func(pager *locationTypePager) error {
		if filter == nil {
			return errors.New("LocationTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type locationTypePager struct {
	order  *LocationTypeOrder
	filter func(*LocationTypeQuery) (*LocationTypeQuery, error)
}

func newLocationTypePager(opts []LocationTypePaginateOption) (*locationTypePager, error) {
	pager := &locationTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultLocationTypeOrder
	}
	return pager, nil
}

func (p *locationTypePager) applyFilter(query *LocationTypeQuery) (*LocationTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *locationTypePager) toCursor(lt *LocationType) Cursor {
	return p.order.Field.toCursor(lt)
}

func (p *locationTypePager) applyCursors(query *LocationTypeQuery, after, before *Cursor) *LocationTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultLocationTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *locationTypePager) applyOrder(query *LocationTypeQuery, reverse bool) *LocationTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultLocationTypeOrder.Field {
		query = query.Order(Asc(DefaultLocationTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to LocationType.
func (lt *LocationTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...LocationTypePaginateOption,
) (*LocationTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newLocationTypePager(opts)
	if err != nil {
		return nil, err
	}

	if lt, err = pager.applyFilter(lt); err != nil {
		return nil, err
	}

	conn := &LocationTypeConnection{Edges: []*LocationTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := lt.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := lt.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	lt = pager.applyCursors(lt, after, before)
	lt = pager.applyOrder(lt, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		lt = lt.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		lt = lt.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := lt.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *LocationType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *LocationType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *LocationType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*LocationTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &LocationTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// LocationTypeOrderField defines the ordering field of LocationType.
type LocationTypeOrderField struct {
	field    string
	toCursor func(*LocationType) Cursor
}

// LocationTypeOrder defines the ordering of LocationType.
type LocationTypeOrder struct {
	Direction OrderDirection          `json:"direction"`
	Field     *LocationTypeOrderField `json:"field"`
}

// DefaultLocationTypeOrder is the default ordering of LocationType.
var DefaultLocationTypeOrder = &LocationTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &LocationTypeOrderField{
		field: locationtype.FieldID,
		toCursor: func(lt *LocationType) Cursor {
			return Cursor{ID: lt.ID}
		},
	},
}

// PermissionsPolicyEdge is the edge representation of PermissionsPolicy.
type PermissionsPolicyEdge struct {
	Node   *PermissionsPolicy `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// PermissionsPolicyConnection is the connection containing edges to PermissionsPolicy.
type PermissionsPolicyConnection struct {
	Edges      []*PermissionsPolicyEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// PermissionsPolicyPaginateOption enables pagination customization.
type PermissionsPolicyPaginateOption func(*permissionsPolicyPager) error

// WithPermissionsPolicyOrder configures pagination ordering.
func WithPermissionsPolicyOrder(order *PermissionsPolicyOrder) PermissionsPolicyPaginateOption {
	if order == nil {
		order = DefaultPermissionsPolicyOrder
	}
	o := *order
	return func(pager *permissionsPolicyPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultPermissionsPolicyOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithPermissionsPolicyFilter configures pagination filter.
func WithPermissionsPolicyFilter(filter func(*PermissionsPolicyQuery) (*PermissionsPolicyQuery, error)) PermissionsPolicyPaginateOption {
	return func(pager *permissionsPolicyPager) error {
		if filter == nil {
			return errors.New("PermissionsPolicyQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type permissionsPolicyPager struct {
	order  *PermissionsPolicyOrder
	filter func(*PermissionsPolicyQuery) (*PermissionsPolicyQuery, error)
}

func newPermissionsPolicyPager(opts []PermissionsPolicyPaginateOption) (*permissionsPolicyPager, error) {
	pager := &permissionsPolicyPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultPermissionsPolicyOrder
	}
	return pager, nil
}

func (p *permissionsPolicyPager) applyFilter(query *PermissionsPolicyQuery) (*PermissionsPolicyQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *permissionsPolicyPager) toCursor(pp *PermissionsPolicy) Cursor {
	return p.order.Field.toCursor(pp)
}

func (p *permissionsPolicyPager) applyCursors(query *PermissionsPolicyQuery, after, before *Cursor) *PermissionsPolicyQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultPermissionsPolicyOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *permissionsPolicyPager) applyOrder(query *PermissionsPolicyQuery, reverse bool) *PermissionsPolicyQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultPermissionsPolicyOrder.Field {
		query = query.Order(Asc(DefaultPermissionsPolicyOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to PermissionsPolicy.
func (pp *PermissionsPolicyQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...PermissionsPolicyPaginateOption,
) (*PermissionsPolicyConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newPermissionsPolicyPager(opts)
	if err != nil {
		return nil, err
	}

	if pp, err = pager.applyFilter(pp); err != nil {
		return nil, err
	}

	conn := &PermissionsPolicyConnection{Edges: []*PermissionsPolicyEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := pp.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := pp.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	pp = pager.applyCursors(pp, after, before)
	pp = pager.applyOrder(pp, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		pp = pp.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		pp = pp.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := pp.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *PermissionsPolicy
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *PermissionsPolicy {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *PermissionsPolicy {
			return nodes[i]
		}
	}

	conn.Edges = make([]*PermissionsPolicyEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &PermissionsPolicyEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// PermissionsPolicyOrderField defines the ordering field of PermissionsPolicy.
type PermissionsPolicyOrderField struct {
	field    string
	toCursor func(*PermissionsPolicy) Cursor
}

// PermissionsPolicyOrder defines the ordering of PermissionsPolicy.
type PermissionsPolicyOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *PermissionsPolicyOrderField `json:"field"`
}

// DefaultPermissionsPolicyOrder is the default ordering of PermissionsPolicy.
var DefaultPermissionsPolicyOrder = &PermissionsPolicyOrder{
	Direction: OrderDirectionAsc,
	Field: &PermissionsPolicyOrderField{
		field: permissionspolicy.FieldID,
		toCursor: func(pp *PermissionsPolicy) Cursor {
			return Cursor{ID: pp.ID}
		},
	},
}

// ProjectEdge is the edge representation of Project.
type ProjectEdge struct {
	Node   *Project `json:"node"`
	Cursor Cursor   `json:"cursor"`
}

// ProjectConnection is the connection containing edges to Project.
type ProjectConnection struct {
	Edges      []*ProjectEdge `json:"edges"`
	PageInfo   PageInfo       `json:"pageInfo"`
	TotalCount int            `json:"totalCount"`
}

// ProjectPaginateOption enables pagination customization.
type ProjectPaginateOption func(*projectPager) error

// WithProjectOrder configures pagination ordering.
func WithProjectOrder(order *ProjectOrder) ProjectPaginateOption {
	if order == nil {
		order = DefaultProjectOrder
	}
	o := *order
	return func(pager *projectPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultProjectOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithProjectFilter configures pagination filter.
func WithProjectFilter(filter func(*ProjectQuery) (*ProjectQuery, error)) ProjectPaginateOption {
	return func(pager *projectPager) error {
		if filter == nil {
			return errors.New("ProjectQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type projectPager struct {
	order  *ProjectOrder
	filter func(*ProjectQuery) (*ProjectQuery, error)
}

func newProjectPager(opts []ProjectPaginateOption) (*projectPager, error) {
	pager := &projectPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultProjectOrder
	}
	return pager, nil
}

func (p *projectPager) applyFilter(query *ProjectQuery) (*ProjectQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *projectPager) toCursor(pr *Project) Cursor {
	return p.order.Field.toCursor(pr)
}

func (p *projectPager) applyCursors(query *ProjectQuery, after, before *Cursor) *ProjectQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultProjectOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *projectPager) applyOrder(query *ProjectQuery, reverse bool) *ProjectQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultProjectOrder.Field {
		query = query.Order(Asc(DefaultProjectOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Project.
func (pr *ProjectQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ProjectPaginateOption,
) (*ProjectConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newProjectPager(opts)
	if err != nil {
		return nil, err
	}

	if pr, err = pager.applyFilter(pr); err != nil {
		return nil, err
	}

	conn := &ProjectConnection{Edges: []*ProjectEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := pr.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := pr.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	pr = pager.applyCursors(pr, after, before)
	pr = pager.applyOrder(pr, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		pr = pr.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		pr = pr.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := pr.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Project
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Project {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Project {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ProjectEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ProjectEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

var (
	// ProjectOrderFieldUpdateTime orders Project by update_time.
	ProjectOrderFieldUpdateTime = &ProjectOrderField{
		field: project.FieldUpdateTime,
		toCursor: func(pr *Project) Cursor {
			return Cursor{
				ID:    pr.ID,
				Value: pr.UpdateTime,
			}
		},
	}
	// ProjectOrderFieldName orders Project by name.
	ProjectOrderFieldName = &ProjectOrderField{
		field: project.FieldName,
		toCursor: func(pr *Project) Cursor {
			return Cursor{
				ID:    pr.ID,
				Value: pr.Name,
			}
		},
	}
)

// String implement fmt.Stringer interface.
func (f ProjectOrderField) String() string {
	var str string
	switch f.field {
	case project.FieldUpdateTime:
		str = "UPDATED_AT"
	case project.FieldName:
		str = "NAME"
	}
	return str
}

// MarshalGQL implements graphql.Marshaler interface.
func (f ProjectOrderField) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(f.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (f *ProjectOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("ProjectOrderField %T must be a string", v)
	}
	switch str {
	case "UPDATED_AT":
		*f = *ProjectOrderFieldUpdateTime
	case "NAME":
		*f = *ProjectOrderFieldName
	default:
		return fmt.Errorf("%s is not a valid ProjectOrderField", str)
	}
	return nil
}

// ProjectOrderField defines the ordering field of Project.
type ProjectOrderField struct {
	field    string
	toCursor func(*Project) Cursor
}

// ProjectOrder defines the ordering of Project.
type ProjectOrder struct {
	Direction OrderDirection     `json:"direction"`
	Field     *ProjectOrderField `json:"field"`
}

// DefaultProjectOrder is the default ordering of Project.
var DefaultProjectOrder = &ProjectOrder{
	Direction: OrderDirectionAsc,
	Field: &ProjectOrderField{
		field: project.FieldID,
		toCursor: func(pr *Project) Cursor {
			return Cursor{ID: pr.ID}
		},
	},
}

// ProjectTypeEdge is the edge representation of ProjectType.
type ProjectTypeEdge struct {
	Node   *ProjectType `json:"node"`
	Cursor Cursor       `json:"cursor"`
}

// ProjectTypeConnection is the connection containing edges to ProjectType.
type ProjectTypeConnection struct {
	Edges      []*ProjectTypeEdge `json:"edges"`
	PageInfo   PageInfo           `json:"pageInfo"`
	TotalCount int                `json:"totalCount"`
}

// ProjectTypePaginateOption enables pagination customization.
type ProjectTypePaginateOption func(*projectTypePager) error

// WithProjectTypeOrder configures pagination ordering.
func WithProjectTypeOrder(order *ProjectTypeOrder) ProjectTypePaginateOption {
	if order == nil {
		order = DefaultProjectTypeOrder
	}
	o := *order
	return func(pager *projectTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultProjectTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithProjectTypeFilter configures pagination filter.
func WithProjectTypeFilter(filter func(*ProjectTypeQuery) (*ProjectTypeQuery, error)) ProjectTypePaginateOption {
	return func(pager *projectTypePager) error {
		if filter == nil {
			return errors.New("ProjectTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type projectTypePager struct {
	order  *ProjectTypeOrder
	filter func(*ProjectTypeQuery) (*ProjectTypeQuery, error)
}

func newProjectTypePager(opts []ProjectTypePaginateOption) (*projectTypePager, error) {
	pager := &projectTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultProjectTypeOrder
	}
	return pager, nil
}

func (p *projectTypePager) applyFilter(query *ProjectTypeQuery) (*ProjectTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *projectTypePager) toCursor(pt *ProjectType) Cursor {
	return p.order.Field.toCursor(pt)
}

func (p *projectTypePager) applyCursors(query *ProjectTypeQuery, after, before *Cursor) *ProjectTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultProjectTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *projectTypePager) applyOrder(query *ProjectTypeQuery, reverse bool) *ProjectTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultProjectTypeOrder.Field {
		query = query.Order(Asc(DefaultProjectTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ProjectType.
func (pt *ProjectTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ProjectTypePaginateOption,
) (*ProjectTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newProjectTypePager(opts)
	if err != nil {
		return nil, err
	}

	if pt, err = pager.applyFilter(pt); err != nil {
		return nil, err
	}

	conn := &ProjectTypeConnection{Edges: []*ProjectTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := pt.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := pt.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	pt = pager.applyCursors(pt, after, before)
	pt = pager.applyOrder(pt, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		pt = pt.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		pt = pt.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := pt.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ProjectType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ProjectType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ProjectType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ProjectTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ProjectTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ProjectTypeOrderField defines the ordering field of ProjectType.
type ProjectTypeOrderField struct {
	field    string
	toCursor func(*ProjectType) Cursor
}

// ProjectTypeOrder defines the ordering of ProjectType.
type ProjectTypeOrder struct {
	Direction OrderDirection         `json:"direction"`
	Field     *ProjectTypeOrderField `json:"field"`
}

// DefaultProjectTypeOrder is the default ordering of ProjectType.
var DefaultProjectTypeOrder = &ProjectTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &ProjectTypeOrderField{
		field: projecttype.FieldID,
		toCursor: func(pt *ProjectType) Cursor {
			return Cursor{ID: pt.ID}
		},
	},
}

// PropertyEdge is the edge representation of Property.
type PropertyEdge struct {
	Node   *Property `json:"node"`
	Cursor Cursor    `json:"cursor"`
}

// PropertyConnection is the connection containing edges to Property.
type PropertyConnection struct {
	Edges      []*PropertyEdge `json:"edges"`
	PageInfo   PageInfo        `json:"pageInfo"`
	TotalCount int             `json:"totalCount"`
}

// PropertyPaginateOption enables pagination customization.
type PropertyPaginateOption func(*propertyPager) error

// WithPropertyOrder configures pagination ordering.
func WithPropertyOrder(order *PropertyOrder) PropertyPaginateOption {
	if order == nil {
		order = DefaultPropertyOrder
	}
	o := *order
	return func(pager *propertyPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultPropertyOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithPropertyFilter configures pagination filter.
func WithPropertyFilter(filter func(*PropertyQuery) (*PropertyQuery, error)) PropertyPaginateOption {
	return func(pager *propertyPager) error {
		if filter == nil {
			return errors.New("PropertyQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type propertyPager struct {
	order  *PropertyOrder
	filter func(*PropertyQuery) (*PropertyQuery, error)
}

func newPropertyPager(opts []PropertyPaginateOption) (*propertyPager, error) {
	pager := &propertyPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultPropertyOrder
	}
	return pager, nil
}

func (p *propertyPager) applyFilter(query *PropertyQuery) (*PropertyQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *propertyPager) toCursor(pr *Property) Cursor {
	return p.order.Field.toCursor(pr)
}

func (p *propertyPager) applyCursors(query *PropertyQuery, after, before *Cursor) *PropertyQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultPropertyOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *propertyPager) applyOrder(query *PropertyQuery, reverse bool) *PropertyQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultPropertyOrder.Field {
		query = query.Order(Asc(DefaultPropertyOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Property.
func (pr *PropertyQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...PropertyPaginateOption,
) (*PropertyConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newPropertyPager(opts)
	if err != nil {
		return nil, err
	}

	if pr, err = pager.applyFilter(pr); err != nil {
		return nil, err
	}

	conn := &PropertyConnection{Edges: []*PropertyEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := pr.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := pr.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	pr = pager.applyCursors(pr, after, before)
	pr = pager.applyOrder(pr, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		pr = pr.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		pr = pr.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := pr.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Property
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Property {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Property {
			return nodes[i]
		}
	}

	conn.Edges = make([]*PropertyEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &PropertyEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// PropertyOrderField defines the ordering field of Property.
type PropertyOrderField struct {
	field    string
	toCursor func(*Property) Cursor
}

// PropertyOrder defines the ordering of Property.
type PropertyOrder struct {
	Direction OrderDirection      `json:"direction"`
	Field     *PropertyOrderField `json:"field"`
}

// DefaultPropertyOrder is the default ordering of Property.
var DefaultPropertyOrder = &PropertyOrder{
	Direction: OrderDirectionAsc,
	Field: &PropertyOrderField{
		field: property.FieldID,
		toCursor: func(pr *Property) Cursor {
			return Cursor{ID: pr.ID}
		},
	},
}

// PropertyTypeEdge is the edge representation of PropertyType.
type PropertyTypeEdge struct {
	Node   *PropertyType `json:"node"`
	Cursor Cursor        `json:"cursor"`
}

// PropertyTypeConnection is the connection containing edges to PropertyType.
type PropertyTypeConnection struct {
	Edges      []*PropertyTypeEdge `json:"edges"`
	PageInfo   PageInfo            `json:"pageInfo"`
	TotalCount int                 `json:"totalCount"`
}

// PropertyTypePaginateOption enables pagination customization.
type PropertyTypePaginateOption func(*propertyTypePager) error

// WithPropertyTypeOrder configures pagination ordering.
func WithPropertyTypeOrder(order *PropertyTypeOrder) PropertyTypePaginateOption {
	if order == nil {
		order = DefaultPropertyTypeOrder
	}
	o := *order
	return func(pager *propertyTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultPropertyTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithPropertyTypeFilter configures pagination filter.
func WithPropertyTypeFilter(filter func(*PropertyTypeQuery) (*PropertyTypeQuery, error)) PropertyTypePaginateOption {
	return func(pager *propertyTypePager) error {
		if filter == nil {
			return errors.New("PropertyTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type propertyTypePager struct {
	order  *PropertyTypeOrder
	filter func(*PropertyTypeQuery) (*PropertyTypeQuery, error)
}

func newPropertyTypePager(opts []PropertyTypePaginateOption) (*propertyTypePager, error) {
	pager := &propertyTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultPropertyTypeOrder
	}
	return pager, nil
}

func (p *propertyTypePager) applyFilter(query *PropertyTypeQuery) (*PropertyTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *propertyTypePager) toCursor(pt *PropertyType) Cursor {
	return p.order.Field.toCursor(pt)
}

func (p *propertyTypePager) applyCursors(query *PropertyTypeQuery, after, before *Cursor) *PropertyTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultPropertyTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *propertyTypePager) applyOrder(query *PropertyTypeQuery, reverse bool) *PropertyTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultPropertyTypeOrder.Field {
		query = query.Order(Asc(DefaultPropertyTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to PropertyType.
func (pt *PropertyTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...PropertyTypePaginateOption,
) (*PropertyTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newPropertyTypePager(opts)
	if err != nil {
		return nil, err
	}

	if pt, err = pager.applyFilter(pt); err != nil {
		return nil, err
	}

	conn := &PropertyTypeConnection{Edges: []*PropertyTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := pt.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := pt.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	pt = pager.applyCursors(pt, after, before)
	pt = pager.applyOrder(pt, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		pt = pt.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		pt = pt.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := pt.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *PropertyType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *PropertyType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *PropertyType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*PropertyTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &PropertyTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// PropertyTypeOrderField defines the ordering field of PropertyType.
type PropertyTypeOrderField struct {
	field    string
	toCursor func(*PropertyType) Cursor
}

// PropertyTypeOrder defines the ordering of PropertyType.
type PropertyTypeOrder struct {
	Direction OrderDirection          `json:"direction"`
	Field     *PropertyTypeOrderField `json:"field"`
}

// DefaultPropertyTypeOrder is the default ordering of PropertyType.
var DefaultPropertyTypeOrder = &PropertyTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &PropertyTypeOrderField{
		field: propertytype.FieldID,
		toCursor: func(pt *PropertyType) Cursor {
			return Cursor{ID: pt.ID}
		},
	},
}

// ReportFilterEdge is the edge representation of ReportFilter.
type ReportFilterEdge struct {
	Node   *ReportFilter `json:"node"`
	Cursor Cursor        `json:"cursor"`
}

// ReportFilterConnection is the connection containing edges to ReportFilter.
type ReportFilterConnection struct {
	Edges      []*ReportFilterEdge `json:"edges"`
	PageInfo   PageInfo            `json:"pageInfo"`
	TotalCount int                 `json:"totalCount"`
}

// ReportFilterPaginateOption enables pagination customization.
type ReportFilterPaginateOption func(*reportFilterPager) error

// WithReportFilterOrder configures pagination ordering.
func WithReportFilterOrder(order *ReportFilterOrder) ReportFilterPaginateOption {
	if order == nil {
		order = DefaultReportFilterOrder
	}
	o := *order
	return func(pager *reportFilterPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultReportFilterOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithReportFilterFilter configures pagination filter.
func WithReportFilterFilter(filter func(*ReportFilterQuery) (*ReportFilterQuery, error)) ReportFilterPaginateOption {
	return func(pager *reportFilterPager) error {
		if filter == nil {
			return errors.New("ReportFilterQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type reportFilterPager struct {
	order  *ReportFilterOrder
	filter func(*ReportFilterQuery) (*ReportFilterQuery, error)
}

func newReportFilterPager(opts []ReportFilterPaginateOption) (*reportFilterPager, error) {
	pager := &reportFilterPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultReportFilterOrder
	}
	return pager, nil
}

func (p *reportFilterPager) applyFilter(query *ReportFilterQuery) (*ReportFilterQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *reportFilterPager) toCursor(rf *ReportFilter) Cursor {
	return p.order.Field.toCursor(rf)
}

func (p *reportFilterPager) applyCursors(query *ReportFilterQuery, after, before *Cursor) *ReportFilterQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultReportFilterOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *reportFilterPager) applyOrder(query *ReportFilterQuery, reverse bool) *ReportFilterQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultReportFilterOrder.Field {
		query = query.Order(Asc(DefaultReportFilterOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ReportFilter.
func (rf *ReportFilterQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ReportFilterPaginateOption,
) (*ReportFilterConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newReportFilterPager(opts)
	if err != nil {
		return nil, err
	}

	if rf, err = pager.applyFilter(rf); err != nil {
		return nil, err
	}

	conn := &ReportFilterConnection{Edges: []*ReportFilterEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := rf.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := rf.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	rf = pager.applyCursors(rf, after, before)
	rf = pager.applyOrder(rf, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		rf = rf.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		rf = rf.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := rf.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ReportFilter
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ReportFilter {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ReportFilter {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ReportFilterEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ReportFilterEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ReportFilterOrderField defines the ordering field of ReportFilter.
type ReportFilterOrderField struct {
	field    string
	toCursor func(*ReportFilter) Cursor
}

// ReportFilterOrder defines the ordering of ReportFilter.
type ReportFilterOrder struct {
	Direction OrderDirection          `json:"direction"`
	Field     *ReportFilterOrderField `json:"field"`
}

// DefaultReportFilterOrder is the default ordering of ReportFilter.
var DefaultReportFilterOrder = &ReportFilterOrder{
	Direction: OrderDirectionAsc,
	Field: &ReportFilterOrderField{
		field: reportfilter.FieldID,
		toCursor: func(rf *ReportFilter) Cursor {
			return Cursor{ID: rf.ID}
		},
	},
}

// ServiceEdge is the edge representation of Service.
type ServiceEdge struct {
	Node   *Service `json:"node"`
	Cursor Cursor   `json:"cursor"`
}

// ServiceConnection is the connection containing edges to Service.
type ServiceConnection struct {
	Edges      []*ServiceEdge `json:"edges"`
	PageInfo   PageInfo       `json:"pageInfo"`
	TotalCount int            `json:"totalCount"`
}

// ServicePaginateOption enables pagination customization.
type ServicePaginateOption func(*servicePager) error

// WithServiceOrder configures pagination ordering.
func WithServiceOrder(order *ServiceOrder) ServicePaginateOption {
	if order == nil {
		order = DefaultServiceOrder
	}
	o := *order
	return func(pager *servicePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultServiceOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithServiceFilter configures pagination filter.
func WithServiceFilter(filter func(*ServiceQuery) (*ServiceQuery, error)) ServicePaginateOption {
	return func(pager *servicePager) error {
		if filter == nil {
			return errors.New("ServiceQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type servicePager struct {
	order  *ServiceOrder
	filter func(*ServiceQuery) (*ServiceQuery, error)
}

func newServicePager(opts []ServicePaginateOption) (*servicePager, error) {
	pager := &servicePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultServiceOrder
	}
	return pager, nil
}

func (p *servicePager) applyFilter(query *ServiceQuery) (*ServiceQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *servicePager) toCursor(s *Service) Cursor {
	return p.order.Field.toCursor(s)
}

func (p *servicePager) applyCursors(query *ServiceQuery, after, before *Cursor) *ServiceQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultServiceOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *servicePager) applyOrder(query *ServiceQuery, reverse bool) *ServiceQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultServiceOrder.Field {
		query = query.Order(Asc(DefaultServiceOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Service.
func (s *ServiceQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ServicePaginateOption,
) (*ServiceConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newServicePager(opts)
	if err != nil {
		return nil, err
	}

	if s, err = pager.applyFilter(s); err != nil {
		return nil, err
	}

	conn := &ServiceConnection{Edges: []*ServiceEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := s.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := s.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	s = pager.applyCursors(s, after, before)
	s = pager.applyOrder(s, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		s = s.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		s = s.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := s.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Service
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Service {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Service {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ServiceEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ServiceEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ServiceOrderField defines the ordering field of Service.
type ServiceOrderField struct {
	field    string
	toCursor func(*Service) Cursor
}

// ServiceOrder defines the ordering of Service.
type ServiceOrder struct {
	Direction OrderDirection     `json:"direction"`
	Field     *ServiceOrderField `json:"field"`
}

// DefaultServiceOrder is the default ordering of Service.
var DefaultServiceOrder = &ServiceOrder{
	Direction: OrderDirectionAsc,
	Field: &ServiceOrderField{
		field: service.FieldID,
		toCursor: func(s *Service) Cursor {
			return Cursor{ID: s.ID}
		},
	},
}

// ServiceEndpointEdge is the edge representation of ServiceEndpoint.
type ServiceEndpointEdge struct {
	Node   *ServiceEndpoint `json:"node"`
	Cursor Cursor           `json:"cursor"`
}

// ServiceEndpointConnection is the connection containing edges to ServiceEndpoint.
type ServiceEndpointConnection struct {
	Edges      []*ServiceEndpointEdge `json:"edges"`
	PageInfo   PageInfo               `json:"pageInfo"`
	TotalCount int                    `json:"totalCount"`
}

// ServiceEndpointPaginateOption enables pagination customization.
type ServiceEndpointPaginateOption func(*serviceEndpointPager) error

// WithServiceEndpointOrder configures pagination ordering.
func WithServiceEndpointOrder(order *ServiceEndpointOrder) ServiceEndpointPaginateOption {
	if order == nil {
		order = DefaultServiceEndpointOrder
	}
	o := *order
	return func(pager *serviceEndpointPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultServiceEndpointOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithServiceEndpointFilter configures pagination filter.
func WithServiceEndpointFilter(filter func(*ServiceEndpointQuery) (*ServiceEndpointQuery, error)) ServiceEndpointPaginateOption {
	return func(pager *serviceEndpointPager) error {
		if filter == nil {
			return errors.New("ServiceEndpointQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type serviceEndpointPager struct {
	order  *ServiceEndpointOrder
	filter func(*ServiceEndpointQuery) (*ServiceEndpointQuery, error)
}

func newServiceEndpointPager(opts []ServiceEndpointPaginateOption) (*serviceEndpointPager, error) {
	pager := &serviceEndpointPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultServiceEndpointOrder
	}
	return pager, nil
}

func (p *serviceEndpointPager) applyFilter(query *ServiceEndpointQuery) (*ServiceEndpointQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *serviceEndpointPager) toCursor(se *ServiceEndpoint) Cursor {
	return p.order.Field.toCursor(se)
}

func (p *serviceEndpointPager) applyCursors(query *ServiceEndpointQuery, after, before *Cursor) *ServiceEndpointQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultServiceEndpointOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *serviceEndpointPager) applyOrder(query *ServiceEndpointQuery, reverse bool) *ServiceEndpointQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultServiceEndpointOrder.Field {
		query = query.Order(Asc(DefaultServiceEndpointOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ServiceEndpoint.
func (se *ServiceEndpointQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ServiceEndpointPaginateOption,
) (*ServiceEndpointConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newServiceEndpointPager(opts)
	if err != nil {
		return nil, err
	}

	if se, err = pager.applyFilter(se); err != nil {
		return nil, err
	}

	conn := &ServiceEndpointConnection{Edges: []*ServiceEndpointEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := se.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := se.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	se = pager.applyCursors(se, after, before)
	se = pager.applyOrder(se, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		se = se.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		se = se.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := se.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ServiceEndpoint
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ServiceEndpoint {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ServiceEndpoint {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ServiceEndpointEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ServiceEndpointEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ServiceEndpointOrderField defines the ordering field of ServiceEndpoint.
type ServiceEndpointOrderField struct {
	field    string
	toCursor func(*ServiceEndpoint) Cursor
}

// ServiceEndpointOrder defines the ordering of ServiceEndpoint.
type ServiceEndpointOrder struct {
	Direction OrderDirection             `json:"direction"`
	Field     *ServiceEndpointOrderField `json:"field"`
}

// DefaultServiceEndpointOrder is the default ordering of ServiceEndpoint.
var DefaultServiceEndpointOrder = &ServiceEndpointOrder{
	Direction: OrderDirectionAsc,
	Field: &ServiceEndpointOrderField{
		field: serviceendpoint.FieldID,
		toCursor: func(se *ServiceEndpoint) Cursor {
			return Cursor{ID: se.ID}
		},
	},
}

// ServiceEndpointDefinitionEdge is the edge representation of ServiceEndpointDefinition.
type ServiceEndpointDefinitionEdge struct {
	Node   *ServiceEndpointDefinition `json:"node"`
	Cursor Cursor                     `json:"cursor"`
}

// ServiceEndpointDefinitionConnection is the connection containing edges to ServiceEndpointDefinition.
type ServiceEndpointDefinitionConnection struct {
	Edges      []*ServiceEndpointDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                         `json:"pageInfo"`
	TotalCount int                              `json:"totalCount"`
}

// ServiceEndpointDefinitionPaginateOption enables pagination customization.
type ServiceEndpointDefinitionPaginateOption func(*serviceEndpointDefinitionPager) error

// WithServiceEndpointDefinitionOrder configures pagination ordering.
func WithServiceEndpointDefinitionOrder(order *ServiceEndpointDefinitionOrder) ServiceEndpointDefinitionPaginateOption {
	if order == nil {
		order = DefaultServiceEndpointDefinitionOrder
	}
	o := *order
	return func(pager *serviceEndpointDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultServiceEndpointDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithServiceEndpointDefinitionFilter configures pagination filter.
func WithServiceEndpointDefinitionFilter(filter func(*ServiceEndpointDefinitionQuery) (*ServiceEndpointDefinitionQuery, error)) ServiceEndpointDefinitionPaginateOption {
	return func(pager *serviceEndpointDefinitionPager) error {
		if filter == nil {
			return errors.New("ServiceEndpointDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type serviceEndpointDefinitionPager struct {
	order  *ServiceEndpointDefinitionOrder
	filter func(*ServiceEndpointDefinitionQuery) (*ServiceEndpointDefinitionQuery, error)
}

func newServiceEndpointDefinitionPager(opts []ServiceEndpointDefinitionPaginateOption) (*serviceEndpointDefinitionPager, error) {
	pager := &serviceEndpointDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultServiceEndpointDefinitionOrder
	}
	return pager, nil
}

func (p *serviceEndpointDefinitionPager) applyFilter(query *ServiceEndpointDefinitionQuery) (*ServiceEndpointDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *serviceEndpointDefinitionPager) toCursor(sed *ServiceEndpointDefinition) Cursor {
	return p.order.Field.toCursor(sed)
}

func (p *serviceEndpointDefinitionPager) applyCursors(query *ServiceEndpointDefinitionQuery, after, before *Cursor) *ServiceEndpointDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultServiceEndpointDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *serviceEndpointDefinitionPager) applyOrder(query *ServiceEndpointDefinitionQuery, reverse bool) *ServiceEndpointDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultServiceEndpointDefinitionOrder.Field {
		query = query.Order(Asc(DefaultServiceEndpointDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ServiceEndpointDefinition.
func (sed *ServiceEndpointDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ServiceEndpointDefinitionPaginateOption,
) (*ServiceEndpointDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newServiceEndpointDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if sed, err = pager.applyFilter(sed); err != nil {
		return nil, err
	}

	conn := &ServiceEndpointDefinitionConnection{Edges: []*ServiceEndpointDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := sed.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := sed.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	sed = pager.applyCursors(sed, after, before)
	sed = pager.applyOrder(sed, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		sed = sed.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		sed = sed.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := sed.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ServiceEndpointDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ServiceEndpointDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ServiceEndpointDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ServiceEndpointDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ServiceEndpointDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ServiceEndpointDefinitionOrderField defines the ordering field of ServiceEndpointDefinition.
type ServiceEndpointDefinitionOrderField struct {
	field    string
	toCursor func(*ServiceEndpointDefinition) Cursor
}

// ServiceEndpointDefinitionOrder defines the ordering of ServiceEndpointDefinition.
type ServiceEndpointDefinitionOrder struct {
	Direction OrderDirection                       `json:"direction"`
	Field     *ServiceEndpointDefinitionOrderField `json:"field"`
}

// DefaultServiceEndpointDefinitionOrder is the default ordering of ServiceEndpointDefinition.
var DefaultServiceEndpointDefinitionOrder = &ServiceEndpointDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &ServiceEndpointDefinitionOrderField{
		field: serviceendpointdefinition.FieldID,
		toCursor: func(sed *ServiceEndpointDefinition) Cursor {
			return Cursor{ID: sed.ID}
		},
	},
}

// ServiceTypeEdge is the edge representation of ServiceType.
type ServiceTypeEdge struct {
	Node   *ServiceType `json:"node"`
	Cursor Cursor       `json:"cursor"`
}

// ServiceTypeConnection is the connection containing edges to ServiceType.
type ServiceTypeConnection struct {
	Edges      []*ServiceTypeEdge `json:"edges"`
	PageInfo   PageInfo           `json:"pageInfo"`
	TotalCount int                `json:"totalCount"`
}

// ServiceTypePaginateOption enables pagination customization.
type ServiceTypePaginateOption func(*serviceTypePager) error

// WithServiceTypeOrder configures pagination ordering.
func WithServiceTypeOrder(order *ServiceTypeOrder) ServiceTypePaginateOption {
	if order == nil {
		order = DefaultServiceTypeOrder
	}
	o := *order
	return func(pager *serviceTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultServiceTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithServiceTypeFilter configures pagination filter.
func WithServiceTypeFilter(filter func(*ServiceTypeQuery) (*ServiceTypeQuery, error)) ServiceTypePaginateOption {
	return func(pager *serviceTypePager) error {
		if filter == nil {
			return errors.New("ServiceTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type serviceTypePager struct {
	order  *ServiceTypeOrder
	filter func(*ServiceTypeQuery) (*ServiceTypeQuery, error)
}

func newServiceTypePager(opts []ServiceTypePaginateOption) (*serviceTypePager, error) {
	pager := &serviceTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultServiceTypeOrder
	}
	return pager, nil
}

func (p *serviceTypePager) applyFilter(query *ServiceTypeQuery) (*ServiceTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *serviceTypePager) toCursor(st *ServiceType) Cursor {
	return p.order.Field.toCursor(st)
}

func (p *serviceTypePager) applyCursors(query *ServiceTypeQuery, after, before *Cursor) *ServiceTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultServiceTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *serviceTypePager) applyOrder(query *ServiceTypeQuery, reverse bool) *ServiceTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultServiceTypeOrder.Field {
		query = query.Order(Asc(DefaultServiceTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to ServiceType.
func (st *ServiceTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...ServiceTypePaginateOption,
) (*ServiceTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newServiceTypePager(opts)
	if err != nil {
		return nil, err
	}

	if st, err = pager.applyFilter(st); err != nil {
		return nil, err
	}

	conn := &ServiceTypeConnection{Edges: []*ServiceTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := st.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := st.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	st = pager.applyCursors(st, after, before)
	st = pager.applyOrder(st, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		st = st.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		st = st.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := st.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *ServiceType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *ServiceType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *ServiceType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*ServiceTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &ServiceTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// ServiceTypeOrderField defines the ordering field of ServiceType.
type ServiceTypeOrderField struct {
	field    string
	toCursor func(*ServiceType) Cursor
}

// ServiceTypeOrder defines the ordering of ServiceType.
type ServiceTypeOrder struct {
	Direction OrderDirection         `json:"direction"`
	Field     *ServiceTypeOrderField `json:"field"`
}

// DefaultServiceTypeOrder is the default ordering of ServiceType.
var DefaultServiceTypeOrder = &ServiceTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &ServiceTypeOrderField{
		field: servicetype.FieldID,
		toCursor: func(st *ServiceType) Cursor {
			return Cursor{ID: st.ID}
		},
	},
}

// SurveyEdge is the edge representation of Survey.
type SurveyEdge struct {
	Node   *Survey `json:"node"`
	Cursor Cursor  `json:"cursor"`
}

// SurveyConnection is the connection containing edges to Survey.
type SurveyConnection struct {
	Edges      []*SurveyEdge `json:"edges"`
	PageInfo   PageInfo      `json:"pageInfo"`
	TotalCount int           `json:"totalCount"`
}

// SurveyPaginateOption enables pagination customization.
type SurveyPaginateOption func(*surveyPager) error

// WithSurveyOrder configures pagination ordering.
func WithSurveyOrder(order *SurveyOrder) SurveyPaginateOption {
	if order == nil {
		order = DefaultSurveyOrder
	}
	o := *order
	return func(pager *surveyPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyFilter configures pagination filter.
func WithSurveyFilter(filter func(*SurveyQuery) (*SurveyQuery, error)) SurveyPaginateOption {
	return func(pager *surveyPager) error {
		if filter == nil {
			return errors.New("SurveyQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyPager struct {
	order  *SurveyOrder
	filter func(*SurveyQuery) (*SurveyQuery, error)
}

func newSurveyPager(opts []SurveyPaginateOption) (*surveyPager, error) {
	pager := &surveyPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyOrder
	}
	return pager, nil
}

func (p *surveyPager) applyFilter(query *SurveyQuery) (*SurveyQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyPager) toCursor(s *Survey) Cursor {
	return p.order.Field.toCursor(s)
}

func (p *surveyPager) applyCursors(query *SurveyQuery, after, before *Cursor) *SurveyQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyPager) applyOrder(query *SurveyQuery, reverse bool) *SurveyQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyOrder.Field {
		query = query.Order(Asc(DefaultSurveyOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to Survey.
func (s *SurveyQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyPaginateOption,
) (*SurveyConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyPager(opts)
	if err != nil {
		return nil, err
	}

	if s, err = pager.applyFilter(s); err != nil {
		return nil, err
	}

	conn := &SurveyConnection{Edges: []*SurveyEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := s.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := s.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	s = pager.applyCursors(s, after, before)
	s = pager.applyOrder(s, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		s = s.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		s = s.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := s.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *Survey
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Survey {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Survey {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyOrderField defines the ordering field of Survey.
type SurveyOrderField struct {
	field    string
	toCursor func(*Survey) Cursor
}

// SurveyOrder defines the ordering of Survey.
type SurveyOrder struct {
	Direction OrderDirection    `json:"direction"`
	Field     *SurveyOrderField `json:"field"`
}

// DefaultSurveyOrder is the default ordering of Survey.
var DefaultSurveyOrder = &SurveyOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyOrderField{
		field: survey.FieldID,
		toCursor: func(s *Survey) Cursor {
			return Cursor{ID: s.ID}
		},
	},
}

// SurveyCellScanEdge is the edge representation of SurveyCellScan.
type SurveyCellScanEdge struct {
	Node   *SurveyCellScan `json:"node"`
	Cursor Cursor          `json:"cursor"`
}

// SurveyCellScanConnection is the connection containing edges to SurveyCellScan.
type SurveyCellScanConnection struct {
	Edges      []*SurveyCellScanEdge `json:"edges"`
	PageInfo   PageInfo              `json:"pageInfo"`
	TotalCount int                   `json:"totalCount"`
}

// SurveyCellScanPaginateOption enables pagination customization.
type SurveyCellScanPaginateOption func(*surveyCellScanPager) error

// WithSurveyCellScanOrder configures pagination ordering.
func WithSurveyCellScanOrder(order *SurveyCellScanOrder) SurveyCellScanPaginateOption {
	if order == nil {
		order = DefaultSurveyCellScanOrder
	}
	o := *order
	return func(pager *surveyCellScanPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyCellScanOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyCellScanFilter configures pagination filter.
func WithSurveyCellScanFilter(filter func(*SurveyCellScanQuery) (*SurveyCellScanQuery, error)) SurveyCellScanPaginateOption {
	return func(pager *surveyCellScanPager) error {
		if filter == nil {
			return errors.New("SurveyCellScanQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyCellScanPager struct {
	order  *SurveyCellScanOrder
	filter func(*SurveyCellScanQuery) (*SurveyCellScanQuery, error)
}

func newSurveyCellScanPager(opts []SurveyCellScanPaginateOption) (*surveyCellScanPager, error) {
	pager := &surveyCellScanPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyCellScanOrder
	}
	return pager, nil
}

func (p *surveyCellScanPager) applyFilter(query *SurveyCellScanQuery) (*SurveyCellScanQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyCellScanPager) toCursor(scs *SurveyCellScan) Cursor {
	return p.order.Field.toCursor(scs)
}

func (p *surveyCellScanPager) applyCursors(query *SurveyCellScanQuery, after, before *Cursor) *SurveyCellScanQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyCellScanOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyCellScanPager) applyOrder(query *SurveyCellScanQuery, reverse bool) *SurveyCellScanQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyCellScanOrder.Field {
		query = query.Order(Asc(DefaultSurveyCellScanOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to SurveyCellScan.
func (scs *SurveyCellScanQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyCellScanPaginateOption,
) (*SurveyCellScanConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyCellScanPager(opts)
	if err != nil {
		return nil, err
	}

	if scs, err = pager.applyFilter(scs); err != nil {
		return nil, err
	}

	conn := &SurveyCellScanConnection{Edges: []*SurveyCellScanEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := scs.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := scs.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	scs = pager.applyCursors(scs, after, before)
	scs = pager.applyOrder(scs, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		scs = scs.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		scs = scs.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := scs.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *SurveyCellScan
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *SurveyCellScan {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *SurveyCellScan {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyCellScanEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyCellScanEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyCellScanOrderField defines the ordering field of SurveyCellScan.
type SurveyCellScanOrderField struct {
	field    string
	toCursor func(*SurveyCellScan) Cursor
}

// SurveyCellScanOrder defines the ordering of SurveyCellScan.
type SurveyCellScanOrder struct {
	Direction OrderDirection            `json:"direction"`
	Field     *SurveyCellScanOrderField `json:"field"`
}

// DefaultSurveyCellScanOrder is the default ordering of SurveyCellScan.
var DefaultSurveyCellScanOrder = &SurveyCellScanOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyCellScanOrderField{
		field: surveycellscan.FieldID,
		toCursor: func(scs *SurveyCellScan) Cursor {
			return Cursor{ID: scs.ID}
		},
	},
}

// SurveyQuestionEdge is the edge representation of SurveyQuestion.
type SurveyQuestionEdge struct {
	Node   *SurveyQuestion `json:"node"`
	Cursor Cursor          `json:"cursor"`
}

// SurveyQuestionConnection is the connection containing edges to SurveyQuestion.
type SurveyQuestionConnection struct {
	Edges      []*SurveyQuestionEdge `json:"edges"`
	PageInfo   PageInfo              `json:"pageInfo"`
	TotalCount int                   `json:"totalCount"`
}

// SurveyQuestionPaginateOption enables pagination customization.
type SurveyQuestionPaginateOption func(*surveyQuestionPager) error

// WithSurveyQuestionOrder configures pagination ordering.
func WithSurveyQuestionOrder(order *SurveyQuestionOrder) SurveyQuestionPaginateOption {
	if order == nil {
		order = DefaultSurveyQuestionOrder
	}
	o := *order
	return func(pager *surveyQuestionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyQuestionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyQuestionFilter configures pagination filter.
func WithSurveyQuestionFilter(filter func(*SurveyQuestionQuery) (*SurveyQuestionQuery, error)) SurveyQuestionPaginateOption {
	return func(pager *surveyQuestionPager) error {
		if filter == nil {
			return errors.New("SurveyQuestionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyQuestionPager struct {
	order  *SurveyQuestionOrder
	filter func(*SurveyQuestionQuery) (*SurveyQuestionQuery, error)
}

func newSurveyQuestionPager(opts []SurveyQuestionPaginateOption) (*surveyQuestionPager, error) {
	pager := &surveyQuestionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyQuestionOrder
	}
	return pager, nil
}

func (p *surveyQuestionPager) applyFilter(query *SurveyQuestionQuery) (*SurveyQuestionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyQuestionPager) toCursor(sq *SurveyQuestion) Cursor {
	return p.order.Field.toCursor(sq)
}

func (p *surveyQuestionPager) applyCursors(query *SurveyQuestionQuery, after, before *Cursor) *SurveyQuestionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyQuestionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyQuestionPager) applyOrder(query *SurveyQuestionQuery, reverse bool) *SurveyQuestionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyQuestionOrder.Field {
		query = query.Order(Asc(DefaultSurveyQuestionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to SurveyQuestion.
func (sq *SurveyQuestionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyQuestionPaginateOption,
) (*SurveyQuestionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyQuestionPager(opts)
	if err != nil {
		return nil, err
	}

	if sq, err = pager.applyFilter(sq); err != nil {
		return nil, err
	}

	conn := &SurveyQuestionConnection{Edges: []*SurveyQuestionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := sq.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := sq.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	sq = pager.applyCursors(sq, after, before)
	sq = pager.applyOrder(sq, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		sq = sq.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		sq = sq.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := sq.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *SurveyQuestion
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *SurveyQuestion {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *SurveyQuestion {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyQuestionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyQuestionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyQuestionOrderField defines the ordering field of SurveyQuestion.
type SurveyQuestionOrderField struct {
	field    string
	toCursor func(*SurveyQuestion) Cursor
}

// SurveyQuestionOrder defines the ordering of SurveyQuestion.
type SurveyQuestionOrder struct {
	Direction OrderDirection            `json:"direction"`
	Field     *SurveyQuestionOrderField `json:"field"`
}

// DefaultSurveyQuestionOrder is the default ordering of SurveyQuestion.
var DefaultSurveyQuestionOrder = &SurveyQuestionOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyQuestionOrderField{
		field: surveyquestion.FieldID,
		toCursor: func(sq *SurveyQuestion) Cursor {
			return Cursor{ID: sq.ID}
		},
	},
}

// SurveyTemplateCategoryEdge is the edge representation of SurveyTemplateCategory.
type SurveyTemplateCategoryEdge struct {
	Node   *SurveyTemplateCategory `json:"node"`
	Cursor Cursor                  `json:"cursor"`
}

// SurveyTemplateCategoryConnection is the connection containing edges to SurveyTemplateCategory.
type SurveyTemplateCategoryConnection struct {
	Edges      []*SurveyTemplateCategoryEdge `json:"edges"`
	PageInfo   PageInfo                      `json:"pageInfo"`
	TotalCount int                           `json:"totalCount"`
}

// SurveyTemplateCategoryPaginateOption enables pagination customization.
type SurveyTemplateCategoryPaginateOption func(*surveyTemplateCategoryPager) error

// WithSurveyTemplateCategoryOrder configures pagination ordering.
func WithSurveyTemplateCategoryOrder(order *SurveyTemplateCategoryOrder) SurveyTemplateCategoryPaginateOption {
	if order == nil {
		order = DefaultSurveyTemplateCategoryOrder
	}
	o := *order
	return func(pager *surveyTemplateCategoryPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyTemplateCategoryOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyTemplateCategoryFilter configures pagination filter.
func WithSurveyTemplateCategoryFilter(filter func(*SurveyTemplateCategoryQuery) (*SurveyTemplateCategoryQuery, error)) SurveyTemplateCategoryPaginateOption {
	return func(pager *surveyTemplateCategoryPager) error {
		if filter == nil {
			return errors.New("SurveyTemplateCategoryQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyTemplateCategoryPager struct {
	order  *SurveyTemplateCategoryOrder
	filter func(*SurveyTemplateCategoryQuery) (*SurveyTemplateCategoryQuery, error)
}

func newSurveyTemplateCategoryPager(opts []SurveyTemplateCategoryPaginateOption) (*surveyTemplateCategoryPager, error) {
	pager := &surveyTemplateCategoryPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyTemplateCategoryOrder
	}
	return pager, nil
}

func (p *surveyTemplateCategoryPager) applyFilter(query *SurveyTemplateCategoryQuery) (*SurveyTemplateCategoryQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyTemplateCategoryPager) toCursor(stc *SurveyTemplateCategory) Cursor {
	return p.order.Field.toCursor(stc)
}

func (p *surveyTemplateCategoryPager) applyCursors(query *SurveyTemplateCategoryQuery, after, before *Cursor) *SurveyTemplateCategoryQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyTemplateCategoryOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyTemplateCategoryPager) applyOrder(query *SurveyTemplateCategoryQuery, reverse bool) *SurveyTemplateCategoryQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyTemplateCategoryOrder.Field {
		query = query.Order(Asc(DefaultSurveyTemplateCategoryOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to SurveyTemplateCategory.
func (stc *SurveyTemplateCategoryQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyTemplateCategoryPaginateOption,
) (*SurveyTemplateCategoryConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyTemplateCategoryPager(opts)
	if err != nil {
		return nil, err
	}

	if stc, err = pager.applyFilter(stc); err != nil {
		return nil, err
	}

	conn := &SurveyTemplateCategoryConnection{Edges: []*SurveyTemplateCategoryEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := stc.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := stc.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	stc = pager.applyCursors(stc, after, before)
	stc = pager.applyOrder(stc, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		stc = stc.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		stc = stc.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := stc.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *SurveyTemplateCategory
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *SurveyTemplateCategory {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *SurveyTemplateCategory {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyTemplateCategoryEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyTemplateCategoryEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyTemplateCategoryOrderField defines the ordering field of SurveyTemplateCategory.
type SurveyTemplateCategoryOrderField struct {
	field    string
	toCursor func(*SurveyTemplateCategory) Cursor
}

// SurveyTemplateCategoryOrder defines the ordering of SurveyTemplateCategory.
type SurveyTemplateCategoryOrder struct {
	Direction OrderDirection                    `json:"direction"`
	Field     *SurveyTemplateCategoryOrderField `json:"field"`
}

// DefaultSurveyTemplateCategoryOrder is the default ordering of SurveyTemplateCategory.
var DefaultSurveyTemplateCategoryOrder = &SurveyTemplateCategoryOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyTemplateCategoryOrderField{
		field: surveytemplatecategory.FieldID,
		toCursor: func(stc *SurveyTemplateCategory) Cursor {
			return Cursor{ID: stc.ID}
		},
	},
}

// SurveyTemplateQuestionEdge is the edge representation of SurveyTemplateQuestion.
type SurveyTemplateQuestionEdge struct {
	Node   *SurveyTemplateQuestion `json:"node"`
	Cursor Cursor                  `json:"cursor"`
}

// SurveyTemplateQuestionConnection is the connection containing edges to SurveyTemplateQuestion.
type SurveyTemplateQuestionConnection struct {
	Edges      []*SurveyTemplateQuestionEdge `json:"edges"`
	PageInfo   PageInfo                      `json:"pageInfo"`
	TotalCount int                           `json:"totalCount"`
}

// SurveyTemplateQuestionPaginateOption enables pagination customization.
type SurveyTemplateQuestionPaginateOption func(*surveyTemplateQuestionPager) error

// WithSurveyTemplateQuestionOrder configures pagination ordering.
func WithSurveyTemplateQuestionOrder(order *SurveyTemplateQuestionOrder) SurveyTemplateQuestionPaginateOption {
	if order == nil {
		order = DefaultSurveyTemplateQuestionOrder
	}
	o := *order
	return func(pager *surveyTemplateQuestionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyTemplateQuestionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyTemplateQuestionFilter configures pagination filter.
func WithSurveyTemplateQuestionFilter(filter func(*SurveyTemplateQuestionQuery) (*SurveyTemplateQuestionQuery, error)) SurveyTemplateQuestionPaginateOption {
	return func(pager *surveyTemplateQuestionPager) error {
		if filter == nil {
			return errors.New("SurveyTemplateQuestionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyTemplateQuestionPager struct {
	order  *SurveyTemplateQuestionOrder
	filter func(*SurveyTemplateQuestionQuery) (*SurveyTemplateQuestionQuery, error)
}

func newSurveyTemplateQuestionPager(opts []SurveyTemplateQuestionPaginateOption) (*surveyTemplateQuestionPager, error) {
	pager := &surveyTemplateQuestionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyTemplateQuestionOrder
	}
	return pager, nil
}

func (p *surveyTemplateQuestionPager) applyFilter(query *SurveyTemplateQuestionQuery) (*SurveyTemplateQuestionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyTemplateQuestionPager) toCursor(stq *SurveyTemplateQuestion) Cursor {
	return p.order.Field.toCursor(stq)
}

func (p *surveyTemplateQuestionPager) applyCursors(query *SurveyTemplateQuestionQuery, after, before *Cursor) *SurveyTemplateQuestionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyTemplateQuestionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyTemplateQuestionPager) applyOrder(query *SurveyTemplateQuestionQuery, reverse bool) *SurveyTemplateQuestionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyTemplateQuestionOrder.Field {
		query = query.Order(Asc(DefaultSurveyTemplateQuestionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to SurveyTemplateQuestion.
func (stq *SurveyTemplateQuestionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyTemplateQuestionPaginateOption,
) (*SurveyTemplateQuestionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyTemplateQuestionPager(opts)
	if err != nil {
		return nil, err
	}

	if stq, err = pager.applyFilter(stq); err != nil {
		return nil, err
	}

	conn := &SurveyTemplateQuestionConnection{Edges: []*SurveyTemplateQuestionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := stq.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := stq.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	stq = pager.applyCursors(stq, after, before)
	stq = pager.applyOrder(stq, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		stq = stq.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		stq = stq.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := stq.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *SurveyTemplateQuestion
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *SurveyTemplateQuestion {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *SurveyTemplateQuestion {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyTemplateQuestionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyTemplateQuestionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyTemplateQuestionOrderField defines the ordering field of SurveyTemplateQuestion.
type SurveyTemplateQuestionOrderField struct {
	field    string
	toCursor func(*SurveyTemplateQuestion) Cursor
}

// SurveyTemplateQuestionOrder defines the ordering of SurveyTemplateQuestion.
type SurveyTemplateQuestionOrder struct {
	Direction OrderDirection                    `json:"direction"`
	Field     *SurveyTemplateQuestionOrderField `json:"field"`
}

// DefaultSurveyTemplateQuestionOrder is the default ordering of SurveyTemplateQuestion.
var DefaultSurveyTemplateQuestionOrder = &SurveyTemplateQuestionOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyTemplateQuestionOrderField{
		field: surveytemplatequestion.FieldID,
		toCursor: func(stq *SurveyTemplateQuestion) Cursor {
			return Cursor{ID: stq.ID}
		},
	},
}

// SurveyWiFiScanEdge is the edge representation of SurveyWiFiScan.
type SurveyWiFiScanEdge struct {
	Node   *SurveyWiFiScan `json:"node"`
	Cursor Cursor          `json:"cursor"`
}

// SurveyWiFiScanConnection is the connection containing edges to SurveyWiFiScan.
type SurveyWiFiScanConnection struct {
	Edges      []*SurveyWiFiScanEdge `json:"edges"`
	PageInfo   PageInfo              `json:"pageInfo"`
	TotalCount int                   `json:"totalCount"`
}

// SurveyWiFiScanPaginateOption enables pagination customization.
type SurveyWiFiScanPaginateOption func(*surveyWiFiScanPager) error

// WithSurveyWiFiScanOrder configures pagination ordering.
func WithSurveyWiFiScanOrder(order *SurveyWiFiScanOrder) SurveyWiFiScanPaginateOption {
	if order == nil {
		order = DefaultSurveyWiFiScanOrder
	}
	o := *order
	return func(pager *surveyWiFiScanPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultSurveyWiFiScanOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithSurveyWiFiScanFilter configures pagination filter.
func WithSurveyWiFiScanFilter(filter func(*SurveyWiFiScanQuery) (*SurveyWiFiScanQuery, error)) SurveyWiFiScanPaginateOption {
	return func(pager *surveyWiFiScanPager) error {
		if filter == nil {
			return errors.New("SurveyWiFiScanQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type surveyWiFiScanPager struct {
	order  *SurveyWiFiScanOrder
	filter func(*SurveyWiFiScanQuery) (*SurveyWiFiScanQuery, error)
}

func newSurveyWiFiScanPager(opts []SurveyWiFiScanPaginateOption) (*surveyWiFiScanPager, error) {
	pager := &surveyWiFiScanPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultSurveyWiFiScanOrder
	}
	return pager, nil
}

func (p *surveyWiFiScanPager) applyFilter(query *SurveyWiFiScanQuery) (*SurveyWiFiScanQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *surveyWiFiScanPager) toCursor(swfs *SurveyWiFiScan) Cursor {
	return p.order.Field.toCursor(swfs)
}

func (p *surveyWiFiScanPager) applyCursors(query *SurveyWiFiScanQuery, after, before *Cursor) *SurveyWiFiScanQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultSurveyWiFiScanOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *surveyWiFiScanPager) applyOrder(query *SurveyWiFiScanQuery, reverse bool) *SurveyWiFiScanQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultSurveyWiFiScanOrder.Field {
		query = query.Order(Asc(DefaultSurveyWiFiScanOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to SurveyWiFiScan.
func (swfs *SurveyWiFiScanQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...SurveyWiFiScanPaginateOption,
) (*SurveyWiFiScanConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newSurveyWiFiScanPager(opts)
	if err != nil {
		return nil, err
	}

	if swfs, err = pager.applyFilter(swfs); err != nil {
		return nil, err
	}

	conn := &SurveyWiFiScanConnection{Edges: []*SurveyWiFiScanEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := swfs.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := swfs.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	swfs = pager.applyCursors(swfs, after, before)
	swfs = pager.applyOrder(swfs, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		swfs = swfs.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		swfs = swfs.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := swfs.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *SurveyWiFiScan
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *SurveyWiFiScan {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *SurveyWiFiScan {
			return nodes[i]
		}
	}

	conn.Edges = make([]*SurveyWiFiScanEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &SurveyWiFiScanEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// SurveyWiFiScanOrderField defines the ordering field of SurveyWiFiScan.
type SurveyWiFiScanOrderField struct {
	field    string
	toCursor func(*SurveyWiFiScan) Cursor
}

// SurveyWiFiScanOrder defines the ordering of SurveyWiFiScan.
type SurveyWiFiScanOrder struct {
	Direction OrderDirection            `json:"direction"`
	Field     *SurveyWiFiScanOrderField `json:"field"`
}

// DefaultSurveyWiFiScanOrder is the default ordering of SurveyWiFiScan.
var DefaultSurveyWiFiScanOrder = &SurveyWiFiScanOrder{
	Direction: OrderDirectionAsc,
	Field: &SurveyWiFiScanOrderField{
		field: surveywifiscan.FieldID,
		toCursor: func(swfs *SurveyWiFiScan) Cursor {
			return Cursor{ID: swfs.ID}
		},
	},
}

// UserEdge is the edge representation of User.
type UserEdge struct {
	Node   *User  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// UserConnection is the connection containing edges to User.
type UserConnection struct {
	Edges      []*UserEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

// UserPaginateOption enables pagination customization.
type UserPaginateOption func(*userPager) error

// WithUserOrder configures pagination ordering.
func WithUserOrder(order *UserOrder) UserPaginateOption {
	if order == nil {
		order = DefaultUserOrder
	}
	o := *order
	return func(pager *userPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultUserOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithUserFilter configures pagination filter.
func WithUserFilter(filter func(*UserQuery) (*UserQuery, error)) UserPaginateOption {
	return func(pager *userPager) error {
		if filter == nil {
			return errors.New("UserQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type userPager struct {
	order  *UserOrder
	filter func(*UserQuery) (*UserQuery, error)
}

func newUserPager(opts []UserPaginateOption) (*userPager, error) {
	pager := &userPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultUserOrder
	}
	return pager, nil
}

func (p *userPager) applyFilter(query *UserQuery) (*UserQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *userPager) toCursor(u *User) Cursor {
	return p.order.Field.toCursor(u)
}

func (p *userPager) applyCursors(query *UserQuery, after, before *Cursor) *UserQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultUserOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *userPager) applyOrder(query *UserQuery, reverse bool) *UserQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultUserOrder.Field {
		query = query.Order(Asc(DefaultUserOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to User.
func (u *UserQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...UserPaginateOption,
) (*UserConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newUserPager(opts)
	if err != nil {
		return nil, err
	}

	if u, err = pager.applyFilter(u); err != nil {
		return nil, err
	}

	conn := &UserConnection{Edges: []*UserEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := u.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := u.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	u = pager.applyCursors(u, after, before)
	u = pager.applyOrder(u, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		u = u.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		u = u.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := u.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *User
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *User {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *User {
			return nodes[i]
		}
	}

	conn.Edges = make([]*UserEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &UserEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// UserOrderField defines the ordering field of User.
type UserOrderField struct {
	field    string
	toCursor func(*User) Cursor
}

// UserOrder defines the ordering of User.
type UserOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *UserOrderField `json:"field"`
}

// DefaultUserOrder is the default ordering of User.
var DefaultUserOrder = &UserOrder{
	Direction: OrderDirectionAsc,
	Field: &UserOrderField{
		field: user.FieldID,
		toCursor: func(u *User) Cursor {
			return Cursor{ID: u.ID}
		},
	},
}

// UsersGroupEdge is the edge representation of UsersGroup.
type UsersGroupEdge struct {
	Node   *UsersGroup `json:"node"`
	Cursor Cursor      `json:"cursor"`
}

// UsersGroupConnection is the connection containing edges to UsersGroup.
type UsersGroupConnection struct {
	Edges      []*UsersGroupEdge `json:"edges"`
	PageInfo   PageInfo          `json:"pageInfo"`
	TotalCount int               `json:"totalCount"`
}

// UsersGroupPaginateOption enables pagination customization.
type UsersGroupPaginateOption func(*usersGroupPager) error

// WithUsersGroupOrder configures pagination ordering.
func WithUsersGroupOrder(order *UsersGroupOrder) UsersGroupPaginateOption {
	if order == nil {
		order = DefaultUsersGroupOrder
	}
	o := *order
	return func(pager *usersGroupPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultUsersGroupOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithUsersGroupFilter configures pagination filter.
func WithUsersGroupFilter(filter func(*UsersGroupQuery) (*UsersGroupQuery, error)) UsersGroupPaginateOption {
	return func(pager *usersGroupPager) error {
		if filter == nil {
			return errors.New("UsersGroupQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type usersGroupPager struct {
	order  *UsersGroupOrder
	filter func(*UsersGroupQuery) (*UsersGroupQuery, error)
}

func newUsersGroupPager(opts []UsersGroupPaginateOption) (*usersGroupPager, error) {
	pager := &usersGroupPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultUsersGroupOrder
	}
	return pager, nil
}

func (p *usersGroupPager) applyFilter(query *UsersGroupQuery) (*UsersGroupQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *usersGroupPager) toCursor(ug *UsersGroup) Cursor {
	return p.order.Field.toCursor(ug)
}

func (p *usersGroupPager) applyCursors(query *UsersGroupQuery, after, before *Cursor) *UsersGroupQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultUsersGroupOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *usersGroupPager) applyOrder(query *UsersGroupQuery, reverse bool) *UsersGroupQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultUsersGroupOrder.Field {
		query = query.Order(Asc(DefaultUsersGroupOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to UsersGroup.
func (ug *UsersGroupQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...UsersGroupPaginateOption,
) (*UsersGroupConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newUsersGroupPager(opts)
	if err != nil {
		return nil, err
	}

	if ug, err = pager.applyFilter(ug); err != nil {
		return nil, err
	}

	conn := &UsersGroupConnection{Edges: []*UsersGroupEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := ug.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := ug.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	ug = pager.applyCursors(ug, after, before)
	ug = pager.applyOrder(ug, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		ug = ug.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		ug = ug.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := ug.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *UsersGroup
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *UsersGroup {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *UsersGroup {
			return nodes[i]
		}
	}

	conn.Edges = make([]*UsersGroupEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &UsersGroupEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// UsersGroupOrderField defines the ordering field of UsersGroup.
type UsersGroupOrderField struct {
	field    string
	toCursor func(*UsersGroup) Cursor
}

// UsersGroupOrder defines the ordering of UsersGroup.
type UsersGroupOrder struct {
	Direction OrderDirection        `json:"direction"`
	Field     *UsersGroupOrderField `json:"field"`
}

// DefaultUsersGroupOrder is the default ordering of UsersGroup.
var DefaultUsersGroupOrder = &UsersGroupOrder{
	Direction: OrderDirectionAsc,
	Field: &UsersGroupOrderField{
		field: usersgroup.FieldID,
		toCursor: func(ug *UsersGroup) Cursor {
			return Cursor{ID: ug.ID}
		},
	},
}

// WorkOrderEdge is the edge representation of WorkOrder.
type WorkOrderEdge struct {
	Node   *WorkOrder `json:"node"`
	Cursor Cursor     `json:"cursor"`
}

// WorkOrderConnection is the connection containing edges to WorkOrder.
type WorkOrderConnection struct {
	Edges      []*WorkOrderEdge `json:"edges"`
	PageInfo   PageInfo         `json:"pageInfo"`
	TotalCount int              `json:"totalCount"`
}

// WorkOrderPaginateOption enables pagination customization.
type WorkOrderPaginateOption func(*workOrderPager) error

// WithWorkOrderOrder configures pagination ordering.
func WithWorkOrderOrder(order *WorkOrderOrder) WorkOrderPaginateOption {
	if order == nil {
		order = DefaultWorkOrderOrder
	}
	o := *order
	return func(pager *workOrderPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultWorkOrderOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithWorkOrderFilter configures pagination filter.
func WithWorkOrderFilter(filter func(*WorkOrderQuery) (*WorkOrderQuery, error)) WorkOrderPaginateOption {
	return func(pager *workOrderPager) error {
		if filter == nil {
			return errors.New("WorkOrderQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type workOrderPager struct {
	order  *WorkOrderOrder
	filter func(*WorkOrderQuery) (*WorkOrderQuery, error)
}

func newWorkOrderPager(opts []WorkOrderPaginateOption) (*workOrderPager, error) {
	pager := &workOrderPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultWorkOrderOrder
	}
	return pager, nil
}

func (p *workOrderPager) applyFilter(query *WorkOrderQuery) (*WorkOrderQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *workOrderPager) toCursor(wo *WorkOrder) Cursor {
	return p.order.Field.toCursor(wo)
}

func (p *workOrderPager) applyCursors(query *WorkOrderQuery, after, before *Cursor) *WorkOrderQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultWorkOrderOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *workOrderPager) applyOrder(query *WorkOrderQuery, reverse bool) *WorkOrderQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultWorkOrderOrder.Field {
		query = query.Order(Asc(DefaultWorkOrderOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to WorkOrder.
func (wo *WorkOrderQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...WorkOrderPaginateOption,
) (*WorkOrderConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newWorkOrderPager(opts)
	if err != nil {
		return nil, err
	}

	if wo, err = pager.applyFilter(wo); err != nil {
		return nil, err
	}

	conn := &WorkOrderConnection{Edges: []*WorkOrderEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := wo.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := wo.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	wo = pager.applyCursors(wo, after, before)
	wo = pager.applyOrder(wo, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		wo = wo.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		wo = wo.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := wo.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *WorkOrder
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *WorkOrder {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *WorkOrder {
			return nodes[i]
		}
	}

	conn.Edges = make([]*WorkOrderEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &WorkOrderEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

var (
	// WorkOrderOrderFieldUpdateTime orders WorkOrder by update_time.
	WorkOrderOrderFieldUpdateTime = &WorkOrderOrderField{
		field: workorder.FieldUpdateTime,
		toCursor: func(wo *WorkOrder) Cursor {
			return Cursor{
				ID:    wo.ID,
				Value: wo.UpdateTime,
			}
		},
	}
	// WorkOrderOrderFieldCreationDate orders WorkOrder by creation_date.
	WorkOrderOrderFieldCreationDate = &WorkOrderOrderField{
		field: workorder.FieldCreationDate,
		toCursor: func(wo *WorkOrder) Cursor {
			return Cursor{
				ID:    wo.ID,
				Value: wo.CreationDate,
			}
		},
	}
	// WorkOrderOrderFieldCloseDate orders WorkOrder by close_date.
	WorkOrderOrderFieldCloseDate = &WorkOrderOrderField{
		field: workorder.FieldCloseDate,
		toCursor: func(wo *WorkOrder) Cursor {
			return Cursor{
				ID:    wo.ID,
				Value: wo.CloseDate,
			}
		},
	}
)

// String implement fmt.Stringer interface.
func (f WorkOrderOrderField) String() string {
	var str string
	switch f.field {
	case workorder.FieldUpdateTime:
		str = "UPDATED_AT"
	case workorder.FieldCreationDate:
		str = "CREATED_AT"
	case workorder.FieldCloseDate:
		str = "CLOSED_AT"
	}
	return str
}

// MarshalGQL implements graphql.Marshaler interface.
func (f WorkOrderOrderField) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(f.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (f *WorkOrderOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("WorkOrderOrderField %T must be a string", v)
	}
	switch str {
	case "UPDATED_AT":
		*f = *WorkOrderOrderFieldUpdateTime
	case "CREATED_AT":
		*f = *WorkOrderOrderFieldCreationDate
	case "CLOSED_AT":
		*f = *WorkOrderOrderFieldCloseDate
	default:
		return fmt.Errorf("%s is not a valid WorkOrderOrderField", str)
	}
	return nil
}

// WorkOrderOrderField defines the ordering field of WorkOrder.
type WorkOrderOrderField struct {
	field    string
	toCursor func(*WorkOrder) Cursor
}

// WorkOrderOrder defines the ordering of WorkOrder.
type WorkOrderOrder struct {
	Direction OrderDirection       `json:"direction"`
	Field     *WorkOrderOrderField `json:"field"`
}

// DefaultWorkOrderOrder is the default ordering of WorkOrder.
var DefaultWorkOrderOrder = &WorkOrderOrder{
	Direction: OrderDirectionAsc,
	Field: &WorkOrderOrderField{
		field: workorder.FieldID,
		toCursor: func(wo *WorkOrder) Cursor {
			return Cursor{ID: wo.ID}
		},
	},
}

// WorkOrderDefinitionEdge is the edge representation of WorkOrderDefinition.
type WorkOrderDefinitionEdge struct {
	Node   *WorkOrderDefinition `json:"node"`
	Cursor Cursor               `json:"cursor"`
}

// WorkOrderDefinitionConnection is the connection containing edges to WorkOrderDefinition.
type WorkOrderDefinitionConnection struct {
	Edges      []*WorkOrderDefinitionEdge `json:"edges"`
	PageInfo   PageInfo                   `json:"pageInfo"`
	TotalCount int                        `json:"totalCount"`
}

// WorkOrderDefinitionPaginateOption enables pagination customization.
type WorkOrderDefinitionPaginateOption func(*workOrderDefinitionPager) error

// WithWorkOrderDefinitionOrder configures pagination ordering.
func WithWorkOrderDefinitionOrder(order *WorkOrderDefinitionOrder) WorkOrderDefinitionPaginateOption {
	if order == nil {
		order = DefaultWorkOrderDefinitionOrder
	}
	o := *order
	return func(pager *workOrderDefinitionPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultWorkOrderDefinitionOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithWorkOrderDefinitionFilter configures pagination filter.
func WithWorkOrderDefinitionFilter(filter func(*WorkOrderDefinitionQuery) (*WorkOrderDefinitionQuery, error)) WorkOrderDefinitionPaginateOption {
	return func(pager *workOrderDefinitionPager) error {
		if filter == nil {
			return errors.New("WorkOrderDefinitionQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type workOrderDefinitionPager struct {
	order  *WorkOrderDefinitionOrder
	filter func(*WorkOrderDefinitionQuery) (*WorkOrderDefinitionQuery, error)
}

func newWorkOrderDefinitionPager(opts []WorkOrderDefinitionPaginateOption) (*workOrderDefinitionPager, error) {
	pager := &workOrderDefinitionPager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultWorkOrderDefinitionOrder
	}
	return pager, nil
}

func (p *workOrderDefinitionPager) applyFilter(query *WorkOrderDefinitionQuery) (*WorkOrderDefinitionQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *workOrderDefinitionPager) toCursor(wod *WorkOrderDefinition) Cursor {
	return p.order.Field.toCursor(wod)
}

func (p *workOrderDefinitionPager) applyCursors(query *WorkOrderDefinitionQuery, after, before *Cursor) *WorkOrderDefinitionQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultWorkOrderDefinitionOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *workOrderDefinitionPager) applyOrder(query *WorkOrderDefinitionQuery, reverse bool) *WorkOrderDefinitionQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultWorkOrderDefinitionOrder.Field {
		query = query.Order(Asc(DefaultWorkOrderDefinitionOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to WorkOrderDefinition.
func (wod *WorkOrderDefinitionQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...WorkOrderDefinitionPaginateOption,
) (*WorkOrderDefinitionConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newWorkOrderDefinitionPager(opts)
	if err != nil {
		return nil, err
	}

	if wod, err = pager.applyFilter(wod); err != nil {
		return nil, err
	}

	conn := &WorkOrderDefinitionConnection{Edges: []*WorkOrderDefinitionEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := wod.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := wod.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	wod = pager.applyCursors(wod, after, before)
	wod = pager.applyOrder(wod, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		wod = wod.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		wod = wod.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := wod.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *WorkOrderDefinition
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *WorkOrderDefinition {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *WorkOrderDefinition {
			return nodes[i]
		}
	}

	conn.Edges = make([]*WorkOrderDefinitionEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &WorkOrderDefinitionEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// WorkOrderDefinitionOrderField defines the ordering field of WorkOrderDefinition.
type WorkOrderDefinitionOrderField struct {
	field    string
	toCursor func(*WorkOrderDefinition) Cursor
}

// WorkOrderDefinitionOrder defines the ordering of WorkOrderDefinition.
type WorkOrderDefinitionOrder struct {
	Direction OrderDirection                 `json:"direction"`
	Field     *WorkOrderDefinitionOrderField `json:"field"`
}

// DefaultWorkOrderDefinitionOrder is the default ordering of WorkOrderDefinition.
var DefaultWorkOrderDefinitionOrder = &WorkOrderDefinitionOrder{
	Direction: OrderDirectionAsc,
	Field: &WorkOrderDefinitionOrderField{
		field: workorderdefinition.FieldID,
		toCursor: func(wod *WorkOrderDefinition) Cursor {
			return Cursor{ID: wod.ID}
		},
	},
}

// WorkOrderTemplateEdge is the edge representation of WorkOrderTemplate.
type WorkOrderTemplateEdge struct {
	Node   *WorkOrderTemplate `json:"node"`
	Cursor Cursor             `json:"cursor"`
}

// WorkOrderTemplateConnection is the connection containing edges to WorkOrderTemplate.
type WorkOrderTemplateConnection struct {
	Edges      []*WorkOrderTemplateEdge `json:"edges"`
	PageInfo   PageInfo                 `json:"pageInfo"`
	TotalCount int                      `json:"totalCount"`
}

// WorkOrderTemplatePaginateOption enables pagination customization.
type WorkOrderTemplatePaginateOption func(*workOrderTemplatePager) error

// WithWorkOrderTemplateOrder configures pagination ordering.
func WithWorkOrderTemplateOrder(order *WorkOrderTemplateOrder) WorkOrderTemplatePaginateOption {
	if order == nil {
		order = DefaultWorkOrderTemplateOrder
	}
	o := *order
	return func(pager *workOrderTemplatePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultWorkOrderTemplateOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithWorkOrderTemplateFilter configures pagination filter.
func WithWorkOrderTemplateFilter(filter func(*WorkOrderTemplateQuery) (*WorkOrderTemplateQuery, error)) WorkOrderTemplatePaginateOption {
	return func(pager *workOrderTemplatePager) error {
		if filter == nil {
			return errors.New("WorkOrderTemplateQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type workOrderTemplatePager struct {
	order  *WorkOrderTemplateOrder
	filter func(*WorkOrderTemplateQuery) (*WorkOrderTemplateQuery, error)
}

func newWorkOrderTemplatePager(opts []WorkOrderTemplatePaginateOption) (*workOrderTemplatePager, error) {
	pager := &workOrderTemplatePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultWorkOrderTemplateOrder
	}
	return pager, nil
}

func (p *workOrderTemplatePager) applyFilter(query *WorkOrderTemplateQuery) (*WorkOrderTemplateQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *workOrderTemplatePager) toCursor(wot *WorkOrderTemplate) Cursor {
	return p.order.Field.toCursor(wot)
}

func (p *workOrderTemplatePager) applyCursors(query *WorkOrderTemplateQuery, after, before *Cursor) *WorkOrderTemplateQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultWorkOrderTemplateOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *workOrderTemplatePager) applyOrder(query *WorkOrderTemplateQuery, reverse bool) *WorkOrderTemplateQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultWorkOrderTemplateOrder.Field {
		query = query.Order(Asc(DefaultWorkOrderTemplateOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to WorkOrderTemplate.
func (wot *WorkOrderTemplateQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...WorkOrderTemplatePaginateOption,
) (*WorkOrderTemplateConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newWorkOrderTemplatePager(opts)
	if err != nil {
		return nil, err
	}

	if wot, err = pager.applyFilter(wot); err != nil {
		return nil, err
	}

	conn := &WorkOrderTemplateConnection{Edges: []*WorkOrderTemplateEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := wot.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := wot.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	wot = pager.applyCursors(wot, after, before)
	wot = pager.applyOrder(wot, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		wot = wot.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		wot = wot.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := wot.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *WorkOrderTemplate
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *WorkOrderTemplate {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *WorkOrderTemplate {
			return nodes[i]
		}
	}

	conn.Edges = make([]*WorkOrderTemplateEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &WorkOrderTemplateEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// WorkOrderTemplateOrderField defines the ordering field of WorkOrderTemplate.
type WorkOrderTemplateOrderField struct {
	field    string
	toCursor func(*WorkOrderTemplate) Cursor
}

// WorkOrderTemplateOrder defines the ordering of WorkOrderTemplate.
type WorkOrderTemplateOrder struct {
	Direction OrderDirection               `json:"direction"`
	Field     *WorkOrderTemplateOrderField `json:"field"`
}

// DefaultWorkOrderTemplateOrder is the default ordering of WorkOrderTemplate.
var DefaultWorkOrderTemplateOrder = &WorkOrderTemplateOrder{
	Direction: OrderDirectionAsc,
	Field: &WorkOrderTemplateOrderField{
		field: workordertemplate.FieldID,
		toCursor: func(wot *WorkOrderTemplate) Cursor {
			return Cursor{ID: wot.ID}
		},
	},
}

// WorkOrderTypeEdge is the edge representation of WorkOrderType.
type WorkOrderTypeEdge struct {
	Node   *WorkOrderType `json:"node"`
	Cursor Cursor         `json:"cursor"`
}

// WorkOrderTypeConnection is the connection containing edges to WorkOrderType.
type WorkOrderTypeConnection struct {
	Edges      []*WorkOrderTypeEdge `json:"edges"`
	PageInfo   PageInfo             `json:"pageInfo"`
	TotalCount int                  `json:"totalCount"`
}

// WorkOrderTypePaginateOption enables pagination customization.
type WorkOrderTypePaginateOption func(*workOrderTypePager) error

// WithWorkOrderTypeOrder configures pagination ordering.
func WithWorkOrderTypeOrder(order *WorkOrderTypeOrder) WorkOrderTypePaginateOption {
	if order == nil {
		order = DefaultWorkOrderTypeOrder
	}
	o := *order
	return func(pager *workOrderTypePager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultWorkOrderTypeOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithWorkOrderTypeFilter configures pagination filter.
func WithWorkOrderTypeFilter(filter func(*WorkOrderTypeQuery) (*WorkOrderTypeQuery, error)) WorkOrderTypePaginateOption {
	return func(pager *workOrderTypePager) error {
		if filter == nil {
			return errors.New("WorkOrderTypeQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type workOrderTypePager struct {
	order  *WorkOrderTypeOrder
	filter func(*WorkOrderTypeQuery) (*WorkOrderTypeQuery, error)
}

func newWorkOrderTypePager(opts []WorkOrderTypePaginateOption) (*workOrderTypePager, error) {
	pager := &workOrderTypePager{}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultWorkOrderTypeOrder
	}
	return pager, nil
}

func (p *workOrderTypePager) applyFilter(query *WorkOrderTypeQuery) (*WorkOrderTypeQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *workOrderTypePager) toCursor(wot *WorkOrderType) Cursor {
	return p.order.Field.toCursor(wot)
}

func (p *workOrderTypePager) applyCursors(query *WorkOrderTypeQuery, after, before *Cursor) *WorkOrderTypeQuery {
	for _, predicate := range cursorsToPredicates(
		p.order.Direction, after, before,
		p.order.Field.field, DefaultWorkOrderTypeOrder.Field.field,
	) {
		query = query.Where(predicate)
	}
	return query
}

func (p *workOrderTypePager) applyOrder(query *WorkOrderTypeQuery, reverse bool) *WorkOrderTypeQuery {
	direction := p.order.Direction
	if reverse {
		direction = direction.reverse()
	}
	query = query.Order(direction.orderFunc(p.order.Field.field))
	if p.order.Field != DefaultWorkOrderTypeOrder.Field {
		query = query.Order(Asc(DefaultWorkOrderTypeOrder.Field.field))
	}
	return query
}

// Paginate executes the query and returns a relay based cursor connection to WorkOrderType.
func (wot *WorkOrderTypeQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...WorkOrderTypePaginateOption,
) (*WorkOrderTypeConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newWorkOrderTypePager(opts)
	if err != nil {
		return nil, err
	}

	if wot, err = pager.applyFilter(wot); err != nil {
		return nil, err
	}

	conn := &WorkOrderTypeConnection{Edges: []*WorkOrderTypeEdge{}}
	if !hasCollectedField(ctx, edgesField) ||
		first != nil && *first == 0 ||
		last != nil && *last == 0 {
		if hasCollectedField(ctx, totalCountField) ||
			hasCollectedField(ctx, pageInfoField) {
			count, err := wot.Count(ctx)
			if err != nil {
				return nil, err
			}
			conn.TotalCount = count
			conn.PageInfo.HasNextPage = first != nil && count > 0
			conn.PageInfo.HasPreviousPage = last != nil && count > 0
		}
		return conn, nil
	}

	if (after != nil || first != nil || before != nil || last != nil) &&
		hasCollectedField(ctx, totalCountField) {
		count, err := wot.Clone().Count(ctx)
		if err != nil {
			return nil, err
		}
		conn.TotalCount = count
	}

	wot = pager.applyCursors(wot, after, before)
	wot = pager.applyOrder(wot, last != nil)
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	if limit > 0 {
		wot = wot.Limit(limit)
	}

	if field := getCollectedField(ctx, edgesField, nodeField); field != nil {
		wot = wot.collectField(graphql.GetOperationContext(ctx), *field)
	}

	nodes, err := wot.All(ctx)
	if err != nil || len(nodes) == 0 {
		return conn, err
	}

	if len(nodes) == limit {
		conn.PageInfo.HasNextPage = first != nil
		conn.PageInfo.HasPreviousPage = last != nil
		nodes = nodes[:len(nodes)-1]
	}

	var nodeAt func(int) *WorkOrderType
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *WorkOrderType {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *WorkOrderType {
			return nodes[i]
		}
	}

	conn.Edges = make([]*WorkOrderTypeEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		conn.Edges[i] = &WorkOrderTypeEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}

	conn.PageInfo.StartCursor = &conn.Edges[0].Cursor
	conn.PageInfo.EndCursor = &conn.Edges[len(conn.Edges)-1].Cursor
	if conn.TotalCount == 0 {
		conn.TotalCount = len(nodes)
	}

	return conn, nil
}

// WorkOrderTypeOrderField defines the ordering field of WorkOrderType.
type WorkOrderTypeOrderField struct {
	field    string
	toCursor func(*WorkOrderType) Cursor
}

// WorkOrderTypeOrder defines the ordering of WorkOrderType.
type WorkOrderTypeOrder struct {
	Direction OrderDirection           `json:"direction"`
	Field     *WorkOrderTypeOrderField `json:"field"`
}

// DefaultWorkOrderTypeOrder is the default ordering of WorkOrderType.
var DefaultWorkOrderTypeOrder = &WorkOrderTypeOrder{
	Direction: OrderDirectionAsc,
	Field: &WorkOrderTypeOrderField{
		field: workordertype.FieldID,
		toCursor: func(wot *WorkOrderType) Cursor {
			return Cursor{ID: wot.ID}
		},
	},
}
