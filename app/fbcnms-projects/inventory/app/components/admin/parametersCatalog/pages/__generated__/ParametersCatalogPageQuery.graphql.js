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
type AddEditParametersCatalogType_editingParametersCatalogType$ref = any;
export type ParametersCatalogPageQueryVariables = {||};
export type ParametersCatalogPageQueryResponse = {|
  +parametersCatalog: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: ?string,
        +index: ?number,
        +$fragmentRefs: AddEditParametersCatalogType_editingParametersCatalogType$ref,
      |}
    |}>
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
    edges {
      node {
        ...AddEditParametersCatalogType_editingParametersCatalogType
        id
        name
        index
      }
    }
  }
}

fragment AddEditParametersCatalogType_editingParametersCatalogType on ParameterCatalog {
  id
  name
  index
  isDisabled
  propertyCategories {
    id
    name
    index
    numberOfProperties
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ParametersCatalogPageQuery",
    "selections": [
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AddEditParametersCatalogType_editingParametersCatalogType"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ParametersCatalogPageQuery",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "695292fef10225ed8c4f486c5240d160",
    "id": null,
    "metadata": {},
    "name": "ParametersCatalogPageQuery",
    "operationKind": "query",
    "text": "query ParametersCatalogPageQuery {\n  parametersCatalog {\n    edges {\n      node {\n        ...AddEditParametersCatalogType_editingParametersCatalogType\n        id\n        name\n        index\n      }\n    }\n  }\n}\n\nfragment AddEditParametersCatalogType_editingParametersCatalogType on ParameterCatalog {\n  id\n  name\n  index\n  isDisabled\n  propertyCategories {\n    id\n    name\n    index\n    numberOfProperties\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8348ffe3fdbf94ec2344d61b441579db';

module.exports = node;
