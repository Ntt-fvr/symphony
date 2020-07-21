// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql_test

import (
	"testing"

	"github.com/facebookincubator/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/stretchr/testify/assert"
)

func TestAnnotation(t *testing.T) {
	assert.Implements(t, (*field.Annotation)(nil), entgql.Annotation{})
}
