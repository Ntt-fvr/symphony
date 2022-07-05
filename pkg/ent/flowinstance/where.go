// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package flowinstance

import (
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func IDNotIn(ids ...int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func IDGT(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// CreateTime applies equality check predicate on the "create_time" field. It's identical to CreateTimeEQ.
func CreateTime(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// UpdateTime applies equality check predicate on the "update_time" field. It's identical to UpdateTimeEQ.
func UpdateTime(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// IncompletionReason applies equality check predicate on the "incompletion_reason" field. It's identical to IncompletionReasonEQ.
func IncompletionReason(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldIncompletionReason), v))
	})
}

// BssCode applies equality check predicate on the "bss_code" field. It's identical to BssCodeEQ.
func BssCode(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBssCode), v))
	})
}

// ServiceInstanceCode applies equality check predicate on the "service_instance_code" field. It's identical to ServiceInstanceCodeEQ.
func ServiceInstanceCode(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldServiceInstanceCode), v))
	})
}

// StartDate applies equality check predicate on the "start_date" field. It's identical to StartDateEQ.
func StartDate(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartDate), v))
	})
}

// EndDate applies equality check predicate on the "end_date" field. It's identical to EndDateEQ.
func EndDate(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEndDate), v))
	})
}

// CreateTimeEQ applies the EQ predicate on the "create_time" field.
func CreateTimeEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeNEQ applies the NEQ predicate on the "create_time" field.
func CreateTimeNEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeIn applies the In predicate on the "create_time" field.
func CreateTimeIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func CreateTimeNotIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func CreateTimeGT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeGTE applies the GTE predicate on the "create_time" field.
func CreateTimeGTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLT applies the LT predicate on the "create_time" field.
func CreateTimeLT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLTE applies the LTE predicate on the "create_time" field.
func CreateTimeLTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldCreateTime), v))
	})
}

// UpdateTimeEQ applies the EQ predicate on the "update_time" field.
func UpdateTimeEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeNEQ applies the NEQ predicate on the "update_time" field.
func UpdateTimeNEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeIn applies the In predicate on the "update_time" field.
func UpdateTimeIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func UpdateTimeNotIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func UpdateTimeGT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeGTE applies the GTE predicate on the "update_time" field.
func UpdateTimeGTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLT applies the LT predicate on the "update_time" field.
func UpdateTimeLT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLTE applies the LTE predicate on the "update_time" field.
func UpdateTimeLTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldUpdateTime), v))
	})
}

// StatusEQ applies the EQ predicate on the "status" field.
func StatusEQ(v Status) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStatus), v))
	})
}

// StatusNEQ applies the NEQ predicate on the "status" field.
func StatusNEQ(v Status) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStatus), v))
	})
}

// StatusIn applies the In predicate on the "status" field.
func StatusIn(vs ...Status) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldStatus), v...))
	})
}

// StatusNotIn applies the NotIn predicate on the "status" field.
func StatusNotIn(vs ...Status) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldStatus), v...))
	})
}

// StartParamsIsNil applies the IsNil predicate on the "start_params" field.
func StartParamsIsNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldStartParams)))
	})
}

// StartParamsNotNil applies the NotNil predicate on the "start_params" field.
func StartParamsNotNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldStartParams)))
	})
}

// OutputParamsIsNil applies the IsNil predicate on the "output_params" field.
func OutputParamsIsNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldOutputParams)))
	})
}

// OutputParamsNotNil applies the NotNil predicate on the "output_params" field.
func OutputParamsNotNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldOutputParams)))
	})
}

// IncompletionReasonEQ applies the EQ predicate on the "incompletion_reason" field.
func IncompletionReasonEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonNEQ applies the NEQ predicate on the "incompletion_reason" field.
func IncompletionReasonNEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonIn applies the In predicate on the "incompletion_reason" field.
func IncompletionReasonIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldIncompletionReason), v...))
	})
}

// IncompletionReasonNotIn applies the NotIn predicate on the "incompletion_reason" field.
func IncompletionReasonNotIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldIncompletionReason), v...))
	})
}

// IncompletionReasonGT applies the GT predicate on the "incompletion_reason" field.
func IncompletionReasonGT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonGTE applies the GTE predicate on the "incompletion_reason" field.
func IncompletionReasonGTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonLT applies the LT predicate on the "incompletion_reason" field.
func IncompletionReasonLT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonLTE applies the LTE predicate on the "incompletion_reason" field.
func IncompletionReasonLTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonContains applies the Contains predicate on the "incompletion_reason" field.
func IncompletionReasonContains(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonHasPrefix applies the HasPrefix predicate on the "incompletion_reason" field.
func IncompletionReasonHasPrefix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonHasSuffix applies the HasSuffix predicate on the "incompletion_reason" field.
func IncompletionReasonHasSuffix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonIsNil applies the IsNil predicate on the "incompletion_reason" field.
func IncompletionReasonIsNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldIncompletionReason)))
	})
}

// IncompletionReasonNotNil applies the NotNil predicate on the "incompletion_reason" field.
func IncompletionReasonNotNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldIncompletionReason)))
	})
}

// IncompletionReasonEqualFold applies the EqualFold predicate on the "incompletion_reason" field.
func IncompletionReasonEqualFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldIncompletionReason), v))
	})
}

// IncompletionReasonContainsFold applies the ContainsFold predicate on the "incompletion_reason" field.
func IncompletionReasonContainsFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldIncompletionReason), v))
	})
}

// BssCodeEQ applies the EQ predicate on the "bss_code" field.
func BssCodeEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBssCode), v))
	})
}

// BssCodeNEQ applies the NEQ predicate on the "bss_code" field.
func BssCodeNEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldBssCode), v))
	})
}

// BssCodeIn applies the In predicate on the "bss_code" field.
func BssCodeIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldBssCode), v...))
	})
}

// BssCodeNotIn applies the NotIn predicate on the "bss_code" field.
func BssCodeNotIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldBssCode), v...))
	})
}

// BssCodeGT applies the GT predicate on the "bss_code" field.
func BssCodeGT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldBssCode), v))
	})
}

// BssCodeGTE applies the GTE predicate on the "bss_code" field.
func BssCodeGTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldBssCode), v))
	})
}

// BssCodeLT applies the LT predicate on the "bss_code" field.
func BssCodeLT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldBssCode), v))
	})
}

// BssCodeLTE applies the LTE predicate on the "bss_code" field.
func BssCodeLTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldBssCode), v))
	})
}

// BssCodeContains applies the Contains predicate on the "bss_code" field.
func BssCodeContains(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldBssCode), v))
	})
}

// BssCodeHasPrefix applies the HasPrefix predicate on the "bss_code" field.
func BssCodeHasPrefix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldBssCode), v))
	})
}

// BssCodeHasSuffix applies the HasSuffix predicate on the "bss_code" field.
func BssCodeHasSuffix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldBssCode), v))
	})
}

// BssCodeEqualFold applies the EqualFold predicate on the "bss_code" field.
func BssCodeEqualFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldBssCode), v))
	})
}

// BssCodeContainsFold applies the ContainsFold predicate on the "bss_code" field.
func BssCodeContainsFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldBssCode), v))
	})
}

// ServiceInstanceCodeEQ applies the EQ predicate on the "service_instance_code" field.
func ServiceInstanceCodeEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeNEQ applies the NEQ predicate on the "service_instance_code" field.
func ServiceInstanceCodeNEQ(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeIn applies the In predicate on the "service_instance_code" field.
func ServiceInstanceCodeIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldServiceInstanceCode), v...))
	})
}

// ServiceInstanceCodeNotIn applies the NotIn predicate on the "service_instance_code" field.
func ServiceInstanceCodeNotIn(vs ...string) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldServiceInstanceCode), v...))
	})
}

// ServiceInstanceCodeGT applies the GT predicate on the "service_instance_code" field.
func ServiceInstanceCodeGT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeGTE applies the GTE predicate on the "service_instance_code" field.
func ServiceInstanceCodeGTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeLT applies the LT predicate on the "service_instance_code" field.
func ServiceInstanceCodeLT(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeLTE applies the LTE predicate on the "service_instance_code" field.
func ServiceInstanceCodeLTE(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeContains applies the Contains predicate on the "service_instance_code" field.
func ServiceInstanceCodeContains(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeHasPrefix applies the HasPrefix predicate on the "service_instance_code" field.
func ServiceInstanceCodeHasPrefix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeHasSuffix applies the HasSuffix predicate on the "service_instance_code" field.
func ServiceInstanceCodeHasSuffix(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeIsNil applies the IsNil predicate on the "service_instance_code" field.
func ServiceInstanceCodeIsNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldServiceInstanceCode)))
	})
}

// ServiceInstanceCodeNotNil applies the NotNil predicate on the "service_instance_code" field.
func ServiceInstanceCodeNotNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldServiceInstanceCode)))
	})
}

// ServiceInstanceCodeEqualFold applies the EqualFold predicate on the "service_instance_code" field.
func ServiceInstanceCodeEqualFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldServiceInstanceCode), v))
	})
}

// ServiceInstanceCodeContainsFold applies the ContainsFold predicate on the "service_instance_code" field.
func ServiceInstanceCodeContainsFold(v string) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldServiceInstanceCode), v))
	})
}

// StartDateEQ applies the EQ predicate on the "start_date" field.
func StartDateEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartDate), v))
	})
}

// StartDateNEQ applies the NEQ predicate on the "start_date" field.
func StartDateNEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStartDate), v))
	})
}

// StartDateIn applies the In predicate on the "start_date" field.
func StartDateIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldStartDate), v...))
	})
}

// StartDateNotIn applies the NotIn predicate on the "start_date" field.
func StartDateNotIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldStartDate), v...))
	})
}

// StartDateGT applies the GT predicate on the "start_date" field.
func StartDateGT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldStartDate), v))
	})
}

// StartDateGTE applies the GTE predicate on the "start_date" field.
func StartDateGTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldStartDate), v))
	})
}

// StartDateLT applies the LT predicate on the "start_date" field.
func StartDateLT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldStartDate), v))
	})
}

// StartDateLTE applies the LTE predicate on the "start_date" field.
func StartDateLTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldStartDate), v))
	})
}

// EndDateEQ applies the EQ predicate on the "end_date" field.
func EndDateEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldEndDate), v))
	})
}

// EndDateNEQ applies the NEQ predicate on the "end_date" field.
func EndDateNEQ(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldEndDate), v))
	})
}

// EndDateIn applies the In predicate on the "end_date" field.
func EndDateIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldEndDate), v...))
	})
}

// EndDateNotIn applies the NotIn predicate on the "end_date" field.
func EndDateNotIn(vs ...time.Time) predicate.FlowInstance {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.FlowInstance(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldEndDate), v...))
	})
}

// EndDateGT applies the GT predicate on the "end_date" field.
func EndDateGT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldEndDate), v))
	})
}

// EndDateGTE applies the GTE predicate on the "end_date" field.
func EndDateGTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldEndDate), v))
	})
}

// EndDateLT applies the LT predicate on the "end_date" field.
func EndDateLT(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldEndDate), v))
	})
}

// EndDateLTE applies the LTE predicate on the "end_date" field.
func EndDateLTE(v time.Time) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldEndDate), v))
	})
}

// EndDateIsNil applies the IsNil predicate on the "end_date" field.
func EndDateIsNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldEndDate)))
	})
}

// EndDateNotNil applies the NotNil predicate on the "end_date" field.
func EndDateNotNil() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldEndDate)))
	})
}

// HasFlow applies the HasEdge predicate on the "flow" edge.
func HasFlow() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, FlowTable, FlowColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasFlowWith applies the HasEdge predicate on the "flow" edge with a given conditions (other predicates).
func HasFlowWith(preds ...predicate.Flow) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, FlowTable, FlowColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTemplate applies the HasEdge predicate on the "template" edge.
func HasTemplate() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(TemplateTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, TemplateTable, TemplateColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTemplateWith applies the HasEdge predicate on the "template" edge with a given conditions (other predicates).
func HasTemplateWith(preds ...predicate.FlowExecutionTemplate) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(TemplateInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, false, TemplateTable, TemplateColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasBlocks applies the HasEdge predicate on the "blocks" edge.
func HasBlocks() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BlocksTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, BlocksTable, BlocksColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasBlocksWith applies the HasEdge predicate on the "blocks" edge with a given conditions (other predicates).
func HasBlocksWith(preds ...predicate.BlockInstance) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BlocksInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, BlocksTable, BlocksColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasParentSubflowBlock applies the HasEdge predicate on the "parent_subflow_block" edge.
func HasParentSubflowBlock() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ParentSubflowBlockTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2O, true, ParentSubflowBlockTable, ParentSubflowBlockColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasParentSubflowBlockWith applies the HasEdge predicate on the "parent_subflow_block" edge with a given conditions (other predicates).
func HasParentSubflowBlockWith(preds ...predicate.BlockInstance) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ParentSubflowBlockInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2O, true, ParentSubflowBlockTable, ParentSubflowBlockColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasFlowActivities applies the HasEdge predicate on the "flow_activities" edge.
func HasFlowActivities() predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowActivitiesTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, FlowActivitiesTable, FlowActivitiesColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasFlowActivitiesWith applies the HasEdge predicate on the "flow_activities" edge with a given conditions (other predicates).
func HasFlowActivitiesWith(preds ...predicate.AutomationActivity) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(FlowActivitiesInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, FlowActivitiesTable, FlowActivitiesColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.FlowInstance) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.FlowInstance) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
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
func Not(p predicate.FlowInstance) predicate.FlowInstance {
	return predicate.FlowInstance(func(s *sql.Selector) {
		p(s.Not())
	})
}
