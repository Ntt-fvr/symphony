/**
 * @generated SignedSource<<b981caa887e1fe3a87168178cc2e8adc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type WorkOrderDetailsPaneEquipmentItem_equipment$fragmentType = any;
type WorkOrderDetailsPaneLinkItem_link$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrderDetailsPane_workOrder$fragmentType: FragmentType;
export type WorkOrderDetailsPane_workOrder$ref = WorkOrderDetailsPane_workOrder$fragmentType;
export type WorkOrderDetailsPane_workOrder$data = {|
  +id: string,
  +name: string,
  +equipmentToAdd: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: WorkOrderDetailsPaneEquipmentItem_equipment$fragmentType,
  |}>,
  +equipmentToRemove: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: WorkOrderDetailsPaneEquipmentItem_equipment$fragmentType,
  |}>,
  +linksToAdd: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: WorkOrderDetailsPaneLinkItem_link$fragmentType,
  |}>,
  +linksToRemove: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: WorkOrderDetailsPaneLinkItem_link$fragmentType,
  |}>,
  +$fragmentType: WorkOrderDetailsPane_workOrder$fragmentType,
|};
export type WorkOrderDetailsPane_workOrder = WorkOrderDetailsPane_workOrder$data;
export type WorkOrderDetailsPane_workOrder$key = {
  +$data?: WorkOrderDetailsPane_workOrder$data,
  +$fragmentSpreads: WorkOrderDetailsPane_workOrder$fragmentType,
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
v1 = [
  (v0/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "WorkOrderDetailsPaneEquipmentItem_equipment"
  }
],
v2 = [
  (v0/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "WorkOrderDetailsPaneLinkItem_link"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkOrderDetailsPane_workOrder",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "equipmentToAdd",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "equipmentToRemove",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "linksToAdd",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "linksToRemove",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "WorkOrder",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "4c85915884fc2d9d9f8c4fbee32cc2a4";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrderDetailsPane_workOrder$fragmentType,
  WorkOrderDetailsPane_workOrder$data,
>*/);
