// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"errors"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	action_mocks "github.com/facebookincubator/symphony/pkg/flowengine/actions/mocks"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	trigger_mocks "github.com/facebookincubator/symphony/pkg/flowengine/triggers/mocks"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestAddDeleteBlocksOfFlowDraft(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, fdr, br := r.Mutation(), r.FlowDraft(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	blocks, err := fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Empty(t, blocks)

	sb, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Start",
	})
	require.NoError(t, err)
	require.Equal(t, block.TypeStart, sb.Type)
	require.Equal(t, "Start", sb.Name)
	blockFlowID, err := sb.QueryFlowDraft().OnlyID(ctx)
	require.NoError(t, err)
	require.Equal(t, flowDraft.ID, blockFlowID)
	blockType, err := br.Details(ctx, sb)
	require.NoError(t, err)
	_, ok := blockType.(*models.StartBlock)
	require.True(t, ok)

	eb, err := mr.AddEndBlock(ctx, models.AddEndBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Success",
	})
	require.NoError(t, err)
	require.Equal(t, block.TypeEnd, eb.Type)
	require.Equal(t, "Success", eb.Name)
	blockFlowID, err = eb.QueryFlowDraft().OnlyID(ctx)
	require.NoError(t, err)
	require.Equal(t, flowDraft.ID, blockFlowID)
	blockType, err = br.Details(ctx, eb)
	require.NoError(t, err)
	_, ok = blockType.(*models.EndBlock)
	require.True(t, ok)

	blocks, err = fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Len(t, blocks, 2)
	_, err = mr.DeleteBlock(ctx, eb.ID)
	require.NoError(t, err)
	blocks, err = fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Len(t, blocks, 1)

	require.Zero(t, sb.UIRepresentation)
	xPosition := 201
	yPosition := 21
	sb, err = mr.EditBlock(ctx, models.EditBlockInput{
		ID:   sb.ID,
		Name: pointer.ToString("NewStart"),
		UIRepresentation: &flowschema.BlockUIRepresentation{
			XPosition: xPosition,
			YPosition: yPosition,
		},
	})
	require.NoError(t, err)
	require.Equal(t, "NewStart", sb.Name)
	require.Equal(t, xPosition, sb.UIRepresentation.XPosition)
	require.Equal(t, yPosition, sb.UIRepresentation.YPosition)
}

func TestAddDeleteConnectors(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, br := r.Mutation(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	startBlock, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Start",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "End",
	})
	require.NoError(t, err)
	connector, err := mr.AddConnector(ctx, models.ConnectorInput{
		SourceBlockID: startBlock.ID,
		TargetBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	require.Equal(t, startBlock.ID, connector.Source.ID)

	blocks, err := br.NextBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Len(t, blocks, 1)
	require.Equal(t, blocks[0].ID, endBlock.ID)
	blocks, err = br.PrevBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)

	blocks, err = br.NextBlocks(ctx, endBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)
	blocks, err = br.PrevBlocks(ctx, endBlock)
	require.NoError(t, err)
	require.Len(t, blocks, 1)
	require.Equal(t, blocks[0].ID, startBlock.ID)

	_, err = mr.DeleteConnector(ctx, models.ConnectorInput{
		SourceBlockID: endBlock.ID,
		TargetBlockID: startBlock.ID,
	})
	require.Error(t, err)
	_, err = mr.DeleteConnector(ctx, models.ConnectorInput{
		SourceBlockID: startBlock.ID,
		TargetBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	blocks, err = br.NextBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)
}

func TestGotoBlock(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, br := r.Mutation(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, models.AddEndBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "End",
	})
	require.NoError(t, err)

	b, err := mr.AddGotoBlock(ctx, models.AddGotoBlockInput{
		FlowDraftID:   flowDraft.ID,
		Name:          "GotoEnd",
		TargetBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	details, err := br.Details(ctx, b)
	require.NoError(t, err)
	goTo, ok := details.(*models.GotoBlock)
	require.True(t, ok)
	require.Equal(t, endBlock.ID, goTo.Target.ID)
}

func TestTriggerBlockNotExists(t *testing.T) {
	triggerFactory := trigger_mocks.Factory{}
	r := newTestResolver(t, withTriggerFactory(&triggerFactory))
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr := r.Mutation()
	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow",
	})
	require.NoError(t, err)
	triggerFactory.On("GetType", mock.Anything).
		Return(nil, errors.New("not found")).
		Once()
	_, err = mr.AddTriggerBlock(ctx, models.AddTriggerBlockInput{
		FlowDraftID: draft.ID,
		Name:        "Trigger Block",
		TriggerType: flowschema.TriggerTypeWorkOrder,
	})
	require.Error(t, err)

	triggerType := trigger_mocks.TriggerType{}
	description := "Some desc"
	triggerType.On("Description").
		Return(description)
	triggerType.On("Variables").
		Return([]*flowschema.VariableDefinition{})
	triggerFactory.On("GetType", mock.Anything).
		Return(&triggerType, nil).
		Times(4)
	_, err = mr.AddTriggerBlock(ctx, models.AddTriggerBlockInput{
		FlowDraftID: draft.ID,
		Name:        "Trigger Block",
		TriggerType: "Invalid",
	})
	require.Error(t, err)
	triggerBlock, err := mr.AddTriggerBlock(ctx, models.AddTriggerBlockInput{
		FlowDraftID: draft.ID,
		Name:        "Trigger Block",
		TriggerType: flowschema.TriggerTypeWorkOrder,
	})
	require.NoError(t, err)
	require.Equal(t, "Trigger Block", triggerBlock.Name)

	br := r.Block()
	details, err := br.Details(ctx, triggerBlock)
	require.NoError(t, err)
	trigger, ok := details.(*models.TriggerBlock)
	require.True(t, ok)
	require.Equal(t, description, trigger.TriggerType.Description())
	triggerFactory.On("GetType", mock.Anything).
		Return(nil, errors.New("not found")).
		Once()
	_, err = br.Details(ctx, triggerBlock)
	require.Error(t, err)
}

func TestActionBlockNotExists(t *testing.T) {
	actionFactory := action_mocks.Factory{}
	r := newTestResolver(t, withActionFactory(&actionFactory))
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, br := r.Mutation(), r.Block()
	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow",
	})
	require.NoError(t, err)
	actionFactory.On("GetType", mock.Anything).
		Return(nil, errors.New("not found")).
		Once()
	_, err = mr.AddActionBlock(ctx, models.AddActionBlockInput{
		FlowDraftID: draft.ID,
		Name:        "Action Block",
		ActionType:  flowschema.ActionTypeWorkOrder,
	})
	require.Error(t, err)

	description := "Some desc"
	actionType := action_mocks.ActionType{}
	actionType.On("Description").
		Return(description)
	actionType.On("Variables").
		Return([]*flowschema.VariableDefinition{})
	actionFactory.On("GetType", mock.Anything).
		Return(&actionType, nil).
		Times(3)
	actionBlock, err := mr.AddActionBlock(ctx, models.AddActionBlockInput{
		FlowDraftID: draft.ID,
		Name:        "Action Block",
		ActionType:  flowschema.ActionTypeWorkOrder,
	})
	require.NoError(t, err)
	require.Equal(t, "Action Block", actionBlock.Name)
	details, err := br.Details(ctx, actionBlock)
	require.NoError(t, err)
	action, ok := details.(*models.ActionBlock)
	require.True(t, ok)
	require.Equal(t, description, action.ActionType.Description())
	actionFactory.On("GetType", mock.Anything).
		Return(nil, errors.New("not found")).
		Once()
	_, err = br.Details(ctx, actionBlock)
	require.Error(t, err)
}
