// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/counter"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type counterResolver struct{}

func (counterResolver) Countervendorformula(ctx context.Context, counter *ent.Counter) ([]*ent.CounterVendorFormula, error) {
	var counterVendorFormula []*ent.CounterVendorFormula
	return counterVendorFormula, nil
}

func (r mutationResolver) AddCounter(ctx context.Context, input models.AddCounterInput) (*ent.Counter, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Counter.Create().
		SetName(input.Name).
		SetExternalId(input.ExternalID).
		SetNetworkManagerSystem(input.NetworkManagerSystem).
		SetCounterfamilyID(input.CounterFamily).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveCounter(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Counter.Query().
		Where(
			counter.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Counter.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditCounter(ctx context.Context, input models.EditCounterInput) (*ent.Counter, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Counter.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	if input.Name != et.Name {
		if et, err = client.Counter.
			UpdateOne(et).
			SetName(input.Name).
			SetExternalId(input.ExternalID).
			SetNetworkManagerSystem(input.NetworkManagerSystem).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
