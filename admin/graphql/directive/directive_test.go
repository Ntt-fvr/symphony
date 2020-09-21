// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package directive_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/admin/graphql/directive"
	"github.com/facebookincubator/symphony/admin/graphql/model"
	"github.com/stretchr/testify/require"
)

func TestTenantType(t *testing.T) {
	d := directive.New()
	ctx := context.Background()
	res, err := d.TenantType(ctx, nil, func(ctx context.Context) (interface{}, error) {
		return model.NewTenant(t.Name()).ID, nil
	})
	require.NoError(t, err)
	id, ok := res.(model.ID)
	require.True(t, ok)
	require.Equal(t, t.Name(), id.Tenant)
	require.Zero(t, id.ID)
}
