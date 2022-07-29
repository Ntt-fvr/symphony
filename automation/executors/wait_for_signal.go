package executors

import (
	"github.com/facebookincubator/symphony/automation/enum"
	"go.uber.org/cadence/workflow"
)

type ExecutorWaitForSignalBlock struct {
	ExecutorBaseBlock
	Blocked               bool
	CustomFilter          string
	SignalType            enum.SignalType
	SignalModule          enum.SignalModule
	WaitForSignalFunction func(workflow.Context, map[string]interface{}) map[string]interface{}
}

func (b *ExecutorWaitForSignalBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorWaitForSignalBlock) runLogic() error {
	b.Output = b.WaitForSignalFunction(b.ctx, b.Input)
	return nil
}
