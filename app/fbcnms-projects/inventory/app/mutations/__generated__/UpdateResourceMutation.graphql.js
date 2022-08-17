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
export type AdministrativeSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type ChangeItemStatus = "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING" | "SUCCESSFUL" | "%future added value";
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type PlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type ResourceHasFilter = "actionScheduler" | "administrativeSubStatus" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "updateTime" | "usageSubStatus" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type UpdateResourceInput = {|
  filter: ResourceFilter,
  remove?: ?ResourcePatch,
  set?: ?ResourcePatch,
|};
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  externalId?: ?StringHashFilter_StringRegExpFilter,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  locatedIn?: ?StringHashFilter,
  name?: ?StringHashFilter_StringRegExpFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter_StringRegExpFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
  regexp?: ?string,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type ResourcePatch = {|
  actionScheduler?: ?ActionSchedulerRef,
  administrativeSubStatus?: ?AdministrativeSubStatus,
  available?: ?boolean,
  belongsTo?: ?ResourceRef,
  changeItems?: ?$ReadOnlyArray<?ChangeItemRef>,
  cmVersions?: ?$ReadOnlyArray<?CMVersionRef>,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
  createTime?: ?any,
  crossConnection?: ?ResourceRef,
  crossconnectionInv?: ?ResourceRef,
  externalId?: ?string,
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
export type ResourceRef = {|
  actionScheduler?: ?ActionSchedulerRef,
  administrativeSubStatus?: ?AdministrativeSubStatus,
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
  updateTime?: ?any,
  usageSubStatus?: ?UsageSubStatus,
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
export type ConfigParamTagRef = {|
  createTime?: ?any,
  id?: ?string,
  name?: ?string,
  parameters?: ?$ReadOnlyArray<?ConfigurationParameterTypeRef>,
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
export type ActionTemplateItemRef = {|
  actionTemplate?: ?ActionTemplateRef,
  createTime?: ?any,
  id?: ?string,
  isDeleted?: ?boolean,
  parameters?: ?ConfigurationParameterTypeRef,
  updateTime?: ?any,
  value?: ?ParameterRef,
|};
export type UpdateResourceMutationVariables = {|
  input: UpdateResourceInput
|};
export type UpdateResourceMutationResponse = {|
  +updateResource: ?{|
    +numUids: ?number,
    +resource: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +externalId: ?string,
      +locatedIn: ?string,
      +resourceSpecification: string,
      +isDeleted: ?boolean,
      +lifecycleStatus: ?LifecycleStatus,
      +planningSubStatus: ?PlanningSubStatus,
      +administrativeSubStatus: ?AdministrativeSubStatus,
      +usageSubStatus: ?UsageSubStatus,
      +operationalSubStatus: ?OperationalSubStatus,
      +resourceProperties: ?$ReadOnlyArray<?{|
        +booleanValue: ?boolean,
        +floatValue: ?number,
        +id: string,
        +intValue: ?number,
        +latitudeValue: ?number,
        +longitudeValue: ?number,
        +rangeFromValue: ?number,
        +rangeToValue: ?number,
        +rawValue: ?string,
        +stringValue: ?string,
        +resourcePropertyType: string,
      |}>,
      +belongsTo: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: string,
        +locatedIn: ?string,
      |},
      +logicalLinks: ?$ReadOnlyArray<?{|
        +name: string
      |}>,
    |}>,
  |}
|};
export type UpdateResourceMutation = {|
  variables: UpdateResourceMutationVariables,
  response: UpdateResourceMutationResponse,
|};
*/


/*
mutation UpdateResourceMutation(
  $input: UpdateResourceInput!
) {
  updateResource(input: $input) {
    numUids
    resource {
      id
      name
      externalId
      locatedIn
      resourceSpecification
      isDeleted
      lifecycleStatus
      planningSubStatus
      administrativeSubStatus
      usageSubStatus
      operationalSubStatus
      resourceProperties {
        booleanValue
        floatValue
        id
        intValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        rawValue
        stringValue
        resourcePropertyType
      }
      belongsTo {
        id
        name
        resourceSpecification
        locatedIn
      }
      logicalLinks {
        name
        id
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locatedIn",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lifecycleStatus",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "planningSubStatus",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "administrativeSubStatus",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "usageSubStatus",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "operationalSubStatus",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceProperty",
  "kind": "LinkedField",
  "name": "resourceProperties",
  "plural": true,
  "selections": [
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
      "name": "floatValue",
      "storageKey": null
    },
    (v3/*: any*/),
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
      "name": "latitudeValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "longitudeValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rangeFromValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rangeToValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawValue",
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
      "name": "resourcePropertyType",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "belongsTo",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v7/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateResourceMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateResourcePayload",
        "kind": "LinkedField",
        "name": "updateResource",
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
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "logicalLinks",
                "plural": true,
                "selections": [
                  (v4/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateResourceMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateResourcePayload",
        "kind": "LinkedField",
        "name": "updateResource",
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
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "logicalLinks",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v3/*: any*/)
                ],
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
    "cacheID": "58d39efb6557cfe5a0243db7c8c7a2b4",
    "id": null,
    "metadata": {},
    "name": "UpdateResourceMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateResourceMutation(\n  $input: UpdateResourceInput!\n) {\n  updateResource(input: $input) {\n    numUids\n    resource {\n      id\n      name\n      externalId\n      locatedIn\n      resourceSpecification\n      isDeleted\n      lifecycleStatus\n      planningSubStatus\n      administrativeSubStatus\n      usageSubStatus\n      operationalSubStatus\n      resourceProperties {\n        booleanValue\n        floatValue\n        id\n        intValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        rawValue\n        stringValue\n        resourcePropertyType\n      }\n      belongsTo {\n        id\n        name\n        resourceSpecification\n        locatedIn\n      }\n      logicalLinks {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'daaac93a25d3545bd7e12f91877609fa';

module.exports = node;
