// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub_test

import (
	"reflect"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/trace"
	"gocloud.dev/pubsub"
	"gocloud.dev/pubsub/mempubsub"
)

func TestCDKInterfaces(t *testing.T) {
	tests := []struct {
		name          string
		interfaceType interface{}
		structType    interface{}
	}{
		{
			name:          "Topic",
			interfaceType: (*ocpubsub.Topic)(nil),
			structType:    (*pubsub.Topic)(nil),
		},
		{
			name:          "Subscription",
			interfaceType: (*ocpubsub.Subscription)(nil),
			structType:    ocpubsub.AddReceiveMessage((*pubsub.Subscription)(nil)),
		},
	}
	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			require.Implements(t, tc.interfaceType, tc.structType)
			iface := reflect.TypeOf(tc.interfaceType).Elem()
			concrete := reflect.TypeOf(tc.structType)
			numMethod := iface.NumMethod()
			require.Equal(t, numMethod, concrete.NumMethod())
			for i := 0; i < numMethod; i++ {
				_, ok := concrete.MethodByName(iface.Method(i).Name)
				require.True(t, ok)
			}
		})
	}
}

func TestNewTopicSubscription(t *testing.T) {
	pstopic := mempubsub.NewTopic()
	opt := ocpubsub.WithStartOptions(
		trace.WithSampler(trace.NeverSample()),
	)
	topic := ocpubsub.NewTopic(pstopic, opt)
	require.NotNil(t, topic)
	require.Panics(t, func() { ocpubsub.NewTopic(nil) })
	subscription := ocpubsub.NewSubscription(
		mempubsub.NewSubscription(pstopic, time.Millisecond), opt,
	)
	require.NotNil(t, subscription)
	require.Panics(t, func() { ocpubsub.NewSubscription(nil) })
}
