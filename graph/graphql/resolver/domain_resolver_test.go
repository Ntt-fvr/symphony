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

func TestAddRemoveDomain(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2 := AddDomainTest(t, ctx, mr)
	EditDomainTest(t, ctx, mr, id1, id2)
	RemoveDomainTest(t, ctx, mr, id1, id2)

}
func AddDomainTest(t *testing.T, ctx context.Context, mr generated.MutationResolver) (int, int) {
	domain1, err := mr.AddDomain(ctx, models.AddDomainInput{
		Name: "domain_test_1",
	})
	require.NoError(t, err)

	domain2, err := mr.AddDomain(ctx, models.AddDomainInput{
		Name: "domain_test_2",
	})
	require.NoError(t, err)
	id1, id2 := domain1.ID, domain2.ID
	_, err = mr.AddDomain(ctx, models.AddDomainInput{
		Name: "domain_test_1",
	})
	require.Error(t, err)
	return id1, id2
}

func EditDomainTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.EditDomain(ctx, models.EditDomainInput{
		ID:   id1,
		Name: "domain_test_1.1",
	})
	require.NoError(t, err)
	_, err = mr.EditDomain(ctx, models.EditDomainInput{
		ID:   id2,
		Name: "domain_test_1.1",
	})
	require.Error(t, err)
}

func RemoveDomainTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveDomain(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveDomain(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveDomain(ctx, id1)
	require.Error(t, err)
}
