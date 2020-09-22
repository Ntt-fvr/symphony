// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphgrpc

import (
	"context"

	"github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const UserServiceName = "UserService"

// UserService is a user service.
type UserService struct {
	tenancy viewer.Tenancy
}

// NewUserService create a new user service.
func NewUserService(tenancy viewer.Tenancy) UserService {
	return UserService{tenancy}
}

// Create a user by authID, tenantID and required role.
func (s UserService) Create(ctx context.Context, input *schema.AddUserInput) (*schema.User, error) {
	if input.Tenant == "" {
		return nil, status.Error(codes.InvalidArgument, "missing tenant")
	}
	if input.Id == "" {
		return nil, status.Error(codes.InvalidArgument, "missing auth id")
	}

	client, err := s.tenancy.ClientFor(ctx, input.Tenant)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}

	role := user.RoleUser
	if input.IsOwner {
		role = user.RoleOwner
	}
	ctx, err = CreateServiceContext(ctx, input.Tenant, UserServiceName, user.RoleAdmin)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}
	u, err := client.User.Query().Where(user.AuthID(input.Id)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			u, err = client.User.Create().SetAuthID(input.Id).SetRole(role).Save(ctx)
		}
	} else {
		_, err = client.User.UpdateOne(u).SetStatus(user.StatusActive).SetRole(role).Save(ctx)
	}
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}

	return &schema.User{Id: int64(u.ID)}, nil
}

// Delete a user by authID and tenantID.
func (s UserService) Delete(ctx context.Context, input *schema.UserInput) (*empty.Empty, error) {
	if input.Tenant == "" {
		return nil, status.Error(codes.InvalidArgument, "missing tenant")
	}
	if input.Id == "" {
		return nil, status.Error(codes.InvalidArgument, "missing auth id")
	}

	client, err := s.tenancy.ClientFor(ctx, input.Tenant)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}

	ctx, err = CreateServiceContext(ctx, input.Tenant, UserServiceName, user.RoleAdmin)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}
	u, err := client.User.Query().Where(user.AuthID(input.Id)).Only(ctx)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}
	err = client.User.UpdateOne(u).
		SetStatus(user.StatusDeactivated).
		Exec(ctx)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}

	return &empty.Empty{}, nil
}
