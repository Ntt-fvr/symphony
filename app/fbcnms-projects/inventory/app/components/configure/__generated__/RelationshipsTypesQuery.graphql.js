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
        +id: string
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
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelationshipsTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "cac1aef2e06216ab0099815ae5ec048a",
    "id": null,
    "metadata": {},
    "name": "RelationshipsTypesQuery",
    "operationKind": "query",
    "text": "query RelationshipsTypesQuery {\n  resourceRelationships {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4dbcb75bfb5cf5797ca5109869b6216d';

module.exports = node;
