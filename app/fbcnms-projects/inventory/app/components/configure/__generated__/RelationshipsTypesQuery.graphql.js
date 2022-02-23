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
  +resourceRelationships: {|
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
  resourceRelationships {
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
    "concreteType": "ResourceRelationshipConnection",
    "kind": "LinkedField",
    "name": "resourceRelationships",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceRelationshipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceRelationship",
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
    "cacheID": "7c2bf01d409b6db43204824a6c5b1829",
    "id": null,
    "metadata": {},
    "name": "RelationshipsTypesQuery",
    "operationKind": "query",
    "text": "query RelationshipsTypesQuery {\n  resourceRelationships {\n    edges {\n      node {\n        id\n        resourceRelationshipType\n        resourceRelationshipMultiplicity\n        resourceTypeA {\n          id\n          name\n        }\n        resourceTypeB {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f9d7f8002add5410bbd5e687fdc328ce';

module.exports = node;
