// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"os"
	"time"

	"github.com/alecthomas/kong"
	"github.com/facebook/ent/dialect"
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/schema"
	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/graph/migrate"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	entmigrate "github.com/facebookincubator/symphony/pkg/ent/migrate"
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	"github.com/facebookincubator/symphony/pkg/log"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang/protobuf/ptypes/empty"
	"go.uber.org/zap"
)

func main() {
	var cli struct {
		Driver     string     `name:"db-driver" default:"mysql" help:"Database driver name."`
		DSN        string     `name:"db-dsn" placeholder:"<dsn>" required:"" help:"Data source name."`
		WaitForDB  bool       `name:"wait-for-db" help:"Wait for database to be ready."`
		DropColumn bool       `help:"Enable column drop."`
		DropIndex  bool       `help:"Enable index drop."`
		DryRun     bool       `help:"Run in dry run mode."`
		Tenant     string     `placeholder:"<tenant>" help:"Target specific tenant."`
		LogConfig  log.Config `embed:""`
	}
	kong.Parse(&cli)

	logger, _, _ := log.ProvideLogger(cli.LogConfig)
	driver, err := sql.Open(cli.Driver, cli.DSN)
	if err != nil {
		logger.Background().Fatal("opening database", zap.Error(err))
	}

	ctx := ctxutil.WithSignal(context.Background(), os.Interrupt)
	db := driver.DB()

	if cli.WaitForDB {
		logger := logger.For(ctx)
		logger.Info("waiting for database")
		ticker := time.NewTicker(250 * time.Millisecond)
	loop:
		for {
			select {
			case <-ctx.Done():
				logger.Fatal("database wait interrupted", zap.Error(ctx.Err()))
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
	if cli.Tenant == "" {
		tenants, err := graphgrpc.NewTenantService(
			graphgrpc.FixedDBProvider(driver.DB()),
		).List(ctx, &empty.Empty{})
		if err != nil {
			logger.Background().Fatal("listing tenants", zap.Error(err))
		}
		names = make([]string, 0, len(tenants.Tenants))
		for _, tenant := range tenants.Tenants {
			names = append(names, tenant.Name)
		}
	} else {
		names = append(names, cli.Tenant)
	}

	cfg := migrate.MigratorConfig{
		Logger: logger,
		Driver: dialect.Debug(driver,
			logger.For(ctx).Sugar().Info,
		),
		Options: []schema.MigrateOption{
			schema.WithDropColumn(cli.DropColumn),
			schema.WithDropIndex(cli.DropIndex),
		},
	}
	if cli.DryRun {
		cfg.Creator = func(driver dialect.Driver) migrate.Creator {
			entSchema := entmigrate.NewSchema(driver)
			return migrate.CreatorFunc(func(ctx context.Context, opts ...schema.MigrateOption) error {
				return entSchema.WriteTo(ctx, os.Stdout, opts...)
			})
		}
	}

	if err := migrate.NewMigrator(cfg).Migrate(ctx, names...); err != nil {
		logger.For(ctx).Fatal("migration terminated", zap.Error(err))
	}
}
