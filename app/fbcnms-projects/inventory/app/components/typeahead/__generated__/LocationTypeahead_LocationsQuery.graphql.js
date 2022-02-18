/**
 * @generated SignedSource<<f19c6e44809e36cf735242bccb298685>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type LocationTypeahead_LocationsQuery$variables = {|
  name: string,
|};
export type LocationTypeahead_LocationsQueryVariables = LocationTypeahead_LocationsQuery$variables;
export type LocationTypeahead_LocationsQuery$data = {|
  +searchForNode: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?({|
        +__typename: "Location",
        +id: string,
        +externalId: ?string,
        +name: string,
        +locationType: {|
          +name: string,
        |},
        +locationHierarchy: $ReadOnlyArray<{|
          +id: string,
          +name: string,
          +locationType: {|
            +name: string,
          |},
        |}>,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other",
      |}),
    |}>,
  |},
|};
export type LocationTypeahead_LocationsQueryResponse = LocationTypeahead_LocationsQuery$data;
export type LocationTypeahead_LocationsQuery = {|
  variables: LocationTypeahead_LocationsQueryVariables,
  response: LocationTypeahead_LocationsQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationTypeahead_LocationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchNodesConnection",
        "kind": "LinkedField",
        "name": "searchForNode",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "locationHierarchy",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Location",
                    "abstractKey": null
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationTypeahead_LocationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchNodesConnection",
        "kind": "LinkedField",
        "name": "searchForNode",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "locationHierarchy",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Location",
                    "abstractKey": null
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
    ]
  },
  "params": {
    "cacheID": "e27dd5d227815f032232320c8b2c1256",
    "id": null,
    "metadata": {},
    "name": "LocationTypeahead_LocationsQuery",
    "operationKind": "query",
    "text": "query LocationTypeahead_LocationsQuery(\n  $name: String!\n) {\n  searchForNode(name: $name, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on Location {\n          id\n          externalId\n          name\n          locationType {\n            name\n            id\n          }\n          locationHierarchy {\n            id\n            name\n            locationType {\n              name\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "9e4ab0ce3b932ff34a72c8db6f428190";

module.exports = ((node/*: any*/)/*: Query<
  LocationTypeahead_LocationsQuery$variables,
  LocationTypeahead_LocationsQuery$data,
>*/);
