// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	context "context"

	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"

	mock "github.com/stretchr/testify/mock"

	schema "github.com/facebookincubator/symphony/graph/graphgrpc/schema"
)

// UserServiceClient is an autogenerated mock type for the UserServiceClient type
type UserServiceClient struct {
	mock.Mock
}

// Create provides a mock function with given fields: ctx, in, opts
func (_m *UserServiceClient) Create(ctx context.Context, in *schema.AddUserInput, opts ...grpc.CallOption) (*schema.User, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *schema.User
	if rf, ok := ret.Get(0).(func(context.Context, *schema.AddUserInput, ...grpc.CallOption) *schema.User); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*schema.User)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *schema.AddUserInput, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Delete provides a mock function with given fields: ctx, in, opts
func (_m *UserServiceClient) Delete(ctx context.Context, in *schema.UserInput, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *schema.UserInput, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *schema.UserInput, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}