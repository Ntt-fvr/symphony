// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/kqitarget"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type kqiTargetResolver struct{}

func (kqiTargetResolver) Kqi(ctx context.Context, kqiTarget *ent.KqiTarget) (*ent.Kqi, error) {
	variable, err := kqiTarget.KqiTargetFk(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddKqiTarget(ctx context.Context, input models.AddKqiTargetInput) (*ent.KqiTarget, error) {
	client := r.ClientFrom(ctx)

	typ, err := client.
		KqiTarget.Create().
		SetFrame(input.Frame).
		SetAlowedValidation(input.AlowedValidation).
		SetInitTime(input.InitTime).
		SetEndTime(input.EndTime).
		SetImpact(input.Impact).
		SetStatus(input.Status).
		SetKqiTargetFkID(input.Kqi).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveKqiTarget(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.KqiTarget.Query().
		Where(
			kqitarget.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.KqiTarget.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %w")
	}
	return id, nil
}

func (r mutationResolver) EditKqiTarget(ctx context.Context, input models.EditKqiTargetInput) (*ent.KqiTarget, error) {
	client := r.ClientFrom(ctx)
	et, err := client.KqiTarget.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %w", err)
	}
	var kqiId int
	var init, end, frame, allowed, status, impact = et.InitTime, et.EndTime, et.Frame, et.AlowedValidation, et.Status, et.Impact
	var kqi, err1 = et.KqiTargetFk(ctx)
	if err1 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %w")
	} else if kqi != nil {
		kqiId = kqi.ID
	}

	var change = false
	if init != input.InitTime {
		init = input.InitTime
		change = true
	}
	if end != input.EndTime {
		end = input.EndTime
		change = true
	}
	if frame != input.Frame {
		frame = input.Frame
		change = true
	}

	if allowed != input.AlowedValidation {
		allowed = input.AlowedValidation
		change = true
	}

	if status != input.Status {
		status = input.Status
		change = true
	}
	if impact != input.Impact {
		impact = input.Impact
		change = true
	}
	if (kqi != nil && kqi.ID != input.Kqi) || kqi == nil {
		kqiId = input.Kqi
		change = true
	}

	if change {

		if et, err = client.KqiTarget.
			UpdateOne(et).
			SetInitTime(init).
			SetEndTime(end).
			SetFrame(frame).
			SetAlowedValidation(allowed).
			SetStatus(status).
			SetImpact(impact).
			SetKqiTargetFkID(kqiId).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %w", err)
			}
			return nil, errors.Wrap(err, "has ocurred error on proces: %w")
		}
	}
	return et, nil
}
