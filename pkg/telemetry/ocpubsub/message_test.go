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

func TestMessage(t *testing.T) {
	te := &testExporter{}
	trace.RegisterExporter(te)
	defer trace.UnregisterExporter(te)

	ctx := context.Background()
	topic := mempubsub.NewTopic()
	subscription := mempubsub.NewSubscription(topic, time.Second)
	err := topic.Send(ctx, &pubsub.Message{Body: []byte("baz")})
	require.NoError(t, err)

	msg, err := subscription.Receive(ctx)
	require.NoError(t, err)

	ctx, _ = trace.StartSpan(ctx, t.Name(), trace.WithSampler(trace.AlwaysSample()))
	message := ocpubsub.NewMessage(ctx, msg)
	message.Ack()
	require.Len(t, te.spans, 1)
}
