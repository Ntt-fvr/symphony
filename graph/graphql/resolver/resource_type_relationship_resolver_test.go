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

func resourceType(ctx context.Context, t *testing.T, mr generated.MutationResolver) int {

	id, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "Type_test_1",
		ResourceTypeClass:    "CARD",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
	})
	require.NoError(t, err)

	return id.ID
}

func TestAddResourceTypeRelationship(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	resourceType := resourceType(ctx, t, mr)

	_, err := mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
	_, err = mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "other_type",
		ResourceRelationshipMultiplicity: "other_multiplicity",
		ResourceTypeA:                    resourceType,
	})
	require.Error(t, err)
}

func TestSimilarResourceTypeRelationship(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	resourceType := resourceType(ctx, t, mr)

	_, err := mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
	_, err = mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
}

func TestEditResorceTypeRelationship(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	resourceType := resourceType(ctx, t, mr)

	id, err := mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
	_, err = mr.EditResourceTypeRelationship(ctx, models.EditResourceTypeRelationshipInput{
		ID:                               id.ID,
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
	_, err = mr.EditResourceTypeRelationship(ctx, models.EditResourceTypeRelationshipInput{
		ID:                               id.ID,
		ResourceRelationshipType:         "other_type",
		ResourceRelationshipMultiplicity: "other_multiplicity",
		ResourceTypeA:                    resourceType,
	})
	require.Error(t, err)
}

func TestRemveResorceTypeRelationship(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	resourceType := resourceType(ctx, t, mr)

	id, err := mr.AddResourceTypeRelationship(ctx, models.AddResourceTypeRelationshipInput{
		ResourceRelationshipType:         "BELONGS_TO",
		ResourceRelationshipMultiplicity: "ONE_TO_ONE",
		ResourceTypeA:                    resourceType,
	})
	require.NoError(t, err)
	_, err = mr.RemoveResourceTypeRelationship(ctx, id.ID)
	require.NoError(t, err)
	_, err = mr.RemoveResourceTypeRelationship(ctx, id.ID)
	require.Error(t, err)
}
