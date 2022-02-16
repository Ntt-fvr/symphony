// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetyperelationship"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceTypeRelationshipFilter(q *ent.ResourceTypeRelationshipQuery, filter *models.ResourceTypeRelationshipFilterInput) (*ent.ResourceTypeRelationshipQuery, error) {
	switch filter.FilterType {
	case models.ResourceTypeRelationshipFilterTypeResourceRelationshipLocationType:
		return resourceTypeRelationshipLocationTypeFilter(q, filter)
	case models.ResourceTypeRelationshipFilterTypeResourceRelationshipResource:
		return resourceTypeRelationshipResourceTypeFilter(q, filter)
	case models.ResourceTypeRelationshipFilterTypeResourceRelationshipMultiplicity:
		return resourceTypeRelationshipMultiplicityFilter(q, filter)
	case models.ResourceTypeRelationshipFilterTypeResourceRelationshipType:
		return resourceTypeRelationshipTypeFilter(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func resourceTypeRelationshipLocationTypeFilter(q *ent.ResourceTypeRelationshipQuery, filter *models.ResourceTypeRelationshipFilterInput) (*ent.ResourceTypeRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcetyperelationship.HasLocationTypeWith(locationtype.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeRelationshipResourceTypeFilter(q *ent.ResourceTypeRelationshipQuery, filter *models.ResourceTypeRelationshipFilterInput) (*ent.ResourceTypeRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		var predicatesType []predicate.ResourceTypeRelationship
		predicatesType = append(predicatesType, resourcetyperelationship.Or(resourcetyperelationship.HasResourcetypeaWith(resourcetype.IDIn(filter.IDSet...)), resourcetyperelationship.HasResourcetypebWith(resourcetype.IDIn(filter.IDSet...))))

		return q.Where(predicatesType...), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeRelationshipTypeFilter(q *ent.ResourceTypeRelationshipQuery, filter *models.ResourceTypeRelationshipFilterInput) (*ent.ResourceTypeRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.TypeValue != nil {
		return q.Where(resourcetyperelationship.ResourceRelationshipTypeEQ(*filter.TypeValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeRelationshipMultiplicityFilter(q *ent.ResourceTypeRelationshipQuery, filter *models.ResourceTypeRelationshipFilterInput) (*ent.ResourceTypeRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.MultiplicityValue != nil {
		return q.Where(resourcetyperelationship.ResourceRelationshipMultiplicityEQ(*filter.MultiplicityValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
