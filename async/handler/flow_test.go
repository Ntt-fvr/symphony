// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler_test

import (
	"context"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/async/worker"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.uber.org/cadence/client"
	"go.uber.org/cadence/mocks"
)

// Error Post "/start": unsupported protocol scheme ""
func TestWorkflowCreated(t *testing.T) {
	c := mocks.Client{}
	var (
		workflowID, workflowName string
		workflowInput            int
	)
	c.On("StartWorkflow", mock.Anything, mock.Anything, mock.Anything, mock.Anything, mock.Anything).
		Run(func(args mock.Arguments) {
			workflowID = args.Get(1).(client.StartWorkflowOptions).ID
			workflowName = args.Get(3).(string)
			workflowInput = args.Get(4).(int)
		}).
		Return(nil, nil).
		Once()
	flowHandler := handler.NewFlowHandler(&c, "")
	entClient := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), entClient)
	user, _ := viewer.FromContext(ctx).(*viewer.UserViewer)
	entClient.Use(event.LogHook(flowHandler.Handle, log.NewNopLogger()))
	flw, err := entClient.Flow.Create().
		SetName("Flow").
		SetStatus(flow.StatusPublished).
		SetCreationDate(time.Now()).
		SetAuthor(user.User()).
		SetNewInstancesPolicy(flow.NewInstancesPolicyEnabled).
		Save(ctx)
	require.NoError(t, err)

	flwInstance, err := entClient.FlowInstance.Create().
		SetFlowID(flw.ID).
		SetStartDate(time.Now()).
		SetStartParams([]*flowschema.VariableValue{{}}).
		Save(ctx)
	require.NoError(t, err)
	require.Equal(t, worker.AutomationTaskListName, workflowName)
	require.Equal(t, flwInstance.ID, workflowInput)
	parts := strings.Split(workflowID, "/")
	require.Len(t, parts, 2)
	require.Equal(t, viewertest.DefaultTenant, parts[0])
	require.Equal(t, strconv.Itoa(flwInstance.ID), parts[1])
}
