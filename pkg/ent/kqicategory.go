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
	"github.com/facebookincubator/symphony/pkg/ent/kqicategory"
)

// KqiCategory is the model entity for the KqiCategory schema.
type KqiCategory struct {
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
	// The values are being populated by the KqiCategoryQuery when eager-loading is set.
	Edges KqiCategoryEdges `json:"edges"`
}

// KqiCategoryEdges holds the relations/edges for other nodes in the graph.
type KqiCategoryEdges struct {
	// KqiCategoryFk holds the value of the kqiCategoryFk edge.
	KqiCategoryFk []*Kqi
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// KqiCategoryFkOrErr returns the KqiCategoryFk value or an error if the edge
// was not loaded in eager-loading.
func (e KqiCategoryEdges) KqiCategoryFkOrErr() ([]*Kqi, error) {
	if e.loadedTypes[0] {
		return e.KqiCategoryFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiCategoryFk"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*KqiCategory) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the KqiCategory fields.
func (kc *KqiCategory) assignValues(values ...interface{}) error {
	if m, n := len(values), len(kqicategory.Columns); m < n {
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
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		kc.Name = value.String
	}
	return nil
}

// QueryKqiCategoryFk queries the kqiCategoryFk edge of the KqiCategory.
func (kc *KqiCategory) QueryKqiCategoryFk() *KqiQuery {
	return (&KqiCategoryClient{config: kc.config}).QueryKqiCategoryFk(kc)
}

// Update returns a builder for updating this KqiCategory.
// Note that, you need to call KqiCategory.Unwrap() before calling this method, if this KqiCategory
// was returned from a transaction, and the transaction was committed or rolled back.
func (kc *KqiCategory) Update() *KqiCategoryUpdateOne {
	return (&KqiCategoryClient{config: kc.config}).UpdateOne(kc)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (kc *KqiCategory) Unwrap() *KqiCategory {
	tx, ok := kc.config.driver.(*txDriver)
	if !ok {
		panic("ent: KqiCategory is not a transactional entity")
	}
	kc.config.driver = tx.drv
	return kc
}

// String implements the fmt.Stringer.
func (kc *KqiCategory) String() string {
	var builder strings.Builder
	builder.WriteString("KqiCategory(")
	builder.WriteString(fmt.Sprintf("id=%v", kc.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(kc.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(kc.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(kc.Name)
	builder.WriteByte(')')
	return builder.String()
}

// KqiCategories is a parsable slice of KqiCategory.
type KqiCategories []*KqiCategory

func (kc KqiCategories) config(cfg config) {
	for _i := range kc {
		kc[_i].config = cfg
	}
}
