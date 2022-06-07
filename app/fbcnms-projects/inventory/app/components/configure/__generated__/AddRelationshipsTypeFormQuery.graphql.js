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
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type ResourceTypeBaseTypeKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "VLAN" | "%future added value";
export type ResourceTypeFilterType = "NAME" | "RESOURCE_TYPE_BASE_TYPE" | "RESOURCE_TYPE_CLASS" | "%future added value";
export type ResourceTypeFilterInput = {|
  filterType: ResourceTypeFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
  typeBaseTypeValue?: ?ResourceTypeBaseTypeKind,
  typeClassValue?: ?ResourceTypeClassKind,
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
        +resourceTypeBaseType: ResourceTypeBaseTypeKind,
        +resourceTypeClass: ResourceTypeClassKind,
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRelationshipsTypeFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c3379105ea468abfabd458aafeb52fa4",
    "id": null,
    "metadata": {},
    "name": "AddRelationshipsTypeFormQuery",
    "operationKind": "query",
    "text": "query AddRelationshipsTypeFormQuery(\n  $filterBy: [ResourceTypeFilterInput!]\n) {\n  resourceTypes(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceTypeBaseType\n        resourceTypeClass\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4ac5c8098df428dda91129d1d1e3f455';

module.exports = node;
