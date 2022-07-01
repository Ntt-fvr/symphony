package blocks

import (
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/google/cel-go/common/types/ref"
	"go.uber.org/cadence/workflow"
	"time"
)

type TimerBlock struct {
	baseBlock
	behavior          block.TimerBehavior
	seconds           int
	datetime          time.Time
	enableExpressionL bool
	expression        string
	TimerFunction     func(workflow.Context, time.Duration) interface{}
}

func (b *TimerBlock) Execute() (*ExecutorResult, error) {
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

func (b *TimerBlock) runLogic() error {
	var inputVariable, stateVariable ref.Val
	var variables map[string]interface{}

	if b.enableExpressionL {

		inputVariable = celgo.ConvertToValue(b.input)
		stateVariable = celgo.ConvertToValue(b.state)

		variables = map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

	}

	var duration time.Duration
	switch b.behavior {
	case block.TimerBehaviorFIXED_INTERVAL:
		if b.enableExpressionL {
			result, err := celgo.CompileAndEvaluate(b.expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(int)
			if ok {
				b.seconds = value
			}
		}
		duration = getDurationFromSeconds(b.seconds)
	case block.TimerBehaviorSPECIFIC_DATETIME:
		if b.enableExpressionL {
			result, err := celgo.CompileAndEvaluate(b.expression, variables)
			if err != nil {
				return err
			}

			value, ok := result.Value().(string)
			if ok {
				b.datetime = getDateTimeFromString(value)
			}
		}
		duration = getDurationFromDateTime(b.datetime)
	}

	value := b.TimerFunction(b.workflowCtx, duration)
	if value == nil {
		b.output = b.input
		return nil
	}

	switch value.(type) {
	case int:
		b.seconds = value.(int)
		if b.seconds == 0 {
			b.output = b.input
			return nil
		}
	case string:
		result := value.(string)
		if result == "" {
			b.output = b.input
			return nil
		}
		b.datetime = getDateTimeFromString(result)
	}
	return b.runLogic()
}
