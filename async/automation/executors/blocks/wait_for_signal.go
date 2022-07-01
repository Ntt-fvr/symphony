package blocks

import (
	"go.uber.org/cadence/workflow"
)

type WaitForSignalBlock struct {
	baseBlock
	WaitForSignalFunction func(workflow.Context, map[string]interface{}) map[string]interface{}
}

func (b *WaitForSignalBlock) Execute() (*ExecutorResult, error) {
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

func (b *WaitForSignalBlock) runLogic() error {
	b.output = b.WaitForSignalFunction(b.workflowCtx, b.input)
	return nil
}
