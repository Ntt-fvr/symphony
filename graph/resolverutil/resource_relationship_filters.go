// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/resource"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceRelationshipFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	switch filter.FilterType {
	case models.ResourceRelationshipFilterTypeResourceRelationshipLocation:
		return resourceRelationshipLocationFilter(q, filter)
	case models.ResourceRelationshipFilterTypeResourceRelationshipResource:
		return resourceRelationshipResourceTypeFilter(q, filter)
	case models.ResourceRelationshipFilterTypeResourceRelationshipTypes:
		return resourceRelationshipTypesFilter(q, filter)
	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}
}

func resourceRelationshipLocationFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcerelationship.HasResourcelocationWith(location.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceRelationshipResourceTypeFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		var predicatesType []predicate.ResourceRelationship
		predicatesType = append(predicatesType, resourcerelationship.Or(resourcerelationship.HasResourceaWith(resource.IDIn(filter.IDSet...)), resourcerelationship.HasResourcebWith(resource.IDIn(filter.IDSet...))))

		return q.Where(predicatesType...), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceRelationshipTypesFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIs && filter.TypeValue != nil {
		return q.Where(resourcerelationship.ResourceRelationshipTypesEQ(*filter.TypeValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
