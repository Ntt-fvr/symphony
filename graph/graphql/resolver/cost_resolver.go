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
	"github.com/vektah/gqlparser/v2/gqlerror"
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

func (r mutationResolver) AddCost(ctx context.Context, input models.AddCostInput) (*ent.Cost, error) {
	client := r.ClientFrom(ctx)
	fam, err := client.
		Cost.Create().
		SetItem(input.Item).
		SetUnit(input.Unit).
		SetPrice(input.Price).
		SetQuantity(input.Quantity).
		SetUplitemID(input.Uplitem).
		SetWorkorderID(input.Workorder).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return fam, nil
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

func (r mutationResolver) EditCost(ctx context.Context, input models.EditCostInput) (*ent.Cost, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Cost.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	var uplitemid int
	var uplitem, err1 = et.Uplitem(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has occurred error on process: %v")
	} else if uplitem != nil {
		uplitemid = uplitem.ID
	}
	var workorderid int
	var workorder, err2 = et.Workorder(ctx)
	if err2 != nil {
		return nil, errors.Wrap(err1, "has occurred error on process: %v")
	} else if uplitem != nil {
		workorderid = workorder.ID
	}
	if input.Item != et.Item || input.Unit != et.Unit || input.Price != et.Price ||
		input.Price != et.Price || input.Quantity != et.Quantity || input.Uplitem != uplitemid || input.Workorder != workorderid {
		if et, err = client.Cost.
			UpdateOne(et).
			SetItem(input.Item).
			SetUnit(input.Unit).
			SetPrice(input.Price).
			SetQuantity(input.Quantity).
			SetUplitemID(input.Uplitem).
			SetWorkorderID(input.Workorder).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}

	return et, nil
}
