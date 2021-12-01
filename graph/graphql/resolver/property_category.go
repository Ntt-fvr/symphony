// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/property"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
)

type propertyCategoryResolver struct {}
// PropertiesByEntity
func (p propertyCategoryResolver) PropertiesByEntity(ctx context.Context, obj *ent.PropertyCategory, entityType enum.PropertyEntity, entityID *int) ([]*ent.Property, error) {
	switch entityType {
	case enum.PropertyEntityLocation:
		return obj.QueryPropertiesType().QueryProperties().Where(property.HasLocationWith(location.ID(*entityID))).All(ctx)
	default:
		return nil, fmt.Errorf("not support entity type: %s", entityType)
	}
}



