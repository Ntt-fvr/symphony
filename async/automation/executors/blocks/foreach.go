package blocks

import (
	"errors"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/executors/model"
)

type ForEachBlock struct {
	baseBlock
	key          string
	blocks       []int
	startBlock   int
	SearchBlock  func(int2 int) *model.Block
	ExecuteBlock func(model.Block, map[string]interface{}, map[string]interface{}) (*ExecutorResult, error)
}

func (b *ForEachBlock) Execute() (*ExecutorResult, error) {
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

func (b *ForEachBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	result, err := celgo.CompileAndEvaluate(b.key, variables)
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

		block := b.SearchBlock(b.startBlock)
		for block != nil {

			executorResult, err := b.ExecuteBlock(*block, input, b.state)
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

	b.input[b.key] = output

	b.output = b.input

	return nil
}
