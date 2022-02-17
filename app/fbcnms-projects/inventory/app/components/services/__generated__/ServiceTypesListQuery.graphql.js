/**
 * @generated SignedSource<<dd850c6f3144079575f7ba560eef0ac6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type DiscoveryMethod = "MANUAL" | "INVENTORY" | "%future added value";
export type ServiceTypesListQuery$variables = {||};
export type ServiceTypesListQueryVariables = ServiceTypesListQuery$variables;
export type ServiceTypesListQuery$data = {|
  +serviceTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +discoveryMethod: DiscoveryMethod,
      |},
    |}>,
  |},
|};
export type ServiceTypesListQueryResponse = ServiceTypesListQuery$data;
export type ServiceTypesListQuery = {|
  variables: ServiceTypesListQueryVariables,
  response: ServiceTypesListQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ServiceTypeEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ServiceType",
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
            "name": "discoveryMethod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServiceTypesListQuery",
    "selections": [
      {
        "alias": "serviceTypes",
        "args": null,
        "concreteType": "ServiceTypeConnection",
        "kind": "LinkedField",
        "name": "__ServiceTypesListQuery_serviceTypes_connection",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ServiceTypesListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ServiceTypeConnection",
        "kind": "LinkedField",
        "name": "serviceTypes",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": "serviceTypes(first:500)"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ServiceTypesListQuery_serviceTypes",
        "kind": "LinkedHandle",
        "name": "serviceTypes"
      }
    ]
  },
  "params": {
    "cacheID": "8b4e0bb73c301954adc89ee883b6fe20",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "serviceTypes"
          ]
        }
      ]
    },
    "name": "ServiceTypesListQuery",
    "operationKind": "query",
    "text": "query ServiceTypesListQuery {\n  serviceTypes(first: 500) {\n    edges {\n      node {\n        id\n        name\n        discoveryMethod\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "b6456da176f3cef0fee9aa727073135d";

module.exports = ((node/*: any*/)/*: Query<
  ServiceTypesListQuery$variables,
  ServiceTypesListQuery$data,
>*/);
