// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/cost"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type costResolver struct{}

func (costResolver) WorkOrder(ctx context.Context, cost *ent.Cost) (*ent.WorkOrder, error) {
	variable, err := cost.Workorder(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (costResolver) UplItem(ctx context.Context, cost *ent.Cost) (*ent.UplItem, error) {
	variable, err := cost.Uplitem(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (r mutationResolver) AddCost(
	ctx context.Context, parentSetter func(ptc *ent.CostCreate), inputs ...*models.AddCostInput,
) error {

	var (
		client   = r.ClientFrom(ctx).Cost
		builders = make([]*ent.CostCreate, len(inputs))
	)

	for i, input := range inputs {
		builders[i] = client.Create().
			SetItem(input.Item).
			SetUnit(input.Unit).
			SetPrice(input.Price).
			SetQuantity(input.Quantity).
			SetTotal(input.Total).
			SetUplitemID(input.Uplitem)
		parentSetter(builders[i])
	}
	if _, err := client.CreateBulk(builders...).Save(ctx); err != nil {
		r.logger.For(ctx).
			Error("cannot create cost",
				zap.Error(err),
			)
		return err
	}
	return nil
}

func (r mutationResolver) RemoveCost(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Cost.Query().
		Where(
			cost.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Cost.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) UpdateCost(ctx context.Context, input *models.AddCostInput, costID int) error {

	query := r.ClientFrom(ctx).Cost.
		UpdateOneID(costID).
		SetItem(input.Item).
		SetUnit(input.Unit).
		SetPrice(input.Price).
		SetQuantity(input.Quantity).
		SetUplitemID(input.Uplitem)

	if err := query.Exec(ctx); err != nil {
		return errors.Wrap(err, "updating cost")
	}
	return nil
}
