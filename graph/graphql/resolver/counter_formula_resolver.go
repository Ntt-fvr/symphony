// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/counterformula"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type counterFormulaResolver struct{}

func (counterFormulaResolver) CounterFk(ctx context.Context, counterFormula *ent.CounterFormula) (*ent.Counter, error) {
	variable, err := counterFormula.Counter(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (counterFormulaResolver) FormulaFk(ctx context.Context, counterFormula *ent.CounterFormula) (*ent.Formula, error) {
	variable, err := counterFormula.Formula(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddCounterFormula(ctx context.Context, input models.AddCounterFormulaInput) (*ent.CounterFormula, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.CounterFormula.Create().
		SetCounterID(input.CounterFk).
		SetFormulaID(input.FormulaFk).
		SetMandatory(input.Mandatory).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) EditCounterFormula(ctx context.Context, input models.EditCounterFormulaInput) (*ent.CounterFormula, error) {
	client := r.ClientFrom(ctx)
	et, err := client.CounterFormula.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "updating counter: id=%q", input.ID)
	}

	if input.FormulaFk != et.Edges.Formula.ID ||
		input.CounterFk != et.Edges.Counter.ID {
		if et, err = client.CounterFormula.
			UpdateOne(et).
			SetCounterID(input.CounterFk).
			SetFormulaID(input.FormulaFk).
			SetMandatory(input.Mandatory).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}

func (r mutationResolver) RemoveCounterFormula(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.CounterFormula.Query().
		Where(
			counterformula.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}

	if err := client.CounterFormula.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}
