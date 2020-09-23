// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
)

func (r *queryResolver) Node(ctx context.Context, id model.ID) (model.Node, error) {
	if _, err := r.Tenant(ctx, id.Tenant); err != nil {
		return nil, entgql.ErrNodeNotFound(id)
	}
	if id.ID == 0 {
		return model.NewTenant(id.Tenant), nil
	}
	return nil, entgql.ErrNodeNotFound(id)
}

// Query returns exec.QueryResolver implementation.
func (r *resolver) Query() exec.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *resolver }
