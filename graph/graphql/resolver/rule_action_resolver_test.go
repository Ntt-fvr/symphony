// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func CreateFKRuleAction(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {
	reconciliationRule_1, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconciliationRule_test_1",
	})
	require.NoError(t, err)

	ruleActionTemplate_1, err := mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_test_1",
	})
	require.NoError(t, err)
	reconciliationRuleID, ruleActionTemplateID := reconciliationRule_1.ID, ruleActionTemplate_1.ID

	return reconciliationRuleID, ruleActionTemplateID
}

func CreateRuleActions(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int, int, int) {
	reconciliationRuleID, ruleActionTemplateID := CreateFKRuleAction(ctx, t, mr)

	ruleAction_1, err := mr.AddRuleAction(ctx, models.AddRuleActionInput{
		ReconciliationRule: reconciliationRuleID,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "MANUAL",
	})
	require.NoError(t, err)

	ruleAction_2, err := mr.AddRuleAction(ctx, models.AddRuleActionInput{
		ReconciliationRule: reconciliationRuleID,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "AUTOMATICO",
	})
	require.NoError(t, err)

	return ruleAction_1.ID, ruleAction_2.ID, reconciliationRuleID, ruleActionTemplateID
}

func TestAddRuleAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	reconciliationRuleID, ruleActionTemplateID := CreateFKRuleAction(ctx, t, mr)

	_, err := mr.AddRuleAction(ctx, models.AddRuleActionInput{
		ReconciliationRule: reconciliationRuleID,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "MANUAL",
	})
	require.NoError(t, err)
}

func TestEditRuleAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	ruleAction_1, _, reconciliationRuleID, ruleActionTemplateID := CreateRuleActions(ctx, t, mr)

	_, err := mr.EditRuleAction(ctx, models.EditRuleActionInput{
		ID:                 ruleAction_1,
		ReconciliationRule: reconciliationRuleID,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "AUTOMATICO",
	})
	require.NoError(t, err)

	_, err = mr.EditRuleAction(ctx, models.EditRuleActionInput{
		ID:                 123,
		ReconciliationRule: reconciliationRuleID,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "NOAPLICA",
	})
	require.Error(t, err)

	_, err = mr.EditRuleAction(ctx, models.EditRuleActionInput{
		ID:                 ruleAction_1,
		ReconciliationRule: 123,
		RuleActionTemplate: ruleActionTemplateID,
		Operation:          "NOAPLICA",
	})
	require.Error(t, err)
}

func TestRemoveRuleAction(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	ruleAction_1, ruleAction_2, _, _ := CreateRuleActions(ctx, t, mr)

	_, err := mr.RemoveRuleAction(ctx, ruleAction_1)
	require.NoError(t, err)
	_, err = mr.RemoveRuleAction(ctx, ruleAction_2)
	require.NoError(t, err)
	_, err = mr.RemoveRuleAction(ctx, ruleAction_1)
	require.Error(t, err)
}
