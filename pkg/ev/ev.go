// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ev

import (
	"context"
	"errors"
	"fmt"
	"sync/atomic"

	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"go.opencensus.io/stats"
	"go.opencensus.io/tag"
	"go.opencensus.io/trace"
	"gocloud.dev/pubsub"
)

// Event contains the information of an event.
type Event struct {
	// Tenant holds the tenant name.
	Tenant string

	// Name holds the event name.
	Name string

	// Object is the event object.
	Object interface{}

	// SpanContext of the event.
	SpanContext trace.SpanContext
}

// traceAttrs returns the trace attributes of the event.
func (e *Event) traceAttrs() []trace.Attribute {
	return []trace.Attribute{
		trace.StringAttribute("tenant", e.Tenant),
		trace.StringAttribute("name", e.Name),
	}
}

// tags returns the tag mutators of the event.
func (e *Event) tags() []tag.Mutator {
	return []tag.Mutator{
		tag.Upsert(KeyEventTenant, e.Tenant),
		tag.Upsert(KeyEventName, e.Name),
	}
}

// Emitter represents types than can emit events.
type Emitter interface {
	Emit(context.Context, *Event) error
	Shutdowner
}

// Receiver receives emitted events.
type Receiver interface {
	Receive(context.Context) (*Event, error)
	Shutdowner
}

// ReceiverOpener represents types than can open receivers.
type ReceiverOpener interface {
	OpenReceiver(context.Context) (Receiver, error)
}

// Shutdowner is the interface wrapping the shutdown method.
type Shutdowner interface {
	Shutdown(context.Context) error
}

const (
	tenantMetaKey = "ev-tenant"
	nameMetaKey   = "ev-name"
)

// TopicEmitter emits events to a pubsub topic.
type TopicEmitter struct {
	topic interface {
		Send(context.Context, *pubsub.Message) error
		Shutdowner
	}
	encoder Encoder
}

// NewTopicEmitter creates an event emitter that writes to a pubsub topic.
func NewTopicEmitter(ctx context.Context, url string, encoder Encoder) (*TopicEmitter, error) {
	topic, err := pubsub.OpenTopic(ctx, url)
	if err != nil {
		return nil, err
	}
	if encoder == nil {
		encoder = BytesEncoder
	}
	return &TopicEmitter{
		topic:   ocpubsub.WrapTopic(topic),
		encoder: encoder,
	}, nil
}

// Emit publishes the event to a pubsub topic.
func (e *TopicEmitter) Emit(ctx context.Context, evt *Event) (err error) {
	ctx, span := trace.StartSpan(ctx, "ev.Emit")
	span.AddAttributes(evt.traceAttrs()...)
	defer func() {
		if err != nil {
			span.SetStatus(trace.Status{
				Code:    trace.StatusCodeUnknown,
				Message: err.Error(),
			})
		}
		span.End()
	}()

	ctx, _ = tag.New(ctx, evt.tags()...)
	defer func() {
		if err == nil {
			stats.Record(ctx, EventEmittedTotal.M(1))
		} else {
			stats.Record(ctx, EventEmitErrorTotal.M(1))
		}
	}()

	return e.emit(ctx, evt)
}

func (e *TopicEmitter) emit(ctx context.Context, evt *Event) error {
	msg := &pubsub.Message{
		Metadata: map[string]string{
			tenantMetaKey: evt.Tenant,
			nameMetaKey:   evt.Name,
		},
	}
	if evt.Object != nil {
		body, err := e.encoder.Encode(ctx, evt.Object)
		if err != nil {
			return fmt.Errorf("cannot encode event object: %w", err)
		}
		msg.Body = body
	}

	return e.topic.Send(ctx, msg)
}

// Shutdown shuts down the topic emitter.
func (e *TopicEmitter) Shutdown(ctx context.Context) error {
	return e.topic.Shutdown(ctx)
}

// TopicSubscriber creates receivers that receive events from a pubsub topic.
type TopicSubscriber struct {
	url     string
	decoder Decoder
}

// NewTopicSubscriber creates an opener which creates
// receivers that receive events from a pubsub topic.
func NewTopicSubscriber(url string, decoder Decoder) *TopicSubscriber {
	if decoder == nil {
		decoder = BytesDecoder
	}
	return &TopicSubscriber{
		url:     url,
		decoder: decoder,
	}
}

// OpenReceiver opens an events receiver that receive events from a pubsub topic.
func (s *TopicSubscriber) OpenReceiver(ctx context.Context) (Receiver, error) {
	subscription, err := pubsub.OpenSubscription(ctx, s.url)
	if err != nil {
		return nil, err
	}
	stats.Record(ctx, EventOpenReceiverTotal.M(
		atomic.AddInt64(&EventOpenReceiverCount, 1),
	))
	return &topicReceiver{
		subscription: ocpubsub.WrapSubscription(subscription),
		decoder:      s.decoder,
	}, nil
}

// topicReceiver is a receiver that receives events from a pubsub topic.
type topicReceiver struct {
	subscription interface {
		Receive(context.Context) (*pubsub.Message, error)
		Shutdowner
	}
	decoder Decoder
}

func (r *topicReceiver) Receive(ctx context.Context) (evt *Event, err error) {
	ctx, span := trace.StartSpan(ctx, "ev.Receive")
	defer func() {
		if err == nil {
			span.AddAttributes(evt.traceAttrs()...)
		} else {
			span.SetStatus(trace.Status{
				Code:    trace.StatusCodeUnknown,
				Message: err.Error(),
			})
		}
		span.End()
	}()

	defer func() {
		if err == nil {
			stats.Record(ctx, EventReceivedTotal.M(1))
		} else {
			stats.Record(ctx, EventReceiveErrorTotal.M(1))
		}
	}()

	return r.receive(ctx)
}

func (r *topicReceiver) receive(ctx context.Context) (*Event, error) {
	msg, err := r.subscription.Receive(ctx)
	if err != nil {
		return nil, err
	}
	defer msg.Ack()
	if msg.Metadata == nil {
		return nil, errors.New("message without metadata")
	}
	tenant, ok := msg.Metadata[tenantMetaKey]
	if !ok {
		return nil, errors.New("message without tenant")
	}
	name, ok := msg.Metadata[nameMetaKey]
	if !ok {
		return nil, errors.New("message without name")
	}
	var obj interface{}
	if msg.Body != nil {
		if obj, err = r.decoder.Decode(ctx, msg.Body); err != nil {
			return nil, fmt.Errorf("cannot decode message body: %w", err)
		}
	}
	sc, _ := ocpubsub.SpanContextFromMessage(msg)

	return &Event{
		Tenant:      tenant,
		Name:        name,
		Object:      obj,
		SpanContext: sc,
	}, nil
}

// Shutdown shuts down the subscription receiver.
func (r *topicReceiver) Shutdown(ctx context.Context) (err error) {
	defer func() {
		if err == nil {
			stats.Record(ctx, EventOpenReceiverTotal.M(
				atomic.AddInt64(&EventOpenReceiverCount, -1),
			))
		}
	}()

	return r.subscription.Shutdown(ctx)
}
