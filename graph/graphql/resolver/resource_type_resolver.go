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

func (resourceTypeResolver) ResourceTypeBaseType(ctx context.Context, resourceType *ent.ResourceType) (*ent.ResourceTypeBaseType, error) {
	variable, err := resourceType.Resourcetypebasetype(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	} else {
		return variable, nil
	}
}

func (resourceTypeResolver) ResourceTypeClass(ctx context.Context, resourceType *ent.ResourceType) (*ent.ResourceTypeClass, error) {
	variable, err := resourceType.Resourcetypeclass(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	} else {
		return variable, nil
	}
}

func (r resourceTypeResolver) ResourceSpecificationRelationshipItems(ctx context.Context, resourceType *ent.ResourceType) ([]*ent.ResourceSRItems, error) {
	variable, err := resourceType.ResourcetypeItems(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddResourceType(ctx context.Context, input models.AddResourceTypeInput) (*ent.ResourceType, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceType.Create().
		SetName(input.Name).
		SetResourcetypebasetypeID(input.ResourceTypeBaseType).
		SetResourcetypeclassID(input.ResourceTypeClass).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
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
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceType.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceType(ctx context.Context, input models.EditResourceTypeInput) (*ent.ResourceType, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceType.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var typebasetype, err3 = et.Resourcetypebasetype(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	}
	var typeclass, err4 = et.Resourcetypeclass(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err4, "has ocurred error on proces: %v")
	}
	if input.Name != et.Name || input.ResourceTypeBaseType != &typebasetype.ID || input.ResourceTypeClass != &typeclass.ID {
		if et, err = client.ResourceType.
			UpdateOne(et).
			SetName(input.Name).
			SetNillableResourcetypebasetypeID(input.ResourceTypeBaseType).
			SetNillableResourcetypeclassID(input.ResourceTypeClass).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
