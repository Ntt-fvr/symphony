// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/facebook/ent/dialect"
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/schema"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	entmigrate "github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/migrate"
	"github.com/facebookincubator/symphony/pkg/viewer"
)

type entMigrator struct {
	logger     log.Logger
	driver     string
	DSN        string
	waitForDB  bool
	dropColumn bool
	dropIndex  bool
	dryRun     bool
	tenant     string
}

func (m entMigrator) migrate() error {
	ctx := ctxutil.WithSignal(context.Background(), os.Interrupt)
	driver, err := sql.Open(m.driver, m.DSN)
	if err != nil {
		return fmt.Errorf("opening database: %w", err)
	}
	db := driver.DB()

	if m.waitForDB {
		logger := m.logger.For(ctx)
		logger.Info("waiting for database")
		ticker := time.NewTicker(250 * time.Millisecond)
	loop:
		for {
			select {
			case <-ctx.Done():
				return fmt.Errorf("database wait interrupted: %w", ctx.Err())
			case <-ticker.C:
				if err := db.PingContext(ctx); err == nil {
					ticker.Stop()
					logger.Info("database is ready")
					break loop
				}
			}
		}
	}

	var names []string
	if m.tenant == "" {
		if names, err = viewer.GetTenantNames(ctx, db); err != nil {
			return fmt.Errorf("listing tenants: %w", err)
		}
	} else {
		names = append(names, m.tenant)
	}

	cfg := migrate.MigratorConfig{
		Logger: m.logger,
		Driver: dialect.Debug(driver,
			m.logger.For(ctx).Sugar().Info,
		),
		Options: []schema.MigrateOption{
			schema.WithDropColumn(m.dropColumn),
			schema.WithDropIndex(m.dropIndex),
		},
	}
	if m.dryRun {
		cfg.Creator = func(driver dialect.Driver) migrate.Creator {
			entSchema := entmigrate.NewSchema(driver)
			return migrate.CreatorFunc(func(ctx context.Context, opts ...schema.MigrateOption) error {
				return entSchema.WriteTo(ctx, os.Stdout, opts...)
			})
		}
	}

	if err := migrate.NewMigrator(cfg).Migrate(ctx, names...); err != nil {
		return fmt.Errorf("migration terminated: %w", err)
	}
	return nil
}
