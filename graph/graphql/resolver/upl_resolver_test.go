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
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateUpl(ctx context.Context, t *testing.T, mr generated.MutationResolver) *ent.Upl {
	contract := CreateContract(ctx, t, mr)

	upl, err := mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)
	return upl
}

func CreateUpls(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, *ent.Upl, *ent.Upl) {
	contract := CreateContract(ctx, t, mr)

	upl1, err := mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)

	upl2, err := mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_2",
		Description: "organization_description2",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "1234567",
				Item:       "item_test_2",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)

	return contract.ID, upl1, upl2
}

func TestAddUpl(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	contract := CreateContract(ctx, t, mr)

	_, err := mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)

	_, err = mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_1",
		Description: "organization_description1",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
			{
				ExternalID: "123456",
				Item:       "item_test_2",
				Unit:       1,
				Price:      2,
			},
			{
				ExternalID: "123456",
				Item:       "item_test_3",
				Unit:       1,
				Price:      2,
			},
			{
				ExternalID: "123456",
				Item:       "item_test_4",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)

	_, err = mr.AddUpl(ctx, models.AddUplInput{
		Name:        "organization_test_1",
		Description: "organization_description2",
		Contract:    contract.ID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "1234567",
				Item:       "item_test_2",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.Error(t, err)

}

func TestEditUpl(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	contractID, upl1, upl2 := CreateUpls(ctx, t, mr)

	_, err := mr.EditUpl(ctx, models.EditUplInput{
		ID:          upl1.ID,
		Name:        "organization_test_5",
		Description: "organization_description1",
		Contract:    contractID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.NoError(t, err)

	_, err = mr.EditUpl(ctx, models.EditUplInput{
		ID:          upl2.ID,
		Name:        "organization_test_5",
		Description: "organization_description1",
		Contract:    contractID,
		UplItems: []*models.AddUplItemInput{
			{
				ExternalID: "123456",
				Item:       "item_test_1",
				Unit:       1,
				Price:      2,
			},
		},
	})
	require.Error(t, err)

	idError := 123

	_, err = mr.EditUpl(ctx, models.EditUplInput{
		ID:          upl1.ID,
		Name:        "organization_test_5",
		Description: "organization_description1",
		Contract:    contractID,
		UplItems: []*models.AddUplItemInput{
			{
				ID:         &idError,
				ExternalID: "123456234",
				Item:       "item_test_Edited_1",
				Unit:       4,
				Price:      5,
			},
		},
	})
	require.Error(t, err)
}

func TestRemoveUpl(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, upl1, upl2 := CreateUpls(ctx, t, mr)

	_, err := mr.RemoveUpl(ctx, upl1.ID)
	require.NoError(t, err)
	_, err = mr.RemoveUpl(ctx, upl2.ID)
	require.NoError(t, err)
	_, err = mr.RemoveUpl(ctx, upl1.ID)
	require.Error(t, err)
}
