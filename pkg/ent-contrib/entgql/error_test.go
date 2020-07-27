// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/stretchr/testify/assert"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func TestDefaultErrorPresenter(t *testing.T) {
	err := fmt.Errorf("wrapping gqlerr: %w", gqlerror.Errorf("gqlerr"))
	gqlerr := entgql.DefaultErrorPresenter(context.Background(), err)
	assert.Equal(t, "gqlerr", gqlerr.Message)
}
