/**
 * @generated SignedSource<<885c7119201f11b22b1302e796af0d88>>
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
declare export opaque type EquipmentPropertiesCard_position$fragmentType: FragmentType;
export type EquipmentPropertiesCard_position$ref = EquipmentPropertiesCard_position$fragmentType;
export type EquipmentPropertiesCard_position$data = {
  +id: string,
  +definition: {
    +id: string,
    +name: string,
    +index: ?number,
    +visibleLabel: ?string,
    ...
  },
  +attachedEquipment: ?{
    +id: string,
    +name: string,
    +futureState: ?FutureState,
    +workOrder: ?{
      +id: string,
      +status: WorkOrderStatus,
      ...
    },
    ...
  },
  ...
};
export type EquipmentPropertiesCard_position = EquipmentPropertiesCard_position$data;
export type EquipmentPropertiesCard_position$key = {
  +$data?: EquipmentPropertiesCard_position$data,
  +$fragmentSpreads: EquipmentPropertiesCard_position$fragmentType,
  ...
};
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
    "mask": false
  },
  "name": "EquipmentPropertiesCard_position",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPositionDefinition",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "index",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "visibleLabel",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "attachedEquipment",
      "plural": false,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EquipmentPosition",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "d1e6f2ef9ef3182e98188066491a9856";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentPropertiesCard_position$fragmentType,
  EquipmentPropertiesCard_position$data,
>*/);
