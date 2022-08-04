// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/stretchr/testify/require"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
)

func TestAddTespirceSpecificationItems(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resource_type, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "resource_type_test_1",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "VIRTUAL_RESOURCE",
	})
	require.NoError(t, err)

	resource_specification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resource_specification_test_1",
		ResourceType: resource_type.ID,
	})
	require.NoError(t, err)

	resource_specification_relationship, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                  "resource_specification_relationship_test_1",
		ResourceSpecification: resource_specification.ID,
	})
	require.NoError(t, err)

	_, err = mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: resource_specification_relationship.ID,
		ResourceSpecification:             &resource_specification.ID,
	})
	require.NoError(t, err)

	_, err = mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: resource_specification_relationship.ID,
	})
	require.NoError(t, err)

	_, err = mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: 123456,
		ResourceSpecification:             &resource_specification.ID,
	})
	require.Error(t, err)

	_, err = mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: 123456,
	})
	require.Error(t, err)
}

func TestEditTespirceSpecificationItems(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resource_type, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "resource_type_test_1",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "VIRTUAL_RESOURCE",
	})
	require.NoError(t, err)

	resource_specification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resource_specification_test_1",
		ResourceType: resource_type.ID,
	})
	require.NoError(t, err)

	resource_specification_relationship, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                  "resource_specification_relationship_test_1",
		ResourceSpecification: resource_specification.ID,
	})
	require.NoError(t, err)

	resource_specification_items, err := mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: resource_specification_relationship.ID,
		ResourceSpecification:             &resource_specification.ID,
	})
	require.NoError(t, err)

	_, err = mr.EditResourceSpecificationItems(ctx, models.EditResourceSpecificationItemsInput{
		ID:                                resource_specification_items.ID,
		ResourceSpecificationRelationship: &resource_specification_relationship.ID,
	})
	require.NoError(t, err)

	_, err = mr.EditResourceSpecificationItems(ctx, models.EditResourceSpecificationItemsInput{
		ID:                                123456,
		ResourceSpecificationRelationship: &resource_specification_relationship.ID,
	})
	require.Error(t, err)
}

func TestRemoveTespirceSpecificationItems(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resource_type, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "resource_type_test_1",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "VIRTUAL_RESOURCE",
	})
	require.NoError(t, err)

	resource_specification, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:         "resource_specification_test_1",
		ResourceType: resource_type.ID,
	})
	require.NoError(t, err)

	resource_specification_relationship, err := mr.AddResourceSpecificationRelationship(ctx, models.AddResourceSpecificationRelationshipInput{
		Name:                  "resource_specification_relationship_test_1",
		ResourceSpecification: resource_specification.ID,
	})
	require.NoError(t, err)

	id1, err := mr.AddResourceSpecificationItems(ctx, models.AddResourceSpecificationItemsInput{
		ResourceSpecificationRelationship: resource_specification_relationship.ID,
		ResourceSpecification:             &resource_specification.ID,
	})
	require.NoError(t, err)

	_, err = mr.RemoveResourceSpecificationItems(ctx, id1.ID)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecificationItems(ctx, id1.ID)
	require.Error(t, err)
}
