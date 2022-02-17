/**
 * @generated SignedSource<<5379ac0a74f615e6abe97f1498a02912>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type locationTypesHookLocationTypesQuery$variables = {||};
export type locationTypesHookLocationTypesQueryVariables = locationTypesHookLocationTypesQuery$variables;
export type locationTypesHookLocationTypesQuery$data = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type locationTypesHookLocationTypesQueryResponse = locationTypesHookLocationTypesQuery$data;
export type locationTypesHookLocationTypesQuery = {|
  variables: locationTypesHookLocationTypesQueryVariables,
  response: locationTypesHookLocationTypesQuery$data,
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
        "value": 20
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
    "storageKey": "locationTypes(first:20)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "locationTypesHookLocationTypesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "locationTypesHookLocationTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b1175e5ef97121785d59143d3ee0df2d",
    "id": null,
    "metadata": {},
    "name": "locationTypesHookLocationTypesQuery",
    "operationKind": "query",
    "text": "query locationTypesHookLocationTypesQuery {\n  locationTypes(first: 20) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "2706298ca30018e201078173961b57d9";

module.exports = ((node/*: any*/)/*: Query<
  locationTypesHookLocationTypesQuery$variables,
  locationTypesHookLocationTypesQuery$data,
>*/);
