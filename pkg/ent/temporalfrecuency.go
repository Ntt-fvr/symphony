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
	"github.com/facebookincubator/symphony/pkg/ent/temporalfrecuency"
)

// TemporalFrecuency is the model entity for the TemporalFrecuency schema.
type TemporalFrecuency struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the TemporalFrecuencyQuery when eager-loading is set.
	Edges TemporalFrecuencyEdges `json:"edges"`
}

// TemporalFrecuencyEdges holds the relations/edges for other nodes in the graph.
type TemporalFrecuencyEdges struct {
	// TemporalFrecuencyFk holds the value of the temporalFrecuencyFk edge.
	TemporalFrecuencyFk []*Kqi
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// TemporalFrecuencyFkOrErr returns the TemporalFrecuencyFk value or an error if the edge
// was not loaded in eager-loading.
func (e TemporalFrecuencyEdges) TemporalFrecuencyFkOrErr() ([]*Kqi, error) {
	if e.loadedTypes[0] {
		return e.TemporalFrecuencyFk, nil
	}
	return nil, &NotLoadedError{edge: "temporalFrecuencyFk"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*TemporalFrecuency) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the TemporalFrecuency fields.
func (tf *TemporalFrecuency) assignValues(values ...interface{}) error {
	if m, n := len(values), len(temporalfrecuency.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	tf.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		tf.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		tf.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		tf.Name = value.String
	}
	return nil
}

// QueryTemporalFrecuencyFk queries the temporalFrecuencyFk edge of the TemporalFrecuency.
func (tf *TemporalFrecuency) QueryTemporalFrecuencyFk() *KqiQuery {
	return (&TemporalFrecuencyClient{config: tf.config}).QueryTemporalFrecuencyFk(tf)
}

// Update returns a builder for updating this TemporalFrecuency.
// Note that, you need to call TemporalFrecuency.Unwrap() before calling this method, if this TemporalFrecuency
// was returned from a transaction, and the transaction was committed or rolled back.
func (tf *TemporalFrecuency) Update() *TemporalFrecuencyUpdateOne {
	return (&TemporalFrecuencyClient{config: tf.config}).UpdateOne(tf)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (tf *TemporalFrecuency) Unwrap() *TemporalFrecuency {
	tx, ok := tf.config.driver.(*txDriver)
	if !ok {
		panic("ent: TemporalFrecuency is not a transactional entity")
	}
	tf.config.driver = tx.drv
	return tf
}

// String implements the fmt.Stringer.
func (tf *TemporalFrecuency) String() string {
	var builder strings.Builder
	builder.WriteString("TemporalFrecuency(")
	builder.WriteString(fmt.Sprintf("id=%v", tf.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(tf.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(tf.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(tf.Name)
	builder.WriteByte(')')
	return builder.String()
}

// TemporalFrecuencies is a parsable slice of TemporalFrecuency.
type TemporalFrecuencies []*TemporalFrecuency

func (tf TemporalFrecuencies) config(cfg config) {
	for _i := range tf {
		tf[_i].config = cfg
	}
}
