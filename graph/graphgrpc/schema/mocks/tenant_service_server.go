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

	wrapperspb "google.golang.org/protobuf/types/known/wrapperspb"
)

// TenantServiceServer is an autogenerated mock type for the TenantServiceServer type
type TenantServiceServer struct {
	mock.Mock
}

// Create provides a mock function with given fields: _a0, _a1
func (_m *TenantServiceServer) Create(_a0 context.Context, _a1 *wrapperspb.StringValue) (*schema.Tenant, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *schema.Tenant
	if rf, ok := ret.Get(0).(func(context.Context, *wrapperspb.StringValue) *schema.Tenant); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.Tenant)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *wrapperspb.StringValue) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Delete provides a mock function with given fields: _a0, _a1
func (_m *TenantServiceServer) Delete(_a0 context.Context, _a1 *wrapperspb.StringValue) (*emptypb.Empty, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *wrapperspb.StringValue) *emptypb.Empty); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *wrapperspb.StringValue) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Get provides a mock function with given fields: _a0, _a1
func (_m *TenantServiceServer) Get(_a0 context.Context, _a1 *wrapperspb.StringValue) (*schema.Tenant, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *schema.Tenant
	if rf, ok := ret.Get(0).(func(context.Context, *wrapperspb.StringValue) *schema.Tenant); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.Tenant)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *wrapperspb.StringValue) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// List provides a mock function with given fields: _a0, _a1
func (_m *TenantServiceServer) List(_a0 context.Context, _a1 *emptypb.Empty) (*schema.TenantList, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *schema.TenantList
	if rf, ok := ret.Get(0).(func(context.Context, *emptypb.Empty) *schema.TenantList); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.TenantList)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *emptypb.Empty) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Truncate provides a mock function with given fields: _a0, _a1
func (_m *TenantServiceServer) Truncate(_a0 context.Context, _a1 *wrapperspb.StringValue) (*emptypb.Empty, error) {
	ret := _m.Called(_a0, _a1)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *wrapperspb.StringValue) *emptypb.Empty); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *wrapperspb.StringValue) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
