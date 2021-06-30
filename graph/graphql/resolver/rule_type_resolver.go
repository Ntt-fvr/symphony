// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/ruletype"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ruleTypeResolver struct{}

func (ruleTypeResolver) Rule(ctx context.Context, ruleType *ent.RuleType) ([]*ent.Rule, error) {
	variable, err := ruleType.Ruletyperule(ctx)

	if err != nil {
		return nil, fmt.Errorf("no rule a rule limit valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddRuleType(ctx context.Context, input models.AddRuleTypeInput) (*ent.RuleType, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		RuleType.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A RuleType with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating RuleType: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRuleType(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.RuleType.Query().
		Where(
			ruletype.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.RuleType.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditRuleType(ctx context.Context, input models.EditRuleTypeInput) (*ent.RuleType, error) {
	client := r.ClientFrom(ctx)
	et, err := client.RuleType.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A RuleType with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating RuleType: id=%q", input.ID)
	}
	if input.Name != et.Name {

		if et, err = client.RuleType.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A RuleType with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating RuleType name")
		}
	}
	return et, nil
}
