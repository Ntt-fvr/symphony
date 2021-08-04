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
	"github.com/facebookincubator/symphony/pkg/ent/comparator"
	"github.com/facebookincubator/symphony/pkg/ent/kqicomparator"
	"github.com/facebookincubator/symphony/pkg/ent/kqitarget"
)

// KqiComparator is the model entity for the KqiComparator schema.
type KqiComparator struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Number holds the value of the "number" field.
	Number float64 `json:"number,omitempty"`
	// ComparatorType holds the value of the "comparatorType" field.
	ComparatorType string `json:"comparatorType,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the KqiComparatorQuery when eager-loading is set.
	Edges                            KqiComparatorEdges `json:"edges"`
	comparator_comparatorkqitargetfk *int
	kqi_target_kqitargetcomparatorfk *int
}

// KqiComparatorEdges holds the relations/edges for other nodes in the graph.
type KqiComparatorEdges struct {
	// Comparatorkqitargetfk holds the value of the comparatorkqitargetfk edge.
	Comparatorkqitargetfk *Comparator
	// Kqitargetcomparatorfk holds the value of the kqitargetcomparatorfk edge.
	Kqitargetcomparatorfk *KqiTarget
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// ComparatorkqitargetfkOrErr returns the Comparatorkqitargetfk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiComparatorEdges) ComparatorkqitargetfkOrErr() (*Comparator, error) {
	if e.loadedTypes[0] {
		if e.Comparatorkqitargetfk == nil {
			// The edge comparatorkqitargetfk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: comparator.Label}
		}
		return e.Comparatorkqitargetfk, nil
	}
	return nil, &NotLoadedError{edge: "comparatorkqitargetfk"}
}

// KqitargetcomparatorfkOrErr returns the Kqitargetcomparatorfk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiComparatorEdges) KqitargetcomparatorfkOrErr() (*KqiTarget, error) {
	if e.loadedTypes[1] {
		if e.Kqitargetcomparatorfk == nil {
			// The edge kqitargetcomparatorfk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: kqitarget.Label}
		}
		return e.Kqitargetcomparatorfk, nil
	}
	return nil, &NotLoadedError{edge: "kqitargetcomparatorfk"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*KqiComparator) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},   // id
		&sql.NullTime{},    // create_time
		&sql.NullTime{},    // update_time
		&sql.NullFloat64{}, // number
		&sql.NullString{},  // comparatorType
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*KqiComparator) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // comparator_comparatorkqitargetfk
		&sql.NullInt64{}, // kqi_target_kqitargetcomparatorfk
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the KqiComparator fields.
func (kc *KqiComparator) assignValues(values ...interface{}) error {
	if m, n := len(values), len(kqicomparator.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	kc.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		kc.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		kc.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullFloat64); !ok {
		return fmt.Errorf("unexpected type %T for field number", values[2])
	} else if value.Valid {
		kc.Number = value.Float64
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field comparatorType", values[3])
	} else if value.Valid {
		kc.ComparatorType = value.String
	}
	values = values[4:]
	if len(values) == len(kqicomparator.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field comparator_comparatorkqitargetfk", value)
		} else if value.Valid {
			kc.comparator_comparatorkqitargetfk = new(int)
			*kc.comparator_comparatorkqitargetfk = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field kqi_target_kqitargetcomparatorfk", value)
		} else if value.Valid {
			kc.kqi_target_kqitargetcomparatorfk = new(int)
			*kc.kqi_target_kqitargetcomparatorfk = int(value.Int64)
		}
	}
	return nil
}

// QueryComparatorkqitargetfk queries the comparatorkqitargetfk edge of the KqiComparator.
func (kc *KqiComparator) QueryComparatorkqitargetfk() *ComparatorQuery {
	return (&KqiComparatorClient{config: kc.config}).QueryComparatorkqitargetfk(kc)
}

// QueryKqitargetcomparatorfk queries the kqitargetcomparatorfk edge of the KqiComparator.
func (kc *KqiComparator) QueryKqitargetcomparatorfk() *KqiTargetQuery {
	return (&KqiComparatorClient{config: kc.config}).QueryKqitargetcomparatorfk(kc)
}

// Update returns a builder for updating this KqiComparator.
// Note that, you need to call KqiComparator.Unwrap() before calling this method, if this KqiComparator
// was returned from a transaction, and the transaction was committed or rolled back.
func (kc *KqiComparator) Update() *KqiComparatorUpdateOne {
	return (&KqiComparatorClient{config: kc.config}).UpdateOne(kc)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (kc *KqiComparator) Unwrap() *KqiComparator {
	tx, ok := kc.config.driver.(*txDriver)
	if !ok {
		panic("ent: KqiComparator is not a transactional entity")
	}
	kc.config.driver = tx.drv
	return kc
}

// String implements the fmt.Stringer.
func (kc *KqiComparator) String() string {
	var builder strings.Builder
	builder.WriteString("KqiComparator(")
	builder.WriteString(fmt.Sprintf("id=%v", kc.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(kc.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(kc.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", number=")
	builder.WriteString(fmt.Sprintf("%v", kc.Number))
	builder.WriteString(", comparatorType=")
	builder.WriteString(kc.ComparatorType)
	builder.WriteByte(')')
	return builder.String()
}

// KqiComparators is a parsable slice of KqiComparator.
type KqiComparators []*KqiComparator

func (kc KqiComparators) config(cfg config) {
	for _i := range kc {
		kc[_i].config = cfg
	}
}
