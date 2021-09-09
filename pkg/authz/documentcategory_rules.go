// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package authz

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/authz/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

func DocumentCategoryCudBasedRule(ctx context.Context, cud *models.DocumentCategoryCud, m *ent.DocumentCategoryMutation) error {

	InventoryPolicy, _ := json.Marshal(FromContext(ctx).InventoryPolicy)
	fmt.Println("InventoryPolicy", string(InventoryPolicy))

	n1, _ := m.Name()
	n2, _ := m.ID()
	n3, _ := m.Index()

	fmt.Println("DocumentCategoryMutation", n1, "---", n2, "---", n3 )
	mutation, _ := json.Marshal(m)
	fmt.Println(string(mutation),"---------", mutation)
	return privacy.Allow
	if m.Op().Is(ent.OpCreate) {
		name, exists := m.Name()
		if !exists {
			return privacy.Denyf("creating document category with no Name")
		}
		return allowOrSkipDocumentCategories(cud.Create, name)
	}
	name, exists := m.Name()
	if !exists {
		return privacy.Skip
	}

	if m.Op().Is(ent.OpUpdateOne) {
		return allowOrSkipDocumentCategories(cud.Update, name)
	}
	return allowOrSkipDocumentCategories(cud.Delete, name)
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
