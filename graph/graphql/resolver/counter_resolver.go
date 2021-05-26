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

/*func (counterResolver) Name(_ context.Context, counter *ent.Counter) (string, error) {
	return "", nil
}

func (counterResolver) ExternalID(_ context.Context, counter *ent.Counter) (string, error) {
	return "", nil
}*/

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
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A counter with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating counter: %w", err)
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
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Counter.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditCounter(ctx context.Context, input models.EditCounterInput) (*ent.Counter, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Counter.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A counter with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating counter: id=%q", input.ID)
	}
	if input.Name != et.Name {
		if et, err = client.Counter.
			UpdateOne(et).
			SetName(input.Name).
			SetExternalId(input.ExternalID).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A Counter with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating counter name")
		}
	}
	/*
		// TODO: validar formula
			for _, input := range input.PropertyTypes {
				if input.ID == nil {
					if err := r.validateAddedNewPropertyType(input); err != nil {
						return nil, err
					}
					if err := r.AddPropertyTypes(ctx,
						func(b *ent.PropertyTypeCreate) {
							b.SetWorkerTypeID(et.ID)
						}, input); err != nil {
						return nil, err
					}
				} else if err := r.updatePropType(ctx, input); err != nil {
					return nil, err
				}
			}
	*/
	return et, nil
}
