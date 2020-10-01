// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package hooks_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	action_mocks "github.com/facebookincubator/symphony/pkg/flowengine/actions/mocks"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	trigger_mocks "github.com/facebookincubator/symphony/pkg/flowengine/triggers/mocks"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestEndParamDefinitionsVerifications(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)

	tests := []struct {
		name       string
		inputs     []*flowschema.VariableDefinition
		expectFail bool
	}{
		{
			name: "no_key",
			inputs: []*flowschema.VariableDefinition{
				{
					Type: enum.VariableTypeString,
				},
			},
			expectFail: true,
		},
		{
			name: "empty_name",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:         "param",
					VisibleName: pointer.ToString(""),
					Type:        enum.VariableTypeString,
				},
			},
			expectFail: true,
		},
		{
			name: "no_type",
			inputs: []*flowschema.VariableDefinition{
				{
					Key: "param",
				},
			},
			expectFail: true,
		},
		{
			name: "not_exist_type",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:  "param",
					Type: enum.VariableType("FALSE VALUE"),
				},
			},
			expectFail: true,
		},
		{
			name: "two_good_parameters",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:  "param1",
					Type: enum.VariableTypeString,
				},
				{
					Key:  "param2",
					Type: enum.VariableTypeInt,
				},
			},
			expectFail: false,
		},
		{
			name: "duplicate_key",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:  "param1",
					Type: enum.VariableTypeString,
				},
				{
					Key:  "param1",
					Type: enum.VariableTypeInt,
				},
			},
			expectFail: true,
		},
		{
			name: "duplicate_name",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:         "param1",
					VisibleName: pointer.ToString("Parameter 1"),
					Type:        enum.VariableTypeString,
				},
				{
					Key:         "param2",
					VisibleName: pointer.ToString("Parameter 1"),
					Type:        enum.VariableTypeInt,
				},
			},
			expectFail: true,
		},
		{
			name: "with_multiple_choice_string",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:     "param",
					Type:    enum.VariableTypeString,
					Choices: []string{"\"First\"", "\"Second\""},
				},
			},
			expectFail: false,
		},
		{
			name: "with_multiple_choice_int",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:     "param",
					Type:    enum.VariableTypeInt,
					Choices: []string{"1", "2"},
				},
			},
			expectFail: false,
		},
		{
			name: "with_multiple_choice_wrong_type",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:     "param",
					Type:    enum.VariableTypeInt,
					Choices: []string{"1", "aaa"},
				},
			},
			expectFail: true,
		},
		{
			name: "with_empty_multiple_choice",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:     "param",
					Type:    enum.VariableTypeInt,
					Choices: []string{},
				},
			},
			expectFail: true,
		},
		{
			name: "with_default",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:          "param",
					Type:         enum.VariableTypeString,
					DefaultValue: pointer.ToString("\"Check\""),
				},
			},
			expectFail: false,
		},
		{
			name: "with_default_wrong_type",
			inputs: []*flowschema.VariableDefinition{
				{
					Key:          "param",
					Type:         enum.VariableTypeString,
					DefaultValue: pointer.ToString("22"),
				},
			},
			expectFail: true,
		},
	}

	for i, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			_, err := client.FlowDraft.Create().
				SetName(fmt.Sprintf("Flow_%d", i)).
				SetEndParamDefinitions(tc.inputs).
				Save(ctx)
			if tc.expectFail {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func withTransaction(ctx context.Context, t *testing.T, f func(context.Context, *ent.Client)) error {
	tx, err := ent.FromContext(ctx).Tx(ctx)
	require.NoError(t, err)
	ctx = ent.NewTxContext(ctx, tx)
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
			panic(r)
		}
	}()
	ctx = ent.NewContext(ctx, tx.Client())
	f(ctx, tx.Client())
	return tx.Commit()
}

func TestMandatoryPropertiesEnforcedInFlowNotInDraft(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)
	flowHooker := hooks.Flower{
		TriggerFactory: triggers.NewFactory(),
		ActionFactory:  actions.NewFactory(),
	}
	flowHooker.HookTo(client)

	endParamDefinitions := []*flowschema.VariableDefinition{
		{
			Key:       "mandatory_end_param",
			Type:      enum.VariableTypeString,
			Mandatory: true,
		},
		{
			Key:  "no_mandatory_end_param",
			Type: enum.VariableTypeString,
		},
	}
	err := withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		draft, err := client.FlowDraft.Create().
			SetName("Flow Draft").
			SetEndParamDefinitions(endParamDefinitions).
			Save(ctx)
		require.NoError(t, err)
		_, err = client.Block.Create().
			SetName("End1").
			SetCid("end1").
			SetType(block.TypeEnd).
			SetFlowDraft(draft).
			Save(ctx)
		require.NoError(t, err)
	})
	require.NoError(t, err)
	err = withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		flw, err := client.Flow.Create().
			SetName("Flow").
			SetEndParamDefinitions(endParamDefinitions).
			Save(ctx)
		require.NoError(t, err)
		_, err = client.Block.Create().
			SetName("End").
			SetCid("end").
			SetType(block.TypeEnd).
			SetFlow(flw).
			Save(ctx)
		require.NoError(t, err)
	})
	require.Error(t, err)
	err = withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		flw, err := client.Flow.Create().
			SetName("Flow2").
			SetEndParamDefinitions(endParamDefinitions).
			Save(ctx)
		require.NoError(t, err)
		blk, err := client.Block.Create().
			SetName("End").
			SetCid("end").
			SetType(block.TypeEnd).
			SetFlow(flw).
			Save(ctx)
		require.NoError(t, err)
		err = blk.Update().
			SetInputParams([]*flowschema.VariableExpression{
				{
					BlockID:               blk.ID,
					VariableDefinitionKey: "no_mandatory_end_param",
					Expression:            "\"Something\"",
				},
			}).
			Exec(ctx)
		require.NoError(t, err)
	})
	require.Error(t, err)
	err = withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		flw, err := client.Flow.Create().
			SetName("Flow3").
			SetEndParamDefinitions(endParamDefinitions).
			Save(ctx)
		require.NoError(t, err)
		blk, err := client.Block.Create().
			SetName("End").
			SetCid("end").
			SetType(block.TypeEnd).
			SetFlow(flw).
			Save(ctx)
		require.NoError(t, err)
		err = blk.Update().
			SetInputParams([]*flowschema.VariableExpression{
				{
					BlockID:               blk.ID,
					VariableDefinitionKey: "mandatory_end_param",
					Expression:            "\"Something\"",
				},
			}).
			Exec(ctx)
		require.NoError(t, err)
	})
	require.NoError(t, err)
	err = withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		flw, err := client.Flow.Create().
			SetName("Flow4").
			SetEndParamDefinitions(endParamDefinitions).
			Save(ctx)
		require.NoError(t, err)
		blk, err := client.Block.Create().
			SetName("End").
			SetCid("end").
			SetType(block.TypeEnd).
			SetFlow(flw).
			Save(ctx)
		require.NoError(t, err)
		err = blk.Update().
			SetInputParams([]*flowschema.VariableExpression{
				{
					BlockID:               blk.ID,
					VariableDefinitionKey: "mandatory_end_param",
					Expression:            "\"\"",
				},
			}).
			Exec(ctx)
		require.NoError(t, err)
	})
	require.Error(t, err)
	err = withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
		flw, err := client.Flow.Create().
			SetName("Flow4").
			SetEndParamDefinitions([]*flowschema.VariableDefinition{
				{
					Key:            "mandatory_end_param",
					Type:           enum.VariableTypeString,
					Mandatory:      true,
					MultipleValues: true,
				}}).
			Save(ctx)
		require.NoError(t, err)
		blk, err := client.Block.Create().
			SetName("End").
			SetCid("end").
			SetType(block.TypeEnd).
			SetFlow(flw).
			Save(ctx)
		require.NoError(t, err)
		err = blk.Update().
			SetInputParams([]*flowschema.VariableExpression{
				{
					BlockID:               blk.ID,
					VariableDefinitionKey: "mandatory_end_param",
					Expression:            "[]",
				},
			}).
			Exec(ctx)
		require.NoError(t, err)
	})
	require.Error(t, err)
}

func prepareStringVariableExpressions(keys ...string) []*flowschema.VariableExpression {
	var results []*flowschema.VariableExpression
	for _, key := range keys {
		results = append(results, &flowschema.VariableExpression{
			VariableDefinitionKey: key,
			Expression:            "\"Value\"",
		})
	}
	return results
}

func TestNestedMandatoryPropertiesEnforced(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)
	triggerFactory := trigger_mocks.Factory{}
	flowHooker := hooks.Flower{
		TriggerFactory: &triggerFactory,
		ActionFactory:  actions.NewFactory(),
	}
	flowHooker.HookTo(client)

	triggerDefinitions1 := []*flowschema.VariableDefinition{
		{
			Key:       "mandatory_end_param",
			Type:      enum.VariableTypeString,
			Mandatory: true,
			NestedVariables: func(ctx context.Context, i []interface{}) ([]*flowschema.VariableDefinition, error) {
				return []*flowschema.VariableDefinition{
					{
						Key:  "non_mandatory_nested",
						Type: enum.VariableTypeString,
					},
					{
						Key:       "mandatory_nested",
						Type:      enum.VariableTypeString,
						Mandatory: true,
					},
				}, nil
			},
		},
	}
	triggerDefinitions2 := []*flowschema.VariableDefinition{
		{
			Key:  "non_mandatory_end_param",
			Type: enum.VariableTypeString,
			NestedVariables: func(ctx context.Context, i []interface{}) ([]*flowschema.VariableDefinition, error) {
				return []*flowschema.VariableDefinition{
					{
						Key:  "non_mandatory_nested",
						Type: enum.VariableTypeString,
					},
					{
						Key:       "mandatory_nested",
						Type:      enum.VariableTypeString,
						Mandatory: true,
					},
				}, nil
			},
		},
	}

	tests := []struct {
		name        string
		definitions []*flowschema.VariableDefinition
		inputs      []*flowschema.VariableExpression
		expectFail  bool
	}{
		{
			name:        "def1_no_inputs",
			definitions: triggerDefinitions1,
			expectFail:  true,
		},
		{
			name:        "def1_single_input",
			definitions: triggerDefinitions1,
			inputs:      prepareStringVariableExpressions("mandatory_end_param"),
			expectFail:  true,
		},
		{
			name:        "def1_two_inputs_missing_mandatory",
			definitions: triggerDefinitions1,
			inputs:      prepareStringVariableExpressions("mandatory_end_param", "non_mandatory_nested"),
			expectFail:  true,
		},
		{
			name:        "def1_mandatory_exist",
			definitions: triggerDefinitions1,
			inputs:      prepareStringVariableExpressions("mandatory_end_param", "mandatory_nested"),
			expectFail:  false,
		},
		{
			name:        "def2_no_inputs",
			definitions: triggerDefinitions2,
			expectFail:  false,
		},
		{
			name:        "def2_single_input",
			definitions: triggerDefinitions2,
			inputs:      prepareStringVariableExpressions("non_mandatory_end_param"),
			expectFail:  true,
		},
		{
			name:        "def2_missing_mandatory",
			definitions: triggerDefinitions2,
			inputs:      prepareStringVariableExpressions("non_mandatory_end_param", "non_mandatory_nested"),
			expectFail:  true,
		},
		{
			name:        "def2_with_all",
			definitions: triggerDefinitions2,
			inputs:      prepareStringVariableExpressions("non_mandatory_end_param", "non_mandatory_nested", "mandatory_nested"),
			expectFail:  false,
		},
	}

	for i, tc := range tests {
		triggerType := trigger_mocks.TriggerType{}
		triggerType.On("Variables").
			Return(tc.definitions)
		triggerFactory.On("GetType", mock.Anything).
			Return(&triggerType, nil).
			Times(3)
		t.Run(tc.name, func(t *testing.T) {
			err := withTransaction(ctx, t, func(ctx context.Context, client *ent.Client) {
				flw, err := client.Flow.Create().
					SetName(fmt.Sprintf("Flow %d", i)).
					Save(ctx)
				require.NoError(t, err)
				_, err = client.Block.Create().
					SetName("Trigger").
					SetCid("trigger").
					SetType(block.TypeTrigger).
					SetTriggerType(flowschema.TriggerTypeWorkOrder).
					SetFlow(flw).
					SetInputParams(tc.inputs).
					Save(ctx)
				require.NoError(t, err)
			})
			if tc.expectFail {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestFlowInstanceCreation(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)

	actionFactory := action_mocks.Factory{}
	actionType := action_mocks.ActionType{}
	actionType.On("Variables").
		Return([]*flowschema.VariableDefinition{
			{
				Key:  "key2",
				Type: enum.VariableTypeString,
			},
		})
	actionName := flowschema.ActionTypeWorkOrder
	actionFactory.On("GetType", actionName).
		Return(&actionType, nil)
	flowHooker := hooks.Flower{
		TriggerFactory: triggers.NewFactory(),
		ActionFactory:  &actionFactory,
	}
	flowHooker.HookTo(client)

	flowName := "Some name"
	flowDescription := "Some description"
	endParamDefinitions := []*flowschema.VariableDefinition{
		{
			Key:  "key",
			Type: enum.VariableTypeString,
		},
	}
	endInputParams := []*flowschema.VariableExpression{
		{
			VariableDefinitionKey: "key",
			Expression:            "\"String\"",
		},
	}
	startParamDefinitions := []*flowschema.VariableDefinition{
		{
			Key:  "start_key",
			Type: enum.VariableTypeString,
		},
	}
	flw, err := client.Flow.Create().
		SetName(flowName).
		SetStatus(flow.StatusDisabled).
		SetDescription(flowDescription).
		SetEndParamDefinitions(endParamDefinitions).
		Save(ctx)
	require.NoError(t, err)

	startBlock, err := client.Block.Create().
		SetName("Start").
		SetCid("start").
		SetType(block.TypeStart).
		SetFlow(flw).
		SetStartParamDefinitions(startParamDefinitions).
		Save(ctx)
	require.NoError(t, err)

	actionInputParams := []*flowschema.VariableExpression{
		{
			VariableDefinitionKey: "key2",
			Expression:            "\"${b_0}\"",
			BlockVariables: []*flowschema.BlockVariable{
				{
					BlockID:               startBlock.ID,
					VariableDefinitionKey: "start_key",
				},
			},
		},
	}
	actionBlock, err := client.Block.Create().
		SetName("Action").
		SetCid("action").
		SetType(block.TypeAction).
		SetFlow(flw).
		SetActionType(actionName).
		SetInputParams(actionInputParams).
		AddPrevBlocks(startBlock).
		Save(ctx)
	require.NoError(t, err)
	decisionBlock, err := client.Block.Create().
		SetName("Decision").
		SetCid("decision").
		SetType(block.TypeDecision).
		SetFlow(flw).
		AddPrevBlocks(actionBlock).
		Save(ctx)
	require.NoError(t, err)
	_, err = client.Block.Create().
		SetName("The End").
		SetCid("the_end").
		SetType(block.TypeEnd).
		SetFlow(flw).
		SetInputParams(endInputParams).
		AddPrevBlocks(decisionBlock).
		Save(ctx)
	require.NoError(t, err)
	_, err = client.FlowInstance.Create().
		SetFlow(flw).
		Save(ctx)
	require.Error(t, err)
	err = client.Flow.UpdateOne(flw).
		SetStatus(flow.StatusEnabled).
		Exec(ctx)
	require.NoError(t, err)
	flowInstance, err := client.FlowInstance.Create().
		SetFlow(flw).
		Save(ctx)
	require.NoError(t, err)
	template, err := flowInstance.QueryTemplate().
		Only(ctx)
	require.NoError(t, err)
	require.Equal(t, flowName, template.Name)
	require.Equal(t, flowDescription, *template.Description)
	require.Equal(t, endParamDefinitions, template.EndParamDefinitions)
	blocks, err := template.QueryBlocks().
		WithNextBlocks().
		All(ctx)
	require.NoError(t, err)
	require.Len(t, blocks, 4)

	var newActionInputParams []*flowschema.VariableExpression
	var startBlockID int

	for _, blk := range blocks {
		switch blk.Type {
		case block.TypeStart:
			require.Equal(t, "Start", blk.Name)
			require.Equal(t, startParamDefinitions, blk.StartParamDefinitions)
			require.NotNil(t, blk.Edges.NextBlocks)
			startBlockID = blk.ID
		case block.TypeDecision:
			require.Equal(t, "Decision", blk.Name)
			require.NotNil(t, blk.Edges.NextBlocks)
		case block.TypeAction:
			require.Equal(t, "Action", blk.Name)
			require.Equal(t, actionName, *blk.ActionType)
			require.NotNil(t, blk.Edges.NextBlocks)
			newActionInputParams = blk.InputParams
		case block.TypeEnd:
			require.Equal(t, "The End", blk.Name)
			require.Len(t, blk.InputParams, 1)
			require.Equal(t, blk.ID, blk.InputParams[0].BlockID)
			require.Empty(t, blk.Edges.NextBlocks)
		default:
			t.Fail()
		}
	}
	require.Len(t, newActionInputParams, 1)
	require.Len(t, newActionInputParams[0].BlockVariables, 1)
	require.Equal(t, startBlockID, newActionInputParams[0].BlockVariables[0].BlockID)
}
