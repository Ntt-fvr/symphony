package executors

import (
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"go.uber.org/cadence/workflow"
)

func GetBlockInstances(
	ctx workflow.Context, baseBlock model.BaseBlock, input, state map[string]interface{},
	updateStatusFunction func(int, blockinstance.Status, bool, map[string]interface{}, string) error,
) ExecutorBlock {

	var executorBlock ExecutorBlock

	executorBase := createExecutorBase(ctx, baseBlock, input, state, updateStatusFunction)

	switch baseBlock.BlockType {
	case block.TypeStart:
		executorStartBlock := ExecutorStartBlock{
			executorBaseBlock: executorBase,
		}
		executorStartBlock.runLogicFunction = executorStartBlock.runLogic

		executorBlock = &executorStartBlock
	case block.TypeEnd:
		executorEndBlock := ExecutorEndBlock{
			executorBaseBlock: executorBase,
		}
		executorEndBlock.runLogicFunction = executorEndBlock.runLogic

		executorBlock = &executorEndBlock
	case block.TypeGoTo:
		executorGotoBlock := ExecutorGotoBlock{
			executorBaseBlock: executorBase,
		}
		executorGotoBlock.runLogicFunction = executorGotoBlock.runLogic

		executorBlock = &executorGotoBlock
	case block.TypeChoice:
		executorChoiceBlock := ExecutorChoiceBlock{
			executorBaseBlock: executorBase,
		}
		executorChoiceBlock.runLogicFunction = executorChoiceBlock.runLogic

		executorBlock = &executorChoiceBlock
	case block.TypeExecuteFlow:
		executorExecuteFlowBlock := ExecutorExecuteFlowBlock{
			executorBaseBlock: executorBase,
		}
		executorExecuteFlowBlock.runLogicFunction = executorExecuteFlowBlock.runLogic

		executorBlock = &executorExecuteFlowBlock
	case block.TypeForEach:
		executorForEachBlock := ExecutorForEachBlock{
			executorBaseBlock: executorBase,
		}
		executorForEachBlock.runLogicFunction = executorForEachBlock.runLogic

		executorBlock = &executorForEachBlock
	case block.TypeInvokeRestAPI:
		executorInvokeBlock := ExecutorInvokeRestAPIBlock{
			executorBaseBlock: executorBase,
		}
		executorInvokeBlock.runLogicFunction = executorInvokeBlock.runLogic

		executorBlock = &executorInvokeBlock
	case block.TypeKafka:
		executorKafkaBlock := ExecutorKafkaBlock{
			executorBaseBlock: executorBase,
		}
		executorKafkaBlock.runLogicFunction = executorKafkaBlock.runLogic

		executorBlock = &executorKafkaBlock
	case block.TypeParallel:
		executorParallelBlock := ExecutorParallelBlock{
			executorBaseBlock: executorBase,
		}
		executorParallelBlock.runLogicFunction = executorParallelBlock.runLogic

		executorBlock = &executorParallelBlock
	case block.TypeTimer:
		executorTimerBlock := ExecutorTimerBlock{
			executorBaseBlock: executorBase,
		}
		executorTimerBlock.runLogicFunction = executorTimerBlock.runLogic

		executorBlock = &executorTimerBlock
	case block.TypeWaitForSignal:
		executorWaitForSignalBlock := ExecutorWaitForSignalBlock{
			executorBaseBlock: executorBase,
		}
		executorWaitForSignalBlock.runLogicFunction = executorWaitForSignalBlock.runLogic

		executorBlock = &executorWaitForSignalBlock
	}

	return executorBlock
}

func createExecutorBase(
	ctx workflow.Context, baseBlock model.BaseBlock, input, state map[string]interface{},
	updateStatusFunction func(int, blockinstance.Status, bool, map[string]interface{}, string) error,
) executorBaseBlock {

	return executorBaseBlock{
		Ctx:                  ctx,
		executorBlock:        baseBlock,
		input:                input,
		state:                state,
		updateStatusFunction: updateStatusFunction,
	}
}
