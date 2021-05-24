// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type techResolver struct{}

/*func (techResolver) Name(_ context.Context, counter *ent.Tech) (string, error) {
	return "", nil
}*/

func (techResolver) Formula(ctx context.Context, formula *ent.Tech) ([]*ent.Formula, error) {
	var formulaVariable []*ent.Formula
	return formulaVariable, nil
}
