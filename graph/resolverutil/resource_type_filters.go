// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypebasetype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetypeclass"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceTypeFilter(q *ent.ResourceTypeQuery, filter *models.ResourceTypeFilterInput) (*ent.ResourceTypeQuery, error) {
	switch filter.FilterType {
	case models.ResourceTypeFilterTypeName:
		return resourceTypeNameFilter(q, filter)
	case models.ResourceTypeFilterTypeResourceTypeBaseType:
		return resourceTypeFilterTypeResourceTypeBaseType(q, filter)
	case models.ResourceTypeFilterTypeResourceTypeClass:
		return resourceTypeFilterTypeResourceTypeClass(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}

}

func resourceTypeNameFilter(q *ent.ResourceTypeQuery, filter *models.ResourceTypeFilterInput) (*ent.ResourceTypeQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcetype.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcetype.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeFilterTypeResourceTypeBaseType(q *ent.ResourceTypeQuery, filter *models.ResourceTypeFilterInput) (*ent.ResourceTypeQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcetype.HasResourcetypebasetypeWith(resourcetypebasetype.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeFilterTypeResourceTypeClass(q *ent.ResourceTypeQuery, filter *models.ResourceTypeFilterInput) (*ent.ResourceTypeQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcetype.HasResourcetypeclassWith(resourcetypeclass.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
