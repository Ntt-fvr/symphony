// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/counterfamily"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type counterFamilyResolver struct{}

/*func (counterFamilyResolver) Name(_ context.Context, counterFamily *ent.CounterFamily) (string, error) {
	return "", nil
}*/

func (counterFamilyResolver) Counter(ctx context.Context, counterFamily *ent.CounterFamily) ([]*ent.Counter, error) {
	var counter []*ent.Counter
	return counter, nil
}

//*
func (r mutationResolver) AddCounterFamily(ctx context.Context, input models.AddCounterFamilyInput) (*ent.CounterFamily, error) {
	client := r.ClientFrom(ctx)
	fam, err := client.
		CounterFamily.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A counter family with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating counter family: %w", err)
	}

	// TODO: agregar counters

	return fam, nil
}

func (r mutationResolver) RemoveCounterFamily(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.CounterFamily.Query().
		Where(
			counterfamily.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter family: id=%q", id)
	}

	// TODO: Borrar validar formulas relation/edge.

	if err := client.CounterFamily.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter family")
	}
	return id, nil
}

func (r mutationResolver) EditCounterFamily(ctx context.Context, input models.EditCounterFamilyInput) (*ent.CounterFamily, error) {
	client := r.ClientFrom(ctx)
	et, err := client.CounterFamily.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A counter with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating counter: id=%q", input.ID)
	}
	// TODO: borrar o editar los edges relacionados
	if input.Name != et.Name {
		if et, err = client.CounterFamily.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A Counter Family with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating counter name")
		}
	}

	return et, nil
}

//*/
