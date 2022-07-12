package model

import (
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"time"
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

type IBlock interface {
	GetBlockID() int
	GetFlowInstanceID() int
	GetBlockInstanceID() int
	SetBlockInstanceID(int)
	GetNextBlockID() int
	SetNextBlockID(int)
	GetTransformations() BlockTransformations
	GetInputTransformation() bool
	GetInputStateTransformation() bool
	GetOutputTransformation() bool
	GetOutputStateTransformation() bool
	AddAttempts()
	GetAttempts() int
	GetMaxAttempts() int
}

type BaseBlock struct {
	BlockType                 block.Type
	BlockID                   int
	FlowInstanceID            int
	BlockInstanceID           int
	NextBlock                 int
	Attempts                  int
	MaxAttempts               int
	BackOffRate               int
	InputTransformation       bool
	InputStateTransformation  bool
	OutputTransformation      bool
	OutputStateTransformation bool
	ErrorHandling             bool
	RetryPolicy               bool
	RetryInterval             int
	RetryUnit                 block.RetryUnit
	Transformations           BlockTransformations
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
	BaseBlock
}

type EndBlock struct {
	BaseBlock
}

type GotoBlock struct {
	BaseBlock
}

type ChoiceRule struct {
	BlockID   int
	Condition string
	Order     int
}

type ChoiceBlock struct {
	BaseBlock
	ChoiceRules []ChoiceRule
}

type ExecuteFlowBlock struct {
	BaseBlock
	FlowID int
}

type ForEachBlock struct {
	BaseBlock
	Key          string
	StartBlockID int
}

type InvokeRestAPIBlock struct {
	BaseBlock
	Timeout int
	Url     string
	Body    string
	Method  block.URLMethod
	Headers map[string]string
}

type KafkaBlock struct {
	BaseBlock
	Topic       string
	Expression  string
	Brokers     []string
	MessageType enum.KafkaMessageType
}

type ParallelBlock struct {
	BaseBlock
	Key          string
	StartBlockID int
}

type TimerBlock struct {
	BaseBlock
	Seconds          int
	EnableExpression bool
	Expression       string
	SpecificDate     time.Time
	Behavior         block.TimerBehavior
}

type WaitForSignalBlock struct {
	BaseBlock
	Blocked      bool
	CustomFilter string
	SignalType   block.SignalType
	SignalModule block.SignalModule
}
