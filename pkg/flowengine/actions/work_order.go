// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package actions

import (
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
)

const (
	InputVariableType        = "Work Order Template"
	InputVariableEndStatuses = "Work Order Statuses for completing block"
	InputVariableName        = "Name"
	InputVariableDescription = "Description"
	InputVariableLocation    = "Location"
	InputVariableProject     = "Project"
	InputVariableOwner       = "Owner"
	InputVariableAssignee    = "Assignee"
	InputVariableStatus      = "Status"
	InputVariablePriority    = "Priority"
	OutputVariableWorkOrder  = "Created Work Order"
)

type workOrderAction struct{}

func (workOrderAction) ID() flowschema.ActionTypeID {
	return flowschema.ActionTypeWorkOrder
}

func (workOrderAction) Description() string {
	return "This block will initiate a work order based on a template you'll choose"
}

func (workOrderAction) Variables() []*flowschema.VariableDefinition {
	return []*flowschema.VariableDefinition{
		{
			Key:       InputVariableType,
			Type:      enum.VariableTypeWorkOrderType,
			Mandatory: true,
		},
		{
			Key:            InputVariableEndStatuses,
			Type:           enum.VariableTypeString,
			MultipleValues: true,
			Choices: []string{
				workorder.StatusDone.String(),
			},
		},
		{
			Key:  InputVariableName,
			Type: enum.VariableTypeString,
		},
		{
			Key:  InputVariableDescription,
			Type: enum.VariableTypeString,
		},
		{
			Key:  InputVariableLocation,
			Type: enum.VariableTypeLocation,
		},
		{
			Key:  InputVariableProject,
			Type: enum.VariableTypeProject,
		},
		{
			Key:       InputVariableOwner,
			Type:      enum.VariableTypeUser,
			Mandatory: true,
		},
		{
			Key:  InputVariableAssignee,
			Type: enum.VariableTypeUser,
		},
		{
			Key:  InputVariableStatus,
			Type: enum.VariableTypeString,
			Choices: []string{
				workorder.StatusPending.String(),
				workorder.StatusPlanned.String(),
			},
		},
		{
			Key:  InputVariablePriority,
			Type: enum.VariableTypeString,
			Choices: []string{
				workorder.PriorityNone.String(),
				workorder.PriorityLow.String(),
				workorder.PriorityMedium.String(),
				workorder.PriorityHigh.String(),
				workorder.PriorityUrgent.String(),
			},
		},
		{
			Key:       OutputVariableWorkOrder,
			Type:      enum.VariableTypeWorkOrder,
			Mandatory: true,
			Usage:     enum.VariableUsageOutput,
		},
	}
}
