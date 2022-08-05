package executors

import (
	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/automation/util"
	"github.com/google/cel-go/common/types/ref"
	"go.uber.org/cadence/workflow"
	"time"
)

type ExecutorTimerBlock struct {
	ExecutorBaseBlock
	Seconds          int
	EnableExpression bool
	Expression       string
	SpecificDate     time.Time
	Behavior         enum.TimerBehavior
	TimerFunction    func(workflow.Context, time.Duration) interface{}
}

func (b *ExecutorTimerBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorTimerBlock) runLogic() error {
	var inputVariable, stateVariable ref.Val
	var variables map[string]interface{}

	if b.EnableExpression {
		inputVariable = celgo.ConvertToValue(b.Input)
		stateVariable = celgo.ConvertToValue(b.State)

		variables = map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

	}

	var duration time.Duration
	switch b.Behavior {
	case enum.TimerBehaviorFixedInterval:
		if b.EnableExpression {
			result, err := celgo.CompileAndEvaluate(b.Expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(int)
			if ok {
				b.Seconds = value
			}
		}
		duration = util.GetDurationFromSeconds(b.Seconds)
	case enum.TimerBehaviorSpecificDatetime:
		if b.EnableExpression {
			result, err := celgo.CompileAndEvaluate(b.Expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(string)
			if ok {
				b.SpecificDate = util.GetDateTimeFromString(value)
			}
		}
		duration = util.GetDurationFromDateTime(b.SpecificDate)
	}

	value := b.TimerFunction(b.ctx, duration)
	if value == nil {
		b.Output = b.Input
		return nil
	}

	switch value.(type) {
	case int:
		b.Seconds = value.(int)
		if b.Seconds == 0 {
			b.Output = b.Input
			return nil
		}
	case string:
		result := value.(string)
		if result == "" {
			b.Output = b.Input
			return nil
		}
		b.SpecificDate = util.GetDateTimeFromString(result)
	}
	return b.runLogic()
}
