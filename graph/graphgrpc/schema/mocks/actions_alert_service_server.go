// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	context "context"

	schema "github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	mock "github.com/stretchr/testify/mock"
)

// ActionsAlertServiceServer is an autogenerated mock type for the ActionsAlertServiceServer type
type ActionsAlertServiceServer struct {
	mock.Mock
}

// Trigger provides a mock function with given fields: _a0, _a1
func (_m *ActionsAlertServiceServer) Trigger(_a0 context.Context, _a1 *schema.AlertPayload) (*schema.ExecutionResult, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *schema.ExecutionResult
	if rf, ok := ret.Get(0).(func(context.Context, *schema.AlertPayload) *schema.ExecutionResult); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.ExecutionResult)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *schema.AlertPayload) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
