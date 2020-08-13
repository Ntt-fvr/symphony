// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"strconv"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func TestAddWorkOrderActivities(t *testing.T) {
	r := newTestResolver(t)
	r.client.Use(event.LogHook(
		handler.HandleActivityLog,
		logtest.NewTestLogger(t),
	))
	now := time.Now()

	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	u := viewer.MustGetOrCreateUser(
		privacy.DecisionContext(ctx, privacy.Allow),
		viewertest.DefaultUser,
		user.RoleOwner)

	wor, ar := r.WorkOrder(), r.Activity()
	name := "example_work_order"
	wo := createWorkOrder(ctx, t, *r, name)
	activities, err := wor.Activities(ctx, wo)
	require.NoError(t, err)
	require.Len(t, activities, 4)

	for _, a := range activities {
		workOrder, err := ar.WorkOrder(ctx, a)
		require.NoError(t, err)
		require.Equal(t, workOrder.ID, wo.ID)

		author, err := ar.Author(ctx, a)
		require.NoError(t, err)
		require.Equal(t, author.AuthID, u.AuthID)

		newNode, err := ar.NewRelatedNode(ctx, a)
		require.NoError(t, err)
		oldNode, err := ar.OldRelatedNode(ctx, a)
		require.NoError(t, err)
		require.True(t, a.IsCreate)

		switch a.ActivityType {
		case activity.ActivityTypeCreationDateChanged:
			timestampInt, err := strconv.ParseInt(a.NewValue, 10, 64)
			require.NoError(t, err)
			require.Empty(t, a.OldValue)
			require.WithinDuration(t, time.Unix(timestampInt, 0), now, time.Second*3)
			require.Nil(t, newNode)
			require.Nil(t, oldNode)
		case activity.ActivityTypeOwnerChanged:
			fetchedNode, err := newNode.Node(ctx)
			require.NoError(t, err)
			require.Empty(t, a.OldValue)
			require.Equal(t, a.NewValue, strconv.Itoa(u.ID))
			require.Equal(t, fetchedNode.ID, u.ID)
			require.Nil(t, oldNode)
		case activity.ActivityTypeStatusChanged:
			require.Empty(t, a.OldValue)
			require.EqualValues(t, a.NewValue, workorder.StatusPlanned)
			require.Nil(t, newNode)
			require.Nil(t, oldNode)
		case activity.ActivityTypePriorityChanged:
			require.Empty(t, a.OldValue)
			require.EqualValues(t, a.NewValue, workorder.PriorityNone)
			require.Nil(t, newNode)
			require.Nil(t, oldNode)
		default:
			require.Fail(t, "unsupported changed field %v", a.ActivityType)
		}
	}
}

func TestEditWorkOrderActivities(t *testing.T) {
	r := newTestResolver(t)
	r.client.Use(event.LogHook(
		handler.HandleActivityLog, logtest.NewTestLogger(t),
	))

	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	u := viewer.MustGetOrCreateUser(
		privacy.DecisionContext(ctx, privacy.Allow),
		viewertest.DefaultUser,
		user.RoleOwner)
	u2 := viewer.MustGetOrCreateUser(ctx, "tester2@example.com", user.RoleOwner)

	mr, wor, ar := r.Mutation(), r.WorkOrder(), r.Activity()
	name := "example_work_order"
	wo := createWorkOrder(ctx, t, *r, name)
	activities, err := wor.Activities(ctx, wo)
	require.NoError(t, err)
	require.Len(t, activities, 4)

	wo, err = mr.EditWorkOrder(ctx, models.EditWorkOrderInput{
		ID:         wo.ID,
		Name:       wo.Name,
		OwnerID:    &u2.ID,
		AssigneeID: &u.ID,
		Status:     workOrderStatusPtr(workorder.StatusPending),
		Priority:   workOrderPriorityPtr(workorder.PriorityHigh),
	})
	require.NoError(t, err)
	activities, err = wor.Activities(ctx, wo)
	require.NoError(t, err)
	require.Len(t, activities, 8)
	newCount := 0
	for _, a := range activities {
		workOrder, err := ar.WorkOrder(ctx, a)
		require.NoError(t, err)
		require.Equal(t, workOrder.ID, wo.ID)

		author, err := ar.Author(ctx, a)
		require.NoError(t, err)
		require.Equal(t, author.AuthID, u.AuthID)

		newNode, err := ar.NewRelatedNode(ctx, a)
		require.NoError(t, err)
		oldNode, err := ar.OldRelatedNode(ctx, a)
		require.NoError(t, err)
		if a.IsCreate {
			continue
		}
		newCount++
		switch a.ActivityType {
		case activity.ActivityTypeOwnerChanged:
			fetchedNodeNew, err := newNode.Node(ctx)
			require.NoError(t, err)
			fetchedNodeOld, err := oldNode.Node(ctx)
			require.NoError(t, err)
			require.Equal(t, a.NewValue, strconv.Itoa(u2.ID))
			require.Equal(t, a.OldValue, strconv.Itoa(u.ID))
			require.Equal(t, fetchedNodeNew.ID, u2.ID)
			require.Equal(t, fetchedNodeOld.ID, u.ID)
		case activity.ActivityTypeAssigneeChanged:
			fetchedNodeNew, err := newNode.Node(ctx)
			require.NoError(t, err)
			require.Nil(t, oldNode)
			require.Equal(t, a.NewValue, strconv.Itoa(u.ID))
			require.Empty(t, a.OldValue)
			require.Equal(t, fetchedNodeNew.ID, u.ID)
		case activity.ActivityTypeStatusChanged:
			require.EqualValues(t, a.NewValue, workorder.StatusPending)
			require.EqualValues(t, a.OldValue, workorder.StatusPlanned)
			require.Nil(t, newNode)
			require.Nil(t, oldNode)
		case activity.ActivityTypePriorityChanged:
			require.EqualValues(t, a.NewValue, workorder.PriorityHigh)
			require.EqualValues(t, a.OldValue, workorder.PriorityNone)
			require.Nil(t, newNode)
			require.Nil(t, oldNode)
		default:
			require.Fail(t, "unsupported changed field %v", a.ActivityType)
		}
	}
	require.Equal(t, 4, newCount)
}
