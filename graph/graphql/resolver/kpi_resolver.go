// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type kpiResolver struct{}

/*func (kpiResolver) Name(_ context.Context, counter *ent.Kpi) (string, error) {
	return "", nil
}*/

func (kpiResolver) Formula(ctx context.Context, formula *ent.Kpi) ([]*ent.Formula, error) {
	var formulaVariable []*ent.Formula
	return formulaVariable, nil
}
