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

func prepareBasicFlow(ctx context.Context, t *testing.T, mr generated.MutationResolver, name string) *ent.Flow {
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
		Name: "Start",
		Cid:  "start",
		ParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "start_param",
				Type: enum.VariableTypeString,
			},
		},
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, draft.ID, models.EndBlockInput{
		Name: "End",
		Cid:  "end",
		Params: []*models.VariableExpressionInput{
			{
				VariableDefinitionKey: "param",
				Expression:            "${b_0}",
				BlockVariables: []*models.BlockVariableInput{
					{
						BlockCid:              startBlock.Cid,
						VariableDefinitionKey: "start_param",
					},
				},
			},
		},
	})
	require.NoError(t, err)
	_, err = mr.AddConnector(ctx, draft.ID, models.ConnectorInput{
		SourceBlockCid: startBlock.Cid,
		TargetBlockCid: endBlock.Cid,
	})
	require.NoError(t, err)
	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{
		FlowDraftID: draft.ID,
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

	mr, qr, fr := r.Mutation(), r.Query(), r.Flow()
	name := "5G Deployment"
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
		Name: "Start",
		Cid:  "start",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, flowDraft.ID, models.EndBlockInput{
		Name: "End",
		Cid:  "end",
	})
	require.NoError(t, err)
	gotoBlock, err := mr.AddGotoBlock(ctx, flowDraft.ID, models.GotoBlockInput{
		Name:           "Shortcut",
		Cid:            "shortcut",
		TargetBlockCid: endBlock.Cid,
	})
	require.NoError(t, err)
	_, err = mr.AddConnector(ctx, flowDraft.ID, models.ConnectorInput{
		SourceBlockCid: startBlock.Cid,
		TargetBlockCid: gotoBlock.Cid,
	})
	require.NoError(t, err)
	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{
		FlowDraftID: flowDraft.ID,
	})
	require.NoError(t, err)
	require.Equal(t, name, flw.Name)
	require.Equal(t, description, *flw.Description)
	require.Equal(t, endParamDefinitions, flw.EndParamDefinitions)
	require.Equal(t, flow.StatusEnabled, flw.Status)
	draft, err := fr.Draft(ctx, flw)
	require.NoError(t, err)
	require.Nil(t, draft)
	_, err = qr.Node(ctx, flowDraft.ID)
	require.Error(t, err)
	blocks, err := fr.Blocks(ctx, flw)
	require.NoError(t, err)
	require.Len(t, blocks, 3)
	for _, blk := range blocks {
		draftExists, err := blk.QueryFlowDraft().Exist(ctx)
		require.NoError(t, err)
		require.False(t, draftExists)
		flowExists, err := blk.QueryFlow().Exist(ctx)
		require.NoError(t, err)
		require.True(t, flowExists)
		switch blk.Type {
		case block.TypeStart:
			require.Equal(t, startBlock.ID, blk.ID)
		case block.TypeGoTo:
			require.Equal(t, gotoBlock.ID, blk.ID)
		case block.TypeEnd:
			require.Equal(t, endBlock.ID, blk.ID)
		default:
			require.Fail(t, "unknown type")
		}
	}
}

func TestCreateDraftFromExistingFlowAndPublish(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	mr, qr, fr, fdr, br, ver, bvr := r.Mutation(), r.Query(), r.Flow(), r.FlowDraft(), r.Block(), r.VariableExpression(), r.BlockVariable()
	subFlow := prepareBasicFlow(ctx, t, mr, "Subflow")
	mainFlow := prepareBasicFlow(ctx, t, mr, "Main")
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
	foundDraft, err := fr.Draft(ctx, mainFlow)
	require.NoError(t, err)
	require.Equal(t, draft.ID, foundDraft.ID)
	foundFlow, err := qr.Node(ctx, mainFlow.ID)
	require.NoError(t, err)
	require.Equal(t, "Main", foundFlow.(*ent.Flow).Name)
	_, err = mr.AddSubflowBlock(ctx, draft.ID, models.SubflowBlockInput{
		Name:   "Blackbox",
		Cid:    "blackbox",
		FlowID: subFlow.ID,
		Params: []*models.VariableExpressionInput{
			{
				VariableDefinitionKey: "start_param",
				Expression:            "\"Start\"",
			},
		},
	})
	require.NoError(t, err)
	blks, err := fdr.Blocks(ctx, draft)
	require.NoError(t, err)
	require.Len(t, blks, 3)
	blks, err = fr.Blocks(ctx, mainFlow)
	require.NoError(t, err)
	require.Len(t, blks, 2)
	startWithNext, err := draft.QueryBlocks().
		Where(block.TypeEQ(block.TypeStart)).
		WithNextBlocks().
		Only(ctx)
	require.NoError(t, err)
	require.Len(t, startWithNext.Edges.NextBlocks, 1)

	endBlock, err := draft.QueryBlocks().
		Where(block.TypeEQ(block.TypeEnd)).
		WithNextBlocks().
		Only(ctx)
	require.NoError(t, err)
	details, err := br.Details(ctx, endBlock)
	require.NoError(t, err)
	params := details.(*models.EndBlock).Params
	require.Len(t, params, 1)
	paramDef, err := ver.Definition(ctx, params[0])
	require.NoError(t, err)
	require.Equal(t, "param", paramDef.Key)
	require.Equal(t, "param", paramDef.Name())
	blockVariables := params[0].BlockVariables
	require.Len(t, blockVariables, 1)
	refBlock, err := bvr.Block(ctx, blockVariables[0])
	require.NoError(t, err)
	require.Equal(t, startWithNext.ID, refBlock.ID)

	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID})
	require.NoError(t, err)
	require.Equal(t, mainFlow.ID, flw.ID)
	require.Equal(t, "New name", flw.Name)
	blks, err = fr.Blocks(ctx, flw)
	require.NoError(t, err)
	require.Len(t, blks, 3)
	_, err = qr.Node(ctx, draft.ID)
	require.Error(t, err)
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
	flw, err := mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID})
	require.NoError(t, err)
	_, err = mr.StartFlow(ctx, models.StartFlowInput{
		FlowID: flw.ID,
	})
	require.Error(t, err)
	draft, err = mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:   "Flow with start",
		FlowID: pointer.ToInt(flw.ID),
	})
	require.NoError(t, err)
	_, err = mr.AddStartBlock(ctx, draft.ID, models.StartBlockInput{
		Name: "Start",
		Cid:  "start",
		ParamDefinitions: []*flowschema.VariableDefinition{
			{
				Key:  "param",
				Type: enum.VariableTypeInt,
			},
		},
	})
	require.NoError(t, err)
	_, err = mr.PublishFlow(ctx, models.PublishFlowInput{FlowDraftID: draft.ID})
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
			TargetBlockCid: "end",
		},
		{
			SourceBlockCid: "decision1",
			TargetBlockCid: "shortcut",
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
			Name:             "Start point",
			ParamDefinitions: paramDefinitions,
		},
		EndBlocks: []*models.EndBlockInput{
			{
				Cid:  "end",
				Name: "Finale",
				Params: []*models.VariableExpressionInput{
					{
						VariableDefinitionKey: "param",
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
				Cid:  "decision1",
				Name: "Decision 1",
			},
		},
		ActionBlocks: []*models.ActionBlockInput{
			{
				Cid:        "wo",
				Name:       "Run work order",
				ActionType: flowschema.ActionTypeWorkOrder,
				Params: []*models.VariableExpressionInput{
					{
						VariableDefinitionKey: actions.InputVariableType,
						Expression:            strconv.Itoa(woType.ID),
					},
					{
						VariableDefinitionKey: actions.InputVariableOwner,
						Expression:            strconv.Itoa(owner.ID),
					},
				},
			},
		},
		TriggerBlocks: []*models.TriggerBlockInput{
			{
				Cid:         "trig",
				Name:        "Work order created",
				TriggerType: flowschema.TriggerTypeWorkOrder,
				Params: []*models.VariableExpressionInput{
					{
						VariableDefinitionKey: triggers.InputVariableType,
						Expression:            strconv.Quote(triggers.TypeWorkOrderInitiated),
					},
				},
			},
		},
		GotoBlocks: []*models.GotoBlockInput{
			{
				Cid:            "shortcut",
				Name:           "Go to End",
				TargetBlockCid: "end",
			},
		},
		Connectors: connectorInputs,
	})
	require.NoError(t, err)
	require.Equal(t, newName, newDraft.Name)
	require.Equal(t, description, *newDraft.Description)
	require.Equal(t, paramDefinitions, newDraft.EndParamDefinitions)
	blocks, err := fdr.Blocks(ctx, newDraft)
	require.NoError(t, err)
	require.Len(t, blocks, 6)
	for _, blk := range blocks {
		switch blk.Type {
		case block.TypeStart:
			require.Equal(t, "start", blk.Cid)
			require.Equal(t, "Start point", blk.Name)
			require.Equal(t, paramDefinitions, blk.StartParamDefinitions)
		case block.TypeDecision:
			require.Equal(t, "decision1", blk.Cid)
			require.Equal(t, "Decision 1", blk.Name)
		case block.TypeAction:
			require.Equal(t, "wo", blk.Cid)
			require.Equal(t, "Run work order", blk.Name)
			require.Equal(t, flowschema.ActionTypeWorkOrder, *blk.ActionType)
			require.Len(t, blk.InputParams, 2)
		case block.TypeEnd:
			require.Equal(t, "end", blk.Cid)
			require.Equal(t, "Finale", blk.Name)
			require.Len(t, blk.InputParams, 1)
			require.Len(t, blk.InputParams[0].BlockVariables, 1)
			require.Equal(t, draft.QueryBlocks().Where(block.TypeEQ(block.TypeStart)).OnlyIDX(ctx), blk.InputParams[0].BlockVariables[0].BlockID)
		case block.TypeTrigger:
			require.Equal(t, "trig", blk.Cid)
			require.Equal(t, "Work order created", blk.Name)
			require.Equal(t, flowschema.TriggerTypeWorkOrder, *blk.TriggerType)
			require.Len(t, blk.InputParams, 1)
		case block.TypeGoTo:
			require.Equal(t, "shortcut", blk.Cid)
			require.Equal(t, "Go to End", blk.Name)
			require.Equal(t, draft.QueryBlocks().Where(block.TypeEQ(block.TypeEnd)).OnlyIDX(ctx), blk.QueryGotoBlock().OnlyIDX(ctx))
		default:
			t.Fatalf("block type not found: %v", blk.Type)
		}
	}
	connectors, err := fdr.Connectors(ctx, newDraft)
	require.NoError(t, err)
	require.Len(t, connectors, 5)
	for _, connector := range connectors {
		require.NotNil(t, connector.FlowDraftID)
		require.Equal(t, draft.ID, *connector.FlowDraftID)
		found := false
		for _, connectorInput := range connectorInputs {
			if connector.SourceBlockCid == connectorInput.SourceBlockCid && connector.TargetBlockCid == connectorInput.TargetBlockCid {
				found = true
			}
		}
		if !found {
			t.Fatalf("failed to find connector. source=%s, target=%s", connector.SourceBlockCid, connector.TargetBlockCid)
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
		Cid:  "my_start",
		Name: "My Start",
		UIRepresentation: &flowschema.BlockUIRepresentation{
			XPosition: 56,
			YPosition: 43,
		},
	})
	require.NoError(t, err)
	_, err = mr.AddEndBlock(ctx, draft.ID, models.EndBlockInput{
		Cid:  "my_end",
		Name: "My End",
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
	blocks, err := fdr.Blocks(ctx, draft)
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
				Cid:  "start",
				Name: "Start point",
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
					Name:           "Shortcut",
					TargetBlockCid: "target",
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
					Cid:  "final",
					Name: "Finale",
					Params: []*models.VariableExpressionInput{
						{
							VariableDefinitionKey: "param",
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
					Cid:  "final",
					Name: "Finale",
					Params: []*models.VariableExpressionInput{
						{
							VariableDefinitionKey: "param",
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
					Name:        "Work order created",
					TriggerType: flowschema.TriggerTypeWorkOrder,
					Params: []*models.VariableExpressionInput{
						{
							VariableDefinitionKey: triggers.InputVariableType,
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
