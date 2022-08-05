package activity

import (
	"context"
	"github.com/facebookincubator/symphony/automation/executors"
)

func StartActivity(
	_ context.Context, block *executors.ExecutorStartBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}

func EndActivity(
	_ context.Context, block *executors.ExecutorEndBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}

func GotoActivity(
	_ context.Context, block *executors.ExecutorGotoBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}

func ChoiceActivity(
	_ context.Context, block *executors.ExecutorChoiceBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}

func InvokeRestAPIActivity(
	_ context.Context, block *executors.ExecutorInvokeRestAPIBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}

func PublishKafkaActivity(
	_ context.Context, block *executors.ExecutorKafkaBlock,
) (*executors.ExecutorResult, error) {
	return block.Execute()
}
