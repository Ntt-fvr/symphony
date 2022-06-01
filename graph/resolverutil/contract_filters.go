// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/contract"
	"github.com/facebookincubator/symphony/pkg/ent/organization"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/pkg/errors"
)

func handleContractFilter(q *ent.ContractQuery, filter *models.ContractFilterInput) (*ent.ContractQuery, error) {
	switch filter.FilterType {
	case models.ContractFilterTypeName:
		return contractNameFilter(q, filter)
	case models.ContractFilterTypeOrganization:
		return contractOrganizationFilter(q, filter)
	}
	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}
func contractNameFilter(q *ent.ContractQuery, filter *models.ContractFilterInput) (*ent.ContractQuery, error) {
	if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
		return q.Where(contract.NameContainsFold(*filter.StringValue)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}

func contractOrganizationFilter(q *ent.ContractQuery, filter *models.ContractFilterInput) (*ent.ContractQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf && filter.IDSet != nil {
		return q.Where(contract.HasOrganizationWith(organization.IDIn(filter.IDSet...))), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
