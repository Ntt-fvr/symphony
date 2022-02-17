/**
 * @generated SignedSource<<fbb61c29f3c1c88e82fe6063e815a678>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type LocationTypesListQuery$variables = {||};
export type LocationTypesListQueryVariables = LocationTypesListQuery$variables;
export type LocationTypesListQuery$data = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type LocationTypesListQueryResponse = LocationTypesListQuery$data;
export type LocationTypesListQuery = {|
  variables: LocationTypesListQueryVariables,
  response: LocationTypesListQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 500
      }
    ],
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
    "storageKey": "locationTypes(first:500)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationTypesListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationTypesListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8b9ad77da5a2410cdc0b11755f2a62bd",
    "id": null,
    "metadata": {},
    "name": "LocationTypesListQuery",
    "operationKind": "query",
    "text": "query LocationTypesListQuery {\n  locationTypes(first: 500) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "2042d6b5d603cd1eb8b3148cd320d629";

module.exports = ((node/*: any*/)/*: Query<
  LocationTypesListQuery$variables,
  LocationTypesListQuery$data,
>*/);
