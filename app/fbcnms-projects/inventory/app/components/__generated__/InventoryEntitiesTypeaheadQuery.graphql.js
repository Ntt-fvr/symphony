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
type EquipmentBreadcrumbs_equipment$ref = any;
export type InventoryEntitiesTypeaheadQueryVariables = {|
  name: string
|};
export type InventoryEntitiesTypeaheadQueryResponse = {|
  +searchForNode: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?({|
        +__typename: "Location",
        +id: string,
        +externalId: ?string,
        +name: string,
        +locationType: {|
          +name: string
        |},
        +locationHierarchy: $ReadOnlyArray<{|
          +id: string,
          +name: string,
          +locationType: {|
            +name: string
          |},
        |}>,
      |} | {|
        +__typename: "Equipment",
        +id: string,
        +externalId: ?string,
        +name: string,
        +equipmentType: {|
          +name: string
        |},
        +$fragmentRefs: EquipmentBreadcrumbs_equipment$ref,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other"
      |})
    |}>
  |}
|};
export type InventoryEntitiesTypeaheadQuery = {|
  variables: InventoryEntitiesTypeaheadQueryVariables,
  response: InventoryEntitiesTypeaheadQueryResponse,
|};
*/


/*
query InventoryEntitiesTypeaheadQuery(
  $name: String!
) {
  searchForNode(name: $name, first: 10) {
    edges {
      node {
        __typename
        ... on Location {
          id
          externalId
          name
          locationType {
            name
            id
          }
          locationHierarchy {
            id
            name
            locationType {
              name
              id
            }
          }
        }
        ... on Equipment {
          id
          externalId
          name
          equipmentType {
            name
            id
          }
          ...EquipmentBreadcrumbs_equipment
        }
        id
      }
    }
  }
}

fragment EquipmentBreadcrumbs_equipment on Equipment {
  id
  name
  equipmentType {
    id
    name
  }
  locationHierarchy {
    id
    name
    locationType {
      name
      id
    }
  }
  positionHierarchy {
    id
    definition {
      id
      name
      visibleLabel
    }
    parentEquipment {
      id
      name
      equipmentType {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = [
  (v5/*: any*/),
  (v3/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "locationHierarchy",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v5/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InventoryEntitiesTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchNodesConnection",
        "kind": "LinkedField",
        "name": "searchForNode",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "locationHierarchy",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Location",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentType",
                        "kind": "LinkedField",
                        "name": "equipmentType",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "EquipmentBreadcrumbs_equipment"
                      }
                    ],
                    "type": "Equipment",
                    "abstractKey": null
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InventoryEntitiesTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchNodesConnection",
        "kind": "LinkedField",
        "name": "searchForNode",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchNodeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "type": "Location",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentType",
                        "kind": "LinkedField",
                        "name": "equipmentType",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPosition",
                        "kind": "LinkedField",
                        "name": "positionHierarchy",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EquipmentPositionDefinition",
                            "kind": "LinkedField",
                            "name": "definition",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "visibleLabel",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Equipment",
                            "kind": "LinkedField",
                            "name": "parentEquipment",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EquipmentType",
                                "kind": "LinkedField",
                                "name": "equipmentType",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v5/*: any*/)
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
                    "type": "Equipment",
                    "abstractKey": null
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
    ]
  },
  "params": {
    "cacheID": "3ddd9cbf1bf3ea22f7232e8d225bf679",
    "id": null,
    "metadata": {},
    "name": "InventoryEntitiesTypeaheadQuery",
    "operationKind": "query",
    "text": "query InventoryEntitiesTypeaheadQuery(\n  $name: String!\n) {\n  searchForNode(name: $name, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on Location {\n          id\n          externalId\n          name\n          locationType {\n            name\n            id\n          }\n          locationHierarchy {\n            id\n            name\n            locationType {\n              name\n              id\n            }\n          }\n        }\n        ... on Equipment {\n          id\n          externalId\n          name\n          equipmentType {\n            name\n            id\n          }\n          ...EquipmentBreadcrumbs_equipment\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7738e72176118873e296e7140a8d048b';

module.exports = node;
