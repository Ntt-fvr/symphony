package operations

import (
	"context"
	"errors"
	"fmt"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/async/automation/util"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"time"
)

func CreateBlockInstance(flowInstanceID int, blockID int, input map[string]interface{}) (int, error) {

	inputJson, err := util.ToJson(input)
	if err != nil {
		return 0, err
	}

	ctx := context.Background()

	blockInstance, err := ent.FromContext(ctx).
		BlockInstance.
		Create().
		SetFlowInstanceID(flowInstanceID).
		SetBlockID(blockID).
		SetInputJSON(inputJson).
		Save(ctx)

	if err != nil {
		return 0, err
	}

	if blockInstance == nil {
		return 0, errors.New("block instance don't save")
	}

	return blockInstance.ID, nil
}

func UpdateBlockStatus(
	blockInstanceID int, status blockinstance.Status, close bool,
	output map[string]interface{}, failureReason string,
) error {

	ctx := context.Background()

	query := ent.FromContext(ctx).BlockInstance.
		UpdateOneID(blockInstanceID).
		SetStatus(status)

	if close {
		query = query.SetEndDate(time.Now()).
			SetFailureReason(failureReason)

		if output != nil && len(output) > 0 {
			outputJson, err := util.ToJson(output)
			if err != nil {
				return err
			}

			query = query.SetOutputJSON(outputJson)
		}
	}

	_, err := query.Save(ctx)
	if err != nil {
		return err
	}

	return nil
}

func UpdateFlowInstance(flowInstanceID int, workflowID string, runID string) error {

	ctx := context.Background()

	_, err := ent.FromContext(ctx).FlowInstance.
		UpdateOneID(flowInstanceID).
		SetBssCode(workflowID).
		SetServiceInstanceCode(runID).
		Save(ctx)

	if err != nil {
		return err
	}

	return nil
}

func UpdateFlowInstanceStatus(flowInstanceID int, status flowinstance.Status, close bool) error {

	ctx := context.Background()

	query := ent.FromContext(ctx).FlowInstance.
		UpdateOneID(flowInstanceID).
		SetStatus(status)

	if close {
		query = query.SetEndDate(time.Now())
	}

	_, err := query.Save(ctx)
	if err != nil {
		return err
	}

	return nil
}

func GetInputAndBlocks(flowInstanceID int) (map[string]interface{}, map[int]model.BaseBlock, error) {

	ctx := context.Background()

	flowInstance, err := ent.FromContext(ctx).
		FlowInstance.
		Get(ctx, flowInstanceID)

	if err != nil {
		return nil, nil, err
	}

	input := make(map[string]interface{})
	if flowInstance.StartParams != nil {
		for _, param := range flowInstance.StartParams {
			if param != nil {
				input[param.VariableDefinitionKey] = param.Value
			}
		}
	}

	templateBlocks, err := flowInstance.
		QueryTemplate().
		QueryBlocks().
		All(ctx)

	if err != nil {
		return nil, nil, err
	}

	blocks := make(map[int]model.BaseBlock)

	if templateBlocks != nil {
		for _, templateBlock := range templateBlocks {

			transformations := getTransformation(templateBlock)

			baseBlock := createBaseBlock(templateBlock, transformations, flowInstanceID)

			switch templateBlock.Type {
			case block.TypeStart:
				startBlock, err := createStartBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if startBlock != nil {
					blocks[templateBlock.ID] = *startBlock
				}
			case block.TypeEnd:
				endBlock, err := createEndBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if endBlock != nil {
					blocks[templateBlock.ID] = *endBlock
				}
			case block.TypeGoTo:
				gotoBlock, err := createGotoBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if gotoBlock != nil {
					blocks[templateBlock.ID] = *gotoBlock
				}
			case block.TypeChoice:
				choiceBlock, err := createChoiceBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if choiceBlock != nil {
					blocks[templateBlock.ID] = *choiceBlock
				}
			case block.TypeExecuteFlow:
				executeFlowBlock, err := createExecuteFlowBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if executeFlowBlock != nil {
					blocks[templateBlock.ID] = *executeFlowBlock
				}
			case block.TypeForEach:
				forEachBlock, err := createForEachBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if forEachBlock != nil {
					blocks[templateBlock.ID] = *forEachBlock
				}
			case block.TypeInvokeRestAPI:
				invokeBlock, err := createInvokeRestAPIBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if invokeBlock != nil {
					blocks[templateBlock.ID] = *invokeBlock
				}
			case block.TypeKafka:
				kafkaBlock, err := createKafkaBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if kafkaBlock != nil {
					blocks[templateBlock.ID] = *kafkaBlock
				}
			case block.TypeParallel:
				parallelBlock, err := createParallelBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if parallelBlock != nil {
					blocks[templateBlock.ID] = *parallelBlock
				}
			case block.TypeTimer:
				timerBlock, err := createTimerBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if timerBlock != nil {
					blocks[templateBlock.ID] = *timerBlock
				}
			case block.TypeWaitForSignal:
				waitForSignalBlock, err := createWaitForSignalBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if waitForSignalBlock != nil {
					blocks[templateBlock.ID] = *waitForSignalBlock
				}
			}
		}
	}
	return input, blocks, nil
}

func getTransformation(block *ent.Block) model.BlockTransformations {

	transformations := model.BlockTransformations{}

	if block.EnableInputTransformation != nil && *block.EnableInputTransformation {
		if value := block.InputTransformation; value != nil && *value != "" {
			if strategy := block.InputTransfStrategy; strategy != nil {
				transformations.Input = &model.BlockTransformationValue{
					Key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "IN"),
						AstValue: *value,
					},
					Strategy: *strategy,
				}
			}
		}
	}

	if block.EnableInputStateTransformation != nil && *block.EnableInputStateTransformation {
		if value := block.InputStateTransformation; value != nil && *value != "" {
			if strategy := block.InputStateTransfStrategy; strategy != nil {
				transformations.InputState = &model.BlockTransformationValue{
					Key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "IS"),
						AstValue: *value,
					},
					Strategy: *strategy,
				}
			}
		}
	}

	if block.EnableOutputTransformation != nil && *block.EnableOutputTransformation {
		if value := block.OutputTransformation; value != nil && *value != "" {
			if strategy := block.OutputTransfStrategy; strategy != nil {
				transformations.Output = &model.BlockTransformationValue{
					Key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "OU"),
						AstValue: *value,
					},
					Strategy: *strategy,
				}
			}
		}
	}

	if block.EnableOutputStateTransformation != nil && *block.EnableOutputStateTransformation {
		if value := block.OutputStateTransformation; value != nil && *value != "" {
			if strategy := block.InputTransfStrategy; strategy != nil {
				transformations.OutputState = &model.BlockTransformationValue{
					Key: celgo.AstKey{
						Key:      fmt.Sprintf("%d-%s", block.ID, "OS"),
						AstValue: *value,
					},
					Strategy: *strategy,
				}
			}
		}
	}

	return transformations
}

func createBaseBlock(
	templateBlock *ent.Block, transformations model.BlockTransformations, flowInstanceID int,
) model.BaseBlock {

	var maxAttempts, backOffRate, retryInterval int

	if templateBlock.MaxAttemps != nil {
		maxAttempts = *templateBlock.MaxAttemps
	}

	if templateBlock.BackOffRate != nil {
		backOffRate = *templateBlock.BackOffRate
	}

	var input, inputState, output, outputState bool
	var errorHandling, retryPolicy bool

	if templateBlock.EnableInputTransformation != nil {
		input = *templateBlock.EnableInputTransformation
	}

	if templateBlock.EnableInputStateTransformation != nil {
		inputState = *templateBlock.EnableInputStateTransformation
	}

	if templateBlock.EnableOutputTransformation != nil {
		output = *templateBlock.EnableOutputTransformation
	}

	if templateBlock.EnableOutputStateTransformation != nil {
		outputState = *templateBlock.EnableOutputStateTransformation
	}

	if templateBlock.EnableErrorHandling != nil {
		errorHandling = *templateBlock.EnableErrorHandling
	}

	if templateBlock.EnableRetryPolicy != nil {
		retryPolicy = *templateBlock.EnableRetryPolicy
	}

	if templateBlock.RetryInterval != nil {
		retryInterval = *templateBlock.RetryInterval
	}

	return model.BaseBlock{
		BlockType:                 templateBlock.Type,
		BlockID:                   templateBlock.ID,
		FlowInstanceID:            flowInstanceID,
		MaxAttempts:               maxAttempts,
		BackOffRate:               backOffRate,
		InputTransformation:       input,
		InputStateTransformation:  inputState,
		OutputTransformation:      output,
		OutputStateTransformation: outputState,
		ErrorHandling:             errorHandling,
		RetryPolicy:               retryPolicy,
		RetryInterval:             retryInterval,
		RetryUnit:                 templateBlock.RetryUnit,
		Transformations:           transformations,
	}
}

func getNextBlock(ctx context.Context, block *ent.Block, baseBlock model.BaseBlock) (model.BaseBlock, error) {
	nextBlockID, err := block.QueryExitPoints().
		QueryNextEntryPoints().
		QueryParentBlock().
		FirstID(ctx)

	if ent.IsNotFound(err) {
		err = nil
	}

	baseBlock.NextBlock = nextBlockID

	return baseBlock, err
}

func createStartBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	baseBlock.Start = &model.StartBlock{}

	return &baseBlock, nil
}

func createEndBlock(_ context.Context, _ *ent.Block, baseBlock model.BaseBlock) (*model.BaseBlock, error) {
	baseBlock.End = &model.EndBlock{}
	return &baseBlock, nil
}

func createGotoBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	baseBlock.Goto = &model.GotoBlock{}

	return &baseBlock, nil
}

func createChoiceBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	exitPoints, err := templateBlock.QueryExitPoints().All(ctx)
	if err != nil {
		return nil, err
	}

	var nextBlock int

	choiceRules := make([]model.ChoiceRule, 0)
	for _, exitPoint := range exitPoints {
		ruleNextBlockID, _ := exitPoint.QueryNextEntryPoints().QueryParentBlock().FirstID(ctx)

		if exitPoint.Index == 0 {
			nextBlock = ruleNextBlockID
		} else {
			choiceRule := model.ChoiceRule{
				BlockID:   ruleNextBlockID,
				Condition: exitPoint.Condition.Expression,
				Index:     exitPoint.Index,
			}

			choiceRules = append(choiceRules, choiceRule)
		}
	}

	baseBlock.NextBlock = nextBlock
	baseBlock.Choice = &model.ChoiceBlock{ChoiceRules: choiceRules}

	return &baseBlock, nil
}

func createExecuteFlowBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	flow, err := templateBlock.Flow(ctx)
	if err != nil {
		return nil, err
	}

	var flowID int
	if flow != nil {
		flowID = flow.ID
	}

	baseBlock.ExecuteFlow = &model.ExecuteFlowBlock{FlowID: flowID}

	return &baseBlock, nil
}

func createForEachBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	var forEachKey string
	if templateBlock.ForeachKey != nil {
		forEachKey = *templateBlock.ForeachKey
	}

	var startBlockID int
	if templateBlock.ForeachStartBlockID != nil {
		startBlockID = *templateBlock.ForeachStartBlockID
	}

	baseBlock.ForEach = &model.ForEachBlock{StartBlockID: startBlockID, Key: forEachKey}

	return &baseBlock, nil
}

func createInvokeRestAPIBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	var method block.URLMethod
	var url, body string
	var connectionTimeout int

	headers := make(map[string]string)

	if templateBlock.URL != nil {
		url = *templateBlock.URL
	}

	if templateBlock.Body != nil {
		body = *templateBlock.Body
	}

	if templateBlock.URLMethod != nil {
		method = *templateBlock.URLMethod
	}

	if templateBlock.ConnectionTimeout != nil {
		connectionTimeout = *templateBlock.ConnectionTimeout
	}

	if templateBlock.Headers != nil {
		for _, header := range templateBlock.Headers {
			if header != nil {
				headers[header.VariableDefinitionKey] = header.Value
			}
		}
	}

	baseBlock.InvokeRestAPI = &model.InvokeRestAPIBlock{
		Timeout: connectionTimeout,
		Url:     url,
		Body:    body,
		Method:  method,
		Headers: headers,
	}

	return &baseBlock, nil
}

func createKafkaBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	baseBlock.Kafka = &model.KafkaBlock{
		Topic:       templateBlock.KafkaTopic,
		Expression:  templateBlock.KafkaMessage,
		Brokers:     templateBlock.KafkaBrokers,
		MessageType: templateBlock.KafkaMessageType,
	}

	return &baseBlock, nil
}

func createParallelBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	var forEachKey string
	if templateBlock.ForeachKey != nil {
		forEachKey = *templateBlock.ForeachKey
	}

	var startBlockID int
	if templateBlock.ForeachStartBlockID != nil {
		startBlockID = *templateBlock.ForeachStartBlockID
	}

	baseBlock.Parallel = &model.ParallelBlock{StartBlockID: startBlockID, Key: forEachKey}

	return &baseBlock, nil
}

func createTimerBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	var seconds int
	var expression string
	var enableExpression bool
	var specificDate time.Time
	var behavior block.TimerBehavior

	if templateBlock.TimerBehavior != nil {
		behavior = *templateBlock.TimerBehavior
	}

	if templateBlock.Seconds != nil {
		seconds = *templateBlock.Seconds
	}

	if templateBlock.TimerSpecificDate != nil {
		specificDate = *templateBlock.TimerSpecificDate
	}

	if templateBlock.EnableTimerExpression != nil {
		enableExpression = *templateBlock.EnableTimerExpression
	}

	if templateBlock.TimerExpression != nil {
		expression = *templateBlock.TimerExpression
	}

	baseBlock.Timer = &model.TimerBlock{
		Behavior:         behavior,
		Seconds:          seconds,
		EnableExpression: enableExpression,
		Expression:       expression,
		SpecificDate:     specificDate,
	}

	return &baseBlock, nil
}

func createWaitForSignalBlock(
	ctx context.Context, templateBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.BaseBlock, error) {

	baseBlock, err := getNextBlock(ctx, templateBlock, baseBlock)
	if err != nil {
		return nil, err
	}

	baseBlock.WaitForSignal = &model.WaitForSignalBlock{
		Blocked:      templateBlock.BlockFlow,
		CustomFilter: templateBlock.CustomFilter,
		SignalType:   templateBlock.SignalType,
		SignalModule: templateBlock.SignalModule,
	}

	return &baseBlock, nil
}
