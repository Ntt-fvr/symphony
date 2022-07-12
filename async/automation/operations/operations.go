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

func CreateBlockInstance(
	ctx context.Context, flowInstanceID int, blockID int, input map[string]interface{},
) (int, error) {

	inputJson, err := util.ToJson(input)
	if err != nil {
		return 0, err
	}

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
	ctx context.Context, blockInstanceID int, status blockinstance.Status,
	close bool, output map[string]interface{}, failureReason string,
) error {

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

func UpdateFlowInstance(
	ctx context.Context, flowInstanceID int, workflowID string, runID string,
) error {

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

func UpdateFlowInstanceStatus(
	ctx context.Context, flowInstanceID int, status flowinstance.Status, close bool,
) error {

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

func GetInputAndBlocks(
	ctx context.Context, flowInstanceID int,
) (map[string]interface{}, map[int]model.IBlock, error) {

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

	blocks := make(map[int]model.IBlock)

	if templateBlocks != nil {
		for _, templateBlock := range templateBlocks {

			transformations := getTransformation(templateBlock)

			baseBlock := getBaseBlock(templateBlock, transformations, flowInstanceID)

			switch templateBlock.Type {
			case block.TypeStart:
				startBlock, err := getStartBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if startBlock != nil {
					blocks[templateBlock.ID] = startBlock
				}
			case block.TypeEnd:
				endBlock, err := getEndBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if endBlock != nil {
					blocks[templateBlock.ID] = endBlock
				}
			case block.TypeGoTo:
				gotoBlock, err := getGotoBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if gotoBlock != nil {
					blocks[templateBlock.ID] = gotoBlock
				}
			case block.TypeChoice:
				choiceBlock, err := getChoiceBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if choiceBlock != nil {
					blocks[templateBlock.ID] = choiceBlock
				}
			case block.TypeExecuteFlow:
				executeFlowBlock, err := getExecuteFlowBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if executeFlowBlock != nil {
					blocks[templateBlock.ID] = executeFlowBlock
				}
			case block.TypeForEach:
				forEachBlock, err := getForEachBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if forEachBlock != nil {
					blocks[templateBlock.ID] = forEachBlock
				}
			case block.TypeInvokeRestAPI:
				invokeBlock, err := getInvokeBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if invokeBlock != nil {
					blocks[templateBlock.ID] = invokeBlock
				}
			case block.TypeKafka:
				kafkaBlock, err := getKafkaBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if kafkaBlock != nil {
					blocks[templateBlock.ID] = kafkaBlock
				}
			case block.TypeParallel:
				parallelBlock, err := getParallelBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if parallelBlock != nil {
					blocks[templateBlock.ID] = parallelBlock
				}
			case block.TypeTimer:
				timerBlock, err := getTimerBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if timerBlock != nil {
					blocks[templateBlock.ID] = timerBlock
				}
			case block.TypeWaitForSignal:
				waitForSignalBlock, err := getWaitForSignalBlock(ctx, templateBlock, baseBlock)
				if err != nil {
					return nil, nil, err
				}

				if waitForSignalBlock != nil {
					blocks[templateBlock.ID] = waitForSignalBlock
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

func getBaseBlock(
	baseBlock *ent.Block, transformations model.BlockTransformations, flowInstanceID int,
) model.BaseBlock {

	var maxAttempts, backOffRate, retryInterval int

	if baseBlock.MaxAttemps != nil {
		maxAttempts = *baseBlock.MaxAttemps
	}

	if baseBlock.BackOffRate != nil {
		backOffRate = *baseBlock.BackOffRate
	}

	var input, inputState, output, outputState bool
	var errorHandling, retryPolicy bool

	if baseBlock.EnableInputTransformation != nil {
		input = *baseBlock.EnableInputTransformation
	}

	if baseBlock.EnableInputStateTransformation != nil {
		inputState = *baseBlock.EnableInputStateTransformation
	}

	if baseBlock.EnableOutputTransformation != nil {
		output = *baseBlock.EnableOutputTransformation
	}

	if baseBlock.EnableOutputStateTransformation != nil {
		outputState = *baseBlock.EnableOutputStateTransformation
	}

	if baseBlock.EnableErrorHandling != nil {
		errorHandling = *baseBlock.EnableErrorHandling
	}

	if baseBlock.EnableRetryPolicy != nil {
		retryPolicy = *baseBlock.EnableRetryPolicy
	}

	if baseBlock.RetryInterval != nil {
		retryInterval = *baseBlock.RetryInterval
	}

	return model.BaseBlock{
		BlockType:                 baseBlock.Type,
		BlockID:                   baseBlock.ID,
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
		RetryUnit:                 baseBlock.RetryUnit,
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

func getStartBlock(ctx context.Context, startBlock *ent.Block, baseBlock model.BaseBlock) (*model.StartBlock, error) {
	baseBlock, err := getNextBlock(ctx, startBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	return &model.StartBlock{BaseBlock: baseBlock}, nil
}

func getEndBlock(_ context.Context, _ *ent.Block, baseBlock model.BaseBlock) (*model.EndBlock, error) {
	return &model.EndBlock{BaseBlock: baseBlock}, nil
}

func getGotoBlock(ctx context.Context, goToBlock *ent.Block, baseBlock model.BaseBlock) (*model.GotoBlock, error) {
	baseBlock, err := getNextBlock(ctx, goToBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	return &model.GotoBlock{BaseBlock: baseBlock}, nil
}

func getChoiceBlock(
	ctx context.Context, choiceBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.ChoiceBlock, error) {
	exitPoints, err := choiceBlock.QueryExitPoints().All(ctx)
	if err != nil {
		return nil, err
	}

	var nextBlock int

	choiceRules := make([]model.ChoiceRule, 0)
	for _, exitPoint := range exitPoints {
		ruleNextBlockID, _ := exitPoint.QueryNextEntryPoints().QueryParentBlock().FirstID(ctx)

		choiceRule := model.ChoiceRule{
			BlockID:   ruleNextBlockID,
			Condition: exitPoint.Condition.Expression,
			// TODO Order
		}

		// TODO Default Next Block

		choiceRules = append(choiceRules, choiceRule)
	}

	baseBlock.NextBlock = nextBlock

	return &model.ChoiceBlock{BaseBlock: baseBlock, ChoiceRules: choiceRules}, nil
}

func getExecuteFlowBlock(
	ctx context.Context, executeFlowBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.ExecuteFlowBlock, error) {

	baseBlock, err := getNextBlock(ctx, executeFlowBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	flow, err := executeFlowBlock.Flow(ctx)
	if err != nil {
		return nil, err
	}

	var flowID int
	if flow != nil {
		flowID = flow.ID
	}

	return &model.ExecuteFlowBlock{BaseBlock: baseBlock, FlowID: flowID}, nil
}

func getForEachBlock(
	ctx context.Context, forEachBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.ForEachBlock, error) {

	baseBlock, err := getNextBlock(ctx, forEachBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	var forEachKey string
	if forEachBlock.ForeachKey != nil {
		forEachKey = *forEachBlock.ForeachKey
	}

	var startBlockID int
	if forEachBlock.ForeachStartBlockID != nil {
		startBlockID = *forEachBlock.ForeachStartBlockID
	}

	return &model.ForEachBlock{BaseBlock: baseBlock, StartBlockID: startBlockID, Key: forEachKey}, nil
}

func getInvokeBlock(
	ctx context.Context, invokeBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.InvokeRestAPIBlock, error) {

	baseBlock, err := getNextBlock(ctx, invokeBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	var method block.URLMethod
	var url, body string
	var connectionTimeout int

	headers := make(map[string]string)

	if invokeBlock.URL != nil {
		url = *invokeBlock.URL
	}

	if invokeBlock.Body != nil {
		body = *invokeBlock.Body
	}

	if invokeBlock.URLMethod != nil {
		method = *invokeBlock.URLMethod
	}

	if invokeBlock.ConnectionTimeout != nil {
		connectionTimeout = *invokeBlock.ConnectionTimeout
	}

	if invokeBlock.Headers != nil {
		for _, header := range invokeBlock.Headers {
			if header != nil {
				headers[header.VariableDefinitionKey] = header.Value
			}
		}
	}

	return &model.InvokeRestAPIBlock{
		BaseBlock: baseBlock,
		Timeout:   connectionTimeout,
		Url:       url,
		Body:      body,
		Method:    method,
		Headers:   headers,
	}, nil
}

func getKafkaBlock(
	ctx context.Context, kafkaBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.KafkaBlock, error) {

	baseBlock, err := getNextBlock(ctx, kafkaBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	return &model.KafkaBlock{
		BaseBlock:   baseBlock,
		Topic:       kafkaBlock.KafkaTopic,
		Expression:  kafkaBlock.KafkaMessage,
		Brokers:     kafkaBlock.KafkaBrokers,
		MessageType: kafkaBlock.KafkaMessageType,
	}, nil
}

func getParallelBlock(
	ctx context.Context, parallelBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.ParallelBlock, error) {

	baseBlock, err := getNextBlock(ctx, parallelBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	var forEachKey string
	if parallelBlock.ForeachKey != nil {
		forEachKey = *parallelBlock.ForeachKey
	}

	var startBlockID int
	if parallelBlock.ForeachStartBlockID != nil {
		startBlockID = *parallelBlock.ForeachStartBlockID
	}

	return &model.ParallelBlock{BaseBlock: baseBlock, StartBlockID: startBlockID, Key: forEachKey}, nil
}

func getTimerBlock(
	ctx context.Context, timerBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.TimerBlock, error) {

	baseBlock, err := getNextBlock(ctx, timerBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	var seconds int
	var expression string
	var enableExpression bool
	var specificDate time.Time
	var behavior block.TimerBehavior

	if timerBlock.TimerBehavior != nil {
		behavior = *timerBlock.TimerBehavior
	}

	if timerBlock.Seconds != nil {
		seconds = *timerBlock.Seconds
	}

	if timerBlock.TimerSpecificDate != nil {
		specificDate = *timerBlock.TimerSpecificDate
	}

	if timerBlock.EnableTimerExpression != nil {
		enableExpression = *timerBlock.EnableTimerExpression
	}

	if timerBlock.TimerExpression != nil {
		expression = *timerBlock.TimerExpression
	}

	return &model.TimerBlock{
		BaseBlock:        baseBlock,
		Behavior:         behavior,
		Seconds:          seconds,
		EnableExpression: enableExpression,
		Expression:       expression,
		SpecificDate:     specificDate,
	}, nil
}

func getWaitForSignalBlock(
	ctx context.Context, signalBlock *ent.Block, baseBlock model.BaseBlock,
) (*model.WaitForSignalBlock, error) {

	baseBlock, err := getNextBlock(ctx, signalBlock, baseBlock)

	if err != nil {
		return nil, err
	}

	return &model.WaitForSignalBlock{
		BaseBlock:    baseBlock,
		Blocked:      signalBlock.BlockFlow,
		CustomFilter: signalBlock.CustomFilter,
		SignalType:   signalBlock.SignalType,
		SignalModule: signalBlock.SignalModule,
	}, nil
}
