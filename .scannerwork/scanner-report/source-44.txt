package executors

import (
	"github.com/facebookincubator/symphony/automation/celgo"
)

type ExecutorChoiceRule struct {
	Index     int
	BlockID   string
	Condition string
}

type ExecutorChoiceBlock struct {
	ExecutorBaseBlock
	Rules []ExecutorChoiceRule
}

func (b *ExecutorChoiceBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorChoiceBlock) runLogic() error {
	inputVariable := celgo.ConvertToValue(b.Input)
	stateVariable := celgo.ConvertToValue(b.State)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	for _, rule := range b.Rules {
		result, err := celgo.CompileAndEvaluate(rule.Condition, variables)
		if err != nil {
			return err
		}

		value, ok := result.Value().(bool)
		if ok && value {
			b.NextBlockID = rule.BlockID
			break
		}
	}

	b.Output = b.Input

	return nil
}
