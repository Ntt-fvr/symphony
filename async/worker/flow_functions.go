package worker

import (
	"context"
	"errors"
	"github.com/facebookincubator/symphony/async/automation/executors/model"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"go.uber.org/cadence/workflow"
	"time"
)

func getFlowInstanceBlocksAndInput(
	ctx context.Context, flowInstanceID int,
) ([]*ent.Block, map[string]interface{}, error) {
	flowInstance, err := ent.FromContext(ctx).FlowInstance.Get(ctx, flowInstanceID)
	if err != nil {
		return nil, nil, err
	}

	input := map[string]interface{}{}

	if flowInstance != nil {
		for _, params := range flowInstance.StartParams {
			if params != nil {
				input[params.VariableDefinitionKey] = params.Value
			}
		}
	}

	blocks, err := flowInstance.QueryTemplate().
		QueryBlocks().
		All(ctx)

	return blocks, input, err
}

func getAutomationBlocks(
	workflowCtx workflow.Context, appCtx context.Context, flowInstanceID int, entBlocks []*ent.Block,
) ([]model.AutomationBlock, error) {

	var automationBlocks []model.AutomationBlock
	for _, entBlock := range entBlocks {
		if entBlock != nil {
			automationBlock := model.AutomationBlock{
				FlowID:      flowInstanceID,
				Block:       *entBlock,
				WorkflowCtx: workflowCtx,
				AppCtx:      appCtx,
			}

			automationBlocks = append(automationBlocks, automationBlock)

			if entBlock.Type == block.TypeChoice {
				options, err := entBlock.QueryExitPoints().
					WithParentBlock().
					All(appCtx)

				if err != nil {
					return nil, err
				}

				var choiceRoutes []model.ChoiceRoute
				for _, option := range options {
					choiceRoute := model.ChoiceRoute{
						Id:        option.Condition.BlockID,
						Condition: option.Condition.Expression,
					}

					choiceRoutes = append(choiceRoutes, choiceRoute)
				}

				automationBlock.ChoiceRoutes = choiceRoutes
			} else {
				nextBlock, err := entBlock.QueryExitPoints().
					QueryNextEntryPoints().
					QueryParentBlock().
					First(appCtx)

				if err != nil {
					return nil, err
				}

				if nextBlock != nil {
					automationBlock.NextBlock = nextBlock.ID
				}
			}
		}
	}
	return automationBlocks, nil
}

func flowExecutorFunction(flowId uint64, input map[string]interface{}) (map[string]interface{}, error) {
	if flowId > 0 {
		return input, nil
	}
	return nil, errors.New("no flow id")
}

func timerFunction(ctx workflow.Context, duration time.Duration) interface{} {
	signalChannel := workflow.GetSignalChannel(ctx, "timerSignal")
	timeout := workflow.NewTimer(ctx, duration)

	var value interface{}

	s := workflow.NewSelector(ctx)
	s.AddFuture(timeout, func(f workflow.Future) {
		signalChannel.Send(ctx, "")
	})
	s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
		c.Receive(ctx, value)
	})
	s.Select(ctx)

	return value
}

func waitForSignalFunction(ctx workflow.Context, input map[string]interface{}) map[string]interface{} {
	signalChannel := workflow.GetSignalChannel(ctx, "waitForSignal")

	var value interface{}

	s := workflow.NewSelector(ctx)
	s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
		c.Receive(ctx, value)
	})
	s.Select(ctx)

	input["signal"] = value

	return input
}
