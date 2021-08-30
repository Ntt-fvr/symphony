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

func MigrateComparators(ctx context.Context, logger *zap.Logger) error {
	getConfig()
	client := ent.FromContext(ctx)
	for _, comparator := range Config.Comparators {
		comparatorDB, err := client.Comparator.
			Create().
			SetName(comparator).
			Save(ctx)
		if err != nil {
			fmt.Errorf("cannot create users tech: %w", err)
		}
		if comparatorDB != nil {
			logger.Info("users tech created", zap.Int("ID", comparatorDB.ID))
		}

	}
	return nil
}
