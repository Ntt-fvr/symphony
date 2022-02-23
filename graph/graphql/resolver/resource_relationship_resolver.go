// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceRelationshipResolver struct{}

func (r resourceRelationshipResolver) ResourceA(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.Resource, error) {
	variable, err := resourceRelationship.Resourcea(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r resourceRelationshipResolver) ResourceB(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.Resource, error) {
	variable, err := resourceRelationship.Resourceb(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r resourceRelationshipResolver) Location(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.Location, error) {
	variable, err := resourceRelationship.Resourcelocation(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddResourceRelationship(ctx context.Context, input models.AddResourceRelationshipInput) (*ent.ResourceRelationship, error) {
	client := r.ClientFrom(ctx)
	fmt.Println("Ingreso a valor")
	typ, err := client.
		ResourceRelationship.Create().
		SetNillableResourcelocationID(input.Location).
		SetResourceRelationshipTypes(input.ResourceRelationshipTypes).
		SetResourceaID(input.ResourceA).
		SetNillableResourcebID(input.ResourceB).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceRelationship(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceRelationship.Query().
		Where(
			resourcerelationship.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceRelationship.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceRelationship(ctx context.Context, input models.EditResourceRelationshipInput) (*ent.ResourceRelationship, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceRelationship.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var resourceAid int
	var resourceBid *int
	var locationid *int
	var resourceType = et.ResourceRelationshipTypes

	var change = false
	if input.ResourceRelationshipTypes != et.ResourceRelationshipTypes {
		resourceType = input.ResourceRelationshipTypes
		change = true
	}

	var resourceA, err4 = et.Resourcea(ctx)
	if err4 != nil {
		return nil, errors.Wrap(err4, "has ocurred error on proces: %v")
	} else if resourceA != nil {
		resourceAid = input.ResourceA
		change = true

	}

	var resourceB, err5 = et.Resourceb(ctx)
	if err5 != nil {
		return nil, errors.Wrap(err5, "has ocurred error on proces: %v")
	} else if resourceB != nil {
		resourceBid = input.ResourceB
		change = true

	}

	var location, err3 = et.Resourcelocation(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	} else if location != nil {
		locationid = input.Location
		change = true

	}

	if change {

		if location != nil {
			typ, err := client.
				ResourceRelationship.UpdateOne(et).
				SetNillableResourcelocationID(locationid).
				SetResourceRelationshipTypes(resourceType).
				SetResourceaID(resourceAid).
				ClearResourceb().
				Save(ctx)
			if err != nil {
				if ent.IsConstraintError(err) {
					return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
				}
				return nil, fmt.Errorf("has ocurred error on proces: %v", err)
			}
			return typ, nil
		} else {
			typ, err := client.
				ResourceRelationship.UpdateOne(et).
				SetResourceRelationshipTypes(resourceType).
				SetResourceaID(resourceAid).
				SetNillableResourcebID(resourceBid).
				ClearResourcelocation().
				Save(ctx)
			if err != nil {
				if ent.IsConstraintError(err) {
					return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
				}
				return nil, fmt.Errorf("has ocurred error on proces: %v", err)
			}
			return typ, nil
		}
	}
	return et, nil
}
