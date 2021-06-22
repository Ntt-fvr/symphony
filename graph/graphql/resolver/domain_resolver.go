// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/domain"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type domainResolver struct{}

func (domainResolver) Tech(ctx context.Context, domain *ent.Domain) ([]*ent.Tech, error) {
	var tech []*ent.Tech
	return tech, nil
}

func (domainResolver) Kpi(ctx context.Context, domain *ent.Domain) ([]*ent.Kpi, error) {
	var kpi []*ent.Kpi
	return kpi, nil
}

func (r mutationResolver) AddDomain(ctx context.Context, input models.AddDomainInput) (*ent.Domain, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		Domain.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("A domain with the name %v already exists", input.Name)
		}
		return nil, fmt.Errorf("creating domain: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveDomain(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Domain.Query().
		Where(
			domain.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying domain: id=%q", id)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Domain.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting domain")
	}
	return id, nil
}

func (r mutationResolver) EditDomain(ctx context.Context, input models.EditDomainInput) (*ent.Domain, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Domain.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("A domain with id=%q does not exist", input.ID)
		}
		return nil, errors.Wrapf(err, "updating domain: id=%q", input.ID)
	}
	if input.Name != et.Name {
		if et, err = client.Domain.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("A domain with the name %v already exists", input.Name)
			}
			return nil, errors.Wrap(err, "updating domain name")
		}
	}
	return et, nil
}
