package executors

import "github.com/facebookincubator/symphony/async/automation/model"

type ExecutorExecuteFlowBlock struct {
	executorBaseBlock
	FlowExecutor func(uint64, map[string]interface{}) (map[string]interface{}, error)
}

func (b *ExecutorExecuteFlowBlock) runLogic() error {
	executeFlowBlock := b.iBlock.(*model.ExecuteFlowBlock)
	result, err := b.FlowExecutor(executeFlowBlock.FlowID, b.input)
	if err != nil {
		return err
	}

	b.output = result
	return nil
}
