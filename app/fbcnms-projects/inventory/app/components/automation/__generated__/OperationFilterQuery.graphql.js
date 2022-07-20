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
export type FlowInstanceFilterType = "FLOW_INSTANCE_BSS_CODE" | "FLOW_INSTANCE_SERVICE_INSTANCE_CODE" | "FLOW_INSTANCE_STATUS" | "FLOW_INSTANCE_TYPE" | "%future added value";
export type FlowInstanceStatus = "CANCELED" | "CLOSED" | "COMPLETED" | "FAILED" | "FAILING" | "PAUSED" | "RUNNING" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type FlowInstanceFilterInput = {|
  filterType: FlowInstanceFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  propertyValue?: ?PropertyTypeInput,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
  timeValue?: ?any,
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
export type OperationFilterQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<FlowInstanceFilterInput>
|};
export type OperationFilterQueryResponse = {|
  +flowInstances: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +status: FlowInstanceStatus,
        +startDate: any,
        +template: {|
          +name: string
        |},
        +bssCode: ?string,
        +serviceInstanceCode: ?string,
      |}
    |}>
  |}
|};
export type OperationFilterQuery = {|
  variables: OperationFilterQueryVariables,
  response: OperationFilterQueryResponse,
|};
*/


/*
query OperationFilterQuery(
  $filterBy: [FlowInstanceFilterInput!]
) {
  flowInstances(filterBy: $filterBy) {
    edges {
      node {
        id
        status
        startDate
        template {
          name
          id
        }
        bssCode
        serviceInstanceCode
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
    "kind": "Variable",
    "name": "filterBy",
    "variableName": "filterBy"
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
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
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
  "kind": "ScalarField",
  "name": "bssCode",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceInstanceCode",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OperationFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FlowInstanceConnection",
        "kind": "LinkedField",
        "name": "flowInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowInstanceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowInstance",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowExecutionTemplate",
                    "kind": "LinkedField",
                    "name": "template",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/)
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
    "name": "OperationFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FlowInstanceConnection",
        "kind": "LinkedField",
        "name": "flowInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowInstanceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowInstance",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowExecutionTemplate",
                    "kind": "LinkedField",
                    "name": "template",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/)
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
    "cacheID": "1ac4e6f64f5caec57e7dfdb855081d37",
    "id": null,
    "metadata": {},
    "name": "OperationFilterQuery",
    "operationKind": "query",
    "text": "query OperationFilterQuery(\n  $filterBy: [FlowInstanceFilterInput!]\n) {\n  flowInstances(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        status\n        startDate\n        template {\n          name\n          id\n        }\n        bssCode\n        serviceInstanceCode\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1c4f049f03f872090223e39752905b30';

module.exports = node;
