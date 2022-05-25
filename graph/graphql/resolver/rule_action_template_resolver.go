// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/ruleactiontemplate"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ruleActionTemplateResolver struct{}

func (r mutationResolver) AddRuleActionTemplate(ctx context.Context, input models.AddRuleActionTemplateInput) (*ent.RuleActionTemplate, error) {
	client := r.ClientFrom(ctx)
	typ, err := client.
		RuleActionTemplate.Create().
		SetText(input.Text).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveRuleActionTemplate(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.RuleActionTemplate.Query().
		Where(
			ruleactiontemplate.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.RuleActionTemplate.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
	}
	return id, nil
}

func (r mutationResolver) EditRuleActionTemplate(ctx context.Context, input models.EditRuleActionTemplateInput) (*ent.RuleActionTemplate, error) {
	client := r.ClientFrom(ctx)
	et, err := client.RuleActionTemplate.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}

	if input.Text != et.Text {
		if et, err = client.RuleActionTemplate.
			UpdateOne(et).
			SetText(input.Text).
			Save(ctx); err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, errors.Wrap(err, "has occurred error on process: %v")
		}
	}
	return et, nil
}
