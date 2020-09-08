// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/exporter/models"

	"github.com/pkg/errors"
)

// BuildLocationAncestorFilter returns a joined predicate for location ancestors
func BuildLocationAncestorFilter(locationID, depth, maxDepth int) predicate.Location {
	if depth >= maxDepth {
		return location.ID(locationID)
	}
	return location.Or(
		location.ID(locationID),
		location.HasParentWith(
			BuildLocationAncestorFilter(locationID, depth+1, maxDepth),
		),
	)
}

func LocationFilterPredicate(q *ent.LocationQuery, filter *models.LocationFilterInput) (*ent.LocationQuery, error) {
	if filter.Operator == enum.FilterOperatorIsOneOf {
		if filter.MaxDepth == nil {
			return nil, errors.New("max depth not supplied to location filter")
		}
		var ps []predicate.Location
		for _, lid := range filter.IDSet {
			ps = append(ps, BuildLocationAncestorFilter(lid, 1, *filter.MaxDepth))
		}
		return q.Where(location.Or(ps...)), nil
	}
	return nil, errors.Errorf("operation is not supported: %s", filter.Operator)
}
