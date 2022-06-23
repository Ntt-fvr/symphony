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
export type AddActionTemplateInput = {|
  ActionExecution?: ?$ReadOnlyArray<ActionExecutionRef>,
  actionTemplateItem: $ReadOnlyArray<ActionTemplateItemRef>,
  name: string,
  isDeleted?: ?boolean,
  resourceSpecifications: string,
  type: ActionTemplateType,
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
export type ActionTemplateRef = {|
  ActionExecution?: ?$ReadOnlyArray<ActionExecutionRef>,
  actionTemplateItem?: ?$ReadOnlyArray<ActionTemplateItemRef>,
  id?: ?string,
  name?: ?string,
  isDeleted?: ?boolean,
  resourceSpecifications?: ?string,
  type?: ?ActionTemplateType,
|};
export type ActionTemplateItemRef = {|
  actionTemplate?: ?ActionTemplateRef,
  id?: ?string,
  parameters?: ?ConfigurationParameterTypeRef,
  value?: ?ParameterRef,
  isDeleted?: ?boolean,
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
export type AddActionTemplateMutationVariables = {|
  input: $ReadOnlyArray<AddActionTemplateInput>
|};
export type AddActionTemplateMutationResponse = {|
  +addActionTemplate: ?{|
    +actionTemplate: ?$ReadOnlyArray<?{|
      +actionTemplateItem: $ReadOnlyArray<{|
        +id: string,
        +parameters: {|
          +id: string,
          +name: string,
        |},
        +value: {|
          +stringValue: ?string
        |},
      |}>,
      +id: string,
      +name: string,
      +resourceSpecifications: string,
      +type: ActionTemplateType,
    |}>
  |}
|};
export type AddActionTemplateMutation = {|
  variables: AddActionTemplateMutationVariables,
  response: AddActionTemplateMutationResponse,
|};
*/


/*
mutation AddActionTemplateMutation(
  $input: [AddActionTemplateInput!]!
) {
  addActionTemplate(input: $input) {
    actionTemplate {
      actionTemplateItem {
        id
        parameters {
          id
          name
        }
        value {
          stringValue
          id
        }
      }
      id
      name
      resourceSpecifications
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
  "name": "id",
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
  "concreteType": "ConfigurationParameterType",
  "kind": "LinkedField",
  "name": "parameters",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecifications",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddActionTemplateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddActionTemplatePayload",
        "kind": "LinkedField",
        "name": "addActionTemplate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "actionTemplate",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ActionTemplateItem",
                "kind": "LinkedField",
                "name": "actionTemplateItem",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Parameter",
                    "kind": "LinkedField",
                    "name": "value",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
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
    "name": "AddActionTemplateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddActionTemplatePayload",
        "kind": "LinkedField",
        "name": "addActionTemplate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "actionTemplate",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ActionTemplateItem",
                "kind": "LinkedField",
                "name": "actionTemplateItem",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Parameter",
                    "kind": "LinkedField",
                    "name": "value",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a16effcf8c1486bdc7ed0a89118fe075",
    "id": null,
    "metadata": {},
    "name": "AddActionTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation AddActionTemplateMutation(\n  $input: [AddActionTemplateInput!]!\n) {\n  addActionTemplate(input: $input) {\n    actionTemplate {\n      actionTemplateItem {\n        id\n        parameters {\n          id\n          name\n        }\n        value {\n          stringValue\n          id\n        }\n      }\n      id\n      name\n      resourceSpecifications\n      type\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9f32919a4bb3dd279da0a9339be9ff9d';

module.exports = node;
