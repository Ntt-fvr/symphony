// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type checkListCategoryResolver struct{}

func (checkListCategoryResolver) CheckList(ctx context.Context, obj *ent.CheckListCategory) ([]*ent.CheckListItem, error) {
	return obj.QueryCheckListItems().All(ctx)
}

type checkListItemResolver struct{}

func (checkListItemResolver) Files(ctx context.Context, item *ent.CheckListItem) ([]*ent.File, error) {
	return item.QueryFiles().All(ctx)
}

func (checkListItemResolver) WifiData(ctx context.Context, item *ent.CheckListItem) ([]*ent.SurveyWiFiScan, error) {
	return item.QueryWifiScan().All(ctx)
}

func (checkListItemResolver) CellData(ctx context.Context, item *ent.CheckListItem) ([]*ent.SurveyCellScan, error) {
	return item.QueryCellScan().All(ctx)
}

type checkListCategoryDefinitionResolver struct{}

func (checkListCategoryDefinitionResolver) ChecklistItemDefinitions(ctx context.Context, category *ent.CheckListCategoryDefinition) ([]*ent.CheckListItemDefinition, error) {
	return category.QueryCheckListItemDefinitions().All(ctx)
}
