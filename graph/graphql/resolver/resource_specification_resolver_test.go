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

func CreateResourceSpecifications(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int, int, int) {
	resourceTypeID_1, resourceTypeID_2, reconciliationRuleID_1, reconciliationRuleID_2 := CreateResourceTypes(ctx, t, mr)

	resourceSpecification_1, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:               "ResourceSpecification_1",
		ReconciliationRule: reconciliationRuleID_1,
		ResourceType:       resourceTypeID_1,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "resourcePropertyType1",
				Type: "bool",
			},
		},
	})
	require.NoError(t, err)

	return resourceSpecification_1.ID, resourceTypeID_1, resourceTypeID_2, reconciliationRuleID_1, reconciliationRuleID_2
}

func TestAddResourceSpecification(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, resourceTypeID_1, _, reconciliationRuleID_1, _ := CreateResourceSpecifications(ctx, t, mr)

	_, err := mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:               "ResourceSpecification_2",
		ReconciliationRule: reconciliationRuleID_1,
		ResourceType:       resourceTypeID_1,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "resourcePropertyType1",
				Type: "bool",
			},
		},
	})
	require.NoError(t, err)

	_, err = mr.AddResourceSpecification(ctx, models.AddResourceSpecificationInput{
		Name:               "ResourceSpecification_3",
		ReconciliationRule: 123,
		ResourceType:       resourceTypeID_1,
		ResourcePropertyTypes: []*models.AddResourcePropertyTypeInput{
			{
				Name: "resourcePropertyType1",
				Type: "bool",
			},
		},
	})
	require.Error(t, err)

}

func TestEditResourceSpecification(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resourceSpecificationID_1, resourceTypeID_1, _, reconciliationRuleID_1, _ := CreateResourceSpecifications(ctx, t, mr)

	_, err := mr.EditResourceSpecification(ctx, models.EditResourceSpecificationInput{
		ID:                 resourceSpecificationID_1,
		Name:               "ResourceSpecification_1",
		ReconciliationRule: &reconciliationRuleID_1,
		ResourceType:       &resourceTypeID_1,
	})
	require.NoError(t, err)

	_, err = mr.EditResourceSpecification(ctx, models.EditResourceSpecificationInput{
		ID:                 123,
		Name:               "ResourceSpecification_2",
		ReconciliationRule: &reconciliationRuleID_1,
		ResourceType:       &resourceTypeID_1,
	})
	require.Error(t, err)
}
func TestRemoveResourceSpecification(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	resourceSpecificationID_1, _, _, _, _ := CreateResourceSpecifications(ctx, t, mr)

	_, err := mr.RemoveResourceSpecification(ctx, resourceSpecificationID_1)
	require.NoError(t, err)
	_, err = mr.RemoveResourceSpecification(ctx, resourceSpecificationID_1)
	require.Error(t, err)

}
