// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// DefaultErrorPresenter adds error unwrapping to graphql.DefaultErrorPresenter.
func DefaultErrorPresenter(ctx context.Context, err error) (gqlerr *gqlerror.Error) {
	if errors.As(err, &gqlerr) {
		if gqlerr.Path == nil {
			gqlerr.Path = graphql.GetFieldContext(ctx).Path()
		}
		return gqlerr
	}
	gqlerr = &gqlerror.Error{
		Message: err.Error(),
		Path:    graphql.GetFieldContext(ctx).Path(),
	}
	var ee graphql.ExtendedError
	if errors.As(err, &ee) {
		gqlerr.Extensions = ee.Extensions()
	}
	return gqlerr
}

// ErrNodeNotFound creates a node not found graphql error.
func ErrNodeNotFound(id interface{}) *gqlerror.Error {
	err := gqlerror.Errorf("Could not resolve to a node with the global id of '%v'", id)
	errcode.Set(err, "NOT_FOUND")
	return err
}
