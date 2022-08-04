package executors

type ExecutorStartBlock struct {
	ExecutorBaseBlock
}

func (b *ExecutorStartBlock) Execute() (*ExecutorResult, error) {
	return b.execute()
}

type ExecutorEndBlock struct {
	ExecutorBaseBlock
}

func (b *ExecutorEndBlock) Execute() (*ExecutorResult, error) {
	return b.execute()
}

type ExecutorGotoBlock struct {
	ExecutorBaseBlock
}

func (b *ExecutorGotoBlock) Execute() (*ExecutorResult, error) {
	return b.execute()
}
