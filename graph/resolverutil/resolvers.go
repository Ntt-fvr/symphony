// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"context"
	"strings"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/service"
	"github.com/facebookincubator/symphony/pkg/ent/servicetype"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"

	"github.com/pkg/errors"
)

func ServiceFilter(query *ent.ServiceQuery, filters []*models.ServiceFilterInput) (*ent.ServiceQuery, error) {
	var err error
	for _, f := range filters {
		switch {
		case strings.HasPrefix(f.FilterType.String(), "SERVICE_"):
			if query, err = handleServiceFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "PROPERTY"):
			if query, err = handleServicePropertyFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "LOCATION_INST"):
			if query, err = handleServiceLocationFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "EQUIPMENT_IN_SERVICE"):
			if query, err = handleEquipmentInServiceFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func ServiceSearch(ctx context.Context, client *ent.Client, filters []*models.ServiceFilterInput, limit *int) (*pkgmodels.ServiceSearchResult, error) {
	var (
		query = client.Service.Query().Where(service.HasTypeWith(servicetype.IsDeleted(false)))
		err   error
	)
	query, err = ServiceFilter(query, filters)
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
	services, err := query.All(ctx)
	if err != nil {
		return nil, errors.Wrapf(err, "Querying services failed")
	}
	return &pkgmodels.ServiceSearchResult{
		Services: services,
		Count:    count,
	}, nil
}

func WorkOrderFilter(query *ent.WorkOrderQuery, filters []*models.WorkOrderFilterInput) (*ent.WorkOrderQuery, error) {
	var err error
	for _, f := range filters {
		switch {
		case strings.HasPrefix(f.FilterType.String(), "WORK_ORDER_"):
			if query, err = handleWorkOrderFilter(query, f); err != nil {
				return nil, err
			}
		case strings.HasPrefix(f.FilterType.String(), "LOCATION_INST"):
			if query, err = handleWOLocationFilter(query, f); err != nil {
				return nil, err
			}
		}
	}
	return query, nil
}

func WorkOrderSearch(ctx context.Context, client *ent.Client, filters []*models.WorkOrderFilterInput, limit *int, fields []string) (*pkgmodels.WorkOrderSearchResult, error) {
	var (
		query = client.WorkOrder.Query()
		err   error
	)
	query, err = WorkOrderFilter(query, filters)
	if err != nil {
		return nil, err
	}
	var woResult pkgmodels.WorkOrderSearchResult
	for _, field := range fields {
		switch field {
		case "count":
			woResult.Count, err = query.Clone().Count(ctx)
			if err != nil {
				return nil, errors.Wrapf(err, "Count query failed")
			}
		case "workOrders":
			if limit != nil {
				query.Limit(*limit)
			}
			woResult.WorkOrders, err = query.All(ctx)
			if err != nil {
				return nil, errors.Wrapf(err, "Querying work orders failed")
			}
		}
	}
	return &woResult, nil
}

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
		}
	}
	return query, nil
}
