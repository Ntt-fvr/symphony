// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"
	"errors"
	"time"

	"go.opencensus.io/stats"
	"gocloud.dev/pubsub"
)

// NewMetricsTopic wraps the given topic with a topic that collects
// metrics for the outgoing messages.
func NewMetricsTopic(topic Topic) Topic {
	return metricsTopic{topic}
}

// metricsTopic is an topic that collects metrics for the outgoing messages.
type metricsTopic struct{ Topic }

// Send delegates the actual send to underlying topic and
// record metrics for the message.
func (t metricsTopic) Send(ctx context.Context, msg *pubsub.Message) error {
	stats.Record(ctx, MessagesSentTotal.M(1))

	start := time.Now()
	err := t.Topic.Send(ctx, msg)
	elapsed := time.Since(start)

	latency := float64(elapsed) / float64(time.Millisecond)
	measurements := make([]stats.Measurement, 0, 2)
	measurements = append(measurements,
		MessagesSentLatency.M(latency),
	)
	if err != nil {
		measurements = append(measurements,
			MessagesErrorTotal.M(1),
		)
	} else {
		measurements = append(measurements,
			MessagesSentBytes.M(msgLen(msg)),
		)
	}
	stats.Record(ctx, measurements...)

	return err
}

// NewMetricsSubscription wraps the given subscription with a subscription
// that collects metrics for the incoming messages.
func NewMetricsSubscription(subscription Subscription) Subscription {
	return metricsSubscription{subscription}
}

// metricsSubscription is a subscription that collects metrics for the incoming messages.
type metricsSubscription struct{ Subscription }

func (s metricsSubscription) Receive(ctx context.Context) (*pubsub.Message, error) {
	msg, err := s.Subscription.Receive(ctx)
	if err == nil {
		stats.Record(ctx,
			MessagesReceivedTotal.M(1),
			MessagesReceivedBytes.M(msgLen(msg)),
		)
	} else {
		stats.Record(ctx,
			MessagesReceivedErrorTotal.M(1),
		)
	}
	return msg, err
}

func (s metricsSubscription) ReceiveMessage(ctx context.Context) (Message, error) {
	if r, ok := s.Subscription.(MessageReceiver); ok {
		return r.ReceiveMessage(ctx)
	}
	return Message{}, errors.New("underlying Subscription is not a MessageReceiver")
}
