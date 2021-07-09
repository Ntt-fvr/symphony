// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/event"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type eventResolver struct{}

func (eventResolver) EventSeverity(ctx context.Context, event *ent.Event) (*ent.EventSeverity, error) {
	variable, err := event.Eventseverity(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (eventResolver) Rule(ctx context.Context, event *ent.Event) ([]*ent.Rule, error) {
	variable, err := event.RuleEvent(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddEvent(ctx context.Context, input models.AddEventInput) (*ent.Event, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Event.Create().
		SetName(input.Name).
		SetEventTypeName(input.EventTypeName).
		SetSpecificProblem(input.SpecificProblem).
		SetAdditionalInfo(input.AdditionalInfo).
		SetEventseverityID(input.EventSeverity).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveEvent(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Event.Query().
		Where(
			event.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Event.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditEvent(ctx context.Context, input models.EditEventInput) (*ent.Event, error) {
	client := r.ClientFrom(ctx)
	logger := r.logger.For(ctx)
	et, err := client.Event.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}

	var name, tpe, problem, info = et.Name, et.EventTypeName, et.SpecificProblem, et.AdditionalInfo
	var evst2, erro = et.Eventseverity(ctx)
	var evsp int
	if erro == nil && evst2 != nil {
		evsp = evst2.ID
	} else {
		return nil, errors.Wrap(erro, "has ocurred error on proces: %w")
	}
	var change = false

	logger.Info("name :" + name)
	logger.Info("tpe :" + tpe)
	logger.Info("problem :" + problem)
	logger.Info("info :" + info)
	logger.Info("evsp :" + fmt.Sprint(evsp))
	if name != input.Name {
		name = input.Name
		change = true
	}
	if tpe != input.EventTypeName {
		tpe = input.EventTypeName
		change = true
	}
	if problem != input.SpecificProblem {
		problem = input.SpecificProblem
		change = true
	}
	if info != input.AdditionalInfo {
		info = input.AdditionalInfo
		change = true
	}
	if (evst2 != nil && evst2.ID != input.EventSeverity) || evst2 == nil {
		evsp = input.EventSeverity
		change = true
	}

	if change {

		if et, err = client.Event.
			UpdateOne(et).
			SetName(name).
			SetEventTypeName(tpe).
			SetSpecificProblem(problem).
			SetAdditionalInfo(info).
			SetEventseverityID(evsp).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
