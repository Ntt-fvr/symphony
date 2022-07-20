package enum

type ContextArg string

const (
	FlowActionArg ContextArg = "FLOW_ACTION_ARG"
	BlocksArg     ContextArg = "BLOCKS_ARG"
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
