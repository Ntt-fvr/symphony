package model

import (
	"context"
	"github.com/facebookincubator/symphony/pkg/ent"
	"go.uber.org/cadence/workflow"
)

type AutomationBlock struct {
	ent.Block
	FlowID          int
	BlockInstanceID int
	Attempts        int
	NextBlock       int
	ChoiceRoutes    []ChoiceRoute
	WorkflowCtx     workflow.Context
	AppCtx          context.Context
}

type ChoiceRoute struct {
	Id        int
	Condition string
}
