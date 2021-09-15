// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleResourceRelationshipFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {

	if filter.FilterType == models.ResourceRelationshipFilterTypeName {
		return resourceRelationshipNameFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func resourceRelationshipNameFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(resourcerelationship.NameContainsFold(*filter.StringValue)), nil
	} else if filter.Operator == enum.FilterOperatorIs && filter.StringValue != nil {
		return q.Where(resourcerelationship.NameEQ(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
