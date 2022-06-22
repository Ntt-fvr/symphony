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
export type ResourceTypeBaseTypeKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "VLAN" | "%future added value";
export type PowerSearchChangeRequestResourceFilterQueryVariables = {||};
export type PowerSearchChangeRequestResourceFilterQueryResponse = {|
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceTypeBaseType: ResourceTypeBaseTypeKind,
        +resourceTypeClass: ResourceTypeClassKind,
      |}
    |}>
  |}
|};
export type PowerSearchChangeRequestResourceFilterQuery = {|
  variables: PowerSearchChangeRequestResourceFilterQueryVariables,
  response: PowerSearchChangeRequestResourceFilterQueryResponse,
|};
*/


/*
query PowerSearchChangeRequestResourceFilterQuery {
  resourceTypes {
    edges {
      node {
        id
        name
        resourceTypeBaseType
        resourceTypeClass
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceTypeBaseType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceTypeClass",
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
    "name": "PowerSearchChangeRequestResourceFilterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PowerSearchChangeRequestResourceFilterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "07f78f0045b47ec97f6e5e93cdf0a372",
    "id": null,
    "metadata": {},
    "name": "PowerSearchChangeRequestResourceFilterQuery",
    "operationKind": "query",
    "text": "query PowerSearchChangeRequestResourceFilterQuery {\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n        resourceTypeBaseType\n        resourceTypeClass\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dbaa808c7b861ab925f23d2963a5d7d8';

module.exports = node;
