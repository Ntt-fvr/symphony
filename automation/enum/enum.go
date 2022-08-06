package enum

type GraphQLAuthenticationType string

const (
	GraphQLAuthenticationTypeBasic  GraphQLAuthenticationType = "BASIC"
	GraphQLAuthenticationTypeOpenID GraphQLAuthenticationType = "OPENID"
)

type ContextArg string

const (
	BlocksArg     ContextArg = "BLOCKS_ARG"
	FlowActionArg ContextArg = "FLOW_ACTION_ARG"
	TenantArg     ContextArg = "TENANT_ARG"
)

func (ca ContextArg) String() string {
	return string(ca)
}

type FlowAction string

const (
	FlowActionCancel FlowAction = "CANCEL"
	FlowActionPause  FlowAction = "PAUSE"
	FlowActionResume FlowAction = "RESUME"
)

func (fa FlowAction) String() string {
	return string(fa)
}

var blockTypes = map[string]BlockType{
	string(BlockTypeStart):         BlockTypeStart,
	string(BlockTypeEnd):           BlockTypeEnd,
	string(BlockTypeGoto):          BlockTypeGoto,
	string(BlockTypeChoice):        BlockTypeChoice,
	string(BlockTypeExecuteFlow):   BlockTypeExecuteFlow,
	string(BlockTypeForEach):       BlockTypeForEach,
	string(BlockTypeInvokeRestAPI): BlockTypeInvokeRestAPI,
	string(BlockTypeKafka):         BlockTypeKafka,
	string(BlockTypeParallel):      BlockTypeParallel,
	string(BlockTypeTimer):         BlockTypeTimer,
	string(BlockTypeWaitForSignal): BlockTypeWaitForSignal,
}

type BlockType string

const (
	BlockTypeStart         BlockType = "StartBlock"
	BlockTypeEnd           BlockType = "EndBlock"
	BlockTypeGoto          BlockType = "GotoBlock"
	BlockTypeChoice        BlockType = "ChoiceBlock"
	BlockTypeExecuteFlow   BlockType = "ExecuteFlowBlock"
	BlockTypeForEach       BlockType = "ForEachBlock"
	BlockTypeInvokeRestAPI BlockType = "InvokeRestAPIBlock"
	BlockTypeKafka         BlockType = "KafkaBlock"
	BlockTypeParallel      BlockType = "ParallelBlock"
	BlockTypeTimer         BlockType = "TimerBlock"
	BlockTypeWaitForSignal BlockType = "WaitForSignalBlock"
)

func (bt BlockType) String() string {
	return string(bt)
}

func ParseBlockType(bt string) BlockType {
	blockType, exists := blockTypes[bt]
	if !exists {
		return BlockTypeEnd
	}
	return blockType
}

type BlockInstanceStatus string

const (
	BlockInstanceStatusPending    BlockInstanceStatus = "PENDING"
	BlockInstanceStatusInProgress BlockInstanceStatus = "IN_PROGRESS"
	BlockInstanceStatusFailed     BlockInstanceStatus = "FAILED"
	BlockInstanceStatusCompleted  BlockInstanceStatus = "COMPLETED"
	BlockInstanceStatusWaiting    BlockInstanceStatus = "WAITING"
)

func (bi BlockInstanceStatus) String() string {
	return string(bi)
}

type FlowInstanceStatus string

const (
	FlowInstanceStatusRunning   FlowInstanceStatus = "RUNNING"
	FlowInstanceStatusFailed    FlowInstanceStatus = "FAILED"
	FlowInstanceStatusFailing   FlowInstanceStatus = "FAILING"
	FlowInstanceStatusCompleted FlowInstanceStatus = "COMPLETED"
	FlowInstanceStatusCanceled  FlowInstanceStatus = "CANCELED"
	FlowInstanceStatusPaused    FlowInstanceStatus = "PAUSED"
	FlowInstanceStatusClosed    FlowInstanceStatus = "CLOSED"
)

func (fi FlowInstanceStatus) String() string {
	return string(fi)
}

type SignalName string

const (
	SignalBlock  SignalName = "SIGNAL_BLOCK"
	SignalTimer  SignalName = "SIGNAL_TIMER"
	SignalCancel SignalName = "SIGNAL_CANCEL"
	SignalPause  SignalName = "SIGNAL_PAUSE"
	SignalResume SignalName = "SIGNAL_RESUME"
)

func (sn SignalName) String() string {
	return string(sn)
}

type UrlMethod string

const (
	UrlMethodGet    UrlMethod = "GET"
	UrlMethodPost   UrlMethod = "POST"
	UrlMethodPut    UrlMethod = "PUT"
	UrlMethodDelete UrlMethod = "DELETE"
	UrlMethodPatch  UrlMethod = "PATCH"
)

func (um UrlMethod) String() string {
	return string(um)
}

type AuthType string

const (
	AuthTypeBasic AuthType = "BASIC"
	AuthTypeOidc  AuthType = "OIDC"
)

func (at AuthType) String() string {
	return string(at)
}

type KafkaMessageType string

const (
	KafkaMessageTypeExpression KafkaMessageType = "EXPRESSION"
	KafkaMessageTypeInput      KafkaMessageType = "INPUT"
	KafkaMessageTypeState      KafkaMessageType = "STATE"
)

func (km KafkaMessageType) String() string {
	return string(km)
}

type TransfStrategy string

const (
	TransfStrategyReplace TransfStrategy = "REPLACE"
	TransfStrategyMerge   TransfStrategy = "MERGE"
)

func (ts TransfStrategy) String() string {
	return string(ts)
}

type RetryUnit string

const (
	RetryUnitSeconds RetryUnit = "SECONDS"
	RetryUnitMinutes RetryUnit = "MINUTES"
	RetryUnitHours   RetryUnit = "HOURS"
)

func (ru RetryUnit) String() string {
	return string(ru)
}

type SignalModule string

const (
	SignalModuleInventory     SignalModule = "INVENTORY"
	SignalModuleConfiguration SignalModule = "CONFIGURATION"
)

func (sm SignalModule) String() string {
	return string(sm)
}

type SignalType string

const (
	SignalTypeNotification SignalType = "NOTIFICATION"
	SignalTypeWocreation   SignalType = "WOCREATION"
	SignalTypeCrcreation   SignalType = "CRCREATION"
	SignalTypeWoupdate     SignalType = "WOUPDATE"
	SignalTypeCrupdate     SignalType = "CRUPDATE"
)

func (st SignalType) String() string {
	return string(st)
}

type TimerBehavior string

const (
	TimerBehaviorFixedInterval    TimerBehavior = "FIXED_INTERVAL"
	TimerBehaviorSpecificDatetime TimerBehavior = "SPECIFIC_DATETIME"
)

func (tb TimerBehavior) String() string {
	return string(tb)
}

type AdditionMethod string

const (
	AdditionMethodCombine       AdditionMethod = "COMBINE"
	AdditionMethodDiscardResult AdditionMethod = "DISCARD_RESULT"
)

func (am AdditionMethod) String() string {
	return string(am)
}
