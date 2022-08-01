package flow

import (
	"errors"
	"github.com/facebookincubator/symphony/automation/cadence/activity"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/automation/executors"
	"go.uber.org/cadence"
	"go.uber.org/cadence/workflow"
	"time"
)

func AutomationWorkflow(
	ctx workflow.Context, taskList string, flowInstanceID, tenant string,
) (map[string]interface{}, error) {

	externalActivityOptions := workflow.ActivityOptions{
		TaskList:               taskList,
		ScheduleToCloseTimeout: time.Second * 180,
		ScheduleToStartTimeout: time.Second * 180,
		StartToCloseTimeout:    time.Second * 180,
		HeartbeatTimeout:       time.Second * 180,
		WaitForCancellation:    false,
	}

	ctx = workflow.WithActivityOptions(ctx, externalActivityOptions)

	localActivityOptions := workflow.LocalActivityOptions{
		ScheduleToCloseTimeout: time.Second * 180,
	}

	ctx = workflow.WithLocalActivityOptions(ctx, localActivityOptions)

	info := workflow.GetInfo(ctx)
	if info != nil {
		workflowID := info.WorkflowExecution.ID
		runID := info.WorkflowExecution.RunID

		err := executors.UpdateFlowInstance(tenant, flowInstanceID, workflowID, runID)
		if err != nil {
			_ = executors.UpdateFlowInstanceStatus(tenant, flowInstanceID, enum.FlowInstanceStatusFailing, true)
			return nil, err
		}
	}

	input, blocks, err := executors.GetInputAndExecutors(tenant, flowInstanceID)
	if err != nil {
		_ = executors.UpdateFlowInstanceStatus(tenant, flowInstanceID, enum.FlowInstanceStatusFailing, true)
		return nil, err
	}

	executorStartBlock := getExecutorStartBlock(blocks)
	if executorStartBlock == nil {
		_ = executors.UpdateFlowInstanceStatus(tenant, flowInstanceID, enum.FlowInstanceStatusFailing, true)
		return nil, errors.New("start executorBlock not found")
	}

	flowAction := enum.FlowActionResume

	flowActionFunction := func(value enum.FlowAction) {
		if flowAction != enum.FlowActionCancel {
			flowAction = value
		}
	}

	state := make(map[string]interface{})
	state["__FLOW_INSTANCE_ID"] = flowInstanceID

	ctx = workflow.WithValue(ctx, enum.FlowActionArg, flowAction)
	ctx = workflow.WithValue(ctx, enum.BlocksArg, blocks)

	pauseSignalFunction(ctx, flowActionFunction)
	cancelSignalFunction(ctx, flowActionFunction)

	var output map[string]interface{}

	executorBlock := executorStartBlock

	for executorBlock != nil {
		switch flowAction {
		case enum.FlowActionPause:
			err := executors.UpdateFlowInstanceStatus(
				tenant, executorBlock.GetFlowInstanceID(), enum.FlowInstanceStatusPaused, false,
			)
			if err != nil {
				return nil, err
			}

			resumeSignalFunction(ctx, flowActionFunction)

			switch flowAction {
			case enum.FlowActionCancel:
				err := executors.UpdateFlowInstanceStatus(
					tenant, executorBlock.GetFlowInstanceID(), enum.FlowInstanceStatusCanceled, true,
				)
				if err != nil {
					return nil, err
				}

				return output, cadence.NewCanceledError("Cancel Signal")
			}
		case enum.FlowActionCancel:
			err := executors.UpdateFlowInstanceStatus(
				tenant, executorBlock.GetFlowInstanceID(), enum.FlowInstanceStatusCanceled, true,
			)
			if err != nil {
				return nil, err
			}

			return output, cadence.NewCanceledError("Cancel Signal")
		}

		executorBlock.AddAttempts()

		result, err := executeBlock(ctx, executorBlock, input, state, tenant)

		if err != nil {
			if executorBlock.GetAttempts() < executorBlock.GetMaxAttempts() {
				// TODO Retry executorBlock execution
			}

			_ = executors.UpdateBlockStatus(
				tenant, executorBlock.GetBlockInstanceID(),
				enum.BlockInstanceStatusFailed, true, nil, err.Error(),
			)
			return nil, err
		}

		if result != nil {
			state = result.State
			output = result.Output

			input = output

			if nextBlock := result.NextBlock; nextBlock != "" {
				entBlock, exists := blocks[nextBlock]
				if exists {
					executorBlock = entBlock
				} else {
					executorBlock = nil
				}
			} else {
				executorBlock = nil
			}
		} else {
			executorBlock = nil
		}
	}

	return output, nil
}

func executeBlock(
	ctx workflow.Context, executorBlock executors.ExecutorBlock,
	input, state map[string]interface{}, tenant string,
) (*executors.ExecutorResult, error) {

	blockInstanceID, err := executors.CreateBlockInstance(
		tenant, executorBlock.GetFlowInstanceID(), executorBlock.GetBlockID(), input,
	)
	if err != nil {
		return nil, err
	}

	executorBlock.SetBlockInstanceID(*blockInstanceID)

	var executorResult *executors.ExecutorResult

	executorBlock.SetWorkflowContext(ctx)
	executorBlock.SetInput(input)
	executorBlock.SetState(state)

	switch executorBlock.GetBlockType() {
	case enum.BlockTypeStart:
		executorStartBlock, ok := executorBlock.(*executors.ExecutorStartBlock)

		if ok {
			err = workflow.ExecuteLocalActivity(
				ctx, activity.StartActivity, executorStartBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeEnd:
		executorEndBlock, ok := executorBlock.(*executors.ExecutorEndBlock)

		if ok {
			err = workflow.ExecuteLocalActivity(
				ctx, activity.EndActivity, executorEndBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeGoto:
		executorGotoBlock, ok := executorBlock.(*executors.ExecutorGotoBlock)

		if ok {
			err = workflow.ExecuteLocalActivity(
				ctx, activity.GotoActivity, executorGotoBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeChoice:
		executorChoiceBlock, ok := executorBlock.(*executors.ExecutorChoiceBlock)

		if ok {
			err = workflow.ExecuteActivity(
				ctx, activity.ChoiceActivity, executorChoiceBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeExecuteFlow:
		executeFlow, ok := executorBlock.(*executors.ExecutorExecuteFlowBlock)
		if ok {
			executeFlow.FlowExecutor = flowExecutorFunction

			result, executeErr := executeFlow.Execute()

			err = executeErr
			executorResult = result
		} else {
			executorResult = nil
		}
	case enum.BlockTypeForEach:
		foreachFlow, ok := executorBlock.(*executors.ExecutorForEachBlock)
		if ok {
			automationBlocks, _ := ctx.Value(enum.BlocksArg).(map[string]executors.ExecutorBlock)

			foreachFlow.SearchBlock = func(blockID string) *executors.ExecutorBlock {
				entBlock, exists := automationBlocks[blockID]
				if exists {
					return &entBlock
				}
				return nil
			}

			foreachFlow.ExecuteBlock = executeBlock

			result, executeErr := foreachFlow.Execute()

			err = executeErr
			executorResult = result
		} else {
			executorResult = nil
		}
	case enum.BlockTypeInvokeRestAPI:
		executorInvokeBlock, ok := executorBlock.(*executors.ExecutorInvokeRestAPIBlock)

		if ok {
			err = workflow.ExecuteActivity(
				ctx, activity.InvokeRestAPIActivity, executorInvokeBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeKafka:
		executorKafkaBlock, ok := executorBlock.(*executors.ExecutorKafkaBlock)

		if ok {
			err = workflow.ExecuteActivity(
				ctx, activity.PublishKafkaActivity, executorKafkaBlock,
			).Get(ctx, &executorResult)
		} else {
			executorResult = nil
		}
	case enum.BlockTypeParallel:
		parallelBlock, ok := executorBlock.(*executors.ExecutorParallelBlock)
		if ok {
			result, executeErr := parallelBlock.Execute()

			err = executeErr
			executorResult = result
		} else {
			executorResult = nil
		}
	case enum.BlockTypeTimer:
		timerFlow, ok := executorBlock.(*executors.ExecutorTimerBlock)
		if ok {
			timerFlow.TimerFunction = timerSignalFunction

			result, executeErr := timerFlow.Execute()

			err = executeErr
			executorResult = result
		} else {
			executorResult = nil
		}
	case enum.BlockTypeWaitForSignal:
		waitForSignalFlow, ok := executorBlock.(*executors.ExecutorWaitForSignalBlock)
		if ok {
			waitForSignalFlow.WaitForSignalFunction = blockSignalFunction

			result, executeErr := waitForSignalFlow.Execute()

			err = executeErr
			executorResult = result
		} else {
			executorResult = nil
		}
	}

	if err != nil {
		return nil, err
	}

	return executorResult, nil
}

func getExecutorStartBlock(executorBlocks map[string]executors.ExecutorBlock) executors.ExecutorBlock {
	for _, block := range executorBlocks {
		if _, ok := block.(*executors.ExecutorStartBlock); ok {
			return block
		}
	}
	return nil
}

func flowExecutorFunction(flowId string, input map[string]interface{}) (map[string]interface{}, error) {
	if flowId != "" {
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
