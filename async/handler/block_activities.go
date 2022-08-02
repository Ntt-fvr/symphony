// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"strconv"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/automationactivity"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
)

func updateBlockActivitiesCreate(ctx context.Context, entry *event.LogEntry) error {
	client := ent.FromContext(ctx)
	userID := entry.UserID
	_, err := client.AutomationActivity.Create().
		SetActivityType(automationactivity.ActivityTypeCreation).
		SetAutomationEntityType(automationactivity.AutomationEntityTypeBlockInstance).
		SetNewValue(strconv.FormatInt(entry.Time.Unix(), 10)).
		SetAuthorID(*userID).
		Save(ctx)
	if err != nil {
		return err
	}

	return nil
}

func updateBlockActivitiesUpdate(ctx context.Context, entry *event.LogEntry) error {
	client := ent.FromContext(ctx)

	newVal, oldVal, shouldUpdate := event.GetStringDiffValuesField(entry, block.FieldBody)
	if shouldUpdate {
		_, err := client.AutomationActivity.Create().
			SetActivityType(automationactivity.ActivityTypeStatus).
			SetAutomationEntityType(automationactivity.AutomationEntityTypeBlockInstance).
			SetBlockInstanceID(entry.CurrState.ID).
			SetNillableOldValue(oldVal).
			SetNillableNewValue(newVal).
			Save(ctx)
		if err != nil {
			return err
		}
	}
	return nil
}

func HandleBlockActivities(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	var err error
	entry, ok := evt.(event.LogEntry)
	if !ok || entry.Type != ent.TypeWorkOrder {
		return nil
	}
	if entry.Operation.Is(ent.OpCreate) {
		err = updateBlockActivitiesCreate(ctx, &entry)
	} else if entry.Operation.Is(ent.OpUpdate | ent.OpUpdateOne) {
		err = updateBlockActivitiesUpdate(ctx, &entry)
	}
	if err != nil {
		return err
	}
	return nil
}
