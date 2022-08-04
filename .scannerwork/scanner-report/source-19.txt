// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceTypeResolver struct{}

func (r mutationResolver) AddResourceType(ctx context.Context, input models.AddResourceTypeInput) (*ent.ResourceType, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceType.Create().
		SetName(input.Name).
		SetResourceTypeBaseType(input.ResourceTypeBaseType).
		SetResourceTypeClass(input.ResourceTypeClass).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceType(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceType.Query().
		Where(
			resourcetype.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceType.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceType(ctx context.Context, input models.EditResourceTypeInput) (*ent.ResourceType, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceType.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	var resourceClass, resourceBaseType = et.ResourceTypeClass, et.ResourceTypeBaseType
	var change = false
	if input.ResourceTypeClass != et.ResourceTypeClass {
		resourceClass = input.ResourceTypeClass
		change = true
	}
	if input.ResourceTypeBaseType != et.ResourceTypeBaseType {
		resourceBaseType = input.ResourceTypeBaseType
		change = true
	}
	if change {
		if et, err = client.ResourceType.
			UpdateOne(et).
			SetName(input.Name).
			SetResourceTypeBaseType(resourceBaseType).
			SetResourceTypeClass(resourceClass).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
