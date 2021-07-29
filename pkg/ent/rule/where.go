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

// Status applies equality check predicate on the "status" field. It's identical to StatusEQ.
func Status(v bool) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStatus), v))
	})
}

// EventTypeName applies equality check predicate on the "eventTypeName" field. It's identical to EventTypeNameEQ.
func EventTypeName(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEventTypeName), v))
	})
}

// SpecificProblem applies equality check predicate on the "specificProblem" field. It's identical to SpecificProblemEQ.
func SpecificProblem(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSpecificProblem), v))
	})
}

// AdditionalInfo applies equality check predicate on the "additionalInfo" field. It's identical to AdditionalInfoEQ.
func AdditionalInfo(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAdditionalInfo), v))
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

// StatusEQ applies the EQ predicate on the "status" field.
func StatusEQ(v bool) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStatus), v))
	})
}

// StatusNEQ applies the NEQ predicate on the "status" field.
func StatusNEQ(v bool) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStatus), v))
	})
}

// EventTypeNameEQ applies the EQ predicate on the "eventTypeName" field.
func EventTypeNameEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameNEQ applies the NEQ predicate on the "eventTypeName" field.
func EventTypeNameNEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameIn applies the In predicate on the "eventTypeName" field.
func EventTypeNameIn(vs ...string) predicate.Rule {
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
		s.Where(sql.In(s.C(FieldEventTypeName), v...))
	})
}

// EventTypeNameNotIn applies the NotIn predicate on the "eventTypeName" field.
func EventTypeNameNotIn(vs ...string) predicate.Rule {
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
		s.Where(sql.NotIn(s.C(FieldEventTypeName), v...))
	})
}

// EventTypeNameGT applies the GT predicate on the "eventTypeName" field.
func EventTypeNameGT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameGTE applies the GTE predicate on the "eventTypeName" field.
func EventTypeNameGTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameLT applies the LT predicate on the "eventTypeName" field.
func EventTypeNameLT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameLTE applies the LTE predicate on the "eventTypeName" field.
func EventTypeNameLTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameContains applies the Contains predicate on the "eventTypeName" field.
func EventTypeNameContains(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameHasPrefix applies the HasPrefix predicate on the "eventTypeName" field.
func EventTypeNameHasPrefix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameHasSuffix applies the HasSuffix predicate on the "eventTypeName" field.
func EventTypeNameHasSuffix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameIsNil applies the IsNil predicate on the "eventTypeName" field.
func EventTypeNameIsNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldEventTypeName)))
	})
}

// EventTypeNameNotNil applies the NotNil predicate on the "eventTypeName" field.
func EventTypeNameNotNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldEventTypeName)))
	})
}

// EventTypeNameEqualFold applies the EqualFold predicate on the "eventTypeName" field.
func EventTypeNameEqualFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldEventTypeName), v))
	})
}

// EventTypeNameContainsFold applies the ContainsFold predicate on the "eventTypeName" field.
func EventTypeNameContainsFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldEventTypeName), v))
	})
}

// SpecificProblemEQ applies the EQ predicate on the "specificProblem" field.
func SpecificProblemEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemNEQ applies the NEQ predicate on the "specificProblem" field.
func SpecificProblemNEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemIn applies the In predicate on the "specificProblem" field.
func SpecificProblemIn(vs ...string) predicate.Rule {
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
		s.Where(sql.In(s.C(FieldSpecificProblem), v...))
	})
}

// SpecificProblemNotIn applies the NotIn predicate on the "specificProblem" field.
func SpecificProblemNotIn(vs ...string) predicate.Rule {
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
		s.Where(sql.NotIn(s.C(FieldSpecificProblem), v...))
	})
}

// SpecificProblemGT applies the GT predicate on the "specificProblem" field.
func SpecificProblemGT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemGTE applies the GTE predicate on the "specificProblem" field.
func SpecificProblemGTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemLT applies the LT predicate on the "specificProblem" field.
func SpecificProblemLT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemLTE applies the LTE predicate on the "specificProblem" field.
func SpecificProblemLTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemContains applies the Contains predicate on the "specificProblem" field.
func SpecificProblemContains(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemHasPrefix applies the HasPrefix predicate on the "specificProblem" field.
func SpecificProblemHasPrefix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemHasSuffix applies the HasSuffix predicate on the "specificProblem" field.
func SpecificProblemHasSuffix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemIsNil applies the IsNil predicate on the "specificProblem" field.
func SpecificProblemIsNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldSpecificProblem)))
	})
}

// SpecificProblemNotNil applies the NotNil predicate on the "specificProblem" field.
func SpecificProblemNotNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldSpecificProblem)))
	})
}

// SpecificProblemEqualFold applies the EqualFold predicate on the "specificProblem" field.
func SpecificProblemEqualFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSpecificProblem), v))
	})
}

// SpecificProblemContainsFold applies the ContainsFold predicate on the "specificProblem" field.
func SpecificProblemContainsFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSpecificProblem), v))
	})
}

// AdditionalInfoEQ applies the EQ predicate on the "additionalInfo" field.
func AdditionalInfoEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoNEQ applies the NEQ predicate on the "additionalInfo" field.
func AdditionalInfoNEQ(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoIn applies the In predicate on the "additionalInfo" field.
func AdditionalInfoIn(vs ...string) predicate.Rule {
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
		s.Where(sql.In(s.C(FieldAdditionalInfo), v...))
	})
}

// AdditionalInfoNotIn applies the NotIn predicate on the "additionalInfo" field.
func AdditionalInfoNotIn(vs ...string) predicate.Rule {
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
		s.Where(sql.NotIn(s.C(FieldAdditionalInfo), v...))
	})
}

// AdditionalInfoGT applies the GT predicate on the "additionalInfo" field.
func AdditionalInfoGT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoGTE applies the GTE predicate on the "additionalInfo" field.
func AdditionalInfoGTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoLT applies the LT predicate on the "additionalInfo" field.
func AdditionalInfoLT(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoLTE applies the LTE predicate on the "additionalInfo" field.
func AdditionalInfoLTE(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoContains applies the Contains predicate on the "additionalInfo" field.
func AdditionalInfoContains(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoHasPrefix applies the HasPrefix predicate on the "additionalInfo" field.
func AdditionalInfoHasPrefix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoHasSuffix applies the HasSuffix predicate on the "additionalInfo" field.
func AdditionalInfoHasSuffix(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoIsNil applies the IsNil predicate on the "additionalInfo" field.
func AdditionalInfoIsNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldAdditionalInfo)))
	})
}

// AdditionalInfoNotNil applies the NotNil predicate on the "additionalInfo" field.
func AdditionalInfoNotNil() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldAdditionalInfo)))
	})
}

// AdditionalInfoEqualFold applies the EqualFold predicate on the "additionalInfo" field.
func AdditionalInfoEqualFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldAdditionalInfo), v))
	})
}

// AdditionalInfoContainsFold applies the ContainsFold predicate on the "additionalInfo" field.
func AdditionalInfoContainsFold(v string) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldAdditionalInfo), v))
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

// HasEventseverity applies the HasEdge predicate on the "eventseverity" edge.
func HasEventseverity() predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(EventseverityTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, EventseverityTable, EventseverityColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasEventseverityWith applies the HasEdge predicate on the "eventseverity" edge with a given conditions (other predicates).
func HasEventseverityWith(preds ...predicate.EventSeverity) predicate.Rule {
	return predicate.Rule(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(EventseverityInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, EventseverityTable, EventseverityColumn),
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
