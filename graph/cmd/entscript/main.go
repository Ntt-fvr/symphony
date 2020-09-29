// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"sort"
	"strings"

	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/pkg/authz"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/zap"

	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
)

func main() { // nolint: funlen
	var cli struct {
		DSN        string     `name:"db-dsn" env:"MYSQL_DSN" required:"" help:"Data source name."`
		Tenant     string     `xor:"tenant" help:"Tenant name to target."`
		AllTenants bool       `xor:"tenant" help:"Target all tenants."`
		Features   *url.URL   `name:"features-url" help:"Endpoint to fetch features flags from."`
		User       string     `required:"" help:"Who is running the script."`
		Migration  string     `required:"" help:"Migration script name to run." enum:"${migrations}"`
		LogConfig  log.Config `embed:""`
	}
	kctx := kong.Parse(&cli, kong.Vars{
		"migrations": func() string {
			names := make([]string, 0, len(migrationMap))
			for name := range migrationMap {
				names = append(names, name)
			}
			sort.Strings(names)
			return strings.Join(names, ",")
		}(),
	})
	if cli.Tenant == "" && !cli.AllTenants {
		kctx.Fatalf("missing flags: --tenant or --all-tenants")
	}

	ctx := ctxutil.WithSignal(
		context.Background(),
		os.Interrupt,
	)

	logger := func() *zap.Logger {
		logger, _, _ := log.ProvideLogger(cli.LogConfig)
		mysql.SetLogger(logger)
		return logger.Background()
	}()
	logger.Info("params",
		zap.String("dsn", cli.DSN),
		zap.String("tenant", cli.Tenant),
		zap.Bool("all_tenants", cli.AllTenants),
		zap.String("user", cli.User),
	)

	tenancy, err := viewer.NewMySQLTenancy(cli.DSN, 1)
	if err != nil {
		logger.Fatal("cannot connect to graph database",
			zap.Error(err),
		)
	}

	var tenants []string
	if cli.AllTenants {
		db, err := sql.Open("mysql", cli.DSN)
		if err != nil {
			logger.Fatal("cannot connect to mysql database",
				zap.Error(err),
			)
		}
		if tenants, err = viewer.GetTenantNames(ctx, db); err != nil {
			logger.Fatal("cannot list tenants",
				zap.Error(err),
			)
		}
	} else {
		tenants = append(tenants, cli.Tenant)
	}

	var features viewer.TenantFeatures
	if cli.Features != nil {
		req, _ := http.NewRequestWithContext(
			ctx, http.MethodGet, cli.Features.String(), nil,
		)
		rsp, err := http.DefaultClient.Do(req)
		if err != nil {
			logger.Fatal("cannot get feature flags",
				zap.Error(err),
			)
		}
		defer rsp.Body.Close()
		if err := json.NewDecoder(rsp.Body).Decode(&features); err != nil {
			logger.Fatal("cannot decode feature flags",
				zap.Error(err),
			)
		}
	}

	for _, tenant := range tenants {
		logger := logger.With(zap.String("tenant", tenant))
		client, err := tenancy.ClientFor(ctx, tenant)
		if err != nil {
			logger.Fatal("cannot get ent client",
				zap.Error(err),
			)
		}
		ctx := ent.NewContext(ctx, client)
		v := viewer.NewAutomation(tenant, cli.User, user.RoleOwner,
			viewer.WithFeatures(features[tenant]...),
		)
		ctx = log.NewFieldsContext(ctx, zap.Object("viewer", v))
		ctx = viewer.NewContext(ctx, v)
		permissions, err := authz.Permissions(ctx)
		if err != nil {
			logger.Fatal("cannot get permissions",
				zap.String("user", cli.User),
				zap.Error(err),
			)
		}
		ctx = authz.NewContext(ctx, permissions)

		func() {
			tx, err := client.Tx(ctx)
			if err != nil {
				logger.Fatal("cannot begin transaction", zap.Error(err))
			}
			defer func() {
				if r := recover(); r != nil {
					if err := tx.Rollback(); err != nil {
						logger.Error("cannot rollback transaction", zap.Error(err))
					}
					logger.Panic("application panic", zap.Reflect("error", r))
				}
			}()
			ctx = ent.NewContext(ctx, tx.Client())
			if err := migrationMap[cli.Migration](ctx, logger); err != nil {
				logger.Error("cannot run migration", zap.Error(err))
				if err := tx.Rollback(); err != nil {
					logger.Error("cannot rollback transaction", zap.Error(err))
				}
				return
			}
			if err := tx.Commit(); err != nil {
				logger.Error("cannot commit transaction", zap.Error(err))
			}
		}()
	}
}
