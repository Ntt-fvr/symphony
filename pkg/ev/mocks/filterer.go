// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	context "context"

	ev "github.com/facebookincubator/symphony/pkg/ev"
	mock "github.com/stretchr/testify/mock"
)

// Filterer is an autogenerated mock type for the Filterer type
type Filterer struct {
	mock.Mock
}

// Filter provides a mock function with given fields: _a0, _a1
func (_m *Filterer) Filter(_a0 context.Context, _a1 *ev.Event) bool {
	ret := _m.Called(_a0, _a1)

	var r0 bool
	if rf, ok := ret.Get(0).(func(context.Context, *ev.Event) bool); ok {
		r0 = rf(_a0, _a1)
	} else {
		r0 = ret.Get(0).(bool)
	}

	return r0
}
