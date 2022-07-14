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
export type ResourceTypesFetchQueryVariables = {||};
export type ResourceTypesFetchQueryResponse = {|
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +resourceType: ?{|
          +name: string,
          +id: string,
        |},
        +name: string,
        +id: string,
      |}
    |}>
  |}
|};
export type ResourceTypesFetchQuery = {|
  variables: ResourceTypesFetchQueryVariables,
  response: ResourceTypesFetchQueryResponse,
|};
*/


/*
query ResourceTypesFetchQuery {
  resourceSpecifications {
    edges {
      node {
        resourceType {
          name
          id
        }
        name
        id
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
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceSpecificationConnection",
    "kind": "LinkedField",
    "name": "resourceSpecifications",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecification",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/),
              (v1/*: any*/)
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
    "name": "ResourceTypesFetchQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ResourceTypesFetchQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "cf9dcf24752bf0d9ab46884090adad19",
    "id": null,
    "metadata": {},
    "name": "ResourceTypesFetchQuery",
    "operationKind": "query",
    "text": "query ResourceTypesFetchQuery {\n  resourceSpecifications {\n    edges {\n      node {\n        resourceType {\n          name\n          id\n        }\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7f4c2ba30b520e7b04e4ca5588fa429e';

module.exports = node;
