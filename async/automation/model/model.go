package model

import (
	"time"

	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
)

type BlockTransformationValue struct {
	Key      celgo.AstKey
	Strategy enum.TransfStrategy
}

type BlockTransformations struct {
	Input       *BlockTransformationValue
	InputState  *BlockTransformationValue
	Output      *BlockTransformationValue
	OutputState *BlockTransformationValue
}

type BaseBlock struct {
	BlockType                 block.Type           `json:"blockType,omitempty"`
	BlockID                   int                  `json:"blockID,omitempty"`
	FlowInstanceID            int                  `json:"flowInstanceID,omitempty"`
	BlockInstanceID           int                  `json:"blockInstanceID,omitempty"`
	NextBlock                 int                  `json:"nextBlock,omitempty"`
	Attempts                  int                  `json:"attempts,omitempty"`
	MaxAttempts               int                  `json:"maxAttempts,omitempty"`
	BackOffRate               int                  `json:"backOffRate,omitempty"`
	InputTransformation       bool                 `json:"inputTransformation,omitempty"`
	InputStateTransformation  bool                 `json:"InputStateTransformation,omitempty"`
	OutputTransformation      bool                 `json:"outputTransformation,omitempty"`
	OutputStateTransformation bool                 `json:"OutputStateTransformation,omitempty"`
	ErrorHandling             bool                 `json:"errorHandling,omitempty"`
	RetryPolicy               bool                 `json:"retryPolicy,omitempty"`
	RetryInterval             int                  `json:"retryInterval,omitempty"`
	RetryUnit                 block.RetryUnit      `json:"retryUnit,omitempty"`
	Transformations           BlockTransformations `json:"transformations,omitempty"`
	Start                     *StartBlock          `json:"start,omitempty"`
	End                       *EndBlock            `json:"end,omitempty"`
	Goto                      *GotoBlock           `json:"goto,omitempty"`
	Choice                    *ChoiceBlock         `json:"choice,omitempty"`
	ExecuteFlow               *ExecuteFlowBlock    `json:"executeFlow,omitempty"`
	ForEach                   *ForEachBlock        `json:"forEach,omitempty"`
	InvokeRestAPI             *InvokeRestAPIBlock  `json:"invokeRestAPI,omitempty"`
	Kafka                     *KafkaBlock          `json:"kafka,omitempty"`
	Parallel                  *ParallelBlock       `json:"parallel,omitempty"`
	Timer                     *TimerBlock          `json:"timer,omitempty"`
	WaitForSignal             *WaitForSignalBlock  `json:"waitForSignal,omitempty"`
	StartWorkOrder            *StartWorkOrderBlock `json:"startWorkOrder,omitempty"`
}

func (block *BaseBlock) GetBlockID() int {
	return block.BlockID
}

func (block *BaseBlock) GetFlowInstanceID() int {
	return block.FlowInstanceID
}

func (block *BaseBlock) GetBlockInstanceID() int {
	return block.BlockInstanceID
}

func (block *BaseBlock) SetBlockInstanceID(blockInstanceID int) {
	block.BlockInstanceID = blockInstanceID
}

func (block *BaseBlock) GetNextBlockID() int {
	return block.NextBlock
}

func (block *BaseBlock) SetNextBlockID(nextBlockID int) {
	block.NextBlock = nextBlockID
}

func (block *BaseBlock) GetTransformations() BlockTransformations {
	return block.Transformations
}

func (block *BaseBlock) GetInputTransformation() bool {
	return block.InputTransformation
}

func (block *BaseBlock) GetInputStateTransformation() bool {
	return block.InputStateTransformation
}

func (block *BaseBlock) GetOutputTransformation() bool {
	return block.OutputTransformation
}

func (block *BaseBlock) GetOutputStateTransformation() bool {
	return block.OutputStateTransformation
}

func (block *BaseBlock) AddAttempts() {
	block.Attempts++
}

func (block *BaseBlock) GetAttempts() int {
	return block.Attempts
}

func (block *BaseBlock) GetMaxAttempts() int {
	return block.MaxAttempts
}

type StartBlock struct {
}

type EndBlock struct {
}

type GotoBlock struct {
}

type ChoiceRule struct {
	BlockID   int    `json:"blockID,omitempty"`
	Condition string `json:"condition,omitempty"`
	Index     int    `json:"index,omitempty"`
}

type ChoiceBlock struct {
	ChoiceRules []ChoiceRule `json:"choiceRules,omitempty"`
}

type ExecuteFlowBlock struct {
	FlowID int `json:"flowID,omitempty"`
}

type ForEachBlock struct {
	Key          string `json:"key,omitempty"`
	StartBlockID int    `json:"startBlockID,omitempty"`
}

type InvokeRestAPIBlock struct {
	Timeout int               `json:"timeout,omitempty"`
	Url     string            `json:"url,omitempty"`
	Body    string            `json:"body,omitempty"`
	Method  block.URLMethod   `json:"method,omitempty"`
	Headers map[string]string `json:"headers,omitempty"`
}

type KafkaBlock struct {
	Topic       string                `json:"topic,omitempty"`
	Expression  string                `json:"expression,omitempty"`
	Brokers     []string              `json:"brokers,omitempty"`
	MessageType enum.KafkaMessageType `json:"messageType,omitempty"`
}

type ParallelBlock struct {
	Key          string `json:"key,omitempty"`
	StartBlockID int    `json:"startBlockID,omitempty"`
}

type TimerBlock struct {
	Seconds          int                 `json:"seconds,omitempty"`
	EnableExpression bool                `json:"enableExpression,omitempty"`
	Expression       string              `json:"expression,omitempty"`
	SpecificDate     time.Time           `json:"specificDate,omitempty"`
	Behavior         block.TimerBehavior `json:"behavior,omitempty"`
}

type WaitForSignalBlock struct {
	Blocked      bool               `json:"blocked,omitempty"`
	CustomFilter string             `json:"customFilter,omitempty"`
	SignalType   block.SignalType   `json:"signalType,omitempty"`
	SignalModule block.SignalModule `json:"signalModule,omitempty"`
}

type StartWorkOrderBlock struct {
}
