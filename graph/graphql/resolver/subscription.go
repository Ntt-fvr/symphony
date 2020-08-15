// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/zap"
)

type subscriptionResolver struct{ resolver }

func (r subscriptionResolver) workOrderSubscribe(ctx context.Context, event string) (<-chan *ent.WorkOrder, error) {
	client := r.ClientFrom(ctx).WorkOrder
	current := viewer.FromContext(ctx)
	logger := r.logger.For(ctx).With(
		zap.Object("viewer", current),
		zap.String("event", event),
	)
	subscription := make(chan *ent.WorkOrder, 1)

	receiver, err := r.event.NewReceiver(ctx, &ent.WorkOrder{})
	if err != nil {
		logger.Error("cannot create event receiver",
			zap.Error(err),
		)
		return nil, err
	}
	svc, err := ev.NewService(
		ev.Config{
			Receiver: receiver,
			Handler: ev.EventHandlerFunc(func(_ context.Context, evt *ev.Event) error {
				workOrder, ok := evt.Object.(*ent.WorkOrder)
				if !ok {
					typ := fmt.Sprintf("%T", evt.Object)
					logger.Error("event object is not a work order",
						zap.String("type", typ),
					)
					return fmt.Errorf("event object %s must be a work order", typ)
				}
				subscription <- client.Instantiate(workOrder)
				logger.Debug("wrote to work order subscription",
					zap.Int("id", workOrder.ID),
					zap.String("name", workOrder.Name),
				)
				return nil
			}),
		},
		ev.WithTenant(current.Tenant()),
		ev.WithEvent(event),
		ev.WithMaxConcurrency(1),
	)
	if err != nil {
		logger.Error("cannot create event service", zap.Error(err))
		return nil, err
	}

	go func() {
		defer svc.Stop(context.Background())
		err := svc.Run(ctx)
		logger.Debug("subscription terminated", zap.Error(err))
	}()

	return subscription, nil
}

func (r subscriptionResolver) WorkOrderAdded(ctx context.Context) (<-chan *ent.WorkOrder, error) {
	return r.workOrderSubscribe(ctx, event.WorkOrderAdded)
}

func (r subscriptionResolver) WorkOrderDone(ctx context.Context) (<-chan *ent.WorkOrder, error) {
	return r.workOrderSubscribe(ctx, event.WorkOrderDone)
}
