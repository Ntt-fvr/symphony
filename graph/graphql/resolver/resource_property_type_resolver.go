// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcepropertytype"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/resolverutil"
)

type resourcePropertyTypeResolver struct{}

func (resourcePropertyTypeResolver) RawValue(ctx context.Context, resourcepropertyType *ent.ResourcePropertyType) (*string, error) {
	raw, err := resolverutil.ResourcePropertyValue(ctx, resourcepropertyType.Type, resourcepropertyType.NodeType, resourcepropertyType)
	return &raw, err
}

func (resourcePropertyTypeResolver) ResourceSpecification(ctx context.Context, resourcepropertytype *ent.ResourcePropertyType) (*ent.ResourceSpecification, error) {
	variable, err := resourcepropertytype.ResourceSpecification(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddResourcePropertyType(
	ctx context.Context, parentSetter func(ptc *ent.ResourcePropertyTypeCreate), inputs ...*models.AddResourcePropertyTypeInput,
) error {

	var (
		client   = r.ClientFrom(ctx).ResourcePropertyType
		builders = make([]*ent.ResourcePropertyTypeCreate, len(inputs))
	)

	for i, input := range inputs {
		builders[i] = client.Create().
			SetName(input.Name).
			SetType(input.Type).
			SetNillableNodeType(input.NodeType).
			SetNillableExternalID(input.ExternalID).
			SetNillableIndex(input.Index).
			SetNillableCategory(input.Category).
			SetNillableStringVal(input.StringValue).
			SetNillableIntVal(input.IntValue).
			SetNillableBoolVal(input.BooleanValue).
			SetNillableFloatVal(input.FloatValue).
			SetNillableLatitudeVal(input.LatitudeValue).
			SetNillableLongitudeVal(input.LongitudeValue).
			SetNillableIsInstanceProperty(input.IsInstanceProperty).
			SetNillableRangeFromVal(input.RangeFromValue).
			SetNillableRangeToVal(input.RangeToValue).
			SetNillableEditable(input.IsEditable).
			SetNillableMandatory(input.IsMandatory).
			SetNillableDeleted(input.IsDeleted).
			SetNillablePropertyCategoryID(input.PropertyCategory).
			SetNillableListable(input.IsListable)
		parentSetter(builders[i])
	}
	if _, err := client.CreateBulk(builders...).Save(ctx); err != nil {
		r.logger.For(ctx).
			Error("cannot create resource property types",
				zap.Error(err),
			)
		return err
	}
	return nil
}

func (r mutationResolver) UpdateResourcePropertyType(ctx context.Context, input *models.AddResourcePropertyTypeInput) error {
	query := r.ClientFrom(ctx).ResourcePropertyType.
		UpdateOneID(*input.ID).
		SetName(input.Name).
		SetType(input.Type).
		SetNillableNodeType(input.NodeType).
		SetNillableIndex(input.Index).
		SetNillableExternalID(input.ExternalID).
		SetNillableIsInstanceProperty(input.IsInstanceProperty).
		SetNillableEditable(input.IsEditable).
		SetNillableMandatory(input.IsMandatory).
		SetNillableDeleted(input.IsDeleted).
		SetNillableListable(input.IsListable)

	if input.PropertyCategory != nil {
		query.SetPropertyCategoryID(*input.PropertyCategory)
	} else {
		query.ClearPropertyCategory()
	}
	switch input.Type {
	case resourcepropertytype.TypeDate,
		resourcepropertytype.TypeEmail,
		resourcepropertytype.TypeString,
		resourcepropertytype.TypeEnum,
		resourcepropertytype.TypeDatetimeLocal:
		if input.StringValue != nil {
			query.SetStringVal(*input.StringValue)
		} else {
			query.ClearStringVal()
		}
	case resourcepropertytype.TypeInt:
		if input.IntValue != nil {
			query.SetIntVal(*input.IntValue)
		} else {
			query.ClearIntVal()
		}
	case resourcepropertytype.TypeBool:
		if input.BooleanValue != nil {
			query.SetBoolVal(*input.BooleanValue)
		} else {
			query.ClearBoolVal()
		}
	case resourcepropertytype.TypeFloat:
		if input.FloatValue != nil {
			query.SetFloatVal(*input.FloatValue)
		} else {
			query.ClearFloatVal()
		}
	case resourcepropertytype.TypeGpsLocation:
		if input.LatitudeValue != nil {
			query.SetLatitudeVal(*input.LatitudeValue)
		} else {
			query.ClearLatitudeVal()
		}
		if input.LongitudeValue != nil {
			query.SetLongitudeVal(*input.LongitudeValue)
		} else {
			query.ClearLongitudeVal()
		}
	case resourcepropertytype.TypeRange:
		if input.RangeFromValue != nil {
			query.SetRangeFromVal(*input.RangeFromValue)
		} else {
			query.ClearRangeFromVal()
		}
		if input.RangeToValue != nil {
			query.SetRangeToVal(*input.RangeToValue)
		} else {
			query.ClearRangeToVal()
		}
	}
	if err := query.Exec(ctx); err != nil {
		return errors.Wrap(err, "updating property type")
	}
	return nil
}

func (r mutationResolver) RemoveResourcePropertyType(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourcePropertyType.Query().
		Where(
			resourcepropertytype.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on process: %v", err)
	}

	et, err := client.ResourcePropertyType.Get(ctx, t.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return id, gqlerror.Errorf("has ocurred error on process: %v", err)
		}
		return id, errors.Wrapf(err, "has ocurred error on process: %v", err)
	}
	var delete = true
	if et, err = client.ResourcePropertyType.
		UpdateOne(et).
		SetDeleted(delete).
		Save(ctx); err != nil {
		if ent.IsConstraintError(err) {
			return id, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}
