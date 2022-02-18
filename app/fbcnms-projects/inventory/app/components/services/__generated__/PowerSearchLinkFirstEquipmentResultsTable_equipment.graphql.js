/**
 * @generated SignedSource<<b3cdde7bab17ce4eab14c363f7ca3fb3>>
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
import type { FragmentType } from "relay-runtime";
declare export opaque type PowerSearchLinkFirstEquipmentResultsTable_equipment$fragmentType: FragmentType;
export type PowerSearchLinkFirstEquipmentResultsTable_equipment$ref = PowerSearchLinkFirstEquipmentResultsTable_equipment$fragmentType;
export type PowerSearchLinkFirstEquipmentResultsTable_equipment$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +futureState: ?FutureState,
  +equipmentType: {|
    +id: string,
    +name: string,
  |},
  +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  +$fragmentType: PowerSearchLinkFirstEquipmentResultsTable_equipment$fragmentType,
|}>;
export type PowerSearchLinkFirstEquipmentResultsTable_equipment = PowerSearchLinkFirstEquipmentResultsTable_equipment$data;
export type PowerSearchLinkFirstEquipmentResultsTable_equipment$key = $ReadOnlyArray<{
  +$data?: PowerSearchLinkFirstEquipmentResultsTable_equipment$data,
  +$fragmentSpreads: PowerSearchLinkFirstEquipmentResultsTable_equipment$fragmentType,
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
  "name": "PowerSearchLinkFirstEquipmentResultsTable_equipment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "EquipmentBreadcrumbs_equipment"
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "1716ce00a6510aae7310a382182ce067";

module.exports = ((node/*: any*/)/*: Fragment<
  PowerSearchLinkFirstEquipmentResultsTable_equipment$fragmentType,
  PowerSearchLinkFirstEquipmentResultsTable_equipment$data,
>*/);
