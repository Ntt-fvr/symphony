// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/treshold"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type tresholdResolver struct{}

func (tresholdResolver) Rule(ctx context.Context, treshold *ent.Treshold) ([]*ent.Rule, error) {
	variable, err := treshold.Ruletreshold(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a rule valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (tresholdResolver) Kpi(ctx context.Context, treshold *ent.Treshold) (*ent.Kpi, error) {
	variable, err := treshold.Kpi(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a kpi valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddTreshold(ctx context.Context, input models.AddTresholdInput) (*ent.Treshold, error) {
	client := r.ClientFrom(ctx)

	typ, err := client.
		Treshold.Create().
		SetName(input.Name).
		SetStatus(input.Status).
		SetDescription(input.Description).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A Treshold with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating Treshold: %w", err)
	}
	if input.Kpi != nil {
		typ, err = client.
			Treshold.UpdateOne(typ).
			SetKpiID(*input.Kpi).
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A Treshold with the name %v already exists", input.Name)
			}
			return nil, fmt.Errorf("creating Treshold: %w", err)
		}
	}

	return typ, nil
}

func (r mutationResolver) RemoveTreshold(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Treshold.Query().
		Where(
			treshold.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Treshold.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditTreshold(ctx context.Context, input models.EditTresholdInput) (*ent.Treshold, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Treshold.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A Treshold with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating Treshold: id=%q", input.ID)
	}
	if input.Name != et.Name || input.Description != et.Description || input.Status != et.Status {

		if et, err = client.Treshold.
			UpdateOne(et).
			SetName(input.Name).
			SetDescription(input.Description).
			SetStatus(input.Status).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A Treshold with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating Treshold name")
		}
	}
	return et, nil
}
