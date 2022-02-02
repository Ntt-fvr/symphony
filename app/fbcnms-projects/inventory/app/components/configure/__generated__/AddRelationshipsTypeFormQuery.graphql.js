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
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceTypeBaseType: ?{|
          +id: string,
          +name: string,
        |},
        +resourceTypeClass: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type AddRelationshipsTypeFormQuery = {|
  variables: AddRelationshipsTypeFormQueryVariables,
  response: AddRelationshipsTypeFormQueryResponse,
|};
*/


/*
query AddRelationshipsTypeFormQuery {
  resourceTypes {
    edges {
      node {
        id
        name
        resourceTypeBaseType {
          id
          name
        }
        resourceTypeClass {
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
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
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
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceTypeBaseType",
                "kind": "LinkedField",
                "name": "resourceTypeBaseType",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceTypeClass",
                "kind": "LinkedField",
                "name": "resourceTypeClass",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "a4b1e6a52d5386fb3acca19b79071233",
    "id": null,
    "metadata": {},
    "name": "AddRelationshipsTypeFormQuery",
    "operationKind": "query",
    "text": "query AddRelationshipsTypeFormQuery {\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n        resourceTypeBaseType {\n          id\n          name\n        }\n        resourceTypeClass {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '09cab02acb5827f5b03a4ce5a0e39ed2';

module.exports = node;
