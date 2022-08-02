package executors

type ExecutorParallelBlock struct {
	ExecutorBaseBlock
	Key          string
	StartBlockID string
}

func (b *ExecutorParallelBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorParallelBlock) runLogic() error {
	b.Output = b.Input
	return nil
}
