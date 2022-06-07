// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/contract"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type contractResolver struct{}

func (r mutationResolver) AddContract(ctx context.Context, input models.AddContractInput) (*ent.Contract, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Contract.Create().
		SetExternalID(input.ExternalID).
		SetName(input.Name).
		SetOrganizationID(input.Organization).
		SetCategory(input.Category).
		SetEffectiveDate(input.EffectiveDate).
		SetExpirationDate(input.ExpirationDate).
		SetDescription(input.Description).
		SetStatus(input.Status).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveContract(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Contract.Query().
		Where(
			contract.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	// TODO: borrar o editar los edges relacionados

	if err := client.Contract.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}

func (r mutationResolver) EditContract(ctx context.Context, input models.EditContractInput) (*ent.Contract, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Contract.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}

	if input.ExternalID != et.ExternalID || input.Name != et.Name || input.Organization != et.Edges.Organization.ID ||
		input.Category != et.Category || input.ExpirationDate != et.ExpirationDate || input.Description != et.Description {
		if et, err = client.Contract.
			UpdateOne(et).
			SetExternalID(input.ExternalID).
			SetName(input.Name).
			SetOrganizationID(input.Organization).
			SetCategory(input.Category).
			SetExpirationDate(input.ExpirationDate).
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
