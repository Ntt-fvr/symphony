package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"net/http"
)

type SignalRequest struct {
	FlowInstanceId int         `json:"workflowID" binding:"required"`
	Input          interface{} `json:"input,omitempty"`
}

func HandleAutomationSignal(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	var err error
	entry, ok := evt.(event.SignalEvent)
	fmt.Println("Handler Automation Signal", entry)
	if !ok || entry.Type != block.SignalTypeWOUPDATED {
		return nil
	}
	var flowInstanceId int
	if entry.FlowInstanceId != nil && *entry.FlowInstanceId > 0 {
		flowInstanceId = *entry.FlowInstanceId
	} else {
		//ent.FromContext(ctx).FlowInstance.Query().
	}
	url := "http://automation/api/flow/1.0/signal"
	bodyObject := &SignalRequest{
		FlowInstanceId: flowInstanceId,
		Input:          entry.Payload,
	}

	body, _ := json.Marshal(bodyObject)

	request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	automationClient := &http.Client{}
	_, err = automationClient.Do(request)
	if err != nil {
		return err
	}

	if err != nil {
		return err
	}
	return nil
}
