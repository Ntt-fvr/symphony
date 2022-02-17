/**
 * @generated SignedSource<<bae4bda3f9c9ca702ccc3197a4f5350c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
type FlowInstancesView_query$fragmentType = any;
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type FlowInstanceFilterType = "FLOW_INSTANCE_STATUS" | "FLOW_INSTANCE_TYPE" | "FLOW_INSTANCE_BSS_CODE" | "FLOW_INSTANCE_SERVICE_INSTANCE_CODE" | "%future added value";
export type FlowInstanceOrderField = "START_AT" | "END_AT" | "UPDATED_AT" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type FlowInstanceFilterInput = {|
  filterType: FlowInstanceFilterType,
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
export type FlowInstanceOrder = {|
  direction: OrderDirection,
  field?: ?FlowInstanceOrderField,
|};
export type FlowInstancesViewPaginationQuery$variables = {|
  cursor?: ?any,
  filterBy?: ?$ReadOnlyArray<FlowInstanceFilterInput>,
  first?: ?number,
  orderBy?: ?FlowInstanceOrder,
|};
export type FlowInstancesViewPaginationQueryVariables = FlowInstancesViewPaginationQuery$variables;
export type FlowInstancesViewPaginationQuery$data = {|
  +$fragmentSpreads: FlowInstancesView_query$fragmentType,
|};
export type FlowInstancesViewPaginationQueryResponse = FlowInstancesViewPaginationQuery$data;
export type FlowInstancesViewPaginationQuery = {|
  variables: FlowInstancesViewPaginationQueryVariables,
  response: FlowInstancesViewPaginationQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  }
],
v1 = {
  "kind": "Variable",
  "name": "filterBy",
  "variableName": "filterBy"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FlowInstancesViewPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "FlowInstancesView_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FlowInstancesViewPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "FlowInstanceConnection",
        "kind": "LinkedField",
        "name": "flowInstances",
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
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bssCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "serviceInstanceCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowExecutionTemplate",
                    "kind": "LinkedField",
                    "name": "template",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
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
        "args": (v4/*: any*/),
        "filters": [
          "orderBy",
          "filterBy"
        ],
        "handle": "connection",
        "key": "FlowInstancesView_flowInstances",
        "kind": "LinkedHandle",
        "name": "flowInstances"
      }
    ]
  },
  "params": {
    "cacheID": "55f927f814fee1e337dbac8c53f8b817",
    "id": null,
    "metadata": {},
    "name": "FlowInstancesViewPaginationQuery",
    "operationKind": "query",
    "text": "query FlowInstancesViewPaginationQuery(\n  $cursor: Cursor\n  $filterBy: [FlowInstanceFilterInput!]\n  $first: Int\n  $orderBy: FlowInstanceOrder\n) {\n  ...FlowInstancesView_query_1O5gLD\n}\n\nfragment FlowInstancesView_query_1O5gLD on Query {\n  flowInstances(after: $cursor, first: $first, orderBy: $orderBy, filterBy: $filterBy) {\n    totalCount\n    edges {\n      node {\n        id\n        status\n        startDate\n        endDate\n        bssCode\n        serviceInstanceCode\n        template {\n          id\n          name\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "5638d06230090775fb1733edaf39f546";

module.exports = ((node/*: any*/)/*: Query<
  FlowInstancesViewPaginationQuery$variables,
  FlowInstancesViewPaginationQuery$data,
>*/);
