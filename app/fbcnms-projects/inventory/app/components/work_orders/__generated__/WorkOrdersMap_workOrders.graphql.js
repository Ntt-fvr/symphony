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
declare export opaque type WorkOrdersMap_workOrders$ref: FragmentReference;
declare export opaque type WorkOrdersMap_workOrders$fragmentType: WorkOrdersMap_workOrders$ref;
export type WorkOrdersMap_workOrders = $ReadOnlyArray<{|
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
    +id: string
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
  +$refType: WorkOrdersMap_workOrders$ref,
|}>;
export type WorkOrdersMap_workOrders$data = WorkOrdersMap_workOrders;
export type WorkOrdersMap_workOrders$key = $ReadOnlyArray<{
  +$data?: WorkOrdersMap_workOrders$data,
  +$fragmentRefs: WorkOrdersMap_workOrders$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = (function(){
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
        (v0/*: any*/)
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
    }
  ],
  "type": "WorkOrder",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '40e62c63b30e3cfbbc07e2f8c19f283d';

module.exports = node;
