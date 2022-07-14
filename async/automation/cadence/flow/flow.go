package flow

import (
	"errors"
	"github.com/facebookincubator/symphony/async/automation/cadence/activity"
	"github.com/facebookincubator/symphony/async/automation/cadence/enum"
	"github.com/facebookincubator/symphony/async/automation/executors"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/async/automation/operations"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"go.uber.org/cadence"
	"go.uber.org/cadence/workflow"
	"time"
)

func AutomationWorkflow(
	ctx workflow.Context, taskList string, flowInstanceID int,
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

		err := operations.UpdateFlowInstance(flowInstanceID, workflowID, runID)
		if err != nil {
			_ = operations.UpdateFlowInstanceStatus(flowInstanceID, flowinstance.StatusFailing, true)
			return nil, err
		}
	}

	input, automationBlocks, err := operations.GetInputAndBlocks(flowInstanceID)
	if err != nil {
		_ = operations.UpdateFlowInstanceStatus(flowInstanceID, flowinstance.StatusFailing, true)
		return nil, err
	}

	startBlock := getStartBlock(automationBlocks)
	if startBlock != nil {
		_ = operations.UpdateFlowInstanceStatus(flowInstanceID, flowinstance.StatusFailing, true)
		return nil, errors.New("start automationBlock not found")
	}

	flowAction := enum.FlowActionResume

	flowActionFunction := func(value enum.FlowAction) {
		if flowAction != enum.FlowActionCancel {
			flowAction = value
		}
	}

	state := make(map[string]interface{})

	ctx = workflow.WithValue(ctx, enum.FlowActionArg, flowAction)
	ctx = workflow.WithValue(ctx, enum.BlocksArg, automationBlocks)

	pauseSignalFunction(ctx, flowActionFunction)
	cancelSignalFunction(ctx, flowActionFunction)

	var output map[string]interface{}

	automationBlock := startBlock

	for automationBlock != nil {
		switch flowAction {
		case enum.FlowActionPause:
			err := operations.UpdateFlowInstanceStatus(
				automationBlock.GetFlowInstanceID(), flowinstance.StatusPaused, false,
			)
			if err != nil {
				return nil, err
			}

			resumeSignalFunction(ctx, flowActionFunction)

			switch flowAction {
			case enum.FlowActionCancel:
				err := operations.UpdateFlowInstanceStatus(
					automationBlock.GetFlowInstanceID(), flowinstance.StatusCancelled, true,
				)
				if err != nil {
					return nil, err
				}

				return output, cadence.NewCanceledError("Cancel Signal")
			}
		case enum.FlowActionCancel:
			err := operations.UpdateFlowInstanceStatus(
				automationBlock.GetFlowInstanceID(), flowinstance.StatusCancelled, true,
			)
			if err != nil {
				return nil, err
			}

			return output, cadence.NewCanceledError("Cancel Signal")
		}

		automationBlock.AddAttempts()

		result, err := executeBlock(ctx, *automationBlock, input, state)

		if err != nil {
			if automationBlock.GetAttempts() < automationBlock.GetMaxAttempts() {
				// TODO Retry automationBlock execution
			}

			_ = operations.UpdateBlockStatus(
				automationBlock.GetBlockInstanceID(), blockinstance.StatusFailed,
				true, nil, err.Error(),
			)
			return nil, err
		}

		if result != nil {
			state = result.State
			output = result.Output

			input = output

			if nextBlock := result.NextBlock; nextBlock > 0 {
				entBlock, exists := automationBlocks[nextBlock]
				if exists {
					automationBlock = &entBlock
				} else {
					automationBlock = nil
				}
			} else {
				automationBlock = nil
			}
		} else {
			automationBlock = nil
		}
	}

	return output, nil
}

func executeBlock(
	ctx workflow.Context, automationBlock model.BaseBlock, input, state map[string]interface{},
) (*executors.ExecutorResult, error) {

	blockInstanceID, err := operations.CreateBlockInstance(
		automationBlock.GetFlowInstanceID(), automationBlock.GetBlockID(), input,
	)
	if err != nil {
		return nil, err
	}

	automationBlock.SetBlockInstanceID(blockInstanceID)

	var executorResult *executors.ExecutorResult

	switch automationBlock.BlockType {
	case block.TypeExecuteFlow, block.TypeForEach, block.TypeParallel,
		block.TypeTimer, block.TypeWaitForSignal:

		blockInstance := executors.GetBlockInstances(
			ctx, automationBlock, input, state, operations.UpdateBlockStatus,
		)

		switch automationBlock.BlockType {
		case block.TypeExecuteFlow:
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
		case block.TypeForEach:
			foreachFlow, ok := blockInstance.(*executors.ExecutorForEachBlock)
			if ok {
				automationBlocks, _ := ctx.Value(enum.BlocksArg).(map[int]model.BaseBlock)

				foreachFlow.SearchBlock = func(blockID int) *model.BaseBlock {
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
		case block.TypeParallel:
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
		case block.TypeTimer:
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
		case block.TypeWaitForSignal:
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
		}
	default:
		err := workflow.ExecuteActivity(
			ctx, activity.ExecuteBlockActivity, automationBlock, input, state,
		).Get(ctx, &executorResult)

		if err != nil {
			return nil, err
		}
	}

	return executorResult, nil
}

func getStartBlock(automationBlocks map[int]model.BaseBlock) *model.BaseBlock {
	for _, automationBlock := range automationBlocks {
		if automationBlock.BlockType == block.TypeStart {
			return &automationBlock
		}
	}
	return nil
}

func flowExecutorFunction(flowId int, input map[string]interface{}) (map[string]interface{}, error) {
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
