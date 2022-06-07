// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/action"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateFKAction(ctx context.Context, t *testing.T, mr generated.MutationResolver) (*ent.RuleAction, *ent.Execution) {

	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	require.Equal(t, user.StatusActive, u.Status)

	reconciliationRule, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconciliationRule_test_1",
	})
	require.NoError(t, err)

	ruleActionTemplate, err := mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_test_1",
	})
	require.NoError(t, err)

	ruleAction, err := mr.AddRuleAction(ctx, models.AddRuleActionInput{
		ReconciliationRule: reconciliationRule.ID,
		RuleActionTemplate: ruleActionTemplate.ID,
		Operation:          "MANUAL",
	})
	require.NoError(t, err)

	Time, _ := time.Parse(time.RFC3339, "2021-06-23T00:00:00Z")

	execution, err := mr.AddExecution(ctx, models.AddExecutionInput{
		ManualConfirmation: Time,
		User:               u.ID,
	})
	require.NoError(t, err)

	return ruleAction, execution
}

func CreateActions(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, *ent.RuleAction, *ent.Execution) {
	ruleActionID, executionID := CreateFKAction(ctx, t, mr)

	action_1, err := mr.AddAction(ctx, models.AddActionInput{
		RuleAction:   ruleActionID.ID,
		Execution:    executionID.ID,
		Status:       "SUCCESFUL",
		UserAction:   "CONFIRM",
		LogExecution: "No errors log",
	})
	require.NoError(t, err)

	action_2, err := mr.AddAction(ctx, models.AddActionInput{
		RuleAction:   ruleActionID.ID,
		Execution:    executionID.ID,
		Status:       "PENDING",
		UserAction:   "ALARM",
		LogExecution: "No errors log 2",
	})
	require.NoError(t, err)

	return action_1.ID, action_2.ID, ruleActionID, executionID
}

func TestAddAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	ruleActionID, executionID := CreateFKAction(ctx, t, mr)

	_, err := mr.AddAction(ctx, models.AddActionInput{
		RuleAction:   ruleActionID.ID,
		Execution:    executionID.ID,
		Status:       "SUCCESFUL",
		UserAction:   "CONFIRM",
		LogExecution: "No errors log",
	})
	require.NoError(t, err)

	_, err = mr.AddAction(ctx, models.AddActionInput{
		RuleAction:   ruleActionID.ID,
		Execution:    executionID.ID,
		Status:       "PENDING2",
		UserAction:   "ALARM1",
		LogExecution: "No errors log 2",
	})
	require.Error(t, err)

}

func TestEditAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	action_1, action_2, ruleActionID, executionID := CreateActions(ctx, t, mr)

	statusPending := action.StatusPENDING
	userActionConfirm := action.UserActionCONFIRM
	logExecution := "Execution realized with no errors"

	_, err := mr.EditAction(ctx, models.EditActionInput{
		ID:           action_1,
		RuleAction:   &ruleActionID.ID,
		Execution:    &executionID.ID,
		Status:       &statusPending,
		UserAction:   &userActionConfirm,
		LogExecution: &logExecution,
	})
	require.NoError(t, err)

	_, err = mr.EditAction(ctx, models.EditActionInput{
		ID:           action_2,
		RuleAction:   &ruleActionID.ID,
		Execution:    &executionID.ID,
		Status:       &statusPending,
		UserAction:   &userActionConfirm,
		LogExecution: &logExecution,
	})
	require.Error(t, err)
}

func TestRemoveAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	action_1, action_2, _, _ := CreateActions(ctx, t, mr)

	_, err := mr.RemoveAction(ctx, action_1)
	require.NoError(t, err)
	_, err = mr.RemoveAction(ctx, action_2)
	require.NoError(t, err)
	_, err = mr.RemoveAction(ctx, action_1)
	require.Error(t, err)
}
