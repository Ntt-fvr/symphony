// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package predicate

import (
	"github.com/facebook/ent/dialect/sql"
)

// Activity is the predicate function for activity builders.
type Activity func(*sql.Selector)

// AlarmFilter is the predicate function for alarmfilter builders.
type AlarmFilter func(*sql.Selector)

// AlarmStatus is the predicate function for alarmstatus builders.
type AlarmStatus func(*sql.Selector)

// Block is the predicate function for block builders.
type Block func(*sql.Selector)

// BlockInstance is the predicate function for blockinstance builders.
type BlockInstance func(*sql.Selector)

// CheckListCategory is the predicate function for checklistcategory builders.
type CheckListCategory func(*sql.Selector)

// CheckListCategoryDefinition is the predicate function for checklistcategorydefinition builders.
type CheckListCategoryDefinition func(*sql.Selector)

// CheckListItem is the predicate function for checklistitem builders.
type CheckListItem func(*sql.Selector)

// CheckListItemDefinition is the predicate function for checklistitemdefinition builders.
type CheckListItemDefinition func(*sql.Selector)

// Comment is the predicate function for comment builders.
type Comment func(*sql.Selector)

// Comparator is the predicate function for comparator builders.
type Comparator func(*sql.Selector)

// Counter is the predicate function for counter builders.
type Counter func(*sql.Selector)

// CounterFamily is the predicate function for counterfamily builders.
type CounterFamily func(*sql.Selector)

// CounterFormula is the predicate function for counterformula builders.
type CounterFormula func(*sql.Selector)

// Customer is the predicate function for customer builders.
type Customer func(*sql.Selector)

// DocumentCategory is the predicate function for documentcategory builders.
type DocumentCategory func(*sql.Selector)

// Domain is the predicate function for domain builders.
type Domain func(*sql.Selector)

// EntryPoint is the predicate function for entrypoint builders.
type EntryPoint func(*sql.Selector)

// Equipment is the predicate function for equipment builders.
type Equipment func(*sql.Selector)

// EquipmentCategory is the predicate function for equipmentcategory builders.
type EquipmentCategory func(*sql.Selector)

// EquipmentPort is the predicate function for equipmentport builders.
type EquipmentPort func(*sql.Selector)

// EquipmentPortDefinition is the predicate function for equipmentportdefinition builders.
type EquipmentPortDefinition func(*sql.Selector)

// EquipmentPortType is the predicate function for equipmentporttype builders.
type EquipmentPortType func(*sql.Selector)

// EquipmentPosition is the predicate function for equipmentposition builders.
type EquipmentPosition func(*sql.Selector)

// EquipmentPositionDefinition is the predicate function for equipmentpositiondefinition builders.
type EquipmentPositionDefinition func(*sql.Selector)

// EquipmentType is the predicate function for equipmenttype builders.
type EquipmentType func(*sql.Selector)

// EventSeverity is the predicate function for eventseverity builders.
type EventSeverity func(*sql.Selector)

// ExitPoint is the predicate function for exitpoint builders.
type ExitPoint func(*sql.Selector)

// ExportTask is the predicate function for exporttask builders.
type ExportTask func(*sql.Selector)

// Feature is the predicate function for feature builders.
type Feature func(*sql.Selector)

// File is the predicate function for file builders.
type File func(*sql.Selector)

// FileCategoryType is the predicate function for filecategorytype builders.
type FileCategoryType func(*sql.Selector)

// FloorPlan is the predicate function for floorplan builders.
type FloorPlan func(*sql.Selector)

// FloorPlanReferencePoint is the predicate function for floorplanreferencepoint builders.
type FloorPlanReferencePoint func(*sql.Selector)

// FloorPlanScale is the predicate function for floorplanscale builders.
type FloorPlanScale func(*sql.Selector)

// Flow is the predicate function for flow builders.
type Flow func(*sql.Selector)

// FlowDraft is the predicate function for flowdraft builders.
type FlowDraft func(*sql.Selector)

// FlowExecutionTemplate is the predicate function for flowexecutiontemplate builders.
type FlowExecutionTemplate func(*sql.Selector)

// FlowInstance is the predicate function for flowinstance builders.
type FlowInstance func(*sql.Selector)

// Formula is the predicate function for formula builders.
type Formula func(*sql.Selector)

// Hyperlink is the predicate function for hyperlink builders.
type Hyperlink func(*sql.Selector)

// Kpi is the predicate function for kpi builders.
type Kpi func(*sql.Selector)

// Kqi is the predicate function for kqi builders.
type Kqi func(*sql.Selector)

// KqiCategory is the predicate function for kqicategory builders.
type KqiCategory func(*sql.Selector)

// KqiComparator is the predicate function for kqicomparator builders.
type KqiComparator func(*sql.Selector)

// KqiPerspective is the predicate function for kqiperspective builders.
type KqiPerspective func(*sql.Selector)

// KqiSource is the predicate function for kqisource builders.
type KqiSource func(*sql.Selector)

// KqiTarget is the predicate function for kqitarget builders.
type KqiTarget func(*sql.Selector)

// KqiTemporalFrequency is the predicate function for kqitemporalfrequency builders.
type KqiTemporalFrequency func(*sql.Selector)

// Link is the predicate function for link builders.
type Link func(*sql.Selector)

// Location is the predicate function for location builders.
type Location func(*sql.Selector)

// LocationType is the predicate function for locationtype builders.
type LocationType func(*sql.Selector)

// Organization is the predicate function for organization builders.
type Organization func(*sql.Selector)

// PermissionsPolicy is the predicate function for permissionspolicy builders.
type PermissionsPolicy func(*sql.Selector)

// Project is the predicate function for project builders.
type Project func(*sql.Selector)

// ProjectTemplate is the predicate function for projecttemplate builders.
type ProjectTemplate func(*sql.Selector)

// ProjectType is the predicate function for projecttype builders.
type ProjectType func(*sql.Selector)

// Property is the predicate function for property builders.
type Property func(*sql.Selector)

// PropertyType is the predicate function for propertytype builders.
type PropertyType func(*sql.Selector)

// Recommendations is the predicate function for recommendations builders.
type Recommendations func(*sql.Selector)

// RecommendationsCategory is the predicate function for recommendationscategory builders.
type RecommendationsCategory func(*sql.Selector)

// RecommendationsSources is the predicate function for recommendationssources builders.
type RecommendationsSources func(*sql.Selector)

// ReportFilter is the predicate function for reportfilter builders.
type ReportFilter func(*sql.Selector)

// Rule is the predicate function for rule builders.
type Rule func(*sql.Selector)

// RuleLimit is the predicate function for rulelimit builders.
type RuleLimit func(*sql.Selector)

// RuleType is the predicate function for ruletype builders.
type RuleType func(*sql.Selector)

// Service is the predicate function for service builders.
type Service func(*sql.Selector)

// ServiceEndpoint is the predicate function for serviceendpoint builders.
type ServiceEndpoint func(*sql.Selector)

// ServiceEndpointDefinition is the predicate function for serviceendpointdefinition builders.
type ServiceEndpointDefinition func(*sql.Selector)

// ServiceType is the predicate function for servicetype builders.
type ServiceType func(*sql.Selector)

// Survey is the predicate function for survey builders.
type Survey func(*sql.Selector)

// SurveyCellScan is the predicate function for surveycellscan builders.
type SurveyCellScan func(*sql.Selector)

// SurveyQuestion is the predicate function for surveyquestion builders.
type SurveyQuestion func(*sql.Selector)

// SurveyTemplateCategory is the predicate function for surveytemplatecategory builders.
type SurveyTemplateCategory func(*sql.Selector)

// SurveyTemplateQuestion is the predicate function for surveytemplatequestion builders.
type SurveyTemplateQuestion func(*sql.Selector)

// SurveyWiFiScan is the predicate function for surveywifiscan builders.
type SurveyWiFiScan func(*sql.Selector)

// Tech is the predicate function for tech builders.
type Tech func(*sql.Selector)

// Threshold is the predicate function for threshold builders.
type Threshold func(*sql.Selector)

// User is the predicate function for user builders.
type User func(*sql.Selector)

// UsersGroup is the predicate function for usersgroup builders.
type UsersGroup func(*sql.Selector)

// Vendor is the predicate function for vendor builders.
type Vendor func(*sql.Selector)

// WorkOrder is the predicate function for workorder builders.
type WorkOrder func(*sql.Selector)

// WorkOrderDefinition is the predicate function for workorderdefinition builders.
type WorkOrderDefinition func(*sql.Selector)

// WorkOrderTemplate is the predicate function for workordertemplate builders.
type WorkOrderTemplate func(*sql.Selector)

// WorkOrderType is the predicate function for workordertype builders.
type WorkOrderType func(*sql.Selector)

// WorkerType is the predicate function for workertype builders.
type WorkerType func(*sql.Selector)
