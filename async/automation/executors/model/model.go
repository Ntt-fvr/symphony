package model

import (
	"context"
	"github.com/facebookincubator/symphony/pkg/ent"
	"go.uber.org/cadence/workflow"
)

type Flow struct {
	Id     int
	Blocks []Block
}

type Block struct {
	ent.Block
	FlowID          int
	BlockInstanceID int
	NextBlock       int
	ChoiceRoutes    []ChoiceRoute
	WorkflowCtx     workflow.Context
	AppCtx          context.Context
}

type ChoiceRoute struct {
	Id        int
	Condition string
}
