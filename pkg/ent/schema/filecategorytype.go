// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/index"
)

// FileCategoryType defines the property type schema.
type FileCategoryType struct {
	schema
}

// Fields returns property type fields.
func (FileCategoryType) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
	}
}

// Edges returns property type edges.
func (FileCategoryType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("location_type", LocationType.Type).
			Ref("file_category_type").
			Unique(),
	}
}

// Indexes returns property type indexes.
func (FileCategoryType) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name").
			Edges("location_type").
			Unique(),
	}
}
