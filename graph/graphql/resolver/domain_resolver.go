// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
)

type domainResolver struct{}

/*func (domainResolver) Name(ctx context.Context, domain *ent.Domain) (string, error) {
	return "", nil
}
*/
func (domainResolver) Tech(ctx context.Context, domain *ent.Domain) ([]*ent.Tech, error) {
	var tech []*ent.Tech
	return tech, nil
}

func (domainResolver) Kpi(ctx context.Context, domain *ent.Domain) ([]*ent.Kpi, error) {
	var kpi []*ent.Kpi
	return kpi, nil
}
