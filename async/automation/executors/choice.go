package executors

import (
	"github.com/facebookincubator/symphony/async/automation/celgo"
)

type ExecutorChoiceBlock struct {
	executorBaseBlock
}

func (b *ExecutorChoiceBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	choiceBlock := b.executorBlock.Choice
	if choiceBlock == nil {
		return configNotFound
	}

	for _, rule := range choiceBlock.ChoiceRules {
		result, err := celgo.CompileAndEvaluate(rule.Condition, variables)
		if err != nil {
			return err
		}

		value, ok := result.Value().(bool)
		if ok && value {
			b.executorBlock.SetNextBlockID(rule.BlockID)
			break
		}
	}

	b.output = b.input

	return nil
}
