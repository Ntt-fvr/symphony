// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package event

import (
	"context"
	"errors"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/hook"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
)

// Work order events.
const (
	WorkOrderAdded = "work_order:added"
	WorkOrderDone  = "work_order:done"
)

// Hook returns the hook which generates events from mutations.
func (e *Eventer) workOrderHook() ent.Hook {
	chain := hook.NewChain(
		e.workOrderCreateHook(),
		e.workOrderUpdateHook(),
		e.workOrderUpdateOneHook(),
	)
	return chain.Hook()
}

func (e *Eventer) workOrderCreateHook() ent.Hook {
	hk := func(next ent.Mutator) ent.Mutator {
		return hook.WorkOrderFunc(func(ctx context.Context, m *ent.WorkOrderMutation) (ent.Value, error) {
			value, err := next.Mutate(ctx, m)
			if err != nil {
				return value, err
			}
			e.emit(ctx, WorkOrderAdded, value)
			if value.(*ent.WorkOrder).Status == workorder.StatusDone ||
				value.(*ent.WorkOrder).Status == workorder.StatusClosed {
				e.emit(ctx, WorkOrderDone, value)
			}
			return value, nil
		})
	}
	return hook.On(hk, ent.OpCreate)
}

// ErrWorkOrderUpdateStatusOfMany is returned on work order status update by predicate.
var ErrWorkOrderUpdateStatusOfMany = errors.New("work order status update to done by predicate not allowed")

func (e *Eventer) workOrderUpdateHook() ent.Hook {
	hk := func(next ent.Mutator) ent.Mutator {
		return hook.WorkOrderFunc(func(ctx context.Context, m *ent.WorkOrderMutation) (ent.Value, error) {
			if status, exists := m.Status(); exists && (status == workorder.StatusDone || status == workorder.StatusClosed) {
				return nil, ErrWorkOrderUpdateStatusOfMany
			}
			return next.Mutate(ctx, m)
		})
	}
	return hook.On(hk, ent.OpUpdate)
}

func (e *Eventer) workOrderUpdateOneHook() ent.Hook {
	hk := func(next ent.Mutator) ent.Mutator {
		return hook.WorkOrderFunc(func(ctx context.Context, m *ent.WorkOrderMutation) (ent.Value, error) {
			status, exists := m.Status()
			if !exists || (status != workorder.StatusDone && status != workorder.StatusClosed) {
				return next.Mutate(ctx, m)
			}
			oldStatus, err := m.OldStatus(ctx)
			if err != nil {
				return nil, fmt.Errorf("fetching work order old status: %w", err)
			}
			value, err := next.Mutate(ctx, m)
			if err == nil && oldStatus != status {
				e.emit(ctx, WorkOrderDone, value)
			}
			return value, err
		})
	}
	return hook.On(hk, ent.OpUpdateOne)
}
