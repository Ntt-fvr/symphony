// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type counterResolver struct{}

/*func (counterResolver) Name(_ context.Context, counter *ent.Counter) (string, error) {
	return "", nil
}

func (counterResolver) ExternalID(_ context.Context, counter *ent.Counter) (string, error) {
	return "", nil
}*/

func (counterResolver) Countervendorformula(ctx context.Context, counter *ent.Counter) ([]*ent.CounterVendorFormula, error) {
	var counterVendorFormula []*ent.CounterVendorFormula
	return counterVendorFormula, nil
}
