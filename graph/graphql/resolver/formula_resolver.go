// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/formula"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type formulaResolver struct{}

func (formulaResolver) TechFk(ctx context.Context, formula *ent.Formula) (*ent.Tech, error) {
	variable, err := formula.Tech(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a tech valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (formulaResolver) KpiFk(ctx context.Context, formula *ent.Formula) (*ent.Kpi, error) {
	variable, err := formula.Kpi(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a kpi valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (formulaResolver) CountervendorformulaFk(ctx context.Context, formula *ent.Formula) ([]*ent.CounterVendorFormula, error) {
	variable, err := formula.Countervendorformula(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a kpi valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddFormula(ctx context.Context, input models.AddFormulaInput) (*ent.Formula, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Formula.Create().
		SetName(input.Name).
		SetActive(input.Active).
		SetKpiID(input.KpiFk).
		SetTechID(input.TechFk).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A formula with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating formula: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveFormula(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Formula.Query().
		Where(
			formula.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying formula: id=%q", id)
	}
	if err := client.Formula.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting formula")
	}
	return id, nil
}

func (r mutationResolver) EditFormula(ctx context.Context, input models.EditFormulaInput) (*ent.Formula, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Formula.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A formula with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating formula: id=%q", input.ID)
	}
	if input.Name != et.Name || input.Active != et.Active || input.KpiFk != et.Edges.Kpi.ID || input.TechFk != et.Edges.Tech.ID {
		if et, err = client.Formula.
			UpdateOne(et).
			SetName(input.Name).
			SetActive(input.Active).
			SetKpiID(input.KpiFk).
			SetTechID(input.TechFk).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A formula with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating formula name")
		}
	}
	return et, nil
}
