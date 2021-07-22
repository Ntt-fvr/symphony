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
export type EditCounterItemFormQueryVariables = {||};
export type EditCounterItemFormQueryResponse = {|
  +counterFamilys: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +vendors: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type EditCounterItemFormQuery = {|
  variables: EditCounterItemFormQueryVariables,
  response: EditCounterItemFormQueryResponse,
|};
*/


/*
query EditCounterItemFormQuery {
  counterFamilys {
    edges {
      node {
        id
        name
      }
    }
  }
  vendors {
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
var v0 = [
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
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CounterFamilyConnection",
    "kind": "LinkedField",
    "name": "counterFamilys",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CounterFamilyEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CounterFamily",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
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
    "concreteType": "VendorConnection",
    "kind": "LinkedField",
    "name": "vendors",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "VendorEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Vendor",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
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
    "name": "EditCounterItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EditCounterItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5c7d74b48478ce1277a72962349d8ad",
    "id": null,
    "metadata": {},
    "name": "EditCounterItemFormQuery",
    "operationKind": "query",
    "text": "query EditCounterItemFormQuery {\n  counterFamilys {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  vendors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'facc542846ece929ba711c1e0de375a3';

module.exports = node;
