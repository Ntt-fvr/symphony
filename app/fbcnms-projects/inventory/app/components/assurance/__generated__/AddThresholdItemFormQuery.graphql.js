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
export type AddThresholdItemFormQueryVariables = {||};
export type AddThresholdItemFormQueryResponse = {|
  +kpis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +status: boolean,
        +domainFk: {|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type AddThresholdItemFormQuery = {|
  variables: AddThresholdItemFormQueryVariables,
  response: AddThresholdItemFormQueryResponse,
|};
*/


/*
query AddThresholdItemFormQuery {
  kpis {
    edges {
      node {
        id
        name
        status
        domainFk {
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
    "concreteType": "KpiConnection",
    "kind": "LinkedField",
    "name": "kpis",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KpiEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Kpi",
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
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Domain",
                "kind": "LinkedField",
                "name": "domainFk",
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
    "name": "AddThresholdItemFormQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddThresholdItemFormQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8029a744513e8eb5425351a6cc4eca46",
    "id": null,
    "metadata": {},
    "name": "AddThresholdItemFormQuery",
    "operationKind": "query",
    "text": "query AddThresholdItemFormQuery {\n  kpis {\n    edges {\n      node {\n        id\n        name\n        status\n        domainFk {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '51e91ee066b6dd3e955bb1a634a8c864';

module.exports = node;
