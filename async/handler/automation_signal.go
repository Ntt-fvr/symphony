package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
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

	entry, ok := evt.(event.SignalEvent)
	fmt.Println("Handler Automation Signal", entry)
	if !ok || entry.Type != block.SignalTypeWOUPDATED {
		return nil
	}
	if entry.FlowInstanceId > 0 {
		_, err := sendSignalRequestToFlow(entry.FlowInstanceId, entry)
		return err
	} else {
		client := ent.FromContext(ctx)
		flowInstances, err := client.FlowInstance.Query().Where(
			flowinstance.StatusEQ(flowinstance.StatusRunning),
			flowinstance.HasBlocksWith(
				blockinstance.HasBlockWith(block.TypeEQ(block.TypeWaitForSignal)),
				blockinstance.StatusIn(blockinstance.StatusInProgress, blockinstance.StatusWaiting)),
		).All(ctx)
		if err != nil {
			return err
		}
		for _, flowInstance := range flowInstances {
			blockInstances, err := flowInstance.QueryBlocks().Where(
				blockinstance.HasBlockWith(block.TypeEQ(block.TypeWaitForSignal)),
				blockinstance.StatusIn(blockinstance.StatusInProgress, blockinstance.StatusWaiting)).All(ctx)
			if err != nil {
				continue
			}
			for _, blockInstance := range blockInstances {
				block, _ := blockInstance.Block(ctx)
				//TODO: Implementar busqueda de bloque con EL
				fmt.Println(block)
				sendSignalRequestToFlow(flowInstance.ID, entry)
			}
		}
	}

	return nil
}

func sendSignalRequestToFlow(flowInstanceId int, entry event.SignalEvent) (*string, error) {
	url := "http://automation/api/flow/1.0/signal"
	bodyObject := &SignalRequest{
		FlowInstanceId: flowInstanceId,
		Input:          entry.Payload,
	}

	body, _ := json.Marshal(bodyObject)

	request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	automationClient := &http.Client{}
	_, err = automationClient.Do(request)
	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	return nil, nil
}
