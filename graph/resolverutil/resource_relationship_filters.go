// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceRelationshipFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	switch filter.FilterType {
	case models.ResourceRelationshipFilterTypeName:
		return resourceRelationshipNameFilter(q, filter)
	case models.ResourceRelationshipFilterTypeResourceRelationshipFilter:
		return resourceRelationshipLocationTypeFilter(q, filter)
	case models.ResourceRelationshipFilterTypeResourceRelationshipResource:
		return resourceTypeFilter(q, filter)

	default:
		return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
	}

}

func resourceRelationshipNameFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcerelationship.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcerelationship.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceRelationshipLocationTypeFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(resourcerelationship.HasLocationTypeWith(locationtype.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func resourceTypeFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		var predicatesType []predicate.ResourceRelationship
		predicatesType = append(predicatesType, resourcerelationship.Or(resourcerelationship.HasResourcetypeaWith(resourcetype.IDIn(filter.IDSet...)), resourcerelationship.HasResourcetypebWith(resourcetype.IDIn(filter.IDSet...))))

		return q.Where(predicatesType...), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
