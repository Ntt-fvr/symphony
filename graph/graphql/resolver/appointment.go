// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/appointment"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/pkg/errors"
)

type appointmentResolver struct{}

func (appointmentResolver) Assignee(ctx context.Context, appointment *ent.Appointment) (*ent.User, error) {
	assignee, err := appointment.Assignee(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return assignee, nil
	}
}

func (appointmentResolver) WorkOrder(ctx context.Context, appointment *ent.Appointment) (*ent.WorkOrder, error) {
	wo, err := appointment.Workorder(ctx)

	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return wo, nil
	}
}

func (r mutationResolver) AddAppointment(
	ctx context.Context, input models.AddAppointmentInput,
) (*ent.Appointment, error) {
	sd, _ := time.ParseDuration(strconv.FormatFloat(input.Duration, 'f', -1, 64) + "h")
	a, err := r.ClientFrom(ctx).
		Appointment.Create().
		SetAssigneeID(input.AssigneeID).
		SetWorkorderID(input.WorkorderID).
		SetCreationDate(time.Now()).
		SetStart(input.Date).
		SetEnd(input.Date.Add(sd)).
		SetDuration(input.Duration).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("creating appointment: %w", err)
	}
	return a, nil
}

func (r mutationResolver) EditAppointment(
	ctx context.Context, input models.EditAppointmentInput,
) (*ent.Appointment, error) {
	client := r.ClientFrom(ctx)
	a, err := client.Appointment.Get(ctx, input.ID)
	if err != nil {
		return nil, errors.Wrap(err, "querying appointment")
	}
	sd, _ := time.ParseDuration(strconv.FormatFloat(input.Duration, 'f', -1, 64) + "h")
	mutation := client.Appointment.
		UpdateOne(a).
		SetAssigneeID(input.AssigneeID).
		SetWorkorderID(input.WorkorderID).
		SetStart(input.Date).
		SetEnd(input.Date.Add(sd)).
		SetDuration(input.Duration)

	return mutation.Save(ctx)
}

func (r mutationResolver) RemoveAppointment(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.Appointment.Query().
		Where(
			appointment.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "querying appointment: id=%q", id)
	}
	wo, err := client.WorkOrder.Query().
		Where(workorder.HasAppointmentWith(appointment.ID(id))).
		Only(ctx)

	if err != nil {
		return id, errors.Wrap(err, "querying workorder")
	}

	wo.Update().ClearAppointment().Exec(ctx)

	u, err := client.User.Query().
		Where(user.HasAppointmentWith(appointment.ID(id))).
		Only(ctx)

	u.Update().ClearAppointment().Exec(ctx)

	if err := client.Appointment.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "deleting appointment type")
	}
	return id, nil
}

func (appointmentResolver) AppointmentDate(ctx context.Context, appointment *ent.Appointment) (*time.Time, error) {
	s := appointment.Start
	return &s, nil
}

//*/

/*

	if input.OwnerID != nil {
		mutation = mutation.SetAssigneeID(*input.OwnerID)
	} else {
		v, ok := viewer.FromContext(ctx).(*viewer.UserViewer)
		if !ok {
			return nil, gqlerror.Errorf("could not be executed in automation")
		}
		mutation = mutation.SetOwner(v.User())
	}

*/
/*
	if input.AssigneeID != nil {
		mutation.SetAssigneeID(*input.AssigneeID)
	} else {
		mutation.ClearAssignee()
	}
*/
