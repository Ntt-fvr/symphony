// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resource"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceFilter(q *ent.ResourceQuery, filter *models.ResourceFilterInput) (*ent.ResourceQuery, error) {
	switch filter.FilterType {
	case models.ResourceFilterTypeName:
		return resourceNameFilter(q, filter)
	case models.ResourceFilterTypeResourceSpecification:
		return resourceSpecificationFilterResource(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func resourceNameFilter(q *ent.ResourceQuery, filter *models.ResourceFilterInput) (*ent.ResourceQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resource.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceSpecificationFilterResource(q *ent.ResourceQuery, filter *models.ResourceFilterInput) (*ent.ResourceQuery, error) {

	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {

		return q.Where(resource.HasResourcespecWith(resourcespecification.IDIn(filter.IDSet...))), nil

	}

	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)

}
