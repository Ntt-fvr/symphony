// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"
	"strconv"
	"time"

	"go.opencensus.io/stats"
	"go.opencensus.io/tag"
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
	stats.Record(ctx,
		MessagesSentTotal.M(1),
		MessagesSentBytes.M(msgLen(msg)),
	)

	start := time.Now()
	err := t.Topic.Send(ctx, msg)
	elapsed := time.Since(start)

	latency := float64(elapsed) / float64(time.Millisecond)
	measurements := []stats.Measurement{
		MessagesSentLatency.M(latency),
	}
	if err != nil {
		measurements = append(measurements,
			MessagesErrorTotal.M(1),
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

	tags := []tag.Mutator{tag.Upsert(Error, strconv.FormatBool(err != nil))}
	_ = stats.RecordWithTags(ctx, tags,
		MessagesReceivedTotal.M(1),
		MessagesReceivedBytes.M(msgLen(msg)),
	)

	return msg, err
}
