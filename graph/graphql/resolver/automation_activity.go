// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/automationactivity"
)

type automationActivityResolver struct{}

func (automationActivityResolver) FlowInstance(ctx context.Context, obj *ent.AutomationActivity) (*ent.FlowInstance, error) {
	variable, err := obj.FlowInstance(ctx)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

func (automationActivityResolver) BlockInstance(ctx context.Context, obj *ent.AutomationActivity) (*ent.BlockInstance, error) {
	variable, err := obj.BlockInstance(ctx)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return variable, nil
}

type flowInstanceResolver struct{}

func (flowInstanceResolver) Activities(ctx context.Context, obj *ent.FlowInstance, filter *models.AutomationActivityFilterInput) ([]*ent.AutomationActivity, error) {
	if filter != nil {
		query := obj.QueryFlowActivities().
			Where(automationactivity.ActivityTypeEQ(filter.ActivityType))

		if filter.OrderDirection == ent.OrderDirectionAsc {
			query = query.Order(ent.Asc(automationactivity.FieldCreateTime))
		} else {
			query = query.Order(ent.Desc(automationactivity.FieldCreateTime))
		}

		return query.Limit(filter.Limit).All(ctx)
	}

	return obj.QueryFlowActivities().All(ctx)
}

type blockInstanceResolver struct{}

func (blockInstanceResolver) Activities(ctx context.Context, obj *ent.BlockInstance, filter *models.AutomationActivityFilterInput) ([]*ent.AutomationActivity, error) {
	if filter != nil {
		query := obj.QueryBlockActivities().
			Where(automationactivity.ActivityTypeEQ(filter.ActivityType))

		if filter.OrderDirection == ent.OrderDirectionAsc {
			query = query.Order(ent.Asc(automationactivity.FieldCreateTime))
		} else {
			query = query.Order(ent.Desc(automationactivity.FieldCreateTime))
		}

		return query.Limit(filter.Limit).All(ctx)
	}

	return obj.QueryBlockActivities().All(ctx)
}
