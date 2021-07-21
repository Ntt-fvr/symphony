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
export type AlarmFilteringTypesQueryVariables = {||};
export type AlarmFilteringTypesQueryResponse = {|
  +AlarmFilters: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +networkResource: string,
        +enable: boolean,
        +beginTime: any,
        +endTime: any,
        +reason: string,
        +user: string,
        +creationTime: any,
        +alarmStatus: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type AlarmFilteringTypesQuery = {|
  variables: AlarmFilteringTypesQueryVariables,
  response: AlarmFilteringTypesQueryResponse,
|};
*/


/*
query AlarmFilteringTypesQuery {
  AlarmFilters {
    edges {
      node {
        id
        name
        networkResource
        enable
        beginTime
        endTime
        reason
        user
        creationTime
        alarmStatus {
          id
          name
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AlarmFilterConnection",
    "kind": "LinkedField",
    "name": "AlarmFilters",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AlarmFilterEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AlarmFilter",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "networkResource",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "enable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "beginTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reason",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "user",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "creationTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AlarmStatus",
                "kind": "LinkedField",
                "name": "alarmStatus",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AlarmFilteringTypesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlarmFilteringTypesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "64d755a730b542014041f7074ddb10cf",
    "id": null,
    "metadata": {},
    "name": "AlarmFilteringTypesQuery",
    "operationKind": "query",
    "text": "query AlarmFilteringTypesQuery {\n  AlarmFilters {\n    edges {\n      node {\n        id\n        name\n        networkResource\n        enable\n        beginTime\n        endTime\n        reason\n        user\n        creationTime\n        alarmStatus {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7e4d851fafc447b0f3f9e70063b1947d';

module.exports = node;
