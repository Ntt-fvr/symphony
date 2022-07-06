package blocks

import (
	"context"
	"encoding/json"
	jsonPatch "github.com/evanphx/json-patch"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"go.uber.org/cadence/workflow"
	"time"
)

type blockTransformationValue struct {
	key      celgo.AstKey
	strategy enum.TransfStrategy
}

type blockTransformations struct {
	input       *blockTransformationValue
	inputState  *blockTransformationValue
	output      *blockTransformationValue
	outputState *blockTransformationValue
}

type ExecutorBlock interface {
	evaluateTransformation(map[string]interface{}, map[string]interface{},
		celgo.AstKey) (map[string]interface{}, error)

	transformation(map[string]interface{}, map[string]interface{},
		enum.TransfStrategy) (map[string]interface{}, error)

	runLogic() error

	Execute() (*ExecutorResult, error)
}

type StartBlock struct {
	baseBlock
}

type EndBlock struct {
	baseBlock
}

type GotoBlock struct {
	baseBlock
}

type ExecutorResult struct {
	Output    map[string]interface{}
	State     map[string]interface{}
	NextBlock int
}

type baseBlock struct {
	appCtx                    context.Context
	workflowCtx               workflow.Context
	inputTransformation       bool
	inputStateTransformation  bool
	outputTransformation      bool
	outputStateTransformation bool
	input                     map[string]interface{}
	output                    map[string]interface{}
	state                     map[string]interface{}
	transformations           blockTransformations
	nextBlock                 int
	blockInstanceID           int

	blockStatusFunction func(context.Context, int, blockinstance.Status, *time.Time, map[string]interface{}) error
}

func (b *baseBlock) updateBlockInProgress() {
	b.updateBlockInstanceStatus(blockinstance.StatusInProgress, nil)
}

func (b *baseBlock) updateBlockWaiting() {
	b.updateBlockInstanceStatus(blockinstance.StatusWaiting, nil)
}

func (b *baseBlock) updateBlockFailed() {
	endDate := time.Now()
	b.updateBlockInstanceStatus(blockinstance.StatusFailed, &endDate)
}

func (b *baseBlock) updateBlockCompleted() {
	endDate := time.Now()
	b.updateBlockInstanceStatus(blockinstance.StatusCompleted, &endDate)
}

func (b *baseBlock) updateBlockInstanceStatus(status blockinstance.Status, endDate *time.Time) {
	if b.blockStatusFunction != nil {
		err := b.blockStatusFunction(b.appCtx, b.blockInstanceID, status, endDate, b.output)
		if err != nil {

		}
	}
}

func (b *baseBlock) Execute() (*ExecutorResult, error) {
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

func (b *baseBlock) runLogic() error {
	b.output = b.input
	return nil
}

func (b *baseBlock) executeInputTransformation() error {
	if b.inputTransformation && b.transformations.input != nil {
		value, err := b.valueTransformation(b.input, *b.transformations.input)
		if err != nil {
			return err
		}
		b.input = value
	}

	if b.inputStateTransformation && b.transformations.inputState != nil {
		state, err := b.stateTransformation(b.input, *b.transformations.inputState)
		if err != nil {
			return err
		}
		b.state = state
	}

	return nil
}

func (b *baseBlock) executeOutputTransformation() error {
	if b.outputTransformation && b.transformations.output != nil {
		output, err := b.valueTransformation(b.output, *b.transformations.output)
		if err != nil {
			return err
		}
		b.output = output
	}

	if b.outputStateTransformation && b.transformations.outputState != nil {
		state, err := b.stateTransformation(b.output, *b.transformations.outputState)
		if err != nil {
			return err
		}
		b.state = state
	}

	return nil
}

func (b *baseBlock) valueTransformation(value map[string]interface{},
	transformation blockTransformationValue) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, transformation.key)
	if err != nil {
		return nil, err
	}

	return b.transformation(value, result, transformation.strategy)
}

func (b *baseBlock) stateTransformation(value map[string]interface{},
	transformation blockTransformationValue) (map[string]interface{}, error) {

	result, err := b.dataTransformation(value, transformation.key)
	if err != nil {
		return nil, err
	}

	return b.transformation(b.state, result, transformation.strategy)
}

func (b *baseBlock) dataTransformation(value map[string]interface{},
	key celgo.AstKey) (map[string]interface{}, error) {

	return b.evaluateTransformation(value, b.state, key)
}

func (b *baseBlock) evaluateTransformation(input, state map[string]interface{},
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

func (b *baseBlock) transformation(original, target map[string]interface{},
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
