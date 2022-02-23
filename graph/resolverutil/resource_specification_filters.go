// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceSpecificationFilter(q *ent.ResourceSpecificationQuery, filter *models.ResourceSpecificationFilterInput) (*ent.ResourceSpecificationQuery, error) {
	switch filter.FilterType {
	case models.ResourceSpecificationFilterTypeName:
		return resourceSpecificationNameFilter(q, filter)
	case models.ResourceSpecificationFilterTypeResourceType:
		return resourceSpecificationNameFilter(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}

}

func resourceSpecificationNameFilter(q *ent.ResourceSpecificationQuery, filter *models.ResourceSpecificationFilterInput) (*ent.ResourceSpecificationQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcespecification.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcespecification.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceSpecificationResourceTypeFilter(q *ent.ResourceSpecificationQuery, filter *models.ResourceSpecificationFilterInput) (*ent.ResourceSpecificationQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.IDSet != nil {
		return q.Where(resourcespecification.HasResourcetypeWith(resourcetype.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
