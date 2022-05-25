// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/execution"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleExecutionFilter(q *ent.ExecutionQuery, filter *models.ExecutionFilterInput) (*ent.ExecutionQuery, error) {
	if filter.FilterType == models.ExecutionFilterTypeManuelconfirmation {
		return executionManualConfirmationFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func executionManualConfirmationFilter(q *ent.ExecutionQuery, filter *models.ExecutionFilterInput) (*ent.ExecutionQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.TimeValue != nil {
		return q.Where(execution.ManualConfirmation(*filter.TimeValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
