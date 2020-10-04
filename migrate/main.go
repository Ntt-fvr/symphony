// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"

	"github.com/alecthomas/kong"
	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	"github.com/facebookincubator/symphony/pkg/log"
	_ "github.com/go-sql-driver/mysql"
	"go.uber.org/zap"
)

func main() {
	var cli struct {
		Ent struct {
			Driver     string `name:"ent.db-driver" default:"mysql" help:"Database driver name."`
			DSN        string `name:"ent.db-dsn" placeholder:"<dsn>" required:"" help:"Data source name."`
			WaitForDB  bool   `name:"ent.wait-for-db" help:"Wait for database to be ready."`
			DropColumn bool   `name:"ent.drop-column" help:"Enable column drop."`
			DropIndex  bool   `name:"ent.drop-index" help:"Enable index drop."`
			DryRun     bool   `name:"ent.dry-run" help:"Run in dry run mode."`
			Tenant     string `name:"ent.tenant" placeholder:"<tenant>" help:"Target specific tenant."`
		} `cmd:"ent" help:"Ent migrate."`
		Cadence struct {
			Address         string `name:"cadence.addr" placeholder:"<address>" required:"" env:"CADENCE_ADDR"  help:"Cadence server address."`
			Domain          string `name:"cadence.domain" placeholder:"<domain>" required:"" env:"CADENCE_DOMAIN" help:"Cadence domain name."`
			RetentionInDays int32  `name:"cadence.retention-in-days" placeholder:"<number-of-days>" env:"CADENCE_RETENTION_IN_DAYS" help:"Cadence retention in days."`
		} `cmd:"cadence" help:"Cadence migrate."`
		LogConfig log.Config `embed:""`
	}
	ctx := kong.Parse(&cli)
	logger, _, _ := log.ProvideLogger(cli.LogConfig)

	switch ctx.Command() {
	case "ent":
		migrator := entMigrator{
			logger:     logger,
			driver:     cli.Ent.Driver,
			DSN:        cli.Ent.DSN,
			waitForDB:  cli.Ent.WaitForDB,
			dropColumn: cli.Ent.DropColumn,
			dropIndex:  cli.Ent.DropIndex,
			dryRun:     cli.Ent.DryRun,
			tenant:     cli.Ent.Tenant,
		}
		if err := migrator.migrate(); err != nil {
			logger.For(context.Background()).Fatal("ent migration failed", zap.Error(err))
		}
	case "cadence":
		migrator := cadenceMigrator{
			logger:          logger,
			address:         cli.Cadence.Address,
			domain:          cli.Cadence.Domain,
			retentionInDays: cli.Cadence.RetentionInDays,
		}
		if err := migrator.migrate(context.Background()); err != nil {
			logger.For(context.Background()).Fatal("cadence migration failed", zap.Error(err))
		}
	default:
		logger.For(context.Background()).Fatal("command not found", zap.String("command", ctx.Command()))
	}
}
