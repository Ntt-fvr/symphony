// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker_test

import (
	"context"
	"errors"
	"fmt"
	"testing"

	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flowinstance"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/mocks"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.uber.org/cadence/testsuite"
	"go.uber.org/cadence/workflow"
	"gocloud.dev/runtimevar/constantvar"
)

type FlowTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite
	entClient *ent.Client
	client    *worker.FlowWorker
	ctx       context.Context
	env       *testsuite.TestWorkflowEnvironment
}

func (s *FlowTestSuite) SetupTest() {
	var m mocks.Tenancy
	s.entClient = viewertest.NewTestClient(s.T())
	s.ctx = viewertest.NewContext(context.Background(), s.entClient)
	m.On("ClientFor", mock.Anything, viewertest.DefaultTenant).
		Return(s.entClient, nil)
	m.On("ClientFor", mock.Anything, mock.MatchedBy(func(tenant string) bool { return tenant != viewertest.DefaultTenant })).
		Return(nil, fmt.Errorf("tenant not found"))
	s.client = worker.NewFlowWorker(worker.FlowWorkerConfig{
		Tenancy: &m,
		Features: constantvar.New(viewer.TenantFeatures{
			viewertest.DefaultTenant: viewertest.DefaultFeatures,
		}),
		Logger: logtest.NewTestLogger(s.T()),
	})
	s.SetContextPropagators([]workflow.ContextPropagator{
		worker.NewContextPropagator(&m),
	})
	s.env = s.NewTestWorkflowEnvironment()
	s.env.RegisterActivity(s.client.CompleteFlowActivity)
	v := viewer.FromContext(s.ctx)
	s.env.OnWorkflow(s.client.RunFlowWorkflow, mock.Anything, mock.Anything).Return(func(ctx workflow.Context, input worker.RunFlowInput) error {
		return s.client.RunFlowWorkflow(worker.NewWorkflowContext(ctx, v), input)
	})
}

func (s *FlowTestSuite) prepareFlow() *ent.Flow {
	flw := s.entClient.Flow.Create().
		SetName("Flow").
		SaveX(s.ctx)
	s.entClient.Block.Create().
		SetType(block.TypeStart).
		SetCid("start").
		SetName("Start").
		SetFlow(flw).
		SaveX(s.ctx)
	return flw
}

func (s *FlowTestSuite) prepareFlowInstance(flw *ent.Flow) *ent.FlowInstance {
	flowInstance := s.entClient.FlowInstance.Create().
		SetFlow(flw).
		SaveX(s.ctx)
	blockTemplate := flowInstance.QueryTemplate().
		QueryBlocks().
		Where(block.TypeEQ(block.TypeStart)).
		OnlyX(s.ctx)
	s.entClient.BlockInstance.Create().
		SetBlock(blockTemplate).
		SetFlowInstance(flowInstance).
		SaveX(s.ctx)
	return flowInstance
}

func (s *FlowTestSuite) AfterTest(_, _ string) {
	s.env.AssertExpectations(s.T())
}

func (s *FlowTestSuite) TestRunFlow() {
	flw := s.prepareFlow()
	flowInstance := s.prepareFlowInstance(flw)
	s.env.ExecuteWorkflow(s.client.RunFlowWorkflow, worker.RunFlowInput{
		FlowInstanceID: flowInstance.ID,
	})
	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
	flowInstance, err := s.entClient.FlowInstance.Get(s.ctx, flowInstance.ID)
	s.NoError(err)
	s.Equal(flowinstance.StatusCompleted, flowInstance.Status)
	startBlock, err := flowInstance.QueryBlocks().Only(s.ctx)
	s.NoError(err)
	s.Equal(blockinstance.StatusCompleted, startBlock.Status)
}

func (s *FlowTestSuite) TestRunFlowBadInstanceID() {
	s.env.ExecuteWorkflow(s.client.RunFlowWorkflow, worker.RunFlowInput{
		FlowInstanceID: 123,
	})
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func (s *FlowTestSuite) TestRunFlowTimeout() {
	flw := s.prepareFlow()
	flowInstance := s.prepareFlowInstance(flw)
	s.env.OnActivity(s.client.CompleteFlowActivity, mock.Anything, mock.Anything).
		Return(errors.New("failed"))
	s.env.ExecuteWorkflow(s.client.RunFlowWorkflow, worker.RunFlowInput{
		FlowInstanceID: flowInstance.ID,
	})
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func (s *FlowTestSuite) TestRunIncompleteFlow() {
	flw := s.prepareFlow()
	flowInstance := s.entClient.FlowInstance.Create().
		SetFlow(flw).
		SaveX(s.ctx)
	s.env.ExecuteWorkflow(s.client.RunFlowWorkflow, worker.RunFlowInput{
		FlowInstanceID: flowInstance.ID,
	})
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func TestFlowTestSuite(t *testing.T) {
	suite.Run(t, new(FlowTestSuite))
}
