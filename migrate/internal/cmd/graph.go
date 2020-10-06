// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package cmd

import (
	"context"
	"database/sql"
	"os"
	"time"

	"github.com/facebook/ent/dialect"
	entsql "github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/schema"
	entmigrate "github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/migrate"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/zap"
)

// GraphCmd implements migrate graph command.
type GraphCmd struct {
	Driver     string `name:"db-driver" default:"mysql" help:"Database driver name."`
	DSN        string `name:"db-dsn" placeholder:"<dsn>" required:"" help:"Data source name."`
	WaitForDB  bool   `name:"wait-for-db" help:"Wait for database to be ready."`
	DropColumn bool   `name:"drop-column" help:"Enable column drop."`
	DropIndex  bool   `name:"drop-index" help:"Enable index drop."`
	DryRun     bool   `name:"dry-run" help:"Run in dry run mode."`
	Tenant     string `name:"tenant" placeholder:"<tenant>" help:"Target specific tenant."`
}

// Run runs the migrate graph command.
func (c *GraphCmd) Run(ctx *Context) error {
	drv, err := entsql.Open(c.Driver, c.DSN)
	if err != nil {
		ctx.Error("cannot open database", zap.Error(err))
		return err
	}
	db := drv.DB()
	if c.WaitForDB {
		if err := c.waitForDB(ctx, drv.DB()); err != nil {
			return err
		}
	}
	names, err := c.tenants(ctx, db)
	if err != nil {
		return err
	}
	if err := c.migrator(ctx, drv).Migrate(ctx, names...); err != nil {
		ctx.Error("cannot run migration", zap.Error(err))
		return err
	}
	return nil
}

func (c *GraphCmd) waitForDB(ctx *Context, db *sql.DB) error {
	ticker := time.NewTicker(250 * time.Millisecond)
	defer ticker.Stop()
	ctx.Info("waiting for database")
	for {
		select {
		case <-ctx.Done():
			ctx.Error("database wait interrupted", zap.Error(ctx.Err()))
			return ctx.Err()
		case <-ticker.C:
			if err := db.PingContext(ctx); err == nil {
				ctx.Info("database is ready")
				return nil
			}
		}
	}
}

func (c *GraphCmd) tenants(ctx *Context, db *sql.DB) (names []string, err error) {
	if c.Tenant == "" {
		if names, err = viewer.GetTenantNames(ctx, db); err != nil {
			ctx.Error("cannot list tenants", zap.Error(err))
			return nil, err
		}
	} else {
		names = append(names, c.Tenant)
	}
	return names, nil
}

func (c *GraphCmd) migrator(ctx *Context, drv dialect.Driver) *migrate.Migrator {
	cfg := migrate.MigratorConfig{
		Logger: log.NewDefaultLogger(ctx.Logger),
		Driver: dialect.Debug(drv,
			ctx.Sugar().Info,
		),
		Options: []schema.MigrateOption{
			schema.WithDropColumn(c.DropColumn),
			schema.WithDropIndex(c.DropIndex),
		},
	}
	if c.DryRun {
		cfg.Creator = func(drv dialect.Driver) migrate.Creator {
			entSchema := entmigrate.NewSchema(drv)
			return migrate.CreatorFunc(func(ctx context.Context, opts ...schema.MigrateOption) error {
				return entSchema.WriteTo(ctx, os.Stdout, opts...)
			})
		}
	}
	return migrate.NewMigrator(cfg)
}
