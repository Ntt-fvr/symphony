// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceSpecificationItemsResolver struct{}

func (r resourceSpecificationItemsResolver) ResourceSpecificationRelationship(ctx context.Context, resourceSpecificationItems *ent.ResourceSpecificationItems) (*ent.ResourceSpecificationRelationship, error) {
	variable, err := resourceSpecificationItems.Resourcespecificationrelationship(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %v", err)
	}
	return variable, nil
}

func (r resourceSpecificationItemsResolver) ResourceSpecification(ctx context.Context, resourceSpecificationItems *ent.ResourceSpecificationItems) (*ent.ResourceSpecification, error) {
	variable, err := resourceSpecificationItems.Resourcespecificationitems(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddResourceSpecificationItems(ctx context.Context, input models.AddResourceSpecificationItemsInput) (*ent.ResourceSpecificationItems, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceSpecificationItems.Create().
		SetResourcespecificationrelationshipID(input.ResourceSpecificationRelationship).
		SetResourcespecificationitemsID(input.ResourceSpecification).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceSpecificationItems(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceSpecificationItems.Query().
		Where(
			resourcespecificationitems.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	// TODO: borrar o editar los edges relacionados

	if err := client.ResourceSpecificationItems.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceSpecificationItems(ctx context.Context, input models.EditResourceSpecificationItemsInput) (*ent.ResourceSpecificationItems, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceSpecificationItems.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	var resourcespecificationrelationship, err2 = et.Resourcespecificationrelationship(ctx)
	if err2 != nil {
		return nil, errors.Wrap(err2, "has ocurred error on proces: %v")
	}
	var resourcespecification, err3 = et.Resourcespecificationitems(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	}
	if input.ResourceSpecificationRelationship != &resourcespecificationrelationship.ID || input.ResourceSpecification != &resourcespecification.ID {
		if et, err = client.ResourceSpecificationItems.
			UpdateOne(et).
			SetNillableResourcespecificationrelationshipID(input.ResourceSpecificationRelationship).
			SetNillableResourcespecificationitemsID(input.ResourceSpecification).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
