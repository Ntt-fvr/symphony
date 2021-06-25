// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/vendor"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type vendorResolver struct{}

func (r mutationResolver) AddVendor(ctx context.Context, input models.AddVendorInput) (*ent.Vendor, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Vendor.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A vendor with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating vendor: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveVendor(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Vendor.Query().
		Where(
			vendor.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying vendor: id=%q", id)
	}
	// TODO: borrar o editar los edges relacionados
	if err := client.Vendor.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting vendor")
	}
	return id, nil
}

func (r mutationResolver) EditVendor(ctx context.Context, input models.EditVendorInput) (*ent.Vendor, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Vendor.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A vendor with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating vendor: id=%q", input.ID)
	}
	if input.Name != et.Name {
		if et, err = client.Vendor.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A vendor with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating vendor name")
		}
	}

	// TODO: editar los edges relacionados

	return et, nil
}
