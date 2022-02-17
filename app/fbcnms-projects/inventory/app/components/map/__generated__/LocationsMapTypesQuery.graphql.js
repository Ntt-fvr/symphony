/**
 * @generated SignedSource<<01450266ceb8160c34241b2b1600e721>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type LocationsMapTypesQuery$variables = {||};
export type LocationsMapTypesQueryVariables = LocationsMapTypesQuery$variables;
export type LocationsMapTypesQuery$data = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +locations: ?{|
          +edges: $ReadOnlyArray<{|
            +node: ?{|
              +id: string,
              +name: string,
              +latitude: number,
              +longitude: number,
            |},
          |}>,
        |},
      |},
    |}>,
  |},
|};
export type LocationsMapTypesQueryResponse = LocationsMapTypesQuery$data;
export type LocationsMapTypesQuery = {|
  variables: LocationsMapTypesQueryVariables,
  response: LocationsMapTypesQuery$data,
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
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "enforceHasLatLong",
                    "value": true
                  }
                ],
                "concreteType": "LocationConnection",
                "kind": "LinkedField",
                "name": "locations",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
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
                            "name": "latitude",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "longitude",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "locations(enforceHasLatLong:true)"
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
    "name": "LocationsMapTypesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationsMapTypesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0e41817fc169df5a2583e6d61aaa4853",
    "id": null,
    "metadata": {},
    "name": "LocationsMapTypesQuery",
    "operationKind": "query",
    "text": "query LocationsMapTypesQuery {\n  locationTypes {\n    edges {\n      node {\n        id\n        name\n        locations(enforceHasLatLong: true) {\n          edges {\n            node {\n              id\n              name\n              latitude\n              longitude\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "fc689b6b48f62c12d1c96d10d3f80c7c";

module.exports = ((node/*: any*/)/*: Query<
  LocationsMapTypesQuery$variables,
  LocationsMapTypesQuery$data,
>*/);
