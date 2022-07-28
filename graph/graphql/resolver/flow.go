// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/vektah/gqlparser/v2/gqlerror"

	"github.com/pkg/errors"

	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"

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
		v, ok := viewer.FromContext(ctx).(*viewer.UserViewer)
		if !ok {
			return nil, gqlerror.Errorf("could not be executed in automation")
		}

		newFlow, err := client.Flow.Create().
			SetName(input.Name).
			SetNillableDescription(input.Description).
			SetEndParamDefinitions(input.EndParamDefinitions).
			SetCreationDate(time.Now()).
			SetAuthor(v.User()).
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
		SetNillableBssCode(input.BssCode).
		SetStartDate(input.StartDate).
		SetStartParams(input.Params).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	return flowInstance, nil
}

func (r queryResolver) FlowDrafts(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	name *string,
) (*ent.FlowDraftConnection, error) {
	var predicates []predicate.FlowDraft
	if name != nil {
		predicates = append(predicates, flowdraft.NameEQ(*name))
	}
	return r.ClientFrom(ctx).FlowDraft.Query().Where(flowdraft.Or(predicates...)).
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Flows(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	name *string,
) (*ent.FlowConnection, error) {
	var predicates []predicate.Flow
	if name != nil {
		predicates = append(predicates, flow.NameEQ(*name))
	}
	return r.ClientFrom(ctx).Flow.Query().Where(flow.Or(predicates...)).
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) FlowInstances(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.FlowInstanceOrder,
	filterBy []*models.FlowInstanceFilterInput,
) (*ent.FlowInstanceConnection, error) {
	return r.ClientFrom(ctx).FlowInstance.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithFlowInstanceOrder(orderBy),
			ent.WithFlowInstanceFilter(
				func(query *ent.FlowInstanceQuery) (*ent.FlowInstanceQuery, error) {
					return resolverutil.FlowInstanceFilter(query, filterBy)
				},
			))
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
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.TriggerBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.ActionBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.ChoiceBlocks {
		for _, route := range blk.Routes {
			blockVariableInputs = append(blockVariableInputs, route.Condition.BlockVariables...)
		}
	}
	for _, blk := range input.ExecuteFlowBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.WaitForSignalBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.TimerBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
		}
	}
	for _, blk := range input.InvokeRestAPIBlocks {
		for _, variableExpression := range blk.Params {
			blockVariableInputs = append(blockVariableInputs, variableExpression.BlockVariables...)
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
	for _, blk := range input.GotoBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.TriggerBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.ChoiceBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.ExecuteFlowBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.ExecuteFlowBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.InvokeRestAPIBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.KafkaBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	for _, blk := range input.WaitForSignalBlocks {
		blockCids = append(blockCids, blk.Cid)
	}
	return blockCids
}

func (r mutationResolver) getVariableDefinitions(blockCid string, input models.ImportFlowDraftInput) ([]*flowschema.VariableDefinition, error) {
	actionFactory := actions.NewFactory()
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

func (r mutationResolver) collectWorkOrderTypeByBlock(input models.ImportFlowDraftInput) (map[string]int, map[string]flowschema.ActionTypeID, error) {
	templateTypeIds := make(map[string]int)
	actionTypeIds := make(map[string]flowschema.ActionTypeID)
	for _, blk := range input.ActionBlocks {
		for _, param := range blk.Params {
			if param.Type == enum.VariableDefinition && (*param.VariableDefinitionKey == actions.InputVariableType ||
				*param.VariableDefinitionKey == actions.InputVariableWorkerType) {
				templateTypeID, err := strconv.Atoi(param.Expression)
				if err != nil {
					return nil, nil, fmt.Errorf("there is a misktake in the Template Type Id: %s for block %s", param.Expression, blk.Cid)
				}
				templateTypeIds[blk.Cid] = templateTypeID
				actionTypeIds[blk.Cid] = blk.ActionType
				break
			}
		}
	}
	for _, blk := range input.TriggerBlocks {
		for _, param := range blk.Params {
			if param.Type == enum.VariableDefinition && (*param.VariableDefinitionKey == actions.InputVariableType ||
				*param.VariableDefinitionKey == actions.InputVariableWorkerType) {
				templateTypeID, err := strconv.Atoi(param.Expression)
				if err != nil {
					return nil, nil, fmt.Errorf("there is a misktake in the Template Type Id: %s for block %s", param.Expression, blk.Cid)
				}
				templateTypeIds[blk.Cid] = templateTypeID
				actionTypeIds[blk.Cid] = flowschema.ActionTypeWorkOrder
				break
			}
		}
	}
	return templateTypeIds, actionTypeIds, nil
}

func (r mutationResolver) validateBlockVariables(ctx context.Context, input models.ImportFlowDraftInput) error {
	blockVariableInputs := r.collectBlockVariables(input)
	blockCids := r.collectBlockCids(input)
	templateTypeIds, actionTypeIds, err := r.collectWorkOrderTypeByBlock(input)
	if err != nil {
		return err
	}
	for _, blockVariableInput := range blockVariableInputs {
		// validate that BlockCId exists in input
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
		// validate that the property exists associated with a BlockCI workorderType
		switch blockVariableInput.Type {
		case enum.PropertyTypeDefinition:
			woTypeID := templateTypeIds[blockVariableInput.BlockCid]
			actionTypeID := actionTypeIds[blockVariableInput.BlockCid]
			if actionTypeID == flowschema.ActionTypeWorkOrder {
				_, ok := flowengine.FindPropertyWorkOrder(ctx, *blockVariableInput.PropertyTypeID, woTypeID)
				if !ok {
					return fmt.Errorf("PropertyTypeID %q is not valid for WorkOrderType: %q blockCId: %s", *blockVariableInput.PropertyTypeID, woTypeID, blockVariableInput.BlockCid)
				}
			} else if actionTypeID == flowschema.ActionTypeWorker {
				_, ok := flowengine.FindPropertyWorker(ctx, *blockVariableInput.PropertyTypeID, woTypeID)
				if !ok {
					return fmt.Errorf("PropertyTypeID %q is not valid for WorkerType: %q blockCId: %s", *blockVariableInput.PropertyTypeID, woTypeID, blockVariableInput.BlockCid)
				}
			}
		case enum.VariableDefinition:
			variableDefinitions, err := r.getVariableDefinitions(blockVariableInput.BlockCid, input)
			if err != nil {
				return err
			}
			var isVariableDefinition bool
			for _, variableDefinition := range variableDefinitions {
				if variableDefinition.Key == *blockVariableInput.VariableDefinitionKey {
					isVariableDefinition = true
				}
			}
			if !isVariableDefinition {
				return fmt.Errorf("variableDefinition %s doesn't exist for block %s", *blockVariableInput.VariableDefinitionKey, blockVariableInput.BlockCid)
			}
		case enum.ChekListItemDefinition:
			woTypeID := templateTypeIds[blockVariableInput.BlockCid]
			_, ok := flowengine.FindCheckListItemWorkOrder(ctx, *blockVariableInput.CheckListItemDefinitionID, woTypeID)
			if !ok {
				return fmt.Errorf("CheckListItemID %q is not valid for WorkOrderType: %q blockCId: %s", *blockVariableInput.CheckListItemDefinitionID, woTypeID, blockVariableInput.BlockCid)
			}
		}
	}
	return nil
}

// nolint: funlen
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
			case *models.ChoiceBlockInput:
				routes := blkInput.Routes
				var paramsDecision []*models.VariableExpressionInput
				for _, route := range routes {
					paramsDecision = append(paramsDecision, route.Condition)
				}
				if ok := r.paramsHaveDependencies(paramsDecision, createdBlockCIDs); ok {
					if _, err := r.AddChoiceBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.ExecuteFlowBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddExecuteFlowBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.TimerBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddTimerBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.InvokeRestAPIBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddInvokeRestAPIBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.WaitForSignalBlockInput:
				if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
					if _, err := r.AddWaitForSignalBlock(ctx, input.ID, *blkInput); err != nil {
						return err
					}
					createdBlockCIDs[blkInput.Cid] = struct{}{}
				} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}
			case *models.KafkaBlockInput:
				// if ok := r.paramsHaveDependencies(blkInput.Params, createdBlockCIDs); ok {
				if _, err := r.AddKafkaBlock(ctx, input.ID, *blkInput); err != nil {
					return err
				}
				createdBlockCIDs[blkInput.Cid] = struct{}{}
				/*} else {
					newBlockInputs = append(newBlockInputs, blkInput)
				}*/

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

func (r mutationResolver) collectBlocksInputs(_ context.Context, input models.ImportFlowDraftInput) []interface{} {
	var blockInputs []interface{}
	for _, blk := range input.EndBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.GotoBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.TriggerBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.ActionBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.ChoiceBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.InvokeRestAPIBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.TimerBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.WaitForSignalBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.ExecuteFlowBlocks {
		blockInputs = append(blockInputs, blk)
	}
	for _, blk := range input.KafkaBlocks {
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

type flowExecutionTemplate struct{}

func (r flowExecutionTemplate) Connectors(ctx context.Context, obj *ent.FlowExecutionTemplate) ([]*models.Connector, error) {
	exitPoints, err := obj.QueryBlocks().
		QueryExitPoints().
		WithNextEntryPoints().
		All(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to query exit points: %w", err)
	}
	return connectors(exitPoints), nil
}

func (r mutationResolver) EditFlowInstance(ctx context.Context, input *models.EditFlowInstanceInput) (*ent.FlowInstance, error) {
	client := ent.FromContext(ctx)
	fi, err := client.FlowInstance.Get(ctx, input.ID)
	if err != nil {
		return nil, errors.Wrap(err, "querying flow instance")
	}
	mutation := client.FlowInstance.
		UpdateOne(fi).
		SetNillableServiceInstanceCode(input.ServiceInstanceCode).
		SetNillableStatus(input.Status).
		SetNillableEndDate(input.EndDate).
		SetNillableBssCode(input.BssCode)

	if input.StartParams != nil {
		mutation = mutation.SetStartParams(input.StartParams)
	}

	return mutation.Save(ctx)
}

func (flowResolver) RunningInstances(ctx context.Context, obj *ent.Flow) (int, error) {
	instances, err := obj.Edges.InstanceOrErr()
	if !ent.IsNotLoaded(err) {
		return len(instances), err
	}
	return obj.QueryInstance().Where(flowinstance.StatusEQ(flowinstance.StatusRunning)).Count(ctx)
}

func (flowResolver) FailedInstances(ctx context.Context, obj *ent.Flow) (int, error) {
	instances, err := obj.Edges.InstanceOrErr()
	if !ent.IsNotLoaded(err) {
		return len(instances), err
	}
	return obj.QueryInstance().Where(flowinstance.StatusEQ(flowinstance.StatusRunning)).Count(ctx)
}

func (r flowResolver) Editor(ctx context.Context, obj *ent.Flow) (*ent.User, error) {
	e, err := obj.QueryEditor().Only(ctx)
	return e, err
}

func (r mutationResolver) ArchiveFlow(ctx context.Context, input models.ArchiveFlowInput) (*ent.Flow, error) {
	var err error
	client := r.ClientFrom(ctx)

	f, err := client.Flow.Get(ctx, input.FlowID)
	if err != nil {
		return nil, fmt.Errorf("flow not found: %w", err)
	}

	_, err = client.Flow.UpdateOne(f).SetStatus(flow.StatusArchived).
		SetNewInstancesPolicy(flow.NewInstancesPolicyDisabled).Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to update flow: %w", err)
	}

	return f, nil
}

func (r mutationResolver) DuplicateFlow(ctx context.Context, input models.DuplicateFlowInput) (*ent.Flow, error) {

	var err error
	client := r.ClientFrom(ctx)

	f, err := client.Flow.Get(ctx, input.FlowID)
	if err != nil {
		return nil, fmt.Errorf("flow not found: %w", err)
	}

	v, ok := viewer.FromContext(ctx).(*viewer.UserViewer)
	if !ok {
		return nil, gqlerror.Errorf("could not be executed in automation")
	}
	// editor, last edited, creation date
	newFlow, err := client.Flow.Create().SetName(input.Name).
		SetNillableDescription(input.Description).
		SetStatus(flow.DefaultStatus).
		SetAuthor(v.User()).
		SetCreationDate(time.Now()).
		Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to duplicate flow: %w", err)
	}

	blockQuery := client.Block.Query().
		Where(block.HasFlowWith(flow.ID(f.ID)))
	setFlowBlocks := func(b *ent.BlockCreate) {
		b.SetFlow(newFlow)
	}
	count, _ := f.QueryBlocks().Count(ctx)
	if count > 0 {
		if err := flowengine.CopyBlocks(ctx, blockQuery, setFlowBlocks); err != nil {
			return nil, err
		}
	}
	return newFlow, nil

}
