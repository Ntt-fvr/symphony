// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceSpecificationRelationshipResolver struct{}

func (r resourceSpecificationRelationshipResolver) ResourceSpecification(ctx context.Context, resourceSpecificationRelationship *ent.ResourceSpecificationRelationship) (*ent.ResourceSpecification, error) {
	variable, err := resourceSpecificationRelationship.Resourcespecification(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r resourceSpecificationRelationshipResolver) ResourceSpecificationItems(ctx context.Context, resourceSpecificationRelationship *ent.ResourceSpecificationRelationship) ([]*ent.ResourceSpecificationItems, error) {
	variable, err := resourceSpecificationRelationship.ResourceSr(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddResourceSpecificationRelationShipList(ctx context.Context, input models.AddResourceSpecificationRelationShipListInput) ([]*ent.ResourceSpecificationRelationship, error) {
	var resourceSpecification []*ent.ResourceSpecificationRelationship
	for _, resource_specification := range input.NameList {
		client := r.ClientFrom(ctx)
		typ, err := client.ResourceSpecificationRelationship.Create().
			SetName(resource_specification.Name).
			SetResourcespecificationID(input.ResourceSpecification).
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}
		resourceSpecification = append(resourceSpecification, typ)
	}

	return resourceSpecification, nil
}

func (r mutationResolver) AddResourceSpecificationRelationshipItemsList(ctx context.Context, input models.AddResourceSpecificationRelationshipList) (*ent.ResourceSpecificationRelationship, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.ResourceSpecificationRelationship.
		Create().
		SetName(input.Name).
		SetNillableResourcespecificationID(&input.ResourceSpecification).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	if len(input.ResourceSpecificationRelationshipItems) > 0 {
		for _, item := range input.ResourceSpecificationRelationshipItems {
			inputItem := models.AddResourceSpecificationItemsInput{
				ResourceSpecificationRelationship: typ.ID,
				ResourceSpecification:             item.IDDestino,
			}
			_, err := r.AddResourceSpecificationItems(ctx, inputItem)
			if err != nil {
				return nil, fmt.Errorf("has ocurred error on proces: %v", err)
			}
		}
	}
	return typ, nil
}

func (r mutationResolver) AddResourceSpecificationRelationship(ctx context.Context, input models.AddResourceSpecificationRelationshipInput) (*ent.ResourceSpecificationRelationship, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceSpecificationRelationship.Create().
		SetName(input.Name).
		SetNillableResourcespecificationID(&input.ResourceSpecification).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceSpecificationRelationship(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceSpecificationRelationship.Query().
		Where(
			resourcespecificationrelationship.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceSpecificationRelationship.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceSpecificationRelationship(ctx context.Context, input models.EditResourceSpecificationRelationshipInput) (*ent.ResourceSpecificationRelationship, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceSpecificationRelationship.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var resourcespecification, err3 = et.Resourcespecification(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	}

	if input.Name != et.Name || input.ResourceSpecification != &resourcespecification.ID {
		if et, err = client.ResourceSpecificationRelationship.
			UpdateOne(et).
			SetName(input.Name).
			SetNillableResourcespecificationID(input.ResourceSpecification).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
