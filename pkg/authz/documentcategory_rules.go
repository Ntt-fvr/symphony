// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package authz

import (
	"context"
	"github.com/facebookincubator/symphony/pkg/authz/models"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

func DocumentCategoryCudBasedRule(ctx context.Context, cud *models.DocumentCategoryCud, m *ent.DocumentCategoryMutation) error {
	return privacy.Allow

}
// DocumentCategoryWritePolicyRule grants write permission to Category Document based on policy.
func DocumentCategoryWritePolicyRule() privacy.MutationRule {
	return privacy.DocumentCategoryMutationRuleFunc(func(ctx context.Context, m *ent.DocumentCategoryMutation) error {
		return DocumentCategoryCudBasedRule(ctx, FromContext(ctx).InventoryPolicy.DocumentCategory, m)
	})
}

func DocumentCategoryReadPolicyRule() privacy.QueryRule {
	return privacy.DocumentCategoryQueryRuleFunc(func(ctx context.Context, q *ent.DocumentCategoryQuery) error {
		return privacy.Allow
	})
}
