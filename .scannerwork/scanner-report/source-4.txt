// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"strconv"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/automationactivity"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
)

func updateFlowActivitiesCreate(ctx context.Context, entry *event.LogEntry) error {
	client := ent.FromContext(ctx)
	userID := entry.UserID
	_, err := client.AutomationActivity.Create().
		SetActivityType(automationactivity.ActivityTypeCreation).
		SetAutomationEntityType(automationactivity.AutomationEntityTypeFlowInstance).
		SetNewValue(strconv.FormatInt(entry.Time.Unix(), 10)).
		SetAuthorID(*userID).
		SetFlowInstanceID(entry.CurrState.ID).
		Save(ctx)
	if err != nil {
		return err
	}

	return nil
}

func updateFlowActivitiesUpdate(ctx context.Context, entry *event.LogEntry) error {
	client := ent.FromContext(ctx)

	newVal, oldVal, shouldUpdate := event.GetStringDiffValuesField(entry, flow.FieldStatus)
	if shouldUpdate {
		_, err := client.AutomationActivity.Create().
			SetActivityType(automationactivity.ActivityTypeStatus).
			SetAutomationEntityType(automationactivity.AutomationEntityTypeFlowInstance).
			SetFlowInstanceID(entry.CurrState.ID).
			SetNillableOldValue(oldVal).
			SetNillableNewValue(newVal).
			Save(ctx)
		if err != nil {
			return err
		}
	}
	return nil
}

func HandleFlowActivities(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	var err error
	entry, ok := evt.(event.LogEntry)
	if !ok || entry.Type != ent.TypeFlowInstance {
		return nil
	}
	if entry.Operation.Is(ent.OpCreate) {
		err = updateFlowActivitiesCreate(ctx, &entry)
	} else if entry.Operation.Is(ent.OpUpdate | ent.OpUpdateOne) {
		err = updateFlowActivitiesUpdate(ctx, &entry)
	}
	if err != nil {
		return err
	}
	return nil
}
