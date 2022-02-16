/**
 * @generated SignedSource<<b60557114c86af53476349cc4b195ab1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationEquipmentTopology_equipment$fragmentType: FragmentType;
export type LocationEquipmentTopology_equipment$ref = LocationEquipmentTopology_equipment$fragmentType;
export type LocationEquipmentTopology_equipment$data = $ReadOnlyArray<{|
  +id: string,
  +$fragmentType: LocationEquipmentTopology_equipment$fragmentType,
|}>;
export type LocationEquipmentTopology_equipment = LocationEquipmentTopology_equipment$data;
export type LocationEquipmentTopology_equipment$key = $ReadOnlyArray<{
  +$data?: LocationEquipmentTopology_equipment$data,
  +$fragmentSpreads: LocationEquipmentTopology_equipment$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "LocationEquipmentTopology_equipment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};

(node/*: any*/).hash = "8d782dfc3b488a1005aaeef451b77d56";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationEquipmentTopology_equipment$fragmentType,
  LocationEquipmentTopology_equipment$data,
>*/);
