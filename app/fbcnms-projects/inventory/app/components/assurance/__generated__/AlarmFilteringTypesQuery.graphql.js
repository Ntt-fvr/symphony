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
  +alarmFilters: {|
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
  |},
  +alarmStatus: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type AlarmFilteringTypesQuery = {|
  variables: AlarmFilteringTypesQueryVariables,
  response: AlarmFilteringTypesQueryResponse,
|};
*/


/*
query AlarmFilteringTypesQuery {
  alarmFilters {
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
  alarmStatus {
    edges {
      node {
        id
        name
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
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AlarmFilterConnection",
    "kind": "LinkedField",
    "name": "alarmFilters",
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
                "selections": (v2/*: any*/),
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
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "AlarmStatusConnection",
    "kind": "LinkedField",
    "name": "alarmStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AlarmStatusEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AlarmStatus",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v2/*: any*/),
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
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlarmFilteringTypesQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "200fecb04c876426b14d3e4869930400",
    "id": null,
    "metadata": {},
    "name": "AlarmFilteringTypesQuery",
    "operationKind": "query",
    "text": "query AlarmFilteringTypesQuery {\n  alarmFilters {\n    edges {\n      node {\n        id\n        name\n        networkResource\n        enable\n        beginTime\n        endTime\n        reason\n        user\n        creationTime\n        alarmStatus {\n          id\n          name\n        }\n      }\n    }\n  }\n  alarmStatus {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '991ad2c76b3159f9fafe044c20db7b19';

module.exports = node;
