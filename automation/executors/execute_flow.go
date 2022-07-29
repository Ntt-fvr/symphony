package executors

type ExecutorExecuteFlowBlock struct {
	ExecutorBaseBlock
	FlowID       string
	FlowExecutor func(string, map[string]interface{}) (map[string]interface{}, error)
}

func (b *ExecutorExecuteFlowBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorExecuteFlowBlock) runLogic() error {
	result, err := b.FlowExecutor(b.FlowID, b.Input)
	if err != nil {
		return err
	}

	b.Output = result
	return nil
}
