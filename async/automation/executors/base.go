package executors

import (
	"encoding/json"
	"errors"
	jsonPatch "github.com/evanphx/json-patch"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/model"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"go.uber.org/cadence/workflow"
)

var configNotFound = errors.New("object configuration not found")

type ExecutorResult struct {
	Output    map[string]interface{}
	State     map[string]interface{}
	NextBlock int
}

type ExecutorBlock interface {
	Execute() (*ExecutorResult, error)
}

type ExecutorStartBlock struct {
	executorBaseBlock
}

type ExecutorEndBlock struct {
	executorBaseBlock
}

type ExecutorGotoBlock struct {
	executorBaseBlock
}

type executorBaseBlock struct {
	Ctx                  workflow.Context
	executorBlock        model.BaseBlock
	input                map[string]interface{}
	output               map[string]interface{}
	state                map[string]interface{}
	updateStatusFunction func(int, blockinstance.Status, bool, map[string]interface{}, string) error
	runLogicFunction     func() error
}

func (b *executorBaseBlock) updateBlockInProgress() {
	b.updateBlockInstanceStatus(blockinstance.StatusInProgress, false, "")
}

func (b *executorBaseBlock) updateBlockWaiting() {
	b.updateBlockInstanceStatus(blockinstance.StatusWaiting, false, "")
}

func (b *executorBaseBlock) updateBlockFailed(failureReason string) {
	b.updateBlockInstanceStatus(blockinstance.StatusFailed, true, failureReason)
}

func (b *executorBaseBlock) updateBlockCompleted() {
	b.updateBlockInstanceStatus(blockinstance.StatusCompleted, true, "")
}

func (b *executorBaseBlock) updateBlockInstanceStatus(
	status blockinstance.Status, close bool, failureReason string,
) {
	if b.updateStatusFunction != nil {
		_ = b.updateStatusFunction(b.executorBlock.GetBlockInstanceID(), status, close, b.output, failureReason)
	}
}

func (b *executorBaseBlock) Execute() (*ExecutorResult, error) {
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
		Output:    b.output,
		State:     b.state,
		NextBlock: b.executorBlock.GetNextBlockID(),
	}

	b.updateBlockCompleted()
	return &blockResult, nil
}

func (b *executorBaseBlock) runLogic() error {
	b.output = b.input
	return nil
}

func (b *executorBaseBlock) executeInputTransformation() error {
	block := b.executorBlock
	transformations := block.GetTransformations()

	if block.GetInputTransformation() && transformations.Input != nil {
		value, err := b.valueTransformation(b.input, *transformations.Input)
		if err != nil {
			return err
		}
		b.input = value
	}

	if block.GetInputStateTransformation() && transformations.InputState != nil {
		state, err := b.stateTransformation(b.input, *transformations.InputState)
		if err != nil {
			return err
		}
		b.state = state
	}

	return nil
}

func (b *executorBaseBlock) executeOutputTransformation() error {
	block := b.executorBlock
	transformations := block.GetTransformations()

	if block.GetOutputTransformation() && transformations.Output != nil {
		output, err := b.valueTransformation(b.output, *transformations.Output)
		if err != nil {
			return err
		}
		b.output = output
	}

	if block.GetOutputStateTransformation() && transformations.OutputState != nil {
		state, err := b.stateTransformation(b.output, *transformations.OutputState)
		if err != nil {
			return err
		}
		b.state = state
	}

	return nil
}

func (b *executorBaseBlock) valueTransformation(value map[string]interface{},
	transformation model.BlockTransformationValue) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, transformation.Key)
	if err != nil {
		return nil, err
	}

	return b.transformation(value, result, transformation.Strategy)
}

func (b *executorBaseBlock) stateTransformation(value map[string]interface{},
	transformation model.BlockTransformationValue) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, transformation.Key)
	if err != nil {
		return nil, err
	}

	return b.transformation(b.state, result, transformation.Strategy)
}

func (b *executorBaseBlock) dataTransformation(value map[string]interface{},
	key celgo.AstKey) (map[string]interface{}, error) {

	return b.evaluateTransformation(value, b.state, key)
}

func (b *executorBaseBlock) evaluateTransformation(input, state map[string]interface{},
	key celgo.AstKey) (map[string]interface{}, error) {

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

func (b *executorBaseBlock) transformation(original, target map[string]interface{},
	strategy enum.TransfStrategy) (map[string]interface{}, error) {

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

	mergePatch, err := jsonPatch.CreateMergePatch(originalJson, targetJson)
	if err != nil {
		panic(err)
	}

	modified, err := jsonPatch.MergePatch(originalJson, mergePatch)
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
