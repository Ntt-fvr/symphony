// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/facebookincubator/symphony/pkg/ent"
)

type fileCategoryTypeResolver struct{}

func (fileCategoryTypeResolver) RawValue(ctx context.Context, fileCategoryType *ent.FileCategoryType) (*string, error) {
	raw, err := resolverutil.FileCategoryTypeValue(ctx, fileCategoryType)
	return &raw, err
}
