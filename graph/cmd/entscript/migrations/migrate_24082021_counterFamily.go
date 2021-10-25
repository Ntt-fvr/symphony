// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"go.uber.org/zap"
)

func MigrateCounterFamily(ctx context.Context, logger *zap.Logger) error {
	getConfig()
	client := ent.FromContext(ctx)
	for _, CounterFamily := range Config.Counterfamilies {
		CounterFamilyDB, err := client.CounterFamily.
			Create().
			SetName(CounterFamily).
			Save(ctx)
		if err != nil {
			fmt.Errorf("cannot create users tech: %w", err)
		}
		if CounterFamilyDB != nil {
			logger.Info("users tech created", zap.Int("ID", CounterFamilyDB.ID))
		}

	}
	return nil
}
