// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/trace"
	"gocloud.dev/pubsub"
)

func TestMetaPropagation(t *testing.T) {
	var propagation ocpubsub.MetadataPropagation
	require.Implements(t, (*ocpubsub.Propagation)(nil), propagation)
	t.Run("WithSpan", func(t *testing.T) {
		_, span := trace.StartSpan(context.Background(), t.Name(),
			trace.WithSampler(trace.AlwaysSample()),
			trace.WithSpanKind(trace.SpanKindClient),
		)
		defer span.End()
		require.NotEqual(t, trace.SpanContext{}, span.SpanContext())
		var msg pubsub.Message
		propagation.SpanContextToMessage(span.SpanContext(), &msg)
		sc, ok := propagation.SpanContextFromMessage(&msg)
		require.True(t, ok)
		require.Equal(t, span.SpanContext(), sc)
	})
	t.Run("WithoutSpan", func(t *testing.T) {
		msg := &pubsub.Message{Metadata: map[string]string{}}
		propagation.SpanContextToMessage(trace.SpanContext{}, msg)
		_, ok := propagation.SpanContextFromMessage(msg)
		require.False(t, ok)
	})
}
