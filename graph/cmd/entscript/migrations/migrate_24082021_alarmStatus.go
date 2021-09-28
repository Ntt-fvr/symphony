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

func MigrateAlarmStatus(ctx context.Context, logger *zap.Logger) error {
	getConfig()
	client := ent.FromContext(ctx)
	for _, alarmStatus := range Config.Alarmstatus {
		alarmStatusDB, err := client.AlarmStatus.
			Create().
			SetName(alarmStatus).
			Save(ctx)
		if err != nil {
			fmt.Errorf("cannot create users tech: %w", err)
		}
		if alarmStatusDB != nil {
			logger.Info("users tech created", zap.Int("ID", alarmStatusDB.ID))
		}

	}
	return nil
}
