// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/action"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type actionResolver struct{}

func (r mutationResolver) AddAction(ctx context.Context, input models.AddActionInput) (*ent.Action, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Action.Create().
		SetExecutionID(input.Execution).
		SetRuleactionID(input.RuleAction).
		SetStatus(input.Status).
		SetUserAction(input.UserAction).
		SetLogExecution(input.LogExecution).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveAction(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Action.Query().
		Where(
			action.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Action.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditAction(ctx context.Context, input models.EditActionInput) (*ent.Action, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Action.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var actionStatus, actionUserAction = et.Status, et.UserAction
	var change = false
	if *input.Status != et.Status {
		actionStatus = *input.Status
		change = true
	}
	if *input.UserAction != et.UserAction {
		actionUserAction = *input.UserAction
		change = true
	}
	if change {
		if et, err = client.Action.
			UpdateOne(et).
			SetExecutionID(*input.Execution).
			SetRuleactionID(*input.RuleAction).
			SetStatus(actionStatus).
			SetUserAction(actionUserAction).
			SetLogExecution(*input.LogExecution).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
