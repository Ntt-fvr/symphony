// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"context"
	"strings"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/appointment"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func UserFilter(query *ent.UserQuery, filters []*models.UserFilterInput) (*ent.UserQuery, error) {
	var err error
	for _, f := range filters {
		if strings.HasPrefix(f.FilterType.String(), "USER_") {
			if query, err = handleUserFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func UserSearch(ctx context.Context, client *ent.Client, filters []*models.UserFilterInput, limit *int) (*models.UserSearchResult, error) {
	var (
		query = client.User.Query()
		err   error
	)
	query, err = UserFilter(query, filters)
	if err != nil {
		return nil, err
	}
	count, err := query.Clone().Count(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Count query failed")
	}
	if limit != nil {
		query.Limit(*limit)
	}
	users, err := query.All(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Querying users failed")
	}
	return &models.UserSearchResult{
		Users: users,
		Count: count,
	}, nil
}

func PermissionsPolicyFilter(query *ent.PermissionsPolicyQuery, filters []*models.PermissionsPolicyFilterInput) (*ent.PermissionsPolicyQuery, error) {
	var err error
	for _, f := range filters {
		if strings.HasPrefix(f.FilterType.String(), "PERMISSIONS_POLICY_NAME") {
			if query, err = handlePermissionsPolicyFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func PermissionsPolicySearch(
	ctx context.Context,
	client *ent.Client,
	filters []*models.PermissionsPolicyFilterInput,
	limit *int,
) (*models.PermissionsPolicySearchResult, error) {
	var (
		query = client.PermissionsPolicy.Query()
		err   error
	)
	query, err = PermissionsPolicyFilter(query, filters)
	if err != nil {
		return nil, err
	}
	count, err := query.Clone().Count(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Count query failed")
	}
	if limit != nil {
		query.Limit(*limit)
	}
	permissionsPolicies, err := query.All(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Querying permissionsPolicy failed")
	}
	return &models.PermissionsPolicySearchResult{
		PermissionsPolicies: permissionsPolicies,
		Count:               count,
	}, nil
}

func UsersGroupFilter(query *ent.UsersGroupQuery, filters []*models.UsersGroupFilterInput) (*ent.UsersGroupQuery, error) {
	var err error
	for _, f := range filters {
		if strings.HasPrefix(f.FilterType.String(), "GROUP_NAME") {
			if query, err = handleUsersGroupFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func UsersGroupSearch(
	ctx context.Context,
	client *ent.Client,
	filters []*models.UsersGroupFilterInput,
	limit *int,
) (*models.UsersGroupSearchResult, error) {
	var (
		query = client.UsersGroup.Query()
		err   error
	)
	query, err = UsersGroupFilter(query, filters)
	if err != nil {
		return nil, err
	}
	count, err := query.Clone().Count(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Count query failed")
	}
	if limit != nil {
		query.Limit(*limit)
	}
	usersGroups, err := query.All(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Querying usersGroups failed")
	}
	return &models.UsersGroupSearchResult{
		UsersGroups: usersGroups,
		Count:       count,
	}, nil
}

func ProjectFilter(query *ent.ProjectQuery, filters []*models.ProjectFilterInput) (*ent.ProjectQuery, error) {
	var err error
	for _, f := range filters {
		switch {
		case strings.HasPrefix(f.FilterType.String(), "PROJECT_"):
			if query, err = handleProjectFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "LOCATION_INST"):
			if query, err = handleProjectLocationFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "PROPERTY"):
			if query, err = handleProjectPropertyFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func FlowInstanceFilter(query *ent.FlowInstanceQuery, filters []*models.FlowInstanceFilterInput) (*ent.FlowInstanceQuery, error) {
	var err error
	for _, f := range filters {
		if strings.HasPrefix(f.FilterType.String(), "FLOW_INSTANCE_") {
			if query, err = handleFlowInstanceFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func validateSlot(startDate time.Time, endDate time.Time) (err error) {
	/*switch {
	case startDate == nil || endDate == nil:
		err = &gqlerror.Error{
			Message: "Passing both `first` and `last` to paginate a connection is not supported.",
		}
	case startDate.After(endDate):*/
	if startDate.After(endDate) {
		err = &gqlerror.Error{
			Message: "Slot `endDate` must be after `startDate`",
		}
	}
	return err
}

func SlotFilter(query *ent.AppointmentQuery, filter *models.SlotFilterInput) (*ent.AppointmentQuery, error) {
	if err := validateSlot(filter.SlotStartDate, filter.SlotEndDate); err != nil {
		return nil, err
	}

	return query.Where(appointment.Or(
		appointment.And(
			appointment.StartLTE(filter.SlotStartDate),
			appointment.EndGT(filter.SlotStartDate)),
		appointment.And(
			appointment.StartGTE(filter.SlotStartDate),
			appointment.StartLTE(filter.SlotEndDate)))).Order(ent.Asc(appointment.FieldStart)), nil
}
