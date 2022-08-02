// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleFlow(q *ent.FlowQuery, filter *models.FlowFilterInput) (*ent.FlowQuery, error) {
	switch filter.FilterType {
	case models.FlowFilterTypeFlowName:
		return flowName(q, filter)
	case models.FlowFilterTypeFlowCmType:
		return flowCMType(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func flowName(q *ent.FlowQuery, filter *models.FlowFilterInput) (*ent.FlowQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(flow.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func flowCMType(q *ent.FlowQuery, filter *models.FlowFilterInput) (*ent.FlowQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.CmType != nil {
		return q.Where(flow.CmTypeEQ(*filter.CmType)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
