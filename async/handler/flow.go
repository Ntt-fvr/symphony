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
	"go.uber.org/zap"
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
func (f FlowHandler) Handle(ctx context.Context, logger log.Logger, evt ev.EventObject) error {

	// TODO Remove it
	tempLog := logger.Background()

	entry, ok := evt.(event.LogEntry)
	// TODO Remove it
	tempLog.Info(
		"[FlowHandler]",
		zap.Any("Entry", entry),
	)
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

	tempLog.Info(
		"[Flow Instance]",
		zap.Int("[Automation] flow instance id", flowInstanceID),
		zap.String("[Automation] tenant", tenant),
	)

	if entry.Operation.Is(ent.OpCreate) {
		url = f.getUrl("start")
		requestBody = model.FlowInstanceRequest{
			FlowInstanceID: flowInstanceID,
			Tenant:         tenant,
		}

		// TODO Remove it
		tempLog.Info(
			"[Flow Instance]",
			zap.String("[Automation] url [start]", url),
		)
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
		tempLog.Info(
			"[Flow Instance]",
			zap.String("[Automation] url [signal]", url),
		)

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
	tempLog.Info(
		"[Flow Instance]",
		zap.String("[Automation] body", string(body)),
	)

	request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	automationClient := &http.Client{}

	response, err := automationClient.Do(request)
	if err != nil {
		// TODO Remove it
		tempLog.Error(
			"[Flow Instance]",
			zap.String("[Automation] error", err.Error()),
		)
		return err
	}

	// TODO Remove it
	tempLog.Error(
		"[Flow Instance]",
		zap.Int("[Automation] response status", response.StatusCode),
	)

	return nil
}

func (f FlowHandler) getUrl(endpoint string) string {
	var separator string
	if !strings.HasSuffix(f.automationUrl, "/") {
		separator = "/"
	}
	return fmt.Sprintf("%s%s%s", f.automationUrl, separator, endpoint)
}
