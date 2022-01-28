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
export type RelationshipsTypesQueryVariables = {||};
export type RelationshipsTypesQueryResponse = {|
  +resourceRelationships: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceRelationshipMultiplicityFk: {|
          +name: string
        |},
        +resourceRelationshipTypeFk: {|
          +name: string
        |},
        +resourceTypeFkA: {|
          +name: string
        |},
        +resourceTypeFkB: ?{|
          +name: string
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
        name
        resourceRelationshipMultiplicityFk {
          name
          id
        }
        resourceRelationshipTypeFk {
          name
          id
        }
        resourceTypeFkA {
          name
          id
        }
        resourceTypeFkB {
          name
          id
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
  (v1/*: any*/)
],
v3 = [
  (v1/*: any*/),
  (v0/*: any*/)
];
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceRelationshipMultiplicity",
                    "kind": "LinkedField",
                    "name": "resourceRelationshipMultiplicityFk",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceRelationshipType",
                    "kind": "LinkedField",
                    "name": "resourceRelationshipTypeFk",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceType",
                    "kind": "LinkedField",
                    "name": "resourceTypeFkA",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceType",
                    "kind": "LinkedField",
                    "name": "resourceTypeFkB",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceRelationshipMultiplicity",
                    "kind": "LinkedField",
                    "name": "resourceRelationshipMultiplicityFk",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceRelationshipType",
                    "kind": "LinkedField",
                    "name": "resourceRelationshipTypeFk",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceType",
                    "kind": "LinkedField",
                    "name": "resourceTypeFkA",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceType",
                    "kind": "LinkedField",
                    "name": "resourceTypeFkB",
                    "plural": false,
                    "selections": (v3/*: any*/),
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
    "cacheID": "c26210c19a1d3a23d6eeec1a26d0cdd8",
    "id": null,
    "metadata": {},
    "name": "RelationshipsTypesQuery",
    "operationKind": "query",
    "text": "query RelationshipsTypesQuery {\n  resourceRelationships {\n    edges {\n      node {\n        id\n        name\n        resourceRelationshipMultiplicityFk {\n          name\n          id\n        }\n        resourceRelationshipTypeFk {\n          name\n          id\n        }\n        resourceTypeFkA {\n          name\n          id\n        }\n        resourceTypeFkB {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f28720e77fa434dc997db282dab4d0ad';

module.exports = node;
