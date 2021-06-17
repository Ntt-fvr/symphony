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
                "name": "networkManagerSystem",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalID",
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
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CountersTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e0ba159e8a84771eb5b031aad90c87d4",
    "id": null,
    "metadata": {},
    "name": "CountersTypesQuery",
    "operationKind": "query",
    "text": "query CountersTypesQuery {\n  counters {\n    edges {\n      node {\n        id\n        name\n        networkManagerSystem\n        externalID\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '497bfb9bf1a96dfa214807e2694192c3';

module.exports = node;
