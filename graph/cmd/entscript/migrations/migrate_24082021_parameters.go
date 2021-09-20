// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"context"

	"go.uber.org/zap"
)

func MigrateParameters(ctx context.Context, logger *zap.Logger) error {
	MigrateDomains(ctx, logger)
	MigrateTechs(ctx, logger)
	MigrateRuleType(ctx, logger)
	MigrateComparators(ctx, logger)
	MigrateEvenSeverity(ctx, logger)
	MigrateCounterFamily(ctx, logger)
	MigrateVendors(ctx, logger)
	MigrateAlarmStatus(ctx, logger)
	MigrateKpiCategory(ctx, logger)
	MigrateKqiCategory(ctx, logger)
	MigrateKqiPerspective(ctx, logger)
	MigrateKqiTemporalFrecuency(ctx, logger)
	MigrateKqiSource(ctx, logger)
	MigrateRecommendationsCategories(ctx, logger)
	MigrateRecommendationssources(ctx, logger)
	MigrateNetworkType(ctx, logger)
	return nil
}
