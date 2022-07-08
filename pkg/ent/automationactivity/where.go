// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package automationactivity

import (
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// CreateTime applies equality check predicate on the "create_time" field. It's identical to CreateTimeEQ.
func CreateTime(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// UpdateTime applies equality check predicate on the "update_time" field. It's identical to UpdateTimeEQ.
func UpdateTime(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// OldValue applies equality check predicate on the "old_value" field. It's identical to OldValueEQ.
func OldValue(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldOldValue), v))
	})
}

// NewValue applies equality check predicate on the "new_value" field. It's identical to NewValueEQ.
func NewValue(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNewValue), v))
	})
}

// CreateTimeEQ applies the EQ predicate on the "create_time" field.
func CreateTimeEQ(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeNEQ applies the NEQ predicate on the "create_time" field.
func CreateTimeNEQ(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeIn applies the In predicate on the "create_time" field.
func CreateTimeIn(vs ...time.Time) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldCreateTime), v...))
	})
}

// CreateTimeNotIn applies the NotIn predicate on the "create_time" field.
func CreateTimeNotIn(vs ...time.Time) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldCreateTime), v...))
	})
}

// CreateTimeGT applies the GT predicate on the "create_time" field.
func CreateTimeGT(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeGTE applies the GTE predicate on the "create_time" field.
func CreateTimeGTE(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLT applies the LT predicate on the "create_time" field.
func CreateTimeLT(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLTE applies the LTE predicate on the "create_time" field.
func CreateTimeLTE(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldCreateTime), v))
	})
}

// UpdateTimeEQ applies the EQ predicate on the "update_time" field.
func UpdateTimeEQ(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeNEQ applies the NEQ predicate on the "update_time" field.
func UpdateTimeNEQ(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeIn applies the In predicate on the "update_time" field.
func UpdateTimeIn(vs ...time.Time) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldUpdateTime), v...))
	})
}

// UpdateTimeNotIn applies the NotIn predicate on the "update_time" field.
func UpdateTimeNotIn(vs ...time.Time) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldUpdateTime), v...))
	})
}

// UpdateTimeGT applies the GT predicate on the "update_time" field.
func UpdateTimeGT(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeGTE applies the GTE predicate on the "update_time" field.
func UpdateTimeGTE(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLT applies the LT predicate on the "update_time" field.
func UpdateTimeLT(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLTE applies the LTE predicate on the "update_time" field.
func UpdateTimeLTE(v time.Time) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldUpdateTime), v))
	})
}

// ActivityTypeEQ applies the EQ predicate on the "activity_type" field.
func ActivityTypeEQ(v ActivityType) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldActivityType), v))
	})
}

// ActivityTypeNEQ applies the NEQ predicate on the "activity_type" field.
func ActivityTypeNEQ(v ActivityType) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldActivityType), v))
	})
}

// ActivityTypeIn applies the In predicate on the "activity_type" field.
func ActivityTypeIn(vs ...ActivityType) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldActivityType), v...))
	})
}

// ActivityTypeNotIn applies the NotIn predicate on the "activity_type" field.
func ActivityTypeNotIn(vs ...ActivityType) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldActivityType), v...))
	})
}

// AutomationEntityTypeEQ applies the EQ predicate on the "automation_entity_type" field.
func AutomationEntityTypeEQ(v AutomationEntityType) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAutomationEntityType), v))
	})
}

// AutomationEntityTypeNEQ applies the NEQ predicate on the "automation_entity_type" field.
func AutomationEntityTypeNEQ(v AutomationEntityType) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAutomationEntityType), v))
	})
}

// AutomationEntityTypeIn applies the In predicate on the "automation_entity_type" field.
func AutomationEntityTypeIn(vs ...AutomationEntityType) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldAutomationEntityType), v...))
	})
}

// AutomationEntityTypeNotIn applies the NotIn predicate on the "automation_entity_type" field.
func AutomationEntityTypeNotIn(vs ...AutomationEntityType) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldAutomationEntityType), v...))
	})
}

// OldValueEQ applies the EQ predicate on the "old_value" field.
func OldValueEQ(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldOldValue), v))
	})
}

// OldValueNEQ applies the NEQ predicate on the "old_value" field.
func OldValueNEQ(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldOldValue), v))
	})
}

// OldValueIn applies the In predicate on the "old_value" field.
func OldValueIn(vs ...string) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldOldValue), v...))
	})
}

// OldValueNotIn applies the NotIn predicate on the "old_value" field.
func OldValueNotIn(vs ...string) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldOldValue), v...))
	})
}

// OldValueGT applies the GT predicate on the "old_value" field.
func OldValueGT(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldOldValue), v))
	})
}

// OldValueGTE applies the GTE predicate on the "old_value" field.
func OldValueGTE(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldOldValue), v))
	})
}

// OldValueLT applies the LT predicate on the "old_value" field.
func OldValueLT(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldOldValue), v))
	})
}

// OldValueLTE applies the LTE predicate on the "old_value" field.
func OldValueLTE(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldOldValue), v))
	})
}

// OldValueContains applies the Contains predicate on the "old_value" field.
func OldValueContains(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldOldValue), v))
	})
}

// OldValueHasPrefix applies the HasPrefix predicate on the "old_value" field.
func OldValueHasPrefix(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldOldValue), v))
	})
}

// OldValueHasSuffix applies the HasSuffix predicate on the "old_value" field.
func OldValueHasSuffix(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldOldValue), v))
	})
}

// OldValueIsNil applies the IsNil predicate on the "old_value" field.
func OldValueIsNil() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldOldValue)))
	})
}

// OldValueNotNil applies the NotNil predicate on the "old_value" field.
func OldValueNotNil() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldOldValue)))
	})
}

// OldValueEqualFold applies the EqualFold predicate on the "old_value" field.
func OldValueEqualFold(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldOldValue), v))
	})
}

// OldValueContainsFold applies the ContainsFold predicate on the "old_value" field.
func OldValueContainsFold(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldOldValue), v))
	})
}

// NewValueEQ applies the EQ predicate on the "new_value" field.
func NewValueEQ(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNewValue), v))
	})
}

// NewValueNEQ applies the NEQ predicate on the "new_value" field.
func NewValueNEQ(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldNewValue), v))
	})
}

// NewValueIn applies the In predicate on the "new_value" field.
func NewValueIn(vs ...string) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldNewValue), v...))
	})
}

// NewValueNotIn applies the NotIn predicate on the "new_value" field.
func NewValueNotIn(vs ...string) predicate.AutomationActivity {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.AutomationActivity(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldNewValue), v...))
	})
}

// NewValueGT applies the GT predicate on the "new_value" field.
func NewValueGT(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldNewValue), v))
	})
}

// NewValueGTE applies the GTE predicate on the "new_value" field.
func NewValueGTE(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldNewValue), v))
	})
}

// NewValueLT applies the LT predicate on the "new_value" field.
func NewValueLT(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldNewValue), v))
	})
}

// NewValueLTE applies the LTE predicate on the "new_value" field.
func NewValueLTE(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldNewValue), v))
	})
}

// NewValueContains applies the Contains predicate on the "new_value" field.
func NewValueContains(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldNewValue), v))
	})
}

// NewValueHasPrefix applies the HasPrefix predicate on the "new_value" field.
func NewValueHasPrefix(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldNewValue), v))
	})
}

// NewValueHasSuffix applies the HasSuffix predicate on the "new_value" field.
func NewValueHasSuffix(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldNewValue), v))
	})
}

// NewValueIsNil applies the IsNil predicate on the "new_value" field.
func NewValueIsNil() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldNewValue)))
	})
}

// NewValueNotNil applies the NotNil predicate on the "new_value" field.
func NewValueNotNil() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldNewValue)))
	})
}

// NewValueEqualFold applies the EqualFold predicate on the "new_value" field.
func NewValueEqualFold(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldNewValue), v))
	})
}

// NewValueContainsFold applies the ContainsFold predicate on the "new_value" field.
func NewValueContainsFold(v string) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldNewValue), v))
	})
}

// HasAuthor applies the HasEdge predicate on the "author" edge.
func HasAuthor() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(AuthorTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, AuthorTable, AuthorColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasAuthorWith applies the HasEdge predicate on the "author" edge with a given conditions (other predicates).
func HasAuthorWith(preds ...predicate.User) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(AuthorInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, AuthorTable, AuthorColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasFlowInstance applies the HasEdge predicate on the "flow_instance" edge.
func HasFlowInstance() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowInstanceTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, FlowInstanceTable, FlowInstanceColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasFlowInstanceWith applies the HasEdge predicate on the "flow_instance" edge with a given conditions (other predicates).
func HasFlowInstanceWith(preds ...predicate.FlowInstance) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowInstanceInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, FlowInstanceTable, FlowInstanceColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasBlockInstance applies the HasEdge predicate on the "block_instance" edge.
func HasBlockInstance() predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BlockInstanceTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BlockInstanceTable, BlockInstanceColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasBlockInstanceWith applies the HasEdge predicate on the "block_instance" edge with a given conditions (other predicates).
func HasBlockInstanceWith(preds ...predicate.BlockInstance) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BlockInstanceInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BlockInstanceTable, BlockInstanceColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.AutomationActivity) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.AutomationActivity) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.AutomationActivity) predicate.AutomationActivity {
	return predicate.AutomationActivity(func(s *sql.Selector) {
		p(s.Not())
	})
}
