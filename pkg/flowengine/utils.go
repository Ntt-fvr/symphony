// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package flowengine

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

func CopyBlocks(ctx context.Context, blocksQuery *ent.BlockQuery, addToFlow func(b *ent.BlockCreate)) error {
	client := ent.FromContext(ctx)
	blocks, err := blocksQuery.
		WithSubFlow().
		WithGotoBlock().
		WithNextBlocks().
		All(ctx)
	if err != nil {
		return fmt.Errorf("failed to fetch flow blocks: %w", err)
	}
	oldToNewBlock := make(map[int]*ent.Block, len(blocks))
	for _, blk := range blocks {
		blockCreate := client.Block.Create().
			SetCid(blk.Cid).
			SetType(blk.Type).
			SetStartParamDefinitions(blk.StartParamDefinitions).
			SetNillableTriggerType(blk.TriggerType).
			SetNillableActionType(blk.ActionType).
			SetUIRepresentation(blk.UIRepresentation)
		addToFlow(blockCreate)
		if blk.Edges.SubFlow != nil {
			blockCreate.SetSubFlow(blk.Edges.SubFlow)
		}
		newBlock, err := blockCreate.Save(ctx)
		if err != nil {
			return fmt.Errorf("failed to create new block: %w", err)
		}
		oldToNewBlock[blk.ID] = newBlock
	}
	for _, blk := range blocks {
		newBlock := oldToNewBlock[blk.ID]
		var newNextBlocks []*ent.Block
		for _, nextBlock := range blk.Edges.NextBlocks {
			newNextBlock, ok := oldToNewBlock[nextBlock.ID]
			if !ok {
				return fmt.Errorf("failed to find next block: %v", nextBlock.ID)
			}
			newNextBlocks = append(newNextBlocks, newNextBlock)
		}
		if len(newNextBlocks) != 0 {
			if err := newBlock.Update().
				AddNextBlocks(newNextBlocks...).
				Exec(ctx); err != nil {
				return fmt.Errorf("failed to add edges to next blocks: %w", err)
			}
		}
		switch newBlock.Type {
		case block.TypeEnd, block.TypeDecision, block.TypeSubFlow, block.TypeTrigger, block.TypeAction:
			var newInputParams []*flowschema.VariableExpression
			for _, param := range blk.InputParams {
				newParam := &flowschema.VariableExpression{
					BlockID:               newBlock.ID,
					VariableDefinitionKey: param.VariableDefinitionKey,
					Expression:            param.Expression,
				}
				for _, blockVariable := range param.BlockVariables {
					newBlockRef, ok := oldToNewBlock[blockVariable.BlockID]
					if !ok {
						return fmt.Errorf("failed to create find block ref: %v", blockVariable.BlockID)
					}
					newBlockVariable := &flowschema.BlockVariable{
						BlockID:               newBlockRef.ID,
						VariableDefinitionKey: blockVariable.VariableDefinitionKey,
					}
					newParam.BlockVariables = append(newParam.BlockVariables, newBlockVariable)
				}
				newInputParams = append(newInputParams, newParam)
			}
			if err := newBlock.Update().
				SetInputParams(newInputParams).
				Exec(ctx); err != nil {
				return fmt.Errorf("failed to update end block: %w", err)
			}
		case block.TypeGoTo:
			newGotoBlock, ok := oldToNewBlock[blk.Edges.GotoBlock.ID]
			if !ok {
				return fmt.Errorf("failed to find goto block: %v", blk.Edges.GotoBlock.ID)
			}
			if err := newBlock.Update().
				SetGotoBlock(newGotoBlock).
				Exec(ctx); err != nil {
				return fmt.Errorf("failed to update goto block: %w", err)
			}
		}
	}
	return nil
}
