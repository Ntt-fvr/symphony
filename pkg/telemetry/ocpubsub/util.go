// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub

import "gocloud.dev/pubsub"

func msgLen(msg *pubsub.Message) int64 {
	if msg == nil {
		return 0
	}
	var l int
	for k, v := range msg.Metadata {
		l += len(k) + len(v)
	}
	return int64(l + len(msg.Body))
}
