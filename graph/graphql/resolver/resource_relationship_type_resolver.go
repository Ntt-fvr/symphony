// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationshiptype"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceRelationshipTypeResolver struct{}

func (r mutationResolver) AddResourceRelationshipType(ctx context.Context, input models.AddResourceRelationshipTypeInput) (*ent.ResourceRelationshipType, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		ResourceRelationshipType.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceRelationshipType(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceRelationshipType.Query().
		Where(
			resourcerelationshiptype.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceRelationshipType.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditResourceRelationshipType(ctx context.Context, input models.EditResourceRelationshipTypeInput) (*ent.ResourceRelationshipType, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceRelationshipType.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	if input.Name != et.Name {
		if et, err = client.ResourceRelationshipType.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %v")
		}
	}
	return et, nil
}
