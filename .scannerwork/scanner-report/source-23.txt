// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationitems"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceSpecificationItemsFilter(q *ent.ResourceSpecificationItemsQuery, filter *models.ResourceSpecificationItemsFilterInput) (*ent.ResourceSpecificationItemsQuery, error) {
	switch filter.FilterType {
	case models.ResourceSpecificationItemsFilterTypeResourceSpecificationRelationship:
		return resourceSpecificationRelationshipFilter(q, filter)
	case models.ResourceSpecificationItemsFilterTypeResourceSpecification:
		return resourceSpecificationFilter(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func resourceSpecificationRelationshipFilter(q *ent.ResourceSpecificationItemsQuery, filter *models.ResourceSpecificationItemsFilterInput) (*ent.ResourceSpecificationItemsQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcespecificationitems.HasResourcespecificationrelationshipWith(resourcespecificationrelationship.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceSpecificationFilter(q *ent.ResourceSpecificationItemsQuery, filter *models.ResourceSpecificationItemsFilterInput) (*ent.ResourceSpecificationItemsQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcespecificationitems.HasResourcespecificationitemsWith(resourcespecification.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
