package executors

import (
	"context"
	"errors"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/model"
	"go.uber.org/cadence/workflow"
)

type ExecutorForEachBlock struct {
	executorBaseBlock
	SearchBlock  func(int) *model.IBlock
	ExecuteBlock func(
		workflow.Context, context.Context, model.IBlock, map[string]interface{}, map[string]interface{},
	) (*ExecutorResult, error)
}

func (b *ExecutorForEachBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	forEachBlock := b.iBlock.(*model.ForEachBlock)

	result, err := celgo.CompileAndEvaluate(forEachBlock.Key, variables)
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

		block := b.SearchBlock(forEachBlock.StartBlockID)
		for block != nil {

			executorResult, err := b.ExecuteBlock(b.WorkflowCtx, b.EntCtx, *block, input, b.state)
			if err != nil {
				return err
			}

			if executorResult != nil {
				input = executorResult.Output

				if nextBlock := executorResult.NextBlock; nextBlock > 0 {
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

	b.input[forEachBlock.Key] = output

	b.output = b.input

	return nil
}
