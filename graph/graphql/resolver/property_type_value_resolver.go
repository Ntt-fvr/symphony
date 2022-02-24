// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type propertyTypeValueResolver struct{}

func (propertyTypeValueResolver) PropertyTypeValue(ctx context.Context, propertyTypeValue *ent.PropertyTypeValue) (*ent.PropertyTypeValue, error) {
	variable, err := propertyTypeValue.PropertyTypeValueDependence(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyTypeValueResolver) PropertyTypeValues(ctx context.Context, propertyTypeValue *ent.PropertyTypeValue) ([]*ent.PropertyTypeValue, error) {
	variable, err := propertyTypeValue.PropertyTypeValue(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyTypeValueResolver) PropertyType(ctx context.Context, propertyTypeValue *ent.PropertyTypeValue) (*ent.PropertyType, error) {
	variable, err := propertyTypeValue.PropertyType(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (r mutationResolver) AddPropertyTypeValue(ctx context.Context, input pkgmodels.AddPropertyTypeValueInput) (*ent.PropertyTypeValue, error) {
	client := r.ClientFrom(ctx)
	if input.PropertyType != 0 {
		typ, err := client.PropertyTypeValue.Create().
			SetName(input.Name).
			SetPropertyTypeID(input.PropertyType).
			Save(ctx)

		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}

		if len(input.PropertyTypeValues) > 0 {
			for _, propertyTypeV := range input.PropertyTypeValues {
				_, err1 := client.PropertyTypeValue.Create().
					SetName(propertyTypeV.Name).
					SetNillablePropertyTypeValueDependenceID(&typ.ID).
					Save(ctx)
				if err1 != nil {
					if ent.IsConstraintError(err) {
						return nil, gqlerror.Errorf("has occurred error on process: %v", err)
					}
					return nil, fmt.Errorf("has occurred error on process: %w", err)
				}
			}
		}
		return typ, nil
	} else {
		typ, err := client.PropertyTypeValue.Create().
			SetName(input.Name).
			SetNillablePropertyTypeValueDependenceID(input.PropertyTypeValue).
			Save(ctx)

		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}
		return typ, nil
	}

}

func (r mutationResolver) AddPropertyTypeValueWithID(ctx context.Context, input pkgmodels.AddPropertyTypeValueInput, propertyType int) (*ent.PropertyTypeValue, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.PropertyTypeValue.Create().
		SetName(input.Name).
		SetPropertyTypeID(propertyType).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}

	if len(input.PropertyTypeValues) > 0 {
		for _, propertyTypeV := range input.PropertyTypeValues {
			_, err1 := client.PropertyTypeValue.Create().
				SetName(propertyTypeV.Name).
				SetNillablePropertyTypeValueDependenceID(&typ.ID).
				Save(ctx)
			if err1 != nil {
				if ent.IsConstraintError(err) {
					return nil, gqlerror.Errorf("has occurred error on process: %v", err)
				}
				return nil, fmt.Errorf("has occurred error on process: %w", err)
			}
		}
	}
	return typ, nil
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
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "updating propertyTypeValue: id=%q", *input.ID)
	}

	if input.Name != et.Name {
		if et, err = client.PropertyTypeValue.UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	if len(input.PropertyTypeValues) > 0 {
		for _, propertyTypeValue := range input.PropertyTypeValues {
			if propertyTypeValue.ID != nil {
				_, err1 := r.EditPropertyTypeValue(ctx, *propertyTypeValue)
				if err1 != nil {
					if ent.IsConstraintError(err1) {
						return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
					}
					return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
				}

			} else {
				ptv := pkgmodels.AddPropertyTypeValueInput{
					Name:              propertyTypeValue.Name,
					PropertyTypeValue: input.ID,
				}
				_, err1 := r.AddPropertyTypeValue(ctx, ptv)
				if err1 != nil {
					if ent.IsConstraintError(err1) {
						return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
					}
					return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
				}

			}
		}
	}

	return et, nil
}
