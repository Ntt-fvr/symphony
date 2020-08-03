// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"

	"gocloud.dev/pubsub"
)

type (
	// Topic is the interface extracted from gocloud.dev/pubsub.Topic.
	Topic interface {
		As(interface{}) bool
		ErrorAs(error, interface{}) bool
		Send(context.Context, *pubsub.Message) error
		Shutdown(context.Context) error
	}

	// Subscription is the interface extracted from gocloud.dev/pubsub.Subscription.
	Subscription interface {
		As(interface{}) bool
		ErrorAs(error, interface{}) bool
		Receive(context.Context) (*pubsub.Message, error)
		Shutdown(context.Context) error
	}

	// MessageReceiver is the interface for receiving extended pubsub messages.
	MessageReceiver interface {
		ReceiveMessage(context.Context) (Message, error)
	}
)

// NewTopic wraps the given topic with a topic
// that instruments outgoing messages.
func NewTopic(topic Topic, opts ...TraceOption) Topic {
	if topic == nil {
		panic("topic is nil")
	}
	topic = NewTraceTopic(topic, opts...)
	topic = NewMetricsTopic(topic)
	return topic
}

// NewSubscription wraps the given subscription with a
// subscription that instruments incoming messages.
func NewSubscription(subscription Subscription, opts ...TraceOption) Subscription {
	if subscription == nil {
		panic("subscription is nil")
	}
	subscription = NewTraceSubscription(subscription, opts...)
	subscription = NewMetricsSubscription(subscription)
	return subscription
}

func msgLen(msg *pubsub.Message) int64 {
	if msg == nil {
		return 0
	}
	var l int
	for k, v := range msg.Metadata {
		l += len(k) + len(v)
	}
	return int64(l + len(msg.Body))
}
