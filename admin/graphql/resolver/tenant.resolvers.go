// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
)

func (r *mutationResolver) CreateTenant(ctx context.Context, input model.CreateTenantInput) (*model.CreateTenantPayload, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) TruncateTenant(ctx context.Context, input model.TruncateTenantInput) (*model.TruncateTenantPayload, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteTenant(ctx context.Context, input model.DeleteTenantInput) (*model.DeleteTenantPayload, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Tenant(ctx context.Context, name string) (*model.Tenant, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Tenants(ctx context.Context) ([]*model.Tenant, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns exec.MutationResolver implementation.
func (r *resolver) Mutation() exec.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *resolver }
