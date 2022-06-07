// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateOrganization(ctx context.Context, t *testing.T, mr generated.MutationResolver) *ent.Organization {

	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	require.Equal(t, user.StatusActive, u.Status)

	organization, err := mr.AddOrganization(ctx, models.AddOrganizationInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
	})
	require.NoError(t, err)

	return organization
}

func CreateOrganizations(ctx context.Context, t *testing.T, mr generated.MutationResolver) (*ent.Organization, *ent.Organization) {

	organization, err := mr.AddOrganization(ctx, models.AddOrganizationInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
	})
	require.NoError(t, err)

	organization2, err := mr.AddOrganization(ctx, models.AddOrganizationInput{
		Name:        "organization_test_2",
		Description: "organization_description2",
	})
	require.NoError(t, err)

	return organization, organization2
}

func TestAddOrganization(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, err := mr.AddOrganization(ctx, models.AddOrganizationInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
	})
	require.NoError(t, err)

	_, err = mr.AddOrganization(ctx, models.AddOrganizationInput{
		Name:        "organization_test_1",
		Description: "organization_description2",
	})
	require.Error(t, err)

}

func TestEditOrganization(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	organization1, organization2 := CreateOrganizations(ctx, t, mr)

	_, err := mr.EditOrganization(ctx, models.EditOrganizationInput{
		ID:          organization1.ID,
		Name:        "organizationEdited",
		Description: "one organization edited",
	})
	require.NoError(t, err)

	_, err = mr.EditOrganization(ctx, models.EditOrganizationInput{
		ID:          organization2.ID,
		Name:        "organizationEdited",
		Description: "one organization edited",
	})
	require.Error(t, err)

	_, err = mr.EditOrganization(ctx, models.EditOrganizationInput{
		ID:          organization2.ID + 10,
		Name:        "organizationEdited2",
		Description: "one organization edited",
	})
	require.Error(t, err)
}

func TestRemoveOrganization(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	organization1, organization2 := CreateOrganizations(ctx, t, mr)

	_, err := mr.RemoveOrganization(ctx, organization1.ID)
	require.NoError(t, err)
	_, err = mr.RemoveOrganization(ctx, organization2.ID)
	require.NoError(t, err)
	_, err = mr.RemoveOrganization(ctx, organization1.ID)
	require.Error(t, err)
}
