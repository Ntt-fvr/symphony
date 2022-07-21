package executors

type ExecutorExecuteFlowBlock struct {
	executorBaseBlock
	FlowExecutor func(int, map[string]interface{}) (map[string]interface{}, error)
}

func (b *ExecutorExecuteFlowBlock) runLogic() error {
	executeFlowBlock := b.executorBlock.ExecuteFlow
	if executeFlowBlock == nil {
		return configNotFound
	}

	result, err := b.FlowExecutor(executeFlowBlock.FlowID, b.input)
	if err != nil {
		return err
	}

	b.output = result
	return nil
}
