// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/upl"
	"github.com/facebookincubator/symphony/pkg/ent/uplitem"
	"github.com/pkg/errors"
)

func handleUplItemFilter(q *ent.UplItemQuery, filter *models.UplItemFilterInput) (*ent.UplItemQuery, error) {
	switch filter.FilterType {
	case models.UplItemFilterTypeItem:
		return uplItemItemFilter(q, filter)
	case models.UplItemFilterTypeUpl:
		return uplItemUplFilter(q, filter)
	}
	if filter.FilterType == models.UplItemFilterTypeItem {
		return uplItemItemFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func uplItemItemFilter(q *ent.UplItemQuery, filter *models.UplItemFilterInput) (*ent.UplItemQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(uplitem.Item(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func uplItemUplFilter(q *ent.UplItemQuery, filter *models.UplItemFilterInput) (*ent.UplItemQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(uplitem.HasUplWith(upl.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
