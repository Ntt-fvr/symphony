// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func TestAddRemoveResourceSpecificationRelationshipResolver(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	_, err := AddResourceSpecificationRelationshipListTest(ctx, t, mr)
	if err != nil {
		return
	}
	id1, id2, resourcespecification := AddResourceSpecificationRelationshipTest(ctx, t, mr)
	EditResourceSpecificationRelationshipTest(ctx, t, mr, id1, id2, resourcespecification)
	RemoveResourceSpecificationRelationshipTest(ctx, t, mr, id1, id2)
}

func AddResourceSpecificationRelationshipListTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) ([]*ent.ResourceSpecificationRelationship, error) {
	resourceType, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "resource_type_test_2",
		ResourceTypeClass:    "RACK",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)
	resourceSpecification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resource_specification_test_2",
		ResourceType: resourceType.ID,
	})
	require.NoError(t, err)
	resourceSpecificationRelationShip, err := mr.AddResourceSpecificationRelationshipList(ctx, []*models.AddResourceSpecificationRelationshipInput{
		{
			Name:                  "resource_specification_relationship_list_1",
			ResourceSpecification: resourceSpecification.ID,
		},
	})
	require.NoError(t, err)
	return resourceSpecificationRelationShip, nil
}

func AddResourceSpecificationRelationshipTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int) {

	resourcetype, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "my_test_1_resource_type",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)

	resourcespecification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "my_test_1_resource_specification",
		ResourceType: resourcetype.ID,
	})
	require.NoError(t, err)

	resource1, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                  "resource_specification_relationship_1",
		ResourceSpecification: resourcespecification.ID,
	})
	require.NoError(t, err)

	resource2, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                  "resource_specification_relationship_2",
		ResourceSpecification: resourcespecification.ID,
	})
	require.NoError(t, err)
	id1, id2 := resource1.ID, resource2.ID
	_, err = mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name: "resource_specification_relationship_test_1",
	})
	require.Error(t, err)
	return id1, id2, resourcespecification.ID
}

func EditResourceSpecificationRelationshipTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int, resourcespecification int) {
	_, err := mr.EditResourceSpecificationRelationship(ctx, []*models.EditResourceSpecificationRelationshipInput{
		{
			ID:                    &id1,
			Name:                  "resource_specification_relationship_1.1",
			ResourceSpecification: &resourcespecification,
		}, {
			ID:                    &id2,
			Name:                  "resource_specification_relationship_2.1",
			ResourceSpecification: &resourcespecification,
		}, {
			Name:                  "resource_specification_relationship_3",
			ResourceSpecification: &resourcespecification,
		},
	})
	require.NoError(t, err)
	_, err = mr.EditResourceSpecificationRelationship(ctx, []*models.EditResourceSpecificationRelationshipInput{
		{
			ID:                    &id1,
			Name:                  "resource_specification_relationship_1.1",
			ResourceSpecification: &resourcespecification,
		}, {
			ID:                    &id2,
			Name:                  "resource_specification_relationship_1.1",
			ResourceSpecification: &resourcespecification,
		},
	})
	require.Error(t, err)
}

func RemoveResourceSpecificationRelationshipTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveResourceSpecificationRelationship(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecificationRelationship(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecificationRelationship(ctx, id1)
	require.Error(t, err)
}
