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

func MigrateKqiSource(ctx context.Context, logger *zap.Logger) error {
	getConfig()
	client := ent.FromContext(ctx)
	for _, kqiSource := range Config.Kqisource {
		kqiSourceDB, err := client.KqiSource.
			Create().
			SetName(kqiSource).
			Save(ctx)
		if err != nil {
			fmt.Errorf("cannot create users tech: %w", err)
		}
		if kqiSourceDB != nil {
			logger.Info("users tech created", zap.Int("ID", kqiSourceDB.ID))
		}

	}
	return nil
}
