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

func (r subscriptionResolver) subscribe(ctx context.Context, event string, handler ev.EventHandlerFunc, receiver ev.Receiver) error {
	v := viewer.FromContext(ctx)
	logger := r.logger.For(ctx).With(
		zap.Object("viewer", v),
		zap.String("event", event),
	)
	svc, err := ev.NewService(
		ev.Config{
			Receiver: receiver,
			Handler:  handler,
		},
		ev.WithTenant(v.Tenant()),
		ev.WithEvent(event),
		ev.WithMaxConcurrency(1),
	)
	if err != nil {
		logger.Error("cannot create event service", zap.Error(err))
		return err
	}

	go func() {
		defer svc.Stop(ctx)
		err := svc.Run(ctx)
		logger.Debug("subscription terminated", zap.Error(err))
	}()

	return nil
}

func (r subscriptionResolver) workOrderSubscribe(ctx context.Context, event string) (<-chan *ent.WorkOrder, error) {
	client := r.ClientFrom(ctx).WorkOrder
	subscription := make(chan *ent.WorkOrder, 1)
	v := viewer.FromContext(ctx)
	logger := r.logger.For(ctx).With(
		zap.Object("viewer", v),
		zap.String("event", event),
	)

	receiver, err := r.event.NewReceiver(ctx, &ent.WorkOrder{})
	if err != nil {
		r.logger.For(ctx).Error("cannot create event receiver",
			zap.Error(err),
		)
		return nil, err
	}

	if err := r.subscribe(ctx, event, func(_ context.Context, evt *ev.Event) error {
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
	}, receiver); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r subscriptionResolver) flowInstanceSubscribe(ctx context.Context, event string) (<-chan *ent.FlowInstance, error) {
	client := r.ClientFrom(ctx).FlowInstance
	subscription := make(chan *ent.FlowInstance, 1)
	v := viewer.FromContext(ctx)
	logger := r.logger.For(ctx).With(
		zap.Object("viewer", v),
		zap.String("event", event),
	)

	receiver, err := r.event.NewReceiver(ctx, &ent.FlowInstance{})
	if err != nil {
		r.logger.For(ctx).Error("cannot create event receiver",
			zap.Error(err),
		)
		return nil, err
	}

	if err := r.subscribe(ctx, event, func(_ context.Context, evt *ev.Event) error {
		flowInstance, ok := evt.Object.(*ent.FlowInstance)
		if !ok {
			typ := fmt.Sprintf("%T", evt.Object)
			logger.Error("event object is not a flow instace",
				zap.String("type", typ),
			)
			return fmt.Errorf("event object %s must be a work order", typ)
		}
		subscription <- client.Instantiate(flowInstance)
		logger.Debug("wrote to flow instance subscription",
			zap.Int("id", flowInstance.ID),
		)
		return nil
	}, receiver); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r subscriptionResolver) WorkOrderAdded(ctx context.Context) (<-chan *ent.WorkOrder, error) {
	return r.workOrderSubscribe(ctx, event.WorkOrderAdded)
}

func (r subscriptionResolver) WorkOrderDone(ctx context.Context) (<-chan *ent.WorkOrder, error) {
	return r.workOrderSubscribe(ctx, event.WorkOrderDone)
}

func (r subscriptionResolver) FlowInstanceDone(ctx context.Context) (<-chan *ent.FlowInstance, error) {
	return r.flowInstanceSubscribe(ctx, event.FlowInstanceDone)
}
