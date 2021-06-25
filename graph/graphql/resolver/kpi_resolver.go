// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/kpi"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type kpiResolver struct{}

func (r kpiResolver) DomainFk(ctx context.Context, kpi *ent.Kpi) (*ent.Domain, error) {
	variable, err := kpi.Domain(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a domain valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (kpiResolver) FormulaFk(ctx context.Context, kpi *ent.Kpi) ([]*ent.Formula, error) {
	variable, err := kpi.Formulakpi(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a kpi valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddKpi(ctx context.Context, input models.AddKpiInput) (*ent.Kpi, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Kpi.Create().
		SetName(input.Name).
		SetDomainID(input.DomainFk).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A kpi with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating kpi: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveKpi(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Kpi.Query().
		Where(
			kpi.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying kpi: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Kpi.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting kpi")
	}
	return id, nil
}

func (r mutationResolver) EditKpi(ctx context.Context, input models.EditKpiInput) (*ent.Kpi, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Kpi.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A kpi with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating kpi: id=%q", input.ID)
	}
	if input.Name != et.Name || input.DomainFk != et.Edges.Domain.ID {
		if et, err = client.Kpi.
			UpdateOne(et).
			SetName(input.Name).
			SetDomainID(input.DomainFk).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A kpi with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating kpi name")
		}
	}
	return et, nil
}
