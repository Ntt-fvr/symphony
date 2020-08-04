// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"

	"go.opencensus.io/trace"
	"gocloud.dev/gcerrors"
	"gocloud.dev/pubsub"
)

// NewTraceTopic wraps the given topic with a topic that
// collects traces for the outgoing messages.
func NewTraceTopic(topic Topic, opts ...TraceOption) Topic {
	return &traceTopic{
		Topic:  topic,
		tracer: newTracer("pubsub.Send", opts),
	}
}

// traceTopic is an topic that collects traces for the outgoing messages.
type traceTopic struct {
	Topic
	tracer
}

// Send delegates the actual send to underlying topic
// and record traces for the message.
func (t *traceTopic) Send(ctx context.Context, msg *pubsub.Message) (err error) {
	ctx, span := trace.StartSpan(ctx,
		t.formatSpanName(ctx, msg),
		t.startOptions...,
	)
	defer func() {
		if err == nil {
			span.AddMessageSendEvent(
				0, msgLen(msg), -1,
			)
		}
		span.SetStatus(traceStatus(err))
		span.End()
	}()
	t.propagation.SpanContextToMessage(
		span.SpanContext(), msg,
	)

	return t.Topic.Send(ctx, msg)
}

// NewTraceSubscription wraps the given subscription with a subscription
// that collects traces for the incoming messages.
func NewTraceSubscription(subscription Subscription, opts ...TraceOption) Subscription {
	return &traceSubscription{
		Subscription: subscription,
		tracer:       newTracer("pubsub.Receive", opts),
	}
}

// traceSubscription is an subscription that collects traces for the incoming messages.
type traceSubscription struct {
	Subscription
	tracer
}

func (s *traceSubscription) Receive(ctx context.Context) (*pubsub.Message, error) {
	msg, err := s.Subscription.Receive(ctx)
	if err != nil {
		return nil, err
	}
	if sc, ok := s.propagation.SpanContextFromMessage(msg); ok {
		_, span := trace.StartSpanWithRemoteParent(ctx,
			s.formatSpanName(ctx, msg), sc, s.startOptions...,
		)
		span.AddMessageReceiveEvent(
			0, msgLen(msg), -1,
		)
		span.End()
	}
	return msg, err
}

func (s *traceSubscription) ReceiveMessage(ctx context.Context) (context.Context, *pubsub.Message, error) {
	ctx, msg, err := s.Subscription.ReceiveMessage(ctx)
	if err != nil {
		return nil, nil, err
	}
	if sc, ok := s.propagation.SpanContextFromMessage(msg); ok {
		var span *trace.Span
		ctx, span = trace.StartSpanWithRemoteParent(ctx,
			s.formatSpanName(ctx, msg), sc, s.startOptions...,
		)
		span.AddMessageReceiveEvent(
			0, msgLen(msg), -1,
		)
	}
	return ctx, msg, err
}

// TraceOption configures pubsub tracing.
type TraceOption func(*tracer)

// WithStartOptions configures trace start options.
func WithStartOptions(opts ...trace.StartOption) TraceOption {
	return func(t *tracer) {
		t.startOptions = append(t.startOptions, opts...)
	}
}

// WithPropagation configures trace propagation method.
func WithPropagation(propagation Propagation) TraceOption {
	return func(t *tracer) {
		t.propagation = propagation
	}
}

// WithNameFormatter configures the function which formats span names.
func WithNameFormatter(f func(context.Context, *pubsub.Message) string) TraceOption {
	return func(t *tracer) {
		t.formatSpanName = f
	}
}

// tracer collects traces for pubsub messages.
type tracer struct {
	startOptions   []trace.StartOption
	propagation    Propagation
	formatSpanName func(context.Context, *pubsub.Message) string
}

func newTracer(defaultSpanName string, opts []TraceOption) tracer {
	var t tracer
	for _, opt := range opts {
		opt(&t)
	}
	if t.propagation == nil {
		t.propagation = MetadataPropagation{}
	}
	if t.formatSpanName == nil {
		t.formatSpanName = func(context.Context, *pubsub.Message) string {
			return defaultSpanName
		}
	}
	return t
}

func traceStatus(err error) trace.Status {
	var status trace.Status
	switch gcerrors.Code(err) {
	case gcerrors.OK:
		status.Code = trace.StatusCodeOK
	case gcerrors.NotFound:
		status.Code = trace.StatusCodeNotFound
	case gcerrors.AlreadyExists:
		status.Code = trace.StatusCodeAlreadyExists
	case gcerrors.InvalidArgument:
		status.Code = trace.StatusCodeInvalidArgument
	case gcerrors.Internal:
		status.Code = trace.StatusCodeInternal
	case gcerrors.Unimplemented:
		status.Code = trace.StatusCodeUnimplemented
	case gcerrors.FailedPrecondition:
		status.Code = trace.StatusCodeFailedPrecondition
	case gcerrors.PermissionDenied:
		status.Code = trace.StatusCodePermissionDenied
	case gcerrors.ResourceExhausted:
		status.Code = trace.StatusCodeResourceExhausted
	case gcerrors.Canceled:
		status.Code = trace.StatusCodeCancelled
	case gcerrors.DeadlineExceeded:
		status.Code = trace.StatusCodeDeadlineExceeded
	default:
		status.Code = trace.StatusCodeUnknown
	}
	if err != nil {
		status.Message = err.Error()
	}
	return status
}
