// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
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
	a, err := r.ClientFrom(ctx).
		Appointment.Create().
		SetAssigneeID(input.AssigneeID).
		SetWorkorderID(input.WorkorderID).
		SetCreationDate(time.Now()).
		SetAppointmentDate(input.Date).
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
	mutation := client.Appointment.
		UpdateOne(a).
		SetAssigneeID(input.AssigneeID).
		SetWorkorderID(input.WorkorderID).
		SetAppointmentDate(input.Date)

	return mutation.Save(ctx)
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
