/**
 * @generated SignedSource<<6dd7367e6a91171560c6a01f256de62b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type LocationTypeNodesQuery$variables = {||};
export type LocationTypeNodesQueryVariables = LocationTypeNodesQuery$variables;
export type LocationTypeNodesQuery$data = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type LocationTypeNodesQueryResponse = LocationTypeNodesQuery$data;
export type LocationTypeNodesQuery = {|
  variables: LocationTypeNodesQueryVariables,
  response: LocationTypeNodesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "LocationTypeConnection",
    "kind": "LinkedField",
    "name": "locationTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationType",
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
    "name": "LocationTypeNodesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationTypeNodesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a249c57aee2f912fd89817329d060ebb",
    "id": null,
    "metadata": {},
    "name": "LocationTypeNodesQuery",
    "operationKind": "query",
    "text": "query LocationTypeNodesQuery {\n  locationTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "5e92355037c4ff4b34043dec7ef50287";

module.exports = ((node/*: any*/)/*: Query<
  LocationTypeNodesQuery$variables,
  LocationTypeNodesQuery$data,
>*/);
