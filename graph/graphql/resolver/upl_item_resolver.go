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
	"go.uber.org/zap"
)

type uplItemResolver struct{}

func (uplItemResolver) UplID(ctx context.Context, uplItem *ent.UplItem) (*ent.Upl, error) {
	variable, err := uplItem.Upl(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return variable, nil
}

func (r mutationResolver) AddUplItem(
	ctx context.Context, parentSetter func(ptc *ent.UplItemCreate), inputs ...*models.AddUplItemInput,
) error {

	var (
		client   = r.ClientFrom(ctx).UplItem
		builders = make([]*ent.UplItemCreate, len(inputs))
	)

	for i, input := range inputs {
		builders[i] = client.Create().
			SetExternalid(input.ExternalID).
			SetUnit(input.Unit).
			SetItem(input.Item).
			SetPrice(input.Price)
		parentSetter(builders[i])
	}
	if _, err := client.CreateBulk(builders...).Save(ctx); err != nil {
		r.logger.For(ctx).
			Error("cannot create resource property types",
				zap.Error(err),
			)
		return err
	}
	return nil
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

func (r mutationResolver) UpdateUplItem(ctx context.Context, input *models.AddUplItemInput, uplItemID int) error {

	// uplItems, _ := r.ClientFrom(ctx).UplItem.Query().
	// 	Where(uplitem.HasUplWith(upl.ID(uplID))).
	// 	All(ctx)
	// var uplitemID int
	// for _, uplItem := range uplItems {
	// 	uplitemID = uplItem.ID
	// }

	query := r.ClientFrom(ctx).UplItem.
		UpdateOneID(uplItemID).
		SetExternalid(input.ExternalID).
		SetItem(input.Item).
		SetPrice(input.Price)

	if err := query.Exec(ctx); err != nil {
		return errors.Wrap(err, "updating property type")
	}
	return nil
}
