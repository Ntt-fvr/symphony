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
export type GroupSelectClassRelationshipsQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<ResourceTypeFilterInput>
|};
export type GroupSelectClassRelationshipsQueryResponse = {|
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
export type GroupSelectClassRelationshipsQuery = {|
  variables: GroupSelectClassRelationshipsQueryVariables,
  response: GroupSelectClassRelationshipsQueryResponse,
|};
*/


/*
query GroupSelectClassRelationshipsQuery(
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
    "name": "GroupSelectClassRelationshipsQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GroupSelectClassRelationshipsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "363255c7213684cfcc3ef609fa5156fc",
    "id": null,
    "metadata": {},
    "name": "GroupSelectClassRelationshipsQuery",
    "operationKind": "query",
    "text": "query GroupSelectClassRelationshipsQuery(\n  $filterBy: [ResourceTypeFilterInput!]\n) {\n  resourceTypes(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceTypeBaseType {\n          id\n          name\n        }\n        resourceTypeClass {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4899fdc4f84d8d698460962bef2d1d8f';

module.exports = node;
