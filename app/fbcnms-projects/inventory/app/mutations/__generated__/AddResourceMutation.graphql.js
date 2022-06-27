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
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type PlanningSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type AddResourceInput = {|
  actionScheduler?: ?ActionSchedulerRef,
  available?: ?boolean,
  belongsTo?: ?ResourceRef,
  changeItems?: ?$ReadOnlyArray<?ChangeItemRef>,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
  crossConnection?: ?ResourceRef,
  crossconnectionInv?: ?ResourceRef,
  externalId?: ?string,
  isDeleted: boolean,
  isEditable?: ?boolean,
  lifecycleStatus?: ?LifecycleStatus,
  locatedIn?: ?string,
  logicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  logicalLinks?: ?$ReadOnlyArray<?ResourceRef>,
  name: string,
  numericPools?: ?$ReadOnlyArray<?NumericPoolRef>,
  operationalSubStatus?: ?OperationalSubStatus,
  physicalLink?: ?ResourceRef,
  physicalLinkInv?: ?ResourceRef,
  planningSubStatus?: ?PlanningSubStatus,
  resourceProperties?: ?$ReadOnlyArray<?ResourcePropertyRef>,
  resourceSpecification: string,
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
  resources?: ?$ReadOnlyArray<ResourceRef>,
  status?: ?ActionSchedulerStatus,
  type?: ?ActionSchedulerType,
|};
export type ActionTemplateRef = {|
  actionExecutions?: ?$ReadOnlyArray<ActionExecutionRef>,
  actionTemplateItems?: ?$ReadOnlyArray<ActionTemplateItemRef>,
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
  changeItems?: ?$ReadOnlyArray<?ChangeItemRef>,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
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
  usageSubStatus?: ?UsageSubStatus,
|};
export type ChangeItemRef = {|
  booleanValue?: ?boolean,
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
  versionCMs?: ?$ReadOnlyArray<?CMVersionRef>,
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
export type AddResourceMutationVariables = {|
  input: $ReadOnlyArray<AddResourceInput>
|};
export type AddResourceMutationResponse = {|
  +addResource: ?{|
    +numUids: ?number,
    +resource: ?$ReadOnlyArray<?{|
      +name: string,
      +externalId: ?string,
      +locatedIn: ?string,
      +resourceSpecification: string,
      +isDeleted: boolean,
      +lifecycleStatus: ?LifecycleStatus,
      +planningSubStatus: ?PlanningSubStatus,
      +typePlanningSubStatus: ?TypePlanningSubStatus,
      +usageSubStatus: ?UsageSubStatus,
      +operationalSubStatus: ?OperationalSubStatus,
    |}>,
  |}
|};
export type AddResourceMutation = {|
  variables: AddResourceMutationVariables,
  response: AddResourceMutationResponse,
|};
*/


/*
mutation AddResourceMutation(
  $input: [AddResourceInput!]!
) {
  addResource(input: $input) {
    numUids
    resource {
      name
      externalId
      locatedIn
      resourceSpecification
      isDeleted
      lifecycleStatus
      planningSubStatus
      typePlanningSubStatus
      usageSubStatus
      operationalSubStatus
      id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numUids",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locatedIn",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lifecycleStatus",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "planningSubStatus",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "typePlanningSubStatus",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "usageSubStatus",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "operationalSubStatus",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddResourceMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddResourcePayload",
        "kind": "LinkedField",
        "name": "addResource",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "resource",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddResourcePayload",
        "kind": "LinkedField",
        "name": "addResource",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "resource",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f97c2b555a62afe1691b2c8ad4bcef0b",
    "id": null,
    "metadata": {},
    "name": "AddResourceMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceMutation(\n  $input: [AddResourceInput!]!\n) {\n  addResource(input: $input) {\n    numUids\n    resource {\n      name\n      externalId\n      locatedIn\n      resourceSpecification\n      isDeleted\n      lifecycleStatus\n      planningSubStatus\n      typePlanningSubStatus\n      usageSubStatus\n      operationalSubStatus\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eb09b1c2c8c883b2d95c152a01cb2566';

module.exports = node;
