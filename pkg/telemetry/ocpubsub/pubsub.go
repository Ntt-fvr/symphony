// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"

	"gocloud.dev/pubsub"
)

type (
	// CDKTopic is the interface extracted from gocloud.dev/pubsub.Topic.
	CDKTopic interface {
		As(interface{}) bool
		ErrorAs(error, interface{}) bool
		Send(context.Context, *pubsub.Message) error
		Shutdown(context.Context) error
	}

	// CDKSubscription is the interface extracted from gocloud.dev/pubsub.Subscription.
	CDKSubscription interface {
		As(interface{}) bool
		ErrorAs(error, interface{}) bool
		Receive(context.Context) (*pubsub.Message, error)
		Shutdown(context.Context) error
	}

	// Topic is an alias to CDKTopic.
	Topic = CDKTopic

	// Subscription extends gocloud.dev/pubsub.Subscription
	// with a ReceiveMessage method.
	Subscription interface {
		CDKSubscription
		ReceiveMessage(context.Context) (context.Context, *pubsub.Message, error)
	}
)

// NewTopic wraps the given topic with a topic
// that instruments outgoing messages.
func NewTopic(topic CDKTopic, opts ...TraceOption) Topic {
	if topic == nil {
		panic("topic is nil")
	}
	topic = NewTraceTopic(topic, opts...)
	topic = NewMetricsTopic(topic)
	return topic
}

// NewSubscription wraps the given subscription with a
// subscription that instruments incoming messages.
func NewSubscription(cdksub CDKSubscription, opts ...TraceOption) Subscription {
	if cdksub == nil {
		panic("subscription is nil")
	}
	sub, ok := cdksub.(Subscription)
	if !ok {
		sub = AddReceiveMessage(cdksub)
	}
	sub = NewTraceSubscription(sub, opts...)
	sub = NewMetricsSubscription(sub)
	return sub
}

// AddReceiveMessage converts a cdk subscription into a subscription.
func AddReceiveMessage(sub CDKSubscription) Subscription {
	return messageReceiver{sub}
}

type messageReceiver struct {
	CDKSubscription
}

func (m messageReceiver) ReceiveMessage(ctx context.Context) (context.Context, *pubsub.Message, error) {
	msg, err := m.Receive(ctx)
	return ctx, msg, err
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
