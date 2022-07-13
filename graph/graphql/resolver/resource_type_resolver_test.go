// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func resourceTypeID(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {

	id1, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_1",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)
	id2, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_2",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)

	return id1.ID, id2.ID
}

func TestAddResourceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_1",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)
	_, err = mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_2",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)
	_, err = mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_1",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.Error(t, err)
}

func TestEditResourceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2 := resourceTypeID(ctx, t, mr)
	_, err := mr.EditResourceType(ctx, models.EditResourceTypeInput{
		ID:                   id1,
		Name:                 "resourceType_test_1.1",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "VIRTUAL_RESOURCE",
	})
	require.NoError(t, err)
	_, err = mr.EditResourceType(ctx, models.EditResourceTypeInput{
		ID:                   id2,
		Name:                 "resourceType_test_1.1",
		ResourceTypeClass:    "SLOT",
		ResourceTypeBaseType: "VIRTUAL_RESOURCE",
	})
	require.Error(t, err)
}

func TestRemoveResourceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2 := resourceTypeID(ctx, t, mr)

	_, err := mr.RemoveResourceType(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceType(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveResourceType(ctx, id1)
	require.Error(t, err)
}
