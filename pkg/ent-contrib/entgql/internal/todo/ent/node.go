// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"
	"sync/atomic"

	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/schema"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent/todo"
	"github.com/hashicorp/go-multierror"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"golang.org/x/sync/semaphore"
)

// Noder wraps the basic Node method.
type Noder interface {
	Node(context.Context) (*Node, error)
}

// Node in the graph.
type Node struct {
	ID     int      `json:"id,omitemty"`      // node id.
	Type   string   `json:"type,omitempty"`   // node type.
	Fields []*Field `json:"fields,omitempty"` // node fields.
	Edges  []*Edge  `json:"edges,omitempty"`  // node edges.
}

// Field of a node.
type Field struct {
	Type  string `json:"type,omitempty"`  // field type.
	Name  string `json:"name,omitempty"`  // field name (as in struct).
	Value string `json:"value,omitempty"` // stringified value.
}

// Edges between two nodes.
type Edge struct {
	Type string `json:"type,omitempty"` // edge type.
	Name string `json:"name,omitempty"` // edge name.
	IDs  []int  `json:"ids,omitempty"`  // node ids (where this edge point to).
}

func (t *Todo) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     t.ID,
		Type:   "Todo",
		Fields: make([]*Field, 4),
		Edges:  make([]*Edge, 2),
	}
	var buf []byte
	if buf, err = json.Marshal(t.CreatedAt); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "time.Time",
		Name:  "created_at",
		Value: string(buf),
	}
	if buf, err = json.Marshal(t.Status); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "todo.Status",
		Name:  "status",
		Value: string(buf),
	}
	if buf, err = json.Marshal(t.Priority); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "int",
		Name:  "priority",
		Value: string(buf),
	}
	if buf, err = json.Marshal(t.Text); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "string",
		Name:  "text",
		Value: string(buf),
	}
	var ids []int
	ids, err = t.QueryParent().
		Select(todo.FieldID).
		Ints(ctx)
	if err != nil {
		return nil, err
	}
	node.Edges[0] = &Edge{
		IDs:  ids,
		Type: "Todo",
		Name: "parent",
	}
	ids, err = t.QueryChildren().
		Select(todo.FieldID).
		Ints(ctx)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		IDs:  ids,
		Type: "Todo",
		Name: "children",
	}
	return node, nil
}

func (c *Client) Node(ctx context.Context, id int) (*Node, error) {
	n, err := c.Noder(ctx, id)
	if err != nil {
		return nil, err
	}
	return n.Node(ctx)
}

func errNodeNotFound(id int) *gqlerror.Error {
	err := gqlerror.Errorf("Could not resolve to a node with the global id of '%v'", id)
	errcode.Set(err, "NOT_FOUND")
	return err
}

var errNodeInvalidID = &NotFoundError{"node"}

func (c *Client) Noder(ctx context.Context, id int) (_ Noder, err error) {
	defer func() {
		if IsNotFound(err) {
			err = multierror.Append(err, errNodeNotFound(id))
		}
	}()
	tables, err := c.tables.Load(ctx, c.driver)
	if err != nil {
		return nil, err
	}
	idx := id / (1<<32 - 1)
	if idx < 0 || idx >= len(tables) {
		return nil, fmt.Errorf("cannot resolve table from id %v: %w", id, errNodeInvalidID)
	}
	return c.noder(ctx, tables[idx], id)
}

func (c *Client) noder(ctx context.Context, tbl string, id int) (Noder, error) {
	switch tbl {
	case todo.Table:
		n, err := c.Todo.Query().
			Where(todo.ID(id)).
			CollectFields(ctx, "Todo").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	default:
		return nil, fmt.Errorf("cannot resolve noder from table %q: %w", tbl, errNodeInvalidID)
	}
}

type (
	tables struct {
		once  sync.Once
		sem   *semaphore.Weighted
		value atomic.Value
	}

	querier interface {
		Query(ctx context.Context, query string, args, v interface{}) error
	}
)

func (t *tables) Load(ctx context.Context, querier querier) ([]string, error) {
	if tables := t.value.Load(); tables != nil {
		return tables.([]string), nil
	}
	t.once.Do(func() { t.sem = semaphore.NewWeighted(1) })
	if err := t.sem.Acquire(ctx, 1); err != nil {
		return nil, err
	}
	defer t.sem.Release(1)
	if tables := t.value.Load(); tables != nil {
		return tables.([]string), nil
	}
	tables, err := t.load(ctx, querier)
	if err == nil {
		t.value.Store(tables)
	}
	return tables, err
}

func (tables) load(ctx context.Context, querier querier) ([]string, error) {
	rows := &sql.Rows{}
	query, args := sql.Select("type").
		From(sql.Table(schema.TypeTable)).
		OrderBy(sql.Asc("id")).
		Query()
	if err := querier.Query(ctx, query, args, rows); err != nil {
		return nil, err
	}
	defer rows.Close()
	var tables []string
	return tables, sql.ScanSlice(rows, &tables)
}
