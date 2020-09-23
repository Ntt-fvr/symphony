// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql_test

import (
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/stretchr/testify/require"
)

func TestErrNodeNotFound(t *testing.T) {
	err := entgql.ErrNodeNotFound(42)
	require.EqualError(t, err, "input: Could not resolve to a node with the global id of '42'")
	require.Equal(t, "NOT_FOUND", err.Extensions["code"])
}
