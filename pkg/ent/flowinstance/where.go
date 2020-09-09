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
