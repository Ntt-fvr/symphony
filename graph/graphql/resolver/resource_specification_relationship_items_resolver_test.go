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

func TestAddRemoveResourceSpecificationRelationshipItemsResolver(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2, resourcetype, resourcesr := AddResourceSpecificationRelationshipItemsTest(ctx, t, mr)
	EditResourceSpecificationRelationshipItemsTest(ctx, t, mr, id1, id2, resourcetype, resourcesr)
	RemoveResourceSpecificationRelationshipItemsTest(ctx, t, mr, id1, id2)
}

func AddResourceSpecificationRelationshipItemsTest(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int, int) {

	resourcetypeclass1, err := mr.AddResourceTypeClass(ctx, models.AddResourceTypeClassInput{
		Name: "my_test_1_resource_type_class",
	})
	require.NoError(t, err)

	resourcetypebasetype1, err := mr.AddResourceTypeBaseType(ctx, models.AddResourceTypeBaseTypeInput{
		Name: "my_test_1_resource_type_base_type",
	})
	require.NoError(t, err)

	resourcetype, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                   "my_test_1_resource_type",
		ResourceTypeClassFk:    resourcetypeclass1.ID,
		ResourceTypeBaseTypeFk: resourcetypebasetype1.ID,
	})
	require.NoError(t, err)

	resourcespecification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:           "my_test_1_resource_specification",
		ResourceTypeFk: resourcetype.ID,
	})
	require.NoError(t, err)

	resourcespecifcationrelationship, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                    "my_test_1_resource_specification",
		ResourceSpecificationFk: resourcespecification.ID,
	})
	require.NoError(t, err)

	resource1, err := mr.AddResourceSRItems(ctx, models.AddResourceSRItemsInput{
		Name:                                "test_resource_sr_items_1",
		ResourceSpecificationRelationshipFk: resourcespecifcationrelationship.ID,
		ResourceTypeFk:                      resourcetype.ID,
	})
	require.NoError(t, err)

	resource2, err := mr.AddResourceSRItems(ctx, models.AddResourceSRItemsInput{
		Name:                                "test_resource_sr_items_2",
		ResourceSpecificationRelationshipFk: resourcespecifcationrelationship.ID,
		ResourceTypeFk:                      resourcetype.ID,
	})
	require.NoError(t, err)

	id1, id2 := resource1.ID, resource2.ID
	_, err = mr.AddResourceSRItems(ctx, models.AddResourceSRItemsInput{
		Name: "test_resource_sr_items_test_1",
	})
	require.Error(t, err)
	return id1, id2, resourcetype.ID, resourcespecifcationrelationship.ID
}

func EditResourceSpecificationRelationshipItemsTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int, resourcetype int, resourcesr int) {
	_, err := mr.EditResourceSRItems(ctx, models.EditResourceSRItemsInput{
		ID:                                  id1,
		Name:                                "resource_sr_items_test_1.1",
		ResourceSpecificationRelationshipFk: &resourcesr,
		ResourceTypeFk:                      &resourcetype,
	})
	require.NoError(t, err)
	_, err = mr.EditResourceSRItems(ctx, models.EditResourceSRItemsInput{
		ID:                                  id2,
		Name:                                "resource_sr_items_test_1.1",
		ResourceSpecificationRelationshipFk: &resourcesr,
		ResourceTypeFk:                      &resourcetype,
	})
	require.Error(t, err)
}

func RemoveResourceSpecificationRelationshipItemsTest(ctx context.Context, t *testing.T, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveResourceSRItems(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSRItems(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSRItems(ctx, id1)
	require.Error(t, err)
}
