// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/upl"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type uplResolver struct{}

func (r mutationResolver) AddUpl(ctx context.Context, input models.AddUplInput) (*ent.Upl, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Upl.Create().
		SetName(input.Name).
		SetDescription(input.Description).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveUpl(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Upl.Query().
		Where(
			upl.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	// TODO: borrar o editar los edges relacionados
	if err := client.Upl.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditUpl(ctx context.Context, input models.EditUplInput) (*ent.Upl, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Upl.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	if input.Name != et.Name || input.Description != et.Description {
		if et, err = client.Upl.
			UpdateOne(et).
			SetName(input.Name).
			SetDescription(input.Description).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
