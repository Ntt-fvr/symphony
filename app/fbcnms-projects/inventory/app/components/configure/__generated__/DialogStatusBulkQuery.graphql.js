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
export type DialogStatusBulkQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<FlowFilterInput>
|};
export type DialogStatusBulkQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
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
|};
export type DialogStatusBulkQuery = {|
  variables: DialogStatusBulkQueryVariables,
  response: DialogStatusBulkQueryResponse,
|};
*/


/*
query DialogStatusBulkQuery(
  $filterBy: [FlowFilterInput!]
) {
  queryResource {
    id
    name
  }
  queryConfigurationParameterType {
    id
    name
  }
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
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy"
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
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Resource",
    "kind": "LinkedField",
    "name": "queryResource",
    "plural": true,
    "selections": (v3/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ConfigurationParameterType",
    "kind": "LinkedField",
    "name": "queryConfigurationParameterType",
    "plural": true,
    "selections": (v3/*: any*/),
    "storageKey": null
  },
  {
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
              (v1/*: any*/),
              (v2/*: any*/),
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DialogStatusBulkQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DialogStatusBulkQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "c1e55f57a56e46bb4c7d56e3f78a8cf4",
    "id": null,
    "metadata": {},
    "name": "DialogStatusBulkQuery",
    "operationKind": "query",
    "text": "query DialogStatusBulkQuery(\n  $filterBy: [FlowFilterInput!]\n) {\n  queryResource {\n    id\n    name\n  }\n  queryConfigurationParameterType {\n    id\n    name\n  }\n  flows(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        status\n        newInstancesPolicy\n        cmType\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2dfeec016f476930640132f6c58a8d4e';

module.exports = node;
