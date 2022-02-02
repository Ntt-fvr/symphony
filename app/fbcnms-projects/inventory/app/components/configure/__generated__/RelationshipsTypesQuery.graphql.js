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
  "name": "resourceRelationshipType",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceRelationshipMultiplicity",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceType",
  "kind": "LinkedField",
  "name": "resourceTypeA",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceType",
  "kind": "LinkedField",
  "name": "resourceTypeB",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationshipsTypesQuery",
    "selections": [
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
                  (v1/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
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
    "name": "RelationshipsTypesQuery",
    "selections": [
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
                  (v1/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "70d55c39721342e36b4dfc50fffa6d67",
    "id": null,
    "metadata": {},
    "name": "RelationshipsTypesQuery",
    "operationKind": "query",
    "text": "query RelationshipsTypesQuery {\n  resourceRelationships {\n    edges {\n      node {\n        resourceRelationshipType\n        resourceRelationshipMultiplicity\n        resourceTypeA {\n          id\n          name\n        }\n        resourceTypeB {\n          id\n          name\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a4f8dc5966581d84eee4eddbbe7f1180';

module.exports = node;
