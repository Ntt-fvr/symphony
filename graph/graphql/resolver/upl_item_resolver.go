// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/uplitem"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type uplItemResolver struct{}

func (r mutationResolver) AddUplItem(ctx context.Context, input models.AddUplItemInput) (*ent.UplItem, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		UplItem.Create().
		SetExternalid(input.ExternalID).
		SetItem(input.Item).
		SetUnit(input.Unit).
		SetPrice(input.Price).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveUplItem(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.UplItem.Query().
		Where(
			uplitem.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.UplItem.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditUplItem(ctx context.Context, input models.EditUplItemInput) (*ent.UplItem, error) {
	client := r.ClientFrom(ctx)
	et, err := client.UplItem.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	if input.ExternalID != et.Externalid || input.Item != et.Item ||
		input.Unit != et.Unit || input.Price != et.Price {
		if et, err = client.UplItem.
			UpdateOne(et).
			SetExternalid(input.ExternalID).
			SetItem(input.Item).
			SetUnit(input.Unit).
			SetPrice(input.Price).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}

	return et, nil
}
