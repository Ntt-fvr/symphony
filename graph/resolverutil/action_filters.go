// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/action"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleActionFilter(q *ent.ActionQuery, filter *models.ActionFilterInput) (*ent.ActionQuery, error) {
	switch filter.FilterType {
	case models.ActionFilterTypeStatus:
		return actionStatusFilter(q, filter)
	case models.ActionFilterTypeUserAction:
		return actionUserActionFilter(q, filter)
	case models.ActionFilterTypeLogexecution:
		return actionLogExecutionFilter(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}

}

func actionStatusFilter(q *ent.ActionQuery, filter *models.ActionFilterInput) (*ent.ActionQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.StatusValue != nil {
		return q.Where(action.StatusEQ(*filter.StatusValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func actionUserActionFilter(q *ent.ActionQuery, filter *models.ActionFilterInput) (*ent.ActionQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.UserActionValue != nil {
		return q.Where(action.UserActionEQ(*filter.UserActionValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func actionLogExecutionFilter(q *ent.ActionQuery, filter *models.ActionFilterInput) (*ent.ActionQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(action.LogExecutionContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(action.LogExecutionEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
