// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package hooks

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/appointment"
	"github.com/facebookincubator/symphony/pkg/ent/hook"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
)

// AppointmentHook modifies work order scheduledAt.
func AppointmentHook() ent.Hook {
	hk := func(next ent.Mutator) ent.Mutator {
		return hook.AppointmentFunc(func(ctx context.Context, mutation *ent.AppointmentMutation) (ent.Value, error) {
			woID, exist := mutation.WorkorderID()

			if exist {
				wo, err := mutation.Client().WorkOrder.Query().
					Where(workorder.IDEQ(woID)).
					Only(ctx)

				if err != nil {
					return nil, err
				}

				if mutation.Op().Is(ent.OpCreate) {
					activeAppointmentQuery := wo.QueryAppointment().
						Where(appointment.StatusEQ(appointment.StatusActive))

					hasAppointment, err := activeAppointmentQuery.Exist(ctx)

					if err != nil {
						return nil, err
					}

					if hasAppointment {
						activeAppointment, err := activeAppointmentQuery.Only(ctx)
						if err != nil {
							return nil, err
						}
						activeAppointment.Update().
							SetStatus(appointment.StatusCanceled).
							SaveX(ctx)
					}

					scheduletAt, exist := mutation.Start()
					if exist {
						wo.Update().SetNillableScheduledAt(&scheduletAt).SaveX(ctx)
					}

					assignee, exist := mutation.AssigneeID()
					if !exist {
						wo.Update().SetNillableAssigneeID(&assignee).SaveX(ctx)
					}
				}
			}

			if mutation.Op().Is(ent.OpUpdateOne) {
				appointmentID, exist := mutation.ID()

				if !exist {
					return next.Mutate(ctx, mutation)
				}

				wo, err := mutation.Client().Appointment.Query().
					Where(appointment.ID(appointmentID)).
					QueryWorkorder().
					Only(ctx)

				if err != nil {
					return nil, err
				}

				status, exist := mutation.Status()
				if exist {
					if status == appointment.StatusCanceled {
						wo.Update().ClearScheduledAt().SaveX(ctx)
						return next.Mutate(ctx, mutation)
					}
				}

				scheduletAt, exist := mutation.Start()
				if exist {
					wo.Update().SetNillableScheduledAt(&scheduletAt).SaveX(ctx)
				}

				assignee, exist := mutation.AssigneeID()
				if !exist {
					wo.Update().SetNillableAssigneeID(&assignee).SaveX(ctx)
				}
			}
			return next.Mutate(ctx, mutation)
		})
	}
	return hook.On(hk, ent.OpCreate|ent.OpUpdateOne|ent.OpUpdate)
}
