// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertyvalue"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handlePropertyValueFilter(q *ent.PropertyValueQuery, filter *models.PropertyValueFilterInput) (*ent.PropertyValueQuery, error) {
	if filter.FilterType == models.PropertyValueFilterTypeName {
		return propertyValueNameFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func propertyValueNameFilter(q *ent.PropertyValueQuery, filter *models.PropertyValueFilterInput) (*ent.PropertyValueQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(propertyvalue.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
