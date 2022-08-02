package executors

import (
	"context"
	"encoding/json"
	jsonPatch "github.com/evanphx/json-patch"
	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/enum"
	"go.uber.org/cadence/workflow"
)

type BlockTransformationValue struct {
	Enabled  bool
	Key      celgo.AstKey
	Strategy enum.TransfStrategy
}

type BlockTransformations struct {
	Input       BlockTransformationValue
	InputState  BlockTransformationValue
	Output      BlockTransformationValue
	OutputState BlockTransformationValue
}

type ExecutorResult struct {
	Output    map[string]interface{}
	State     map[string]interface{}
	NextBlock string
}

type ExecutorBlock interface {
	SetWorkflowContext(workflow.Context)
	GetBlockType() enum.BlockType
	Execute() (*ExecutorResult, error)
	GetFlowInstanceID() string
	GetBlockID() string
	GetBlockInstanceID() string
	SetBlockInstanceID(string)
	AddAttempts()
	GetAttempts() int
	GetMaxAttempts() int
	SetInput(map[string]interface{})
	SetState(map[string]interface{})
	runLogic() error
}

type ExecutorBaseBlock struct {
	ctx              workflow.Context
	graphCtx         context.Context
	runLogicFunction func() error
	Type             enum.BlockType
	Tenant           string
	BlockID          string
	FlowInstanceID   string
	BlockInstanceID  string
	NextBlockID      string
	Attempts         int
	MaxAttempts      int
	BackOffRate      int
	ErrorHandling    bool
	RetryPolicy      bool
	RetryInterval    int
	RetryUnit        enum.RetryUnit
	Transformations  BlockTransformations
	Input            map[string]interface{}
	Output           map[string]interface{}
	State            map[string]interface{}
}

func (b *ExecutorBaseBlock) SetWorkflowContext(ctx workflow.Context) {
	b.ctx = ctx
}

func (b *ExecutorBaseBlock) SetInput(input map[string]interface{}) {
	b.Input = input
}

func (b *ExecutorBaseBlock) SetState(state map[string]interface{}) {
	b.State = state
}

func (b *ExecutorBaseBlock) GetBlockType() enum.BlockType {
	return b.Type
}

func (b *ExecutorBaseBlock) GetFlowInstanceID() string {
	return b.FlowInstanceID
}

func (b *ExecutorBaseBlock) GetBlockID() string {
	return b.BlockID
}

func (b *ExecutorBaseBlock) GetBlockInstanceID() string {
	return b.BlockInstanceID
}

func (b *ExecutorBaseBlock) SetBlockInstanceID(blockInstanceID string) {
	b.BlockInstanceID = blockInstanceID
}

func (b *ExecutorBaseBlock) AddAttempts() {
	b.Attempts++
}

func (b *ExecutorBaseBlock) GetAttempts() int {
	return b.Attempts
}

func (b *ExecutorBaseBlock) GetMaxAttempts() int {
	return b.MaxAttempts
}

func (b *ExecutorBaseBlock) updateBlockInProgress() {
	b.updateBlockInstanceStatus(enum.BlockInstanceStatusInProgress, false, "")
}

func (b *ExecutorBaseBlock) updateBlockWaiting() {
	b.updateBlockInstanceStatus(enum.BlockInstanceStatusWaiting, false, "")
}

func (b *ExecutorBaseBlock) updateBlockFailed(failureReason string) {
	b.updateBlockInstanceStatus(enum.BlockInstanceStatusFailed, true, failureReason)
}

func (b *ExecutorBaseBlock) updateBlockCompleted() {
	b.updateBlockInstanceStatus(enum.BlockInstanceStatusCompleted, true, "")
}

func (b *ExecutorBaseBlock) updateBlockInstanceStatus(
	status enum.BlockInstanceStatus, close bool, failureReason string,
) {
	_ = UpdateBlockStatus(b.graphCtx, b.BlockInstanceID, status, close, b.Output, failureReason)
}

func (b *ExecutorBaseBlock) execute() (*ExecutorResult, error) {
	b.graphCtx = context.WithValue(context.Background(), enum.TenantArg, b.Tenant)

	b.updateBlockInProgress()

	err := b.executeInputTransformation()
	if err != nil {
		b.updateBlockFailed(err.Error())
		return nil, err
	}

	if b.runLogicFunction != nil {
		err = b.runLogicFunction()
	} else {
		err = b.runLogic()
	}

	if err != nil {
		b.updateBlockFailed(err.Error())
		return nil, err
	}

	err = b.executeOutputTransformation()
	if err != nil {
		b.updateBlockFailed(err.Error())
		return nil, err
	}

	blockResult := ExecutorResult{
		Output:    b.Output,
		State:     b.State,
		NextBlock: b.NextBlockID,
	}

	b.updateBlockCompleted()
	return &blockResult, nil
}

func (b *ExecutorBaseBlock) runLogic() error {
	b.Output = b.Input
	return nil
}

func (b *ExecutorBaseBlock) executeInputTransformation() error {
	transformations := b.Transformations

	if transformations.Input.Enabled {
		value, err := b.valueTransformation(
			b.Input, transformations.Input.Key, transformations.Input.Strategy,
		)
		if err != nil {
			return err
		}
		b.Input = value
	}

	if transformations.InputState.Enabled {
		state, err := b.stateTransformation(
			b.Input, transformations.InputState.Key, transformations.InputState.Strategy,
		)
		if err != nil {
			return err
		}
		b.State = state
	}

	return nil
}

func (b *ExecutorBaseBlock) executeOutputTransformation() error {
	transformations := b.Transformations

	if transformations.Output.Enabled {
		output, err := b.valueTransformation(
			b.Output, transformations.Output.Key, transformations.Output.Strategy,
		)
		if err != nil {
			return err
		}
		b.Output = output
	}

	if transformations.OutputState.Enabled {
		state, err := b.stateTransformation(
			b.Output, transformations.OutputState.Key, transformations.OutputState.Strategy,
		)
		if err != nil {
			return err
		}
		b.State = state
	}

	return nil
}

func (b *ExecutorBaseBlock) valueTransformation(
	value map[string]interface{}, key celgo.AstKey, strategy enum.TransfStrategy,
) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, key)
	if err != nil {
		return nil, err
	}

	return b.transformation(value, result, strategy)
}

func (b *ExecutorBaseBlock) stateTransformation(
	value map[string]interface{}, key celgo.AstKey, strategy enum.TransfStrategy,
) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, key)
	if err != nil {
		return nil, err
	}

	return b.transformation(b.State, result, strategy)
}

func (b *ExecutorBaseBlock) dataTransformation(
	value map[string]interface{}, key celgo.AstKey,
) (map[string]interface{}, error) {
	return b.evaluateTransformation(value, b.State, key)
}

func (b *ExecutorBaseBlock) evaluateTransformation(
	input, state map[string]interface{}, key celgo.AstKey,
) (map[string]interface{}, error) {

	inputVariable := celgo.ConvertToValue(input)
	stateVariable := celgo.ConvertToValue(state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	result, err := celgo.Evaluate(key, variables)
	if err != nil {
		return nil, err
	}

	return celgo.ConvertToNative(result)
}

func (b *ExecutorBaseBlock) transformation(
	original, target map[string]interface{}, strategy enum.TransfStrategy,
) (map[string]interface{}, error) {

	switch strategy {
	case enum.TransfStrategyReplace:
		return target, nil
	case enum.TransfStrategyMerge:
		return merge(original, target)
	}
	return original, nil
}

func merge(original, target map[string]interface{}) (map[string]interface{}, error) {
	originalJson, err := json.Marshal(original)
	if err != nil {
		return nil, err
	}

	targetJson, err := json.Marshal(target)
	if err != nil {
		return nil, err
	}

	modified, err := jsonPatch.MergePatch(originalJson, targetJson)
	if err != nil {
		panic(err)
	}

	var result map[string]interface{}
	err = json.Unmarshal(modified, &result)
	if err != nil {
		panic(err)
	}

	return result, nil
}
