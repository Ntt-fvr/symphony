package blocks

import "github.com/facebookincubator/symphony/async/automation/celgo"

type ChoiceRuleBlock struct {
	expression string
	block      int
}

type ChoiceBlock struct {
	baseBlock
	rules []ChoiceRuleBlock
}

func (b *ChoiceBlock) Execute() (*ExecutorResult, error) {
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

func (b *ChoiceBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	for _, rule := range b.rules {
		result, err := celgo.CompileAndEvaluate(rule.expression, variables)
		if err != nil {
			return err
		}

		value, ok := result.Value().(bool)
		if ok && value {
			b.nextBlock = rule.block
			break
		}
	}

	b.output = b.input

	return nil
}
