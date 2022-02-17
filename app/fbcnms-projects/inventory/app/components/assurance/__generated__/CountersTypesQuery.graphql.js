/**
 * @generated SignedSource<<95bb5f7f65778a4f028e1fdd81dee8e8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type CountersTypesQuery$variables = {||};
export type CountersTypesQueryVariables = CountersTypesQuery$variables;
export type CountersTypesQuery$data = {|
  +counters: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +networkManagerSystem: string,
        +externalID: string,
        +counterFamily: ?{|
          +id: string,
          +name: string,
        |},
        +vendorFk: {|
          +id: string,
          +name: string,
        |},
      |},
    |}>,
  |},
|};
export type CountersTypesQueryResponse = CountersTypesQuery$data;
export type CountersTypesQuery = {|
  variables: CountersTypesQueryVariables,
  response: CountersTypesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
              (v1/*: any*/),
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
                "concreteType": "CounterFamily",
                "kind": "LinkedField",
                "name": "counterFamily",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Vendor",
                "kind": "LinkedField",
                "name": "vendorFk",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CountersTypesQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CountersTypesQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "eac66f9b8d99d96050283ee51cb532b7",
    "id": null,
    "metadata": {},
    "name": "CountersTypesQuery",
    "operationKind": "query",
    "text": "query CountersTypesQuery {\n  counters {\n    edges {\n      node {\n        id\n        name\n        networkManagerSystem\n        externalID\n        counterFamily {\n          id\n          name\n        }\n        vendorFk {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1d56822f33f92af4f33fab3097b9e3ef";

module.exports = ((node/*: any*/)/*: Query<
  CountersTypesQuery$variables,
  CountersTypesQuery$data,
>*/);
