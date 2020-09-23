// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"database/sql"

	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

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

// tenantIDs returns a list tenant ids.
func (r *resolver) tenantIDs(ctx context.Context) ([]*model.ID, error) {
	tenants, err := r.Query().Tenants(ctx)
	if err != nil {
		return nil, err
	}
	ids := make([]*model.ID, len(tenants))
	for i := range tenants {
		ids[i] = &tenants[i].ID
	}
	return ids, nil
}
