// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logtest_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/stretchr/testify/assert"
)

func TestTestLogger(t *testing.T) {
	assert.Implements(t, (*logtest.TestingT)(nil), &testing.T{})
	assert.Implements(t, (*logtest.TestingT)(nil), &testing.B{})
	logger := logtest.NewTestLogger(t)
	assert.Equal(t, logger.Background(), logger.For(context.Background()))
}
