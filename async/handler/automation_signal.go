package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/facebookincubator/symphony/automation/celgo"
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
		return sendSignalRequestToFlow(entry.FlowInstanceId, entry)
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

		input := jsonToMap(entry.Payload)

		variables := map[string]interface{}{
			celgo.InputVariable: input,
		}

		for _, flowInstance := range flowInstances {
			blockInstances, err := flowInstance.QueryBlocks().Where(
				blockinstance.HasBlockWith(block.TypeEQ(block.TypeWaitForSignal)),
				blockinstance.StatusIn(blockinstance.StatusInProgress, blockinstance.StatusWaiting)).All(ctx)
			if err != nil {
				continue
			}

			for _, blockInstance := range blockInstances {
				blockValue, _ := blockInstance.Block(ctx)

				result, err := celgo.CompileAndEvaluate(blockValue.CustomFilter, variables)
				if err != nil {
					continue
				}

				value, ok := result.Value().(bool)
				if ok && value {
					err = sendSignalRequestToFlow(flowInstance.ID, entry)
					if err != nil {
						continue
					}
				}
			}
		}
	}

	return nil
}

func sendSignalRequestToFlow(flowInstanceId int, entry event.SignalEvent) error {
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

	return err
}

func jsonToMap(value interface{}) map[string]interface{} {
	jsonBytes, err := json.Marshal(value)
	if err != nil {
		return nil
	}

	var mapValue map[string]interface{}
	err = json.Unmarshal(jsonBytes, &mapValue)
	if err != nil {
		return nil
	}

	return mapValue
}
