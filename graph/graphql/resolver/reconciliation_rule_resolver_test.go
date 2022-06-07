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

func CreateReconcilationRules(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {
	reconcilation_rule_1, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconcilation_rule_1",
	})
	require.NoError(t, err)

	reconcilation_rule_2, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconcilation_rule_2",
	})
	require.NoError(t, err)

	return reconcilation_rule_1.ID, reconcilation_rule_2.ID
}

func TestAddReconciliationRule(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, err := mr.AddReconciliationRule(ctx, models.AddReconciliationRuleInput{
		Name: "reconcilation_rule_1",
	})
	require.NoError(t, err)

}

func TestEditReconciliationRule(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	reconcilation_rule_1, reconcilation_rule_2 := CreateReconcilationRules(ctx, t, mr)

	_, err := mr.EditReconciliationRule(ctx, models.EditReconciliationRuleInput{
		ID:   reconcilation_rule_1,
		Name: "reconcilation_rule_3",
	})
	require.NoError(t, err)

	_, err = mr.EditReconciliationRule(ctx, models.EditReconciliationRuleInput{
		ID:   reconcilation_rule_2,
		Name: "reconcilation_rule_3",
	})
	require.Error(t, err)
}

func TestRemoveReconciliationRule(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	reconcilation_rule_1, reconcilation_rule_2 := CreateReconcilationRules(ctx, t, mr)

	_, err := mr.RemoveReconciliationRule(ctx, reconcilation_rule_1)
	require.NoError(t, err)
	_, err = mr.RemoveReconciliationRule(ctx, reconcilation_rule_2)
	require.NoError(t, err)
	_, err = mr.RemoveReconciliationRule(ctx, reconcilation_rule_1)
	require.Error(t, err)
}
