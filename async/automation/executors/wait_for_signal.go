package executors

import (
	"go.uber.org/cadence/workflow"
)

type ExecutorWaitForSignalBlock struct {
	executorBaseBlock
	WaitForSignalFunction func(workflow.Context, map[string]interface{}) map[string]interface{}
}

func (b *ExecutorWaitForSignalBlock) runLogic() error {
	b.output = b.WaitForSignalFunction(b.Ctx, b.input)
	return nil
}
