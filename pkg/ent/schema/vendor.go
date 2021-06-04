// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/ent-contrib/entgql"
)

// Counter defines the property type schema.
type Vendor struct {
	schema
}

// Counter returns property type counter.
func (Vendor) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Unique(),
	}
}

func (Vendor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("vendor_fk", CounterVendorFormula.Type).
			Annotations(entgql.MapsTo("vendor")),
	}
}
