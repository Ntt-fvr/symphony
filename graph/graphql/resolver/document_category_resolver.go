// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/hyperlink"
	"github.com/facebookincubator/symphony/pkg/ent/location"
)

type documentCategoryResolver struct{}

func (d documentCategoryResolver) FilesByLocation(ctx context.Context, obj *ent.DocumentCategory, locationID int) ([]*ent.File, error) {
	return obj.QueryFiles().Where(file.HasLocationWith(location.ID(locationID))).All(ctx)
}

func (d documentCategoryResolver) HyperlinksByLocation(ctx context.Context, obj *ent.DocumentCategory, locationID int) ([]*ent.Hyperlink, error) {
	return obj.QueryHyperlinks().Where(hyperlink.HasLocationWith(location.ID(locationID))).All(ctx)
}



