// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"

	"go.opencensus.io/trace"
	"gocloud.dev/pubsub"
)

// Message adds context to pubsub message.
type Message struct {
	*pubsub.Message
	ctx context.Context
}

// NewMessage creates a message from a context and a pubsub message.
func NewMessage(ctx context.Context, msg *pubsub.Message) Message {
	return Message{Message: msg, ctx: ctx}
}

// Context returns the message's context.
func (m Message) Context() context.Context {
	return m.ctx
}

// end the span stored in message context.
func (m Message) end() {
	trace.FromContext(m.ctx).End()
}

// Ack acknowledges the message.
func (m Message) Ack() {
	defer m.end()
	m.Message.Ack()
}

// Nack negatively acknowledges the message.
func (m Message) Nack() {
	defer m.end()
	m.Message.Nack()
}
