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
import type { ReaderFragment } from 'relay-runtime';
export type WorkOrderPriority = "HIGH" | "LOW" | "MEDIUM" | "NONE" | "URGENT" | "%future added value";
export type WorkOrderStatus = "DONE" | "PENDING" | "PLANNED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type WorkOrdersView_query$ref: FragmentReference;
declare export opaque type WorkOrdersView_query$fragmentType: WorkOrdersView_query$ref;
export type WorkOrdersView_query = {|
  +workOrders: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: ?string,
        +owner: {|
          +id: string,
          +email: string,
        |},
        +creationDate: any,
        +installDate: ?any,
        +status: WorkOrderStatus,
        +assignedTo: ?{|
          +id: string,
          +email: string,
        |},
        +location: ?{|
          +id: string,
          +name: string,
        |},
        +workOrderType: {|
          +id: string,
          +name: string,
        |},
        +project: ?{|
          +id: string,
          +name: string,
        |},
        +closeDate: ?any,
        +priority: WorkOrderPriority,
      |}
    |}>,
  |},
  +$refType: WorkOrdersView_query$ref,
|};
export type WorkOrdersView_query$data = WorkOrdersView_query;
export type WorkOrdersView_query$key = {
  +$data?: WorkOrdersView_query$data,
  +$fragmentRefs: WorkOrdersView_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  "workOrders"
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "email",
    "args": null,
    "storageKey": null
  }
],
v4 = [
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "WorkOrdersView_query",
  "type": "Query",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "operation": require('./WorkOrdersViewPaginationQuery.graphql.js'),
      "fragmentPathInResult": []
    }
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "orderBy",
      "type": "WorkOrderOrder",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "filterBy",
      "type": "[WorkOrderFilterInput!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "Cursor",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "workOrders",
      "name": "__WorkOrdersView_workOrders_connection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "filterBy",
          "variableName": "filterBy"
        },
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        }
      ],
      "concreteType": "WorkOrderConnection",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        },
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
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "description",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "owner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "User",
                  "plural": false,
                  "selections": (v3/*: any*/)
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "creationDate",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "installDate",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "status",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "assignedTo",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "User",
                  "plural": false,
                  "selections": (v3/*: any*/)
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "location",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Location",
                  "plural": false,
                  "selections": (v4/*: any*/)
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "workOrderType",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "WorkOrderType",
                  "plural": false,
                  "selections": (v4/*: any*/)
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "project",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Project",
                  "plural": false,
                  "selections": (v4/*: any*/)
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "closeDate",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "priority",
                  "args": null,
                  "storageKey": null
                },
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '89581ca397a5f1c5e6ab657b0a4f7217';
module.exports = node;
