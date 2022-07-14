/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ActionExecutionItemStatus = "FAILED" | "PENDING" | "SUCCESSFULL" | "%future added value";
export type ActionSchedulerStatus = "ACTIVED" | "DEACTIVATED" | "%future added value";
export type ActionSchedulerType = "MANUAL_EXECUTION" | "ONE_TIME_EXECUTION" | "PERIODICAL_EXECUTION" | "%future added value";
export type ActionTemplateType = "AUTOMATION_FLOW" | "CONFIGURATION_PARAMETER" | "%future added value";
export type ChangeItemStatus = "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING" | "SUCCESSFUL" | "%future added value";
export type ChangeRequestActivityField = "CREATION_DATE" | "DESCRIPTION" | "NAME" | "PRIORITY" | "REQUESTER" | "STATUS" | "%future added value";
export type ChangeRequestSource = "GUI" | "NON_RT_RIC" | "NSSMF" | "WORKFLOW" | "%future added value";
export type ChangeRequestStatus = "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING_APPROVAL" | "REJECTED" | "SCHEDULED" | "SUBMITTED" | "SUCCESSFUL" | "SUCCESSFUL_WITH_WARNINGS" | "%future added value";
export type ChangeRequestType = "AUTOMATIC" | "MANUAL" | "%future added value";
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type PlanningSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type RollbackPolicyConfig = "APPROVED" | "REJECTED" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type TypeSchedulerConfig = "AS_SOON_AS_APPROVED" | "SCHEDULED_CHANGE" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type WeekDay = "FRIDAY" | "MONDAY" | "SATURDAY" | "SUNDAY" | "THURSDAY" | "TUESDAY" | "WEDNESDAY" | "%future added value";
export type AddChangeRequestInput = {|
  activities?: ?$ReadOnlyArray<?ChangeRequestActivityRef>,
  aprobator?: ?string,
  createTime?: ?any,
  description: string,
  items: $ReadOnlyArray<ChangeItemRef>,
  requester: string,
  scheduler?: ?SchedulerConfigRef,
  source?: ?ChangeRequestSource,
  status: ChangeRequestStatus,
  type?: ?ChangeRequestType,
  updateTime?: ?any,
|};
export type ChangeRequestActivityRef = {|
  activityType?: ?ChangeRequestActivityField,
  author?: ?string,
  changeRequest?: ?ChangeRequestRef,
  createTime?: ?any,
  id?: ?string,
  isCreate?: ?boolean,
  newValue?: ?string,
  oldValue?: ?string,
  updateTime?: ?any,
|};
export type ChangeRequestRef = {|
  activities?: ?$ReadOnlyArray<?ChangeRequestActivityRef>,
  aprobator?: ?string,
  createTime?: ?any,
  description?: ?string,
  id?: ?string,
  items?: ?$ReadOnlyArray<ChangeItemRef>,
  requester?: ?string,
  scheduler?: ?SchedulerConfigRef,
  source?: ?ChangeRequestSource,
  status?: ?ChangeRequestStatus,
  type?: ?ChangeRequestType,
  updateTime?: ?any,
|};
export type ChangeItemRef = {|
  booleanValue?: ?boolean,
  createTime?: ?any,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  parameterType?: ?ConfigurationParameterTypeRef,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  resource?: ?ResourceRef,
  status?: ?ChangeItemStatus,
  stringValue?: ?string,
  updateTime?: ?any,
|};
export type ConfigurationParameterTypeRef = {|
  booleanValue?: ?boolean,
  category?: ?string,
  createTime?: ?any,
  externalId?: ?string,
  floatValue?: ?number,
  id?: ?string,
  index?: ?number,
  intValue?: ?number,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  isListable?: ?boolean,
  isMandatory?: ?boolean,
  isPrioritary?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  mappingIn?: ?string,
  mappingOut?: ?string,
  name?: ?string,
  nodeType?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  rawValue?: ?string,
  resourceSpecification?: ?string,
  stringValue?: ?string,
  tags?: ?$ReadOnlyArray<ConfigParamTagRef>,
  type?: ?ParameterKind,
  updateTime?: ?any,
|};
export type ParameterRef = {|
  booleanValue?: ?boolean,
  createTime?: ?any,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  parameterType?: ?ConfigurationParameterTypeRef,
  previous?: ?ParameterRef,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
  updateTime?: ?any,
  versionCMs?: ?$ReadOnlyArray<?CMVersionRef>,
|};
export type CMVersionRef = {|
  createTime?: ?any,
  id?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  previous?: ?CMVersionRef,
  resource?: ?ResourceRef,
  status?: ?VersionStatus,
  updateTime?: ?any,
  validFrom?: ?any,
  validTo?: ?any,
|};
export type ResourceRef = {|
  actionScheduler?: ?ActionSchedulerRef,
  available?: ?boolean,
  belongsTo?: ?ResourceRef,
  changeItems?: ?$ReadOnlyArray<?ChangeItemRef>,
  cmVersions?: ?$ReadOnlyArray<?CMVersionRef>,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
  createTime?: ?any,
  crossConnection?: ?ResourceRef,
  crossconnectionInv?: ?ResourceRef,
  externalId?: ?string,
  id?: ?string,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  lifecycleStatus?: ?LifecycleStatus,
  locatedIn?: ?string,
  logicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  logicalLinks?: ?$ReadOnlyArray<?ResourceRef>,
  name?: ?string,
  numericPools?: ?$ReadOnlyArray<?NumericPoolRef>,
  operationalSubStatus?: ?OperationalSubStatus,
  physicalLink?: ?ResourceRef,
  physicalLinkInv?: ?ResourceRef,
  planningSubStatus?: ?PlanningSubStatus,
  resourceProperties?: ?$ReadOnlyArray<?ResourcePropertyRef>,
  resourceSpecification?: ?string,
  typePlanningSubStatus?: ?TypePlanningSubStatus,
  updateTime?: ?any,
  usageSubStatus?: ?UsageSubStatus,
|};
export type ActionSchedulerRef = {|
  actionTemplate?: ?ActionTemplateRef,
  actions?: ?$ReadOnlyArray<ActionExecutionRef>,
  createTime?: ?any,
  cron?: ?string,
  date?: ?any,
  description?: ?string,
  id?: ?string,
  name?: ?string,
  resourceSpecificationName?: ?string,
  resourceTypeName?: ?string,
  resources?: ?$ReadOnlyArray<ResourceRef>,
  status?: ?ActionSchedulerStatus,
  type?: ?ActionSchedulerType,
  updateTime?: ?any,
|};
export type ActionTemplateRef = {|
  actionExecutions?: ?$ReadOnlyArray<ActionExecutionRef>,
  actionTemplateItems?: ?$ReadOnlyArray<ActionTemplateItemRef>,
  createTime?: ?any,
  id?: ?string,
  isDeleted?: ?boolean,
  name?: ?string,
  resourceSpecifications?: ?string,
  type?: ?ActionTemplateType,
  updateTime?: ?any,
|};
export type ActionExecutionRef = {|
  createTime?: ?any,
  endTime?: ?any,
  id?: ?string,
  items?: ?$ReadOnlyArray<?ActionExecutionItemRef>,
  scheduler?: ?ActionSchedulerRef,
  starTime?: ?any,
  template?: ?ActionTemplateRef,
  updateTime?: ?any,
|};
export type ActionExecutionItemRef = {|
  action?: ?ActionExecutionRef,
  createTime?: ?any,
  id?: ?string,
  resources?: ?$ReadOnlyArray<?ResourceRef>,
  status?: ?ActionExecutionItemStatus,
  updateTime?: ?any,
|};
export type ActionTemplateItemRef = {|
  actionTemplate?: ?ActionTemplateRef,
  createTime?: ?any,
  id?: ?string,
  isDeleted?: ?boolean,
  parameters?: ?ConfigurationParameterTypeRef,
  updateTime?: ?any,
  value?: ?ParameterRef,
|};
export type NumericPoolRef = {|
  customLimit?: ?number,
  description?: ?string,
  id?: ?string,
  isDeleted?: ?boolean,
  limit?: ?number,
  resources?: ?$ReadOnlyArray<ResourceRef>,
  statusNumericPools?: ?$ReadOnlyArray<?StatusNumericPoolRef>,
|};
export type StatusNumericPoolRef = {|
  id?: ?string,
  numericPool?: ?NumericPoolRef,
  status?: ?UsageSubStatus,
  values?: ?$ReadOnlyArray<?number>,
|};
export type ResourcePropertyRef = {|
  booleanValue?: ?boolean,
  createTime?: ?any,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  rawValue?: ?string,
  resource?: ?ResourceRef,
  resourcePropertyType?: ?string,
  stringValue?: ?string,
  updateTime?: ?any,
|};
export type ConfigParamTagRef = {|
  createTime?: ?any,
  id?: ?string,
  name?: ?string,
  parameters?: ?$ReadOnlyArray<?ConfigurationParameterTypeRef>,
  updateTime?: ?any,
|};
export type SchedulerConfigRef = {|
  changeRequest?: ?ChangeRequestRef,
  createTime?: ?any,
  id?: ?string,
  name?: ?string,
  rollbackPolicy?: ?RollbackPolicyConfig,
  time?: ?any,
  type?: ?TypeSchedulerConfig,
  updateTime?: ?any,
  weekDay?: ?WeekDay,
|};
export type AddRequestChangeMutationVariables = {|
  input: $ReadOnlyArray<AddChangeRequestInput>
|};
export type AddRequestChangeMutationResponse = {|
  +addChangeRequest: ?{|
    +changeRequest: ?$ReadOnlyArray<?{|
      +id: string,
      +description: string,
    |}>
  |}
|};
export type AddRequestChangeMutation = {|
  variables: AddRequestChangeMutationVariables,
  response: AddRequestChangeMutationResponse,
|};
*/


/*
mutation AddRequestChangeMutation(
  $input: [AddChangeRequestInput!]!
) {
  addChangeRequest(input: $input) {
    changeRequest {
      id
      description
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddChangeRequestPayload",
    "kind": "LinkedField",
    "name": "addChangeRequest",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChangeRequest",
        "kind": "LinkedField",
        "name": "changeRequest",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRequestChangeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRequestChangeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ff344eaec19392cb0deef43974a9cb6f",
    "id": null,
    "metadata": {},
    "name": "AddRequestChangeMutation",
    "operationKind": "mutation",
    "text": "mutation AddRequestChangeMutation(\n  $input: [AddChangeRequestInput!]!\n) {\n  addChangeRequest(input: $input) {\n    changeRequest {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f41bc3daec9c35b960675b826e8929f2';

module.exports = node;
