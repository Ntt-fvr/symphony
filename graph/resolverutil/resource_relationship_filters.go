// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/pkg/errors"
)

func handleResourceRelationshipFilter(q *ent.ResourceRelationshipQuery, filter *models.ResourceRelationshipFilterInput) (*ent.ResourceRelationshipQuery, error) {

	return nil, errors.Errorf("filter type is not supported: %s", filter.FilterType)
}
