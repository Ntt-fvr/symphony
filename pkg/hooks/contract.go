// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package hooks

import (
	"context"
	"time"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/hook"
)

//ContractCloseDateStatus modifies work order close date from status.
func ContractSetStatusByDate() ent.Hook {
	hk := func(next ent.Mutator) ent.Mutator {
		return hook.ContractFunc(func(ctx context.Context, mutation *ent.ContractMutation) (ent.Value, error) {
			effectiveDate, existsEf := mutation.EffectiveDate()
			expirationDate, existsEx := mutation.ExpirationDate()
			if !existsEf || !existsEx {
				return next.Mutate(ctx, mutation)
			}
			if effectiveDate.Before(time.Now()) {
				mutation.SetStatus("PENDING")
			} else if effectiveDate.Before(expirationDate) && expirationDate.After(time.Now()) {
				mutation.SetStatus("ACTIVE")
			} else if expirationDate.Before(time.Now()) {
				mutation.SetStatus("EXPIRE")
			}
			return next.Mutate(ctx, mutation)
		})
	}
	return hook.On(hk, ent.OpCreate|ent.OpUpdateOne|ent.OpUpdate)
}
