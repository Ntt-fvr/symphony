// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type propertyTypeResolver struct{}

func (propertyTypeResolver) RawValue(ctx context.Context, propertyType *ent.PropertyType) (*string, error) {
	raw, err := resolverutil.PropertyValue(ctx, propertyType.Type, propertyType.NodeType, propertyType)
	return &raw, err
}

func (propertyTypeResolver) DependencePropertyTypes(ctx context.Context, propertyType *ent.PropertyType) ([]*ent.PropertyType, error) {
	variable, err := propertyType.PropertyType(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyTypeResolver) PropertyTypeValues(ctx context.Context, propertyType *ent.PropertyType) ([]*ent.PropertyTypeValue, error) {
	variable, err := propertyType.PropertyTypeValues(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyTypeResolver) PropertyType(ctx context.Context, propertyType *ent.PropertyType) (*ent.PropertyType, error) {
	variable, _ := propertyType.QueryParentPropertyType().Only(ctx)
	return variable, nil
}

func (r mutationResolver) EditPropertyType(ctx context.Context, input models.EditPropertyTypeInput) (*ent.PropertyType, error) {
	client := r.ClientFrom(ctx)
	et, err := client.PropertyType.Get(ctx, input.ID)
	if err != nil {
		return nil, errors.Wrapf(err, "not found propertyType: id=%q", input.ID)
	}

	propertyType, err := client.PropertyType.UpdateOne(et).
		SetNillableDeleted(&input.IsDeleted).
		Save(ctx)

	if err != nil {
		return nil, gqlerror.Errorf("has occurred error on process: %v", err)
	}

	return propertyType, nil
}

type propertyResolver struct{}

func (propertyResolver) DependenceProperties(ctx context.Context, property *ent.Property) ([]*ent.Property, error) {
	variable, err := property.Property(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyResolver) PropertyTypeValueID(ctx context.Context, property *ent.Property) (*ent.PropertyTypeValue, error) {
	variable, err := property.PropertyTypeValue(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (propertyResolver) RawValue(ctx context.Context, property *ent.Property) (*string, error) {
	propertyType, err := property.Type(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying property type %w", err)
	}
	raw, err := resolverutil.PropertyValue(ctx, propertyType.Type, propertyType.NodeType, property)
	return &raw, err
}

func (propertyResolver) NodeValue(ctx context.Context, property *ent.Property) (models.NamedNode, error) {
	propertyType, err := property.Type(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying property type %w", err)
	}
	switch propertyType.NodeType {
	case enum.NodeTypeLocation.String():
		l, err := property.QueryLocationValue().Only(ctx)
		return l, ent.MaskNotFound(err)
	case enum.NodeTypeEquipment.String():
		e, err := property.QueryEquipmentValue().Only(ctx)
		return e, ent.MaskNotFound(err)
	case enum.NodeTypeService.String():
		s, err := property.QueryServiceValue().Only(ctx)
		return s, ent.MaskNotFound(err)
	case enum.NodeTypeWorkOrder.String():
		s, err := property.QueryWorkOrderValue().Only(ctx)
		return s, ent.MaskNotFound(err)
	case enum.NodeTypeUser.String():
		s, err := property.QueryUserValue().Only(ctx)
		return s, ent.MaskNotFound(err)
	case enum.NodeTypeProject.String():
		p, err := property.QueryProjectValue().Only(ctx)
		return p, ent.MaskNotFound(err)
	default:
		return nil, nil
	}
}
