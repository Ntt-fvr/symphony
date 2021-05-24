// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type counterFamilyResolver struct{}

/*func (counterFamilyResolver) Name(_ context.Context, counterFamily *ent.CounterFamily) (string, error) {
	return "", nil
}*/

func (counterFamilyResolver) Counter(ctx context.Context, counterFamily *ent.CounterFamily) ([]*ent.Counter, error) {
	var counter []*ent.Counter
	return counter, nil
}
