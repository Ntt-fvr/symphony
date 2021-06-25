// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/countervendorformula"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type counterVendorFormulaResolver struct{}

func (counterVendorFormulaResolver) CounterFk(ctx context.Context, counterVendorFormula *ent.CounterVendorFormula) (*ent.Counter, error) {
	variable, err := counterVendorFormula.Counter(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a counter valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (counterVendorFormulaResolver) VendorFk(ctx context.Context, counterVendorFormula *ent.CounterVendorFormula) (*ent.Vendor, error) {
	variable, err := counterVendorFormula.Vendor(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a vendor valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (counterVendorFormulaResolver) FormulaFk(ctx context.Context, counterVendorFormula *ent.CounterVendorFormula) (*ent.Formula, error) {
	variable, err := counterVendorFormula.Formula(ctx)
	if err != nil {
		return nil, fmt.Errorf("no return a vendor valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddCounterVendorFormula(ctx context.Context, input models.AddCounterVendorFormulaInput) (*ent.CounterVendorFormula, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.CounterVendorFormula.Create().
		SetCounterID(input.CounterFk).
		SetVendorID(input.VendorFk).
		SetFormulaID(input.FormulaFk).
		SetMandatory(input.Mandatory).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A CounterVendorFormula with the parameters %v %x %z already exists", input.CounterFk, input.VendorFk, input.FormulaFk)
		}
		return nil, fmt.Errorf("creating CounterVendorFormula: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) EditCounterVendorFormula(ctx context.Context, input models.EditCounterVendorFormulaInput) (*ent.CounterVendorFormula, error) {
	client := r.ClientFrom(ctx)
	et, err := client.CounterVendorFormula.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A counter with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating counter: id=%q", input.ID)
	}

	if input.FormulaFk != et.Edges.Formula.ID ||
		input.VendorFk != et.Edges.Vendor.ID ||
		input.CounterFk != et.Edges.Counter.ID {
		if et, err = client.CounterVendorFormula.
			UpdateOne(et).
			SetCounterID(input.CounterFk).
			SetVendorID(input.VendorFk).
			SetFormulaID(input.FormulaFk).
			SetMandatory(input.Mandatory).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A CounterVendorFormula with the parameters %v %x %z already exists", input.CounterFk, input.VendorFk, input.FormulaFk)
			}
			return nil, errors.Wrap(err, "updating counter vendor formula entity")
		}
	}
	return et, nil
}

func (r mutationResolver) RemoveCounterVendorFormula(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.CounterVendorFormula.Query().
		Where(
			countervendorformula.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying counterVendorFormula: id=%q", id)
	}

	if err := client.CounterVendorFormula.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting counterVendorFormula")
	}
	return id, nil
}
