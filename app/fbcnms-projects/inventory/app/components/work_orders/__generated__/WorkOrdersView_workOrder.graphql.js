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
declare export opaque type WorkOrdersView_workOrder$ref: FragmentReference;
declare export opaque type WorkOrdersView_workOrder$fragmentType: WorkOrdersView_workOrder$ref;
export type WorkOrdersView_workOrder = $ReadOnlyArray<{|
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
  +$refType: WorkOrdersView_workOrder$ref,
|}>;
export type WorkOrdersView_workOrder$data = WorkOrdersView_workOrder;
export type WorkOrdersView_workOrder$key = $ReadOnlyArray<{
  +$data?: WorkOrdersView_workOrder$data,
  +$fragmentRefs: WorkOrdersView_workOrder$ref,
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
],
v3 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "WorkOrdersView_workOrder",
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
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkOrderType",
      "kind": "LinkedField",
      "name": "workOrderType",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Project",
      "kind": "LinkedField",
      "name": "project",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "closeDate",
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
// prettier-ignore
(node/*: any*/).hash = '7c7c1a73a39706db0bd7c6ff9320b21a';

module.exports = node;
