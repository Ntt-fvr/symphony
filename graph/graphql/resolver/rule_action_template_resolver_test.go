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

func CreateRuleActionTemplates(ctx context.Context, t *testing.T, mr generated.MutationResolver) (int, int) {

	ruleActionTemplate_1, err := mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_1",
	})
	require.NoError(t, err)

	ruleActionTemplate_2, err := mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_2",
	})
	require.NoError(t, err)

	return ruleActionTemplate_1.ID, ruleActionTemplate_2.ID
}

func TestAddRuleActionTemplate(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()

	_, err := mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_test_1",
	})
	require.NoError(t, err)

	_, err = mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_test_2",
	})
	require.NoError(t, err)

	_, err = mr.AddRuleActionTemplate(ctx, models.AddRuleActionTemplateInput{
		Text: "ruleActionTemplate_test_1",
	})
	require.Error(t, err)
}

func TestEditRuleActionTemplate(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	ruleActionTemplate_1, ruleActionTemplate_2 := CreateRuleActionTemplates(ctx, t, mr)

	_, err := mr.EditRuleActionTemplate(ctx, models.EditRuleActionTemplateInput{
		ID:   ruleActionTemplate_1,
		Text: "ruleActionTemplate_test_1.1",
	})
	require.NoError(t, err)

	_, err = mr.EditRuleActionTemplate(ctx, models.EditRuleActionTemplateInput{
		ID:   ruleActionTemplate_2,
		Text: "ruleActionTemplate_test_1.1",
	})
	require.Error(t, err)
}
func TestRemoveRuleActionTemplate(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()

	ctx := viewertest.NewContext(context.Background(), r.client, viewertest.WithRole(user.RoleOwner))

	mr := r.Mutation()
	ruleActionTemplate_1, ruleActionTemplate_2 := CreateRuleActionTemplates(ctx, t, mr)

	_, err := mr.RemoveRuleActionTemplate(ctx, ruleActionTemplate_1)
	require.NoError(t, err)
	_, err = mr.RemoveRuleActionTemplate(ctx, ruleActionTemplate_2)
	require.NoError(t, err)
	_, err = mr.RemoveRuleActionTemplate(ctx, ruleActionTemplate_1)
	require.Error(t, err)
}
