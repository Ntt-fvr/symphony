// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"bytes"
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/automation/model"
	"github.com/facebookincubator/symphony/automation/util"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/cadence/client"
	"net/http"
	"strings"
)

// FlowHandler is the handler struct for handling flow lifecycle (starting flows, registering triggers etc).
type FlowHandler struct {
	client        client.Client
	automationUrl string
}

// NewFlowHandler return FlowHandler
func NewFlowHandler(client client.Client, automationUrl string) *FlowHandler {
	return &FlowHandler{
		client:        client,
		automationUrl: automationUrl,
	}
}

// Handle handles event based on relevant logic
func (f FlowHandler) Handle(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	entry, ok := evt.(event.LogEntry)
	if !ok || entry.Type != ent.TypeFlowInstance {
		return nil
	}

	v := viewer.FromContext(ctx)
	if !v.Features().Enabled(viewer.FeatureExecuteAutomationFlows) {
		return nil
	}

	var url string
	var requestBody interface{}

	flowInstanceID := entry.CurrState.ID
	tenant := v.Tenant()

	// TODO Remove it
	fmt.Println()
	fmt.Printf("[Autiomation] flow instance id: %d\n", flowInstanceID)
	fmt.Printf("[Autiomation] tenant: %s\n", tenant)
	fmt.Println()

	if entry.Operation.Is(ent.OpCreate) {
		url = f.getUrl("start")
		requestBody = model.FlowInstanceRequest{
			FlowInstanceID: flowInstanceID,
			Tenant:         tenant,
		}

		// TODO Remove it
		fmt.Println()
		fmt.Printf("[Autiomation] url [start]: %s\n", url)
		fmt.Println()
	} else {
		switch entry.CurrState.Type {
		case flowinstance.StatusPaused.String():
			url = f.getUrl("pause")
		case flowinstance.StatusRunning.String():
			url = f.getUrl("resume")
		case flowinstance.StatusCancelled.String():
			url = f.getUrl("cancel")
		}

		// TODO Remove it
		fmt.Println()
		fmt.Printf("[Automation] url [signal]: %s\n", url)
		fmt.Println()

		flowInstance, err := ent.FromContext(ctx).FlowInstance.Get(ctx, entry.CurrState.ID)
		if err != nil {
			return err
		}

		requestBody = model.SignalRequest{
			WorkflowID: flowInstance.BssCode,
			RunID:      flowInstance.ServiceInstanceCode,
		}
	}

	body, err := util.ToJsonBytes(requestBody)
	if err != nil {
		return err
	}

	// TODO Remove it
	fmt.Println()
	fmt.Printf("[Automation] body: %s\n", string(body))
	fmt.Println()

	request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	automationClient := &http.Client{}

	response, err := automationClient.Do(request)
	if err != nil {
		// TODO Remove it
		fmt.Println()
		fmt.Printf("[Automation] error: %s\n", err)
		fmt.Println()
		return err
	}

	// TODO Remove it
	fmt.Println()
	fmt.Printf("[Automation] response status: %d\n", response.StatusCode)
	fmt.Println()

	return nil
}

func (f FlowHandler) getUrl(endpoint string) string {
	var separator string
	if !strings.HasSuffix(f.automationUrl, "/") {
		separator = "/"
	}
	return fmt.Sprintf("%s%s%s", f.automationUrl, separator, endpoint)
}
