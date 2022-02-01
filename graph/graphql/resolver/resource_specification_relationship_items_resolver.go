// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcesritems"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceSpecificationRelationshipItemsResolver struct{}

func (r resourceSpecificationRelationshipItemsResolver) ResourceSpecificationRelationship(ctx context.Context, resourceSpecificationRelationshipItems *ent.ResourceSRItems) (*ent.ResourceSpecificationRelationship, error) {
	variable, err := resourceSpecificationRelationshipItems.Resourcesr(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r resourceSpecificationRelationshipItemsResolver) ResourceType(ctx context.Context, resourceSpecificationRelationshipItems *ent.ResourceSRItems) (*ent.ResourceType, error) {
	variable, err := resourceSpecificationRelationshipItems.Resourcetype(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil

}

func (r mutationResolver) AddResourceSRItems(ctx context.Context, input models.AddResourceSRItemsInput) (*ent.ResourceSRItems, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceSRItems.Create().
		SetName(input.Name).
		SetResourcesrID(input.ResourceSpecificationRelationship).
		SetResourcetypeID(input.ResourceType).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceSRItems(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceSRItems.Query().
		Where(
			resourcesritems.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceSRItems.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceSRItems(ctx context.Context, input models.EditResourceSRItemsInput) (*ent.ResourceSRItems, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceSRItems.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var resourcespecificationrelationship, err3 = et.Resourcesr(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	}
	var resourcetype, err4 = et.Resourcetype(ctx)
	if err4 != nil {
		return nil, errors.Wrap(err4, "has ocurred error on proces: %v")
	}

	if input.Name != et.Name || input.ResourceSpecificationRelationship != &resourcespecificationrelationship.ID || input.ResourceType != &resourcetype.ID {
		if et, err = client.ResourceSRItems.
			UpdateOne(et).
			SetName(input.Name).
			SetNillableResourcesrID(input.ResourceSpecificationRelationship).
			SetNillableResourcetypeID(input.ResourceType).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
