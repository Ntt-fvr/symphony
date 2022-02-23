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
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type ResourceTypeFilterType = "NAME" | "RESOURCE_TYPE_BASE_TYPE" | "RESOURCE_TYPE_CLASS" | "%future added value";
export type ResourceTypeFilterInput = {|
  filterType: ResourceTypeFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type AddRelationshipsTypeFormQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<ResourceTypeFilterInput>
|};
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
query AddRelationshipsTypeFormQuery(
  $filterBy: [ResourceTypeFilterInput!]
) {
  resourceTypes(filterBy: $filterBy) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filterBy"
      }
    ],
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceTypeBaseType",
                "kind": "LinkedField",
                "name": "resourceTypeBaseType",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceTypeClass",
                "kind": "LinkedField",
                "name": "resourceTypeClass",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "32bbd0599340e0f05c078fb16bd85a52",
    "id": null,
    "metadata": {},
    "name": "AddRelationshipsTypeFormQuery",
    "operationKind": "query",
    "text": "query AddRelationshipsTypeFormQuery(\n  $filterBy: [ResourceTypeFilterInput!]\n) {\n  resourceTypes(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceTypeBaseType {\n          id\n          name\n        }\n        resourceTypeClass {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8abb1114d8e2095e7121d1fd3625c0ad';

module.exports = node;
