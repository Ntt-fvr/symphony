package executors

import (
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/async/automation/util"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/google/cel-go/common/types/ref"
	"go.uber.org/cadence/workflow"
	"time"
)

type ExecutorTimerBlock struct {
	executorBaseBlock
	TimerFunction func(workflow.Context, time.Duration) interface{}
}

func (b *ExecutorTimerBlock) runLogic() error {
	var inputVariable, stateVariable ref.Val
	var variables map[string]interface{}

	timerBlock := b.iBlock.(*model.TimerBlock)

	if timerBlock.EnableExpression {

		inputVariable = celgo.ConvertToValue(b.input)
		stateVariable = celgo.ConvertToValue(b.state)

		variables = map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

	}

	var duration time.Duration
	switch timerBlock.Behavior {
	case block.TimerBehaviorFIXED_INTERVAL:
		if timerBlock.EnableExpression {
			result, err := celgo.CompileAndEvaluate(timerBlock.Expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(int)
			if ok {
				timerBlock.Seconds = value
			}
		}
		duration = util.GetDurationFromSeconds(timerBlock.Seconds)
	case block.TimerBehaviorSPECIFIC_DATETIME:
		if timerBlock.EnableExpression {
			result, err := celgo.CompileAndEvaluate(timerBlock.Expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(string)
			if ok {
				timerBlock.SpecificDate = util.GetDateTimeFromString(value)
			}
		}
		duration = util.GetDurationFromDateTime(timerBlock.SpecificDate)
	}

	value := b.TimerFunction(b.WorkflowCtx, duration)
	if value == nil {
		b.output = b.input
		return nil
	}

	switch value.(type) {
	case int:
		timerBlock.Seconds = value.(int)
		if timerBlock.Seconds == 0 {
			b.output = b.input
			return nil
		}
	case string:
		result := value.(string)
		if result == "" {
			b.output = b.input
			return nil
		}
		timerBlock.SpecificDate = util.GetDateTimeFromString(result)
	}
	return b.runLogic()
}
