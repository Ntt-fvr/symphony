// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytypevalue"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func TestAddRemovePropertyTypeValue(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2, projectType, propertyType, locationType := AddPropertyTypeValueTest(ctx, t, mr)
	EditPropertyTypeValueTest(ctx, t, mr, id1, id2, locationType)
	EditProjectTypeTest(ctx, t, mr, projectType, propertyType)
	//EditLocationTypeTest(ctx, t, mr, locationType)
	RemovePropertyTypeValueTest(ctx, t, mr, id1, id2)
}

func AddPropertyTypeValueTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int, int, int) {

	propertyTypeLocation1 := pkgmodels.PropertyTypeInput{
		Name: "location_type_property_father",
		Type: "string",
		DependencePropertyTypes: []*pkgmodels.PropertyTypeInput{
			{
				Name: "location_type_property_son",
				Type: "string",
				PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
					{
						Name: "location_type_property_value_father_1",
						PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
							{
								Name: "location_type_property_value_son",
							},
						},
					},
					{
						Name: "location_type_property_value_father_2",
					},
				},
			},
		},
	}
	propTypeLocationInputs := []*pkgmodels.PropertyTypeInput{&propertyTypeLocation1}

	locationType1, err := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name:       "location_type_test_1",
		Properties: propTypeLocationInputs,
	})
	require.NoError(t, err)

	propertyFather := locationType1.QueryPropertyTypes().Where(propertytype.Name("location_type_property_father")).OnlyX(ctx)
	propertySon := propertyFather.QueryProperType().Where(propertytype.Name("location_type_property_son")).OnlyX(ctx)
	propertyValueFather := propertySon.QueryPropType().Where(propertytypevalue.Name("location_type_property_value_father_1")).OnlyX(ctx)

	propertyLocationEdit1 := pkgmodels.PropertyTypeInput{
		ID:   &propertyFather.ID,
		Name: "Location_Type_Father",
		Type: "string",
		DependencePropertyTypes: []*pkgmodels.PropertyTypeInput{
			{
				ID:   &propertySon.ID,
				Name: "Location_Type_Son",
				Type: "string",
				PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
					{
						ID:   &propertyValueFather.ID,
						Name: "Location_Type_Value_Father",
						PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
							{
								Name: "Location_Type_Value_Son_1",
							},
						},
					},
				},
			},
		},
	}

	propTypeLocationEditInputs := []*pkgmodels.PropertyTypeInput{&propertyLocationEdit1}

	_, err = mr.EditLocationType(ctx, models.EditLocationTypeInput{
		ID:         locationType1.ID,
		Properties: propTypeLocationEditInputs,
	})
	require.NoError(t, err)

	propertyType1 := pkgmodels.PropertyTypeInput{
		Name: "Criticidad",
		Type: "string",
		DependencePropertyTypes: []*pkgmodels.PropertyTypeInput{
			{
				Name: "Nivel_Impacto",
				Type: "string",
				PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
					{
						Name: "Alto",
						PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
							{
								Name: "Masivo",
							},
							{
								Name: "Alto",
							},
						},
					},
					{
						Name: "Medio",
					},
				},
			},
		},
	}
	propTypeInputs := []*pkgmodels.PropertyTypeInput{&propertyType1}

	project1, err := mr.CreateProjectType(ctx, models.AddProjectTypeInput{
		Name:        "Project_test_1",
		Description: new(string),
		Properties:  propTypeInputs,
		WorkOrders:  []*models.WorkOrderDefinitionInput{},
	})
	require.NoError(t, err)

	propertyTypeID := project1.QueryProperties()

	id, err := propertyTypeID.FirstID(ctx)
	require.NoError(t, err)

	propertyTypeValue1, err := mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "Property_Type_Value_Test_1",
		PropertyType: id,
	})
	require.NoError(t, err)

	propertyTypeValue2, err := mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "Property_Type_Value_Test_2",
		PropertyType: id,
		PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
			{
				Name:         "Property_Type_Value_Test_2.2",
				PropertyType: id,
			},
			{
				Name:         "Property_Type_Value_Test_2.3",
				PropertyType: id,
			},
		},
	})
	require.NoError(t, err)

	propertyTypeValue1.QueryPropTypeValue()

	id1, id2 := propertyTypeValue1.ID, propertyTypeValue2.ID
	_, err = mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
			{
				Name: "Property_Type_Value_Test_2.2",
			},
		},
	})
	require.Error(t, err)
	return id1, id2, project1.ID, id, locationType1.ID
}

func EditProjectTypeTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, projectType int, propertyType int) {
	propertyType1 := pkgmodels.PropertyTypeInput{
		ID:   &propertyType,
		Name: "Criticidad",
		Type: "string",
		DependencePropertyTypes: []*pkgmodels.PropertyTypeInput{
			{
				Name: "Posible Responsable",
				Type: "string",
				PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
					{
						Name: "Alto",
						PropertyTypeValues: []*pkgmodels.AddPropertyTypeValueInput{
							{
								Name: "Masivo",
							},
						},
					},
				},
			},
		},
	}
	propTypeInputs := []*pkgmodels.PropertyTypeInput{&propertyType1}

	_, err := mr.EditProjectType(ctx, models.EditProjectTypeInput{
		ID:          projectType,
		Name:        "Project_test_1",
		Description: new(string),
		Properties:  propTypeInputs,
		WorkOrders:  []*models.WorkOrderDefinitionInput{},
	})
	require.NoError(t, err)
}

func EditPropertyTypeValueTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int, location int) {
	_, err := mr.EditPropertyTypeValue(ctx, models.EditPropertyTypeValueInput{
		ID:   &id1,
		Name: "Property_Type_Value_Test_1.1",
	})
	require.NoError(t, err)

	id2 = 123
	_, err = mr.EditPropertyTypeValue(ctx, models.EditPropertyTypeValueInput{
		ID:   &id2,
		Name: "Property_Type_Value_Test_2",
	})
	require.Error(t, err)
}

func RemovePropertyTypeValueTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemovePropertyTypeValue(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemovePropertyTypeValue(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemovePropertyTypeValue(ctx, id1)
	require.Error(t, err)
}
