// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type formulaResolver struct{}

/*func (formulaResolver) Name(_ context.Context, formula *ent.Formula) (string, error) {
	return "", nil
}

func (formulaResolver) Active(_ context.Context, formula *ent.Formula) (bool, error) {
	return false, nil
}*/

func (formulaResolver) Countervendorformula(ctx context.Context, formula *ent.Formula) ([]*ent.CounterVendorFormula, error) {
	var counterVendorFormula []*ent.CounterVendorFormula
	return counterVendorFormula, nil
}
