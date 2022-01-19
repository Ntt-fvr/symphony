// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypeclass"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceTypeClassFilter(q *ent.ResourceTypeClassQuery, filter *models.ResourceTypeClassFilterInput) (*ent.ResourceTypeClassQuery, error) {
	if filter.FilterType == models.ResourceTypeClassFilterTypeName {
		return resourceTypeClassNameFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func resourceTypeClassNameFilter(q *ent.ResourceTypeClassQuery, filter *models.ResourceTypeClassFilterInput) (*ent.ResourceTypeClassQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcetypeclass.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcetypeclass.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
