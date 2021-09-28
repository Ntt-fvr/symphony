// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypebasetype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceTypeBaseTypeFilter(q *ent.ResourceTypeBaseTypeQuery, filter *models.ResourceTypeBaseTypeFilterInput) (*ent.ResourceTypeBaseTypeQuery, error) {
	if filter.FilterType == models.ResourceTypeBaseTypeFilterTypeName {
		return resourceTypeBaseTypeNameFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func resourceTypeBaseTypeNameFilter(q *ent.ResourceTypeBaseTypeQuery, filter *models.ResourceTypeBaseTypeFilterInput) (*ent.ResourceTypeBaseTypeQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcetypebasetype.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcetypebasetype.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
