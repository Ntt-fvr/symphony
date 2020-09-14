// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/facebookincubator/symphony/admin/graphql/exec"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
)

func (r *mutationResolver) CreateTenant(ctx context.Context, input model.CreateTenantInput) (*model.CreateTenantPayload, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) TruncateTenant(ctx context.Context, input model.TruncateTenantInput) (_ *model.TruncateTenantPayload, err error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteTenant(ctx context.Context, input model.DeleteTenantInput) (*model.DeleteTenantPayload, error) {
	if input.ID.ID != 0 {
		r.log.For(ctx).
			Error("tenant with non zero object id",
				zap.Object("id", input.ID),
			)
		return nil, entgql.ErrNodeNotFound(input.ID)
	}
	if _, err := r.Tenant(ctx, input.ID.Tenant); err != nil {
		return nil, err
	}
	if _, err := r.db(ctx).ExecContext(ctx,
		fmt.Sprintf("DROP DATABASE `%s`", viewer.DBName(input.ID.Tenant)),
	); err != nil {
		return nil, r.err(ctx, err, "cannot drop database")
	}
	return &model.DeleteTenantPayload{
		ClientMutationID: input.ClientMutationID,
	}, nil
}

func (r *resolver) Tenant(ctx context.Context, name string) (*model.Tenant, error) {
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
		r.log.For(ctx).Debug(
			"tenant not found",
			zap.String("name", name),
		)
		err := gqlerror.Errorf(
			"Could not find a tenant with name '%s'", name,
		)
		errcode.Set(err, "NOT_FOUND")
		return nil, err
	}
	return model.NewTenant(name), nil
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

type mutationResolver struct{ *resolver }
