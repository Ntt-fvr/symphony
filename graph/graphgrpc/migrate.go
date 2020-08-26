// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphgrpc

import (
	"context"

	"github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/golang/protobuf/ptypes/wrappers"
	"go.opencensus.io/trace"
	"google.golang.org/grpc/status"
)

// MigrateService runs migrations on created tenants.
type MigrateService struct {
	schema.TenantServiceServer
	tenancy viewer.Tenancy
}

// NewMigrateService creates a migrate service.
func NewMigrateService(server schema.TenantServiceServer, tenancy viewer.Tenancy) *MigrateService {
	return &MigrateService{TenantServiceServer: server, tenancy: tenancy}
}

// Create delegates tenant creation to underlying
// server following with a schema migration.
func (s *MigrateService) Create(ctx context.Context, name *wrappers.StringValue) (*schema.Tenant, error) {
	tenant, err := s.TenantServiceServer.Create(ctx, name)
	if err != nil {
		return tenant, err
	}
	client, err := s.tenancy.ClientFor(ctx, tenant.Name)
	if err != nil {
		return nil, status.FromContextError(err).Err()
	}
	if err := s.migrate(ctx, tenant, client); err != nil {
		return nil, status.FromContextError(err).Err()
	}
	return tenant, nil
}

func (s *MigrateService) migrate(ctx context.Context, tenant *schema.Tenant, client *ent.Client) (err error) {
	ctx, span := trace.StartSpan(ctx, "ent.Migration")
	defer func() {
		if err != nil {
			span.SetStatus(trace.Status{
				Code:    trace.StatusCodeUnknown,
				Message: err.Error(),
			})
		}
		span.End()
	}()
	span.AddAttributes(
		trace.StringAttribute("tenant", tenant.Name),
	)

	return client.Schema.Create(ctx,
		migrate.WithFixture(false),
		migrate.WithGlobalUniqueID(true),
	)
}
