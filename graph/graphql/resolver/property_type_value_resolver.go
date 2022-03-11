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
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r mutationResolver) AddPropertyTypeValue(ctx context.Context, input pkgmodels.AddPropertyTypeValueInput) (*ent.PropertyTypeValue, error) {
	client := r.ClientFrom(ctx)
	if len(input.ParentPropertyType) > 0 {
		var parentPropertyValueList []int
		for _, parentPropertyTypeTraveled := range input.ParentPropertyType {
			parentPropertyValue, _ := client.PropertyTypeValue.Query().Where(
				propertytypevalue.NameEQ(parentPropertyTypeTraveled.ParentPropertyTypeValue),
				propertytypevalue.HasPropertyTypeWith(propertytype.ID(parentPropertyTypeTraveled.ParentPropertyType)),
			).Only(ctx)
			parentPropertyValueList = append(parentPropertyValueList, parentPropertyValue.ID)
		}
		typ, err := client.PropertyTypeValue.Create().
			SetName(input.Name).
			SetPropertyTypeID(input.PropertyType).
			SetNillableDeleted(input.IsDeleted).
			AddParentPropertyTypeValueIDs(parentPropertyValueList...).
			Save(ctx)

		if err != nil {
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}
		return typ, nil

	} else {
		typ, err := client.PropertyTypeValue.Create().
			SetName(input.Name).
			SetNillableDeleted(input.IsDeleted).
			SetPropertyTypeID(input.PropertyType).
			Save(ctx)

		if err != nil {
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}
		return typ, nil
	}
}

func (r mutationResolver) RemovePropertyTypeValue(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.PropertyTypeValue.Query().
		Where(
			propertytypevalue.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}

	if err := client.PropertyTypeValue.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditPropertyTypeValue(ctx context.Context, input models.EditPropertyTypeValueInput) (*ent.PropertyTypeValue, error) {
	client := r.ClientFrom(ctx)
	et, err := client.PropertyTypeValue.Get(ctx, *input.ID)
	if err != nil {
		return nil, errors.Wrapf(err, "not found propertyTypeValue: id=%q", *input.ID)
	}

	etupdated, errupdated := client.PropertyTypeValue.UpdateOne(et).
		SetName(input.Name).
		SetDeleted(*input.IsDeleted).
		Save(ctx)

	if errupdated != nil {
		return nil, gqlerror.Errorf("has occurred error on process: %v", errupdated)
	}

	return etupdated, nil
}
