// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"errors"
	"fmt"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
)

type blockResolver struct {
	triggerFactory triggers.Factory
	actionFactory  actions.Factory
}

type connectorResolver struct{}

func getDraftBlock(ctx context.Context, flowDraftID int, blockCid string) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.Query().
		Where(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		).
		Only(ctx)
}

func getFlowBlock(ctx context.Context, flowID int, blockCid string) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.Query().
		Where(
			block.HasFlowWith(flow.ID(flowID)),
			block.Cid(blockCid),
		).
		Only(ctx)
}

func (r connectorResolver) Source(ctx context.Context, obj *flowschema.Connector) (*ent.Block, error) {
	switch {
	case obj.FlowDraftID != nil:
		return getDraftBlock(ctx, *obj.FlowDraftID, obj.SourceBlockCid)
	case obj.FlowID != nil:
		return getFlowBlock(ctx, *obj.FlowID, obj.SourceBlockCid)
	default:
		return nil, errors.New("failed to find flow parent")
	}
}

func (r connectorResolver) Target(ctx context.Context, obj *flowschema.Connector) (*ent.Block, error) {
	switch {
	case obj.FlowDraftID != nil:
		return getDraftBlock(ctx, *obj.FlowDraftID, obj.TargetBlockCid)
	case obj.FlowID != nil:
		return getFlowBlock(ctx, *obj.FlowID, obj.TargetBlockCid)
	default:
		return nil, errors.New("failed to find flow parent")
	}
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
	blockCID string,
	blockName string,
	blockType block.Type,
	flowDraftID int,
	uiRepresentation *flowschema.BlockUIRepresentation) *ent.BlockCreate {
	client := ent.FromContext(ctx)
	return client.Block.Create().
		SetName(blockName).
		SetCid(blockCID).
		SetType(blockType).
		SetNillableUIRepresentation(uiRepresentation).
		SetFlowDraftID(flowDraftID)
}

func getBlockVariables(ctx context.Context, inputVariables []*models.VariableExpressionInput, blockID int) ([]*flowschema.VariableExpression, error) {
	client := ent.FromContext(ctx)
	vars := make([]*flowschema.VariableExpression, 0, len(inputVariables))
	for _, variable := range inputVariables {
		var blockVariables []*flowschema.BlockVariable
		for _, blockVar := range variable.BlockVariables {
			varBlockID, err := client.Block.Query().
				Where(block.ID(blockID)).
				QueryFlowDraft().
				QueryBlocks().
				Where(block.Cid(blockVar.BlockCid)).
				OnlyID(ctx)
			if err != nil {
				return nil, err
			}
			blockVariables = append(blockVariables, &flowschema.BlockVariable{
				BlockID:               varBlockID,
				VariableDefinitionKey: blockVar.VariableDefinitionKey,
			})
		}
		vars = append(vars, &flowschema.VariableExpression{
			BlockID:               blockID,
			VariableDefinitionKey: variable.VariableDefinitionKey,
			Expression:            variable.Expression,
			BlockVariables:        blockVariables,
		})
	}
	return vars, nil
}

func (r mutationResolver) AddStartBlock(ctx context.Context, flowDraftID int, input models.StartBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeStart, flowDraftID, input.UIRepresentation)
	return mutation.
		SetStartParamDefinitions(input.ParamDefinitions).
		Save(ctx)
}

func (r mutationResolver) AddEndBlock(ctx context.Context, flowDraftID int, input models.EndBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeEnd, flowDraftID, input.UIRepresentation)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables, err := getBlockVariables(ctx, input.Params, b.ID)
	if err != nil {
		return nil, err
	}
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddGotoBlock(ctx context.Context, flowDraftID int, input models.GotoBlockInput) (*ent.Block, error) {
	targetBlockID, err := getDraftBlock(ctx, flowDraftID, input.TargetBlockCid)
	if err != nil {
		return nil, err
	}
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeGoTo, flowDraftID, input.UIRepresentation)
	return mutation.
		SetGotoBlock(targetBlockID).
		Save(ctx)
}

func (r mutationResolver) AddSubflowBlock(ctx context.Context, flowDraftID int, input models.SubflowBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeSubFlow, flowDraftID, input.UIRepresentation)
	b, err := mutation.SetSubFlowID(input.FlowID).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables, err := getBlockVariables(ctx, input.Params, b.ID)
	if err != nil {
		return nil, err
	}
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddTriggerBlock(ctx context.Context, flowDraftID int, input models.TriggerBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeTrigger, flowDraftID, input.UIRepresentation)
	b, err := mutation.SetTriggerType(input.TriggerType).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables, err := getBlockVariables(ctx, input.Params, b.ID)
	if err != nil {
		return nil, err
	}
	return b.Update().
		SetInputParams(blockVariables).
		Save(ctx)
}

func (r mutationResolver) AddActionBlock(ctx context.Context, flowDraftID int, input models.ActionBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, input.Name, block.TypeAction, flowDraftID, input.UIRepresentation)
	b, err := mutation.SetActionType(input.ActionType).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	blockVariables, err := getBlockVariables(ctx, input.Params, b.ID)
	if err != nil {
		return nil, err
	}
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

func (r mutationResolver) AddConnector(ctx context.Context, flowDraftID int, input models.ConnectorInput) (*flowschema.Connector, error) {
	client := ent.FromContext(ctx)
	source, err := getDraftBlock(ctx, flowDraftID, input.SourceBlockCid)
	if err != nil {
		return nil, fmt.Errorf("failed to find source block: %w", err)
	}
	target, err := getDraftBlock(ctx, flowDraftID, input.TargetBlockCid)
	if err != nil {
		return nil, fmt.Errorf("failed to find target block: %w", err)
	}
	if err := client.Block.UpdateOne(source).
		AddNextBlocks(target).
		Exec(ctx); err != nil {
		return nil, err
	}
	return &flowschema.Connector{
		FlowDraftID:    pointer.ToInt(flowDraftID),
		SourceBlockCid: input.SourceBlockCid,
		TargetBlockCid: input.TargetBlockCid,
	}, nil
}

func (r mutationResolver) DeleteConnector(ctx context.Context, flowDraftID int, input models.ConnectorInput) (bool, error) {
	client := ent.FromContext(ctx)
	source, err := client.Block.Query().
		Where(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(input.SourceBlockCid),
		).
		WithNextBlocks(func(query *ent.BlockQuery) {
			query.Where(block.Cid(input.TargetBlockCid))
		}).
		Only(ctx)
	if err != nil {
		return false, fmt.Errorf("failed to find source block: %w", err)
	}
	if len(source.Edges.NextBlocks) == 0 {
		return false, fmt.Errorf("failed to connected target block: %w", err)
	}
	if err := client.Block.UpdateOneID(source.ID).
		RemoveNextBlocks(source.Edges.NextBlocks...).
		Exec(ctx); err != nil {
		return false, fmt.Errorf("failed to remove connector: %w", err)
	}
	return true, nil
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
