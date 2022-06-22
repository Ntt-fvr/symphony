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
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type PlanningSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type AddActionSchedulerInput = {|
  actionTemplate: ActionTemplateRef,
  actions?: ?$ReadOnlyArray<ActionExecutionRef>,
  cron?: ?string,
  date?: ?any,
  description: string,
  name: string,
  resources: $ReadOnlyArray<ResourceRef>,
  resourceTypeName?: ?string,
  resourceSpecificationName?: ?string,
  status: ActionSchedulerStatus,
  type: ActionSchedulerType,
|};
export type ActionTemplateRef = {|
  ActionExecution?: ?$ReadOnlyArray<ActionExecutionRef>,
  actionTemplateItem?: ?$ReadOnlyArray<ActionTemplateItemRef>,
  id?: ?string,
  name?: ?string,
  resourceSpecifications?: ?string,
  type?: ?ActionTemplateType,
|};
export type ActionExecutionRef = {|
  endTime?: ?any,
  id?: ?string,
  items?: ?$ReadOnlyArray<?ActionExecutionItemRef>,
  scheduler?: ?ActionSchedulerRef,
  starTime?: ?any,
  template?: ?ActionTemplateRef,
|};
export type ActionExecutionItemRef = {|
  action?: ?ActionExecutionRef,
  id?: ?string,
  resources?: ?$ReadOnlyArray<?ResourceRef>,
  status?: ?ActionExecutionItemStatus,
|};
export type ResourceRef = {|
  actionScheduler?: ?ActionSchedulerRef,
  available?: ?boolean,
  belongsTo?: ?ResourceRef,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
  crossConnection?: ?ResourceRef,
  crossconnectionInv?: ?$ReadOnlyArray<?ResourceRef>,
  externalId?: ?string,
  id?: ?string,
  isDelete?: ?boolean,
  isEditable?: ?boolean,
  lifecycleStatus?: ?LifecycleStatus,
  locatedIn?: ?string,
  logicalLink?: ?ResourceRef,
  logicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  name?: ?string,
  numericPool?: ?$ReadOnlyArray<?NumericPoolRef>,
  operationalSubStatus?: ?OperationalSubStatus,
  physicalLink?: ?ResourceRef,
  physicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  planningSubStatus?: ?PlanningSubStatus,
  resourceProperties?: ?$ReadOnlyArray<?ResourcePropertyRef>,
  resourceSpecification?: ?string,
  typePlanningSubStatus?: ?TypePlanningSubStatus,
  usageSubStatus?: ?UsageSubStatus,
|};
export type ActionSchedulerRef = {|
  actionTemplate?: ?ActionTemplateRef,
  actions?: ?$ReadOnlyArray<ActionExecutionRef>,
  cron?: ?string,
  date?: ?any,
  description?: ?string,
  id?: ?string,
  name?: ?string,
  resourceTypeName?: ?string,
  resourceSpecificationName?: ?string,
  resources?: ?$ReadOnlyArray<ResourceRef>,
  status?: ?ActionSchedulerStatus,
  type?: ?ActionSchedulerType,
|};
export type NumericPoolRef = {|
  customLimit?: ?number,
  description?: ?string,
  id?: ?string,
  isDelete?: ?boolean,
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
|};
export type ActionTemplateItemRef = {|
  actionTemplate?: ?ActionTemplateRef,
  id?: ?string,
  parameters?: ?ConfigurationParameterTypeRef,
  value?: ?ParameterRef,
|};
export type ConfigurationParameterTypeRef = {|
  booleanValue?: ?boolean,
  category?: ?string,
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
|};
export type ParameterRef = {|
  booleanValue?: ?boolean,
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
  versionCM?: ?$ReadOnlyArray<?CMVersionRef>,
|};
export type CMVersionRef = {|
  id?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  previous?: ?CMVersionRef,
  resource?: ?ResourceRef,
  status?: ?VersionStatus,
  validFrom?: ?any,
  validTo?: ?any,
|};
export type ConfigParamTagRef = {|
  id?: ?string,
  name?: ?string,
  parameters?: ?$ReadOnlyArray<?ConfigurationParameterTypeRef>,
|};
export type AddActionSchedulerMutationVariables = {|
  input: $ReadOnlyArray<AddActionSchedulerInput>
|};
export type AddActionSchedulerMutationResponse = {|
  +addActionScheduler: ?{|
    +actionScheduler: ?$ReadOnlyArray<?{|
      +name: string,
      +id: string,
      +resources: $ReadOnlyArray<{|
        +id: string
      |}>,
      +date: ?any,
      +type: ActionSchedulerType,
    |}>
  |}
|};
export type AddActionSchedulerMutation = {|
  variables: AddActionSchedulerMutationVariables,
  response: AddActionSchedulerMutationResponse,
|};
*/


/*
mutation AddActionSchedulerMutation(
  $input: [AddActionSchedulerInput!]!
) {
  addActionScheduler(input: $input) {
    actionScheduler {
      name
      id
      resources {
        id
      }
      date
      type
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddActionSchedulerPayload",
    "kind": "LinkedField",
    "name": "addActionScheduler",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionScheduler",
        "kind": "LinkedField",
        "name": "actionScheduler",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "resources",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
    "name": "AddActionSchedulerMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddActionSchedulerMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "bb4681c778b03b735dd253c8a085d2e3",
    "id": null,
    "metadata": {},
    "name": "AddActionSchedulerMutation",
    "operationKind": "mutation",
    "text": "mutation AddActionSchedulerMutation(\n  $input: [AddActionSchedulerInput!]!\n) {\n  addActionScheduler(input: $input) {\n    actionScheduler {\n      name\n      id\n      resources {\n        id\n      }\n      date\n      type\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7d861dc4c56452bb75e5b8cfdfa76479';

module.exports = node;
