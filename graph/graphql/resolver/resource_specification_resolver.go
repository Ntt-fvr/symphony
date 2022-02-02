// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceSpecificationResolver struct{}

func (resourceSpecificationResolver) ResourceType(ctx context.Context, resourceSpecification *ent.ResourceSpecification) (*ent.ResourceType, error) {
	variable, err := resourceSpecification.Resourcetype(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil

}
func (resourceSpecificationResolver) PropertyTypes(ctx context.Context, resourceSpecification *ent.ResourceSpecification) ([]*ent.PropertyType, error) {
	variable, err := resourceSpecification.PropertyType(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}

	return variable, nil

}
func (r resourceSpecificationResolver) ResourceSpecificationRelationship(ctx context.Context, resourceSpecification *ent.ResourceSpecification) ([]*ent.ResourceSpecificationRelationship, error) {
	variable, err := resourceSpecification.ResourceSpecification(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}

	return variable, nil
}

func (r mutationResolver) AddResourceSpecification(ctx context.Context, input models.AddResourceSpecificationInput) (*ent.ResourceSpecification, error) {

	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceSpecification.Create().
		SetName(input.Name).
		SetResourcetypeID(input.ResourceType).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	if err := r.AddPropertyTypes(ctx, func(ptc *ent.PropertyTypeCreate) {
		ptc.SetResourcespecificationID(typ.ID)
	}, input.PropertyTypes...); err != nil {
		return nil, err
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceSpecification(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceSpecification.Query().
		Where(
			resourcespecification.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados
	pTypes, err := client.PropertyType.Query().
		Where(propertytype.HasResourcespecificationWith(resourcespecification.ID(id))).
		All(ctx)
	if err != nil {
		return id, errors.Wrap(err, "querying property types")
	}
	for _, pType := range pTypes {
		if err := client.PropertyType.DeleteOne(pType).
			Exec(ctx); err != nil {
			return id, errors.Wrapf(err, "deleting property type id=%q", pType.ID)
		}
	}

	if err := client.ResourceSpecification.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceSpecification(ctx context.Context, input models.EditResourceSpecificationInput) (*ent.ResourceSpecification, error) {

	client := r.ClientFrom(ctx)
	et, err := client.ResourceSpecification.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var resourcetype, err3 = et.Resourcetype(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
	}

	for _, input := range input.PropertyTypes {
		if input.ID == nil {
			if err := r.validateAddedNewPropertyType(input); err != nil {
				return nil, err
			}
			if err := r.AddPropertyTypes(ctx,
				func(b *ent.PropertyTypeCreate) {
					b.SetResourcespecificationID(et.ID)
				}, input); err != nil {
				return nil, err
			}
		} else if err := r.updatePropType(ctx, input); err != nil {
			return nil, err
		}
	}

	if input.Name != et.Name || input.ResourceType != &resourcetype.ID {
		if et, err = client.ResourceSpecification.
			UpdateOne(et).
			SetName(input.Name).
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
