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
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine"
)

type flowResolver struct{}

func (r flowResolver) Blocks(ctx context.Context, obj *ent.Flow) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.BlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryBlocks().All(ctx)
}

func (r flowResolver) Draft(ctx context.Context, obj *ent.Flow) (*ent.FlowDraft, error) {
	draft, err := obj.QueryDraft().
		Only(ctx)
	return draft, ent.MaskNotFound(err)
}

func connectors(exitPointsWithNext []*ent.ExitPoint) []*models.Connector {
	var connectors []*models.Connector
	for _, exitPoint := range exitPointsWithNext {
		for _, entryPoint := range exitPoint.Edges.NextEntryPoints {
			connectors = append(connectors, &models.Connector{
				Source: exitPoint,
				Target: entryPoint,
			})
		}
	}
	return connectors
}

func (r flowResolver) Connectors(ctx context.Context, obj *ent.Flow) ([]*models.Connector, error) {
	exitPoints, err := obj.QueryBlocks().
		QueryExitPoints().
		WithNextEntryPoints().
		All(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query exit points: %w", err)
	}
	return connectors(exitPoints), nil
}

type flowDraftResolver struct{}

func (r flowDraftResolver) Blocks(ctx context.Context, obj *ent.FlowDraft) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.BlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryBlocks().All(ctx)
}

func (r flowDraftResolver) Connectors(ctx context.Context, obj *ent.FlowDraft) ([]*models.Connector, error) {
	exitPoints, err := obj.QueryBlocks().
		QueryExitPoints().
		WithNextEntryPoints().
		All(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query exit points: %w", err)
	}
	return connectors(exitPoints), nil
}

func (r mutationResolver) AddFlowDraft(ctx context.Context, input models.AddFlowDraftInput) (*ent.FlowDraft, error) {
	client := r.ClientFrom(ctx)
	var flowID int
	if input.FlowID != nil {
		flowID = *input.FlowID
		flowItem, err := client.Flow.Query().
			Where(flow.ID(*input.FlowID)).
			WithDraft().
			Only(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to load flow with flow id: %d. %w", input.FlowID, err)
		}
		if flowItem.Edges.Draft != nil {
			return nil, fmt.Errorf("cannot creat a new draft for flow id: %d, as a draft already exists", input.FlowID)
		}
	} else {
		newFlow, err := client.Flow.Create().
			SetName(input.Name).
			SetNillableDescription(input.Description).
			SetEndParamDefinitions(input.EndParamDefinitions).
			Save(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to create flow: %w", err)
		}
		flowID = newFlow.ID
	}

	flowDraft, err := client.FlowDraft.Create().
		SetName(input.Name).
		SetNillableDescription(input.Description).
		SetFlowID(flowID).
		SetEndParamDefinitions(input.EndParamDefinitions).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create flow draft: %w", err)
	}
	if input.FlowID != nil {
		blockQuery := client.Block.Query().
			Where(block.HasFlowWith(flow.ID(*input.FlowID)))
		setFlowDraft := func(b *ent.BlockCreate) {
			b.SetFlowDraft(flowDraft)
		}
		if err := flowengine.CopyBlocks(ctx, blockQuery, setFlowDraft); err != nil {
			return nil, err
		}
	}
	return flowDraft, nil
}

func (r mutationResolver) PublishFlow(ctx context.Context, input models.PublishFlowInput) (*ent.Flow, error) {
	var err error
	client := r.ClientFrom(ctx)
	flowDraft, err := client.FlowDraft.Query().
		Where(flowdraft.ID(input.FlowDraftID)).
		WithBlocks().
		WithFlow().
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("flow draft not found: %w", err)
	}
	outputFlow := flowDraft.Edges.Flow
	if outputFlow == nil {
		return nil, fmt.Errorf("no flow for draft")
	}

	outputFlow, err = client.Flow.UpdateOne(outputFlow).
		SetName(flowDraft.Name).
		SetNillableDescription(flowDraft.Description).
		SetEndParamDefinitions(flowDraft.EndParamDefinitions).
		SetStatus(flow.StatusPublished).
		SetNewInstancesPolicy(input.FlowInstancesPolicy).
		ClearBlocks().
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to update flow: %w", err)
	}

	blockQuery := client.Block.Query().
		Where(block.HasFlowDraftWith(flowdraft.ID(flowDraft.ID)))
	setFlowBlocks := func(b *ent.BlockCreate) {
		b.SetFlow(outputFlow)
	}
	if err := flowengine.CopyBlocks(ctx, blockQuery, setFlowBlocks); err != nil {
		return nil, err
	}

	if err := client.FlowDraft.UpdateOne(flowDraft).
		SetSameAsFlow(true).
		Exec(ctx); err != nil {
		return nil, fmt.Errorf("failed to update flow draft to SameAsFlow: true. %w", err)
	}
	return outputFlow, nil
}

func (r mutationResolver) DeleteFlowDraft(ctx context.Context, id int) (bool, error) {
	client := r.ClientFrom(ctx)
	if err := client.FlowDraft.DeleteOneID(id).
		Exec(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r mutationResolver) StartFlow(ctx context.Context, input models.StartFlowInput) (*ent.FlowInstance, error) {
	client := r.ClientFrom(ctx)
	flowInstance, err := client.FlowInstance.Create().
		SetFlowID(input.FlowID).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	startBlock, err := flowInstance.QueryTemplate().
		QueryBlocks().
		Where(block.TypeEQ(block.TypeStart)).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to find flow start block. id=%q", flowInstance.ID)
	}
	if _, err = client.BlockInstance.Create().
		SetBlock(startBlock).
		SetFlowInstance(flowInstance).
		SetInputs(input.Params).
		Save(ctx); err != nil {
		return nil, err
	}
	return flowInstance, nil
}

func (r queryResolver) FlowDrafts(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.FlowDraftConnection, error) {
	return r.ClientFrom(ctx).FlowDraft.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Flows(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.FlowConnection, error) {
	return r.ClientFrom(ctx).Flow.Query().
		Paginate(ctx, after, first, before, last)
}

func (r mutationResolver) paramsHaveDependencies(params []*models.VariableExpressionInput, createdBlockCIDs map[string]struct{}) bool {
	for _, param := range params {
		for _, blockVariable := range param.BlockVariables {
			if _, ok := createdBlockCIDs[blockVariable.BlockCid]; !ok {
				return false
			}
		}
	}
	return true
}

func (r mutationResolver) importBlocks(ctx context.Context, input models.ImportFlowDraftInput) error {
	var newBlockInputs []interface{}
	createdBlockCIDs := make(map[string]struct{})
	if input.StartBlock != nil {
		if _, err := r.AddStartBlock(ctx, input.ID, *input.StartBlock); err != nil {
			return err
		}
		createdBlockCIDs[input.StartBlock.Cid] = struct{}{}
	}
	blockInputs := r.collectBlocksInputs(ctx, input)
	for len(blockInputs) > 0 {
		for _, blk := range blockInputs {
			switch blkInput := blk.(type) {
			case *models.EndBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddEndBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.DecisionBlockInput:
				if _, err := r.AddDecisionBlock(ctx, input.ID, *blkInput); err != nil {
					return err
				}
				createdBlockCIDs[blkInput.Cid] = struct{}{}
			case *models.TrueFalseBlockInput:
				if _, err := r.AddTrueFalseBlock(ctx, input.ID, *blkInput); err != nil {
					return err
				}
				createdBlockCIDs[blkInput.Cid] = struct{}{}
			case *models.GotoBlockInput:
				ok := true
				if blkInput.TargetBlockCid != nil {
					_, ok = createdBlockCIDs[*blkInput.TargetBlockCid]
				}
				if ok {
					if _, err := r.AddGotoBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.SubflowBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddSubflowBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.TriggerBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddTriggerBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.ActionBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddActionBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			}
		}
		if len(blockInputs) == len(newBlockInputs) {
			return fmt.Errorf("there is circular dependency between blocks or dependency doesn't exist. num=%d", len(blockInputs))
		}
		blockInputs = newBlockInputs
	}
	return nil
}

func (r mutationResolver) collectBlocksInputs(ctx context.Context, input models.ImportFlowDraftInput) []interface{} {
	var blockInputs []interface{}
	for _, blk := range input.EndBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.DecisionBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.GotoBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.SubflowBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.TriggerBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.ActionBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.TrueFalseBlocks {
		blockInputs = append(blockInputs, blk)
	}
	return blockInputs
}

func (r mutationResolver) ImportFlowDraft(ctx context.Context, input models.ImportFlowDraftInput) (*ent.FlowDraft, error) {
	client := r.ClientFrom(ctx)
	blocks, err := client.Block.Query().Where(
		block.HasFlowDraftWith(flowdraft.ID(input.ID)),
	).All(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query flow draft current blocks: %w", err)
	}
	for _, blk := range blocks {
		if err := client.Block.DeleteOne(blk).
			Exec(ctx); err != nil {
			return nil, fmt.Errorf("block failed to be deleted: %w", err)
		}
	}
	draftQuery := client.FlowDraft.UpdateOneID(input.ID).
		SetName(input.Name).
		SetEndParamDefinitions(input.EndParamDefinitions)
	if input.Description != nil {
		draftQuery.SetDescription(*input.Description)
	} else {
		draftQuery.ClearDescription()
	}
	draft, err := draftQuery.Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create flow draft: %w", err)
	}
	if err := r.importBlocks(ctx, input); err != nil {
		return nil, fmt.Errorf("failed to import blocks: %w", err)
	}
	for _, connectorInput := range input.Connectors {
		if _, err := r.AddConnector(ctx, input.ID, *connectorInput); err != nil {
			return nil, fmt.Errorf("failed to add connector: %w", err)
		}
	}
	return draft, nil
}
