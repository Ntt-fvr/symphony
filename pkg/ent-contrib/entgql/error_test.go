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
	"github.com/stretchr/testify/require"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func TestDefaultErrorPresenter(t *testing.T) {
	err := fmt.Errorf("wrapping gqlerr: %w", gqlerror.Errorf("gqlerr"))
	gqlerr := entgql.DefaultErrorPresenter(context.Background(), err)
	assert.Equal(t, "gqlerr", gqlerr.Message)
}

func TestErrNodeNotFound(t *testing.T) {
	err := entgql.ErrNodeNotFound(42)
	require.EqualError(t, err, "input: Could not resolve to a node with the global id of '42'")
	require.Equal(t, "NOT_FOUND", err.Extensions["code"])
}
