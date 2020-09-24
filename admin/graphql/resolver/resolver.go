// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/hashicorp/go-multierror"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
)

// resolver is a graphql resolver root.
type resolver struct {
	log      log.Logger
	migrator Migrator
}

// Config configures resolver root.
type Config struct {
	Logger   log.Logger
	Migrator Migrator
}

// New creates a resolver root from config.
func New(cfg Config) exec.ResolverRoot {
	if cfg.Logger == nil {
		cfg.Logger = log.NewNopLogger()
	}
	if cfg.Migrator == nil {
		cfg.Migrator = NewMigrator(
			MigratorConfig{
				Logger: cfg.Logger,
			},
		)
	}
	return &resolver{
		log:      cfg.Logger,
		migrator: cfg.Migrator,
	}
}

// db returns the database attached to context.
func (resolver) db(ctx context.Context) gqlutil.ExecQueryer {
	return gqlutil.DBFromContext(ctx)
}

// err logs the passed in err and returns it wrapped in a message.
func (r *resolver) err(ctx context.Context, err error, msg string) error {
	r.log.For(ctx).
		WithOptions(zap.AddCallerSkip(1)).
		Error(msg, zap.Error(err))
	return fmt.Errorf(msg+": %w", err)
}

// errf formats the given string and calls err.
func (r *resolver) errf(ctx context.Context, err error, format string, args ...interface{}) error {
	msg := fmt.Sprintf(format, args...)
	return r.err(ctx, err, msg)
}

// tenant looks up a tenant by name.
func (r *resolver) tenant(ctx context.Context, name string) (*model.Tenant, error) {
	rows, err := r.db(ctx).QueryContext(ctx,
		"SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", viewer.DBName(name),
	)
	if err != nil {
		return nil, r.err(ctx, err, "cannot query information schema")
	}
	defer rows.Close()
	if !rows.Next() {
		return nil, r.err(ctx, sql.ErrNoRows, "cannot prepare count row")
	}
	var n int
	if err := rows.Scan(&n); err != nil {
		return nil, r.err(ctx, err, "cannot scan count row")
	}
	if err := rows.Err(); err != nil {
		return nil, r.err(ctx, err, "cannot read rows")
	}
	if n == 0 {
		err := gqlerror.Errorf(
			"Could not find a tenant with name '%s'", name,
		)
		errcode.Set(err, "NOT_FOUND")
		return nil, err
	}
	return model.NewTenant(name), nil
}

// withTx creates a transaction, runs fn and commits/rolls back the transaction based on error.
func (r *mutationResolver) withTx(ctx context.Context, client *ent.Client, fn func(*ent.Client) error) error {
	logger := r.log.For(ctx)
	tx, err := client.Tx(ctx)
	if err != nil {
		logger.Error("cannot create transaction", zap.Error(err))
		return err
	}
	defer func() {
		if r := recover(); r != nil {
			if err := tx.Rollback(); err != nil {
				logger.Error("cannot rollback transaction", zap.Error(err))
			}
			panic(r)
		}
	}()
	if err := fn(tx.Client()); err != nil {
		if r := tx.Rollback(); r != nil {
			logger.Error("cannot rollback transaction", zap.Error(r))
			err = multierror.Append(err, r)
		}
		return err
	}
	if err := tx.Commit(); err != nil {
		const msg = "cannot commit transaction"
		logger.Error(msg, zap.Error(err))
		return fmt.Errorf(msg+": %w", err)
	}
	return nil
}

// ClientFor implements viewer.Tenancy interface by forwarding
// the call to the tenancy stored in context.
func (resolver) ClientFor(ctx context.Context, name string) (*ent.Client, error) {
	tenancy := viewer.TenancyFromContext(ctx)
	return tenancy.ClientFor(ctx, name)
}
