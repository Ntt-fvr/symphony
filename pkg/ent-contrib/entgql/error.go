// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql

import (
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// ErrNodeNotFound creates a node not found graphql error.
func ErrNodeNotFound(id interface{}) *gqlerror.Error {
	err := gqlerror.Errorf("Could not resolve to a node with the global id of '%v'", id)
	errcode.Set(err, "NOT_FOUND")
	return err
}
