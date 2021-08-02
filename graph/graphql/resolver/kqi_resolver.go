// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/kqi"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type kqiResolver struct{}

func (kqiResolver) Category(ctx context.Context, kqi *ent.Kqi) (*ent.Category, error) {
	variable, err := kqi.CategoryFk(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (kqiResolver) Perspective(ctx context.Context, kqi *ent.Kqi) (*ent.Perspective, error) {
	variable, err := kqi.PerspectiveFk(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (kqiResolver) KqiSource(ctx context.Context, kqi *ent.Kqi) (*ent.KqiSource, error) {
	variable, err := kqi.KqiSourceFk(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (kqiResolver) TemporalFrecuency(ctx context.Context, kqi *ent.Kqi) (*ent.TemporalFrecuency, error) {
	variable, err := kqi.TemporalFrecuencyFk(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (kqiResolver) KqiTarget(ctx context.Context, kqi *ent.Kqi) ([]*ent.KqiTarget, error) {
	variable, err := kqi.KqiTargetFk(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddKqi(ctx context.Context, input models.AddKqiInput) (*ent.Kqi, error) {
	client := r.ClientFrom(ctx)

	typ, err := client.
		Kqi.Create().
		SetName(input.Name).
		SetDescription(input.Description).
		SetFormula(input.Formula).
		SetStartDateTime(input.StartDateTime).
		SetEndDateTime(input.EndDateTime).
		SetCategoryFkID(input.Category).
		SetPerspectiveFkID(input.Perspective).
		SetKqiSourceFkID(input.KqiSource).
		SetTemporalFrecuencyFkID(input.TemporalFrecuency).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveKqi(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Kqi.Query().
		Where(
			kqi.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.Kqi.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditKqi(ctx context.Context, input models.EditKqiInput) (*ent.Kqi, error) {
	client := r.ClientFrom(ctx)
	et, err := client.Kqi.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	var categoryid, perspectiveid, temporalFrecuencyid, kqiSourceId int
	var name, start, end, formula, description = et.Name, et.StartDateTime, et.EndDateTime, et.Formula, et.Description

	var category, err1 = et.CategoryFk(ctx)
	if err != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %w")
	} else if category != nil {
		categoryid = category.ID
	}
	var perspective, err2 = et.PerspectiveFk(ctx)
	if err != nil {
		return nil, errors.Wrap(err2, "has ocurred error on proces: %w")
	} else if perspective != nil {
		perspectiveid = perspective.ID
	}
	var temporal, err3 = et.TemporalFrecuencyFk(ctx)
	if err != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %w")
	} else if temporal != nil {
		temporalFrecuencyid = temporal.ID
	}

	var source, err4 = et.KqiSourceFk(ctx)
	if err != nil {
		return nil, errors.Wrap(err4, "has ocurred error on proces: %w")
	} else if source != nil {
		kqiSourceId = source.ID
	}

	var change = false
	if name != input.Name {
		name = input.Name
		change = true
	}
	if start != input.StartDateTime {
		start = input.StartDateTime
		change = true
	}
	if end != input.EndDateTime {
		end = input.EndDateTime
		change = true
	}
	if formula != input.Formula {
		formula = input.Formula
		change = true
	}
	if description != input.Description {
		description = input.Description
		change = true
	}
	if (category != nil && category.ID != input.Category) || category == nil {
		categoryid = input.Category
		change = true
	}
	if (perspective != nil && perspective.ID != input.Perspective) || perspective == nil {
		perspectiveid = input.Perspective
		change = true
	}
	if (temporal != nil && temporal.ID != input.TemporalFrecuency) || temporal == nil {
		temporalFrecuencyid = input.TemporalFrecuency
		change = true
	}
	if (source != nil && source.ID != input.KqiSource) || source == nil {
		kqiSourceId = input.KqiSource
		change = true
	}

	if change {

		if et, err = client.Kqi.
			UpdateOne(et).
			SetName(name).
			SetFormula(formula).
			SetDescription(description).
			SetStartDateTime(start).
			SetEndDateTime(end).
			SetCategoryFkID(categoryid).
			SetPerspectiveFkID(perspectiveid).
			SetKqiSourceFkID(kqiSourceId).
			SetTemporalFrecuencyFkID(temporalFrecuencyid).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
