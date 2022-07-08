package blocks

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/executors/model"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

func GetBlockInstances(
	automationBlock model.AutomationBlock, input, state map[string]interface{},
	blockStatusFunction func(context.Context, int, blockinstance.Status, *time.Time, map[string]interface{}) error,
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
			key:        *automationBlock.ForeachKey,
			startBlock: *automationBlock.ForeachStartBlockID,
		}
	case block.TypeInvokeRestAPI:
		headers := getHeaders(automationBlock.Headers)

		var url string
		if automationBlock.URL != nil {
			url = *automationBlock.URL
		}

		var body string
		if automationBlock.Body != nil {
			body = *automationBlock.Body
		}

		var timeout int
		if automationBlock.ConnectionTimeout != nil {
			timeout = *automationBlock.ConnectionTimeout
		}

		executorBlock = &InvokeRestAPIBlock{
			baseBlock: baseBlock,
			method:    automationBlock.URLMethod.String(),
			url:       url,
			body:      body,
			timeout:   timeout,
			headers:   headers,
		}
	case block.TypeKafka:
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
		var behavior block.TimerBehavior
		if automationBlock.TimerBehavior != nil {
			behavior = *automationBlock.TimerBehavior
		}

		var seconds int
		if automationBlock.Seconds != nil {
			seconds = *automationBlock.Seconds
		}

		var datetime time.Time
		if automationBlock.TimerSpecificDate != nil {
			datetime = *automationBlock.TimerSpecificDate
		}

		var enableExpression bool
		if automationBlock.EnableTimerExpression != nil {
			enableExpression = *automationBlock.EnableTimerExpression
		}

		var expression string
		if automationBlock.TimerExpression != nil {
			expression = *automationBlock.TimerExpression
		}

		executorBlock = &TimerBlock{
			baseBlock:         baseBlock,
			behavior:          behavior,
			seconds:           seconds,
			datetime:          datetime,
			enableExpressionL: enableExpression,
			expression:        expression,
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

func getTransformation(block model.AutomationBlock) blockTransformations {
	transformations := blockTransformations{}

	if block.EnableInputTransformation != nil && *block.EnableInputTransformation {
		if value := block.InputTransformation; value != nil && *value != "" {
			if strategy := block.InputTransfStrategy; strategy != nil {
				transformations.input = &blockTransformationValue{
					key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "IN"),
						AstValue: *value,
					},
					strategy: *strategy,
				}
			}
		}
	}

	if block.EnableInputStateTransformation != nil && *block.EnableInputStateTransformation {
		if value := block.InputStateTransformation; value != nil && *value != "" {
			if strategy := block.InputStateTransfStrategy; strategy != nil {
				transformations.inputState = &blockTransformationValue{
					key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "IS"),
						AstValue: *value,
					},
					strategy: *strategy,
				}
			}
		}
	}

	if block.EnableOutputTransformation != nil && *block.EnableOutputTransformation {
		if value := block.OutputTransformation; value != nil && *value != "" {
			if strategy := block.OutputTransfStrategy; strategy != nil {
				transformations.output = &blockTransformationValue{
					key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "OU"),
						AstValue: *value,
					},
					strategy: *strategy,
				}
			}
		}
	}

	if block.EnableOutputStateTransformation != nil && *block.EnableOutputStateTransformation {
		if value := block.OutputStateTransformation; value != nil && *value != "" {
			if strategy := block.OutputStateTransfStrategy; strategy != nil {
				transformations.outputState = &blockTransformationValue{
					key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "OS"),
						AstValue: *value,
					},
					strategy: *strategy,
				}
			}
		}
	}

	return transformations
}

func getBaseBlock(
	block model.AutomationBlock, input, state map[string]interface{}, transformations blockTransformations,
	blockStatusFunction func(context.Context, int, blockinstance.Status, *time.Time, map[string]interface{}) error,
) baseBlock {

	var inputTransformation bool
	if block.EnableInputTransformation != nil {
		inputTransformation = *block.EnableInputTransformation
	}

	var inputStateTransformation bool
	if block.EnableInputStateTransformation != nil {
		inputStateTransformation = *block.EnableInputStateTransformation
	}

	var outputTransformation bool
	if block.EnableOutputTransformation != nil {
		outputTransformation = *block.EnableOutputTransformation
	}

	var outputStateTransformation bool
	if block.EnableOutputStateTransformation != nil {
		outputStateTransformation = *block.EnableOutputStateTransformation
	}

	return baseBlock{
		workflowCtx:               block.WorkflowCtx,
		appCtx:                    block.AppCtx,
		inputTransformation:       inputTransformation,
		inputStateTransformation:  inputStateTransformation,
		outputTransformation:      outputTransformation,
		outputStateTransformation: outputStateTransformation,
		transformations:           transformations,
		nextBlock:                 block.NextBlock,
		input:                     input,
		state:                     state,
		blockStatusFunction:       blockStatusFunction,
	}
}

func getChoiceRules(block model.AutomationBlock) []ChoiceRuleBlock {
	var rules []ChoiceRuleBlock
	for _, rule := range block.ChoiceRoutes {
		rules = append(rules, ChoiceRuleBlock{
			expression: rule.Condition,
			block:      rule.Id,
		})
	}
	return rules
}
