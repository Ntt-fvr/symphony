// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package graphgrpc_test

import (
	"context"
	"database/sql"
	"fmt"
	"testing"
	"time"

	entsql "github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/graph/graphgrpc"
	"github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	"github.com/facebookincubator/symphony/graph/graphgrpc/schema/mocks"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/privacy"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/golang/protobuf/ptypes/wrappers"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestMigrateService(t *testing.T) {
	var server mocks.TenantServiceServer
	server.On("Create", mock.Anything, mock.Anything).
		Return(&schema.Tenant{Id: t.Name(), Name: t.Name()}, nil).
		Once()
	defer server.AssertExpectations(t)

	db, err := sql.Open("sqlite3",
		fmt.Sprintf("file:%s-%d?mode=memory&cache=shared&_fk=1",
			t.Name(), time.Now().UnixNano(),
		),
	)
	require.NoError(t, err)
	client := ent.NewClient(
		ent.Driver(
			entsql.OpenDB("sqlite3", db),
		),
	)

	migrate := graphgrpc.NewMigrateService(
		&server, viewer.NewFixedTenancy(client),
	)
	ctx := context.Background()
	_, err = migrate.Create(
		ctx, &wrappers.StringValue{Value: t.Name()},
	)
	require.NoError(t, err)

	_, err = client.User.Query().Count(
		privacy.DecisionContext(ctx, privacy.Allow),
	)
	require.NoError(t, err)
}
