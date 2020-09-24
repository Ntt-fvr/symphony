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
	"github.com/facebookincubator/symphony/pkg/ent"
	"go.uber.org/zap"
)

func (r *queryResolver) Node(ctx context.Context, id model.ID) (model.Node, error) {
	if id.ID == 0 {
		if _, err := r.tenant(ctx, id.Tenant); err != nil {
			return nil, entgql.ErrNodeNotFound(id)
		}
		return model.NewTenant(id.Tenant), nil
	}
	client, err := r.tenancy.ClientFor(ctx, id.Tenant)
	if err != nil {
		return nil, r.err(ctx, err, "cannot get ent client")
	}
	noder, err := client.Noder(ctx, id.ID)
	if err != nil {
		r.log.For(ctx).Error("cannot get node",
			zap.Int("id", id.ID), zap.Error(err),
		)
		return nil, entgql.ErrNodeNotFound(id)
	}
	switch noder := noder.(type) {
	case *ent.User:
		return model.NewUser(id.Tenant, noder), nil
	default:
		return nil, entgql.ErrNodeNotFound(id)
	}
}

// Query returns exec.QueryResolver implementation.
func (r *resolver) Query() exec.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *resolver }
