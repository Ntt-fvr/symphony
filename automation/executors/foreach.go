package executors

import (
	"context"
	"errors"
	"github.com/facebookincubator/symphony/automation/celgo"
	"go.uber.org/cadence/workflow"
)

type ExecutorForEachBlock struct {
	ExecutorBaseBlock
	Key          string
	StartBlockID string
	SearchBlock  func(string) *ExecutorBlock
	ExecuteBlock func(
		workflow.Context, context.Context, ExecutorBlock, map[string]interface{}, map[string]interface{},
	) (*ExecutorResult, error)
}

func (b *ExecutorForEachBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorForEachBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.Input)
	stateVariable := celgo.ConvertToValue(b.State)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	result, err := celgo.CompileAndEvaluate(b.Key, variables)
	if err != nil {
		return err
	}

	values, ok := result.Value().([]interface{})
	if !ok {
		return errors.New("key values is not an array")
	}

	var output []map[string]interface{}
	for _, value := range values {
		input := value.(map[string]interface{})

		block := b.SearchBlock(b.StartBlockID)
		for block != nil {

			executorResult, err := b.ExecuteBlock(b.ctx, b.graphCtx, *block, input, b.State)
			if err != nil {
				return err
			}

			if executorResult != nil {
				input = executorResult.Output

				if nextBlock := executorResult.NextBlock; nextBlock != "" {
					automationBlock := b.SearchBlock(nextBlock)
					if automationBlock != nil {
						block = automationBlock
					} else {
						block = nil
					}
				} else {
					block = nil
				}
			} else {
				block = nil
			}
		}

		output = append(output, input)
	}

	for k, v := range b.Input {
		b.Output[k] = v
	}

	b.Output[b.Key] = output

	return nil
}
