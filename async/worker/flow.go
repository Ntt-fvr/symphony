// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/async/automation/executors/blocks"
	"github.com/facebookincubator/symphony/async/automation/executors/model"
	"go.uber.org/cadence/activity"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"

	// "go.uber.org/cadence/activity"
	"go.uber.org/cadence/worker"
	"go.uber.org/cadence/workflow"
	"go.uber.org/zap"
)

const (
	RunFlowWorkflowName = "RunFlow"
	badID               = -1
)

var (
	defaultLocalActivityOptions = workflow.LocalActivityOptions{
		ScheduleToCloseTimeout: 5 * time.Second,
	}
	defaultActivityOptions = workflow.ActivityOptions{
		ScheduleToStartTimeout: 5 * time.Second,
		StartToCloseTimeout:    5 * time.Second,
	}

	state            = make(map[string]interface{})
	automationBlocks = make(map[int]model.Block)
)

// RunFlowInput is the input for the RunFlow workflow
type RunFlowInput struct {
	FlowInstanceID int
}

// CompleteFlowInput is the input for the CompleteFlow activity
type CompleteFlowInput struct {
	FlowInstanceID       int
	StartBlockInstanceID int
}

// FlowFactory contains the workflow and all activities required for the flow engine
type FlowFactory struct {
	logger log.Logger
}

// NewFlowFactory return flow factory given its configuration
func NewFlowFactory(logger log.Logger) *FlowFactory {
	return &FlowFactory{
		logger: logger,
	}
}

// RunFlowWorkflow is the workflow that runs the main flow. It is tied to flow instance ent and reads the ent graph
// database to find the next block that needs to be executed as activity
func (ff *FlowFactory) RunFlowWorkflow(workflowCtx workflow.Context, appCtx context.Context,
	taskList string, runFlowInput RunFlowInput, input map[string]interface{}) (map[string]interface{}, error) {

	automationFlow, err := getAutomationFlow(workflowCtx, appCtx, runFlowInput.FlowInstanceID)
	if err != nil {
		return nil, err
	}

	activityOptions := workflow.ActivityOptions{
		TaskList:               taskList,
		ScheduleToCloseTimeout: time.Second * 180,
		ScheduleToStartTimeout: time.Second * 180,
		StartToCloseTimeout:    time.Second * 180,
		HeartbeatTimeout:       time.Second * 180,
		WaitForCancellation:    false,
	}

	workflowCtx = workflow.WithActivityOptions(workflowCtx, activityOptions)

	inputValue := input

	var startBlock model.Block

	for _, automationBlock := range automationFlow.Blocks {
		automationBlocks[automationBlock.ID] = automationBlock
		if automationBlock.Type == block.TypeStart {
			startBlock = automationBlock
		}
	}

	var output map[string]interface{}
	automationBlock := &startBlock

	for automationBlock != nil {
		blockExecutor := *automationBlock

		executorResult, err := ff.executeBlock(blockExecutor, inputValue, state)

		if err != nil {
			return nil, err
		}

		if executorResult != nil {
			state = executorResult.State
			output = executorResult.Output

			inputValue = output

			if nextBlock := executorResult.NextBlock; nextBlock > 0 {
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

func (ff *FlowFactory) executeBlock(
	automationBlock model.Block, input, state map[string]interface{},
) (*blocks.ExecutorResult, error) {

	blockInstanceID, err := ff.createBlockInstance(automationBlock)
	if err != nil {
		return nil, err
	}

	automationBlock.BlockInstanceID = blockInstanceID

	var executorResult *blocks.ExecutorResult

	blockInstance := blocks.GetBlockInstances(automationBlock, input, state, ff.updateBlockInstanceStatus)
	switch automationBlock.Type {
	case block.TypeExecuteFlow:
		executeFlow, ok := blockInstance.(*blocks.ExecuteFlowBlock)
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
		foreachFlow, ok := blockInstance.(*blocks.ForEachBlock)
		if ok {
			foreachFlow.SearchBlock = func(blockID int) *model.Block {
				entBlock, exists := automationBlocks[blockID]
				if exists {
					return &entBlock
				}
				return nil
			}

			foreachFlow.ExecuteBlock = ff.executeBlock

			result, err := foreachFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case block.TypeParallel:
		parallelBlock, ok := blockInstance.(*blocks.ParallelBlock)
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
		timerFlow, ok := blockInstance.(*blocks.TimerBlock)
		if ok {
			timerFlow.TimerFunction = timerFunction

			result, err := timerFlow.Execute()
			if err != nil {
				return nil, err
			}

			executorResult = result
		} else {
			executorResult = nil
		}
	case block.TypeWaitForSignal:
		waitForSignalFlow, ok := blockInstance.(*blocks.WaitForSignalBlock)
		if ok {
			waitForSignalFlow.WaitForSignalFunction = waitForSignalFunction

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
			automationBlock.WorkflowCtx, ff.ExecutorActivity, automationBlock, input, state,
		).Get(automationBlock.WorkflowCtx, &executorResult)

		if err != nil {
			return nil, err
		}
	}

	return executorResult, nil
}

func (ff *FlowFactory) ExecutorActivity(_ context.Context, block model.Block,
	input, state map[string]interface{}) (*blocks.ExecutorResult, error) {

	blockInstance := blocks.GetBlockInstances(block, input, state, ff.updateBlockInstanceStatus)
	return blockInstance.Execute()
}

func (ff *FlowFactory) createBlockInstance(automationBlock model.Block) (int, error) {

	ctx := automationBlock.AppCtx

	client := ent.FromContext(ctx)

	flowInstance, err := client.FlowInstance.Get(ctx, automationBlock.FlowID)
	if err != nil {
		return 0, err
	}

	b, err := client.BlockInstance.Create().
		SetBlock(&automationBlock.Block).
		SetFlowInstance(flowInstance).
		SetStatus(blockinstance.StatusPending).
		SetStartDate(time.Now()).
		Save(ctx)

	if err != nil {
		return 0, err
	}
	return b.ID, nil
}

func (ff *FlowFactory) updateBlockInstanceStatus(
	ctx context.Context, blockID int, status blockinstance.Status, endDate *time.Time,
) error {

	query := ent.FromContext(ctx).BlockInstance.UpdateOneID(blockID).
		SetStatus(status)

	if endDate != nil {
		query = query.SetEndDate(*endDate)
	}

	_, err := query.Save(ctx)
	if err != nil {
		return err
	}
	return nil
}

// CompleteFlowActivity marks the the flow instance as completed. This should be the last activity in the flow workflow
func (ff *FlowFactory) CompleteFlowActivity(ctx context.Context, input CompleteFlowInput) error {
	ff.logger.For(ctx).Info("completing flow instance",
		zap.Int("instanceID", input.FlowInstanceID))
	return ent.RunWithTransaction(ctx, func(ctx context.Context, client *ent.Client) error {
		if err := client.FlowInstance.UpdateOneID(input.FlowInstanceID).
			SetStatus(flowinstance.StatusCompleted).
			Exec(ctx); err != nil {
			return fmt.Errorf("failed to update flow instance: %w", err)
		}
		blockInstance, err := client.BlockInstance.Query().Where(blockinstance.ID(input.StartBlockInstanceID)).Only(ctx)
		if err != nil {
			return fmt.Errorf("failed to query block instance: %w", err)
		}
		if err := client.BlockInstance.UpdateOneID(input.StartBlockInstanceID).
			SetStatus(blockinstance.StatusCompleted).
			SetOutputs(blockInstance.Inputs).
			Exec(ctx); err != nil {
			return fmt.Errorf("failed to update block instance: %w", err)
		}
		return nil
	})
}

// ReadStartBlockLocalActivity reads the start point of the flow instance. This should be the first activity of flow workflow
func (ff *FlowFactory) ReadStartBlockLocalActivity(ctx context.Context, input RunFlowInput) (int, error) {
	client := ent.FromContext(ctx)
	ff.logger.For(ctx).Info("reading flow start",
		zap.Int("instanceID", input.FlowInstanceID))
	startID, err := client.BlockInstance.Query().Where(
		blockinstance.HasFlowInstanceWith(flowinstance.ID(input.FlowInstanceID)),
		blockinstance.HasBlockWith(block.TypeEQ(block.TypeStart)),
	).OnlyID(ctx)
	if err != nil {
		return badID, err
	}
	return startID, nil
}

// NewWorkers registers the workflow and all activities to the cadence worker
func (ff *FlowFactory) NewWorkers(client workflowserviceclient.Interface, workerOptions worker.Options) []worker.Worker {
	w := worker.New(client, FlowDomainName.String(), TaskListName, workerOptions)
	w.RegisterWorkflowWithOptions(ff.RunFlowWorkflow, workflow.RegisterOptions{
		Name: RunFlowWorkflowName,
	})
	w.RegisterActivityWithOptions(ff.ExecutorActivity, activity.RegisterOptions{})
	w.RegisterActivityWithOptions(ff.CompleteFlowActivity, activity.RegisterOptions{})
	return []worker.Worker{w}
}

// GetDomain returns the factory domain
func (FlowFactory) GetDomain() Domain {
	return FlowDomainName
}
