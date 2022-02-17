/**
 * @generated SignedSource<<ef879d28a640cbdd2f843e028bec96be>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DynamicPropertyTypesGrid_propertyTypes$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentPortTypeItem_equipmentPortType$fragmentType: FragmentType;
export type EquipmentPortTypeItem_equipmentPortType$ref = EquipmentPortTypeItem_equipmentPortType$fragmentType;
export type EquipmentPortTypeItem_equipmentPortType$data = {|
  +id: string,
  +name: string,
  +numberOfPortDefinitions: number,
  +propertyTypes: $ReadOnlyArray<?{|
    +$fragmentSpreads: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  |}>,
  +linkPropertyTypes: $ReadOnlyArray<?{|
    +$fragmentSpreads: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  |}>,
  +$fragmentType: EquipmentPortTypeItem_equipmentPortType$fragmentType,
|};
export type EquipmentPortTypeItem_equipmentPortType = EquipmentPortTypeItem_equipmentPortType$data;
export type EquipmentPortTypeItem_equipmentPortType$key = {
  +$data?: EquipmentPortTypeItem_equipmentPortType$data,
  +$fragmentSpreads: EquipmentPortTypeItem_equipmentPortType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "DynamicPropertyTypesGrid_propertyTypes"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EquipmentPortTypeItem_equipmentPortType",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "numberOfPortDefinitions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyTypes",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "linkPropertyTypes",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "EquipmentPortType",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "64680fb091846a1ed120759b8199a89c";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentPortTypeItem_equipmentPortType$fragmentType,
  EquipmentPortTypeItem_equipmentPortType$data,
>*/);
