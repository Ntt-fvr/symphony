package activity

import (
	"github.com/facebookincubator/symphony/async/automation/executors"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/async/automation/operations"
	"go.uber.org/cadence/workflow"
)

func ExecuteBlockActivity(ctx workflow.Context, block model.BaseBlock,
	input, state map[string]interface{}) (*executors.ExecutorResult, error) {

	blockInstance := executors.GetBlockInstances(ctx, block, input, state, operations.UpdateBlockStatus)
	return blockInstance.Execute()
}
