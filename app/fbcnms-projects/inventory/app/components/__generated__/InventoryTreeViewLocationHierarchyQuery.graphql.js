/**
 * @generated SignedSource<<7d68f43315c73b7c943c3ae36ea228e7>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type InventoryTreeViewLocationHierarchyQuery$variables = {|
  locationId: string,
|};
export type InventoryTreeViewLocationHierarchyQueryVariables = InventoryTreeViewLocationHierarchyQuery$variables;
export type InventoryTreeViewLocationHierarchyQuery$data = {|
  +location: ?{|
    +locationHierarchy?: $ReadOnlyArray<{|
      +id: string,
    |}>,
  |},
|};
export type InventoryTreeViewLocationHierarchyQueryResponse = InventoryTreeViewLocationHierarchyQuery$data;
export type InventoryTreeViewLocationHierarchyQuery = {|
  variables: InventoryTreeViewLocationHierarchyQueryVariables,
  response: InventoryTreeViewLocationHierarchyQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locationId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "locationId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "locationHierarchy",
      "plural": true,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InventoryTreeViewLocationHierarchyQuery",
    "selections": [
      {
        "alias": "location",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "InventoryTreeViewLocationHierarchyQuery",
    "selections": [
      {
        "alias": "location",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "256985644275bc4206960186d9f449a8",
    "id": null,
    "metadata": {},
    "name": "InventoryTreeViewLocationHierarchyQuery",
    "operationKind": "query",
    "text": "query InventoryTreeViewLocationHierarchyQuery(\n  $locationId: ID!\n) {\n  location: node(id: $locationId) {\n    __typename\n    ... on Location {\n      locationHierarchy {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "37b918eaa916d586a5f62c755f6a1b83";

module.exports = ((node/*: any*/)/*: Query<
  InventoryTreeViewLocationHierarchyQuery$variables,
  InventoryTreeViewLocationHierarchyQuery$data,
>*/);
