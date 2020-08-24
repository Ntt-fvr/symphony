/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 * @relayHash 1e8cbdad15123382197921d04d3cb18c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WorkOrdersMap_workOrders$ref = any;
type WorkOrdersView_query$ref = any;
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type WorkOrderFilterType = "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "WORK_ORDER_ASSIGNED_TO" | "WORK_ORDER_CLOSE_DATE" | "WORK_ORDER_CREATION_DATE" | "WORK_ORDER_LOCATION_INST" | "WORK_ORDER_NAME" | "WORK_ORDER_OWNED_BY" | "WORK_ORDER_PRIORITY" | "WORK_ORDER_STATUS" | "WORK_ORDER_TYPE" | "%future added value";
export type WorkOrderOrderField = "CLOSED_AT" | "CREATED_AT" | "NAME" | "UPDATED_AT" | "%future added value";
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
|};
export type WorkOrderOrder = {|
  direction: OrderDirection,
  field?: ?WorkOrderOrderField,
|};
export type WorkOrderComparisonViewQueryRendererSearchQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<WorkOrderFilterInput>,
  orderBy?: ?WorkOrderOrder,
|};
export type WorkOrderComparisonViewQueryRendererSearchQueryResponse = {|
  +workOrdersMap: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: WorkOrdersMap_workOrders$ref
      |}
    |}>,
  |},
  +$fragmentRefs: WorkOrdersView_query$ref,
|};
export type WorkOrderComparisonViewQueryRendererSearchQuery = {|
  variables: WorkOrderComparisonViewQueryRendererSearchQueryVariables,
  response: WorkOrderComparisonViewQueryRendererSearchQueryResponse,
|};
*/


/*
query WorkOrderComparisonViewQueryRendererSearchQuery(
  $limit: Int
  $filters: [WorkOrderFilterInput!]!
  $orderBy: WorkOrderOrder
) {
  ...WorkOrdersView_query_10glCF
  workOrdersMap: workOrders(orderBy: $orderBy, filterBy: $filters, first: 100) {
    totalCount
    edges {
      node {
        ...WorkOrdersMap_workOrders
        id
      }
    }
  }
}

fragment WorkOrdersMap_workOrders on WorkOrder {
  id
  name
  description
  owner {
    id
    email
  }
  status
  priority
  project {
    id
  }
  assignedTo {
    id
    email
  }
  installDate
  location {
    id
    name
    latitude
    longitude
  }
}

fragment WorkOrdersView_query_10glCF on Query {
  workOrders(first: $limit, orderBy: $orderBy, filterBy: $filters) {
    totalCount
    edges {
      node {
        id
        name
        description
        owner {
          id
          email
        }
        creationDate
        installDate
        status
        assignedTo {
          id
          email
        }
        location {
          id
          name
        }
        workOrderType {
          id
          name
        }
        project {
          id
          name
        }
        closeDate
        priority
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "limit",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "filters",
    "type": "[WorkOrderFilterInput!]!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderBy",
    "type": "WorkOrderOrder",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "filterBy",
  "variableName": "filters"
},
v2 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  },
  (v2/*: any*/)
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalCount",
  "args": null,
  "storageKey": null
},
v5 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  },
  (v2/*: any*/)
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v9 = [
  (v6/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "email",
    "args": null,
    "storageKey": null
  }
],
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "owner",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v9/*: any*/)
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "installDate",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "assignedTo",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v9/*: any*/)
},
v14 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "priority",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "WorkOrderComparisonViewQueryRendererSearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "workOrdersMap",
        "name": "workOrders",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "WorkOrderConnection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "WorkOrderEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "WorkOrder",
                "plural": false,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "WorkOrdersMap_workOrders",
                    "args": null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "WorkOrdersView_query",
        "args": (v5/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WorkOrderComparisonViewQueryRendererSearchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "workOrders",
        "storageKey": null,
        "args": (v5/*: any*/),
        "concreteType": "WorkOrderConnection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "WorkOrderEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "WorkOrder",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "creationDate",
                    "args": null,
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "location",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Location",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "workOrderType",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "WorkOrderType",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "project",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Project",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "closeDate",
                    "args": null,
                    "storageKey": null
                  },
                  (v15/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "workOrders",
        "args": (v5/*: any*/),
        "handle": "connection",
        "key": "WorkOrdersView_workOrders",
        "filters": [
          "orderBy",
          "filterBy"
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "workOrdersMap",
        "name": "workOrders",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "WorkOrderConnection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "WorkOrderEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "WorkOrder",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v12/*: any*/),
                  (v15/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "project",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Project",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ]
                  },
                  (v13/*: any*/),
                  (v11/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "location",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Location",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "latitude",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "longitude",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "WorkOrderComparisonViewQueryRendererSearchQuery",
    "id": null,
    "text": "query WorkOrderComparisonViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [WorkOrderFilterInput!]!\n  $orderBy: WorkOrderOrder\n) {\n  ...WorkOrdersView_query_10glCF\n  workOrdersMap: workOrders(orderBy: $orderBy, filterBy: $filters, first: 100) {\n    totalCount\n    edges {\n      node {\n        ...WorkOrdersMap_workOrders\n        id\n      }\n    }\n  }\n}\n\nfragment WorkOrdersMap_workOrders on WorkOrder {\n  id\n  name\n  description\n  owner {\n    id\n    email\n  }\n  status\n  priority\n  project {\n    id\n  }\n  assignedTo {\n    id\n    email\n  }\n  installDate\n  location {\n    id\n    name\n    latitude\n    longitude\n  }\n}\n\nfragment WorkOrdersView_query_10glCF on Query {\n  workOrders(first: $limit, orderBy: $orderBy, filterBy: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        description\n        owner {\n          id\n          email\n        }\n        creationDate\n        installDate\n        status\n        assignedTo {\n          id\n          email\n        }\n        location {\n          id\n          name\n        }\n        workOrderType {\n          id\n          name\n        }\n        project {\n          id\n          name\n        }\n        closeDate\n        priority\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8babf724aba113f11a4f4013cd7a5dc3';
module.exports = node;
