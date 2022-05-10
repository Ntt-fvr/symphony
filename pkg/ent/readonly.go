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
		config:                            cfg,
		Schema:                            migrate.NewSchema(cfg.driver),
		Action:                            NewActionClient(cfg),
		Activity:                          NewActivityClient(cfg),
		AlarmFilter:                       NewAlarmFilterClient(cfg),
		AlarmStatus:                       NewAlarmStatusClient(cfg),
		Appointment:                       NewAppointmentClient(cfg),
		Block:                             NewBlockClient(cfg),
		BlockInstance:                     NewBlockInstanceClient(cfg),
		CheckListCategory:                 NewCheckListCategoryClient(cfg),
		CheckListCategoryDefinition:       NewCheckListCategoryDefinitionClient(cfg),
		CheckListItem:                     NewCheckListItemClient(cfg),
		CheckListItemDefinition:           NewCheckListItemDefinitionClient(cfg),
		Comment:                           NewCommentClient(cfg),
		Comparator:                        NewComparatorClient(cfg),
		Counter:                           NewCounterClient(cfg),
		CounterFamily:                     NewCounterFamilyClient(cfg),
		CounterFormula:                    NewCounterFormulaClient(cfg),
		Customer:                          NewCustomerClient(cfg),
		DocumentCategory:                  NewDocumentCategoryClient(cfg),
		Domain:                            NewDomainClient(cfg),
		EntryPoint:                        NewEntryPointClient(cfg),
		Equipment:                         NewEquipmentClient(cfg),
		EquipmentCategory:                 NewEquipmentCategoryClient(cfg),
		EquipmentPort:                     NewEquipmentPortClient(cfg),
		EquipmentPortDefinition:           NewEquipmentPortDefinitionClient(cfg),
		EquipmentPortType:                 NewEquipmentPortTypeClient(cfg),
		EquipmentPosition:                 NewEquipmentPositionClient(cfg),
		EquipmentPositionDefinition:       NewEquipmentPositionDefinitionClient(cfg),
		EquipmentType:                     NewEquipmentTypeClient(cfg),
		EventSeverity:                     NewEventSeverityClient(cfg),
		Execution:                         NewExecutionClient(cfg),
		ExitPoint:                         NewExitPointClient(cfg),
		ExportTask:                        NewExportTaskClient(cfg),
		Feature:                           NewFeatureClient(cfg),
		File:                              NewFileClient(cfg),
		FloorPlan:                         NewFloorPlanClient(cfg),
		FloorPlanReferencePoint:           NewFloorPlanReferencePointClient(cfg),
		FloorPlanScale:                    NewFloorPlanScaleClient(cfg),
		Flow:                              NewFlowClient(cfg),
		FlowDraft:                         NewFlowDraftClient(cfg),
		FlowExecutionTemplate:             NewFlowExecutionTemplateClient(cfg),
		FlowInstance:                      NewFlowInstanceClient(cfg),
		Formula:                           NewFormulaClient(cfg),
		Hyperlink:                         NewHyperlinkClient(cfg),
		Kpi:                               NewKpiClient(cfg),
		KpiCategory:                       NewKpiCategoryClient(cfg),
		Kqi:                               NewKqiClient(cfg),
		KqiCategory:                       NewKqiCategoryClient(cfg),
		KqiComparator:                     NewKqiComparatorClient(cfg),
		KqiPerspective:                    NewKqiPerspectiveClient(cfg),
		KqiSource:                         NewKqiSourceClient(cfg),
		KqiTarget:                         NewKqiTargetClient(cfg),
		KqiTemporalFrequency:              NewKqiTemporalFrequencyClient(cfg),
		Link:                              NewLinkClient(cfg),
		Location:                          NewLocationClient(cfg),
		LocationType:                      NewLocationTypeClient(cfg),
		NetworkType:                       NewNetworkTypeClient(cfg),
		Organization:                      NewOrganizationClient(cfg),
		ParameterCatalog:                  NewParameterCatalogClient(cfg),
		PermissionsPolicy:                 NewPermissionsPolicyClient(cfg),
		Project:                           NewProjectClient(cfg),
		ProjectTemplate:                   NewProjectTemplateClient(cfg),
		ProjectType:                       NewProjectTypeClient(cfg),
		Property:                          NewPropertyClient(cfg),
		PropertyCategory:                  NewPropertyCategoryClient(cfg),
		PropertyType:                      NewPropertyTypeClient(cfg),
		PropertyTypeValue:                 NewPropertyTypeValueClient(cfg),
		Recommendations:                   NewRecommendationsClient(cfg),
		RecommendationsCategory:           NewRecommendationsCategoryClient(cfg),
		RecommendationsSources:            NewRecommendationsSourcesClient(cfg),
		ReconciliationRule:                NewReconciliationRuleClient(cfg),
		ReportFilter:                      NewReportFilterClient(cfg),
		ResourcePropertyType:              NewResourcePropertyTypeClient(cfg),
		ResourceSpecification:             NewResourceSpecificationClient(cfg),
		ResourceSpecificationItems:        NewResourceSpecificationItemsClient(cfg),
		ResourceSpecificationRelationship: NewResourceSpecificationRelationshipClient(cfg),
		ResourceType:                      NewResourceTypeClient(cfg),
		ResourceTypeRelationship:          NewResourceTypeRelationshipClient(cfg),
		Rule:                              NewRuleClient(cfg),
		RuleAction:                        NewRuleActionClient(cfg),
		RuleActionTemplate:                NewRuleActionTemplateClient(cfg),
		RuleLimit:                         NewRuleLimitClient(cfg),
		RuleType:                          NewRuleTypeClient(cfg),
		Service:                           NewServiceClient(cfg),
		ServiceEndpoint:                   NewServiceEndpointClient(cfg),
		ServiceEndpointDefinition:         NewServiceEndpointDefinitionClient(cfg),
		ServiceType:                       NewServiceTypeClient(cfg),
		Survey:                            NewSurveyClient(cfg),
		SurveyCellScan:                    NewSurveyCellScanClient(cfg),
		SurveyQuestion:                    NewSurveyQuestionClient(cfg),
		SurveyTemplateCategory:            NewSurveyTemplateCategoryClient(cfg),
		SurveyTemplateQuestion:            NewSurveyTemplateQuestionClient(cfg),
		SurveyWiFiScan:                    NewSurveyWiFiScanClient(cfg),
		Tech:                              NewTechClient(cfg),
		Threshold:                         NewThresholdClient(cfg),
		User:                              NewUserClient(cfg),
		UsersGroup:                        NewUsersGroupClient(cfg),
		Vendor:                            NewVendorClient(cfg),
		WorkOrder:                         NewWorkOrderClient(cfg),
		WorkOrderDefinition:               NewWorkOrderDefinitionClient(cfg),
		WorkOrderTemplate:                 NewWorkOrderTemplateClient(cfg),
		WorkOrderType:                     NewWorkOrderTypeClient(cfg),
		WorkerType:                        NewWorkerTypeClient(cfg),
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
