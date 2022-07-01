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

func getAutomationFlow(
	workflowCtx workflow.Context, appCtx context.Context, flowId int,
) (*model.Flow, error) {

	flowBlocks, err := getFlowBlocks(appCtx, flowId)
	if err != nil {
		return nil, err
	}

	automationBlocks, err := getAutomationBlocks(workflowCtx, appCtx, flowBlocks, flowId)
	if err != nil {
		return nil, err
	}

	return &model.Flow{
		Id:     flowId,
		Blocks: automationBlocks,
	}, nil
}

func getFlowBlocks(appCtx context.Context, flowId int) ([]*ent.Block, error) {
	flowInstance, err := ent.FromContext(appCtx).FlowInstance.Get(appCtx, flowId)
	if err != nil {
		return nil, err
	}

	flowBlocks, err := flowInstance.QueryTemplate().
		QueryBlocks().
		All(appCtx)

	if err != nil {
		return nil, err
	}

	return flowBlocks, nil
}

func getAutomationBlocks(
	workflowCtx workflow.Context, appCtx context.Context, entBlocks []*ent.Block, flowId int,
) ([]model.Block, error) {

	var automationBlocks []model.Block
	for _, entBlock := range entBlocks {
		if entBlock != nil {
			automationBlock := model.Block{
				FlowID:      flowId,
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

func executeInActivity(blockType block.Type) bool {
	switch blockType {
	case block.TypeChoice, block.TypeEnd, block.TypeGoTo, block.TypeInvokeRestAPI,
		block.TypeNetworkAction, block.TypeStart:
		return true
	}
	return false
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

	var value string

	s := workflow.NewSelector(ctx)
	s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
		c.Receive(ctx, value)
	})
	s.Select(ctx)

	input["signal"] = value

	return input
}
