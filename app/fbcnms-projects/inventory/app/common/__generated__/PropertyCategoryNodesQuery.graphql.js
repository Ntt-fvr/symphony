/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PropertyCategoryNodesQueryVariables = {||};
export type PropertyCategoryNodesQueryResponse = {|
  +propertyCategories: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: ?string,
      |}
    |}>
  |}
|};
export type PropertyCategoryNodesQuery = {|
  variables: PropertyCategoryNodesQueryVariables,
  response: PropertyCategoryNodesQueryResponse,
|};
*/


/*
query PropertyCategoryNodesQuery {
  propertyCategories {
    edges {
      node {
        id
        name
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PropertyCategoryConnection",
    "kind": "LinkedField",
    "name": "propertyCategories",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PropertyCategoryEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyCategory",
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
    "name": "PropertyCategoryNodesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PropertyCategoryNodesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a581ff90f803f18b2d348697f7fd7044",
    "id": null,
    "metadata": {},
    "name": "PropertyCategoryNodesQuery",
    "operationKind": "query",
    "text": "query PropertyCategoryNodesQuery {\n  propertyCategories {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8a97de2ed61f89cc617c6dc1925e35f5';

module.exports = node;
