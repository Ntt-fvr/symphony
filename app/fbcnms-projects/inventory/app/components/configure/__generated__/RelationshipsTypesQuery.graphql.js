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
export type ResourceRelationshipMultiplicityKind = "MANY_TO_MANY" | "MANY_TO_ONE" | "ONE_TO_MANY" | "ONE_TO_ONE" | "%future added value";
export type ResourceRelationshipTypeKind = "BELONGS_TO" | "CROSS_CONNECTION" | "LOCATED_IN" | "LOGICAL_LINK" | "PHYSICAL_LINK" | "%future added value";
export type RelationshipsTypesQueryVariables = {||};
export type RelationshipsTypesQueryResponse = {|
  +resourceTypeRelationships: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +resourceRelationshipType: ResourceRelationshipTypeKind,
        +resourceRelationshipMultiplicity: ResourceRelationshipMultiplicityKind,
        +resourceTypeA: {|
          +id: string,
          +name: string,
        |},
        +resourceTypeB: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type RelationshipsTypesQuery = {|
  variables: RelationshipsTypesQueryVariables,
  response: RelationshipsTypesQueryResponse,
|};
*/


/*
query RelationshipsTypesQuery {
  resourceTypeRelationships {
    edges {
      node {
        id
        resourceRelationshipType
        resourceRelationshipMultiplicity
        resourceTypeA {
          id
          name
        }
        resourceTypeB {
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
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceTypeRelationshipConnection",
    "kind": "LinkedField",
    "name": "resourceTypeRelationships",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeRelationshipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceTypeRelationship",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceRelationshipType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceRelationshipMultiplicity",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceTypeA",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceTypeB",
                "plural": false,
                "selections": (v1/*: any*/),
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
    "name": "RelationshipsTypesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelationshipsTypesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0c89bf4f95a8c7da599f260e9aeeced1",
    "id": null,
    "metadata": {},
    "name": "RelationshipsTypesQuery",
    "operationKind": "query",
    "text": "query RelationshipsTypesQuery {\n  resourceTypeRelationships {\n    edges {\n      node {\n        id\n        resourceRelationshipType\n        resourceRelationshipMultiplicity\n        resourceTypeA {\n          id\n          name\n        }\n        resourceTypeB {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '60d87e65637e837358fb4142fc213310';

module.exports = node;
