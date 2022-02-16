/**
 * @generated SignedSource<<c9e6099b5938df07f8cf651480769680>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type LocationTypeNodesOnDocumentQuery$variables = {||};
export type LocationTypeNodesOnDocumentQueryVariables = LocationTypeNodesOnDocumentQuery$variables;
export type LocationTypeNodesOnDocumentQuery$data = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type LocationTypeNodesOnDocumentQueryResponse = LocationTypeNodesOnDocumentQuery$data;
export type LocationTypeNodesOnDocumentQuery = {|
  variables: LocationTypeNodesOnDocumentQueryVariables,
  response: LocationTypeNodesOnDocumentQuery$data,
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
    "name": "LocationTypeNodesOnDocumentQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationTypeNodesOnDocumentQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2bacf18a6a4f17e3083c359fb736f16e",
    "id": null,
    "metadata": {},
    "name": "LocationTypeNodesOnDocumentQuery",
    "operationKind": "query",
    "text": "query LocationTypeNodesOnDocumentQuery {\n  locationTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "f497bfe184cf51ac72c5dbdf06c4c24b";

module.exports = ((node/*: any*/)/*: Query<
  LocationTypeNodesOnDocumentQuery$variables,
  LocationTypeNodesOnDocumentQuery$data,
>*/);
