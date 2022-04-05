// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcepropertytype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
)

type resourceSpecificationResolver struct{}

func (resourceSpecificationResolver) ResourceType(ctx context.Context, resourceSpecification *ent.ResourceSpecification) (*ent.ResourceType, error) {
	variable, err := resourceSpecification.Resourcetype(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil

}

func (resourceSpecificationResolver) ResourcePropertyTypes(ctx context.Context, resourceSpecification *ent.ResourceSpecification) ([]*ent.ResourcePropertyType, error) {
	variable, err := resourceSpecification.ResourcePropertyType(ctx)
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

func (r resourceSpecificationResolver) ResourceSpecificationItems(ctx context.Context, resourceSpecification *ent.ResourceSpecification) ([]*ent.ResourceSpecificationItems, error) {
	variable, err := resourceSpecification.ResourceSpecificationItems(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r resourceSpecificationResolver) Resource(ctx context.Context, resourceSpecification *ent.ResourceSpecification) ([]*ent.Resource, error) {
	variable, err := resourceSpecification.ResourceSpecificationR(ctx)
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
		SetNillableQuantity(input.Quantity).
		SetResourcetypeID(input.ResourceType).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	if err := r.AddResourcePropertyType(ctx, func(ptc *ent.ResourcePropertyTypeCreate) {
		ptc.SetResourceSpecificationID(typ.ID)
	}, input.ResourcePropertyTypes...); err != nil {
		return nil, err
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceSpecification(ctx context.Context, id int) (int, error) {
	client, logger := r.ClientFrom(ctx), r.logger.For(ctx).With(zap.Int("id", id))
	resourcePropertyTypes, err := client.ResourcePropertyType.Query().
		Where(resourcepropertytype.HasResourceSpecificationWith(resourcespecification.ID(id))).
		All(ctx)
	if err != nil {
		logger.Error("cannot query properties of work order type", zap.Error(err))
		return id, fmt.Errorf("querying work order property types: %w", err)
	}
	for _, resourcePropertyType := range resourcePropertyTypes {
		if _, err := r.RemoveResourcePropertyType(ctx, resourcePropertyType.ID); err != nil {
			logger.Error("cannot delete resouce property type of resouce specification", zap.Error(err))
			return id, fmt.Errorf("deleting resource property type: %w", err)
		}
	}
	switch err := client.ResourceSpecification.DeleteOneID(id).Exec(ctx); err.(type) {
	case nil:
		logger.Info("deleted resource specification")
		return id, nil
	case *ent.NotFoundError:
		err := gqlerror.Errorf("resource specification not found")
		logger.Error(err.Message)
		return id, err
	default:
		logger.Error("cannot delete resource specification", zap.Error(err))
		return id, fmt.Errorf("deleting resource specification: %w", err)
	}
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

	if input.Name != et.Name || input.ResourceType != &resourcetype.ID {
		if et, err = client.ResourceSpecification.
			UpdateOne(et).
			SetName(input.Name).
			SetNillableQuantity(input.Quantity).
			SetNillableResourcetypeID(input.ResourceType).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	for _, resourceProperty := range input.ResourcePropertyTypes {
		if resourceProperty.ID == nil {
			if err := r.validateAddedNewResourcePropertyType(resourceProperty); err != nil {
				return nil, err
			}
			if err := r.AddResourcePropertyType(ctx, func(b *ent.ResourcePropertyTypeCreate) {
				b.SetResourceSpecificationID(et.ID)
			}, resourceProperty); err != nil {
				return nil, err
			}
		} else if err := r.UpdateResourcePropertyType(ctx, resourceProperty); err != nil {
			return nil, err
		}
	}
	return et, nil
}

func (r mutationResolver) validateAddedNewResourcePropertyType(input *models.AddResourcePropertyTypeInput) error {
	isEmpty, err := r.isEmptyResourceProp(nil, input)
	if err != nil {
		return err
	}
	if isEmpty && pointer.GetBool(input.IsMandatory) {
		return gqlerror.Errorf("The new resource property type %v must have a default value", input.Name)
	}
	return nil
}

func (mutationResolver) isEmptyResourceProp(ptype *ent.ResourcePropertyType, input interface{}) (bool, error) {
	var (
		typ                           resourcepropertytype.Type
		strVal                        *string
		intVal                        *int
		boolVal                       *bool
		floatVal                      *float64
		lat, long, rangeTo, rangeFrom *float64
	)
	switch v := input.(type) {
	case *models.AddResourcePropertyTypeInput:
		typ = v.Type
		strVal = v.StringValue
		boolVal = v.BooleanValue
		intVal = v.IntValue
		floatVal = v.FloatValue
		lat, long = v.LatitudeValue, v.LongitudeValue
		rangeTo, rangeFrom = v.RangeToValue, v.RangeFromValue
	default:
		return false, errors.New("input not of type resource property or resource property type")
	}
	switch typ {
	case resourcepropertytype.TypeDate,
		resourcepropertytype.TypeEmail,
		resourcepropertytype.TypeString,
		resourcepropertytype.TypeEnum,
		resourcepropertytype.TypeDatetimeLocal:
		return strVal == nil || *strVal == "", nil
	case resourcepropertytype.TypeInt:
		return intVal == nil, nil
	case resourcepropertytype.TypeGpsLocation:
		if lat == nil || long == nil {
			return false, errors.New("gps_location type, with no lat/long provided")
		}
		return *lat == 0 && *long == 0, nil
	case resourcepropertytype.TypeRange:
		if rangeTo == nil || rangeFrom == nil {
			return false, gqlerror.Errorf("range type, with no to/from provided")
		}
		return *rangeTo == 0 && *rangeFrom == 0, nil
	case resourcepropertytype.TypeBool:
		return boolVal == nil, nil
	case resourcepropertytype.TypeFloat:
		return floatVal == nil, nil
	default:
		return false, nil
	}
}
