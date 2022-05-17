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
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateFKUser(ctx context.Context, t *testing.T, mr generated.MutationResolver) int {
	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	require.Equal(t, user.StatusActive, u.Status)

	return u.ID
}

func CreateExecutions(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int) {

	userID := CreateFKUser(ctx, t, mr)

	Time, _ := time.Parse(time.RFC3339, "2021-06-23T00:00:00Z")

	execution_1, err := mr.AddExecution(ctx, models.AddExecutionInput{
		User:               userID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

	execution_2, err := mr.AddExecution(ctx, models.AddExecutionInput{
		User:               userID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

	return execution_1.ID, execution_2.ID, userID
}

func TestAddExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	userID := CreateFKUser(ctx, t, mr)

	Time, _ := time.Parse(time.RFC3339, "2021-06-23T00:00:00Z")

	_, err := mr.AddExecution(ctx, models.AddExecutionInput{
		User:               userID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

}

func TestEditExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	Time2, _ := time.Parse(time.RFC3339, "2020-07-23T00:00:00Z")

	execution_1, _, userID := CreateExecutions(ctx, t, mr)

	_, err := mr.EditExecution(ctx, models.EditExecutionInput{
		ID:                 execution_1,
		User:               userID,
		ManualConfirmation: Time2,
	})
	require.NoError(t, err)

}

func TestRemoveExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	execution_1, execution_2, _ := CreateExecutions(ctx, t, mr)

	_, err := mr.RemoveExecution(ctx, execution_1)
	require.NoError(t, err)
	_, err = mr.RemoveExecution(ctx, execution_2)
	require.NoError(t, err)
	_, err = mr.RemoveExecution(ctx, execution_1)
	require.Error(t, err)

}
