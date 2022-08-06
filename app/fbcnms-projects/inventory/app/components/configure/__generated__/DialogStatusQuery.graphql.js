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
export type DialogStatusQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<FlowFilterInput>
|};
export type DialogStatusQueryResponse = {|
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
  |}
|};
export type DialogStatusQuery = {|
  variables: DialogStatusQueryVariables,
  response: DialogStatusQueryResponse,
|};
*/


/*
query DialogStatusQuery(
  $filterBy: [FlowFilterInput!]
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
v1 = [
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
                "name": "name",
                "storageKey": null
              },
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
    "name": "DialogStatusQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DialogStatusQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d605656d5ba0af51d75dd27f1d65a79e",
    "id": null,
    "metadata": {},
    "name": "DialogStatusQuery",
    "operationKind": "query",
    "text": "query DialogStatusQuery(\n  $filterBy: [FlowFilterInput!]\n) {\n  flows(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        status\n        newInstancesPolicy\n        cmType\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6dc73447d73259975bd62643ee24d774';

module.exports = node;
