// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"

	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/VividCortex/mysqlerr"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/go-sql-driver/mysql"
	"github.com/hashicorp/go-multierror"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *mutationResolver) CreateTenant(ctx context.Context, input model.CreateTenantInput) (*model.CreateTenantPayload, error) {
	if _, err := r.db(ctx).ExecContext(ctx,
		fmt.Sprintf(
			"CREATE DATABASE `%s` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin",
			viewer.DBName(input.Name),
		),
	); err != nil {
		var e *mysql.MySQLError
		if errors.As(err, &e) && e.Number == mysqlerr.ER_DB_CREATE_EXISTS {
			err := gqlerror.Errorf("Tenant '%s' exists", input.Name)
			errcode.Set(err, "EXIST")
			return nil, err
		}
		return nil, r.err(ctx, err, "cannot create database")
	}
	if err := r.migrator.Migrate(ctx, input.Name); err != nil {
		return nil, r.err(ctx, err, "cannot run migration")
	}
	return &model.CreateTenantPayload{
		ClientMutationID: input.ClientMutationID,
		Tenant:           model.NewTenant(input.Name),
	}, nil
}

func (r *mutationResolver) TruncateTenant(ctx context.Context, input model.TruncateTenantInput) (*model.TruncateTenantPayload, error) {
	if _, err := r.tenant(ctx, input.Name); err != nil {
		return nil, err
	}
	if err := func() (err error) {
		db := r.db(ctx)
		if _, err := db.ExecContext(ctx, "SET FOREIGN_KEY_CHECKS=0"); err != nil {
			return r.err(ctx, err, "cannot clear foreign key check")
		}
		defer func() {
			if _, e := db.ExecContext(ctx, "SET FOREIGN_KEY_CHECKS=1"); e != nil {
				err = multierror.Append(err, r.err(ctx, e, "cannot set foreign key check"))
			}
		}()
		dbName := viewer.DBName(input.Name)
		for _, table := range migrate.Tables {
			query := fmt.Sprintf("DELETE FROM `%s`.`%s`", dbName, table.Name)
			if _, err := db.ExecContext(ctx, query); err != nil {
				return r.errf(ctx, err, "cannot drop data from %q table", table.Name)
			}
		}
		return nil
	}(); err != nil {
		return nil, err
	}
	return &model.TruncateTenantPayload{
		ClientMutationID: input.ClientMutationID,
		Tenant:           model.NewTenant(input.Name),
	}, nil
}

func (r *mutationResolver) DeleteTenant(ctx context.Context, input model.DeleteTenantInput) (*model.DeleteTenantPayload, error) {
	if _, err := r.db(ctx).ExecContext(ctx,
		fmt.Sprintf("DROP DATABASE `%s`", viewer.DBName(input.ID.Tenant)),
	); err != nil {
		var e *mysql.MySQLError
		if errors.As(err, &e) && e.Number == mysqlerr.ER_DB_DROP_EXISTS {
			return nil, entgql.ErrNodeNotFound(input.ID)
		}
		return nil, r.err(ctx, err, "cannot drop database")
	}
	return &model.DeleteTenantPayload{
		ClientMutationID: input.ClientMutationID,
	}, nil
}

func (r *queryResolver) Tenant(ctx context.Context, name string) (*model.Tenant, error) {
	return r.tenant(ctx, name)
}

func (r *queryResolver) Tenants(ctx context.Context) ([]*model.Tenant, error) {
	rows, err := r.db(ctx).QueryContext(ctx,
		"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?", viewer.DBName("%"),
	)
	if err != nil {
		return nil, r.err(ctx, err, "cannot query information schema")
	}
	defer rows.Close()

	var tenants []*model.Tenant
	for rows.Next() {
		var dbname string
		if err := rows.Scan(&dbname); err != nil {
			return nil, r.err(ctx, err, "cannot read row")
		}
		name := viewer.FromDBName(dbname)
		tenants = append(tenants, model.NewTenant(name))
	}
	if err := rows.Err(); err != nil {
		return nil, r.err(ctx, err, "cannot read rows")
	}
	return tenants, nil
}

// Mutation returns exec.MutationResolver implementation.
func (r *resolver) Mutation() exec.MutationResolver { return &mutationResolver{r} }

// Tenant returns exec.TenantResolver implementation.
func (r *resolver) Tenant() exec.TenantResolver { return &tenantResolver{r} }

type mutationResolver struct{ *resolver }
type tenantResolver struct{ *resolver }
