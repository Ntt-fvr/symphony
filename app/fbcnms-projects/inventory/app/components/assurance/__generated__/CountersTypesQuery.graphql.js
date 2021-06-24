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
export type CountersTypesQueryVariables = {||};
export type CountersTypesQueryResponse = {|
  +counters: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +networkManagerSystem: string,
        +externalID: string,
        +countervendorformula: $ReadOnlyArray<?{|
          +id: string,
          +mandatory: boolean,
        |}>,
      |}
    |}>
  |}
|};
export type CountersTypesQuery = {|
  variables: CountersTypesQueryVariables,
  response: CountersTypesQueryResponse,
|};
*/


/*
query CountersTypesQuery {
  counters {
    edges {
      node {
        id
        name
        networkManagerSystem
        externalID
        countervendorformula {
          id
          mandatory
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
    "concreteType": "CounterConnection",
    "kind": "LinkedField",
    "name": "counters",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CounterEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Counter",
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
                "name": "networkManagerSystem",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CounterVendorFormula",
                "kind": "LinkedField",
                "name": "countervendorformula",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mandatory",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CountersTypesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CountersTypesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a98d20b30714908919542a50d85c103c",
    "id": null,
    "metadata": {},
    "name": "CountersTypesQuery",
    "operationKind": "query",
    "text": "query CountersTypesQuery {\n  counters {\n    edges {\n      node {\n        id\n        name\n        networkManagerSystem\n        externalID\n        countervendorformula {\n          id\n          mandatory\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '01f6f9837e309e931c5baa468d637d7b';

module.exports = node;
