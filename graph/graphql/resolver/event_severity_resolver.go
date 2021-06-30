// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/eventseverity"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type eventSeverityResolver struct{}

func (eventSeverityResolver) Event(ctx context.Context, eventSeverity *ent.EventSeverity) ([]*ent.Event, error) {
	variable, err := eventSeverity.Eventseverityevent(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a event severity valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddEventSeverity(ctx context.Context, input models.AddEventSeverityInput) (*ent.EventSeverity, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		EventSeverity.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A EventSeverity with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating EventSeverity: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveEventSeverity(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.EventSeverity.Query().
		Where(
			eventseverity.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.EventSeverity.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditEventSeverity(ctx context.Context, input models.EditEventSeverityInput) (*ent.EventSeverity, error) {
	client := r.ClientFrom(ctx)
	et, err := client.EventSeverity.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A EventSeverity with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating EventSeverity: id=%q", input.ID)
	}
	if input.Name != et.Name {

		if et, err = client.EventSeverity.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A EventSeverity with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating EventSeverity name")
		}
	}
	return et, nil
}
