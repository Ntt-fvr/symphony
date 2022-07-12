package flow

import (
	"context"
	"errors"
	"github.com/facebookincubator/symphony/async/automation/cadence/activity"
	"github.com/facebookincubator/symphony/async/automation/cadence/enum"
	"github.com/facebookincubator/symphony/async/automation/executors"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/async/automation/operations"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"go.uber.org/cadence"
	"go.uber.org/cadence/workflow"
	"time"
)

func AutomationWorkflow(
	ctx workflow.Context, entCtx context.Context, taskList string, flowInstanceID int,
) (map[string]interface{}, error) {

	activityOptions := workflow.ActivityOptions{
		TaskList:               taskList,
		ScheduleToCloseTimeout: time.Second * 180,
		ScheduleToStartTimeout: time.Second * 180,
		StartToCloseTimeout:    time.Second * 180,
		HeartbeatTimeout:       time.Second * 180,
		WaitForCancellation:    false,
	}

	ctx = workflow.WithActivityOptions(ctx, activityOptions)

	info := workflow.GetInfo(ctx)
	if info != nil {
		workflowID := info.WorkflowExecution.ID
		runID := info.WorkflowExecution.RunID

		err := operations.UpdateFlowInstance(entCtx, flowInstanceID, workflowID, runID)
		if err != nil {
			_ = operations.UpdateFlowInstanceStatus(entCtx, flowInstanceID, flowinstance.StatusFailing, true)
			return nil, err
		}
	}

	input, blocks, err := operations.GetInputAndBlocks(entCtx, flowInstanceID)
	if err != nil {
		_ = operations.UpdateFlowInstanceStatus(entCtx, flowInstanceID, flowinstance.StatusFailing, true)
		return nil, err
	}

	startBlock := getStartBlock(blocks)
	if startBlock != nil {
		_ = operations.UpdateFlowInstanceStatus(entCtx, flowInstanceID, flowinstance.StatusFailing, true)
		return nil, errors.New("start block not found")
	}

	flowAction := enum.FlowActionResume

	flowActionFunction := func(value enum.FlowAction) {
		if flowAction != enum.FlowActionCancel {
			flowAction = value
		}
	}

	state := make(map[string]interface{})

	ctx = workflow.WithValue(ctx, enum.FlowActionArg, flowAction)
	ctx = workflow.WithValue(ctx, enum.BlocksArg, blocks)

	pauseSignalFunction(ctx, flowActionFunction)
	cancelSignalFunction(ctx, flowActionFunction)

	var output map[string]interface{}

	block := startBlock

	for block != nil {
		switch flowAction {
		case enum.FlowActionPause:
			err := operations.UpdateFlowInstanceStatus(
				entCtx, block.GetFlowInstanceID(), flowinstance.StatusPaused, false,
			)
			if err != nil {
				return nil, err
			}

			resumeSignalFunction(ctx, flowActionFunction)

			switch flowAction {
			case enum.FlowActionCancel:
				err := operations.UpdateFlowInstanceStatus(
					entCtx, block.GetFlowInstanceID(), flowinstance.StatusCancelled, true,
				)
				if err != nil {
					return nil, err
				}

				return output, cadence.NewCanceledError("Cancel Signal")
			}
		case enum.FlowActionCancel:
			err := operations.UpdateFlowInstanceStatus(
				entCtx, block.GetFlowInstanceID(), flowinstance.StatusCancelled, true,
			)
			if err != nil {
				return nil, err
			}

			return output, cadence.NewCanceledError("Cancel Signal")
		}

		block.AddAttempts()

		result, err := executeBlock(ctx, entCtx, block, input, state)

		if err != nil {
			if block.GetAttempts() < block.GetMaxAttempts() {
				// TODO Retry block execution
			}

			_ = operations.UpdateBlockStatus(
				entCtx, block.GetBlockInstanceID(), blockinstance.StatusFailed,
				true, nil, err.Error(),
			)
			return nil, err
		}

		if result != nil {
			state = result.State
			output = result.Output

			input = output

			if nextBlock := result.NextBlock; nextBlock > 0 {
				entBlock, exists := blocks[nextBlock]
				if exists {
					block = entBlock
				} else {
					block = nil
				}
			} else {
				block = nil
			}
		} else {
			block = nil
		}
	}

	return output, nil
}

func executeBlock(
	ctx workflow.Context, entCtx context.Context, block model.IBlock, input, state map[string]interface{},
) (*executors.ExecutorResult, error) {

	blockInstanceID, err := operations.CreateBlockInstance(
		entCtx, block.GetFlowInstanceID(), block.GetBlockID(), input,
	)
	if err != nil {
		return nil, err
	}

	block.SetBlockInstanceID(blockInstanceID)

	var executorResult *executors.ExecutorResult

	blockInstance := executors.GetBlockInstances(ctx, entCtx, block, input, state, operations.UpdateBlockStatus)
	var blockInterface interface{} = blockInstance

	switch blockInterface.(type) {
	case executors.ExecutorExecuteFlowBlock:
		executeFlow, ok := blockInstance.(*executors.ExecutorExecuteFlowBlock)
		if ok {
			executeFlow.FlowExecutor = flowExecutorFunction

			result, err := executeFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case executors.ExecutorForEachBlock:
		foreachFlow, ok := blockInstance.(*executors.ExecutorForEachBlock)
		if ok {
			automationBlocks, _ := ctx.Value(enum.BlocksArg).(map[int]model.IBlock)

			foreachFlow.SearchBlock = func(blockID int) *model.IBlock {
				entBlock, exists := automationBlocks[blockID]
				if exists {
					return &entBlock
				}
				return nil
			}

			foreachFlow.ExecuteBlock = executeBlock

			result, err := foreachFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case executors.ExecutorParallelBlock:
		parallelBlock, ok := blockInstance.(*executors.ExecutorParallelBlock)
		if ok {
			result, err := parallelBlock.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case executors.ExecutorTimerBlock:
		timerFlow, ok := blockInstance.(*executors.ExecutorTimerBlock)
		if ok {
			timerFlow.TimerFunction = timerSignalFunction

			result, err := timerFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case executors.ExecutorWaitForSignalBlock:
		waitForSignalFlow, ok := blockInstance.(*executors.ExecutorWaitForSignalBlock)
		if ok {
			waitForSignalFlow.WaitForSignalFunction = blockSignalFunction

			result, err := waitForSignalFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	default:
		err := workflow.ExecuteActivity(
			ctx, activity.ExecuteBlockActivity, entCtx, block, input, state,
		).Get(ctx, &executorResult)

		if err != nil {
			return nil, err
		}
	}

	return executorResult, nil
}

func getStartBlock(blocks map[int]model.IBlock) model.IBlock {
	for _, block := range blocks {
		if _, ok := block.(*model.StartBlock); ok {
			return block
		}
	}
	return nil
}

func flowExecutorFunction(flowId uint64, input map[string]interface{}) (map[string]interface{}, error) {
	if flowId > 0 {
		return input, nil
	}
	return nil, errors.New("no flow id")
}

func timerSignalFunction(ctx workflow.Context, duration time.Duration) interface{} {
	signalChannel := workflow.GetSignalChannel(ctx, enum.SignalTimer.String())
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

func blockSignalFunction(ctx workflow.Context, input map[string]interface{}) map[string]interface{} {
	signalChannel := workflow.GetSignalChannel(ctx, enum.SignalBlock.String())

	var value interface{}

	s := workflow.NewSelector(ctx)
	s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
		c.Receive(ctx, value)
	})
	s.Select(ctx)

	input["signal"] = value

	return input
}

func cancelSignalFunction(ctx workflow.Context, function func(enum.FlowAction)) {
	workflow.Go(ctx, func(ctx workflow.Context) {
		signalChannel := workflow.GetSignalChannel(ctx, enum.SignalCancel.String())

		s := workflow.NewSelector(ctx)
		s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
			var value string
			c.Receive(ctx, &value)

			function(enum.FlowActionCancel)
		})
		s.Select(ctx)
	})
}

func pauseSignalFunction(ctx workflow.Context, function func(enum.FlowAction)) {
	workflow.Go(ctx, func(ctx workflow.Context) {
		signalChannel := workflow.GetSignalChannel(ctx, enum.SignalPause.String())

		s := workflow.NewSelector(ctx)
		s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
			var value string
			c.Receive(ctx, &value)

			function(enum.FlowActionPause)
		})
		s.Select(ctx)
	})
}

func resumeSignalFunction(ctx workflow.Context, function func(enum.FlowAction)) {
	signalChannel := workflow.GetSignalChannel(ctx, enum.SignalResume.String())

	s := workflow.NewSelector(ctx)
	s.AddReceive(signalChannel, func(c workflow.Channel, more bool) {
		var value string
		c.Receive(ctx, &value)

		function(enum.FlowActionResume)
		pauseSignalFunction(ctx, function)
	})
	s.Select(ctx)
}
