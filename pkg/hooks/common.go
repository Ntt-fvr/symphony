// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package hooks

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
)

type PropertyTypeParent string

const (
	PropertyTypeParentWorkOrder PropertyTypeParent = "WORK_ORDER"
	PropertyTypeParentProject   PropertyTypeParent = "PROJECT"
)

func createTemplatePropertyType(
	ctx context.Context,
	client *ent.Client,
	pt []*ent.PropertyType,
	id int,
	entity PropertyTypeParent,
) (*ent.PropertyType, error) {
	var result *ent.PropertyType
	var err error
	for _, propertyType := range pt {
		prop, err1 := propertyType.ParentPropertyType(ctx)
		if err1 != nil {
			return nil, err1
		}
		if prop == nil {
			mutation := client.PropertyType.Create().
				SetName(propertyType.Name).
				SetType(propertyType.Type).
				SetNodeType(propertyType.NodeType).
				SetIndex(propertyType.Index).
				SetCategory(propertyType.Category).
				SetNillableStringVal(propertyType.StringVal).
				SetNillableIntVal(propertyType.IntVal).
				SetNillableBoolVal(propertyType.BoolVal).
				SetNillableFloatVal(propertyType.FloatVal).
				SetNillableLatitudeVal(propertyType.LatitudeVal).
				SetNillableLongitudeVal(propertyType.LongitudeVal).
				SetIsInstanceProperty(propertyType.IsInstanceProperty).
				SetNillableRangeFromVal(propertyType.RangeFromVal).
				SetNillableRangeToVal(propertyType.RangeToVal).
				SetEditable(propertyType.Editable).
				SetMandatory(propertyType.Mandatory).
				SetDeleted(propertyType.Deleted)
			switch entity {
			case PropertyTypeParentWorkOrder:
				mutation = mutation.SetWorkOrderTemplateID(id)
			case PropertyTypeParentProject:
				mutation = mutation.SetProjectTemplateID(id)
			}
			result, err = mutation.Save(ctx)
			if err != nil {
				return nil, fmt.Errorf("creating property type: %w", err)
			}

			propertyTypeValues := client.PropertyTypeValue.Query().Where(
				propertytypevalue.HasPropertyTypeWith(propertytype.ID(propertyType.ID)),
			).AllX(ctx)
			if len(propertyTypeValues) > 0 {
				for _, propValue := range propertyTypeValues {
					p2 := propValue.QueryParentPropertyTypeValue().AllX(ctx)
					var parentDePropertyValueList []int
					for _, propValueTraveled := range p2 {
						parentDePropertyValues, _ := client.PropertyTypeValue.Query().Where(
							propertytypevalue.NameEQ(propValueTraveled.Name),
							propertytypevalue.HasPropertyTypeWith(propertytype.ID(result.ID)),
						).Only(ctx)
						parentDePropertyValueList = append(parentDePropertyValueList, parentDePropertyValues.ID)
					}
					_, err3 := client.PropertyTypeValue.Create().
						SetName(propValue.Name).
						SetPropertyTypeID(result.ID).
						SetNillableDeleted(&propValue.Deleted).
						AddParentPropertyTypeValueIDs(parentDePropertyValueList...).
						Save(ctx)
					if err3 != nil {
						return nil, err
					}
				}
			}
		} else if prop != nil {
			dependenceProperty := client.PropertyType.Create().
				SetName(propertyType.Name).
				SetType(propertyType.Type).
				SetNodeType(propertyType.NodeType).
				SetIndex(propertyType.Index).
				SetCategory(propertyType.Category).
				SetNillableStringVal(propertyType.StringVal).
				SetNillableIntVal(propertyType.IntVal).
				SetNillableBoolVal(propertyType.BoolVal).
				SetNillableFloatVal(propertyType.FloatVal).
				SetNillableLatitudeVal(propertyType.LatitudeVal).
				SetNillableLongitudeVal(propertyType.LongitudeVal).
				SetIsInstanceProperty(propertyType.IsInstanceProperty).
				SetNillableRangeFromVal(propertyType.RangeFromVal).
				SetNillableRangeToVal(propertyType.RangeToVal).
				SetEditable(propertyType.Editable).
				SetMandatory(propertyType.Mandatory).
				SetDeleted(propertyType.Deleted).
				SetParentPropertyTypeID(result.ID)
			switch entity {
			case PropertyTypeParentWorkOrder:
				dependenceProperty = dependenceProperty.SetWorkOrderTemplateID(id)
			case PropertyTypeParentProject:
				dependenceProperty = dependenceProperty.SetProjectTemplateID(id)
			}
			resultDependence, err := dependenceProperty.Save(ctx)
			if err != nil {
				return nil, fmt.Errorf("creating property type: %w", err)
			}

			propertyTypeValues, err2 := propertyType.PropertyTypeValues(ctx)
			if err2 != nil {
				return nil, err2
			}
			if len(propertyTypeValues) > 0 {
				for _, propValue := range propertyTypeValues {
					p2 := propValue.QueryParentPropertyTypeValue().AllX(ctx)
					var parentDePropertyValueList []int
					for _, propValueTraveled := range p2 {
						parentDePropertyValues, _ := client.PropertyTypeValue.Query().Where(
							propertytypevalue.NameEQ(propValueTraveled.Name),
							propertytypevalue.HasPropertyTypeWith(propertytype.ID(result.ID)),
						).Only(ctx)
						parentDePropertyValueList = append(parentDePropertyValueList, parentDePropertyValues.ID)
					}
					_, err3 := client.PropertyTypeValue.Create().
						SetName(propValue.Name).
						SetPropertyTypeID(resultDependence.ID).
						SetNillableDeleted(&propValue.Deleted).
						AddParentPropertyTypeValueIDs(parentDePropertyValueList...).
						Save(ctx)
					if err3 != nil {
						return nil, err
					}
				}
			}
		}

	}

	return result, nil
}
