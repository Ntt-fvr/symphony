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
export type ParametersCatalogPageQueryVariables = {||};
export type ParametersCatalogPageQueryResponse = {|
  +parametersCatalog: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: ?string,
        +index: ?number,
        +isDisabled: ?boolean,
        +propertyCategories: $ReadOnlyArray<?{|
          +id: string,
          +name: ?string,
          +index: ?number,
        |}>,
      |}
    |}>,
  |}
|};
export type ParametersCatalogPageQuery = {|
  variables: ParametersCatalogPageQueryVariables,
  response: ParametersCatalogPageQueryResponse,
|};
*/


/*
query ParametersCatalogPageQuery {
  parametersCatalog {
    totalCount
    edges {
      node {
        id
        name
        index
        isDisabled
        propertyCategories {
          id
          name
          index
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ParameterCatalogConnection",
    "kind": "LinkedField",
    "name": "parametersCatalog",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ParameterCatalogEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ParameterCatalog",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDisabled",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PropertyCategory",
                "kind": "LinkedField",
                "name": "propertyCategories",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/)
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ParametersCatalogPageQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ParametersCatalogPageQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6e667867dfee80dbe8da4c93020abde3",
    "id": null,
    "metadata": {},
    "name": "ParametersCatalogPageQuery",
    "operationKind": "query",
    "text": "query ParametersCatalogPageQuery {\n  parametersCatalog {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        index\n        isDisabled\n        propertyCategories {\n          id\n          name\n          index\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '83767164c9b403efb587743760123a68';

module.exports = node;
