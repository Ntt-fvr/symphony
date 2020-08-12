// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"

	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"go.uber.org/zap"
	"gopkg.in/alecthomas/kingpin.v2"

	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
)

func main() {
	kingpin.HelpFlag.Short('h')
	dsn := kingpin.Flag("db-dsn", "data source name").Envar("MYSQL_DSN").Required().String()
	tenantName := kingpin.Flag("tenant", "tenant name to target. \"ALL\" for running on all tenants").Required().String()
	username := kingpin.Flag("user", "who is running the script (for logging purposes)").Required().String()
	migrationName := kingpin.Flag("migration", "migration script name to run").Required().String()
	logcfg := log.AddFlags(kingpin.CommandLine)
	kingpin.Parse()

	logger, _, _ := log.ProvideLogger(*logcfg)
	ctx := context.Background()
	logger.For(ctx).Info("params",
		zap.Stringp("dsn", dsn),
		zap.Stringp("tenant", tenantName),
		zap.Stringp("user", username),
	)
	tenancy, err := viewer.NewMySQLTenancy(*dsn, 1)
	if err != nil {
		logger.For(ctx).Fatal("cannot connect to graph database",
			zap.Stringp("dsn", dsn),
			zap.Error(err),
		)
	}
	mysql.SetLogger(logger)

	var migration migrationFunc

	if res, ok := migrationMap[*migrationName]; ok {
		migration = res
	} else {
		logger.For(ctx).Fatal("cannot find migration function",
			zap.Stringp("name", migrationName),
		)
	}

	driver, err := sql.Open("mysql", *dsn)
	if err != nil {
		logger.For(ctx).Fatal("cannot connect sql database",
			zap.Stringp("dsn", dsn),
			zap.Error(err),
		)
	}

	tenants, err := getTenantList(ctx, driver, tenantName)
	if err != nil {
		logger.For(ctx).Fatal("cannot get tenants to run on",
			zap.Stringp("dsn", dsn),
			zap.Stringp("tenant", tenantName),
			zap.Error(err),
		)
	}

	for _, tenant := range tenants {
		client, err := tenancy.ClientFor(ctx, tenant)
		if err != nil {
			logger.For(ctx).Fatal("cannot get ent client for tenant",
				zap.String("tenant", tenant),
				zap.Error(err),
			)
		}
		ctx := ent.NewContext(ctx, client)
		v := viewer.NewAutomation(tenant, *username, user.RoleOwner)
		ctx = log.NewFieldsContext(ctx, zap.Object("viewer", v))
		ctx = viewer.NewContext(ctx, v)
		permissions, err := authz.Permissions(ctx)
		if err != nil {
			logger.For(ctx).Fatal("cannot get permissions",
				zap.String("tenant", tenant),
				zap.Stringp("user", username),
				zap.Error(err),
			)
		}
		ctx = authz.NewContext(ctx, permissions)

		func() {
			tx, err := client.Tx(ctx)
			if err != nil {
				logger.For(ctx).Fatal("cannot begin transaction", zap.Error(err))
			}
			defer func() {
				if r := recover(); r != nil {
					if err := tx.Rollback(); err != nil {
						logger.For(ctx).Error("cannot rollback transaction", zap.Error(err))
					}
					logger.For(ctx).Panic("application panic", zap.Reflect("error", r))
				}
			}()
			ctx = ent.NewContext(ctx, tx.Client())
			if err := migration(ctx, logger); err != nil {
				logger.For(ctx).Error("failed to run function", zap.Error(err))
				if err := tx.Rollback(); err != nil {
					logger.For(ctx).Error("cannot rollback transaction", zap.Error(err))
				}
				return
			}
			if err := tx.Commit(); err != nil {
				logger.For(ctx).Error("cannot commit transaction", zap.Error(err))
			}
		}()
	}
}

func getTenantList(ctx context.Context, driver *sql.Driver, tenant *string) ([]string, error) {
	if *tenant != "ALL" {
		return []string{*tenant}, nil
	}
	rows, err := driver.DB().QueryContext(ctx,
		"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?", viewer.DBName("%"),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var tenants []string
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		name = viewer.FromDBName(name)
		tenants = append(tenants, name)
	}
	return tenants, nil
}
