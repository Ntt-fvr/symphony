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
export type ResourceSpecificationFilterType = "ID" | "NAME" | "RESOURCE_TYPE" | "%future added value";
export type ResourceTypeBaseTypeKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "VLAN" | "%future added value";
export type ResourceTypeRelationshipFilterType = "RESOURCE_RELATIONSHIP_LOCATION_TYPE" | "RESOURCE_RELATIONSHIP_MULTIPLICITY" | "RESOURCE_RELATIONSHIP_RESOURCE" | "RESOURCE_RELATIONSHIP_TYPE" | "RESOURCE_RELATIONSHIP_TYPE_A" | "RESOURCE_RELATIONSHIP_TYPE_B" | "%future added value";
export type ResourceTypeRelationshipFilterInput = {|
  filterType: ResourceTypeRelationshipFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  multiplicityValue?: ?ResourceRelationshipMultiplicityKind,
  operator: FilterOperator,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
  typeValue?: ?ResourceRelationshipTypeKind,
|};
export type RelationshipTypeItemQueryVariables = {|
  filterBy2?: ?$ReadOnlyArray<ResourceTypeRelationshipFilterInput>
|};
export type RelationshipTypeItemQueryResponse = {|
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
          +resourceTypeClass: ResourceTypeClassKind,
        |},
        +resourceSpecificationRelationship: ?$ReadOnlyArray<?{|
          +id: string,
          +name: string,
        |}>,
        +resourceSpecificationItems: ?$ReadOnlyArray<?{|
          +id: string
        |}>,
      |}
    |}>
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
  $filterBy2: [ResourceTypeRelationshipFilterInput!]
) {
  resourceSpecifications {
    edges {
      node {
        id
        name
        resourceType {
          id
          name
          resourceTypeClass
        }
        resourceSpecificationRelationship {
          id
          name
        }
        resourceSpecificationItems {
          id
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
    "name": "filterBy2"
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
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "resourceTypeClass",
    "storageKey": null
  }
],
v4 = [
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecificationRelationship",
                "kind": "LinkedField",
                "name": "resourceSpecificationRelationship",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecificationItems",
                "kind": "LinkedField",
                "name": "resourceSpecificationItems",
                "plural": true,
                "selections": [
                  (v1/*: any*/)
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
        "storageKey": null
      },
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
              (v1/*: any*/),
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
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceTypeB",
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
    "name": "RelationshipTypeItemQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationshipTypeItemQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "c94677041d3b9a145853b851b949c18e",
    "id": null,
    "metadata": {},
    "name": "RelationshipTypeItemQuery",
    "operationKind": "query",
    "text": "query RelationshipTypeItemQuery(\n  $filterBy2: [ResourceTypeRelationshipFilterInput!]\n) {\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n          resourceTypeClass\n        }\n        resourceSpecificationRelationship {\n          id\n          name\n        }\n        resourceSpecificationItems {\n          id\n        }\n      }\n    }\n  }\n  resourceTypeRelationships(filterBy: $filterBy2) {\n    totalCount\n    edges {\n      node {\n        id\n        resourceRelationshipType\n        resourceTypeA {\n          id\n          name\n          resourceTypeClass\n        }\n        resourceTypeB {\n          id\n          name\n          resourceTypeClass\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '476f7268193965724891b457d4270a23';

module.exports = node;
