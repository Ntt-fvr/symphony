// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package rule

import (
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
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
func IDNotIn(ids ...int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
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
func IDGT(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// CreateTime applies equality check predicate on the "create_time" field. It's identical to CreateTimeEQ.
func CreateTime(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// UpdateTime applies equality check predicate on the "update_time" field. It's identical to UpdateTimeEQ.
func UpdateTime(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldName), v))
	})
}

// GracePeriod applies equality check predicate on the "gracePeriod" field. It's identical to GracePeriodEQ.
func GracePeriod(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldGracePeriod), v))
	})
}

// StartDateTime applies equality check predicate on the "startDateTime" field. It's identical to StartDateTimeEQ.
func StartDateTime(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartDateTime), v))
	})
}

// EndDateTime applies equality check predicate on the "endDateTime" field. It's identical to EndDateTimeEQ.
func EndDateTime(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEndDateTime), v))
	})
}

// CreateTimeEQ applies the EQ predicate on the "create_time" field.
func CreateTimeEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeNEQ applies the NEQ predicate on the "create_time" field.
func CreateTimeNEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeIn applies the In predicate on the "create_time" field.
func CreateTimeIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
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
func CreateTimeNotIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
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
func CreateTimeGT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeGTE applies the GTE predicate on the "create_time" field.
func CreateTimeGTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLT applies the LT predicate on the "create_time" field.
func CreateTimeLT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLTE applies the LTE predicate on the "create_time" field.
func CreateTimeLTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldCreateTime), v))
	})
}

// UpdateTimeEQ applies the EQ predicate on the "update_time" field.
func UpdateTimeEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeNEQ applies the NEQ predicate on the "update_time" field.
func UpdateTimeNEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeIn applies the In predicate on the "update_time" field.
func UpdateTimeIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
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
func UpdateTimeNotIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
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
func UpdateTimeGT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeGTE applies the GTE predicate on the "update_time" field.
func UpdateTimeGTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLT applies the LT predicate on the "update_time" field.
func UpdateTimeLT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLTE applies the LTE predicate on the "update_time" field.
func UpdateTimeLTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldUpdateTime), v))
	})
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldName), v))
	})
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldName), v))
	})
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldName), v...))
	})
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldName), v...))
	})
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldName), v))
	})
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldName), v))
	})
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldName), v))
	})
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldName), v))
	})
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldName), v))
	})
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldName), v))
	})
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldName), v))
	})
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldName), v))
	})
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldName), v))
	})
}

// GracePeriodEQ applies the EQ predicate on the "gracePeriod" field.
func GracePeriodEQ(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldGracePeriod), v))
	})
}

// GracePeriodNEQ applies the NEQ predicate on the "gracePeriod" field.
func GracePeriodNEQ(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldGracePeriod), v))
	})
}

// GracePeriodIn applies the In predicate on the "gracePeriod" field.
func GracePeriodIn(vs ...int) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldGracePeriod), v...))
	})
}

// GracePeriodNotIn applies the NotIn predicate on the "gracePeriod" field.
func GracePeriodNotIn(vs ...int) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldGracePeriod), v...))
	})
}

// GracePeriodGT applies the GT predicate on the "gracePeriod" field.
func GracePeriodGT(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldGracePeriod), v))
	})
}

// GracePeriodGTE applies the GTE predicate on the "gracePeriod" field.
func GracePeriodGTE(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldGracePeriod), v))
	})
}

// GracePeriodLT applies the LT predicate on the "gracePeriod" field.
func GracePeriodLT(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldGracePeriod), v))
	})
}

// GracePeriodLTE applies the LTE predicate on the "gracePeriod" field.
func GracePeriodLTE(v int) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldGracePeriod), v))
	})
}

// StartDateTimeEQ applies the EQ predicate on the "startDateTime" field.
func StartDateTimeEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartDateTime), v))
	})
}

// StartDateTimeNEQ applies the NEQ predicate on the "startDateTime" field.
func StartDateTimeNEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStartDateTime), v))
	})
}

// StartDateTimeIn applies the In predicate on the "startDateTime" field.
func StartDateTimeIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldStartDateTime), v...))
	})
}

// StartDateTimeNotIn applies the NotIn predicate on the "startDateTime" field.
func StartDateTimeNotIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldStartDateTime), v...))
	})
}

// StartDateTimeGT applies the GT predicate on the "startDateTime" field.
func StartDateTimeGT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldStartDateTime), v))
	})
}

// StartDateTimeGTE applies the GTE predicate on the "startDateTime" field.
func StartDateTimeGTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldStartDateTime), v))
	})
}

// StartDateTimeLT applies the LT predicate on the "startDateTime" field.
func StartDateTimeLT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldStartDateTime), v))
	})
}

// StartDateTimeLTE applies the LTE predicate on the "startDateTime" field.
func StartDateTimeLTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldStartDateTime), v))
	})
}

// EndDateTimeEQ applies the EQ predicate on the "endDateTime" field.
func EndDateTimeEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEndDateTime), v))
	})
}

// EndDateTimeNEQ applies the NEQ predicate on the "endDateTime" field.
func EndDateTimeNEQ(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldEndDateTime), v))
	})
}

// EndDateTimeIn applies the In predicate on the "endDateTime" field.
func EndDateTimeIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldEndDateTime), v...))
	})
}

// EndDateTimeNotIn applies the NotIn predicate on the "endDateTime" field.
func EndDateTimeNotIn(vs ...time.Time) predicate.Rule {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Rule(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldEndDateTime), v...))
	})
}

// EndDateTimeGT applies the GT predicate on the "endDateTime" field.
func EndDateTimeGT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldEndDateTime), v))
	})
}

// EndDateTimeGTE applies the GTE predicate on the "endDateTime" field.
func EndDateTimeGTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldEndDateTime), v))
	})
}

// EndDateTimeLT applies the LT predicate on the "endDateTime" field.
func EndDateTimeLT(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldEndDateTime), v))
	})
}

// EndDateTimeLTE applies the LTE predicate on the "endDateTime" field.
func EndDateTimeLTE(v time.Time) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldEndDateTime), v))
	})
}

// HasRuletype applies the HasEdge predicate on the "ruletype" edge.
func HasRuletype() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RuletypeTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RuletypeTable, RuletypeColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRuletypeWith applies the HasEdge predicate on the "ruletype" edge with a given conditions (other predicates).
func HasRuletypeWith(preds ...predicate.RuleType) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RuletypeInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RuletypeTable, RuletypeColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasEvent applies the HasEdge predicate on the "event" edge.
func HasEvent() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(EventTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, EventTable, EventColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasEventWith applies the HasEdge predicate on the "event" edge with a given conditions (other predicates).
func HasEventWith(preds ...predicate.Event) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(EventInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, EventTable, EventColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTreshold applies the HasEdge predicate on the "treshold" edge.
func HasTreshold() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(TresholdTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, TresholdTable, TresholdColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTresholdWith applies the HasEdge predicate on the "treshold" edge with a given conditions (other predicates).
func HasTresholdWith(preds ...predicate.Treshold) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(TresholdInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, TresholdTable, TresholdColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasRulelimitrule applies the HasEdge predicate on the "rulelimitrule" edge.
func HasRulelimitrule() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RulelimitruleTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, RulelimitruleTable, RulelimitruleColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRulelimitruleWith applies the HasEdge predicate on the "rulelimitrule" edge with a given conditions (other predicates).
func HasRulelimitruleWith(preds ...predicate.RuleLimit) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RulelimitruleInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, RulelimitruleTable, RulelimitruleColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.Rule) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.Rule) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
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
func Not(p predicate.Rule) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		p(s.Not())
	})
}
