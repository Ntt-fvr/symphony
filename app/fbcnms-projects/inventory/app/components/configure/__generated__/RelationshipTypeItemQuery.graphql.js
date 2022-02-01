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
        +resourceSpecificationFk: {|
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
        resourceSpecificationFk {
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
                "name": "resourceSpecificationFk",
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
    "cacheID": "29c1809b77e530460215c074c42a0043",
    "id": null,
    "metadata": {},
    "name": "RelationshipTypeItemQuery",
    "operationKind": "query",
    "text": "query RelationshipTypeItemQuery {\n  resourceSpecificationRelationships {\n    edges {\n      node {\n        id\n        name\n        resourceSpecificationFk {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eb0caf29df4d718e0dbfcf36f9397482';

module.exports = node;
