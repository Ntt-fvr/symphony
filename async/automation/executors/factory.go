package executors

import (
	"context"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"go.uber.org/cadence/workflow"
)

func GetBlockInstances(
	ctx workflow.Context, entCtx context.Context,
	block interface{}, input, state map[string]interface{},
	updateStatusFunction func(context.Context, int, blockinstance.Status, bool, map[string]interface{}, string) error,
) ExecutorBlock {

	var executorBlock ExecutorBlock

	baseBlock := getBaseBlock(ctx, entCtx, input, state, updateStatusFunction)

	switch block.(type) {
	case model.StartBlock:
		startBlock := block.(model.StartBlock)
		baseBlock.iBlock = &startBlock

		executorBlock = &ExecutorStartBlock{
			executorBaseBlock: baseBlock,
		}
	case model.EndBlock:
		executorBlock = &ExecutorEndBlock{
			executorBaseBlock: baseBlock,
		}
	case model.GotoBlock:
		gotoBlock := block.(model.GotoBlock)
		baseBlock.iBlock = &gotoBlock

		executorBlock = &ExecutorGotoBlock{
			executorBaseBlock: baseBlock,
		}
	case model.ChoiceBlock:
		choiceBlock := block.(model.ChoiceBlock)
		baseBlock.iBlock = &choiceBlock

		executorChoiceBlock := ExecutorChoiceBlock{
			executorBaseBlock: baseBlock,
		}
		executorChoiceBlock.runLogicFunction = executorChoiceBlock.runLogic

		executorBlock = &executorChoiceBlock
	case model.ExecuteFlowBlock:
		executeFlowBlock := block.(model.ExecuteFlowBlock)
		baseBlock.iBlock = &executeFlowBlock

		executorExecuteFlowBlock := ExecutorExecuteFlowBlock{
			executorBaseBlock: baseBlock,
		}
		executorExecuteFlowBlock.runLogicFunction = executorExecuteFlowBlock.runLogic

		executorBlock = &executorExecuteFlowBlock
	case model.ForEachBlock:
		forEachBlock := block.(model.ForEachBlock)
		baseBlock.iBlock = &forEachBlock

		executorForEachBlock := ExecutorForEachBlock{
			executorBaseBlock: baseBlock,
		}
		executorForEachBlock.runLogicFunction = executorForEachBlock.runLogic

		executorBlock = &executorForEachBlock
	case model.InvokeRestAPIBlock:
		invokeBlock := block.(model.InvokeRestAPIBlock)
		baseBlock.iBlock = &invokeBlock

		executorInvokeBlock := ExecutorInvokeRestAPIBlock{
			executorBaseBlock: baseBlock,
		}
		executorInvokeBlock.runLogicFunction = executorInvokeBlock.runLogic

		executorBlock = &executorInvokeBlock
	case model.KafkaBlock:
		kafkaBlock := block.(model.KafkaBlock)
		baseBlock.iBlock = &kafkaBlock

		executorKafkaBlock := ExecutorKafkaBlock{
			executorBaseBlock: baseBlock,
		}
		executorKafkaBlock.runLogicFunction = executorKafkaBlock.runLogic

		executorBlock = &executorKafkaBlock
	case model.ParallelBlock:
		executorBlock = &ExecutorParallelBlock{
			executorBaseBlock: baseBlock,
		}
	case model.TimerBlock:
		timerBlock := block.(model.TimerBlock)
		baseBlock.iBlock = &timerBlock

		executorTimerBlock := ExecutorTimerBlock{
			executorBaseBlock: baseBlock,
		}
		executorTimerBlock.runLogicFunction = executorTimerBlock.runLogic

		executorBlock = &executorTimerBlock
	case model.WaitForSignalBlock:
		executorBlock = &ExecutorWaitForSignalBlock{
			executorBaseBlock: baseBlock,
		}
	}

	return executorBlock
}

func getBaseBlock(
	ctx workflow.Context, entCtx context.Context, input, state map[string]interface{},
	updateStatusFunction func(context.Context, int, blockinstance.Status, bool, map[string]interface{}, string) error,
) executorBaseBlock {

	return executorBaseBlock{
		EntCtx:               entCtx,
		WorkflowCtx:          ctx,
		input:                input,
		state:                state,
		updateStatusFunction: updateStatusFunction,
	}
}
