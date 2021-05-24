// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type vendorResolver struct{}

/*func (vendorResolver) Name(_ context.Context, vendor *ent.Vendor) (string, error) {
	return "", nil
}*/

func (vendorResolver) Countervendorformula(ctx context.Context, vendor *ent.Vendor) ([]*ent.CounterVendorFormula, error) {
	var counterVendorFormula []*ent.CounterVendorFormula
	return counterVendorFormula, nil
}
