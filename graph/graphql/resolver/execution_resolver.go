// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/execution"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type executionResolver struct{}

func (executionResolver) UserFk(ctx context.Context, execution *ent.Execution) (*ent.User, error) {
	variable, err := execution.User(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (r mutationResolver) AddExecution(ctx context.Context, input models.AddExecutionInput) (*ent.Execution, error) {
	client := r.ClientFrom(ctx)
	fam, err := client.
		Execution.Create().
		SetManualConfirmation(input.ManualConfirmation).
		SetUserID(input.UserFk).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return fam, nil
}

func (r mutationResolver) RemoveExecution(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Execution.Query().
		Where(
			execution.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}

	// TODO: Borrar validar formulas relation/edge.

	if err := client.Execution.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditExecution(ctx context.Context, input models.EditExecutionInput) (*ent.Execution, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Execution.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	var userid int
	var user, err1 = et.User(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has occurred error on process: %v")
	} else if user != nil {
		userid = user.ID
	}
	if input.ManualConfirmation != et.ManualConfirmation || input.UserFk != userid {
		if et, err = client.Execution.
			UpdateOne(et).
			SetManualConfirmation(input.ManualConfirmation).
			SetUserID(input.UserFk).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}

	return et, nil
}
