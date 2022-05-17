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

func CreateFKResourceType(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {
	reconciliationRule_1, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconciliationRule_1",
	})
	require.NoError(t, err)

	reconciliationRule_2, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconciliationRule_2",
	})
	require.NoError(t, err)

	reconciliationRuleID_1, reconciliationRuleID_2 := reconciliationRule_1.ID, reconciliationRule_2.ID
	return reconciliationRuleID_1, reconciliationRuleID_2
}

func CreateResourceTypes(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int, int) {
	reconciliationRuleID_1, reconciliationRuleID_2 := CreateFKResourceType(ctx, t, mr)

	resourceType_1, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_1",
		ReconciliationRule:   reconciliationRuleID_1,
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.NoError(t, err)

	resourceType_2, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_2",
		ReconciliationRule:   reconciliationRuleID_2,
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.NoError(t, err)

	return resourceType_1.ID, resourceType_2.ID, reconciliationRuleID_1, reconciliationRuleID_2
}

func TestAddResouceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	reconciliationRuleID_1, _ := CreateFKResourceType(ctx, t, mr)

	_, err := mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_1",
		ReconciliationRule:   reconciliationRuleID_1,
		ResourceTypeBaseType: "enumNoValido",
		ResourceTypeClass:    "SLOT",
	})
	require.Error(t, err)

	_, err = mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_1",
		ReconciliationRule:   reconciliationRuleID_1,
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.NoError(t, err)

	_, err = mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_1",
		ReconciliationRule:   reconciliationRuleID_1,
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.Error(t, err)

	_, err = mr.AddResourceType(ctx, models.AddResourceTypeInput{
		Name:                 "ResourceType_1",
		ReconciliationRule:   123,
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.Error(t, err)
}

func TestEditResouceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resourceType_1, resourceType_2, _, _ := CreateResourceTypes(ctx, t, mr)

	_, err := mr.EditResourceType(ctx, models.EditResourceTypeInput{
		ID:                   resourceType_1,
		Name:                 "ResourceType_1.1",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.NoError(t, err)

	_, err = mr.EditResourceType(ctx, models.EditResourceTypeInput{
		ID:                   123,
		Name:                 "ResourceType_1",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.Error(t, err)

	_, err = mr.EditResourceType(ctx, models.EditResourceTypeInput{
		ID:                   resourceType_2,
		Name:                 "ResourceType_1.1",
		ResourceTypeBaseType: "LOGICAL_RESOURCE",
		ResourceTypeClass:    "SLOT",
	})
	require.NoError(t, err)

}

func TestRemoveResourceType(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resourceTypeID_1, resourceTypeID_2, _, _ := CreateResourceTypes(ctx, t, mr)

	_, err := mr.RemoveResourceType(ctx, resourceTypeID_1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceType(ctx, resourceTypeID_2)
	require.NoError(t, err)
	_, err = mr.RemoveResourceType(ctx, resourceTypeID_1)
	require.Error(t, err)
}
