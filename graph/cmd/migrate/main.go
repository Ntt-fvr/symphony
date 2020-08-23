// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"os"

	"github.com/alecthomas/kong"
	"github.com/facebook/ent/dialect"
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/schema"
	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/graph/migrate"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	entmigrate "github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/golang/protobuf/ptypes/empty"
	"go.uber.org/zap"

	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	var cli struct {
		Driver     string     `name:"db-driver" default:"mysql" help:"Database driver name."`
		DSN        string     `name:"db-dsn" placeholder:"<dsn>" required help:"Data source name."`
		DropColumn bool       `help:"Enable column drop."`
		DropIndex  bool       `help:"Enable index drop."`
		Fixture    bool       `help:"Run ent@v0.1.0 migrate fixture."`
		DryRun     bool       `help:"Run in dry run mode."`
		Tenant     string     `placeholder:"<tenant>" help:"Target specific tenant."`
		LogConfig  log.Config `embed`
	}
	kong.Parse(&cli)

	logger, _, _ := log.ProvideLogger(cli.LogConfig)
	driver, err := sql.Open(cli.Driver, cli.DSN)
	if err != nil {
		logger.Background().Fatal("opening database", zap.Error(err))
	}

	ctx := ctxutil.WithSignal(context.Background(), os.Interrupt)
	tenants, err := graphgrpc.NewTenantService(
		func(context.Context) graphgrpc.ExecQueryer {
			return driver.DB()
		},
	).List(ctx, &empty.Empty{})
	if err != nil {
		logger.Background().Fatal("listing tenants", zap.Error(err))
	}

	names := make([]string, 0, len(tenants.Tenants))
	for _, tenant := range tenants.Tenants {
		if cli.Tenant == "" || cli.Tenant == tenant.Name {
			names = append(names, tenant.Name)
		}
	}

	cfg := migrate.MigratorConfig{
		Logger: logger,
		Driver: dialect.Debug(driver),
		Options: []schema.MigrateOption{
			schema.WithFixture(cli.Fixture),
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
