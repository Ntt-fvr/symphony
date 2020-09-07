// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
)

type blockResolver struct{}

func (r blockResolver) NextBlocks(ctx context.Context, obj *ent.Block) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.NextBlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryNextBlocks().All(ctx)
}

func (r blockResolver) PrevBlocks(ctx context.Context, obj *ent.Block) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.PrevBlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryPrevBlocks().All(ctx)
}

func (r blockResolver) Details(ctx context.Context, obj *ent.Block) (models.BlockType, error) {
	switch obj.Type {
	case block.TypeStart:
		return &models.StartBlock{}, nil
	case block.TypeEnd:
		return &models.EndBlock{}, nil
	case block.TypeGo_to:
		block, err := obj.QueryGotoBlock().Only(ctx)
		if err != nil && !ent.IsNotFound(err) {
			return nil, err
		}
		return &models.GotoBlock{
			GotoBlock: block,
		}, nil
	default:
		return nil, fmt.Errorf("type %q is unknown", obj.Type)
	}
}

func addBlockMutation(ctx context.Context, blockName string, blockType block.Type, flowDraftID int) *ent.BlockCreate {
	client := ent.FromContext(ctx)
	return client.Block.Create().
		SetName(blockName).
		SetType(blockType).
		SetFlowDraftID(flowDraftID)
}

func (r mutationResolver) AddStartBlock(ctx context.Context, input models.AddStartBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeStart, input.FlowDraftID)
	return mutation.Save(ctx)
}

func (r mutationResolver) AddEndBlock(ctx context.Context, input models.AddEndBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeEnd, input.FlowDraftID)
	return mutation.Save(ctx)
}

func (r mutationResolver) AddGotoBlock(ctx context.Context, input models.AddGotoBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeGo_to, input.FlowDraftID)
	return mutation.
		SetGotoBlockID(input.NextBlockID).
		Save(ctx)
}

func (r mutationResolver) DeleteBlock(ctx context.Context, id int) (bool, error) {
	client := r.ClientFrom(ctx)
	if err := client.Block.DeleteOneID(id).
		Exec(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r mutationResolver) AddConnector(ctx context.Context, input models.ConnectorInput) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.UpdateOneID(input.BlockID).
		AddNextBlockIDs(input.NextBlockID).
		Save(ctx)
}

func (r mutationResolver) DeleteConnector(ctx context.Context, input models.ConnectorInput) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	exists, err := client.Block.Query().
		Where(
			block.ID(input.BlockID),
			block.HasNextBlocksWith(block.ID(input.NextBlockID)),
		).
		Exist(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to find connector to delete: %w", err)
	}
	if !exists {
		return nil, fmt.Errorf(
			"failed to find connector to delete: blockID=%d, nextBlockID=%d", input.BlockID, input.NextBlockID)
	}
	return client.Block.UpdateOneID(input.BlockID).
		RemoveNextBlockIDs(input.NextBlockID).
		Save(ctx)
}
