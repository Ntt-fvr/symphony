// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub_test

import (
	"context"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/trace"
	"gocloud.dev/pubsub"
	"gocloud.dev/pubsub/mempubsub"
)

type testExporter struct {
	spans []*trace.SpanData
}

func (t *testExporter) spanByName(name string) *trace.SpanData {
	for _, span := range t.spans {
		if span.Name == name {
			return span
		}
	}
	return nil
}

func (t *testExporter) ExportSpan(s *trace.SpanData) {
	t.spans = append(t.spans, s)
}

func TestTraces(t *testing.T) {
	te := &testExporter{}
	trace.RegisterExporter(te)
	defer trace.UnregisterExporter(te)

	opts := []ocpubsub.TraceOption{
		ocpubsub.WithStartOptions(
			trace.WithSampler(
				trace.AlwaysSample(),
			),
		),
		ocpubsub.WithPropagation(
			ocpubsub.MetadataPropagation{},
		),
	}
	pstopic := mempubsub.NewTopic()
	const topicSpanName = "test.TopicSend"
	topic := ocpubsub.NewTraceTopic(pstopic,
		append(opts,
			ocpubsub.WithNameFormatter(
				func(context.Context, *pubsub.Message) string {
					return topicSpanName
				},
			),
		)...,
	)
	const subscriptionSpanName = "test.SubscriptionReceive"
	subscription := ocpubsub.NewTraceSubscription(
		mempubsub.NewSubscription(pstopic, time.Second),
		append(opts,
			ocpubsub.WithNameFormatter(
				func(context.Context, *pubsub.Message) string {
					return subscriptionSpanName
				},
			),
		)...,
	)

	ctx, spn := trace.StartSpan(context.Background(),
		t.Name(), trace.WithSampler(trace.AlwaysSample()),
	)
	body := []byte("foobar")
	err := topic.Send(ctx, &pubsub.Message{Body: body})
	require.NoError(t, err)
	spn.End()

	msg, err := subscription.Receive(ctx)
	require.NoError(t, err)
	require.Equal(t, []byte("foobar"), msg.Body)
	require.GreaterOrEqual(t, len(te.spans), 3, "expecting root, send and receive spans")

	parent := te.spanByName(t.Name())
	require.NotNil(t, parent)

	topicSpan := te.spanByName(topicSpanName)
	require.NotNil(t, topicSpan)
	require.Equal(t, topicSpan.Status, trace.Status{Code: trace.StatusCodeOK})
	require.Equal(t, parent.SpanID, topicSpan.ParentSpanID)
	require.Len(t, topicSpan.MessageEvents, 1)
	require.Equal(t, topicSpan.MessageEvents[0].EventType, trace.MessageEventTypeSent)
	require.GreaterOrEqual(t, topicSpan.MessageEvents[0].UncompressedByteSize, int64(len(body)))

	subscriptionSpan := te.spanByName(subscriptionSpanName)
	require.NotNil(t, subscriptionSpan)
	require.Equal(t, subscriptionSpan.Status, trace.Status{Code: trace.StatusCodeOK})
	require.True(t, subscriptionSpan.HasRemoteParent)
	require.Equal(t, topicSpan.SpanID, subscriptionSpan.ParentSpanID)
	require.Len(t, subscriptionSpan.MessageEvents, 1)
	require.Equal(t, subscriptionSpan.MessageEvents[0].EventType, trace.MessageEventTypeRecv)
	require.Equal(t, topicSpan.MessageEvents[0].UncompressedByteSize, subscriptionSpan.MessageEvents[0].UncompressedByteSize)
}
