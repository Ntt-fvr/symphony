// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/async/automation/cadence/flow"
	"time"

	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/cadence/client"
)

// FlowHandler is the handler struct for handling flow lifecycle (starting flows, registering triggers etc).
type FlowHandler struct {
	client client.Client
}

// NewFlowHandler return FlowHandler
func NewFlowHandler(client client.Client) *FlowHandler {
	return &FlowHandler{
		client: client,
	}
}

// Handle handles event based on relevant logic
func (f FlowHandler) Handle(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	fmt.Println("FlowHandler")
	entry, ok := evt.(event.LogEntry)
	fmt.Println("evt.(event.LogEntry)", entry, ok)
	if !ok || entry.Type != ent.TypeFlowInstance || !entry.Operation.Is(ent.OpCreate) {
		fmt.Println("no es de ent.TypeFlowInstance")
		return nil
	}

	v := viewer.FromContext(ctx)
	if !v.Features().Enabled(viewer.FeatureExecuteAutomationFlows) {
		fmt.Println("FeatureExecuteAutomationFlows disabled")
		return nil
	}

	workflowOptions := client.StartWorkflowOptions{
		ID:                           worker.GetGlobalWorkflowID(ctx, entry.CurrState.ID),
		TaskList:                     worker.TaskListName,
		ExecutionStartToCloseTimeout: 365 * 24 * time.Hour,
	}

	runFlowInput := worker.RunFlowInput{
		FlowInstanceID: entry.CurrState.ID,
	}
	fmt.Println("FlowInstanceID ", entry.CurrState.ID)

	/*
		_, err := f.client.StartWorkflow(
			ctx, workflowOptions, worker.RunFlowWorkflowName,
			ctx, worker.TaskListName, runFlowInput,
		)
	*/
	_, err := f.client.StartWorkflow(
		ctx, workflowOptions, flow.AutomationWorkflow,
		ctx, worker.TaskListName, runFlowInput.FlowInstanceID,
	)
	return err
}
