// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package complexity

import (
	"math"
	"math/bits"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
)

// Infinite is the maximum possible complexity value.
const Infinite = 1<<(bits.UintSize-1) - 1

// New creates a graphql complexity root.
// nolint: funlen
func New() (complexity generated.ComplexityRoot) {
	complexity.Location.Topology = func(childComplexity int, depth int) int {
		return childComplexity * int(math.Pow10(depth)) / 2
	}
	complexity.Query.CustomerSearch = SearchComplexity
	complexity.Query.Customers = PaginationComplexity
	complexity.Query.EquipmentPortDefinitions = PaginationComplexity
	complexity.Query.EquipmentPortTypes = PaginationComplexity
	complexity.Query.EquipmentPorts = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*pkgmodels.PortFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.EquipmentSearch = func(childComplexity int, _ []*pkgmodels.EquipmentFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.EquipmentTypes = PaginationComplexity
	complexity.Query.Equipments = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ *ent.EquipmentOrder, _ []*pkgmodels.EquipmentFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.LinkSearch = func(childComplexity int, _ []*pkgmodels.LinkFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.Links = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*pkgmodels.LinkFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.LocationSearch = func(childComplexity int, _ []*pkgmodels.LocationFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.LocationTypes = PaginationComplexity
	complexity.Query.Locations = func(childComplexity int, _ *bool, _ []int, _ *string, _ *bool, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ *ent.LocationOrder, _ []*pkgmodels.LocationFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.PermissionsPolicies = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*models.PermissionsPolicyFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.PermissionsPolicySearch = func(childComplexity int, _ []*models.PermissionsPolicyFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.PortSearch = func(childComplexity int, _ []*pkgmodels.PortFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.ProjectSearch = func(childComplexity int, _ []*models.ProjectFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.ProjectTypes = PaginationComplexity
	complexity.Query.Projects = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ *ent.ProjectOrder, _ []*models.ProjectFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.SearchForNode = func(childComplexity int, _ string, after *ent.Cursor, first *int, before *ent.Cursor, last *int) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.Services = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*pkgmodels.ServiceFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.ServiceSearch = func(childComplexity int, _ []*pkgmodels.ServiceFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.ServiceTypes = PaginationComplexity
	complexity.Query.UserSearch = func(childComplexity int, _ []*models.UserFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.Users = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*models.UserFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.UsersGroups = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ []*models.UsersGroupFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.UsersGroupSearch = func(childComplexity int, _ []*models.UsersGroupFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.WorkOrderSearch = func(childComplexity int, _ []*pkgmodels.WorkOrderFilterInput, limit *int) int {
		return SearchComplexity(childComplexity, limit)
	}
	complexity.Query.WorkOrderTypes = PaginationComplexity
	complexity.Query.WorkOrders = func(childComplexity int, after *ent.Cursor, first *int, before *ent.Cursor, last *int, _ *ent.WorkOrderOrder, _ []*pkgmodels.WorkOrderFilterInput) int {
		return PaginationComplexity(childComplexity, after, first, before, last)
	}
	complexity.Query.FlowDrafts = PaginationComplexity
	complexity.Query.Flows = PaginationComplexity
	complexity.WorkOrder.Activities = func(childComplexity int, filter *models.ActivityFilterInput) int {
		var limit *int
		if filter != nil {
			limit = &filter.Limit
		}
		return SearchComplexity(childComplexity, limit)
	}
	return complexity
}

// SearchComplexity returns the complexity function of searching queries.
func SearchComplexity(childComplexity int, limit *int) int {
	if limit != nil {
		return *limit * childComplexity
	}
	return Infinite
}

// PaginationComplexity returns the complexity function of paginating queries.
func PaginationComplexity(childComplexity int, _ *ent.Cursor, first *int, _ *ent.Cursor, last *int) int {
	switch {
	case first != nil:
		if last == nil || *first < *last {
			return *first * childComplexity
		}
		fallthrough
	case last != nil:
		return *last * childComplexity
	default:
		return Infinite
	}
}
