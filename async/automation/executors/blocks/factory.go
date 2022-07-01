package blocks

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/executors/model"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"time"
)

func GetBlockInstances(
	automationBlock model.Block, input, state map[string]interface{},
	blockStatusFunction func(context.Context, int, blockinstance.Status, *time.Time) error,
) ExecutorBlock {

	var executorBlock ExecutorBlock

	transformations := getTransformation(automationBlock)

	baseBlock := getBaseBlock(automationBlock, input, state, transformations, blockStatusFunction)

	switch automationBlock.Type {
	case block.TypeStart:
		executorBlock = &StartBlock{
			baseBlock,
		}
	case block.TypeGoTo:
		executorBlock = &GotoBlock{
			baseBlock,
		}
	case block.TypeEnd:
		executorBlock = &EndBlock{
			baseBlock,
		}
	case block.TypeChoice:
		rules := getChoiceRules(automationBlock)

		executorBlock = &ChoiceBlock{
			baseBlock: baseBlock,
			rules:     rules,
		}
	case block.TypeExecuteFlow:
		executorBlock = &ExecuteFlowBlock{
			baseBlock: baseBlock,
			flowID:    0, // TODO Verify
		}
	case block.TypeForEach:
		executorBlock = &ForEachBlock{
			baseBlock:  baseBlock,
			key:        "values", // TODO Verify
			startBlock: 0,        // TODO Verify
		}
	case block.TypeInvokeRestAPI:
		headers := getHeaders(automationBlock.Headers)

		executorBlock = &InvokeRestAPIBlock{
			baseBlock: baseBlock,
			method:    automationBlock.URLMethod.String(),
			url:       automationBlock.URL,
			body:      automationBlock.Body,
			timeout:   automationBlock.ConnectionTimeout,
			headers:   headers,
		}
	case block.TypeDecision:
		executorBlock = &KafkaBlock{
			baseBlock:   baseBlock,
			topic:       automationBlock.KafkaTopic,
			expression:  automationBlock.KafkaMessage,
			brokers:     automationBlock.KafkaBrokers,
			messageType: automationBlock.KafkaMessageType,
		}
	case block.TypeParallel:
		executorBlock = &ParallelBlock{
			baseBlock: baseBlock,
		}
	case block.TypeTimer:
		executorBlock = &TimerBlock{
			baseBlock:         baseBlock,
			behavior:          automationBlock.TimerBehavior,
			seconds:           automationBlock.Seconds,
			datetime:          automationBlock.TimerSpecificDate,
			enableExpressionL: automationBlock.EnableTimerExpression,
			expression:        automationBlock.TimerExpression,
		}
	case block.TypeWaitForSignal:
		executorBlock = &WaitForSignalBlock{
			baseBlock: baseBlock,
		}
	}

	return executorBlock
}

func getHeaders(values []*flowschema.VariableValue) map[string]string {
	headers := make(map[string]string)
	if values != nil {
		for _, value := range values {
			if value != nil {
				headers[value.VariableDefinitionKey] = value.Value
			}
		}
	}
	return headers
}

func getTransformation(block model.Block) blockTransformations {
	transformations := blockTransformations{}

	if block.EnableInputTransformation {
		if value := block.InputTransformation; value != "" {
			transformations.input = &blockTransformationValue{
				key: celgo.AstKey{
					Key:      fmt.Sprintf("%d-%s", block.ID, "IN"),
					AstValue: value,
				},
				strategy: block.InputTransfStrategy,
			}
		}
	}

	if block.EnableInputStateTransformation {
		if value := block.InputStateTransformation; value != "" {
			transformations.inputState = &blockTransformationValue{
				key: celgo.AstKey{
					Key:      fmt.Sprintf("%d-%s", block.ID, "IS"),
					AstValue: value,
				},
				strategy: block.InputStateTransfStrategy,
			}
		}
	}

	if block.EnableOutputTransformation {
		if value := block.OutputTransformation; value != "" {
			transformations.output = &blockTransformationValue{
				key: celgo.AstKey{
					Key:      fmt.Sprintf("%d-%s", block.ID, "OU"),
					AstValue: value,
				},
				strategy: block.OutputTransfStrategy,
			}
		}
	}

	if block.EnableOutputStateTransformation {
		if value := block.OutputStateTransformation; value != "" {
			transformations.outputState = &blockTransformationValue{
				key: celgo.AstKey{
					Key:      fmt.Sprintf("%d-%s", block.ID, "OS"),
					AstValue: value,
				},
				strategy: block.OutputStateTransfStrategy,
			}
		}
	}

	return transformations
}

func getBaseBlock(
	block model.Block, input, state map[string]interface{}, transformations blockTransformations,
	blockStatusFunction func(context.Context, int, blockinstance.Status, *time.Time) error,
) baseBlock {

	return baseBlock{
		workflowCtx:               block.WorkflowCtx,
		appCtx:                    block.AppCtx,
		inputTransformation:       block.EnableInputTransformation,
		inputStateTransformation:  block.EnableInputStateTransformation,
		outputTransformation:      block.EnableOutputTransformation,
		outputStateTransformation: block.EnableOutputStateTransformation,
		transformations:           transformations,
		nextBlock:                 block.NextBlock,
		input:                     input,
		state:                     state,
		blockStatusFunction:       blockStatusFunction,
	}
}

func getChoiceRules(block model.Block) []ChoiceRuleBlock {
	var rules []ChoiceRuleBlock
	for _, rule := range block.ChoiceRoutes {
		rules = append(rules, ChoiceRuleBlock{
			expression: rule.Condition,
			block:      rule.Id,
		})
	}
	return rules
}

func getDateTimeFromString(date string) time.Time {
	dateTime, err := time.Parse(time.RFC3339, date)
	if err != nil {
		return time.Now()
	}
	return dateTime
}

func getDurationFromSeconds(value int) time.Duration {
	duration, err := time.ParseDuration(fmt.Sprintf("%ds", value))
	if err != nil {
		return time.Minute
	}
	return duration
}

func getDurationFromDateTime(dateTime time.Time) time.Duration {
	return dateTime.Sub(time.Now())
}
