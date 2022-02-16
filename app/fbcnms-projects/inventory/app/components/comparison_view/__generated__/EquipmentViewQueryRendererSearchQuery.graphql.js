/**
 * @generated SignedSource<<02f22669cefbf578b815eee33a01dd5a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type PowerSearchEquipmentResultsTable_equipment$fragmentType = any;
export type EquipmentFilterType = "EQUIP_INST_NAME" | "EQUIP_INST_EXTERNAL_ID" | "PROPERTY" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "EQUIPMENT_TYPE" | "%future added value";
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type EquipmentFilterInput = {|
  filterType: EquipmentFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  propertyValue?: ?PropertyTypeInput,
  idSet?: ?$ReadOnlyArray<string>,
  stringSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
|};
export type PropertyTypeInput = {|
  id?: ?string,
  externalId?: ?string,
  name: string,
  type: PropertyKind,
  nodeType?: ?string,
  index?: ?number,
  category?: ?string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isMandatory?: ?boolean,
  isDeleted?: ?boolean,
  propertyCategoryID?: ?string,
  isListable?: ?boolean,
|};
export type EquipmentViewQueryRendererSearchQuery$variables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<EquipmentFilterInput>,
|};
export type EquipmentViewQueryRendererSearchQueryVariables = EquipmentViewQueryRendererSearchQuery$variables;
export type EquipmentViewQueryRendererSearchQuery$data = {|
  +equipments: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentSpreads: PowerSearchEquipmentResultsTable_equipment$fragmentType,
      |},
    |}>,
    +totalCount: number,
  |},
|};
export type EquipmentViewQueryRendererSearchQueryResponse = EquipmentViewQueryRendererSearchQuery$data;
export type EquipmentViewQueryRendererSearchQuery = {|
  variables: EquipmentViewQueryRendererSearchQueryVariables,
  response: EquipmentViewQueryRendererSearchQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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

(node/*: any*/).hash = "3aa4b524d011bbbcdd87a524011822e6";

module.exports = ((node/*: any*/)/*: Query<
  EquipmentViewQueryRendererSearchQuery$variables,
  EquipmentViewQueryRendererSearchQuery$data,
>*/);
