// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resource"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceResolver struct{}

func (r resourceResolver) ResourceSpecification(ctx context.Context, resource *ent.Resource) (*ent.ResourceSpecification, error) {
	variable, err := resource.Resourcespec(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddResource(ctx context.Context, input models.AddResourceInput) (*ent.Resource, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Resource.Create().
		SetName(input.Name).
		SetResourcespecID(input.ResourceSpecification).
		SetNillableAvailable(input.Available).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResource(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Resource.Query().
		Where(
			resource.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Resource.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResource(ctx context.Context, input models.EditResourceInput) (*ent.Resource, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Resource.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var resourcespe, err1 = et.Resourcespec(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	}

	if input.Name != et.Name || &input.ResourceSpecification != &resourcespe.ID {
		if et, err = client.Resource.
			UpdateOne(et).
			SetName(input.Name).
			SetResourcespecID(input.ResourceSpecification).
			SetNillableAvailable(input.Available).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
