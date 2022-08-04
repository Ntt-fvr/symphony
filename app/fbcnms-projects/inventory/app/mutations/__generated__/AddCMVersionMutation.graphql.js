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
export type AddCMVersionInput = {|
  createTime?: ?any,
  parameters: $ReadOnlyArray<ParameterRef>,
  previous?: ?CMVersionRef,
  resource: ResourceRef,
  status: VersionStatus,
  updateTime?: ?any,
  validFrom?: ?any,
  validTo?: ?any,
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
export type ConfigParamTagRef = {|
  createTime?: ?any,
  id?: ?string,
  name?: ?string,
  parameters?: ?$ReadOnlyArray<?ConfigurationParameterTypeRef>,
  updateTime?: ?any,
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
  isInstanceProperty?: ?boolean,
  isMandatory?: ?boolean,
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
export type AddCMVersionMutationVariables = {|
  input: $ReadOnlyArray<AddCMVersionInput>
|};
export type AddCMVersionMutationResponse = {|
  +addCMVersion: ?{|
    +cMVersion: ?$ReadOnlyArray<?{|
      +id: string,
      +status: VersionStatus,
      +resource: {|
        +id: string,
        +name: string,
      |},
      +parameters: $ReadOnlyArray<{|
        +id: string,
        +parameterType: {|
          +id: string,
          +name: string,
          +type: ParameterKind,
          +intValue: ?number,
          +floatValue: ?number,
          +stringValue: ?string,
          +booleanValue: ?boolean,
          +resourceSpecification: string,
        |},
      |}>,
    |}>
  |}
|};
export type AddCMVersionMutation = {|
  variables: AddCMVersionMutationVariables,
  response: AddCMVersionMutationResponse,
|};
*/


/*
mutation AddCMVersionMutation(
  $input: [AddCMVersionInput!]!
) {
  addCMVersion(input: $input) {
    cMVersion {
      id
      status
      resource {
        id
        name
      }
      parameters {
        id
        parameterType {
          id
          name
          type
          intValue
          floatValue
          stringValue
          booleanValue
          resourceSpecification
        }
      }
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddCMVersionPayload",
    "kind": "LinkedField",
    "name": "addCMVersion",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CMVersion",
        "kind": "LinkedField",
        "name": "cMVersion",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "resource",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Parameter",
            "kind": "LinkedField",
            "name": "parameters",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ConfigurationParameterType",
                "kind": "LinkedField",
                "name": "parameterType",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "intValue",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "floatValue",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "stringValue",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "booleanValue",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resourceSpecification",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
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
    "name": "AddCMVersionMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddCMVersionMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c9ec8df68dabe519478b26d306dac67e",
    "id": null,
    "metadata": {},
    "name": "AddCMVersionMutation",
    "operationKind": "mutation",
    "text": "mutation AddCMVersionMutation(\n  $input: [AddCMVersionInput!]!\n) {\n  addCMVersion(input: $input) {\n    cMVersion {\n      id\n      status\n      resource {\n        id\n        name\n      }\n      parameters {\n        id\n        parameterType {\n          id\n          name\n          type\n          intValue\n          floatValue\n          stringValue\n          booleanValue\n          resourceSpecification\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0f3baa46b4134e3f295704ed9cbdbd46';

module.exports = node;
