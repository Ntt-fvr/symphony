// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/feature"
)

func (r *featureResolver) Tenant(ctx context.Context, obj *model.Feature) (*model.Tenant, error) {
	return model.NewTenant(obj.ID.Tenant), nil
}

func (r *mutationResolver) CreateFeature(ctx context.Context, input model.CreateFeatureInput) (*model.CreateFeaturePayload, error) {
	if input.Tenants == nil {
		ids, err := r.tenantIDs(ctx)
		if err != nil {
			return nil, r.err(ctx, err, "cannot get tenant ids")
		}
		input.Tenants = ids
	}
	payload := &model.CreateFeaturePayload{
		ClientMutationID: input.ClientMutationID,
		Features:         make([]*model.Feature, len(input.Tenants)),
	}
	for i := range input.Tenants {
		tenant := input.Tenants[i].Tenant
		if err := r.withClient(ctx, tenant, func(client *ent.Client) error {
			feat, err := client.Feature.Create().
				SetName(input.Name).
				Save(ctx)
			if err != nil {
				return r.errf(
					ctx, err,
					"cannot create feature %s for tenant %s",
					input.Name, tenant,
				)
			}
			payload.Features[i] = model.NewFeature(tenant, feat)
			return nil
		}); err != nil {
			return nil, err
		}
	}
	return payload, nil
}

func (r *mutationResolver) DeleteFeature(ctx context.Context, input model.DeleteFeatureInput) (*model.DeleteFeaturePayload, error) {
	if input.Tenants == nil {
		ids, err := r.tenantIDs(ctx)
		if err != nil {
			return nil, r.err(ctx, err, "cannot get tenant ids")
		}
		input.Tenants = ids
	}
	for i := range input.Tenants {
		tenant := input.Tenants[i].Tenant
		if err := r.withClient(ctx, tenant, func(client *ent.Client) error {
			if _, err := client.Feature.Delete().
				Where(feature.And(
					feature.Name(input.Name),
					feature.Global(true),
				)).
				Exec(ctx); err != nil {
				return r.errf(
					ctx, err,
					"cannot delete feature %s for tenant %s",
					input.Name, tenant,
				)
			}
			return nil
		}); err != nil {
			return nil, err
		}
	}
	return &model.DeleteFeaturePayload{
		ClientMutationID: input.ClientMutationID,
	}, nil
}

func (r *tenantResolver) Features(ctx context.Context, obj *model.Tenant, filterBy *model.FeatureFilters) ([]*model.Feature, error) {
	var features []*ent.Feature
	if err := r.withClient(ctx, obj.Name, func(client *ent.Client) error {
		var err error
		query := client.Feature.Query().Where(feature.Global(true))
		if filterBy != nil && len(filterBy.Names) > 0 {
			query = query.Where(feature.NameIn(filterBy.Names...))
		}
		if features, err = query.Order(ent.Asc(feature.FieldName)).All(ctx); err != nil {
			return r.err(ctx, err, "cannot query features")
		}
		return nil
	}); err != nil {
		return nil, err
	}
	objs := make([]*model.Feature, len(features))
	for i := range features {
		objs[i] = model.NewFeature(obj.Name, features[i])
	}
	return objs, nil
}

// Feature returns exec.FeatureResolver implementation.
func (r *resolver) Feature() exec.FeatureResolver { return &featureResolver{r} }

type featureResolver struct{ *resolver }
