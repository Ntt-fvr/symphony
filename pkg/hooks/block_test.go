// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package hooks_test

import (
	"context"
	"fmt"
	"strconv"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/hooks"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func getExpressions(key string, value string) []*flowschema.VariableExpression {
	return []*flowschema.VariableExpression{
		{
			VariableDefinitionKey: key,
			Expression:            value,
		},
	}
}

func TestEndParamsVerifications(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)
	flowHooker := hooks.Flower{
		TriggerFactory: triggers.NewFactory(),
		ActionFactory:  actions.NewFactory(),
	}
	flowHooker.HookTo(client)
	v := viewer.FromContext(ctx)
	u := v.(*viewer.UserViewer).User()

	wot1, err := client.WorkOrderType.Create().
		SetName("WOT1").
		Save(ctx)
	require.NoError(t, err)
	wot2, err := client.WorkOrderType.Create().
		SetName("WOT2").
		Save(ctx)
	require.NoError(t, err)
	wot3, err := client.WorkOrderType.Create().
		SetName("WOT3").
		Save(ctx)
	require.NoError(t, err)
	wo, err := client.WorkOrder.Create().
		SetName("WO").
		SetType(wot3).
		SetOwner(u).
		SetCreationDate(time.Now()).
		Save(ctx)
	require.NoError(t, err)

	param1 := "String Parameter"
	param2 := "String List Parameter"
	param3 := "String Parameter With Multiple Choice"
	param4 := "String List Parameter With Multiple Choice"
	param5 := "Int Parameter"
	param6 := "Work Order Parameter"
	param7 := "Work Order Type Parameter"
	flowDraft, err := client.FlowDraft.Create().
		SetName("Name").
		SetEndParamDefinitions([]*flowschema.VariableDefinition{
			{
				Key:  param1,
				Type: enum.VariableTypeString,
			},
			{
				Key:            param2,
				Type:           enum.VariableTypeString,
				MultipleValues: true,
			},
			{
				Key:     param3,
				Type:    enum.VariableTypeString,
				Choices: []string{"\"First\"", "\"Second\"", "\"Third\""},
			},
			{
				Key:            param4,
				Type:           enum.VariableTypeString,
				MultipleValues: true,
				Choices:        []string{"\"First\"", "\"Second\"", "\"Third\""},
			},
			{
				Key:  param5,
				Type: enum.VariableTypeInt,
			},
			{
				Key:  param6,
				Type: enum.VariableTypeWorkOrder,
			},
			{
				Key:     param7,
				Type:    enum.VariableTypeWorkOrderType,
				Choices: []string{strconv.Itoa(wot1.ID), strconv.Itoa(wot2.ID)},
			},
		}).
		Save(ctx)
	require.NoError(t, err)

	tests := []struct {
		name       string
		inputs     []*flowschema.VariableExpression
		expectFail bool
	}{
		{
			name:       "string_match",
			inputs:     getExpressions(param1, "\"Check\""),
			expectFail: false,
		},
		{
			name:       "string_not_match",
			inputs:     getExpressions(param1, "23"),
			expectFail: true,
		},
		{
			name:       "key_not_exists",
			inputs:     getExpressions("not_exists", "23"),
			expectFail: true,
		},
		{
			name: "duplicate_key",
			inputs: []*flowschema.VariableExpression{
				{
					VariableDefinitionKey: param1,
					Expression:            "\"Check1\"",
				},
				{
					VariableDefinitionKey: param1,
					Expression:            "\"Check2\"",
				},
			},
			expectFail: true,
		},
		{
			name: "two_types",
			inputs: []*flowschema.VariableExpression{
				{
					VariableDefinitionKey: param1,
					Expression:            "\"Check1\"",
				},
				{
					VariableDefinitionKey: param5,
					Expression:            "42",
				},
			},
			expectFail: false,
		},
		{
			name:       "single_for_list",
			inputs:     getExpressions(param2, "\"Check\""),
			expectFail: true,
		},
		{
			name:       "list_for_list",
			inputs:     getExpressions(param2, "[\"Check\"]"),
			expectFail: false,
		},
		{
			name:       "choice_not_exists",
			inputs:     getExpressions(param3, "\"First1\""),
			expectFail: true,
		},
		{
			name:       "choice_exists",
			inputs:     getExpressions(param3, "\"First\""),
			expectFail: false,
		},
		{
			name:       "not_all_choice_exists",
			inputs:     getExpressions(param4, "[\"First\", \"Forth\"]"),
			expectFail: true,
		},
		{
			name:       "all_choices_exists",
			inputs:     getExpressions(param4, "[\"First\", \"Second\"]"),
			expectFail: false,
		},
		{
			name:       "valid_work_order",
			inputs:     getExpressions(param6, strconv.Itoa(wo.ID)),
			expectFail: false,
		},
		{
			name:       "invalid_work_order",
			inputs:     getExpressions(param6, "2345"),
			expectFail: true,
		},
		{
			name:       "valid_work_order_type",
			inputs:     getExpressions(param7, strconv.Itoa(wot1.ID)),
			expectFail: false,
		},
		{
			name:       "work_order_type_not_in_choices",
			inputs:     getExpressions(param7, strconv.Itoa(wot3.ID)),
			expectFail: true,
		},
	}

	for i, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			var inputs []*flowschema.VariableExpression
			b, err := client.Block.Create().
				SetFlowDraft(flowDraft).
				SetType(block.TypeEnd).
				SetName(fmt.Sprintf("End_%d", i)).
				Save(ctx)
			require.NoError(t, err)
			for _, input := range tc.inputs {
				input.BlockID = b.ID
				inputs = append(inputs, input)
			}
			err = b.Update().
				SetInputParams(inputs).
				Exec(ctx)
			require.Equal(t, tc.expectFail, err != nil)
		})
	}
}

func TestSimpleSubFlowParamsVerifications(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	client := ent.FromContext(ctx)
	flowHooker := hooks.Flower{
		TriggerFactory: triggers.NewFactory(),
		ActionFactory:  actions.NewFactory(),
	}
	flowHooker.HookTo(client)

	subFlow, err := client.Flow.Create().
		SetName("Name").
		Save(ctx)
	require.NoError(t, err)
	_, err = client.Block.Create().
		SetType(block.TypeStart).
		SetName("Start").
		SetFlow(subFlow).
		SetStartParamDefinitions([]*flowschema.VariableDefinition{
			{
				Key:  "start1",
				Type: enum.VariableTypeString,
			},
		}).
		Save(ctx)
	require.NoError(t, err)

	flowDraft, err := client.FlowDraft.Create().
		SetName("Name").
		Save(ctx)
	require.NoError(t, err)

	tests := []struct {
		name       string
		inputs     []*flowschema.VariableExpression
		expectFail bool
	}{
		{
			name: "key_match",
			inputs: []*flowschema.VariableExpression{
				{
					VariableDefinitionKey: "start1",
					Expression:            "\"Check\"",
				},
			},
			expectFail: false,
		},
		{
			name: "key_not_match",
			inputs: []*flowschema.VariableExpression{
				{
					VariableDefinitionKey: "start2",
					Expression:            "\"Check\"",
				},
			},
			expectFail: true,
		},
	}

	for i, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			var inputs []*flowschema.VariableExpression
			b, err := client.Block.Create().
				SetFlowDraft(flowDraft).
				SetType(block.TypeSubFlow).
				SetSubFlow(subFlow).
				SetName(fmt.Sprintf("SubFlow_%d", i)).
				Save(ctx)
			require.NoError(t, err)
			for _, input := range tc.inputs {
				input.BlockID = b.ID
				inputs = append(inputs, input)
			}
			err = b.Update().
				SetInputParams(inputs).
				Exec(ctx)
			if tc.expectFail {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
