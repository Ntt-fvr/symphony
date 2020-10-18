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
	"github.com/facebookincubator/symphony/pkg/ent/entrypoint"
	"github.com/facebookincubator/symphony/pkg/ent/exitpoint"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/flowengine"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
)

type blockResolver struct {
	triggerFactory triggers.Factory
	actionFactory  actions.Factory
}

func getDraftBlock(ctx context.Context, flowDraftID int, blockCid string) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.Query().
		Where(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		).
		Only(ctx)
}

func (r blockResolver) NextBlocks(ctx context.Context, obj *ent.Block) ([]*ent.Block, error) {
	return obj.QueryExitPoints().
		QueryNextEntryPoints().
		QueryParentBlock().
		All(ctx)
}

func (r blockResolver) PrevBlocks(ctx context.Context, obj *ent.Block) ([]*ent.Block, error) {
	return obj.QueryEntryPoint().
		QueryPrevExitPoints().
		QueryParentBlock().
		All(ctx)
}

func (r blockResolver) InputParamDefinitions(ctx context.Context, obj *ent.Block) ([]*flowschema.VariableDefinition, error) {
	return flowengine.GetInputVariableDefinitions(ctx, obj, r.triggerFactory, r.actionFactory)
}

func (r blockResolver) OutputParamDefinitions(ctx context.Context, obj *ent.Block) ([]*flowschema.VariableDefinition, error) {
	return flowengine.GetOutputVariableDefinitions(ctx, obj, r.triggerFactory, r.actionFactory)
}

func getDefaultExitPoint(ctx context.Context, obj *ent.Block) (*ent.ExitPoint, error) {
	exitPoint, err := obj.QueryExitPoints().
		Where(exitpoint.RoleEQ(flowschema.ExitPointRoleDefault)).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query default exit point: %w", err)
	}
	return exitPoint, nil
}

func getDefaultEntryPoint(ctx context.Context, obj *ent.Block) (*ent.EntryPoint, error) {
	entryPoint, err := obj.QueryEntryPoint().
		Where(entrypoint.RoleEQ(flowschema.EntryPointRoleDefault)).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query default entry point: %w", err)
	}
	return entryPoint, nil
}

func getDefaultEntryExitPoints(ctx context.Context, obj *ent.Block) (*ent.EntryPoint, *ent.ExitPoint, error) {
	var (
		entryPoint *ent.EntryPoint
		exitPoint  *ent.ExitPoint
		err        error
	)
	switch obj.Type {
	case block.TypeStart, block.TypeTrigger:
		exitPoint, err = getDefaultExitPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
	case block.TypeEnd, block.TypeGoTo:
		entryPoint, err = getDefaultEntryPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
	case block.TypeDecision, block.TypeSubFlow, block.TypeAction:
		exitPoint, err = getDefaultExitPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
		entryPoint, err = getDefaultEntryPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
	}
	return entryPoint, exitPoint, nil
}

func (r blockResolver) Details(ctx context.Context, obj *ent.Block) (models.BlockDetails, error) {
	entryPoint, exitPoint, err := getDefaultEntryExitPoints(ctx, obj)
	if err != nil {
		return nil, err
	}
	switch obj.Type {
	case block.TypeStart:
		return &models.StartBlock{
			ParamDefinitions: obj.StartParamDefinitions,
			ExitPoint:        exitPoint,
		}, nil
	case block.TypeEnd:
		return &models.EndBlock{
			Params:     obj.InputParams,
			EntryPoint: entryPoint,
		}, nil
	case block.TypeDecision:
		var routes []*models.DecisionRoute
		exitPoints, err := obj.QueryExitPoints().
			Where(exitpoint.RoleEQ(flowschema.ExitPointRoleDecision)).
			All(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to query exit points: %w", err)
		}
		for _, exitPoint := range exitPoints {
			routes = append(routes, &models.DecisionRoute{ExitPoint: exitPoint})
		}
		return &models.DecisionBlock{
			EntryPoint:       entryPoint,
			DefaultExitPoint: exitPoint,
			Routes:           routes,
		}, nil
	case block.TypeSubFlow:
		flow, err := obj.QuerySubFlow().
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return &models.SubflowBlock{
			Flow:       flow,
			Params:     obj.InputParams,
			EntryPoint: entryPoint,
			ExitPoint:  exitPoint,
		}, nil
	case block.TypeGoTo:
		gotoBlock, err := obj.QueryGotoBlock().Only(ctx)
		if err != nil && !ent.IsNotFound(err) {
			return nil, err
		}
		return &models.GotoBlock{
			Target:     gotoBlock,
			EntryPoint: entryPoint,
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
			ExitPoint:   exitPoint,
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
			EntryPoint: entryPoint,
			ExitPoint:  exitPoint,
		}, nil
	default:
		return nil, fmt.Errorf("type %q is unknown", obj.Type)
	}
}

func addBlockMutation(
	ctx context.Context,
	blockCID string,
	blockType block.Type,
	flowDraftID int,
	uiRepresentation *flowschema.BlockUIRepresentation) *ent.BlockCreate {
	client := ent.FromContext(ctx)
	return client.Block.Create().
		SetCid(blockCID).
		SetType(blockType).
		SetUIRepresentation(uiRepresentation).
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
	mutation := addBlockMutation(ctx, input.Cid, block.TypeStart, flowDraftID, input.UIRepresentation)
	return mutation.
		SetStartParamDefinitions(input.ParamDefinitions).
		Save(ctx)
}

func (r mutationResolver) AddEndBlock(ctx context.Context, flowDraftID int, input models.EndBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeEnd, flowDraftID, input.UIRepresentation)
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

func (r mutationResolver) AddDecisionBlock(ctx context.Context, flowDraftID int, input models.DecisionBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeDecision, flowDraftID, input.UIRepresentation)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	client := r.ClientFrom(ctx)
	for _, route := range input.Routes {
		if route.Cid != nil {
			if _, err := client.ExitPoint.Create().
				SetRole(flowschema.ExitPointRoleDecision).
				SetCid(*route.Cid).
				SetParentBlockID(b.ID).
				Save(ctx); err != nil {
				return nil, fmt.Errorf("failed to create decision exit points: %w", err)
			}
		}
	}
	return b, nil
}

func (r mutationResolver) AddGotoBlock(ctx context.Context, flowDraftID int, input models.GotoBlockInput) (*ent.Block, error) {
	targetBlockID, err := getDraftBlock(ctx, flowDraftID, input.TargetBlockCid)
	if err != nil {
		return nil, err
	}
	mutation := addBlockMutation(ctx, input.Cid, block.TypeGoTo, flowDraftID, input.UIRepresentation)
	return mutation.
		SetGotoBlock(targetBlockID).
		Save(ctx)
}

func (r mutationResolver) AddSubflowBlock(ctx context.Context, flowDraftID int, input models.SubflowBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeSubFlow, flowDraftID, input.UIRepresentation)
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
	mutation := addBlockMutation(ctx, input.Cid, block.TypeTrigger, flowDraftID, input.UIRepresentation)
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
	mutation := addBlockMutation(ctx, input.Cid, block.TypeAction, flowDraftID, input.UIRepresentation)
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

func getExitPointRoleOrDefault(pid *models.ExitPointID) flowschema.ExitPointRole {
	if pid == nil || pid.Role == nil {
		return flowschema.ExitPointRoleDefault
	}
	return *pid.Role
}

func getExitPoint(ctx context.Context, flowDraftID int, blockCid string, pid *models.ExitPointID) (*ent.ExitPoint, error) {
	exitPointPredicates := []predicate.ExitPoint{
		exitpoint.HasParentBlockWith(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		),
	}
	if pid != nil && pid.Cid != nil {
		exitPointPredicates = append(exitPointPredicates, exitpoint.Cid(*pid.Cid))
	} else {
		exitPointPredicates = append(exitPointPredicates,
			exitpoint.RoleEQ(getExitPointRoleOrDefault(pid)))
	}
	client := ent.FromContext(ctx)
	exitPoint, err := client.ExitPoint.Query().
		Where(exitPointPredicates...).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query exit point: %w", err)
	}
	return exitPoint, nil
}

func getEntryPointRoleOrDefault(pid *models.EntryPointID) flowschema.EntryPointRole {
	if pid == nil || pid.Role == nil {
		return flowschema.EntryPointRoleDefault
	}
	return *pid.Role
}

func getEntryPoint(ctx context.Context, flowDraftID int, blockCid string, pid *models.EntryPointID) (*ent.EntryPoint, error) {
	entryPointPredicates := []predicate.EntryPoint{
		entrypoint.HasParentBlockWith(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		),
	}
	if pid != nil && pid.Cid != nil {
		entryPointPredicates = append(entryPointPredicates, entrypoint.Cid(*pid.Cid))
	} else {
		entryPointPredicates = append(entryPointPredicates,
			entrypoint.RoleEQ(getEntryPointRoleOrDefault(pid)))
	}
	client := ent.FromContext(ctx)
	entryPoint, err := client.EntryPoint.Query().
		Where(entryPointPredicates...).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query entry point: %w", err)
	}
	return entryPoint, nil
}

func (r mutationResolver) AddConnector(ctx context.Context, flowDraftID int, input models.ConnectorInput) (*models.Connector, error) {
	exitPoint, err := getExitPoint(ctx, flowDraftID, input.SourceBlockCid, input.SourcePid)
	if err != nil {
		return nil, err
	}
	entryPoint, err := getEntryPoint(ctx, flowDraftID, input.TargetBlockCid, input.TargetPid)
	if err != nil {
		return nil, err
	}
	connectorExists, err := exitPoint.QueryNextEntryPoints().
		Where(entrypoint.ID(entryPoint.ID)).
		Exist(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query if connector exists: %w", err)
	}
	if connectorExists {
		return nil, fmt.Errorf("connector already exists")
	}
	if err := exitPoint.Update().
		AddNextEntryPoints(entryPoint).
		Exec(ctx); err != nil {
		return nil, err
	}
	return &models.Connector{
		Source: exitPoint,
		Target: entryPoint,
	}, nil
}

func (r mutationResolver) DeleteConnector(ctx context.Context, flowDraftID int, input models.ConnectorInput) (bool, error) {
	exitPoint, err := getExitPoint(ctx, flowDraftID, input.SourceBlockCid, input.SourcePid)
	if err != nil {
		return false, err
	}
	entryPoint, err := getEntryPoint(ctx, flowDraftID, input.TargetBlockCid, input.TargetPid)
	if err != nil {
		return false, err
	}
	connectorExists, err := exitPoint.QueryNextEntryPoints().
		Where(entrypoint.ID(entryPoint.ID)).
		Exist(ctx)
	if err != nil {
		return false, fmt.Errorf("failed to query if connector exists: %w", err)
	}
	if !connectorExists {
		return false, fmt.Errorf("failed to delete connector")
	}
	if err := exitPoint.Update().
		RemoveNextEntryPoints(entryPoint).
		Exec(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r mutationResolver) EditBlock(ctx context.Context, input models.EditBlockInput) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.UpdateOneID(input.ID).
		SetUIRepresentation(input.UIRepresentation).
		Save(ctx)
}
