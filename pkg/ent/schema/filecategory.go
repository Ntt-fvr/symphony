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

// File defines the file schema.
type FileCategoryType struct {
	schema
}

// FileCategoryType returns types of file asociate to location type.
func (FileCategoryType) FileCategories() []ent.Field {
	return []ent.Field{
		field.String("description").Optional(),
		field.String("name").NotEmpty().Annotations(entgql.OrderField("NAME"),),
		field.String("extension").Optional(),
	}
}

// Edges of the FileCategoryType
func (FileCategoryType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("files", File.Type),
		edge.From("locationType", LocationType.Type).
			Ref("file_category"),
	}
}