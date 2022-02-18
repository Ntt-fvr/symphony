/**
 * @generated SignedSource<<671ba51c3050a6183e4f1106542fb269>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type WorkOrderPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectWorkOrdersList_workOrders$fragmentType: FragmentType;
export type ProjectWorkOrdersList_workOrders$ref = ProjectWorkOrdersList_workOrders$fragmentType;
export type ProjectWorkOrdersList_workOrders$data = $ReadOnlyArray<{|
  +id: string,
  +workOrderType: {|
    +name: string,
    +id: string,
  |},
  +name: string,
  +description: ?string,
  +owner: {|
    +id: string,
    +email: string,
  |},
  +creationDate: any,
  +installDate: ?any,
  +status: WorkOrderStatus,
  +priority: WorkOrderPriority,
  +$fragmentType: ProjectWorkOrdersList_workOrders$fragmentType,
|}>;
export type ProjectWorkOrdersList_workOrders = ProjectWorkOrdersList_workOrders$data;
export type ProjectWorkOrdersList_workOrders$key = $ReadOnlyArray<{
  +$data?: ProjectWorkOrdersList_workOrders$data,
  +$fragmentSpreads: ProjectWorkOrdersList_workOrders$fragmentType,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProjectWorkOrdersList_workOrders",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkOrderType",
      "kind": "LinkedField",
      "name": "workOrderType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/)
      ],
      "storageKey": null
    },
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
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "creationDate",
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
    }
  ],
  "type": "WorkOrder",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "50a592240f38b75d0859f49f5a89fa3e";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectWorkOrdersList_workOrders$fragmentType,
  ProjectWorkOrdersList_workOrders$data,
>*/);
