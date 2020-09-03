// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	context "context"

	mock "github.com/stretchr/testify/mock"
	emptypb "google.golang.org/protobuf/types/known/emptypb"

	schema "github.com/facebookincubator/symphony/graph/graphgrpc/schema"
)

// UserServiceServer is an autogenerated mock type for the UserServiceServer type
type UserServiceServer struct {
	mock.Mock
}

// Create provides a mock function with given fields: _a0, _a1
func (_m *UserServiceServer) Create(_a0 context.Context, _a1 *schema.AddUserInput) (*schema.User, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *schema.User
	if rf, ok := ret.Get(0).(func(context.Context, *schema.AddUserInput) *schema.User); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.User)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *schema.AddUserInput) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Delete provides a mock function with given fields: _a0, _a1
func (_m *UserServiceServer) Delete(_a0 context.Context, _a1 *schema.UserInput) (*emptypb.Empty, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *schema.UserInput) *emptypb.Empty); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *schema.UserInput) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
