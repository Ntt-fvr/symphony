// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphgrpc_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/enttest"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/testdb"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func newTestClient(t *testing.T) *ent.Client {
	db, name, err := testdb.Open()
	require.NoError(t, err)
	db.SetMaxOpenConns(1)
	drv := sql.OpenDB(name, db)
	return enttest.NewClient(t,
		enttest.WithOptions(ent.Driver(drv)),
		enttest.WithMigrateOptions(migrate.WithGlobalUniqueID(true)),
	)
}

func TestUserService_Create(t *testing.T) {
	client := newTestClient(t)
	us := graphgrpc.NewUserService(viewer.NewFixedTenancy(client))
	ctx, err := graphgrpc.CreateServiceContext(context.Background(), viewertest.DefaultTenant, graphgrpc.UserServiceName, user.RoleAdmin)
	require.NoError(t, err)

	u, err := us.Create(ctx, &schema.AddUserInput{Tenant: "", Id: "XXX", IsOwner: false})
	require.Nil(t, u)
	require.IsType(t, codes.InvalidArgument, status.Code(err))

	u, err = us.Create(ctx, &schema.AddUserInput{Tenant: "XXX", Id: "", IsOwner: false})
	require.Nil(t, u)
	require.IsType(t, codes.InvalidArgument, status.Code(err))

	u, err = us.Create(ctx, &schema.AddUserInput{Tenant: "XXX", Id: "YYY", IsOwner: false})
	require.NoError(t, err)
	userObject, err := client.User.Get(ctx, int(u.Id))
	require.NoError(t, err)
	require.Equal(t, user.StatusActive, userObject.Status)
	require.Equal(t, user.RoleUser, userObject.Role)
}

func TestUserService_Delete(t *testing.T) {
	client := newTestClient(t)
	us := graphgrpc.NewUserService(viewer.NewFixedTenancy(client))
	ctx, err := graphgrpc.CreateServiceContext(context.Background(), viewertest.DefaultTenant, graphgrpc.UserServiceName, user.RoleAdmin)
	require.NoError(t, err)
	u := client.User.Create().SetAuthID("YYY").SaveX(ctx)
	require.Equal(t, user.StatusActive, u.Status)

	_, err = us.Delete(ctx, &schema.UserInput{Tenant: "", Id: "YYY"})
	require.IsType(t, codes.InvalidArgument, status.Code(err))

	_, err = us.Delete(ctx, &schema.UserInput{Tenant: "XXX", Id: ""})
	require.IsType(t, codes.InvalidArgument, status.Code(err))

	_, err = us.Delete(ctx, &schema.UserInput{Tenant: "XXX", Id: "YYY"})
	require.NoError(t, err)
	newU, err := client.User.Get(ctx, u.ID)
	require.NoError(t, err)
	require.Equal(t, user.StatusDeactivated, newU.Status)
}

func TestUserService_CreateAfterDelete(t *testing.T) {
	client := newTestClient(t)
	us := graphgrpc.NewUserService(viewer.NewFixedTenancy(client))
	ctx, err := graphgrpc.CreateServiceContext(context.Background(), viewertest.DefaultTenant, graphgrpc.UserServiceName, user.RoleAdmin)
	require.NoError(t, err)
	u := client.User.Create().SetAuthID("YYY").SaveX(ctx)
	require.Equal(t, user.StatusActive, u.Status)

	_, err = us.Delete(ctx, &schema.UserInput{Tenant: "XXX", Id: "YYY"})
	require.NoError(t, err)

	_, err = us.Create(ctx, &schema.AddUserInput{Tenant: "XXX", Id: "YYY", IsOwner: true})
	require.NoError(t, err)
	userObject, err := client.User.Get(ctx, u.ID)
	require.NoError(t, err)
	require.Equal(t, user.StatusActive, userObject.Status)
	require.Equal(t, user.RoleOwner, userObject.Role)
}
