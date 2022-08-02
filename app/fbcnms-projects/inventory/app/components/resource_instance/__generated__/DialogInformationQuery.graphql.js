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
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type FlowCMType = "GENERAL_CR" | "INITIAL_CONFIG" | "SYNC_PARAMETERS" | "%future added value";
export type FlowFilterType = "FLOW_CM_TYPE" | "FLOW_NAME" | "%future added value";
export type FlowNewInstancesPolicy = "DISABLED" | "ENABLED" | "%future added value";
export type FlowStatus = "ARCHIVED" | "DELETED" | "DRAFT" | "ON_HOLD" | "PUBLISHED" | "%future added value";
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "updateTime" | "usageSubStatus" | "%future added value";
export type FlowFilterInput = {|
  cmType?: ?FlowCMType,
  filterType: FlowFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
  timeValue?: ?any,
|};
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  externalId?: ?StringHashFilter,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  locatedIn?: ?StringHashFilter,
  name?: ?StringHashFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type DialogInformationQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<FlowFilterInput>,
  filter?: ?ResourceFilter,
|};
export type DialogInformationQueryResponse = {|
  +flows: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +status: FlowStatus,
        +newInstancesPolicy: FlowNewInstancesPolicy,
        +cmType: ?FlowCMType,
      |},
      +cursor: any,
    |}>
  |},
  +queryResource: ?$ReadOnlyArray<?{|
    +name: string
  |}>,
|};
export type DialogInformationQuery = {|
  variables: DialogInformationQueryVariables,
  response: DialogInformationQueryResponse,
|};
*/


/*
query DialogInformationQuery(
  $filterBy: [FlowFilterInput!]
  $filter: ResourceFilter
) {
  flows(filterBy: $filterBy) {
    edges {
      node {
        id
        name
        status
        newInstancesPolicy
        cmType
      }
      cursor
    }
  }
  queryResource(filter: $filter) {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filterBy"
},
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
  "args": [
    {
      "kind": "Variable",
      "name": "filterBy",
      "variableName": "filterBy"
    }
  ],
  "concreteType": "FlowConnection",
  "kind": "LinkedField",
  "name": "flows",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FlowEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Flow",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
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
              "kind": "ScalarField",
              "name": "newInstancesPolicy",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cmType",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cursor",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DialogInformationQuery",
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "queryResource",
        "plural": true,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DialogInformationQuery",
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "queryResource",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "59c43735b71aa5f18951bb6918009c14",
    "id": null,
    "metadata": {},
    "name": "DialogInformationQuery",
    "operationKind": "query",
    "text": "query DialogInformationQuery(\n  $filterBy: [FlowFilterInput!]\n  $filter: ResourceFilter\n) {\n  flows(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        status\n        newInstancesPolicy\n        cmType\n      }\n      cursor\n    }\n  }\n  queryResource(filter: $filter) {\n    name\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b2044993c87fc26e681ec21b34772b28';

module.exports = node;
