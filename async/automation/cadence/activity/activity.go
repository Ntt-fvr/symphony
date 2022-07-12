package activity

import (
	"context"
	"github.com/facebookincubator/symphony/async/automation/executors"
	"github.com/facebookincubator/symphony/async/automation/operations"
	"go.uber.org/cadence/workflow"
)

func ExecuteBlockActivity(ctx workflow.Context, entCtx context.Context, block interface{},
	input, state map[string]interface{}) (*executors.ExecutorResult, error) {

	blockInstance := executors.GetBlockInstances(ctx, entCtx, block, input, state, operations.UpdateBlockStatus)
	return blockInstance.Execute()
}
