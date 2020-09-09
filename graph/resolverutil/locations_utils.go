// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/pkg/ent/equipment"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentport"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentposition"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
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

// GetPortLocationPredicate returns a predicate for location ancestors for port
func GetPortLocationPredicate(locationID int, maxDepth *int) predicate.EquipmentPort {
	pred := equipment.HasLocationWith(
		BuildLocationAncestorFilter(locationID, 1, *maxDepth),
	)
	return equipmentport.HasParentWith(
		equipment.Or(
			pred,
			equipment.HasParentPositionWith(
				equipmentposition.HasParentWith(pred),
			),
		),
	)
}
