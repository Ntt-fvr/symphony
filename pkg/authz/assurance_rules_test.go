// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package authz_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/authz/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
)

func TestVendorWritePolicyRule(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	vendor := c.Vendor.Create().
		SetName("Vendor").
		SaveX(ctx)
	createBlock := func(ctx context.Context) error {
		_, err := c.Vendor.Create().
			SetName("New Vendor").
			Save(ctx)
		return err
	}
	updateBlock := func(ctx context.Context) error {
		return c.Vendor.UpdateOne(vendor).
			SetName("Vendor Updated").
			Exec(ctx)
	}
	deleteBlock := func(ctx context.Context) error {
		return c.Vendor.DeleteOne(vendor).
			Exec(ctx)
	}
	runCudPolicyTest(t, cudPolicyTest{
		getCud: func(p *models.PermissionSettings) *models.Cud {
			return p.AssurancePolicy.Templates
		},
		create: createBlock,
		update: updateBlock,
		delete: deleteBlock,
	})
}
