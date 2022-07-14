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
export type ConfigurationsViewQueryVariables = {||};
export type ConfigurationsViewQueryResponse = {|
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |},
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: ?$ReadOnlyArray<?{|
          +id: string,
          +name: string,
        |}>,
      |}
    |}>
  |},
|};
export type ConfigurationsViewQuery = {|
  variables: ConfigurationsViewQueryVariables,
  response: ConfigurationsViewQueryResponse,
|};
*/


/*
query ConfigurationsViewQuery {
  resourceSpecifications {
    edges {
      node {
        id
        name
        resourceType {
          id
          name
        }
      }
    }
  }
  resourceTypes {
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
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceSpecificationConnection",
    "kind": "LinkedField",
    "name": "resourceSpecifications",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecification",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
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
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecification",
                "kind": "LinkedField",
                "name": "resourceSpecification",
                "plural": true,
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
    "name": "ConfigurationsViewQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConfigurationsViewQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c4f3c84bb1c25b2e188f26b78df926ec",
    "id": null,
    "metadata": {},
    "name": "ConfigurationsViewQuery",
    "operationKind": "query",
    "text": "query ConfigurationsViewQuery {\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n        resourceSpecification {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1a3d023fb57c33469734576ea3eedbd6';

module.exports = node;
