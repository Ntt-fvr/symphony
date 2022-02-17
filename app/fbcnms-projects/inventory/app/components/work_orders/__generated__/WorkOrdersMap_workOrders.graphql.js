/**
 * @generated SignedSource<<28edcc09484eff3b5191f4a10971e373>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type ActivityField = "STATUS" | "PRIORITY" | "ASSIGNEE" | "CREATION_DATE" | "OWNER" | "NAME" | "DESCRIPTION" | "CLOCK_IN" | "CLOCK_OUT" | "%future added value";
export type WorkOrderPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrdersMap_workOrders$fragmentType: FragmentType;
export type WorkOrdersMap_workOrders$ref = WorkOrdersMap_workOrders$fragmentType;
export type WorkOrdersMap_workOrders$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +description: ?string,
  +owner: {|
    +id: string,
    +email: string,
  |},
  +status: WorkOrderStatus,
  +priority: WorkOrderPriority,
  +project: ?{|
    +id: string,
    +name: string,
  |},
  +assignedTo: ?{|
    +id: string,
    +email: string,
  |},
  +installDate: ?any,
  +location: ?{|
    +id: string,
    +name: string,
    +latitude: number,
    +longitude: number,
  |},
  +lastCheckInActivity: $ReadOnlyArray<{|
    +activityType: ActivityField,
    +createTime: any,
    +clockDetails: ?{|
      +distanceMeters: ?number,
    |},
  |}>,
  +lastCheckOutActivity: $ReadOnlyArray<{|
    +activityType: ActivityField,
    +createTime: any,
    +clockDetails: ?{|
      +distanceMeters: ?number,
    |},
  |}>,
  +$fragmentType: WorkOrdersMap_workOrders$fragmentType,
|}>;
export type WorkOrdersMap_workOrders = WorkOrdersMap_workOrders$data;
export type WorkOrdersMap_workOrders$key = $ReadOnlyArray<{
  +$data?: WorkOrdersMap_workOrders$data,
  +$fragmentSpreads: WorkOrdersMap_workOrders$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "activityType",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createTime",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ClockDetails",
    "kind": "LinkedField",
    "name": "clockDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "distanceMeters",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "WorkOrdersMap_workOrders",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
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
      "name": "priority",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Project",
      "kind": "LinkedField",
      "name": "project",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "assignedTo",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "installDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitude",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "lastCheckInActivity",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": {
            "activityType": "CLOCK_IN",
            "limit": 1,
            "orderDirection": "DESC"
          }
        }
      ],
      "concreteType": "Activity",
      "kind": "LinkedField",
      "name": "activities",
      "plural": true,
      "selections": (v3/*: any*/),
      "storageKey": "activities(filter:{\"activityType\":\"CLOCK_IN\",\"limit\":1,\"orderDirection\":\"DESC\"})"
    },
    {
      "alias": "lastCheckOutActivity",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": {
            "activityType": "CLOCK_OUT",
            "limit": 1,
            "orderDirection": "DESC"
          }
        }
      ],
      "concreteType": "Activity",
      "kind": "LinkedField",
      "name": "activities",
      "plural": true,
      "selections": (v3/*: any*/),
      "storageKey": "activities(filter:{\"activityType\":\"CLOCK_OUT\",\"limit\":1,\"orderDirection\":\"DESC\"})"
    }
  ],
  "type": "WorkOrder",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "55d7dfba17b995f7614297a6463c678a";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrdersMap_workOrders$fragmentType,
  WorkOrdersMap_workOrders$data,
>*/);
