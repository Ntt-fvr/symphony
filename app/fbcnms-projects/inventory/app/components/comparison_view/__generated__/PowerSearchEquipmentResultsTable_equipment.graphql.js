/**
 * @generated SignedSource<<26383348762b33922361567297ddce98>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$fragmentType = any;
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type PowerSearchEquipmentResultsTable_equipment$fragmentType: FragmentType;
export type PowerSearchEquipmentResultsTable_equipment$ref = PowerSearchEquipmentResultsTable_equipment$fragmentType;
export type PowerSearchEquipmentResultsTable_equipment$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +futureState: ?FutureState,
  +externalId: ?string,
  +equipmentType: {|
    +id: string,
    +name: string,
  |},
  +workOrder: ?{|
    +id: string,
    +status: WorkOrderStatus,
  |},
  +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  +$fragmentType: PowerSearchEquipmentResultsTable_equipment$fragmentType,
|}>;
export type PowerSearchEquipmentResultsTable_equipment = PowerSearchEquipmentResultsTable_equipment$data;
export type PowerSearchEquipmentResultsTable_equipment$key = $ReadOnlyArray<{
  +$data?: PowerSearchEquipmentResultsTable_equipment$data,
  +$fragmentSpreads: PowerSearchEquipmentResultsTable_equipment$fragmentType,
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
  "name": "PowerSearchEquipmentResultsTable_equipment",
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
      "kind": "ScalarField",
      "name": "externalId",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "EquipmentBreadcrumbs_equipment"
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "dbd45296395196af507b9270ca136663";

module.exports = ((node/*: any*/)/*: Fragment<
  PowerSearchEquipmentResultsTable_equipment$fragmentType,
  PowerSearchEquipmentResultsTable_equipment$data,
>*/);
