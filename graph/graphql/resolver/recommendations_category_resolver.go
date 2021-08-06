// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/recommendationscategory"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type recommendationsCategoryResolver struct{}

func (recommendationsCategoryResolver) Recommendations(ctx context.Context, recommendationsCategory *ent.RecommendationsCategory) ([]*ent.Recommendations, error) {
	variable, err := recommendationsCategory.Recommendations(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddRecommendationsCategory(ctx context.Context, input models.AddRecommendationsCategoryInput) (*ent.RecommendationsCategory, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		RecommendationsCategory.Create().
		SetName(input.Name).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRecommendationsCategory(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.RecommendationsCategory.Query().
		Where(
			recommendationscategory.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.RecommendationsCategory.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditRecommendationsCategory(ctx context.Context, input models.EditRecommendationsCategoryInput) (*ent.RecommendationsCategory, error) {
	client := r.ClientFrom(ctx)
	et, err := client.RecommendationsCategory.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	if input.Name != et.Name {

		if et, err = client.RecommendationsCategory.
			UpdateOne(et).
			SetName(input.Name).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
