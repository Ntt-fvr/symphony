// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/ruleaction"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleRuleActionFilter(q *ent.RuleActionQuery, filter *models.RuleActionFilterInput) (*ent.RuleActionQuery, error) {
	if filter.FilterType == models.RuleActionFilterTypeOperation {
		return ruleActionTextFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func ruleActionTextFilter(q *ent.RuleActionQuery, filter *models.RuleActionFilterInput) (*ent.RuleActionQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.OperationValue != nil {
		return q.Where(ruleaction.OperationEQ(*filter.OperationValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
