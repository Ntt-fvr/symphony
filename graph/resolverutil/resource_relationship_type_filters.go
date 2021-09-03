// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationshiptype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceRelationshipTypeFilter(q *ent.ResourceRelationshipTypeQuery, filter *models.ResourceRelationshipTypeFilterInput) (*ent.ResourceRelationshipTypeQuery, error) {
	if filter.FilterType == models.ResourceRelationshipTypeFilterTypeName {
		return resourceRelationshipTypeNameFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func resourceRelationshipTypeNameFilter(q *ent.ResourceRelationshipTypeQuery, filter *models.ResourceRelationshipTypeFilterInput) (*ent.ResourceRelationshipTypeQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcerelationshiptype.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcerelationshiptype.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
