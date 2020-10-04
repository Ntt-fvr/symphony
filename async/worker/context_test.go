// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package worker_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.uber.org/cadence/activity"
	"go.uber.org/cadence/testsuite"
	"go.uber.org/cadence/workflow"
)

type ContextTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite
	ctx  context.Context
	env  *testsuite.TestWorkflowEnvironment
	flow func(ctx workflow.Context) error
}

func (s *ContextTestSuite) SetupTest() {
	client := viewertest.NewTestClient(s.T())
	s.ctx = viewertest.NewContext(context.Background(), client)
	tenancy := viewer.TenancyFunc(func(ctx context.Context, tenant string) (*ent.Client, error) {
		if tenant == viewertest.DefaultTenant {
			return client, nil
		}
		return nil, fmt.Errorf("tenant %s not found", tenant)
	})
	s.SetContextPropagators([]workflow.ContextPropagator{
		worker.NewContextPropagator(tenancy),
	})
	s.env = s.NewTestWorkflowEnvironment()
	s.env.RegisterActivityWithOptions(func(ctx context.Context) error {
		v := viewer.FromContext(ctx)
		s.Equal(viewertest.DefaultTenant, v.Tenant())
		return nil
	}, activity.RegisterOptions{
		Name: "Activity",
	})
	s.flow = func(ctx workflow.Context) error {
		workflow.ExecuteActivity(ctx, "Activity")
		return nil
	}
	s.env.RegisterWorkflowWithOptions(s.flow, workflow.RegisterOptions{
		Name: "Flow",
	})
}

func (s *ContextTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func (s *ContextTestSuite) addViewerToWorkflow(v viewer.Viewer) {
	s.env.OnWorkflow("Flow", mock.Anything, mock.Anything).Return(func(ctx workflow.Context) error {
		return s.flow(worker.NewWorkflowContext(ctx, v))
	})
}

func (s *ContextTestSuite) TestRunFlow() {
	s.addViewerToWorkflow(viewer.FromContext(s.ctx))
	s.env.ExecuteWorkflow("Flow")
	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
}

/*
func (s *UnitTestSuite) TestRunFlowBadTenant() {
	s.addViewerToWorkflow(viewer.NewAutomation("bad_tenant", "AutomationService", user.RoleAdmin),
		func(ctx workflow.Context) error {
			return nil
		})
	s.env.ExecuteWorkflow("Flow")
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func (s *UnitTestSuite) TestRunFlowBadInstanceID() {
	s.addViewerToWorkflow(viewer.FromContext(s.ctx), func(ctx workflow.Context) error {
		return nil
	})
	s.env.ExecuteWorkflow("Flow")
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func (s *UnitTestSuite) TestRunFlowTimeout() {
	s.env.OnActivity("Flow", mock.Anything, mock.Anything).
		Return(errors.New("failed"))
	s.addViewerToWorkflow(viewer.FromContext(s.ctx), func(ctx workflow.Context) error {
		return nil
	})
	s.env.ExecuteWorkflow("Flow")
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}

func (s *UnitTestSuite) TestRunIncompleteFlow() {
	s.addViewerToWorkflow(viewer.FromContext(s.ctx), func(ctx workflow.Context) error {
		return nil
	})
	s.env.ExecuteWorkflow("Flow")
	s.True(s.env.IsWorkflowCompleted())
	s.Error(s.env.GetWorkflowError())
}
*/

func TestContextTestSuite(t *testing.T) {
	suite.Run(t, new(ContextTestSuite))
}
