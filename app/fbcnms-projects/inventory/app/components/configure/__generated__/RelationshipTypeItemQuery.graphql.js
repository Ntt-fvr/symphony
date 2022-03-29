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
export type ResourceRelationshipMultiplicityKind = "MANY_TO_MANY" | "MANY_TO_ONE" | "ONE_TO_MANY" | "ONE_TO_ONE" | "%future added value";
export type ResourceRelationshipTypeKind = "BELONGS_TO" | "CROSS_CONNECTION" | "LOCATED_IN" | "LOGICAL_LINK" | "PHYSICAL_LINK" | "%future added value";
export type ResourceSpecificationFilterType = "NAME" | "RESOURCE_TYPE" | "%future added value";
export type ResourceTypeBaseTypeKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "%future added value";
export type ResourceTypeRelationshipFilterType = "RESOURCE_RELATIONSHIP_LOCATION_TYPE" | "RESOURCE_RELATIONSHIP_MULTIPLICITY" | "RESOURCE_RELATIONSHIP_RESOURCE" | "RESOURCE_RELATIONSHIP_TYPE" | "%future added value";
export type ResourceSpecificationFilterInput = {|
  filterType: ResourceSpecificationFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type ResourceTypeRelationshipFilterInput = {|
  filterType: ResourceTypeRelationshipFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  multiplicityValue?: ?ResourceRelationshipMultiplicityKind,
  typeValue?: ?ResourceRelationshipTypeKind,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type RelationshipTypeItemQueryVariables = {|
  filterBy: $ReadOnlyArray<ResourceSpecificationFilterInput>,
  filterBy2: $ReadOnlyArray<ResourceTypeRelationshipFilterInput>,
|};
export type RelationshipTypeItemQueryResponse = {|
  +resourceSpecifications: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
          +resourceTypeBaseType: ResourceTypeBaseTypeKind,
          +resourceTypeClass: ResourceTypeClassKind,
        |},
      |}
    |}>,
  |},
  +resourceTypeRelationships: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +resourceRelationshipType: ResourceRelationshipTypeKind,
        +resourceTypeA: {|
          +id: string,
          +name: string,
          +resourceTypeClass: ResourceTypeClassKind,
        |},
        +resourceTypeB: ?{|
          +id: string,
          +name: string,
          +resourceTypeClass: ResourceTypeClassKind,
        |},
      |}
    |}>,
  |},
|};
export type RelationshipTypeItemQuery = {|
  variables: RelationshipTypeItemQueryVariables,
  response: RelationshipTypeItemQueryResponse,
|};
*/


/*
query RelationshipTypeItemQuery(
  $filterBy: [ResourceSpecificationFilterInput!]!
  $filterBy2: [ResourceTypeRelationshipFilterInput!]!
) {
  resourceSpecifications(filterBy: $filterBy) {
    totalCount
    edges {
      node {
        id
        name
        resourceType {
          id
          name
          resourceTypeBaseType
          resourceTypeClass
        }
      }
    }
  }
  resourceTypeRelationships(filterBy: $filterBy2) {
    totalCount
    edges {
      node {
        id
        resourceRelationshipType
        resourceTypeA {
          id
          name
          resourceTypeClass
        }
        resourceTypeB {
          id
          name
          resourceTypeClass
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy2"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceTypeClass",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filterBy"
      }
    ],
    "concreteType": "ResourceSpecificationConnection",
    "kind": "LinkedField",
    "name": "resourceSpecifications",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resourceTypeBaseType",
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filterBy2"
      }
    ],
    "concreteType": "ResourceTypeRelationshipConnection",
    "kind": "LinkedField",
    "name": "resourceTypeRelationships",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeRelationshipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceTypeRelationship",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceRelationshipType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceTypeA",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceTypeB",
                "plural": false,
                "selections": (v5/*: any*/),
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
    "selections": (v6/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationshipTypeItemQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "734633b0536f0b7079d9c71ffef6bab9",
    "id": null,
    "metadata": {},
    "name": "RelationshipTypeItemQuery",
    "operationKind": "query",
    "text": "query RelationshipTypeItemQuery(\n  $filterBy: [ResourceSpecificationFilterInput!]!\n  $filterBy2: [ResourceTypeRelationshipFilterInput!]!\n) {\n  resourceSpecifications(filterBy: $filterBy) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n          resourceTypeBaseType\n          resourceTypeClass\n        }\n      }\n    }\n  }\n  resourceTypeRelationships(filterBy: $filterBy2) {\n    totalCount\n    edges {\n      node {\n        id\n        resourceRelationshipType\n        resourceTypeA {\n          id\n          name\n          resourceTypeClass\n        }\n        resourceTypeB {\n          id\n          name\n          resourceTypeClass\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b07fbd7a7cdeb16027664504e74d1c96';

module.exports = node;
