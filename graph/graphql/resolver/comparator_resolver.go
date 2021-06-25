// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/comparator"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type comparatorResolver struct{}

func (comparatorResolver) RuleLimit(ctx context.Context, counter *ent.Comparator) ([]*ent.RuleLimit, error) {
	var response []*ent.RuleLimit
	return response, nil
}

func (r mutationResolver) AddComparator(ctx context.Context, input models.AddComparatorInput) (*ent.Comparator, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Comparator.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A Comparator with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating Comparator: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveComparator(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Comparator.Query().
		Where(
			comparator.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counter: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Comparator.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counter")
	}
	return id, nil
}

func (r mutationResolver) EditComparator(ctx context.Context, input models.EditComparatorInput) (*ent.Comparator, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Comparator.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A Comparator with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating Comparator: id=%q", input.ID)
	}
	if input.Name != et.Name {

		if et, err = client.Comparator.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A Comparator with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating Comparator name")
		}
	}
	return et, nil
}
