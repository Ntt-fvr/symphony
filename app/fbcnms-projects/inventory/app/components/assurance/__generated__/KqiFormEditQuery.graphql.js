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
export type KqiFormEditQueryVariables = {||};
export type KqiFormEditQueryResponse = {|
  +kqiTargets: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +impact: string,
        +frame: number,
        +alowedValidation: number,
        +initTime: any,
        +endTime: any,
        +status: boolean,
        +kqi: {|
          +id: string
        |},
      |}
    |}>
  |}
|};
export type KqiFormEditQuery = {|
  variables: KqiFormEditQueryVariables,
  response: KqiFormEditQueryResponse,
|};
*/


/*
query KqiFormEditQuery {
  kqiTargets {
    edges {
      node {
        id
        name
        impact
        frame
        alowedValidation
        initTime
        endTime
        status
        kqi {
          id
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "KqiTargetConnection",
    "kind": "LinkedField",
    "name": "kqiTargets",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KqiTargetEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "KqiTarget",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
                "name": "impact",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "frame",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "alowedValidation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initTime",
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
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Kqi",
                "kind": "LinkedField",
                "name": "kqi",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
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
    "name": "KqiFormEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "KqiFormEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "31fb3ad026393bb8107de754a6ecb477",
    "id": null,
    "metadata": {},
    "name": "KqiFormEditQuery",
    "operationKind": "query",
    "text": "query KqiFormEditQuery {\n  kqiTargets {\n    edges {\n      node {\n        id\n        name\n        impact\n        frame\n        alowedValidation\n        initTime\n        endTime\n        status\n        kqi {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2a2c998fe6b4a46e484c55c441987120';

module.exports = node;
