// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/ruleaction"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ruleActionResolver struct{}

func (ruleActionResolver) ReconciliationRule(ctx context.Context, ruleAction *ent.RuleAction) (*ent.ReconciliationRule, error) {
	variable, err := ruleAction.Reconciliationrule(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (ruleActionResolver) RuleActionTemplate(ctx context.Context, ruleAction *ent.RuleAction) (*ent.RuleActionTemplate, error) {
	variable, err := ruleAction.Ruleactiontemplate(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (r mutationResolver) AddRuleAction(ctx context.Context, input models.AddRuleActionInput) (*ent.RuleAction, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		RuleAction.Create().
		SetOperation(input.Operation).
		SetReconciliationruleID(input.ReconciliationRule).
		SetRuleactiontemplateID(input.RuleActionTemplate).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRuleAction(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.RuleAction.Query().
		Where(
			ruleaction.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.RuleAction.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditRuleAction(ctx context.Context, input models.EditRuleActionInput) (*ent.RuleAction, error) {
	client := r.ClientFrom(ctx)
	et, err := client.RuleAction.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	var reconciliation_ruleid int
	var reconciliationRule, err1 = et.Reconciliationrule(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has occurred error on process: %v")
	} else if reconciliationRule != nil {
		reconciliation_ruleid = reconciliationRule.ID
	}
	var rule_action_templateid int
	var ruleActionTemplate, err2 = et.Ruleactiontemplate(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err2, "has occurred error on process: %v")
	} else if ruleActionTemplate != nil {
		rule_action_templateid = ruleActionTemplate.ID
	}
	if input.Operation != et.Operation || input.ReconciliationRule != reconciliation_ruleid || input.RuleActionTemplate != rule_action_templateid {
		if et, err = client.RuleAction.
			UpdateOne(et).
			SetOperation(input.Operation).
			SetReconciliationruleID(input.ReconciliationRule).
			SetRuleactiontemplateID(input.RuleActionTemplate).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
