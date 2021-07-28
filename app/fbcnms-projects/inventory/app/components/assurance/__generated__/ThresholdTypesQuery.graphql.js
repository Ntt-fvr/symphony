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
export type ThresholdTypesQueryVariables = {||};
export type ThresholdTypesQueryResponse = {|
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
export type ThresholdTypesQuery = {|
  variables: ThresholdTypesQueryVariables,
  response: ThresholdTypesQueryResponse,
|};
*/


/*
query ThresholdTypesQuery {
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
    "name": "ThresholdTypesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ThresholdTypesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e75190e0a018f66b8fb9be3bb7ddaa22",
    "id": null,
    "metadata": {},
    "name": "ThresholdTypesQuery",
    "operationKind": "query",
    "text": "query ThresholdTypesQuery {\n  tresholds {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        kpi {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '03155cdfb9704d4a52d8f938b02ce498';

module.exports = node;
