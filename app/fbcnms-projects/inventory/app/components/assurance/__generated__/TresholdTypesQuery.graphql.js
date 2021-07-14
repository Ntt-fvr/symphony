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
export type TresholdTypesQueryVariables = {||};
export type TresholdTypesQueryResponse = {|
  +tresholds: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: string,
        +status: boolean,
        +kpi: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type TresholdTypesQuery = {|
  variables: TresholdTypesQueryVariables,
  response: TresholdTypesQueryResponse,
|};
*/


/*
query TresholdTypesQuery {
  tresholds {
    edges {
      node {
        id
        name
        description
        status
        kpi {
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
    "concreteType": "TresholdConnection",
    "kind": "LinkedField",
    "name": "tresholds",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TresholdEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Treshold",
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
                "name": "description",
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
                "concreteType": "Kpi",
                "kind": "LinkedField",
                "name": "kpi",
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
    "name": "TresholdTypesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TresholdTypesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6797c4e39e763c12d0d30986177e55fb",
    "id": null,
    "metadata": {},
    "name": "TresholdTypesQuery",
    "operationKind": "query",
    "text": "query TresholdTypesQuery {\n  tresholds {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        kpi {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8414d26e89003a2a3b4b1c809908de13';

module.exports = node;
