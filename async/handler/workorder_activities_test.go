// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"strconv"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

func TestAddWorkOrderActivities(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	c.Use(event.LogHook(HandleActivityLog, log.NewNopLogger()))
	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()

	now := time.Now()
	typ := c.WorkOrderType.Create().
		SetName("Chore").
		SaveX(ctx)
	wo := c.WorkOrder.Create().
		SetName("wo1").
		SetType(typ).
		SetCreationDate(now).
		SetAssignee(u).
		SetOwner(u).
		SaveX(ctx)
	require.Equal(t, wo.Name, "wo1")
	activities := wo.QueryActivities().AllX(ctx)
	require.Len(t, activities, 5)
	for _, a := range activities {
		require.Equal(t, a.QueryAuthor().OnlyX(ctx).AuthID, u.AuthID)
		require.Equal(t, a.QueryWorkOrder().OnlyX(ctx).ID, wo.ID)
		switch a.ChangedField {
		case activity.ChangedFieldCreationDate:
			require.Empty(t, a.OldValue)
			require.Equal(t, a.NewValue, strconv.FormatInt(now.Unix(), 10))
			require.True(t, a.IsCreate)
		case activity.ChangedFieldOwner, activity.ChangedFieldAssignee:
			require.Empty(t, a.OldValue)
			require.Equal(t, a.NewValue, strconv.Itoa(u.ID))
			require.True(t, a.IsCreate)
		case activity.ChangedFieldStatus:
			require.Empty(t, a.OldValue)
			require.EqualValues(t, a.NewValue, workorder.StatusPlanned)
			require.True(t, a.IsCreate)
		case activity.ChangedFieldPriority:
			require.Empty(t, a.OldValue)
			require.EqualValues(t, a.NewValue, workorder.PriorityNone)
			require.True(t, a.IsCreate)
		default:
			require.Fail(t, "unsupported changed field")
		}
	}
}

func TestEditWorkOrderActivities(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	c.Use(event.LogHook(HandleActivityLog, log.NewNopLogger()))
	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()

	now := time.Now()
	typ := c.WorkOrderType.Create().
		SetName("Chore").
		SaveX(ctx)
	wo := c.WorkOrder.Create().
		SetName("wo2").
		SetType(typ).
		SetCreationDate(now).
		SetAssignee(u).
		SetOwner(u).
		SaveX(ctx)
	require.Equal(t, wo.Name, "wo2")
	activities := wo.QueryActivities().AllX(ctx)
	require.Len(t, activities, 5)
	u2 := c.User.Create().
		SetAuthID("123").
		SetRole(user.RoleUser).SaveX(ctx)
	c.WorkOrder.UpdateOne(wo).
		SetAssignee(u2).
		SetStatus(workorder.StatusPending).
		ExecX(ctx)

	activities = wo.QueryActivities().AllX(ctx)
	require.Len(t, activities, 7)
	newCount := 0
	for _, a := range activities {
		require.Equal(t, a.QueryAuthor().OnlyX(ctx).AuthID, u.AuthID)
		require.Equal(t, a.QueryWorkOrder().OnlyX(ctx).ID, wo.ID)
		if a.OldValue == "" {
			continue
		}
		newCount++
		switch a.ChangedField {
		case activity.ChangedFieldAssignee:
			require.Equal(t, a.NewValue, strconv.Itoa(u2.ID))
			require.False(t, a.IsCreate)
			require.Equal(t, a.OldValue, strconv.Itoa(u.ID))
		case activity.ChangedFieldStatus:
			require.EqualValues(t, a.NewValue, workorder.StatusPending)
			require.False(t, a.IsCreate)
			require.EqualValues(t, a.OldValue, workorder.StatusPlanned)
		default:
			require.Fail(t, "unsupported changed field")
		}
	}
	require.Equal(t, 2, newCount)
}
