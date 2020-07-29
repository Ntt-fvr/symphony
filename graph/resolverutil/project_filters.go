// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/project"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/pkg/errors"
)

func handleProjectFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.FilterType == models.ProjectFilterTypeProjectName {
		return projectNameFilter(q, filter)
	}
	if filter.FilterType == models.ProjectFilterTypeProjectOwnedBy {
		return projectOwnedByFilter(q, filter)
	}
	if filter.FilterType == models.ProjectFilterTypeLocationInst {
		return projectLocationInstFilter(q, filter)
	}
	if filter.FilterType == models.ProjectFilterTypeProjectType {
		return projectTypeFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func projectNameFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.Operator == models.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(project.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func projectOwnedByFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.Operator == models.FilterOperatorIsOneOf {
		return q.Where(project.HasCreatorWith(user.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func projectLocationInstFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.Operator == models.FilterOperatorIsOneOf {
		return q.Where(project.HasLocationWith(location.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func handleProjectLocationFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.FilterType == models.ProjectFilterTypeLocationInst {
		return projectLocationFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}

func projectLocationFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.Operator == models.FilterOperatorIsOneOf {
		if filter.MaxDepth == nil {
			return nil, errors.New("max depth not supplied to location filter")
		}
		var ps []predicate.Project
		for _, lid := range filter.IDSet {
			ps = append(ps, project.HasLocationWith(BuildLocationAncestorFilter(lid, 1, *filter.MaxDepth)))
		}
		return q.Where(project.Or(ps...)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func projectTypeFilter(q *ent.ProjectQuery, filter *models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	if filter.Operator == models.FilterOperatorIsOneOf {
		return q.Where(project.HasTypeWith(projecttype.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
