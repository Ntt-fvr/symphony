// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func prepareBasicPropertyType(ctx context.Context, t *testing.T, mr generated.MutationResolver) *ent.PropertyType {
	propertyType1 := pkgmodels.PropertyTypeInput{
		Name: "Criticidad_test_1",
		Type: "string",
	}
	propTypeInputs := []*pkgmodels.PropertyTypeInput{&propertyType1}

	project1, err := mr.CreateProjectType(ctx, models.AddProjectTypeInput{
		Name:        "Project_test_1",
		Description: new(string),
		Properties:  propTypeInputs,
		WorkOrders:  []*models.WorkOrderDefinitionInput{},
	})
	require.NoError(t, err)

	propertyTypeID, err := project1.QueryProperties().Only(ctx)
	require.NoError(t, err)

	return propertyTypeID
}

func TestAddRemovePropertyTypeValue(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2 := AddPropertyTypeValueTest(ctx, t, mr)
	EditPropertyTypeValueTest(ctx, t, mr, id1, id2)
	RemovePropertyTypeValueTest(ctx, t, mr, id1, id2)
}
func AddPropertyTypeValueTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {

	propertyType := prepareBasicPropertyType(ctx, t, mr)

	propertyTypeValue1, err := mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "propertyTypeValue_test_1",
		PropertyType: propertyType.ID,
	})
	require.NoError(t, err)

	propertyTypeValue2, err := mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "propertyTypeValue_test_2",
		PropertyType: propertyType.ID,
	})
	require.NoError(t, err)
	id1, id2 := propertyTypeValue1.ID, propertyTypeValue2.ID
	_, err = mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "propertyTypeValue_test_1",
		PropertyType: 12345,
	})
	require.Error(t, err)
	return id1, id2
}

func EditPropertyTypeValueTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int) {
	var deleted = true
	var Id = 12345
	_, err := mr.EditPropertyTypeValue(ctx, models.EditPropertyTypeValueInput{
		ID:        &id1,
		Name:      "propertyTypeValue_test_1.1",
		IsDeleted: &deleted,
	})
	require.NoError(t, err)
	_, err = mr.EditPropertyTypeValue(ctx, models.EditPropertyTypeValueInput{
		ID:        &Id,
		Name:      "propertyTypeValue_test_1.1",
		IsDeleted: &deleted,
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

func TestAddPropertyTypeValueWithPropertyType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr := r.Mutation()
	strValue, strIndex := "Foo", 7

	strPropType := pkgmodels.PropertyTypeInput{
		Name:        "str_prop",
		Type:        "string",
		Index:       &strIndex,
		StringValue: &strValue,
	}
	PropertyTypes := []*pkgmodels.PropertyTypeInput{&strPropType}
	project1, err := mr.CreateProjectType(ctx, models.AddProjectTypeInput{
		Name:        "Project_test_1",
		Description: new(string),
		Properties:  PropertyTypes,
		WorkOrders:  []*models.WorkOrderDefinitionInput{},
	})
	require.NoError(t, err)
	propertyTypeID, err := project1.QueryProperties().Only(ctx)
	require.NoError(t, err)
	PropTypeValue, err := mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:         "example_type_a",
		PropertyType: propertyTypeID.ID,
	})
	require.NoError(t, err)

	strProp := PropTypeValue.QueryPropertyType().Where(propertytype.TypeEQ(propertytype.TypeString)).OnlyX(ctx)

	require.Equal(t, "str_prop", strProp.Name, "verifying string property type's name")
	require.Equal(t, strValue, pointer.GetString(strProp.StringVal), "verifying string property type's String value")
	require.Nil(t, strProp.IntVal, "verifying int property type's int value")
	require.Equal(t, strIndex, strProp.Index, "verifying string property type's index")

	_, err = PropTypeValue.PropertyType(ctx)
	require.NoError(t, err)
}

func TestAddPropertyTypeValueWithParentPropertyTypeValue(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr := r.Mutation()
	strValue, strIndex := "Foo", 7

	strPropType := pkgmodels.PropertyTypeInput{
		Name:        "str_prop",
		Type:        "string",
		Index:       &strIndex,
		StringValue: &strValue,
	}
	PropertyTypes := []*pkgmodels.PropertyTypeInput{&strPropType}
	project1, err := mr.CreateProjectType(ctx, models.AddProjectTypeInput{
		Name:        "Project_test_1",
		Description: new(string),
		Properties:  PropertyTypes,
		WorkOrders:  []*models.WorkOrderDefinitionInput{},
	})
	require.NoError(t, err)
	propertyTypeID, err := project1.QueryProperties().Only(ctx)
	require.NoError(t, err)
	parentPropTypeValue := []string{"prueba1", "prueba2"}
	_, err = mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:                    "example_type_a",
		PropertyType:            propertyTypeID.ID,
		ParentPropertyTypeValue: parentPropTypeValue,
	})
	require.NoError(t, err)

	_, err = mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:                    "example_type_b",
		PropertyType:            propertyTypeID.ID,
		ParentPropertyTypeValue: nil,
	})
	require.NoError(t, err)

	_, err = mr.AddPropertyTypeValue(ctx, pkgmodels.AddPropertyTypeValueInput{
		Name:                    "example_type_b",
		PropertyType:            propertyTypeID.ID,
		ParentPropertyTypeValue: nil,
	})
	require.Error(t, err)

}
