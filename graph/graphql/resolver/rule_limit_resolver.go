// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/rulelimit"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ruleLimitResolver struct{}

func (ruleLimitResolver) Comparator(ctx context.Context, ruleLimit *ent.RuleLimit) (*ent.Comparator, error) {
	variable, err := ruleLimit.Comparator(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a comparator valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (ruleLimitResolver) Rule(ctx context.Context, ruleLimit *ent.RuleLimit) (*ent.Rule, error) {
	variable, err := ruleLimit.Rule(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a rule valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddRuleLimit(ctx context.Context, input models.AddRuleLimitInput) (*ent.RuleLimit, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		RuleLimit.Create().
		SetName(input.Name).
		SetLimitType(input.LimitType).
		SetComparatorID(input.Comparator).
		SetRuleID(input.Rule).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A RuleLimit with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating RuleLimit: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRuleLimit(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.RuleLimit.Query().
		Where(
			rulelimit.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.RuleLimit.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditRuleLimit(ctx context.Context, input models.EditRuleLimitInput) (*ent.RuleLimit, error) {
	client := r.ClientFrom(ctx)
	et, err := client.RuleLimit.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A RuleLimit with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating RuleLimit: id=%q", input.ID)
	}

	var name, limit = et.Name, et.LimitType
	var comparator2, erro = et.Comparator(ctx)
	var comparator int
	if erro == nil && comparator2 != nil {
		comparator = comparator2.ID
	} else {
		return nil, errors.Wrap(erro, "updating RuleLimit name")
	}

	var rule2, erro2 = et.Rule(ctx)
	var rule int
	if erro2 == nil && rule2 != nil {
		rule = rule2.ID
	} else {
		return nil, errors.Wrap(erro2, "updating RuleLimit name")
	}

	var change = false
	if name != input.Name {
		name = input.Name
		change = true
	}
	if limit != input.LimitType {
		limit = input.LimitType
		change = true
	}
	if (comparator2 != nil && comparator2.ID != input.Comparator) || comparator2 == nil {
		comparator = input.Comparator
		change = true
	}
	if (rule2 != nil && rule2.ID != input.Comparator) || rule2 == nil {
		rule = input.Rule
		change = true
	}

	if change {

		if et, err = client.RuleLimit.
			UpdateOne(et).
			SetName(name).
			SetLimitType(limit).
			SetComparatorID(comparator).
			SetRuleID(rule).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A RuleLimit with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating RuleLimit name")
		}
	}
	return et, nil
}
