// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"context"
	"fmt"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/project"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
	"go.uber.org/zap"
)

func createTemplatePropertyType(
	ctx context.Context,
	client *ent.Client,
	pt []*ent.PropertyType,
	id int,
) ([]*ent.PropertyType, error) {
	var results []*ent.PropertyType
	for _, propertyType := range pt {
		prop, err1 := propertyType.ParentPropertyType(ctx)
		if err1 != nil {
			return nil, fmt.Errorf("error querying the ParentPropertyType: %w", err1)
		}
		if prop == nil {
			result, err := client.PropertyType.Create().
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
				SetProjectTemplateID(id).
				Save(ctx)
			if err != nil {
				return nil, fmt.Errorf("error creating property type: %w", err)
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
						if parentDePropertyValues != nil {
							parentDePropertyValueList = append(parentDePropertyValueList, parentDePropertyValues.ID)
						}
					}
					_, err3 := client.PropertyTypeValue.Create().
						SetName(propValue.Name).
						SetPropertyTypeID(result.ID).
						SetNillableDeleted(&propValue.Deleted).
						AddParentPropertyTypeValueIDs(parentDePropertyValueList...).
						Save(ctx)
					if err3 != nil {
						return nil, fmt.Errorf("error creating property type values: %w", err3)
					}
				}
			}
			results = append(results, result)
		} else if prop != nil {
			var propertyOriginal *ent.PropertyType
			for _, dependenceProp := range results {
				propertyOriginal, _ = client.Debug().PropertyType.Query().Where(
					propertytype.NameEQ(prop.Name),
					propertytype.ID(dependenceProp.ID),
				).Only(ctx)
				if propertyOriginal != nil {
					break
				}
			}
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
				SetParentPropertyTypeID(propertyOriginal.ID).
				SetProjectTemplateID(id)
			resultDependence, err := dependenceProperty.Save(ctx)
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
						parentDePropertyValues, _ := client.Debug().PropertyTypeValue.Query().Where(
							propertytypevalue.NameEQ(propValueTraveled.Name),
							propertytypevalue.HasPropertyTypeWith(propertytype.ID(propertyOriginal.ID)),
						).Only(ctx)
						if parentDePropertyValues != nil {
							parentDePropertyValueList = append(parentDePropertyValueList, parentDePropertyValues.ID)
						}
					}
					_, err3 := client.PropertyTypeValue.Create().
						SetName(propValue.Name).
						SetPropertyTypeID(resultDependence.ID).
						SetNillableDeleted(&propValue.Deleted).
						AddParentPropertyTypeValueIDs(parentDePropertyValueList...).
						Save(ctx)
					if err3 != nil {
						return nil, fmt.Errorf("error creating property type values: %w", err3)
					}
				}
			}
		}

	}

	return results, nil
}

// AddProjectTemplate adds project template to existing project
func addProjectTemplate(
	ctx context.Context,
	client *ent.Client,
	projectTypeID int,
) (*ent.ProjectTemplate, map[int]int, error) {
	projectType, err := client.ProjectType.Query().
		Where(projecttype.ID(projectTypeID)).
		WithProperties().
		WithWorkOrders().
		Only(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("querying project type: %w", err)
	}
	typeToType := make(map[int]int, len(projectType.Edges.Properties))
	tem, err := client.ProjectTemplate.
		Create().
		SetName(projectType.Name).
		SetNillableDescription(projectType.Description).
		Save(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("creating project template: %w", err)
	}

	_, err = createTemplatePropertyType(ctx, client, projectType.Edges.Properties, tem.ID)
	if err != nil {
		return nil, nil, fmt.Errorf("creating property type: %w", err)
	}

	for _, wo := range projectType.Edges.WorkOrders {
		wot, err := wo.QueryType().Only(ctx)
		if err != nil {
			return nil, nil, fmt.Errorf("querying work order type: %w", err)
		}
		_, err = client.WorkOrderDefinition.
			Create().
			SetNillableIndex(pointer.ToInt(wo.Index)).
			SetTypeID(wot.ID).
			SetProjectTemplate(tem).
			Save(ctx)
		if err != nil {
			return nil, nil, fmt.Errorf("updating work orders: %w", err)
		}
	}
	return tem, typeToType, nil
}

// Migrate Project Template
func MigrateProjectTemplates(ctx context.Context, logger *zap.Logger) error {
	client := ent.FromContext(ctx)
	projectIds, err := client.Project.Query().
		Where(project.Not(project.HasTemplate())).
		IDs(ctx)
	if err != nil {
		return fmt.Errorf("failed to query project ids: %w", err)
	}
	logger.Info("projects with no templates", zap.Int("count", len(projectIds)))
	for _, projectID := range projectIds {
		projectTypeID, err := client.ProjectType.Query().
			Where(projecttype.HasProjectsWith(project.ID(projectID))).
			OnlyID(ctx)
		if err != nil {
			return fmt.Errorf("failed to query project type: %w", err)
		}
		projectTemplate, typeToType, err := addProjectTemplate(ctx, client, projectTypeID)
		if err != nil {
			return fmt.Errorf("failed to create project template: %w", err)
		}
		err = client.Project.UpdateOneID(projectID).
			SetTemplate(projectTemplate).
			Exec(ctx)
		if err != nil {
			return fmt.Errorf("failed to attach template to project: %w", err)
		}
		properties, err := client.Project.Query().
			Where(project.ID(projectID)).
			QueryProperties().
			WithType().
			All(ctx)
		if err != nil {
			return fmt.Errorf("failed to query properties: %w", err)
		}
		for _, p := range properties {
			pTypeID := p.Edges.Type.ID
			newTypeID, ok := typeToType[pTypeID]
			if !ok {
				return fmt.Errorf("failed to get new property type id")
			}
			err = client.Property.UpdateOne(p).
				SetTypeID(newTypeID).
				Exec(ctx)
			if err != nil {
				return fmt.Errorf("failed to set new type of property: %w", err)
			}
		}
	}
	return nil
}
