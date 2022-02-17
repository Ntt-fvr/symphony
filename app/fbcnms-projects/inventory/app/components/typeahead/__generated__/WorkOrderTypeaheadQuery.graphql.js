/**
 * @generated SignedSource<<1ba632e80a6a2ceaf5471b0505e8904a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type WorkOrderFilterType = "WORK_ORDER_NAME" | "WORK_ORDER_STATUS" | "WORK_ORDER_OWNED_BY" | "WORK_ORDER_TYPE" | "WORK_ORDER_CREATION_DATE" | "WORK_ORDER_CLOSE_DATE" | "WORK_ORDER_ASSIGNED_TO" | "WORK_ORDER_LOCATION_INST" | "WORK_ORDER_PRIORITY" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "WORK_ORDER_ORGANIZATION" | "%future added value";
export type WorkOrderFilterInput = {|
  filterType: WorkOrderFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  stringSet?: ?$ReadOnlyArray<string>,
  propertyValue?: ?PropertyTypeInput,
  timeValue?: ?any,
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
export type WorkOrderTypeaheadQuery$variables = {|
  filters: $ReadOnlyArray<WorkOrderFilterInput>,
  limit?: ?number,
|};
export type WorkOrderTypeaheadQueryVariables = WorkOrderTypeaheadQuery$variables;
export type WorkOrderTypeaheadQuery$data = {|
  +workOrders: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +workOrderType: {|
          +name: string,
        |},
      |},
    |}>,
  |},
|};
export type WorkOrderTypeaheadQueryResponse = WorkOrderTypeaheadQuery$data;
export type WorkOrderTypeaheadQuery = {|
  variables: WorkOrderTypeaheadQueryVariables,
  response: WorkOrderTypeaheadQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
  }
],
v1 = [
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkOrderTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrderConnection",
        "kind": "LinkedField",
        "name": "workOrders",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrder",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkOrderType",
                    "kind": "LinkedField",
                    "name": "workOrderType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorkOrderTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrderConnection",
        "kind": "LinkedField",
        "name": "workOrders",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrder",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkOrderType",
                    "kind": "LinkedField",
                    "name": "workOrderType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "90b0ce532988d4418a42f31280a40eae",
    "id": null,
    "metadata": {},
    "name": "WorkOrderTypeaheadQuery",
    "operationKind": "query",
    "text": "query WorkOrderTypeaheadQuery(\n  $filters: [WorkOrderFilterInput!]!\n  $limit: Int\n) {\n  workOrders(filterBy: $filters, first: $limit) {\n    edges {\n      node {\n        id\n        name\n        workOrderType {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "22e168c446827de92450cbeb97441fec";

module.exports = ((node/*: any*/)/*: Query<
  WorkOrderTypeaheadQuery$variables,
  WorkOrderTypeaheadQuery$data,
>*/);
