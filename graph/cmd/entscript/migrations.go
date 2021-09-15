// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"

	"github.com/facebookincubator/symphony/graph/cmd/entscript/migrations"
	"go.uber.org/zap"
)

var migrationMap = map[string]func(context.Context, *zap.Logger) error{
	"sample":                    migrations.MigrateSample,
	"migrate_project_templates": migrations.MigrateProjectTemplates,
	"migrate_workorder_status":  migrations.MigrateWorkOrderStatus,
	"techs":                     migrations.MigrateTechs,
	"domains":                   migrations.MigrateDomains,
	"ruleTypes":                 migrations.MigrateRuleType,
	"comparators":               migrations.MigrateComparators,
	"eventSeverity":             migrations.MigrateEvenSeverity,
	"counterFamily":             migrations.MigrateCounterFamily,
	"vendors":                   migrations.MigrateVendors,
	"alarmStatus":               migrations.MigrateAlarmStatus,
	"kpiCategory":               migrations.MigrateKpiCategory,
	"kqiCategory":               migrations.MigrateKqiCategory,
	"kqiPerspective":            migrations.MigrateKqiPerspective,
	"kqiTemporalFrecuency":      migrations.MigrateKqiTemporalFrecuency,
	"kqiSource":                 migrations.MigrateKqiSource,
	"recommendationsCategories": migrations.MigrateRecommendationsCategories,
	"recommendationssources":    migrations.MigrateRecommendationssources,
	"parameters":                migrations.MigrateParameters,
}
