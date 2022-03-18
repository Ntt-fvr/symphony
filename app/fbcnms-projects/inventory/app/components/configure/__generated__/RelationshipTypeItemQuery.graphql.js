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
export type ResourceSpecificationRelationshipFilterType = "NAME" | "RESOURCE_SPECIFICATION" | "%future added value";
export type ResourceSpecificationRelationshipFilterInput = {|
  filterType: ResourceSpecificationRelationshipFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type RelationshipTypeItemQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<ResourceSpecificationRelationshipFilterInput>
|};
export type RelationshipTypeItemQueryResponse = {|
  +resourceSpecificationRelationships: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: {|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type RelationshipTypeItemQuery = {|
  variables: RelationshipTypeItemQueryVariables,
  response: RelationshipTypeItemQueryResponse,
|};
*/


/*
query RelationshipTypeItemQuery(
  $filterBy: [ResourceSpecificationRelationshipFilterInput!]
) {
  resourceSpecificationRelationships(filterBy: $filterBy) {
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filterBy"
      }
    ],
    "concreteType": "ResourceSpecificationRelationshipConnection",
    "kind": "LinkedField",
    "name": "resourceSpecificationRelationships",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationRelationshipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecificationRelationship",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecification",
                "kind": "LinkedField",
                "name": "resourceSpecification",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationshipTypeItemQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationshipTypeItemQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "4671f51b75d155ed993ef8093ab9c943",
    "id": null,
    "metadata": {},
    "name": "RelationshipTypeItemQuery",
    "operationKind": "query",
    "text": "query RelationshipTypeItemQuery(\n  $filterBy: [ResourceSpecificationRelationshipFilterInput!]\n) {\n  resourceSpecificationRelationships(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceSpecification {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eb7e641466da50795de86078845dee74';

module.exports = node;
