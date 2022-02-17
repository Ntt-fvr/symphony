/**
 * @generated SignedSource<<8db7f96931e3038a1f2d58c5addd098e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
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
export type EquipmentTypeahead_equipmentQuery$variables = {|
  filters: $ReadOnlyArray<EquipmentFilterInput>,
|};
export type EquipmentTypeahead_equipmentQueryVariables = EquipmentTypeahead_equipmentQuery$variables;
export type EquipmentTypeahead_equipmentQuery$data = {|
  +equipments: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type EquipmentTypeahead_equipmentQueryResponse = EquipmentTypeahead_equipmentQuery$data;
export type EquipmentTypeahead_equipmentQuery = {|
  variables: EquipmentTypeahead_equipmentQueryVariables,
  response: EquipmentTypeahead_equipmentQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filters"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 10
      }
    ],
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
    "name": "EquipmentTypeahead_equipmentQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EquipmentTypeahead_equipmentQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b3b593310bb3e64a81b9afd0f4a9e691",
    "id": null,
    "metadata": {},
    "name": "EquipmentTypeahead_equipmentQuery",
    "operationKind": "query",
    "text": "query EquipmentTypeahead_equipmentQuery(\n  $filters: [EquipmentFilterInput!]!\n) {\n  equipments(first: 10, filterBy: $filters) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "ae7478b94317b7281e0a0a3b7d9be648";

module.exports = ((node/*: any*/)/*: Query<
  EquipmentTypeahead_equipmentQuery$variables,
  EquipmentTypeahead_equipmentQuery$data,
>*/);
