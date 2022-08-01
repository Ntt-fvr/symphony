package handlers

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/automation/cadence/builder"
	"github.com/facebookincubator/symphony/automation/cadence/flow"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/automation/model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.uber.org/cadence/client"
	"go.uber.org/zap"
	"net/http"
	"strconv"
	"time"
)

func flowStart(c *gin.Context) {
	var request model.FlowInstanceRequest

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	taskList := cadenceConfig.Worker.TaskList

	workflowOptions := client.StartWorkflowOptions{
		ID:                              "WORKFLOW_" + uuid.New().String(),
		TaskList:                        taskList,
		ExecutionStartToCloseTimeout:    time.Minute * 60,
		DecisionTaskStartToCloseTimeout: time.Second * 10,
	}

	logger := builder.BuildLogger()
	workflowClient := builder.BuildClient(cadenceConfig)

	flowInstanceID := strconv.Itoa(request.FlowInstanceID)

	execution, err := workflowClient.StartWorkflow(context.Background(), workflowOptions,
		flow.AutomationWorkflow, taskList, flowInstanceID)
	if err != nil {
		logger.Error("Workflow failed.", zap.Error(err))
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	logger.Info(fmt.Sprintf("Started Workflow ID: %s, RunID: %s", execution.ID, execution.RunID))

	c.Status(http.StatusOK)
}

func flowPauseSignal(c *gin.Context) {
	sendSignal(c, enum.SignalPause)
}

func flowResumeSignal(c *gin.Context) {
	sendSignal(c, enum.SignalResume)
}

func flowCancelSignal(c *gin.Context) {
	sendSignal(c, enum.SignalCancel)
}

func flowBlockSignal(c *gin.Context) {
	sendSignal(c, enum.SignalBlock)
}

func flowTimerSignal(c *gin.Context) {
	sendSignal(c, enum.SignalTimer)
}

func sendSignal(c *gin.Context, signalName enum.SignalName) {
	var request model.SignalRequest

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var payLoad interface{}
	if request.Input != nil {
		payLoad = request.Input
	} else {
		payLoad = signalName.String()
	}

	logger := builder.BuildLogger()
	workflowClient := builder.BuildClient(cadenceConfig)

	err = workflowClient.SignalWorkflow(
		context.Background(), request.WorkflowID, request.RunID, signalName.String(), payLoad,
	)
	if err != nil {
		logger.Error("Signal failed.", zap.Error(err))
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	logger.Info(fmt.Sprintf("%s sent", signalName))

	c.Status(http.StatusOK)
}
