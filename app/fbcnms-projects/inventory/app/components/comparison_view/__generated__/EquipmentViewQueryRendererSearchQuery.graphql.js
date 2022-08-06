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
type PowerSearchEquipmentResultsTable_equipment$ref = any;
export type EquipmentFilterType = "EQUIPMENT_TYPE" | "EQUIP_INST_EXTERNAL_ID" | "EQUIP_INST_NAME" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "PROPERTY" | "%future added value";
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type EquipmentFilterInput = {|
  filterType: EquipmentFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  propertyValue?: ?PropertyTypeInput,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
|};
export type PropertyTypeInput = {|
  booleanValue?: ?boolean,
  category?: ?string,
  dependencePropertyTypes?: ?$ReadOnlyArray<?PropertyTypeInput>,
  externalId?: ?string,
  floatValue?: ?number,
  id?: ?string,
  index?: ?number,
  intValue?: ?number,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isListable?: ?boolean,
  isMandatory?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  name: string,
  nodeType?: ?string,
  propertyCategoryID?: ?string,
  propertyTypeValues?: ?$ReadOnlyArray<?AddPropertyTypeValueInput>,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
  type: PropertyKind,
|};
export type AddPropertyTypeValueInput = {|
  id?: ?string,
  isDeleted?: ?boolean,
  name: string,
  parentPropertyType?: ?$ReadOnlyArray<?ParentPropertyTypeValueInput>,
  parentPropertyTypeValue?: ?$ReadOnlyArray<?string>,
  propertyType?: ?string,
|};
export type ParentPropertyTypeValueInput = {|
  parentPropertyType?: ?string,
  parentPropertyTypeValue?: ?string,
|};
export type EquipmentViewQueryRendererSearchQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<EquipmentFilterInput>,
|};
export type EquipmentViewQueryRendererSearchQueryResponse = {|
  +equipments: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: PowerSearchEquipmentResultsTable_equipment$ref
      |}
    |}>,
    +totalCount: number,
  |}
|};
export type EquipmentViewQueryRendererSearchQuery = {|
  variables: EquipmentViewQueryRendererSearchQueryVariables,
  response: EquipmentViewQueryRendererSearchQueryResponse,
|};
*/


/*
query EquipmentViewQueryRendererSearchQuery(
  $limit: Int
  $filters: [EquipmentFilterInput!]!
) {
  equipments(first: $limit, filterBy: $filters) {
    edges {
      node {
        ...PowerSearchEquipmentResultsTable_equipment
        id
      }
    }
    totalCount
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

fragment PowerSearchEquipmentResultsTable_equipment on Equipment {
  id
  name
  futureState
  externalId
  equipmentType {
    id
    name
  }
  workOrder {
    id
    status
  }
  ...EquipmentBreadcrumbs_equipment
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v2 = [
  {
    "kind": "Variable",
    "name": "filterBy",
    "variableName": "filters"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EquipmentViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EquipmentConnection",
        "kind": "LinkedField",
        "name": "equipments",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Equipment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PowerSearchEquipmentResultsTable_equipment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "EquipmentViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EquipmentConnection",
        "kind": "LinkedField",
        "name": "equipments",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Equipment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "futureState",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "externalId",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkOrder",
                    "kind": "LinkedField",
                    "name": "workOrder",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "locationHierarchy",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationType",
                        "kind": "LinkedField",
                        "name": "locationType",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPosition",
                    "kind": "LinkedField",
                    "name": "positionHierarchy",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPositionDefinition",
                        "kind": "LinkedField",
                        "name": "definition",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e10a20eb0cc4fde0537f3b7f286b1274",
    "id": null,
    "metadata": {},
    "name": "EquipmentViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query EquipmentViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [EquipmentFilterInput!]!\n) {\n  equipments(first: $limit, filterBy: $filters) {\n    edges {\n      node {\n        ...PowerSearchEquipmentResultsTable_equipment\n        id\n      }\n    }\n    totalCount\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment PowerSearchEquipmentResultsTable_equipment on Equipment {\n  id\n  name\n  futureState\n  externalId\n  equipmentType {\n    id\n    name\n  }\n  workOrder {\n    id\n    status\n  }\n  ...EquipmentBreadcrumbs_equipment\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3aa4b524d011bbbcdd87a524011822e6';

module.exports = node;
