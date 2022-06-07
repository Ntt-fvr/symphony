// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent/user"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func TestAddRemoveResourceSpecification(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2, resourceTypeId1 := AddResourceSpecificationTest(ctx, t, mr)
	EditResourceSpecificationTest(ctx, t, mr, id1, id2, resourceTypeId1)
	RemoveResourceSpecificationTest(ctx, t, mr, id1, id2)
}
func AddResourceSpecificationTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int) {
	resourceType1, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_1",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)
	resourceSpecification1, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resourceSpecification_test_1",
		ResourceType: resourceType1.ID,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "Property_test_1",
				Type: "enum",
			},
		},
	})
	require.NoError(t, err)

	resourceSpecification2, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resourceSpecification_test_2",
		ResourceType: resourceType1.ID,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "Property_test_2",
				Type: "enum",
			},
		},
	})
	require.NoError(t, err)
	id1, id2 := resourceSpecification1.ID, resourceSpecification2.ID
	_, err = mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resourceSpecification_test_1",
		ResourceType: resourceType1.ID,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "Property_test_1",
				Type: "enum",
			},
		},
	})
	require.Error(t, err)
	return id1, id2, resourceType1.ID
}

func EditResourceSpecificationTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int, resourceTypeId1 int) {
	_, err := mr.EditResourceSpecification(ctx, models.EditResourceSpecificationInput{
		ID:           id1,
		Name:         "resourceSpecification_test_1.1",
		ResourceType: &resourceTypeId1,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "Property_test_1.1",
				Type: "enum",
			},
		},
	})
	require.NoError(t, err)
	_, err = mr.EditResourceSpecification(ctx, models.EditResourceSpecificationInput{
		ID:           id2,
		Name:         "resourceSpecification_test_1.1",
		ResourceType: &resourceTypeId1,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "Property_test_1.1",
				Type: "enum",
			},
		},
	})
	require.Error(t, err)
}

func RemoveResourceSpecificationTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveResourceSpecification(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecification(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecification(ctx, id1)
	require.Error(t, err)
}
