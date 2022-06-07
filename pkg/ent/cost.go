// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/cost"
	"github.com/facebookincubator/symphony/pkg/ent/uplitem"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
)

// Cost is the model entity for the Cost schema.
type Cost struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Item holds the value of the "item" field.
	Item string `json:"item,omitempty"`
	// Unit holds the value of the "unit" field.
	Unit float64 `json:"unit,omitempty"`
	// Price holds the value of the "price" field.
	Price float64 `json:"price,omitempty"`
	// Quantity holds the value of the "quantity" field.
	Quantity int `json:"quantity,omitempty"`
	// Total holds the value of the "total" field.
	Total float64 `json:"total,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the CostQuery when eager-loading is set.
	Edges                      CostEdges `json:"edges"`
	upl_item_uplitem           *int
	work_order_workorder_costs *int
}

// CostEdges holds the relations/edges for other nodes in the graph.
type CostEdges struct {
	// Uplitem holds the value of the uplitem edge.
	Uplitem *UplItem
	// Workorder holds the value of the workorder edge.
	Workorder *WorkOrder
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// UplitemOrErr returns the Uplitem value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e CostEdges) UplitemOrErr() (*UplItem, error) {
	if e.loadedTypes[0] {
		if e.Uplitem == nil {
			// The edge uplitem was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: uplitem.Label}
		}
		return e.Uplitem, nil
	}
	return nil, &NotLoadedError{edge: "uplitem"}
}

// WorkorderOrErr returns the Workorder value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e CostEdges) WorkorderOrErr() (*WorkOrder, error) {
	if e.loadedTypes[1] {
		if e.Workorder == nil {
			// The edge workorder was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: workorder.Label}
		}
		return e.Workorder, nil
	}
	return nil, &NotLoadedError{edge: "workorder"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Cost) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},   // id
		&sql.NullTime{},    // create_time
		&sql.NullTime{},    // update_time
		&sql.NullString{},  // item
		&sql.NullFloat64{}, // unit
		&sql.NullFloat64{}, // price
		&sql.NullInt64{},   // quantity
		&sql.NullFloat64{}, // total
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*Cost) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // upl_item_uplitem
		&sql.NullInt64{}, // work_order_workorder_costs
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Cost fields.
func (c *Cost) assignValues(values ...interface{}) error {
	if m, n := len(values), len(cost.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	c.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		c.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		c.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field item", values[2])
	} else if value.Valid {
		c.Item = value.String
	}
	if value, ok := values[3].(*sql.NullFloat64); !ok {
		return fmt.Errorf("unexpected type %T for field unit", values[3])
	} else if value.Valid {
		c.Unit = value.Float64
	}
	if value, ok := values[4].(*sql.NullFloat64); !ok {
		return fmt.Errorf("unexpected type %T for field price", values[4])
	} else if value.Valid {
		c.Price = value.Float64
	}
	if value, ok := values[5].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field quantity", values[5])
	} else if value.Valid {
		c.Quantity = int(value.Int64)
	}
	if value, ok := values[6].(*sql.NullFloat64); !ok {
		return fmt.Errorf("unexpected type %T for field total", values[6])
	} else if value.Valid {
		c.Total = value.Float64
	}
	values = values[7:]
	if len(values) == len(cost.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field upl_item_uplitem", value)
		} else if value.Valid {
			c.upl_item_uplitem = new(int)
			*c.upl_item_uplitem = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field work_order_workorder_costs", value)
		} else if value.Valid {
			c.work_order_workorder_costs = new(int)
			*c.work_order_workorder_costs = int(value.Int64)
		}
	}
	return nil
}

// QueryUplitem queries the uplitem edge of the Cost.
func (c *Cost) QueryUplitem() *UplItemQuery {
	return (&CostClient{config: c.config}).QueryUplitem(c)
}

// QueryWorkorder queries the workorder edge of the Cost.
func (c *Cost) QueryWorkorder() *WorkOrderQuery {
	return (&CostClient{config: c.config}).QueryWorkorder(c)
}

// Update returns a builder for updating this Cost.
// Note that, you need to call Cost.Unwrap() before calling this method, if this Cost
// was returned from a transaction, and the transaction was committed or rolled back.
func (c *Cost) Update() *CostUpdateOne {
	return (&CostClient{config: c.config}).UpdateOne(c)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (c *Cost) Unwrap() *Cost {
	tx, ok := c.config.driver.(*txDriver)
	if !ok {
		panic("ent: Cost is not a transactional entity")
	}
	c.config.driver = tx.drv
	return c
}

// String implements the fmt.Stringer.
func (c *Cost) String() string {
	var builder strings.Builder
	builder.WriteString("Cost(")
	builder.WriteString(fmt.Sprintf("id=%v", c.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(c.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(c.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", item=")
	builder.WriteString(c.Item)
	builder.WriteString(", unit=")
	builder.WriteString(fmt.Sprintf("%v", c.Unit))
	builder.WriteString(", price=")
	builder.WriteString(fmt.Sprintf("%v", c.Price))
	builder.WriteString(", quantity=")
	builder.WriteString(fmt.Sprintf("%v", c.Quantity))
	builder.WriteString(", total=")
	builder.WriteString(fmt.Sprintf("%v", c.Total))
	builder.WriteByte(')')
	return builder.String()
}

// Costs is a parsable slice of Cost.
type Costs []*Cost

func (c Costs) config(cfg config) {
	for _i := range c {
		c[_i].config = cfg
	}
}
