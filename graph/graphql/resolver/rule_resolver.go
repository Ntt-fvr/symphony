// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/rule"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ruleResolver struct{}

func (ruleResolver) RuleLimit(ctx context.Context, rule *ent.Rule) ([]*ent.RuleLimit, error) {
	variable, err := rule.Rulelimitrule(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}
func (ruleResolver) RuleType(ctx context.Context, rule *ent.Rule) (*ent.RuleType, error) {
	variable, err := rule.Ruletype(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (ruleResolver) Event(ctx context.Context, rule *ent.Rule) (*ent.Event, error) {
	variable, err := rule.Event(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddRule(ctx context.Context, input models.AddRuleInput) (*ent.Rule, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Rule.Create().
		SetName(input.Name).
		SetGracePeriod(input.GracePeriod).
		SetStartDateTime(input.StartDateTime).
		SetEndDateTime(input.EndDateTime).
		SetTresholdID(input.Treshold).
		SetRuletypeID(input.RuleType).
		SetEventID(input.Event).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRule(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Rule.Query().
		Where(
			rule.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Rule.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditRule(ctx context.Context, input models.EditRuleInput) (*ent.Rule, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Rule.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	var eventid, rtypeid, tresholdid int
	var name, start, end, grace = et.Name, et.StartDateTime, et.EndDateTime, et.GracePeriod
	var event, err1 = et.Event(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %w")
	} else if event != nil {
		eventid = event.ID
	}
	var rtype, err2 = et.Event(ctx)
	if err2 != nil {
		return nil, errors.Wrap(err2, "has ocurred error on proces: %w")
	} else if rtype != nil {
		rtypeid = rtype.ID
	}
	var treshold, err3 = et.Event(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %w")
	} else if treshold != nil {
		tresholdid = treshold.ID
	}

	var change = false
	if name != input.Name {
		name = input.Name
		change = true
	}
	if start != *input.StartDateTime {
		start = *input.StartDateTime
		change = true
	}
	if end != *input.EndDateTime {
		end = *input.EndDateTime
		change = true
	}
	if grace != *input.GracePeriod {
		grace = *input.GracePeriod
		change = true
	}
	if (event != nil && event.ID != input.Event) || event == nil {
		eventid = input.Event
		change = true
	}
	if (rtype != nil && rtype.ID != input.RuleType) || rtype == nil {
		rtypeid = input.RuleType
		change = true
	}
	if (treshold != nil && treshold.ID != input.Treshold) || treshold == nil {
		tresholdid = input.Treshold
		change = true
	}

	if change {

		if et, err = client.Rule.
			UpdateOne(et).
			SetName(name).
			SetGracePeriod(grace).
			SetStartDateTime(start).
			SetEndDateTime(end).
			SetTresholdID(tresholdid).
			SetRuletypeID(rtypeid).
			SetEventID(eventid).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
