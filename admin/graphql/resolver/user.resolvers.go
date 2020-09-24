// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"go.uber.org/zap"
)

func (r *mutationResolver) UpsertUser(ctx context.Context, input model.UpsertUserInput) (*model.UpsertUserPayload, error) {
	tenant := input.TenantID.Tenant
	client, release, err := r.clientFor(ctx, tenant)
	if err != nil {
		return nil, r.err(ctx, err, "cannot get ent client")
	}
	defer release()
	u, err := client.User.Query().
		Where(user.AuthID(input.AuthID)).
		Only(ctx)
	if err == nil {
		u, err = u.Update().
			SetNillableRole(input.Role).
			SetNillableStatus(input.Status).
			Save(ctx)
	} else if ent.IsNotFound(err) {
		u, err = client.User.Create().
			SetAuthID(input.AuthID).
			SetNillableRole(input.Role).
			SetNillableStatus(input.Status).
			Save(ctx)
	}
	if err != nil {
		r.log.For(ctx).Error("cannot upsert user",
			zap.String("tenant", tenant),
			zap.String("auth_id", input.AuthID),
			zap.Error(err),
		)
		return nil, err
	}
	return &model.UpsertUserPayload{
		ClientMutationID: input.ClientMutationID,
		User:             model.NewUser(tenant, u),
	}, nil
}

func (r *tenantResolver) Users(ctx context.Context, obj *model.Tenant, after *ent.Cursor, before *ent.Cursor, first *int, last *int) (*model.UserConnection, error) {
	client, release, err := r.clientFor(ctx, obj.Name)
	if err != nil {
		return nil, r.err(ctx, err, "cannot get ent client")
	}
	defer release()
	page, err := client.User.Query().Paginate(ctx, after, first, before, last)
	if err != nil {
		return nil, r.err(ctx, err, "cannot paginate users")
	}
	conn := &model.UserConnection{
		Edges:      make([]*model.UserEdge, 0, len(page.Edges)),
		PageInfo:   &page.PageInfo,
		TotalCount: page.TotalCount,
	}
	for _, edge := range page.Edges {
		conn.Edges = append(conn.Edges, &model.UserEdge{
			Cursor: edge.Cursor,
			Node:   model.NewUser(obj.Name, edge.Node),
		})
	}
	return conn, nil
}
