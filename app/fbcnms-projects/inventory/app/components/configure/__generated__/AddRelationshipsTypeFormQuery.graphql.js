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
export type AddRelationshipsTypeFormQueryVariables = {||};
export type AddRelationshipsTypeFormQueryResponse = {|
  +resourceRelationshipMultiplicities: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +resourceRelationshipTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type AddRelationshipsTypeFormQuery = {|
  variables: AddRelationshipsTypeFormQueryVariables,
  response: AddRelationshipsTypeFormQueryResponse,
|};
*/


/*
query AddRelationshipsTypeFormQuery {
  resourceRelationshipMultiplicities {
    edges {
      node {
        id
        name
      }
    }
  }
  resourceRelationshipTypes {
    edges {
      node {
        id
        name
      }
    }
  }
  resourceTypes {
    edges {
      node {
        id
        name
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
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceRelationshipMultiplicityConnection",
    "kind": "LinkedField",
    "name": "resourceRelationshipMultiplicities",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceRelationshipMultiplicityEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceRelationshipMultiplicity",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceRelationshipTypeConnection",
    "kind": "LinkedField",
    "name": "resourceRelationshipTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceRelationshipTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceRelationshipType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceTypeConnection",
    "kind": "LinkedField",
    "name": "resourceTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
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
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3a683ddb8aced8a26dc4e704cd7a8faf",
    "id": null,
    "metadata": {},
    "name": "AddRelationshipsTypeFormQuery",
    "operationKind": "query",
    "text": "query AddRelationshipsTypeFormQuery {\n  resourceRelationshipMultiplicities {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  resourceRelationshipTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6561bf37de90f05be3c63d3c51462e98';

module.exports = node;
