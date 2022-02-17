/**
 * @generated SignedSource<<ee1198a0737bb652fda141cab755c174>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type InventoryTreeNodeWithChildrenQuery$variables = {|
  id: string,
|};
export type InventoryTreeNodeWithChildrenQueryVariables = InventoryTreeNodeWithChildrenQuery$variables;
export type InventoryTreeNodeWithChildrenQuery$data = {|
  +location: ?{|
    +id?: string,
    +externalId?: ?string,
    +name?: string,
    +locationType?: {|
      +id: string,
      +name: string,
    |},
    +numChildren?: number,
    +siteSurveyNeeded?: boolean,
    +children?: $ReadOnlyArray<?{|
      +id: string,
      +externalId: ?string,
      +name: string,
      +locationType: {|
        +id: string,
        +name: string,
      |},
      +numChildren: number,
      +siteSurveyNeeded: boolean,
    |}>,
  |},
|};
export type InventoryTreeNodeWithChildrenQueryResponse = InventoryTreeNodeWithChildrenQuery$data;
export type InventoryTreeNodeWithChildrenQuery = {|
  variables: InventoryTreeNodeWithChildrenQueryVariables,
  response: InventoryTreeNodeWithChildrenQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numChildren",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "siteSurveyNeeded",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "children",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InventoryTreeNodeWithChildrenQuery",
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
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "type": "Location",
            "abstractKey": null
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
    "name": "InventoryTreeNodeWithChildrenQuery",
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
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "type": "Location",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f2a3ee030a5c930d342ca595e38ceb80",
    "id": null,
    "metadata": {},
    "name": "InventoryTreeNodeWithChildrenQuery",
    "operationKind": "query",
    "text": "query InventoryTreeNodeWithChildrenQuery(\n  $id: ID!\n) {\n  location: node(id: $id) {\n    __typename\n    ... on Location {\n      id\n      externalId\n      name\n      locationType {\n        id\n        name\n      }\n      numChildren\n      siteSurveyNeeded\n      children {\n        id\n        externalId\n        name\n        locationType {\n          id\n          name\n        }\n        numChildren\n        siteSurveyNeeded\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "76a5d4ca2dafaf7f713fd3916fc4420a";

module.exports = ((node/*: any*/)/*: Query<
  InventoryTreeNodeWithChildrenQuery$variables,
  InventoryTreeNodeWithChildrenQuery$data,
>*/);
