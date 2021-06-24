// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/tech"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type techResolver struct{}

func (techResolver) DomainFk(ctx context.Context, tech *ent.Tech) (*ent.Domain, error) {
	variable, err := tech.Domain(ctx)

	if err != nil {
		return nil, fmt.Errorf("no return a domain valid to id, %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddTech(ctx context.Context, input models.AddTechInput) (*ent.Tech, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Tech.Create().
		SetName(input.Name).
		SetDomainID(input.DomainFk).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A tech with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating tech: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveTech(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Tech.Query().
		Where(
			tech.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying tech: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Tech.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting tech")
	}
	return id, nil
}

func (r mutationResolver) EditTech(ctx context.Context, input models.EditTechInput) (*ent.Tech, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Tech.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A tech with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating tech: id=%q", input.ID)
	}
	if input.Name != et.Name || input.DomainFk != et.Edges.Domain.ID {
		if et, err = client.Tech.
			UpdateOne(et).
			SetName(input.Name).
			SetDomainID(input.DomainFk).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A tech with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating tech name")
		}
	}
	return et, nil
}
