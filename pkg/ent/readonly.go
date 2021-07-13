// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"

	"github.com/facebook/ent/dialect"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
)

// ReadOnly returns a new readonly-client.
//
//	client := client.ReadOnly()
//
func (c *Client) ReadOnly() *Client {
	cfg := config{driver: &readonly{Driver: c.driver}, log: c.log}
	return &Client{
		config:                      cfg,
		Schema:                      migrate.NewSchema(cfg.driver),
		Activity:                    NewActivityClient(cfg),
		AlarmFilter:                 NewAlarmFilterClient(cfg),
		AlarmStatus:                 NewAlarmStatusClient(cfg),
		Block:                       NewBlockClient(cfg),
		BlockInstance:               NewBlockInstanceClient(cfg),
		CheckListCategory:           NewCheckListCategoryClient(cfg),
		CheckListCategoryDefinition: NewCheckListCategoryDefinitionClient(cfg),
		CheckListItem:               NewCheckListItemClient(cfg),
		CheckListItemDefinition:     NewCheckListItemDefinitionClient(cfg),
		Comment:                     NewCommentClient(cfg),
		Comparator:                  NewComparatorClient(cfg),
		Counter:                     NewCounterClient(cfg),
		CounterFamily:               NewCounterFamilyClient(cfg),
		CounterVendorFormula:        NewCounterVendorFormulaClient(cfg),
		Customer:                    NewCustomerClient(cfg),
		Domain:                      NewDomainClient(cfg),
		EntryPoint:                  NewEntryPointClient(cfg),
		Equipment:                   NewEquipmentClient(cfg),
		EquipmentCategory:           NewEquipmentCategoryClient(cfg),
		EquipmentPort:               NewEquipmentPortClient(cfg),
		EquipmentPortDefinition:     NewEquipmentPortDefinitionClient(cfg),
		EquipmentPortType:           NewEquipmentPortTypeClient(cfg),
		EquipmentPosition:           NewEquipmentPositionClient(cfg),
		EquipmentPositionDefinition: NewEquipmentPositionDefinitionClient(cfg),
		EquipmentType:               NewEquipmentTypeClient(cfg),
		Event:                       NewEventClient(cfg),
		EventSeverity:               NewEventSeverityClient(cfg),
		ExitPoint:                   NewExitPointClient(cfg),
		ExportTask:                  NewExportTaskClient(cfg),
		Feature:                     NewFeatureClient(cfg),
		File:                        NewFileClient(cfg),
		FileCategoryType:            NewFileCategoryTypeClient(cfg),
		FloorPlan:                   NewFloorPlanClient(cfg),
		FloorPlanReferencePoint:     NewFloorPlanReferencePointClient(cfg),
		FloorPlanScale:              NewFloorPlanScaleClient(cfg),
		Flow:                        NewFlowClient(cfg),
		FlowDraft:                   NewFlowDraftClient(cfg),
		FlowExecutionTemplate:       NewFlowExecutionTemplateClient(cfg),
		FlowInstance:                NewFlowInstanceClient(cfg),
		Formula:                     NewFormulaClient(cfg),
		Hyperlink:                   NewHyperlinkClient(cfg),
		Kpi:                         NewKpiClient(cfg),
		Link:                        NewLinkClient(cfg),
		Location:                    NewLocationClient(cfg),
		LocationType:                NewLocationTypeClient(cfg),
		PermissionsPolicy:           NewPermissionsPolicyClient(cfg),
		Project:                     NewProjectClient(cfg),
		ProjectTemplate:             NewProjectTemplateClient(cfg),
		ProjectType:                 NewProjectTypeClient(cfg),
		Property:                    NewPropertyClient(cfg),
		PropertyType:                NewPropertyTypeClient(cfg),
		ReportFilter:                NewReportFilterClient(cfg),
		Rule:                        NewRuleClient(cfg),
		RuleLimit:                   NewRuleLimitClient(cfg),
		RuleType:                    NewRuleTypeClient(cfg),
		Service:                     NewServiceClient(cfg),
		ServiceEndpoint:             NewServiceEndpointClient(cfg),
		ServiceEndpointDefinition:   NewServiceEndpointDefinitionClient(cfg),
		ServiceType:                 NewServiceTypeClient(cfg),
		Survey:                      NewSurveyClient(cfg),
		SurveyCellScan:              NewSurveyCellScanClient(cfg),
		SurveyQuestion:              NewSurveyQuestionClient(cfg),
		SurveyTemplateCategory:      NewSurveyTemplateCategoryClient(cfg),
		SurveyTemplateQuestion:      NewSurveyTemplateQuestionClient(cfg),
		SurveyWiFiScan:              NewSurveyWiFiScanClient(cfg),
		Tech:                        NewTechClient(cfg),
		Treshold:                    NewTresholdClient(cfg),
		User:                        NewUserClient(cfg),
		UsersGroup:                  NewUsersGroupClient(cfg),
		Vendor:                      NewVendorClient(cfg),
		WorkOrder:                   NewWorkOrderClient(cfg),
		WorkOrderDefinition:         NewWorkOrderDefinitionClient(cfg),
		WorkOrderTemplate:           NewWorkOrderTemplateClient(cfg),
		WorkOrderType:               NewWorkOrderTypeClient(cfg),
		WorkerType:                  NewWorkerTypeClient(cfg),
	}
}

// ErrReadOnly returns when a readonly user tries to execute a write operation.
var ErrReadOnly = &PermissionError{cause: "permission denied: read-only user"}

// PermissionError represents a permission denied error.
type PermissionError struct {
	cause string
}

func (e PermissionError) Error() string { return e.cause }

type readonly struct {
	dialect.Driver
}

func (r *readonly) Exec(context.Context, string, interface{}, interface{}) error {
	return ErrReadOnly
}

func (r *readonly) Tx(context.Context) (dialect.Tx, error) {
	return nil, ErrReadOnly
}
