// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package resourcetyperelationship

import (
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func IDNotIn(ids ...int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func IDGT(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// CreateTime applies equality check predicate on the "create_time" field. It's identical to CreateTimeEQ.
func CreateTime(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// UpdateTime applies equality check predicate on the "update_time" field. It's identical to UpdateTimeEQ.
func UpdateTime(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// CreateTimeEQ applies the EQ predicate on the "create_time" field.
func CreateTimeEQ(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeNEQ applies the NEQ predicate on the "create_time" field.
func CreateTimeNEQ(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldCreateTime), v))
	})
}

// CreateTimeIn applies the In predicate on the "create_time" field.
func CreateTimeIn(vs ...time.Time) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func CreateTimeNotIn(vs ...time.Time) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func CreateTimeGT(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeGTE applies the GTE predicate on the "create_time" field.
func CreateTimeGTE(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLT applies the LT predicate on the "create_time" field.
func CreateTimeLT(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldCreateTime), v))
	})
}

// CreateTimeLTE applies the LTE predicate on the "create_time" field.
func CreateTimeLTE(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldCreateTime), v))
	})
}

// UpdateTimeEQ applies the EQ predicate on the "update_time" field.
func UpdateTimeEQ(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeNEQ applies the NEQ predicate on the "update_time" field.
func UpdateTimeNEQ(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeIn applies the In predicate on the "update_time" field.
func UpdateTimeIn(vs ...time.Time) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func UpdateTimeNotIn(vs ...time.Time) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func UpdateTimeGT(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeGTE applies the GTE predicate on the "update_time" field.
func UpdateTimeGTE(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLT applies the LT predicate on the "update_time" field.
func UpdateTimeLT(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldUpdateTime), v))
	})
}

// UpdateTimeLTE applies the LTE predicate on the "update_time" field.
func UpdateTimeLTE(v time.Time) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldUpdateTime), v))
	})
}

// ResourceRelationshipTypeEQ applies the EQ predicate on the "ResourceRelationshipType" field.
func ResourceRelationshipTypeEQ(v ResourceRelationshipType) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldResourceRelationshipType), v))
	})
}

// ResourceRelationshipTypeNEQ applies the NEQ predicate on the "ResourceRelationshipType" field.
func ResourceRelationshipTypeNEQ(v ResourceRelationshipType) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldResourceRelationshipType), v))
	})
}

// ResourceRelationshipTypeIn applies the In predicate on the "ResourceRelationshipType" field.
func ResourceRelationshipTypeIn(vs ...ResourceRelationshipType) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldResourceRelationshipType), v...))
	})
}

// ResourceRelationshipTypeNotIn applies the NotIn predicate on the "ResourceRelationshipType" field.
func ResourceRelationshipTypeNotIn(vs ...ResourceRelationshipType) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldResourceRelationshipType), v...))
	})
}

// ResourceRelationshipMultiplicityEQ applies the EQ predicate on the "ResourceRelationshipMultiplicity" field.
func ResourceRelationshipMultiplicityEQ(v ResourceRelationshipMultiplicity) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldResourceRelationshipMultiplicity), v))
	})
}

// ResourceRelationshipMultiplicityNEQ applies the NEQ predicate on the "ResourceRelationshipMultiplicity" field.
func ResourceRelationshipMultiplicityNEQ(v ResourceRelationshipMultiplicity) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldResourceRelationshipMultiplicity), v))
	})
}

// ResourceRelationshipMultiplicityIn applies the In predicate on the "ResourceRelationshipMultiplicity" field.
func ResourceRelationshipMultiplicityIn(vs ...ResourceRelationshipMultiplicity) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldResourceRelationshipMultiplicity), v...))
	})
}

// ResourceRelationshipMultiplicityNotIn applies the NotIn predicate on the "ResourceRelationshipMultiplicity" field.
func ResourceRelationshipMultiplicityNotIn(vs ...ResourceRelationshipMultiplicity) predicate.ResourceTypeRelationship {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldResourceRelationshipMultiplicity), v...))
	})
}

// HasResourcetypea applies the HasEdge predicate on the "resourcetypea" edge.
func HasResourcetypea() predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ResourcetypeaTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ResourcetypeaTable, ResourcetypeaColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasResourcetypeaWith applies the HasEdge predicate on the "resourcetypea" edge with a given conditions (other predicates).
func HasResourcetypeaWith(preds ...predicate.ResourceType) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ResourcetypeaInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ResourcetypeaTable, ResourcetypeaColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasResourcetypeb applies the HasEdge predicate on the "resourcetypeb" edge.
func HasResourcetypeb() predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ResourcetypebTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ResourcetypebTable, ResourcetypebColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasResourcetypebWith applies the HasEdge predicate on the "resourcetypeb" edge with a given conditions (other predicates).
func HasResourcetypebWith(preds ...predicate.ResourceType) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ResourcetypebInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ResourcetypebTable, ResourcetypebColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasLocationType applies the HasEdge predicate on the "locationType" edge.
func HasLocationType() predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(LocationTypeTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, LocationTypeTable, LocationTypeColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasLocationTypeWith applies the HasEdge predicate on the "locationType" edge with a given conditions (other predicates).
func HasLocationTypeWith(preds ...predicate.LocationType) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(LocationTypeInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, LocationTypeTable, LocationTypeColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.ResourceTypeRelationship) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.ResourceTypeRelationship) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
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
func Not(p predicate.ResourceTypeRelationship) predicate.ResourceTypeRelationship {
	return predicate.ResourceTypeRelationship(func(s *sql.Selector) {
		p(s.Not())
	})
}
