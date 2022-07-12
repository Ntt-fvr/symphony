package executors

type ExecutorParallelBlock struct {
	executorBaseBlock
}

func (b *ExecutorParallelBlock) runLogic() error {
	b.output = b.input
	return nil
}
