// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package authz

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/documentcategory"
	"github.com/facebookincubator/symphony/pkg/ent/predicate"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
)

// DocumentCategoryWritePolicyRule grants write permission to Category Document based on policy.
func DocumentCategoryWritePolicyRule() privacy.MutationRule {
	return privacy.DocumentCategoryMutationRuleFunc(func(ctx context.Context, m *ent.DocumentCategoryMutation) error {
		return privacy.Allow
	})
}

func DocumentCategoryReadPolicyRule() privacy.QueryRule {
	return privacy.DocumentCategoryQueryRuleFunc(func(ctx context.Context, q *ent.DocumentCategoryQuery) error {
		dcPredicate := DocumentCategoryReadRule(ctx)
		if dcPredicate != nil {
			q.Where(dcPredicate)
		}
		return privacy.Skip
	})
}

func DocumentCategoryReadRule(ctx context.Context) predicate.DocumentCategory {
	fmt.Println("===========DocumentCategoryReadPolicyRule:============= ")
	var predicatesDc []predicate.DocumentCategory

	rule := FromContext(ctx).InventoryPolicy.DocumentCategory.Read
	documentCategory, _ := json.Marshal(rule)
	fmt.Println("LEN==",len(rule.DocumentCategoryIds),"-----data==",rule.DocumentCategoryIds,"--------", string(documentCategory))

	predicatesDc = append(predicatesDc, documentcategory.IDIn(rule.DocumentCategoryIds...))
	return documentcategory.Or(predicatesDc...)
}
