// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecification"
	"github.com/facebookincubator/symphony/pkg/ent/resourcespecificationrelationship"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceSpecificationRelationshipFilter(q *ent.ResourceSpecificationRelationshipQuery, filter *models.ResourceSpecificationRelationshipFilterInput) (*ent.ResourceSpecificationRelationshipQuery, error) {
	switch filter.FilterType {
	case models.ResourceSpecificationRelationshipFilterTypeName:
		return resourceSpecificationRelationshipNameFilter(q, filter)
	case models.ResourceSpecificationRelationshipFilterTypeResourceSpecification:
		return resourceSpecificationFilterResourceSR(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func resourceSpecificationRelationshipNameFilter(q *ent.ResourceSpecificationRelationshipQuery, filter *models.ResourceSpecificationRelationshipFilterInput) (*ent.ResourceSpecificationRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcespecificationrelationship.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceSpecificationFilterResourceSR(q *ent.ResourceSpecificationRelationshipQuery, filter *models.ResourceSpecificationRelationshipFilterInput) (*ent.ResourceSpecificationRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcespecificationrelationship.HasResourcespecificationWith(resourcespecification.IDIn(filter.IDSet...))), nil
	}

	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
