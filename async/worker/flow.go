// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/cadence/activity"
	"go.uber.org/cadence/worker"
	"go.uber.org/cadence/workflow"
	"go.uber.org/zap"
	"gocloud.dev/runtimevar"
)

const (
	RunFlowWorkflowName = "RunFlow"
	badID               = -1
)

var defaultLocalActivityOptions = workflow.LocalActivityOptions{
	ScheduleToCloseTimeout: 5 * time.Second,
}

var defaultActivityOptions = workflow.ActivityOptions{
	ScheduleToStartTimeout: 5 * time.Second,
	StartToCloseTimeout:    5 * time.Second,
}

// RunFlowInput is the input for the RunFlow workflow
type RunFlowInput struct {
	FlowInstanceID int
}

// CompleteFlowInput is the input for the CompleteFlow activity
type CompleteFlowInput struct {
	FlowInstanceID       int
	StartBlockInstanceID int
}

// FlowWorkerConfig is the config for the flow worker
type FlowWorkerConfig struct {
	Tenancy  viewer.Tenancy
	Features *runtimevar.Variable
	Logger   log.Logger
}

// Worker contains all cadence workflows and activities. It exports register function to register them to cadence
type Worker interface {
	Register(w worker.Worker)
}

// FlowWorker contains the workflow and all activities required for the flow engine
type FlowWorker struct {
	logger   log.Logger
	tenancy  viewer.Tenancy
	features *runtimevar.Variable
}

// NewFlowWorker return FlowWorker given its configuration
func NewFlowWorker(cfg FlowWorkerConfig) *FlowWorker {
	return &FlowWorker{
		tenancy:  cfg.Tenancy,
		features: cfg.Features,
		logger:   cfg.Logger,
	}
}

// RunFlowWorkflow is the workflow that runs the main flow. It is tied to flow instance ent and reads the ent graph
// database to find the next block that needs to be executed as activity
func (wc *FlowWorker) RunFlowWorkflow(ctx workflow.Context, input RunFlowInput) error {
	var startBlockInstanceID int
	info := workflow.GetInfo(ctx)
	workflow.GetLogger(ctx).Info("workflow started", zap.String("name", info.WorkflowExecution.ID))
	if err := workflow.ExecuteLocalActivity(
		workflow.WithLocalActivityOptions(ctx, defaultLocalActivityOptions), wc.ReadStartBlockLocalActivity, input).
		Get(ctx, &startBlockInstanceID); err != nil {
		return err
	}
	if err := workflow.ExecuteActivity(
		workflow.WithActivityOptions(ctx, defaultActivityOptions), wc.CompleteFlowActivity, &CompleteFlowInput{
			FlowInstanceID:       input.FlowInstanceID,
			StartBlockInstanceID: startBlockInstanceID,
		}).Get(ctx, nil); err != nil {
		return err
	}
	workflow.GetLogger(ctx).Info("workflow completed", zap.String("name", info.WorkflowExecution.ID))
	return nil
}

// CompleteFlowActivity marks the the flow instance as completed. This should be the last activity in the flow workflow
func (wc *FlowWorker) CompleteFlowActivity(ctx context.Context, input CompleteFlowInput) error {
	wc.logger.For(ctx).Info("completing flow instance",
		zap.Int("instanceID", input.FlowInstanceID))
	return ent.RunWithTransaction(ctx, func(ctx context.Context) error {
		client := ent.FromContext(ctx)
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
func (wc *FlowWorker) ReadStartBlockLocalActivity(ctx context.Context, input RunFlowInput) (int, error) {
	client := ent.FromContext(ctx)
	wc.logger.For(ctx).Info("reading flow start",
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

// Register registers the workflow and all activities to the cadence worker
func (wc *FlowWorker) Register(w worker.Worker) {
	w.RegisterWorkflowWithOptions(wc.RunFlowWorkflow, workflow.RegisterOptions{
		Name: RunFlowWorkflowName,
	})
	w.RegisterActivityWithOptions(wc.CompleteFlowActivity, activity.RegisterOptions{})
}
