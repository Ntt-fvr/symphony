// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
)

// Counter defines the property type schema.
type CounterVendorFormula struct {
	schema
}

// Counter returns property type counter.
func (CounterVendorFormula) Fields() []ent.Field {
	return []ent.Field{
		field.Bool("mandatory"),
	}
}

// Edges returns expression type edges.
func (CounterVendorFormula) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("formula", Formula.Type).
			Ref("countervendorformula").
			Unique(),
		edge.From("vendor", Vendor.Type).
			Ref("vendor_fk").
			Unique(),
		edge.From("counter", Counter.Type).
			Ref("counter_fk").
			Unique(),
	}
}
