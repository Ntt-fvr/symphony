// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import (
	"context"

	"gocloud.dev/pubsub"
)

// Topic is the interface extracted from gocloud.dev/pubsub.Topic.
type Topic interface {
	As(interface{}) bool
	ErrorAs(error, interface{}) bool
	Send(context.Context, *pubsub.Message) error
	Shutdown(context.Context) error
}

// Topic is the interface extracted from gocloud.dev/pubsub.Subscription.
type Subscription interface {
	As(interface{}) bool
	ErrorAs(error, interface{}) bool
	Receive(context.Context) (*pubsub.Message, error)
	Shutdown(context.Context) error
}
