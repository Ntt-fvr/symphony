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
	"github.com/facebookincubator/symphony/pkg/ent/rule"
	"github.com/facebookincubator/symphony/pkg/ent/rulelimit"
)

// RuleLimit is the model entity for the RuleLimit schema.
type RuleLimit struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Number holds the value of the "number" field.
	Number int `json:"number,omitempty"`
	// LimitType holds the value of the "limitType" field.
	LimitType string `json:"limitType,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the RuleLimitQuery when eager-loading is set.
	Edges                          RuleLimitEdges `json:"edges"`
	comparator_comparatorrulelimit *int
	rule_rulelimitrule             *int
}

// RuleLimitEdges holds the relations/edges for other nodes in the graph.
type RuleLimitEdges struct {
	// Comparator holds the value of the comparator edge.
	Comparator *Comparator
	// Rule holds the value of the rule edge.
	Rule *Rule
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// ComparatorOrErr returns the Comparator value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e RuleLimitEdges) ComparatorOrErr() (*Comparator, error) {
	if e.loadedTypes[0] {
		if e.Comparator == nil {
			// The edge comparator was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: comparator.Label}
		}
		return e.Comparator, nil
	}
	return nil, &NotLoadedError{edge: "comparator"}
}

// RuleOrErr returns the Rule value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e RuleLimitEdges) RuleOrErr() (*Rule, error) {
	if e.loadedTypes[1] {
		if e.Rule == nil {
			// The edge rule was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: rule.Label}
		}
		return e.Rule, nil
	}
	return nil, &NotLoadedError{edge: "rule"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*RuleLimit) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullInt64{},  // number
		&sql.NullString{}, // limitType
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*RuleLimit) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // comparator_comparatorrulelimit
		&sql.NullInt64{}, // rule_rulelimitrule
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the RuleLimit fields.
func (rl *RuleLimit) assignValues(values ...interface{}) error {
	if m, n := len(values), len(rulelimit.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	rl.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		rl.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		rl.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field number", values[2])
	} else if value.Valid {
		rl.Number = int(value.Int64)
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field limitType", values[3])
	} else if value.Valid {
		rl.LimitType = value.String
	}
	values = values[4:]
	if len(values) == len(rulelimit.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field comparator_comparatorrulelimit", value)
		} else if value.Valid {
			rl.comparator_comparatorrulelimit = new(int)
			*rl.comparator_comparatorrulelimit = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field rule_rulelimitrule", value)
		} else if value.Valid {
			rl.rule_rulelimitrule = new(int)
			*rl.rule_rulelimitrule = int(value.Int64)
		}
	}
	return nil
}

// QueryComparator queries the comparator edge of the RuleLimit.
func (rl *RuleLimit) QueryComparator() *ComparatorQuery {
	return (&RuleLimitClient{config: rl.config}).QueryComparator(rl)
}

// QueryRule queries the rule edge of the RuleLimit.
func (rl *RuleLimit) QueryRule() *RuleQuery {
	return (&RuleLimitClient{config: rl.config}).QueryRule(rl)
}

// Update returns a builder for updating this RuleLimit.
// Note that, you need to call RuleLimit.Unwrap() before calling this method, if this RuleLimit
// was returned from a transaction, and the transaction was committed or rolled back.
func (rl *RuleLimit) Update() *RuleLimitUpdateOne {
	return (&RuleLimitClient{config: rl.config}).UpdateOne(rl)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (rl *RuleLimit) Unwrap() *RuleLimit {
	tx, ok := rl.config.driver.(*txDriver)
	if !ok {
		panic("ent: RuleLimit is not a transactional entity")
	}
	rl.config.driver = tx.drv
	return rl
}

// String implements the fmt.Stringer.
func (rl *RuleLimit) String() string {
	var builder strings.Builder
	builder.WriteString("RuleLimit(")
	builder.WriteString(fmt.Sprintf("id=%v", rl.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(rl.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(rl.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", number=")
	builder.WriteString(fmt.Sprintf("%v", rl.Number))
	builder.WriteString(", limitType=")
	builder.WriteString(rl.LimitType)
	builder.WriteByte(')')
	return builder.String()
}

// RuleLimits is a parsable slice of RuleLimit.
type RuleLimits []*RuleLimit

func (rl RuleLimits) config(cfg config) {
	for _i := range rl {
		rl[_i].config = cfg
	}
}
