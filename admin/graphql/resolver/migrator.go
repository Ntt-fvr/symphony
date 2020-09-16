// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebook/ent/dialect"
	entsql "github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/migrate"
)

// Migrator runs tenant schema migration.
type Migrator interface {
	Migrate(context.Context, string) error
}

// migrator run ent schema migrations.
type migrator struct {
	logger  log.Logger
	dialect string
}

// MigratorConfig configures migrator.
type MigratorConfig struct {
	Logger  log.Logger
	Dialect string
}

// NewMigrator creates an ent schema migrator.
func NewMigrator(cfg MigratorConfig) Migrator {
	if cfg.Logger == nil {
		cfg.Logger = log.NewNopLogger()
	}
	if cfg.Dialect == "" {
		cfg.Dialect = dialect.MySQL
	}
	return &migrator{
		logger:  cfg.Logger,
		dialect: cfg.Dialect,
	}
}

// Migrate implements Migrator interface.
func (m *migrator) Migrate(ctx context.Context, tenant string) error {
	migrator := migrate.NewMigrator(
		migrate.MigratorConfig{
			Driver: txDrv{
				dialect: m.dialect,
				Conn: entsql.Conn{
					ExecQuerier: gqlutil.TxFromContext(ctx),
				},
			},
			Logger: m.logger,
		},
	)
	return migrator.Migrate(ctx, tenant)
}

// txDrv implements dialect.Driver over an existing transaction.
type txDrv struct {
	dialect string
	entsql.Conn
}

// Tx returns a no-op tx wrapping txDrv.
func (d txDrv) Tx(context.Context) (dialect.Tx, error) {
	return dialect.NopTx(d), nil
}

// Close is a no-op
func (txDrv) Close() error {
	return nil
}

// Dialect is a mysql dialect.
func (d txDrv) Dialect() string {
	return d.dialect
}
