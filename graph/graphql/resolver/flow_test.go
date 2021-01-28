// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"strconv"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/blockinstance"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func prepareBasicFlow(ctx context.Context, t *testing.T, mr generated.MutationResolver, name string,
	startUIRepresentation *flowschema.BlockUIRepresentation, endUIRepresentation *flowschema.BlockUIRepresentation) *ent.Flow {
	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: name,
		EndParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "param",
				Type: enum.VariableTypeString,
			},
		},
	})
	require.NoError(t, err)
	startBlock, err := mr.AddStartBlock(ctx, draft.ID, models.StartBlockInput{
		Cid: "start",
		ParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "start_param",
				Type: enum.VariableTypeString,
			},
		},
		UIRepresentation: startUIRepresentation,
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, draft.ID, models.EndBlockInput{
		Cid: "end",
		Params: []*models.VariableExpressionInput{
			{
				Type: enum.VariableDefinition,
				VariableDefinitionKey: refString("param"),
				Expression:            "${b_0}",
				BlockVariables: []*models.BlockVariableInput{
					{
						BlockCid:              startBlock.Cid,
						VariableDefinitionKey: "start_param",
					},
				},
			},
		},
		UIRepresentation: endUIRepresentation,
	})
	require.NoError(t, err)
	_, err = mr.AddConnector(ctx, draft.ID, models.ConnectorInput{
		SourceBlockCid: startBlock.Cid,
		TargetBlockCid: endBlock.Cid,
	})
	require.NoError(t, err)
	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{
		FlowDraftID:         draft.ID,
		FlowInstancesPolicy: flow.NewInstancesPolicyEnabled,
	})
	require.NoError(t, err)
	return flw
}

func TestAddDeleteFlowDraft(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()
	name := "5G Deployment"
	description := "Flow used for managing all technical operation around deployment"
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:        name,
		Description: &description,
	})
	require.NoError(t, err)
	require.Equal(t, name, flowDraft.Name)
	require.Equal(t, description, *flowDraft.Description)

	flowEdge, err := flowDraft.QueryFlow().Only(ctx)
	require.NoError(t, err)
	require.Equal(t, flowEdge.Name, flowDraft.Name)
	require.Equal(t, *flowEdge.Description, *flowDraft.Description)
	require.Equal(t, flow.StatusUnpublished, flowEdge.Status)
	require.Equal(t, flow.NewInstancesPolicyDisabled, flowEdge.NewInstancesPolicy)

	node, err := qr.Node(ctx, flowDraft.ID)
	require.NoError(t, err)
	flowDraft, ok := node.(*ent.FlowDraft)
	require.True(t, ok)
	require.Equal(t, name, flowDraft.Name)
	require.Equal(t, description, *flowDraft.Description)

	_, err = mr.DeleteFlowDraft(ctx, flowDraft.ID)
	require.NoError(t, err)
	_, err = qr.Node(ctx, flowDraft.ID)
	require.Error(t, err)
}

func TestPublishDraftToNewFlow(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()
	name := "4G Deployment"
	description := "Flow used for managing all technical operation around deployment"
	endParamDefinitions := []*flowschema.VariableDefinition{
		{
			Key:  "param",
			Type: enum.VariableTypeInt,
		},
	}
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:                name,
		Description:         &description,
		EndParamDefinitions: endParamDefinitions,
	})
	require.NoError(t, err)
	startBlock, err := mr.AddStartBlock(ctx, flowDraft.ID, models.StartBlockInput{
		Cid: "start",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, flowDraft.ID, models.EndBlockInput{
		Cid: "end",
	})
	require.NoError(t, err)
	gotoBlock, err := mr.AddGotoBlock(ctx, flowDraft.ID, models.GotoBlockInput{
		Cid:            "shortcut",
		TargetBlockCid: pointer.ToString(endBlock.Cid),
	})
	require.NoError(t, err)
	_, err = mr.AddConnector(ctx, flowDraft.ID, models.ConnectorInput{
		SourceBlockCid: startBlock.Cid,
		TargetBlockCid: gotoBlock.Cid,
	})
	require.NoError(t, err)
	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{
		FlowDraftID:         flowDraft.ID,
		FlowInstancesPolicy: flow.NewInstancesPolicyEnabled,
	})
	require.NoError(t, err)
	require.Equal(t, name, flw.Name)
	require.Equal(t, description, *flw.Description)
	require.Equal(t, endParamDefinitions, flw.EndParamDefinitions)
	require.Equal(t, flow.StatusPublished, flw.Status)
	require.Equal(t, flow.NewInstancesPolicyEnabled, flw.NewInstancesPolicy)
	draft, err := flw.QueryDraft().Only(ctx)
	require.NoError(t, err)
	require.NotNil(t, draft)
	require.Equal(t, draft.ID, flowDraft.ID)
	require.Equal(t, true, draft.SameAsFlow)
	_, err = qr.Node(ctx, flowDraft.ID)
	require.NoError(t, err)
	blocks, err := flw.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Len(t, blocks, 3)
	for _, blk := range blocks {
		draftExists, err := blk.QueryFlowDraft().Exist(ctx)
		require.NoError(t, err)
		require.False(t, draftExists)
		flowExists, err := blk.QueryFlow().Exist(ctx)
		require.NoError(t, err)
		require.True(t, flowExists)
	}
}

func TestCreateDraftFromExistingFlowAndPublish(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr, qr, br, ver, bvr := r.Mutation(), r.Query(), r.Block(), r.VariableExpression(), r.BlockVariable()
	subFlow := prepareBasicFlow(ctx, t, mr, "Subflow", nil, nil)
	mainFlow := prepareBasicFlow(ctx, t, mr, "Main",
		&flowschema.BlockUIRepresentation{
			Name:      "Start",
			XPosition: 20,
			YPosition: 20,
		},
		&flowschema.BlockUIRepresentation{
			Name:      "End",
			XPosition: 30,
			YPosition: 30,
		})

	firstDraft, err := r.client.Flow.QueryDraft(mainFlow).Only(ctx)
	require.NoError(t, err)
	err = r.client.FlowDraft.DeleteOne(firstDraft).Exec(ctx)
	require.NoError(t, err)
	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:   "New name",
		FlowID: pointer.ToInt(mainFlow.ID),
		EndParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "param",
				Type: enum.VariableTypeString,
			},
		},
	})
	require.NoError(t, err)
	require.Equal(t, "New name", draft.Name)
	foundDraft, err := mainFlow.QueryDraft().Only(ctx)
	require.NoError(t, err)
	require.Equal(t, draft.ID, foundDraft.ID)
	foundFlow, err := qr.Node(ctx, mainFlow.ID)
	require.NoError(t, err)
	require.Equal(t, "Main", foundFlow.(*ent.Flow).Name)
	_, err = mr.AddSubflowBlock(ctx, draft.ID, models.SubflowBlockInput{
		Cid:    "blackbox",
		FlowID: subFlow.ID,
		Params: []*models.VariableExpressionInput{
			{
				Type: enum.VariableDefinition,
				VariableDefinitionKey: refString("start_param"),
				Expression:            "\"Start\"",
			},
		},
		UIRepresentation: &flowschema.BlockUIRepresentation{
			Name:      "Subflow",
			XPosition: 40,
			YPosition: 40,
		},
	})
	require.NoError(t, err)
	blks, err := draft.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Len(t, blks, 3)
	for _, blk := range blks {
		switch blk.Type {
		case block.TypeStart:
			require.Equal(t, "Start", blk.UIRepresentation.Name)
			require.Equal(t, 20, blk.UIRepresentation.XPosition)
			require.Equal(t, 20, blk.UIRepresentation.YPosition)
		case block.TypeEnd:
			require.Equal(t, "End", blk.UIRepresentation.Name)
			require.Equal(t, 30, blk.UIRepresentation.XPosition)
			require.Equal(t, 30, blk.UIRepresentation.YPosition)
		case block.TypeSubFlow:
			require.Equal(t, "Subflow", blk.UIRepresentation.Name)
			require.Equal(t, 40, blk.UIRepresentation.XPosition)
			require.Equal(t, 40, blk.UIRepresentation.YPosition)
		}
	}
	blks, err = mainFlow.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Len(t, blks, 2)
	startWithNext, err := draft.QueryBlocks().
		Where(block.TypeEQ(block.TypeStart)).
		WithExitPoints(func(query *ent.ExitPointQuery) {
			query.WithNextEntryPoints()
		}).
		Only(ctx)
	require.NoError(t, err)
	require.Len(t, startWithNext.Edges.ExitPoints, 1)
	require.Len(t, startWithNext.Edges.ExitPoints[0].Edges.NextEntryPoints, 1)

	endBlock, err := draft.QueryBlocks().
		Where(block.TypeEQ(block.TypeEnd)).
		Only(ctx)
	require.NoError(t, err)
	details, err := br.Details(ctx, endBlock)
	require.NoError(t, err)
	params := details.(*models.EndBlock).Params
	require.Len(t, params, 1)
	paramDef, err := ver.VariableDefinition(ctx, params[0])
	require.NoError(t, err)
	require.Equal(t, "param", paramDef.Key)
	require.Equal(t, "param", paramDef.Name())
	blockVariables := params[0].BlockVariables
	require.Len(t, blockVariables, 1)
	refBlock, err := bvr.Block(ctx, blockVariables[0])
	require.NoError(t, err)
	require.Equal(t, startWithNext.ID, refBlock.ID)

	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID, FlowInstancesPolicy: flow.NewInstancesPolicyEnabled})
	require.NoError(t, err)
	require.Equal(t, mainFlow.ID, flw.ID)
	require.Equal(t, "New name", flw.Name)
	blks, err = flw.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Len(t, blks, 3)
	_, err = qr.Node(ctx, draft.ID)
	require.NoError(t, err)
}

func TestStartFlow(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr := r.Mutation()

	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow with no start",
	})
	require.NoError(t, err)
	_, err = draft.QueryFlow().Only(ctx)
	require.NoError(t, err)

	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID, FlowInstancesPolicy: flow.NewInstancesPolicyEnabled})
	require.NoError(t, err)
	_, err = mr.StartFlow(ctx, models.StartFlowInput{
		FlowID: flw.ID,
	})
	require.Error(t, err)
	_, err = mr.AddStartBlock(ctx, draft.ID, models.StartBlockInput{
		Cid: "start",
		ParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "param",
				Type: enum.VariableTypeInt,
			},
		},
	})
	require.NoError(t, err)
	_, err = mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID, FlowInstancesPolicy: flow.NewInstancesPolicyEnabled})
	require.NoError(t, err)
	inputParams := []*flowschema.VariableValue{
		{
			VariableDefinitionKey: "param",
			Value:                 "23",
		},
	}
	instance, err := mr.StartFlow(ctx, models.StartFlowInput{
		FlowID: flw.ID,
		Params: inputParams,
	})
	require.NoError(t, err)
	startBlock, err := instance.QueryBlocks().
		WithBlock().
		Only(ctx)
	require.NoError(t, err)
	require.Equal(t, inputParams, startBlock.Inputs)
	require.NotNil(t, startBlock.Edges.Block)
	require.Equal(t, block.TypeStart, startBlock.Edges.Block.Type)
	require.Equal(t, blockinstance.StatusPending, startBlock.Status)
}

func refString(s string) *string { return &s }
func refInt(s int) *int { return &s }

func TestImportEmptyFlow(t *testing.T) {
	r := newTestResolver(t, withActionFactory(actions.NewFactory()), withTriggerFactory(triggers.NewFactory()))
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr, fdr := r.Mutation(), r.FlowDraft()


	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "First version",
	})
	require.NoError(t, err)
	newName := "Second version"
	description := "Informative description"
	paramDefinitions := []*flowschema.VariableDefinition{
		{
			Key:  "param",
			Type: enum.VariableTypeInt,
		},
	}
	woType, err := mr.AddWorkOrderType(ctx, models.AddWorkOrderTypeInput{
		Name: "SiteSurvey",
	})
	require.NoError(t, err)
	owner := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	trueRole := flowschema.ExitPointRoleTrue
	connectorInputs := []*models.ConnectorInput{
		{
			SourceBlockCid: "start",
			TargetBlockCid: "wo",
		},
		{
			SourceBlockCid: "wo",
			TargetBlockCid: "decision1",
		},
		{
			SourceBlockCid: "decision1",
			SourcePoint: &models.ExitPointInput{
				Cid: pointer.ToString("false"),
			},
			TargetBlockCid: "end",
		},
		{
			SourceBlockCid: "decision1",
			SourcePoint: &models.ExitPointInput{
				Cid: pointer.ToString("true"),
			},
			TargetBlockCid: "trueFalse",
		},
		{
			SourceBlockCid: "trueFalse",
			SourcePoint: &models.ExitPointInput{
				Role: &trueRole,
			},
			TargetBlockCid: "end",
		},
		{
			SourceBlockCid: "trig",
			TargetBlockCid: "shortcut",
		},
	}
	newDraft, err := mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
		ID:                  draft.ID,
		Name:                newName,
		Description:         pointer.ToString(description),
		EndParamDefinitions: paramDefinitions,
		StartBlock: &models.StartBlockInput{
			Cid:              "start",
			ParamDefinitions: paramDefinitions,
		},
		EndBlocks: []*models.EndBlockInput{
			{
				Cid: "end",
				Params: []*models.VariableExpressionInput{
					{
						Type: enum.VariableDefinition,
						VariableDefinitionKey: refString("param"),
						Expression:            "${b_0}",
						BlockVariables: []*models.BlockVariableInput{
							{
								BlockCid:              "start",
								VariableDefinitionKey: "param",
							},
						},
					},
				},
			},
		},
		DecisionBlocks: []*models.DecisionBlockInput{
			{
				Cid: "decision1",
				Routes: []*models.DecisionRouteInput{
					{
						Cid: pointer.ToString("true"),
					},
					{
						Cid: pointer.ToString("false"),
					},
				},
			},
		},
		ActionBlocks: []*models.ActionBlockInput{
			{
				Cid:        "wo",
				ActionType: flowschema.ActionTypeWorkOrder,
				Params: []*models.VariableExpressionInput{
					{
						Type: enum.VariableDefinition,
						VariableDefinitionKey: refString(actions.InputVariableType),
						Expression:            strconv.Itoa(woType.ID),
					},
					{
						Type: enum.VariableDefinition,
						VariableDefinitionKey: refString(actions.InputVariableOwner),
						Expression:            strconv.Itoa(owner.ID),
					},
					{
						Type: enum.PropertyTypeDefinition,
						PropertyTypeID: refInt(1),
						Expression: "\"Property\"",
					},
				},
			},
		},
		TriggerBlocks: []*models.TriggerBlockInput{
			{
				Cid:         "trig",
				TriggerType: flowschema.TriggerTypeWorkOrder,
				Params: []*models.VariableExpressionInput{
					{
						Type: enum.VariableDefinition,
						VariableDefinitionKey: refString(triggers.InputVariableType),
						Expression:            strconv.Quote(triggers.TypeWorkOrderInitiated),
					},
				},
			},
		},
		GotoBlocks: []*models.GotoBlockInput{
			{
				Cid:            "shortcut",
				TargetBlockCid: pointer.ToString("end"),
			},
		},
		TrueFalseBlocks: []*models.TrueFalseBlockInput{
			{
				Cid: "trueFalse",
			},
		},
		Connectors: connectorInputs,
	})
	require.NoError(t, err)
	require.Equal(t, newName, newDraft.Name)
	require.Equal(t, description, *newDraft.Description)
	require.Equal(t, paramDefinitions, newDraft.EndParamDefinitions)
	blocks, err := newDraft.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Len(t, blocks, 7)
	for _, blk := range blocks {
		switch blk.Type {
		case block.TypeStart:
			require.Equal(t, "start", blk.Cid)
			require.Equal(t, paramDefinitions, blk.StartParamDefinitions)
		case block.TypeDecision:
			require.Equal(t, "decision1", blk.Cid)
		case block.TypeAction:
			require.Equal(t, "wo", blk.Cid)
			require.Equal(t, flowschema.ActionTypeWorkOrder, *blk.ActionType)
			require.Len(t, blk.InputParams, 3)
		case block.TypeEnd:
			require.Equal(t, "end", blk.Cid)
			require.Len(t, blk.InputParams, 1)
			require.Len(t, blk.InputParams[0].BlockVariables, 1)
			require.Equal(t, draft.QueryBlocks().Where(block.TypeEQ(block.TypeStart)).OnlyIDX(ctx), blk.InputParams[0].BlockVariables[0].BlockID)
		case block.TypeTrigger:
			require.Equal(t, "trig", blk.Cid)
			require.Equal(t, flowschema.TriggerTypeWorkOrder, *blk.TriggerType)
			require.Len(t, blk.InputParams, 1)
		case block.TypeGoTo:
			require.Equal(t, "shortcut", blk.Cid)
			require.Equal(t, draft.QueryBlocks().Where(block.TypeEQ(block.TypeEnd)).OnlyIDX(ctx), blk.QueryGotoBlock().OnlyIDX(ctx))
		case block.TypeTrueFalse:
			require.Equal(t, "trueFalse", blk.Cid)
		default:
			t.Fatalf("block type not found: %v", blk.Type)
		}
	}
	connectors, err := fdr.Connectors(ctx, newDraft)
	require.NoError(t, err)
	require.Len(t, connectors, 6)
	for _, connector := range connectors {
		sourceBlock, err := connector.Source.QueryParentBlock().Only(ctx)
		require.NoError(t, err)
		targetBlock, err := connector.Target.QueryParentBlock().Only(ctx)
		require.NoError(t, err)
		found := false
		for _, connectorInput := range connectorInputs {
			if sourceBlock.Cid == connectorInput.SourceBlockCid && targetBlock.Cid == connectorInput.TargetBlockCid {
				found = true
			}
		}
		if !found {
			t.Fatalf("failed to find connector. source=%s, target=%s", sourceBlock.Cid, targetBlock.Cid)
		}
	}
}

func TestImportCleanCurrentFlow(t *testing.T) {
	r := newTestResolver(t, withActionFactory(actions.NewFactory()), withTriggerFactory(triggers.NewFactory()))
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr, fdr := r.Mutation(), r.FlowDraft()

	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:        "First version",
		Description: pointer.ToString("Some description"),
	})
	require.NoError(t, err)
	_, err = mr.AddStartBlock(ctx, draft.ID, models.StartBlockInput{
		Cid: "my_start",
		UIRepresentation: &flowschema.BlockUIRepresentation{
			XPosition: 56,
			YPosition: 43,
		},
	})
	require.NoError(t, err)
	_, err = mr.AddEndBlock(ctx, draft.ID, models.EndBlockInput{
		Cid: "my_end",
		UIRepresentation: &flowschema.BlockUIRepresentation{
			XPosition: 106,
			YPosition: 43,
		},
	})
	require.NoError(t, err)
	_, err = mr.AddConnector(ctx, draft.ID, models.ConnectorInput{
		SourceBlockCid: "my_start",
		TargetBlockCid: "my_end",
	})
	require.NoError(t, err)
	draft, err = mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
		ID:   draft.ID,
		Name: "Second version",
	})
	require.NoError(t, err)
	require.Equal(t, "Second version", draft.Name)
	require.Nil(t, draft.Description)
	blocks, err := draft.QueryBlocks().All(ctx)
	require.NoError(t, err)
	require.Empty(t, blocks)
	connectors, err := fdr.Connectors(ctx, draft)
	require.NoError(t, err)
	require.Empty(t, connectors)
}

func TestBadImports(t *testing.T) {
	r := newTestResolver(t, withActionFactory(actions.NewFactory()), withTriggerFactory(triggers.NewFactory()))
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr := r.Mutation()

	draft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:        "First version",
		Description: pointer.ToString("Some description"),
	})
	require.NoError(t, err)
	t.Run("ConnectorWithNonExistentCid", func(t *testing.T) {
		_, err = mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
			ID:   draft.ID,
			Name: "Second version",
			StartBlock: &models.StartBlockInput{
				Cid: "start",
			},
			Connectors: []*models.ConnectorInput{
				{
					SourceBlockCid: "start",
					TargetBlockCid: "midpoint",
				},
			},
		})
		require.Error(t, err)
	})
	t.Run("GotoToNonExistentCid", func(t *testing.T) {
		_, err = mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
			ID:   draft.ID,
			Name: "Second version",
			GotoBlocks: []*models.GotoBlockInput{
				{
					Cid:            "goto",
					TargetBlockCid: pointer.ToString("target"),
				},
			},
		})
		require.Error(t, err)
	})
	t.Run("ReferenceNonExistentCidInVariable", func(t *testing.T) {
		_, err = mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
			ID:   draft.ID,
			Name: "Second version",
			EndParamDefinitions: []*flowschema.VariableDefinition{
				{
					Key:  "param",
					Type: enum.VariableTypeString,
				},
			},
			EndBlocks: []*models.EndBlockInput{
				{
					Cid: "final",
					Params: []*models.VariableExpressionInput{
						{
							Type: enum.VariableDefinition,
							VariableDefinitionKey: refString("param"),
							Expression:            "${b_0}",
							BlockVariables: []*models.BlockVariableInput{
								{
									BlockCid:              "not_exist",
									VariableDefinitionKey: "some_param",
								},
							},
						},
					},
				},
			},
		})
		require.Error(t, err)
	})
	t.Run("CircularDependencyOfVariables", func(t *testing.T) {
		_, err = mr.ImportFlowDraft(ctx, models.ImportFlowDraftInput{
			ID:   draft.ID,
			Name: "Second version",
			EndParamDefinitions: []*flowschema.VariableDefinition{
				{
					Key:  "param",
					Type: enum.VariableTypeString,
				},
			},
			EndBlocks: []*models.EndBlockInput{
				{
					Cid: "final",
					Params: []*models.VariableExpressionInput{
						{
							Type: enum.VariableDefinition,
							VariableDefinitionKey: refString("param"),
							Expression:            "${b_0}",
							BlockVariables: []*models.BlockVariableInput{
								{
									BlockCid:              "trig",
									VariableDefinitionKey: triggers.OutputVariableWorkOrder,
								},
							},
						},
					},
				},
			},
			TriggerBlocks: []*models.TriggerBlockInput{
				{
					Cid:         "trig",
					TriggerType: flowschema.TriggerTypeWorkOrder,
					Params: []*models.VariableExpressionInput{
						{
							Type: enum.VariableDefinition,
							VariableDefinitionKey: refString(triggers.InputVariableType),
							Expression:            "${b_0}",
							BlockVariables: []*models.BlockVariableInput{
								{
									BlockCid:              "final",
									VariableDefinitionKey: "param",
								},
							},
						},
					},
				},
			},
		})
		require.Error(t, err)
	})
}
