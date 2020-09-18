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
	"github.com/facebookincubator/symphony/pkg/flowengine"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
)

type blockResolver struct {
	triggerFactory triggers.Factory
	actionFactory  actions.Factory
}

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

func (r blockResolver) InputParamDefinitions(ctx context.Context, obj *ent.Block) ([]*flowschema.VariableDefinition, error) {
	return flowengine.GetInputVariableDefinitions(ctx, obj, r.triggerFactory, r.actionFactory)
}

func (r blockResolver) OutputParamDefinitions(ctx context.Context, obj *ent.Block) ([]*flowschema.VariableDefinition, error) {
	return flowengine.GetOutputVariableDefinitions(ctx, obj, r.triggerFactory, r.actionFactory)
}

func (r blockResolver) Details(ctx context.Context, obj *ent.Block) (models.BlockDetails, error) {
	switch obj.Type {
	case block.TypeStart:
		return &models.StartBlock{
			ParamDefinitions: obj.StartParamDefinitions,
		}, nil
	case block.TypeEnd:
		return &models.EndBlock{
			Params: obj.InputParams,
		}, nil
	case block.TypeSubFlow:
		flow, err := obj.QuerySubFlow().
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return &models.SubflowBlock{
			Flow:   flow,
			Params: obj.InputParams,
		}, nil
	case block.TypeGoTo:
		gotoBlock, err := obj.QueryGotoBlock().Only(ctx)
		if err != nil && !ent.IsNotFound(err) {
			return nil, err
		}
		return &models.GotoBlock{
			Target: gotoBlock,
		}, nil
	case block.TypeTrigger:
		if obj.TriggerType == nil {
			return nil, fmt.Errorf("trigger type for trigger block %d not found", obj.ID)
		}
		triggerType, err := r.triggerFactory.GetType(*obj.TriggerType)
		if err != nil {
			return nil, err
		}
		return &models.TriggerBlock{
			TriggerType: triggerType,
			Params:      obj.InputParams,
		}, nil
	case block.TypeAction:
		if obj.ActionType == nil {
			return nil, fmt.Errorf("action type for action block %d not found", obj.ID)
		}
		actionType, err := r.actionFactory.GetType(*obj.ActionType)
		if err != nil {
			return nil, err
		}
		return &models.ActionBlock{
			ActionType: actionType,
			Params:     obj.InputParams,
		}, nil
	default:
		return nil, fmt.Errorf("type %q is unknown", obj.Type)
	}
}

func addBlockMutation(
	ctx context.Context,
	blockName string,
	blockType block.Type,
	flowDraftID int,
	uiRepresentation *flowschema.BlockUIRepresentation) *ent.BlockCreate {
	client := ent.FromContext(ctx)
	return client.Block.Create().
		SetName(blockName).
		SetType(blockType).
		SetNillableUIRepresentation(uiRepresentation).
		SetFlowDraftID(flowDraftID)
}

func getBlockVariables(inputVariables []*models.VariableExpressionInput, blockID int) []*flowschema.VariableExpression {
	vars := make([]*flowschema.VariableExpression, 0, len(inputVariables))
	for _, variable := range inputVariables {
		vars = append(vars, &flowschema.VariableExpression{
			BlockID:               blockID,
			VariableDefinitionKey: variable.VariableDefinitionKey,
			Expression:            variable.Expression,
			BlockVariables:        variable.BlockVariables,
		})
	}
	return vars
}

func (r mutationResolver) AddStartBlock(ctx context.Context, input models.AddStartBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeStart, input.FlowDraftID, input.UIRepresentation)
	return mutation.
		SetStartParamDefinitions(input.ParamDefinitions).
		Save(ctx)
}

func (r mutationResolver) AddEndBlock(ctx context.Context, input models.AddEndBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeEnd, input.FlowDraftID, input.UIRepresentation)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables := getBlockVariables(input.Params, b.ID)
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddGotoBlock(ctx context.Context, input models.AddGotoBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeGoTo, input.FlowDraftID, input.UIRepresentation)
	return mutation.
		SetGotoBlockID(input.TargetBlockID).
		Save(ctx)
}

func (r mutationResolver) AddSubflowBlock(ctx context.Context, input models.AddSubflowBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeSubFlow, input.FlowDraftID, input.UIRepresentation)
	b, err := mutation.SetSubFlowID(input.FlowID).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables := getBlockVariables(input.Params, b.ID)
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddTriggerBlock(ctx context.Context, input models.AddTriggerBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeTrigger, input.FlowDraftID, input.UIRepresentation)
	b, err := mutation.SetTriggerType(input.TriggerType).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables := getBlockVariables(input.Params, b.ID)
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddActionBlock(ctx context.Context, input models.AddActionBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Name, block.TypeAction, input.FlowDraftID, input.UIRepresentation)
	b, err := mutation.SetActionType(input.ActionType).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables := getBlockVariables(input.Params, b.ID)
	return b.Update().
		SetInputParams(blockVariables).
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

func (r mutationResolver) AddConnector(ctx context.Context, input models.ConnectorInput) (*models.ConnectorResult, error) {
	client := ent.FromContext(ctx)
	target, err := client.Block.Get(ctx, input.TargetBlockID)
	if err != nil {
		return nil, err
	}
	source, err := client.Block.UpdateOneID(input.SourceBlockID).
		AddNextBlocks(target).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	return &models.ConnectorResult{
		Source: source,
		Target: target,
	}, nil
}

func (r mutationResolver) DeleteConnector(ctx context.Context, input models.ConnectorInput) (*models.ConnectorResult, error) {
	client := ent.FromContext(ctx)
	source, err := client.Block.Query().
		Where(
			block.ID(input.SourceBlockID),
		).
		WithNextBlocks(func(query *ent.BlockQuery) {
			query.Where(block.ID(input.TargetBlockID))
		}).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to find source block: %w", err)
	}
	if len(source.Edges.NextBlocks) == 0 {
		return nil, fmt.Errorf("failed to connected target block: %w", err)
	}
	if err := client.Block.UpdateOneID(input.SourceBlockID).
		RemoveNextBlockIDs(input.TargetBlockID).
		Exec(ctx); err != nil {
		return nil, fmt.Errorf("failed to remove connector: %w", err)
	}
	return &models.ConnectorResult{
		Source: source,
		Target: source.Edges.NextBlocks[0],
	}, nil
}

func (r mutationResolver) EditBlock(ctx context.Context, input models.EditBlockInput) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	m := client.Block.UpdateOneID(input.ID).
		SetNillableUIRepresentation(input.UIRepresentation)
	if input.Name != nil {
		m.SetName(*input.Name)
	}
	return m.Save(ctx)
}
