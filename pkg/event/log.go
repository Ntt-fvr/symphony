// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package event

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"
)

func (e *Eventer) logHook() ent.Hook {
	return LogHook(func(ctx context.Context, logger log.Logger, entry LogEntry) error {
		e.emit(ctx, EntMutation, entry)
		return nil
	}, e.Logger)
}