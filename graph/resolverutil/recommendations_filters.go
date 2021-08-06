// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/recommendations"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleRecommendationsFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	switch filter.FilterType {
	case models.RecommendationsFilterTypeAlarmtype:
		return recommendationsAlarmtypeFilter(q, filter)
	case models.RecommendationsFilterTypeCommand:
		return recommendationsCommandFilter(q, filter)
	case models.RecommendationsFilterTypeExternalid:
		return recommendationsExternalidFilter(q, filter)
	case models.RecommendationsFilterTypePriority:
		return recommendationsPriorityFilter(q, filter)
	case models.RecommendationsFilterTypeResource:
		return recommendationsResourceFilter(q, filter)
	case models.RecommendationsFilterTypeRunbook:
		return recommendationsRunbookFilter(q, filter)
	case models.RecommendationsFilterTypeStatus:
		return recommendationsStatusFilter(q, filter)
	case models.RecommendationsFilterTypeLongdescription:
		return recommendationsLongdescriptionFilter(q, filter)
	case models.RecommendationsFilterTypeShortdescription:
		return recommendationsShortdescriptionFilter(q, filter)
	case models.RecommendationsFilterTypeUsed:
		return recommendationsUsedFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func recommendationsAlarmtypeFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.AlarmTypeContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsCommandFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.CommandContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsExternalidFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.ExternalIdContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsPriorityFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.PriorityEQ(*filter.IntValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsResourceFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.ResourceContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsRunbookFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.RunbookContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsStatusFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.StatusEQ(*filter.BoolValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsLongdescriptionFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.LongDescriptionContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsShortdescriptionFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.ShortDescriptionContains(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func recommendationsUsedFilter(q *ent.RecommendationsQuery, filter *models.RecommendationsFilterInput) (*ent.RecommendationsQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(recommendations.UsedEQ(*filter.IntValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
