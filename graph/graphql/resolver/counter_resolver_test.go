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

func TestAddRemoveCounter(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	// TODO(T66882071): Remove owner role
	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	id1, id2 := AddCounterTest(t, ctx, mr)
	EditCounterTest(t, ctx, mr, id1, id2)
	RemoveCounterTest(t, ctx, mr, id1, id2)

}
func AddCounterTest(t *testing.T, ctx context.Context, mr generated.MutationResolver) (int, int) {
	counter1, err := mr.AddCounter(ctx, models.AddCounterInput{
		Name: "counter_test_1",
	})
	require.NoError(t, err)

	counter2, err := mr.AddCounter(ctx, models.AddCounterInput{
		Name: "counter_test_2",
	})
	require.NoError(t, err)
	id1, id2 := counter1.ID, counter2.ID
	_, err = mr.AddCounter(ctx, models.AddCounterInput{
		Name: "counter_test_1",
	})
	require.Error(t, err)
	return id1, id2
}

func EditCounterTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.EditCounter(ctx, models.EditCounterInput{
		ID:   id1,
		Name: "counter_test_1.1",
	})
	require.NoError(t, err)
	_, err = mr.EditCounter(ctx, models.EditCounterInput{
		ID:   id2,
		Name: "counter_test_1.1",
	})
	require.Error(t, err)
}

func RemoveCounterTest(t *testing.T, ctx context.Context, mr generated.MutationResolver, id1 int, id2 int) {
	_, err := mr.RemoveCounter(ctx, id1)
	require.NoError(t, err)
	_, err = mr.RemoveCounter(ctx, id2)
	require.NoError(t, err)
	_, err = mr.RemoveCounter(ctx, id1)
	require.Error(t, err)
}
