// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// ExportTask holds the schema definition for the ExportTask entity.
type ExportTask struct {
	ent.Schema
}

// Fields of the ExportTask.
func (ExportTask) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("type").
			ValueMap(map[string]string{
				"Equipment": "EQUIPMENT",
				"Location":  "LOCATION",
			}),
		field.Enum("status").
			ValueMap(map[string]string{
				"Pending":    "PENDING",
				"InProgress": "IN_PROGRESS",
				"Succeeded":  "SUCCEEDED",
				"Failed":     "FAILED",
			}),
		field.Float("progress").
			Default(0).
			Range(0, 100),
		field.Text("filters").
			Default("[]"),
		field.String("store_key").
			Nillable().
			Optional(),
	}
}

// Policy returns ExportTask policy.
func (ExportTask) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithMutationRules(
			privacy.AlwaysAllowRule(),
		),
	)
}
