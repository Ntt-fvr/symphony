/**
 * @generated SignedSource<<b2f27851554e46dca41e798c269f3acd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentTable_equipments$fragmentType: FragmentType;
export type EquipmentTable_equipments$ref = EquipmentTable_equipments$fragmentType;
export type EquipmentTable_equipments$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +futureState: ?FutureState,
  +equipmentType: {|
    +id: string,
    +name: string,
  |},
  +workOrder: ?{|
    +id: string,
    +status: WorkOrderStatus,
  |},
  +services: $ReadOnlyArray<?{|
    +id: string,
  |}>,
  +$fragmentType: EquipmentTable_equipments$fragmentType,
|}>;
export type EquipmentTable_equipments = EquipmentTable_equipments$data;
export type EquipmentTable_equipments$key = $ReadOnlyArray<{
  +$data?: EquipmentTable_equipments$data,
  +$fragmentSpreads: EquipmentTable_equipments$fragmentType,
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
  "name": "EquipmentTable_equipments",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "futureState",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentType",
      "kind": "LinkedField",
      "name": "equipmentType",
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
      "concreteType": "WorkOrder",
      "kind": "LinkedField",
      "name": "workOrder",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Service",
      "kind": "LinkedField",
      "name": "services",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "bb379a6425ea4fcf61db3a20f1e8d96a";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentTable_equipments$fragmentType,
  EquipmentTable_equipments$data,
>*/);
