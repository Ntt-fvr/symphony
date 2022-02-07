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
export type RelationshipTypeItemQueryVariables = {||};
export type RelationshipTypeItemQueryResponse = {|
  +resourceSpecificationRelationships: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: {|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type RelationshipTypeItemQuery = {|
  variables: RelationshipTypeItemQueryVariables,
  response: RelationshipTypeItemQueryResponse,
|};
*/


/*
query RelationshipTypeItemQuery {
  resourceSpecificationRelationships {
    edges {
      node {
        id
        name
        resourceSpecification {
          id
          name
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
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceSpecificationRelationshipConnection",
    "kind": "LinkedField",
    "name": "resourceSpecificationRelationships",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationRelationshipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecificationRelationship",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecification",
                "kind": "LinkedField",
                "name": "resourceSpecification",
                "plural": false,
                "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationshipTypeItemQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelationshipTypeItemQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "957d85dec7564ee441da27af11edf566",
    "id": null,
    "metadata": {},
    "name": "RelationshipTypeItemQuery",
    "operationKind": "query",
    "text": "query RelationshipTypeItemQuery {\n  resourceSpecificationRelationships {\n    edges {\n      node {\n        id\n        name\n        resourceSpecification {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '020ff37fce8b6a2910bc13114b2207d1';

module.exports = node;
