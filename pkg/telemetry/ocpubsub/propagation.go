// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"encoding/base64"

	"go.opencensus.io/trace"
	"go.opencensus.io/trace/propagation"
	"gocloud.dev/pubsub"
)

// Propagation propagate span contexts in pubsub messages.
type Propagation interface {
	SpanContextFromMessage(*pubsub.Message) (trace.SpanContext, bool)
	SpanContextToMessage(trace.SpanContext, *pubsub.Message)
}

// MetadataPropagation propagate span contexts over message metadata.
type MetadataPropagation struct{}

const traceContextKey = "pubsub-trace-bin"

// SpanContextFromMessage returns the SpanContext stored in message.
func (MetadataPropagation) SpanContextFromMessage(msg *pubsub.Message) (_ trace.SpanContext, _ bool) {
	if msg.Metadata == nil {
		return
	}
	s, ok := msg.Metadata[traceContextKey]
	if !ok {
		return
	}
	b, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return
	}
	return propagation.FromBinary(b)
}

// SpanContextToMessage stores the SpanContext in message.
func (MetadataPropagation) SpanContextToMessage(sc trace.SpanContext, msg *pubsub.Message) {
	b := propagation.Binary(sc)
	if b == nil {
		return
	}
	if msg.Metadata == nil {
		msg.Metadata = map[string]string{}
	}
	msg.Metadata[traceContextKey] = base64.StdEncoding.EncodeToString(b)
}
