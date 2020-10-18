// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type exitPointResolver struct{}

func (e exitPointResolver) ParentBlock(ctx context.Context, obj *ent.ExitPoint) (*ent.Block, error) {
	if parentBlock, err := obj.Edges.ParentBlockOrErr(); !ent.IsNotLoaded(err) {
		return parentBlock, err
	}
	return obj.QueryParentBlock().Only(ctx)
}

func (e exitPointResolver) NextEntryPoints(ctx context.Context, obj *ent.ExitPoint) ([]*ent.EntryPoint, error) {
	if entryPoints, err := obj.Edges.NextEntryPointsOrErr(); !ent.IsNotLoaded(err) {
		return entryPoints, err
	}
	return obj.QueryNextEntryPoints().All(ctx)
}

type entryPointResolver struct{}

func (e entryPointResolver) ParentBlock(ctx context.Context, obj *ent.EntryPoint) (*ent.Block, error) {
	if parentBlock, err := obj.Edges.ParentBlockOrErr(); !ent.IsNotLoaded(err) {
		return parentBlock, err
	}
	return obj.QueryParentBlock().Only(ctx)
}

func (e entryPointResolver) PrevExitPoints(ctx context.Context, obj *ent.EntryPoint) ([]*ent.ExitPoint, error) {
	if exitPoints, err := obj.Edges.PrevExitPointsOrErr(); !ent.IsNotLoaded(err) {
		return exitPoints, err
	}
	return obj.QueryPrevExitPoints().All(ctx)
}
