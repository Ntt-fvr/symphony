// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateContract(ctx context.Context, t *testing.T, mr generated.MutationResolver) *ent.Contract {
	organization := CreateOrganization(ctx, t, mr)

	TimeEffective, _ := time.Parse(time.RFC3339, "2022-06-01T00:00:00Z")
	TimeExpiration, _ := time.Parse(time.RFC3339, "2022-08-23T00:00:00Z")

	contract, err := mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "1234567",
		Name:           "contract_test_1",
		Category:       "contract_test_1",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_1",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.NoError(t, err)

	return contract
}

func CreateContracts(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, *ent.Contract, *ent.Contract) {
	organization := CreateOrganization(ctx, t, mr)

	TimeEffective, _ := time.Parse(time.RFC3339, "2022-06-01T00:00:00Z")
	TimeExpiration, _ := time.Parse(time.RFC3339, "2022-08-23T00:00:00Z")

	contract1, err := mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "1234567",
		Name:           "contract_test_1",
		Category:       "contract_test_1",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_1",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.NoError(t, err)

	contract2, err := mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "12345678",
		Name:           "contract_test_2",
		Category:       "contract_test_2",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_2",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.NoError(t, err)

	return organization.ID, contract1, contract2
}

func TestAddContract(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	organization := CreateOrganization(ctx, t, mr)

	TimeEffective, _ := time.Parse(time.RFC3339, "2022-06-01T00:00:00Z")
	TimeExpiration, _ := time.Parse(time.RFC3339, "2022-08-23T00:00:00Z")

	_, err := mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "1234567",
		Name:           "contract_test_1",
		Category:       "contract_test_1",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_1",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.NoError(t, err)

	_, err = mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "1234567",
		Name:           "contract_test_2",
		Category:       "contract_test_2",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_2",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.Error(t, err)

	_, err = mr.AddContract(ctx, models.AddContractInput{
		ExternalID:     "12345678",
		Name:           "contract_test_1",
		Category:       "contract_test_2",
		EffectiveDate:  TimeEffective,
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_2",
		Organization:   organization.ID,
		Status:         "ACTIVE",
	})
	require.Error(t, err)

}

func TestEditContract(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	organizationID, contract1, contract2 := CreateContracts(ctx, t, mr)

	TimeExpiration, _ := time.Parse(time.RFC3339, "2022-07-23T00:00:00Z")

	_, err := mr.EditContract(ctx, models.EditContractInput{
		ID:             contract1.ID,
		ExternalID:     "12345676767",
		Name:           "contract_test_3",
		Category:       "contract_test_3",
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_3",
		Organization:   organizationID,
	})
	require.NoError(t, err)

	_, err = mr.EditContract(ctx, models.EditContractInput{
		ID:             contract2.ID,
		ExternalID:     "12345676767",
		Name:           "contract_test_2",
		Category:       "contract_test_2",
		ExpirationDate: TimeExpiration,
		Description:    "contract_test_2",
		Organization:   organizationID,
	})
	require.Error(t, err)
}

func TestRemoveContract(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, contract1, contract2 := CreateContracts(ctx, t, mr)

	_, err := mr.RemoveContract(ctx, contract1.ID)
	require.NoError(t, err)
	_, err = mr.RemoveContract(ctx, contract2.ID)
	require.NoError(t, err)
	_, err = mr.RemoveContract(ctx, contract1.ID)
	require.Error(t, err)
}
