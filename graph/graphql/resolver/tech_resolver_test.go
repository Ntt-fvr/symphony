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

func TestAddRemoveTech(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2, domainId := AddTechTest(t, ctx, mr)
	EditTechTest(t, ctx, mr, id1, id2, domainId)
	RemoveTechTest(t, ctx, mr, id1, id2)

}
func AddTechTest(t *testing.T, ctx context.Context, mr generated.MutationResolver) (int, int, int) {
	domain1, err := mr.AddDomain(ctx, models.AddDomainInput{
		Name: "domain_test_1",
	})
	require.NoError(t, err)
	tech1, err := mr.AddTech(ctx, models.AddTechInput{
		Name:     "tech_test_1",
		DomainFk: domain1.ID,
	})
	require.NoError(t, err)

	tech2, err := mr.AddTech(ctx, models.AddTechInput{
		Name:     "tech_test_2",
		DomainFk: domain1.ID,
	})
	require.NoError(t, err)
	id1, id2 := tech1.ID, tech2.ID
	_, err = mr.AddTech(ctx, models.AddTechInput{
		Name:     "tech_test_1",
		DomainFk: domain1.ID,
	})
	require.Error(t, err)
	return id1, id2, domain1.ID
}

func EditTechTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int, domainId int) {
	_, err := mr.EditTech(ctx, models.EditTechInput{
		ID:       id1,
		Name:     "tech_test_1.1",
		DomainFk: domainId,
	})
	require.NoError(t, err)
	_, err = mr.EditTech(ctx, models.EditTechInput{
		ID:       id2,
		Name:     "tech_test_1.1",
		DomainFk: domainId,
	})
	require.Error(t, err)
}

func RemoveTechTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveTech(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveTech(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveTech(ctx, id1)
	require.Error(t, err)
}
