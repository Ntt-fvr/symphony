// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"strconv"

	"github.com/pkg/errors"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/entrypoint"
	"github.com/facebookincubator/symphony/pkg/ent/exitpoint"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
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

// TODO: remove the resolver after usage is removed from UI
func (r blockResolver) NextBlocks(ctx context.Context, obj *ent.Block) ([]*ent.Block, error) {
	return obj.QueryExitPoints().
		QueryNextEntryPoints().
		QueryParentBlock().
		All(ctx)
}

// TODO: remove the resolver after usage is removed from UI
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
	if obj.Type != block.TypeStart && obj.Type != block.TypeTrigger {
		entryPoint, err = getDefaultEntryPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
	}
	if obj.Type != block.TypeEnd && obj.Type != block.TypeGoTo && obj.Type != block.TypeTrueFalse {
		exitPoint, err = getDefaultExitPoint(ctx, obj)
		if err != nil {
			return nil, nil, err
		}
	}
	return entryPoint, exitPoint, nil
}

// nolint: funlen
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
		var workOrderType *ent.WorkOrderType
		var workerType *ent.WorkerType
		if obj.ActionType == nil {
			return nil, fmt.Errorf("action type for action block %d not found", obj.ID)
		}
		actionType, err := r.actionFactory.GetType(*obj.ActionType)
		if err != nil {
			return nil, err
		}
		if templateName, ok := getTemplateName(ctx, obj); ok {
			obj.InputParams = append(obj.InputParams, templateName)
		}

		if *obj.ActionType == flowschema.ActionTypeWorkOrder {
			workOrderType, err = getWorkOrderType(ctx, obj)
			if err != nil {
				return nil, err
			}
		}
		if *obj.ActionType == flowschema.ActionTypeWorker {
			workerType, err = getWorkerType(ctx, obj)
			if err != nil {
				return nil, err
			}
		}
		return &models.ActionBlock{
			ActionType:    actionType,
			Params:        obj.InputParams,
			EntryPoint:    entryPoint,
			ExitPoint:     exitPoint,
			WorkOrderType: workOrderType,
			WorkerType:    workerType,
		}, nil
	case block.TypeChoice:
		var rules []*models.DecisionRoute
		exitPoints, err := obj.QueryExitPoints().
			Where(exitpoint.RoleEQ(flowschema.ExitPointRoleChoice)).
			All(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to query exit points: %w", err)
		}
		for _, exitPoint := range exitPoints {
			rules = append(rules, &models.DecisionRoute{ExitPoint: exitPoint})
		}
		return &models.ChoiceBlock{
			EntryPoint:       entryPoint,
			DefaultExitPoint: exitPoint,
			Rules:            rules,
		}, nil
	case block.TypeInvokeRestAPI:
		var (
			url, body string
			method    block.URLMethod
		)
		if obj.URL != nil {
			url = *obj.URL
		} else {
			url = ""
		}

		if obj.Body != nil {
			body = *obj.Body
		} else {
			body = ""
		}

		if obj.URLMethod != nil {
			method = *obj.URLMethod
		}

		return &models.InvokeRestAPIBlock{
			EntryPoint:   entryPoint,
			ExitPoint:    exitPoint,
			URL:          url,
			Method:       method,
			Headers:      obj.Headers,
			Body:         body,
			AuthType:     &obj.AuthType,
			User:         &obj.User,
			Password:     &obj.Password,
			ClientID:     &obj.ClientID,
			ClientSecret: &obj.ClientSecret,
			OidcURL:      &obj.OidcURL,
		}, nil
	case block.TypeTimer:
		return &models.TimerBlock{
			ExitPoint:         exitPoint,
			Behavior:          *obj.TimerBehavior,
			Expression:        obj.TimerExpression,
			EnableExpressionL: obj.EnableTimerExpression,
			Seconds:           obj.Seconds,
		}, nil
	case block.TypeExecuteFlow:
		return &models.ExecuteFlowBlock{
			ExitPoint:  exitPoint,
			EntryPoint: entryPoint,
			Params:     obj.InputParams,
		}, nil
	case block.TypeWaitForSignal:
		return &models.WaitForSignalBlock{
			ExitPoint:    exitPoint,
			EntryPoint:   entryPoint,
			Type:         &obj.SignalType,
			SignalModule: &obj.SignalModule,
			CustomFilter: &obj.CustomFilter,
			Blocked:      obj.BlockFlow,
		}, nil
	case block.TypeKafka:
		return &models.KafkaBlock{
			ExitPoint:  exitPoint,
			EntryPoint: entryPoint,
			Brokers:    obj.KafkaBrokers,
			Topic:      obj.KafkaTopic,
			Message:    obj.KafkaMessage,
			Type:       obj.KafkaMessageType,
		}, nil
	default:
		return nil, fmt.Errorf("type %q is unknown", obj.Type)
	}
}

func getWorkOrderType(ctx context.Context, obj *ent.Block) (*ent.WorkOrderType, error) {
	client := ent.FromContext(ctx)
	for _, inputParam := range obj.InputParams {
		if inputParam.VariableDefinitionKey == actions.InputVariableType {
			typeID, err := strconv.Atoi(inputParam.Expression)
			if err != nil {
				return nil, nil
			}
			return client.WorkOrderType.Get(ctx, typeID)
		}
	}
	return nil, nil
}

func getWorkerType(ctx context.Context, obj *ent.Block) (*ent.WorkerType, error) {
	client := ent.FromContext(ctx)
	for _, inputParam := range obj.InputParams {
		if inputParam.VariableDefinitionKey == actions.InputVariableWorkerType {
			typeID, err := strconv.Atoi(inputParam.Expression)
			if err != nil {
				return nil, nil
			}
			return client.WorkerType.Get(ctx, typeID)
		}
	}
	return nil, nil
}

func getTemplateName(ctx context.Context, obj *ent.Block) (*flowschema.VariableExpression, bool) {
	client := ent.FromContext(ctx)
	for _, inputParam := range obj.InputParams {
		if inputParam.VariableDefinitionKey == actions.InputVariableType || inputParam.VariableDefinitionKey == actions.InputVariableWorkerType {
			typeID, err := strconv.Atoi(inputParam.Expression)
			if err != nil {
				return nil, false
			}
			var name string
			if *obj.ActionType == flowschema.ActionTypeWorkOrder {
				workOrderType, err := client.WorkOrderType.Get(ctx, typeID)
				if err != nil {
					return nil, false
				}
				name = workOrderType.Name
			} else if *obj.ActionType == flowschema.ActionTypeWorker {
				workerType, err := client.WorkerType.Get(ctx, typeID)
				if err != nil {
					return nil, false
				}
				name = workerType.Name
			}
			templateName := flowschema.VariableExpression{
				BlockID:               obj.ID,
				Type:                  enum.VariableDefinition,
				VariableDefinitionKey: actions.InputVariableTypeName,
				Expression:            name,
			}
			return &templateName, true
		}
	}
	return nil, false
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
		if variable.Type == actions.InputVariableTypeName {
			continue
		}
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

			switch blockVar.Type {
			case enum.VariableDefinition:
				blockVariables = append(blockVariables, &flowschema.BlockVariable{
					BlockID:               varBlockID,
					Type:                  blockVar.Type,
					VariableDefinitionKey: *blockVar.VariableDefinitionKey,
				})
			case enum.PropertyTypeDefinition:
				blockVariables = append(blockVariables, &flowschema.BlockVariable{
					BlockID:        varBlockID,
					Type:           blockVar.Type,
					PropertyTypeID: *blockVar.PropertyTypeID,
				})
			case enum.ChekListItemDefinition:
				blockVariables = append(blockVariables, &flowschema.BlockVariable{
					BlockID:                   varBlockID,
					Type:                      blockVar.Type,
					CheckListItemDefinitionID: *blockVar.CheckListItemDefinitionID,
				})
			}
		}
		switch variable.Type {
		case enum.VariableDefinition:
			vars = append(vars, &flowschema.VariableExpression{
				BlockID:               blockID,
				Type:                  variable.Type,
				VariableDefinitionKey: *variable.VariableDefinitionKey,
				Expression:            variable.Expression,
				BlockVariables:        blockVariables,
			})
		case enum.PropertyTypeDefinition:
			vars = append(vars, &flowschema.VariableExpression{
				BlockID:        blockID,
				Type:           variable.Type,
				PropertyTypeID: *variable.PropertyTypeID,
				Expression:     variable.Expression,
				BlockVariables: blockVariables,
			})
		case enum.DecisionDefinition:
			vars = append(vars, &flowschema.VariableExpression{
				BlockID:        blockID,
				Type:           variable.Type,
				Expression:     variable.Expression,
				BlockVariables: blockVariables,
			})
		}
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

func (r mutationResolver) AddGotoBlock(ctx context.Context, flowDraftID int, input models.GotoBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeGoTo, flowDraftID, input.UIRepresentation)
	if input.TargetBlockCid != nil {
		targetBlockID, err := getDraftBlock(ctx, flowDraftID, *input.TargetBlockCid)
		if err != nil {
			return nil, err
		}
		mutation.SetGotoBlock(targetBlockID)
	}
	return mutation.
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

func getExitPointRoleOrDefault(ePoint *models.ExitPointInput) flowschema.ExitPointRole {
	if ePoint == nil || ePoint.Role == nil {
		return flowschema.ExitPointRoleDefault
	}
	return *ePoint.Role
}

func getExitPoint(ctx context.Context, flowDraftID int, blockCid string, ePoint *models.ExitPointInput) (*ent.ExitPoint, error) {
	if ePoint != nil && ePoint.Role != nil && ePoint.Cid != nil {
		return nil, fmt.Errorf("exit point input cannot have cid and role together")
	}
	exitPointPredicates := []predicate.ExitPoint{
		exitpoint.HasParentBlockWith(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		),
	}
	if ePoint != nil && ePoint.Cid != nil {
		exitPointPredicates = append(exitPointPredicates, exitpoint.Cid(*ePoint.Cid))
	} else {
		exitPointPredicates = append(exitPointPredicates,
			exitpoint.RoleEQ(getExitPointRoleOrDefault(ePoint)),
			exitpoint.CidIsNil())
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

func getEntryPointRoleOrDefault(ePoint *models.EntryPointInput) flowschema.EntryPointRole {
	if ePoint == nil || ePoint.Role == nil {
		return flowschema.EntryPointRoleDefault
	}
	return *ePoint.Role
}

func getEntryPoint(ctx context.Context, flowDraftID int, blockCid string, ePoint *models.EntryPointInput) (*ent.EntryPoint, error) {
	if ePoint != nil && ePoint.Role != nil && ePoint.Cid != nil {
		return nil, fmt.Errorf("entry point input cannot have cid and role together")
	}
	entryPointPredicates := []predicate.EntryPoint{
		entrypoint.HasParentBlockWith(
			block.HasFlowDraftWith(flowdraft.ID(flowDraftID)),
			block.Cid(blockCid),
		),
	}
	if ePoint != nil && ePoint.Cid != nil {
		entryPointPredicates = append(entryPointPredicates, entrypoint.Cid(*ePoint.Cid))
	} else {
		entryPointPredicates = append(entryPointPredicates,
			entrypoint.RoleEQ(getEntryPointRoleOrDefault(ePoint)),
			entrypoint.CidIsNil())
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
	var ePoint *models.ExitPointInput
	blk, err := r.ClientFrom(ctx).Block.Query().
		Where(block.HasFlowDraftWith(flowdraft.ID(flowDraftID)), block.CidEQ(input.SourceBlockCid)).Only(ctx)

	if err != nil {
		return nil, err
	}

	if blk != nil && blk.Type == block.TypeChoice {
		ePoint = &models.ExitPointInput{Cid: &input.TargetBlockCid}
	}

	if input.SourcePoint != nil {
		ePoint = input.SourcePoint
	}
	exitPoint, err := getExitPoint(ctx, flowDraftID, input.SourceBlockCid, ePoint)
	if err != nil {
		return nil, err
	}
	entryPoint, err := getEntryPoint(ctx, flowDraftID, input.TargetBlockCid, input.TargetPoint)
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
	exitPoint, err := getExitPoint(ctx, flowDraftID, input.SourceBlockCid, input.SourcePoint)
	if err != nil {
		return false, err
	}
	entryPoint, err := getEntryPoint(ctx, flowDraftID, input.TargetBlockCid, input.TargetPoint)
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

func (r mutationResolver) AddBlockInstance(ctx context.Context, flowInstanceID int, input models.AddBlockInstanceInput) (*ent.BlockInstance, error) {
	client := ent.FromContext(ctx)
	b := client.BlockInstance.Create().
		SetBlockID(input.BlockID).
		SetFlowInstanceID(flowInstanceID).
		SetNillableStatus(input.Status).
		SetStartDate(input.StartDate).
		SetNillableInputJSON(input.InputJSON).
		SetNillableOutputJSON(input.OutputJSON).
		SetInputs(input.Inputs).
		SetOutputs(input.Outputs)

	return b.Save(ctx)
}

func (r mutationResolver) EditBlockInstance(ctx context.Context, input models.EditBlockInstanceInput) (*ent.BlockInstance, error) {
	client := ent.FromContext(ctx)
	bi, err := client.BlockInstance.Get(ctx, input.ID)
	if err != nil {
		return nil, errors.Wrap(err, "querying block instance")
	}
	mutation := client.BlockInstance.
		UpdateOne(bi).
		SetNillableStatus(input.Status).
		SetNillableEndDate(input.EndDate).
		SetNillableInputJSON(input.InputJSON).
		SetNillableOutputJSON(input.OutputJSON).
		SetInputs(input.Inputs).
		SetOutputs(input.Outputs)

	return mutation.Save(ctx)
}

func (r blockResolver) EnableInputTransformation(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableInputTransformation
}

func (r blockResolver) EnableOutputTransformation(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableOutputTransformation
}

func (r blockResolver) EnableInputStateTransformation(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableInputStateTransformation
}

func (r blockResolver) EnableOutputStateTransformation(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableOutputTransformation
}

func (r blockResolver) EnableErrorHandling(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableErrorHandling
}

func (r blockResolver) EnableRetryPolicy(ctx context.Context, obj *ent.Block) bool {
	return *obj.EnableRetryPolicy
}

func (r blockResolver) InputTransfStrategy(ctx context.Context, obj *ent.Block) (*enum.TransfStrategy, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return (*enum.TransfStrategy)(b.InputTransfStrategy), nil
}

func (r blockResolver) OutputTransfStrategy(ctx context.Context, obj *ent.Block) (*enum.TransfStrategy, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return (*enum.TransfStrategy)(b.OutputTransfStrategy), nil
}

func (r blockResolver) InputStateTransfStrategy(ctx context.Context, obj *ent.Block) (*enum.TransfStrategy, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return (*enum.TransfStrategy)(b.InputStateTransfStrategy), nil
}

func (r blockResolver) OutputStateTransfStrategy(ctx context.Context, obj *ent.Block) (*enum.TransfStrategy, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return (*enum.TransfStrategy)(b.OutputStateTransfStrategy), nil
}

func (r blockResolver) BackoffRate(ctx context.Context, obj *ent.Block) (int, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return b.ID, fmt.Errorf("has occurred error on process: %w", err)
	}
	return *b.BackOffRate, nil
}

func (r blockResolver) MaxAttemps(ctx context.Context, obj *ent.Block) (int, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return b.ID, fmt.Errorf("has occurred error on process: %w", err)
	}
	return *b.MaxAttemps, nil
}

func (r blockResolver) RetryInterval(ctx context.Context, obj *ent.Block) (int, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return b.ID, fmt.Errorf("has occurred error on process: %w", err)
	}
	return *b.RetryInterval, nil
}

func (r blockResolver) Units(ctx context.Context, obj *ent.Block) (*models.RetryUnit, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.ID)

	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	}
	return (*models.RetryUnit)(&b.RetryUnit), nil
}

func (r blockResolver) InputStateTransformation(ctx context.Context, obj *ent.Block) (string, error) {
	return *obj.InputStateTransformation, nil
}

func (r blockResolver) OutputStateTransformation(ctx context.Context, obj *ent.Block) (string, error) {
	return *obj.OutputStateTransformation, nil
}

func (r blockResolver) InputTransformation(ctx context.Context, obj *ent.Block) (string, error) {
	return *obj.InputTransformation, nil
}

func (r blockResolver) OutputTransformation(ctx context.Context, obj *ent.Block) (string, error) {
	return *obj.OutputTransformation, nil
}

func (r mutationResolver) AddChoiceBlock(ctx context.Context, flowDraftID int, input models.ChoiceBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeChoice, flowDraftID, input.UIRepresentation)
	addBlockBasicDefinitions(ctx, mutation, *input.BasicDefinitions)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	client := r.ClientFrom(ctx)
	for _, route := range input.Routes {
		if route.Cid != nil {
			var inputVariables []*models.VariableExpressionInput
			inputVariables = append(inputVariables, route.Condition)
			variableExpressions, err := getBlockVariables(ctx, inputVariables, b.ID)
			if err != nil {
				return nil, err
			}
			if len(variableExpressions) != 1 {
				return nil, fmt.Errorf("there is not a condition for route %s", *route.Cid)
			}
			if _, err := client.ExitPoint.Create().
				SetRole(flowschema.ExitPointRoleChoice).
				SetCid(*route.Cid).
				SetParentBlockID(b.ID).
				SetCondition(variableExpressions[0]).
				SetIndex(*route.Index).
				Save(ctx); err != nil {
				return nil, fmt.Errorf("failed to create choice exit points: %w", err)
			}
		}
	}

	if input.DefaultExitPoint != nil {
		dExitPoint, err := b.QueryExitPoints().Where(exitpoint.RoleEQ(flowschema.ExitPointRoleDefault), exitpoint.CidIsNil()).Only(ctx)
		if err != nil {
			return nil, err
		}

		if _, err := dExitPoint.Update().
			SetCid(*input.DefaultExitPoint.Cid).
			Save(ctx); err != nil {
			return nil, fmt.Errorf("failed to create choice default exit point: %w", err)
		}
	}

	return b, nil
}

func (r mutationResolver) AddExecuteFlowBlock(ctx context.Context, flowDraftID int, input models.ExecuteFlowBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeExecuteFlow, flowDraftID, input.UIRepresentation)
	b, err := mutation.SetSubFlowID(input.Flow).
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

func (r mutationResolver) AddTimerBlock(ctx context.Context, flowDraftID int, input models.TimerBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeTimer, flowDraftID, input.UIRepresentation)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}

	return b.Update().
		SetEnableTimerExpression(*input.EnableExpressionL).
		SetTimerExpression(*input.Expression).
		SetTimerBehavior(input.Behavior).
		SetNillableSeconds(input.Seconds).
		SetNillableTimerSpecificDate(input.SpecificDatetime).
		Save(ctx)
}

func (r mutationResolver) AddInvokeRestAPIBlock(ctx context.Context, flowDraftID int, input models.InvokeRestAPIBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeInvokeRestAPI, flowDraftID, input.UIRepresentation)
	addBlockBasicDefinitions(ctx, mutation, *input.BasicDefinitions)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}

	details := b.Update().
		SetBody(input.Body).
		SetConnectionTimeout(input.ConnectionTimeOut).
		SetHeaders(input.Headers).
		SetURL(input.URL).
		SetURLMethod(block.URLMethod(input.Method))

	if input.AuthType != nil {
		details = details.SetAuthType(block.AuthType(*input.AuthType))
	}
	if input.User != nil {
		details = details.SetNillableUser(input.User)
	}
	if input.Password != nil {
		details = details.SetNillablePassword(input.Password)
	}
	if input.ClientID != nil {
		details = details.SetNillableClientID(input.ClientID)
	}
	if input.ClientSecret != nil {
		details = details.SetNillableClientSecret(input.ClientSecret)
	}
	if input.OidcURL != nil {
		details = details.SetNillableOidcURL(input.OidcURL)
	}

	return details.Save(ctx)
}

func (r mutationResolver) AddWaitForSignalBlock(ctx context.Context, flowDraftID int, input models.WaitForSignalBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeWaitForSignal, flowDraftID, input.UIRepresentation)
	addBlockBasicDefinitions(ctx, mutation, *input.BasicDefinitions)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	return b.Update().
		SetSignalModule(input.SignalModule).
		SetSignalType(input.Type).
		SetCustomFilter(*input.CustomFilter).
		SetBlockFlow(input.Blocked).
		Save(ctx)
}

func addBlockBasicDefinitions(ctx context.Context, mutation *ent.BlockCreate, input models.BaseBlockInput) *ent.BlockCreate {
	return mutation.SetNillableEnableErrorHandling(input.EnableErrorHandling).
		SetNillableEnableInputStateTransformation(&input.EnableInputStateTransformation).
		SetNillableEnableOutputStateTransformation(&input.EnableOutputStateTransformation).
		SetNillableEnableInputTransformation(&input.EnableInputTransformation).
		SetNillableEnableOutputTransformation(&input.EnableOutputTransformation).
		SetNillableInputStateTransfStrategy(input.InputStateTransfStrategy).
		SetNillableOutputStateTransfStrategy(input.OutputStateTransfStrategy).
		SetNillableInputTransfStrategy(input.InputTransfStrategy).
		SetNillableOutputTransfStrategy(input.OutputTransfStrategy).
		SetNillableEnableErrorHandling(input.EnableErrorHandling).
		SetNillableEnableRetryPolicy(input.EnableRetryPolicy).
		SetNillableRetryInterval(input.RetryInterval).
		SetNillableRetryUnit((*block.RetryUnit)(input.Units)).
		SetNillableMaxAttemps(input.MaxAttemps).
		SetNillableBackOffRate(input.BackoffRate)
}

func (r mutationResolver) AddKafkaBlock(ctx context.Context, flowDraftID int, input models.KafkaBlockInput) (*ent.Block, error) {
	mutation := addBlockMutation(ctx, input.Cid, block.TypeKafka, flowDraftID, input.UIRepresentation)
	addBlockBasicDefinitions(ctx, mutation, *input.BasicDefinitions)
	b, err := mutation.Save(ctx)
	if err != nil {
		return nil, err
	}
	return b.Update().
		SetKafkaBrokers(input.Brokers).
		SetKafkaTopic(input.Topic).
		SetKafkaMessage(input.Message).
		SetKafkaMessageType(input.Type).
		Save(ctx)
}
