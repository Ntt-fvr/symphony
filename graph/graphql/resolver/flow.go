// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"strconv"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine"
)

type flowResolver struct{}

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

func (r mutationResolver) collectBlockVariables(input models.ImportFlowDraftInput) []*models.BlockVariableInput {
	var blockVariableInputs []*models.BlockVariableInput
	for _, blk := range input.EndBlocks {
		for _, variableExpression := range blk.Params {
			for _, blockVariable := range variableExpression.BlockVariables {
				blockVariableInputs = append(blockVariableInputs, blockVariable)
			}
		}

	}
	for _, blk := range input.SubflowBlocks {
		for _, variableExpression := range blk.Params {
			for _, blockVariable := range variableExpression.BlockVariables {
				blockVariableInputs = append(blockVariableInputs, blockVariable)
			}
		}

	}
	for _, blk := range input.TriggerBlocks {
		for _, variableExpression := range blk.Params {
			for _, blockVariable := range variableExpression.BlockVariables {
				blockVariableInputs = append(blockVariableInputs, blockVariable)
			}
		}

	}
	for _, blk := range input.ActionBlocks {
		for _, variableExpression := range blk.Params {
			for _, blockVariable := range variableExpression.BlockVariables {
				blockVariableInputs = append(blockVariableInputs, blockVariable)
			}
		}

	}
	for _, blk := range input.DecisionBlocks {
		for _, route := range blk.Routes {
			for _, blockVariable := range route.Condition.BlockVariables {
				blockVariableInputs = append(blockVariableInputs, blockVariable)
			}
		}
	}
	return blockVariableInputs
}

func (r mutationResolver) collectBlockCids(input models.ImportFlowDraftInput) []string {
	var blockCids []string
	if input.StartBlock != nil {
		blockCids = append(blockCids, input.StartBlock.Cid)
	}
	for _, blk := range input.EndBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.ActionBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.DecisionBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.GotoBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.SubflowBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.TriggerBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.TrueFalseBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	return blockCids
}

func (r mutationResolver) getVariableDefinitions(blockCid string, input models.ImportFlowDraftInput) ([]*flowschema.VariableDefinition, error) {
	actionFactory  := actions.NewFactory()
	triggerFactory := triggers.NewFactory()
	if input.StartBlock != nil {
		if input.StartBlock.Cid == blockCid {
			return input.StartBlock.ParamDefinitions, nil
		}
	}
	for _, blk := range input.ActionBlocks {
		if blk.Cid == blockCid {
			actionType, err := actionFactory.GetType(blk.ActionType)
			if err != nil {
				return nil, err
			}
			return actionType.Variables(), nil
		}
	}
	for _, blk := range input.TriggerBlocks {
		if blk.Cid == blockCid {
			triggerType, err := triggerFactory.GetType(blk.TriggerType)
			if err != nil {
				return nil, err
			}
			return triggerType.Variables(), nil
		}
	}
	return nil, nil
}

func (r mutationResolver) collectWorkOrderTypeByBlock(input models.ImportFlowDraftInput) (map[string]int, error) {
	woTypeIds := make(map[string]int)
	for _, blk := range input.ActionBlocks {
		for _, param := range blk.Params {
			if param.Type == enum.VariableDefinition && *param.VariableDefinitionKey == actions.InputVariableType {
				woTypeID, err := strconv.Atoi(param.Expression)
				if err != nil {
					return nil, fmt.Errorf("There is a misktake in the Work Order Type Id: %s for block %s", param.Expression, blk.Cid)
				}
				woTypeIds[blk.Cid] = woTypeID
				break
			}
		}
	}
	for _, blk := range input.TriggerBlocks {
		for _, param := range blk.Params {
			if param.Type == enum.VariableDefinition && *param.VariableDefinitionKey == actions.InputVariableType {
				woTypeID, err := strconv.Atoi(param.Expression)
				if err != nil {
					return nil, fmt.Errorf("There is a misktake in the Work Order Type Id: %s for block %s", param.Expression, blk.Cid)
				}
				woTypeIds[blk.Cid] = woTypeID
				break
			}
		}
	}
	return woTypeIds, nil
}

func (r mutationResolver) validateBlockVariables(ctx context.Context, input models.ImportFlowDraftInput) error {
	blockVariableInputs := r.collectBlockVariables(input)
	blockCids := r.collectBlockCids(input)
	woTypeIds, err := r.collectWorkOrderTypeByBlock(input)
	if err != nil {
		return err
	}
	for _, blockVariableInput := range blockVariableInputs {
		//validate that BlockCId exists in input
		var isBlockCid bool
		for _, blockCid := range blockCids {
			if blockVariableInput.BlockCid == blockCid {
				isBlockCid = true
				break
			}
		}
		if !isBlockCid {
			return fmt.Errorf("BlockCid %s doesn't exist", blockVariableInput.BlockCid)
		}
		//validate that the property exists associated with a BlockCI workorderType
		if blockVariableInput.Type == enum.PropertyTypeDefinition {
			woTypeId := woTypeIds[blockVariableInput.BlockCid]
			_, ok := flowengine.FindProperty(ctx, *blockVariableInput.PropertyTypeID, woTypeId)
			if !ok {
				return fmt.Errorf("PropertyTypeID %q is not valid for WorkOrderType: %q blockCId: %s", *blockVariableInput.PropertyTypeID, woTypeId, blockVariableInput.BlockCid)
			}
		}else if (blockVariableInput.Type == enum.VariableDefinition) {
			variableDefinitions, err := r.getVariableDefinitions(blockVariableInput.BlockCid, input)
			if err != nil {
				return err
			}
			var isVariableDefinition bool
			for _, variableDefinition := range variableDefinitions {
				if (variableDefinition.Key == *blockVariableInput.VariableDefinitionKey) {
					isVariableDefinition = true
				}
			}
			if !isVariableDefinition {
				return fmt.Errorf("variableDefinition %s doesn't exist for block %s", *blockVariableInput.VariableDefinitionKey, blockVariableInput.BlockCid)
			}
		}

	}
	return nil
}

func (r mutationResolver) importBlocks(ctx context.Context, input models.ImportFlowDraftInput) error {
	var newBlockInputs []interface{}
	createdBlockCIDs := make(map[string]struct{})
	if err := r.validateBlockVariables(ctx, input); err != nil {
		return err
	}
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
				routes := blkInput.Routes
				var paramsDecision []*models.VariableExpressionInput
				for _, route := range routes {
					paramsDecision = append(paramsDecision, route.Condition)
				}
				if ok := r.paramsHaveDependencies(paramsDecision, createdBlockCIDs); ok {
					if _, err := r.AddDecisionBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
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
		newBlockInputs = nil
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
