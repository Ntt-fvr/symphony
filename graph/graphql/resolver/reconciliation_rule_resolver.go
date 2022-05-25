// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/reconciliationrule"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type reconciliationRuleResolver struct{}

func (r mutationResolver) AddReconciliationRule(ctx context.Context, input models.AddReconciliationRuleInput) (*ent.ReconciliationRule, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ReconciliationRule.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveReconciliationRule(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ReconciliationRule.Query().
		Where(
			reconciliationrule.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ReconciliationRule.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditReconciliationRule(ctx context.Context, input models.EditReconciliationRuleInput) (*ent.ReconciliationRule, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ReconciliationRule.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}

	if input.Name != et.Name {
		if et, err = client.ReconciliationRule.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
