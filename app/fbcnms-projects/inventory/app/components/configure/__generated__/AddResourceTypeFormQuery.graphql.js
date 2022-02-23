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
export type AddResourceTypeFormQueryVariables = {||};
export type AddResourceTypeFormQueryResponse = {|
  +resourceTypeClasses: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +resourceTypeBaseTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type AddResourceTypeFormQuery = {|
  variables: AddResourceTypeFormQueryVariables,
  response: AddResourceTypeFormQueryResponse,
|};
*/


/*
query AddResourceTypeFormQuery {
  resourceTypeClasses {
    edges {
      node {
        id
        name
      }
    }
  }
  resourceTypeBaseTypes {
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
    "concreteType": "ResourceTypeClassConnection",
    "kind": "LinkedField",
    "name": "resourceTypeClasses",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeClassEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceTypeClass",
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
    "concreteType": "ResourceTypeBaseTypeConnection",
    "kind": "LinkedField",
    "name": "resourceTypeBaseTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeBaseTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceTypeBaseType",
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
    "name": "AddResourceTypeFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddResourceTypeFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8276ecf063723a9d0da0b834e5514d00",
    "id": null,
    "metadata": {},
    "name": "AddResourceTypeFormQuery",
    "operationKind": "query",
    "text": "query AddResourceTypeFormQuery {\n  resourceTypeClasses {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  resourceTypeBaseTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '554165c8ff893b998a19bf381df0f673';

module.exports = node;
