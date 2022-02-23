// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertyvalue"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type propertyValueResolver struct{}

func (propertyValueResolver) PropertyTypeValue(ctx context.Context, propertyValue *ent.PropertyValue) (*ent.PropertyTypeValue, error) {
	variable, err := propertyValue.PropertyTypeValue(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyValueResolver) PropertyValue(ctx context.Context, propertyValue *ent.PropertyValue) (*ent.PropertyValue, error) {
	variable, err := propertyValue.PropertyValueDependence(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyValueResolver) PropertyValues(ctx context.Context, propertyValue *ent.PropertyValue) ([]*ent.PropertyValue, error) {
	variable, err := propertyValue.PropertyValue(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyValueResolver) Property(ctx context.Context, propertyValue *ent.PropertyValue) (*ent.Property, error) {
	variable, err := propertyValue.Property(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (r mutationResolver) AddPropertyValue(ctx context.Context, input models.AddPropertyValueInput) (*ent.PropertyValue, error) {
	client := r.ClientFrom(ctx)
	if *input.PropertyTypeValue != 0 {
		typ, err := client.PropertyValue.Create().
			SetName(input.Name).
			SetNillablePropertyID(input.PropertyTypeValue).
			Save(ctx)

		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %w", err)
		}

		if len(input.PropertyValues) > 0 {
			for _, propertyV := range input.PropertyValues {
				_, err1 := client.PropertyValue.Create().
					SetName(propertyV.Name).
					SetNillablePropertyValueDependenceID(&typ.ID).
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
		typ, err := client.PropertyValue.Create().
			SetName(input.Name).
			SetNillablePropertyValueDependenceID(input.PropertyValue).
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

func (r mutationResolver) AddPropertyValueWithID(ctx context.Context, input models.AddPropertyValueInput, property int) (*ent.PropertyValue, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.PropertyValue.Create().
		SetName(input.Name).
		SetNillablePropertyID(input.PropertyTypeValue).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}

	if len(input.PropertyValues) > 0 {
		for _, propertyV := range input.PropertyValues {
			_, err1 := client.PropertyValue.Create().
				SetName(propertyV.Name).
				SetNillablePropertyValueDependenceID(&typ.ID).
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

func (r mutationResolver) RemovePropertyValue(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.PropertyValue.Query().
		Where(
			propertyvalue.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}

	if err := client.PropertyValue.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditPropertyValue(ctx context.Context, input models.EditPropertyValueInput) (*ent.PropertyValue, error) {
	client := r.ClientFrom(ctx)
	et, err := client.PropertyValue.Get(ctx, *input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "updating propertyValue: id=%q", *input.ID)
	}

	if input.Name != et.Name {
		if et, err = client.PropertyValue.UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	if len(input.PropertyValues) > 0 {
		for _, propertyValue := range input.PropertyValues {
			if propertyValue.ID != nil {
				_, err1 := r.EditPropertyValue(ctx, *propertyValue)
				if err1 != nil {
					if ent.IsConstraintError(err1) {
						return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
					}
					return nil, gqlerror.Errorf("has occurred error on process: %v", err1)
				}

			} else {
				ptv := models.AddPropertyValueInput{
					Name:          propertyValue.Name,
					PropertyValue: input.ID,
				}
				_, err1 := r.AddPropertyValue(ctx, ptv)
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
