// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"
	"time"

	"github.com/AlekSi/pointer"
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
	require.Empty(t, u.FirstName)

	u, err := mr.EditUser(ctx, models.EditUserInput{
		ID:        u.ID,
		Status:    toUserStatusPointer(user.StatusDeactivated),
		FirstName: pointer.ToString("John"),
		LastName:  pointer.ToString("Doe")})
	require.NoError(t, err)

	return u.ID

}
func TestAddExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	fechaComoString := "2021-06-23T00:00:00Z"
	Time, err := time.Parse(time.RFC3339, fechaComoString)
	UserID := CreateFKUser(ctx, t, mr)

	_, err = mr.AddExecution(ctx, models.AddExecutionInput{
		User:               UserID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

}

func TestEditExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	fechaComoString := "2021-06-23T00:00:00Z"
	fechaComoString2 := "2020-07-23T00:00:00Z"
	Time, err := time.Parse(time.RFC3339, fechaComoString)
	Time2, err := time.Parse(time.RFC3339, fechaComoString2)
	UserID := CreateFKUser(ctx, t, mr)

	execution_1, err := mr.AddExecution(ctx, models.AddExecutionInput{
		User:               UserID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

	_, err = mr.EditExecution(ctx, models.EditExecutionInput{
		ID:                 execution_1.ID,
		User:               UserID,
		ManualConfirmation: Time2,
	})
	require.NoError(t, err)

}

func TestRemoveExecution(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	fechaComoString := "2021-06-23T00:00:00Z"
	Time, err := time.Parse(time.RFC3339, fechaComoString)
	UserID := CreateFKUser(ctx, t, mr)

	execution_1, err := mr.AddExecution(ctx, models.AddExecutionInput{
		User:               UserID,
		ManualConfirmation: Time,
	})
	require.NoError(t, err)

	_, err = mr.RemoveExecution(ctx, execution_1.ID)
	require.NoError(t, err)
	_, err = mr.RemoveExecution(ctx, execution_1.ID)
	require.Error(t, err)

}
