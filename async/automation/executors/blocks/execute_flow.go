package blocks

type ExecuteFlowBlock struct {
	baseBlock
	flowID       uint64
	FlowExecutor func(uint64, map[string]interface{}) (map[string]interface{}, error)
}

func (b *ExecuteFlowBlock) Execute() (*ExecutorResult, error) {
	b.updateBlockInProgress()

	err := b.executeInputTransformation()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	err = b.runLogic()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	err = b.executeOutputTransformation()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	blockResult := ExecutorResult{
		Output:    b.output,
		State:     b.state,
		NextBlock: b.nextBlock,
	}

	b.updateBlockCompleted()
	return &blockResult, nil
}

func (b *ExecuteFlowBlock) runLogic() error {
	result, err := b.FlowExecutor(b.flowID, b.input)
	if err != nil {
		return err
	}

	b.output = result
	return nil
}
