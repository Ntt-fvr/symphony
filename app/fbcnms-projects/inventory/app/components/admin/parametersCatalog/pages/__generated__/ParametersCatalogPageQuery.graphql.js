/**
 * @generated SignedSource<<d3a820b7d0d7ebfb7a914a58f28185b9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ParametersCatalogPageQuery$variables = {||};
export type ParametersCatalogPageQueryVariables = ParametersCatalogPageQuery$variables;
export type ParametersCatalogPageQuery$data = {|
  +parametersCatalog: {|
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
          +numberOfProperties: ?number,
        |}>,
      |},
    |}>,
  |},
|};
export type ParametersCatalogPageQueryResponse = ParametersCatalogPageQuery$data;
export type ParametersCatalogPageQuery = {|
  variables: ParametersCatalogPageQueryVariables,
  response: ParametersCatalogPageQuery$data,
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfProperties",
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
    "cacheID": "6faa67237a55adaa810d569ab6d76009",
    "id": null,
    "metadata": {},
    "name": "ParametersCatalogPageQuery",
    "operationKind": "query",
    "text": "query ParametersCatalogPageQuery {\n  parametersCatalog {\n    edges {\n      node {\n        id\n        name\n        index\n        isDisabled\n        propertyCategories {\n          id\n          name\n          index\n          numberOfProperties\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "0a905553b9591d4c71e0e1254184c29f";

module.exports = ((node/*: any*/)/*: Query<
  ParametersCatalogPageQuery$variables,
  ParametersCatalogPageQuery$data,
>*/);
